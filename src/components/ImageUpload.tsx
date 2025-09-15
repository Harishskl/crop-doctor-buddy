import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon } from 'lucide-react';

const ImageUpload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);

  // onDrop handler with useCallback for stable reference
  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('image', file);

      setIsUploading(true);

      try {
        const response = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          await response.json();
          toast.success('Image uploaded successfully!');
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    },
    []
  );

  // Correct hook usage for v15+
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <>
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                {isDragActive
                  ? 'Drop the image here'
                  : 'Drag & drop an image here, or click to select'}
              </p>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Select Image
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Supports JPG, JPEG, PNG files
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
