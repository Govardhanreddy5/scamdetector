import { promises as dns } from 'dns';
import ipaddr from 'ipaddr.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface SafeUrlReport {
  isValidUrl: boolean;
  normalizedUrl: string;
  domain: string;
  isHttps: boolean;
  isIpHost: boolean;
  resolvedIp?: string;
  isPrivateOrInternal: boolean;
  isSuspiciousTld: boolean;
  extractedTitle?: string;
  extractedMetaDescription?: string;
  extractedTextSnippet?: string;
  heuristicRedFlags: string[];
}

const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'win', 'bid', 'click', 'cfd', 'icu', 'rest', 'buzz', 'work', 'link', 'gq', 'ml', 'cf', 'tk'
]);

const FAMOUS_INDIAN_FINANCE_DOMAINS = [
  'sebi.gov.in',
  'rbi.org.in',
  'nseindia.com',
  'bseindia.com',
  'zerodha.com',
  'groww.in',
  'angelone.in',
  'upstox.com',
  'hdfcbank.com',
  'icicibank.com',
  'sbi.co.in'
];

/**
 * Checks whether an IP address is private, loopback, link-local or reserved
 */
export function isPrivateIp(ip: string): boolean {
  try {
    const parsed = ipaddr.parse(ip);
    const range = parsed.range();
    
    // Checks for: loopback, private, carrierGradeNat, linkLocal, uniqueLocal, multicast, reserved
    return (
      range === 'loopback' ||
      range === 'private' ||
      range === 'linkLocal' ||
      range === 'uniqueLocal' ||
      range === 'carrierGradeNat' ||
      range === 'reserved' ||
      ip === '169.254.169.254' // AWS / GCP / Azure metadata endpoint
    );
  } catch {
    return true; // If IP can't be parsed, treat as unsafe
  }
}

export async function analyzeSafeUrl(rawUrl: string): Promise<SafeUrlReport> {
  const flags: string[] = [];

  let parsed: URL;
  try {
    // Auto-prefix http if missing for standard typing
    const withProto = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') 
      ? rawUrl 
      : `https://${rawUrl}`;
    parsed = new URL(withProto);
  } catch {
    return {
      isValidUrl: false,
      normalizedUrl: rawUrl,
      domain: '',
      isHttps: false,
      isIpHost: false,
      isPrivateOrInternal: false,
      isSuspiciousTld: false,
      heuristicRedFlags: ['Invalid URL format provided.'],
    };
  }

  // Reject non-http(s) protocols (e.g. file:, javascript:, ftp:)
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      isValidUrl: false,
      normalizedUrl: rawUrl,
      domain: parsed.hostname,
      isHttps: false,
      isIpHost: false,
      isPrivateOrInternal: true,
      isSuspiciousTld: false,
      heuristicRedFlags: [`Unsupported or unsafe protocol: ${parsed.protocol}`],
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const isHttps = parsed.protocol === 'https:';

  if (!isHttps) {
    flags.push('Insecure connection (HTTP instead of HTTPS). Legitimate financial institutions always mandate HTTPS.');
  }

  // Check if hostname is directly an IP or localhost
  if (hostname === 'localhost' || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    return {
      isValidUrl: true,
      normalizedUrl: parsed.href,
      domain: hostname,
      isHttps,
      isIpHost: true,
      isPrivateOrInternal: true,
      isSuspiciousTld: false,
      heuristicRedFlags: ['Target points to a localhost/internal host, which is blocked for safety.'],
    };
  }

  // Check if domain is an IP address
  let isIpHost = false;
  if (ipaddr.isValid(hostname)) {
    isIpHost = true;
    if (isPrivateIp(hostname)) {
      return {
        isValidUrl: true,
        normalizedUrl: parsed.href,
        domain: hostname,
        isHttps,
        isIpHost: true,
        isPrivateOrInternal: true,
        isSuspiciousTld: false,
        heuristicRedFlags: ['Target IP belongs to a private, loopback, or cloud-metadata network (SSRF blocked).'],
      };
    }
    flags.push('Domain uses a raw IP address instead of a registered domain name, common in malicious phishing infrastructure.');
  }

  // Check domain TLD
  const parts = hostname.split('.');
  const tld = parts[parts.length - 1];
  const isSuspiciousTld = SUSPICIOUS_TLDS.has(tld);
  if (isSuspiciousTld) {
    flags.push(`Uses high-risk low-reputation top-level domain (.${tld}).`);
  }

  // Check for typosquatting / lookalike of legitimate Indian financial brands
  for (const legitimate of FAMOUS_INDIAN_FINANCE_DOMAINS) {
    const brandName = legitimate.split('.')[0];
    if (hostname.includes(brandName) && hostname !== legitimate && !hostname.endsWith(`.${legitimate}`)) {
      flags.push(`Possible brand impersonation: Domain contains "${brandName}" but does not belong to official "${legitimate}".`);
    }
  }

  // DNS Lookup and SSRF validation before fetching
  let resolvedIp: string | undefined;
  let isPrivateOrInternal = false;

  try {
    const lookupResult = await dns.lookup(hostname);
    resolvedIp = lookupResult.address;

    if (isPrivateIp(resolvedIp)) {
      isPrivateOrInternal = true;
      flags.push('DNS resolved to an internal/private network IP address. Access blocked for SSRF protection.');
      return {
        isValidUrl: true,
        normalizedUrl: parsed.href,
        domain: hostname,
        isHttps,
        isIpHost,
        resolvedIp,
        isPrivateOrInternal: true,
        isSuspiciousTld,
        heuristicRedFlags: flags,
      };
    }
  } catch (err) {
    flags.push('Domain could not be resolved via public DNS. Domain may be inactive or newly registered.');
    return {
      isValidUrl: true,
      normalizedUrl: parsed.href,
      domain: hostname,
      isHttps,
      isIpHost,
      isPrivateOrInternal: false,
      isSuspiciousTld,
      heuristicRedFlags: flags,
    };
  }

  // Safe backend fetch with size limits & short timeout
  let extractedTitle: string | undefined;
  let extractedMetaDescription: string | undefined;
  let extractedTextSnippet: string | undefined;

  try {
    const response = await axios.get(parsed.href, {
      timeout: 3500, // 3.5 seconds max
      maxContentLength: 512 * 1024, // 512KB limit
      maxRedirects: 2,
      headers: {
        'User-Agent': 'ScamLensBharat-SecurityAuditor/1.0 (+https://scamlens-bharat.local/about)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      validateStatus: (status) => status >= 200 && status < 400,
    });

    const html = typeof response.data === 'string' ? response.data : '';
    if (html) {
      const $ = cheerio.load(html);
      extractedTitle = $('title').first().text().trim().substring(0, 150);
      extractedMetaDescription = $('meta[name="description"]').attr('content')?.trim().substring(0, 300) ||
                                 $('meta[property="og:description"]').attr('content')?.trim().substring(0, 300);
      
      // Extract safe body snippet
      $('script, style, svg, noscript, nav, footer').remove();
      const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
      extractedTextSnippet = bodyText.substring(0, 1000);
    }
  } catch (fetchErr: any) {
    flags.push(`Webpage metadata could not be safely extracted: ${fetchErr?.message || 'Connection unreachable'}`);
  }

  return {
    isValidUrl: true,
    normalizedUrl: parsed.href,
    domain: hostname,
    isHttps,
    isIpHost,
    resolvedIp,
    isPrivateOrInternal,
    isSuspiciousTld,
    extractedTitle,
    extractedMetaDescription,
    extractedTextSnippet,
    heuristicRedFlags: flags,
  };
}
