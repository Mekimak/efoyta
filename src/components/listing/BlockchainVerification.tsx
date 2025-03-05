import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Upload, Check, AlertCircle, Copy, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface BlockchainVerificationProps {
  onVerify?: (data: any) => void;
}

const BlockchainVerification: React.FC<BlockchainVerificationProps> = ({
  onVerify = () => {},
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [documentType, setDocumentType] = useState<"kebele" | "rental" | "">(
    "",
  );
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    setIsUploading(true);

    // Simulate blockchain verification process
    setTimeout(() => {
      setIsUploading(false);
      setIsVerified(true);
      setTransactionId("Sol" + Math.random().toString(16).slice(2, 10));

      onVerify({
        verified: true,
        transactionId: "Sol" + Math.random().toString(16).slice(2, 10),
        documentType,
        timestamp: new Date().toISOString(),
      });
    }, 2000);
  };

  const copyTransactionId = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-black/40 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-playfair text-emerald-900 dark:text-emerald-50 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 text-emerald-600"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Blockchain Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-emerald-700 dark:text-emerald-300">
              Verify your property listing with tamper-proof blockchain
              technology. Upload your Kebele ID or rental agreement to create a
              secure hash on the Solana blockchain.
            </p>

            {!isVerified ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={documentType === "kebele" ? "default" : "outline"}
                    className={
                      documentType === "kebele"
                        ? "bg-emerald-600"
                        : "border-emerald-200 dark:border-emerald-800"
                    }
                    onClick={() => setDocumentType("kebele")}
                  >
                    Kebele ID
                  </Button>
                  <Button
                    variant={documentType === "rental" ? "default" : "outline"}
                    className={
                      documentType === "rental"
                        ? "bg-emerald-600"
                        : "border-emerald-200 dark:border-emerald-800"
                    }
                    onClick={() => setDocumentType("rental")}
                  >
                    Rental Agreement
                  </Button>
                </div>

                {documentType && (
                  <div className="border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-lg p-8">
                    <div className="flex flex-col items-center justify-center">
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
                          <p className="text-emerald-700 dark:text-emerald-300 text-center">
                            Verifying and creating blockchain hash...
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-emerald-500 mb-4" />
                          <p className="text-emerald-700 dark:text-emerald-300 text-center mb-4">
                            Drag and drop your{" "}
                            {documentType === "kebele"
                              ? "Kebele ID"
                              : "Rental Agreement"}{" "}
                            document here, or click to browse
                          </p>
                          <Label
                            htmlFor="document-upload"
                            className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md inline-flex items-center"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                          </Label>
                          <Input
                            id="document-upload"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </>
                      )}
                    </div>
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
                        Your document is never stored on our servers. We only
                        create a secure hash of your document that is stored on
                        the Solana blockchain for verification purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-100 dark:bg-emerald-800 p-2 rounded-full">
                      <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200">
                        Verification Successful
                      </h3>
                      <p className="text-emerald-600 dark:text-emerald-400">
                        Your{" "}
                        {documentType === "kebele"
                          ? "Kebele ID"
                          : "Rental Agreement"}{" "}
                        has been verified on the Solana blockchain
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-black/60 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800/30">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                        Transaction ID
                      </h4>
                      <Badge className="bg-emerald-600 text-white">
                        Verified Chain
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/30 rounded p-2">
                      <code className="text-emerald-800 dark:text-emerald-300 text-sm font-mono">
                        {transactionId}
                      </code>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-800/50"
                          onClick={copyTransactionId}
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-emerald-600" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-800/50"
                        >
                          <ExternalLink className="h-4 w-4 text-emerald-600" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                      Verified on {new Date().toLocaleString()} • Hash stored on
                      Solana blockchain
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Your listing now displays the "Verified Chain" badge to
                    potential renters
                  </p>
                  <Button
                    variant="outline"
                    className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/30"
                    onClick={() => {
                      setIsVerified(false);
                      setTransactionId("");
                      setDocumentType("");
                    }}
                  >
                    Verify Another Document
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlockchainVerification;
