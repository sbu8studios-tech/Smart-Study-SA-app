import React, { useState, useCallback, ReactNode } from 'react';
import { FileUploadService } from '../services/fileUploadService.ts';
// FIX: Corrected import path for Icons.tsx to be a relative path.
import { CloudUploadIcon, CloseIcon, FileIcon, ImageIcon } from './Icons';

interface FileUploadInterfaceProps {
  uploadedFiles: File[];
  onFilesSelect: (files: File[]) => void;
  onRemoveFile: (file: File) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (fileType: string): ReactNode => {
    if (fileType.startsWith('image/')) {
        return <ImageIcon className="w-6 h-6 text-warning-500" />;
    }
    // Could add more specific icons for PDF, DOC, etc. later
    return <FileIcon className="w-6 h-6 text-primary-500" />;
};

const FileUploadInterface: React.FC<FileUploadInterfaceProps> = ({ uploadedFiles, onFilesSelect, onRemoveFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const filesArray = Array.from(files);
    // In a real app with strict validation, you might filter here
    // based on FileUploadService methods. For this simulation, we accept all.
    onFilesSelect(filesArray);
  }, [onFilesSelect]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  }, [processFiles]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(event.target.files);
      // Reset input to allow selecting the same file again
      event.target.value = '';
  };

  return (
    <div className="w-full flex flex-col p-2 space-y-4">
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors duration-300 ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : 'border-border-medium hover:border-primary-500/50'}`}
      >
        <CloudUploadIcon className={`w-12 h-12 text-text-tertiary transition-colors ${isDragging ? 'text-primary-500' : ''}`} />
        <p className="mt-2 text-center text-sm text-text-secondary">
            <label htmlFor="file-upload" className="font-semibold text-primary-600 dark:text-primary-500 cursor-pointer hover:underline">
                Click to upload
            </label>
            {' '}or drag and drop
        </p>
         <p className="text-xs text-text-tertiary">Images, PDF, DOCX (max 25MB)</p>
        <input
          id="file-upload"
          type="file"
          multiple
          accept={Object.values(FileUploadService.allowedTypes).flat().join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
          <h4 className="text-sm font-bold text-text-secondary">Selected Files ({uploadedFiles.length})</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center p-2 bg-bg-primary rounded-md border border-border-light">
                <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                <div className="ml-3 flex-grow min-w-0">
                    <p className="text-sm font-semibold truncate text-text-primary">{file.name}</p>
                    <p className="text-xs text-text-secondary">{formatFileSize(file.size)}</p>
                </div>
                 <button 
                    onClick={() => onRemoveFile(file)}
                    className="ml-2 p-1 rounded-full text-text-tertiary hover:bg-bg-tertiary"
                    aria-label={`Remove ${file.name}`}
                 >
                    <CloseIcon className="w-4 h-4" />
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadInterface;