import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onFileSelected: (file: File | null) => void;
  selectedFile: File | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelected,
  selectedFile,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Unsupported format. Please upload a PNG, JPG, or WEBP screenshot.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size too large. Screenshots must be under 10MB.');
      return;
    }

    setErrorMsg(null);
    onFileSelected(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  return (
    <div className="w-full">
      {errorMsg && (
        <div className="mb-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-brand-500 bg-brand-50/50'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/70 hover:bg-slate-50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-800 mb-1">
            Click to upload or drag and drop screenshot
          </p>
          <p className="text-xs text-slate-500">
            Supports WhatsApp chats, Telegram alerts, SMS, or trading app screenshots (PNG, JPG, WEBP up to 10MB)
          </p>
        </div>
      ) : (
        <div className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-4">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Screenshot Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-100"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-600 shrink-0" />
              <p className="text-sm font-semibold text-slate-900 truncate">
                {selectedFile.name}
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {(selectedFile.size / 1024).toFixed(1)} KB • Ready for Vision OCR extraction
            </p>
          </div>
          <button
            type="button"
            onClick={() => onFileSelected(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Remove image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
