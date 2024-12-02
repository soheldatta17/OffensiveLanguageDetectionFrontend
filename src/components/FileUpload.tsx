import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  error?: string;
}

export function FileUpload({ onFileSelect, error }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:border-blue-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-2 text-blue-500 transition-colors duration-300 group-hover:text-blue-600" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PDF files only</p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}