
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type ImageUploaderProps = {
  onImageSelect: (image: File) => void;
  isAnalyzing?: boolean;
};

export default function ImageUploader({ onImageSelect, isAnalyzing = false }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }
    
    // Check if the user is authenticated
    if (!user) {
      toast.error('Please login to analyze plant images.', {
        action: {
          label: 'Login',
          onClick: () => navigate('/auth/login')
        }
      });
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      onImageSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full animate-fade-up">
      {!previewUrl ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out",
            "flex flex-col items-center justify-center text-center",
            isDragging 
              ? "border-plant-400 bg-plant-50 dark:bg-plant-950/20" 
              : "border-border bg-background/50 hover:bg-background hover:border-muted-foreground/20"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-plant-100 flex items-center justify-center">
            <Upload className="w-6 h-6 text-plant-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Upload a plant image</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md">
            Drag and drop your image here, or click to browse. We support JPG, PNG and WebP images up to 10MB.
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-plant-500 hover:bg-plant-600 text-white"
          >
            Select Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border animate-scale-in">
          <div className="aspect-[16/9] w-full relative">
            <img
              src={previewUrl}
              alt="Plant preview"
              className="w-full h-full object-cover"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col items-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mb-3" />
                  <p className="font-medium">Analyzing image...</p>
                </div>
              </div>
            )}
          </div>
          {!isAnalyzing && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-95"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <div className="p-4 bg-card">
            <p className="font-medium flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              Ready for analysis
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
