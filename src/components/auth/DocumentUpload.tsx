import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload, Check, X, AlertCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface DocumentUploadProps {
  onUpload: (file: File) => Promise<void>;
  error?: string | null;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload, error }) => {
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedDocument(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedDocument) return;

    setIsLoading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    try {
      await onUpload(uploadedDocument);
      setUploadProgress(100);
    } catch (error) {
      console.error("Document upload error:", error);
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-4">
          <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-medium text-emerald-900 dark:text-emerald-50 mb-2">
          Verify Your Identity
        </h3>
        <p className="text-emerald-600 dark:text-emerald-400">
          Please upload your Kebele ID or property ownership document
        </p>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-lg p-8 text-center">
          {uploadedDocument ? (
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                {uploadedDocument.name}
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                {(uploadedDocument.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUploadedDocument(null)}
                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          ) : (
            <Label
              htmlFor="document-upload"
              className="cursor-pointer block space-y-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <Upload className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-emerald-700 dark:text-emerald-300">
                Drag and drop your document here, or click to browse
              </p>
              <Button
                variant="outline"
                className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select Document
              </Button>
              <Input
                id="document-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleDocumentUpload}
              />
            </Label>
          )}
        </div>

        {isLoading && uploadedDocument && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-emerald-700 dark:text-emerald-300">
                Uploading...
              </span>
              <span className="text-emerald-700 dark:text-emerald-300">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-red-500 dark:text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-800 dark:text-amber-300 font-medium">
                Important Privacy Note
              </h4>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                Your document is securely stored and only used for verification
                purposes. We use blockchain technology to verify without storing
                sensitive data.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-emerald-900/20 dark:hover:shadow-emerald-900/40 luxury-button"
          disabled={isLoading || !uploadedDocument}
        >
          {isLoading ? "Uploading Document..." : "Complete Verification"}
        </Button>
      </div>
    </motion.div>
  );
};

export default DocumentUpload;
