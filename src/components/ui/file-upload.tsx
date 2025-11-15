import * as React from 'react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  id: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  error?: string;
  className?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ id, file, onFileChange, accept = '.csv', error, className }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        validateAndSetFile(droppedFile);
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        validateAndSetFile(selectedFile);
      }
    };

    const validateAndSetFile = (file: File) => {
      if (accept && !file.name.toLowerCase().endsWith(accept.replace('.', ''))) {
        onFileChange(null);
        return;
      }
      onFileChange(file);
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
      <div className={cn('space-y-2', className)}>
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300',
            error && 'border-red-500',
            'hover:border-primary/50'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onFileChange(null)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center">
              <input
                ref={ref}
                id={id}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor={id} className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-700">
                    Drag and drop your CSV file here
                  </p>
                  <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-2">Accepted: CSV files only</p>
                </div>
              </label>
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };