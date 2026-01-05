import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  Info,
  ArrowRight
} from "lucide-react";
import { useLocation } from "wouter";

// Mock document categories
const documentCategories = [
  "Tender Document",
  "Technical Specifications",
  "Financial Bid",
  "Site Survey Report",
  "Legal Documents",
  "Drawings & Plans",
  "Other"
];

export default function CreateProjectUpload() {
  const [, setLocation] = useLocation();
  const [projectName, setProjectName] = useState("");
  const [hasDocumentsChoice, setHasDocumentsChoice] = useState<"yes" | "no" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    name: string;
    size: string;
    category: string;
  }>>([
    // Mock uploaded files for demonstration
    { id: "1", name: "Tender_Specification_v2.pdf", size: "2.4 MB", category: "Tender Document" },
    { id: "2", name: "Site_Plan_Drawing.pdf", size: "5.1 MB", category: "Drawings & Plans" }
  ]);

  const handleFileUpload = () => {
    // In a real app, this would handle file selection
    // For now, we'll add mock files
    if (selectedCategory && uploadedFiles.length < 5) {
      const newFile = {
        id: Date.now().toString(),
        name: `Document_${uploadedFiles.length + 1}.pdf`,
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        category: selectedCategory
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedCategory("");
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  const handleContinue = () => {
    // Navigate to project creation form
    setLocation("/create-project-form");
  };

  // First screen: ask if user has documents to upload
  if (hasDocumentsChoice === null) {
    return (
      <MobileLayout title="Create Project">
        <div className="px-5 py-10 h-[80vh] flex flex-col justify-center space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">How do you want to start?</h1>
            <p className="text-sm text-muted-foreground">
              You can upload documents and let Athena auto-extract details, or skip upload and fill the project form manually.
            </p>
          </div>

          <div className="space-y-3">
            <Card className="border border-primary/40 bg-primary/5">
              <CardContent className="p-4 space-y-2">
                <p className="text-sm font-semibold">Upload project documents</p>
                <p className="text-xs text-muted-foreground">
                  Recommended if you have tender, drawings or other key documents handy.
                </p>
                <Button
                  type="button"
                  className="mt-1 w-full h-10 rounded-xl text-sm"
                  onClick={() => setHasDocumentsChoice("yes")}
                >
                  Yes, I want to upload documents
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-muted/40">
              <CardContent className="p-4 space-y-2">
                <p className="text-sm font-semibold">Enter details manually</p>
                <p className="text-xs text-muted-foreground">
                  Ideal if you don't have documents right now. You can still upload them later inside the project.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-1 w-full h-10 rounded-xl text-sm"
                  onClick={handleContinue}
                >
                  No, take me to the form
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MobileLayout>
    );
  }

  // Second screen: user chose to upload documents
  return (
    <MobileLayout title="Create Project">
      <div className="px-5 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Upload Documents</h1>
          <p className="text-sm text-muted-foreground">
            Upload project documents to auto-extract information
          </p>
        </div>

        {/* Project Name Field */}
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        {/* Document Category Selector */}
        <div className="space-y-2">
          <Label>Document Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="Select document category" />
            </SelectTrigger>
            <SelectContent>
              {documentCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* File Upload Section */}
        <div className="space-y-3">
          <Label>Upload Documents</Label>
          <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX, JPG, PNG (Max 10 MB per file)
                  </p>
                </div>
                <Button
                  onClick={handleFileUpload}
                  disabled={!selectedCategory}
                  className="rounded-xl"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Select Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Documents ({uploadedFiles.length})</Label>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <Card key={file.id} className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {file.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {file.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFile(file.id)}
                        className="h-8 w-8 shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Info Note */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary mb-1">
                  Auto-Extraction Enabled
                </p>
                <p className="text-xs text-muted-foreground">
                  System will auto-extract data from documents including tender details,
                  amounts, dates, and other project information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="pt-4 pb-8">
          <Button
            onClick={handleContinue}
            className="w-full h-12 rounded-xl text-base font-semibold"
            disabled={!projectName || uploadedFiles.length === 0}
          >
            Continue to Project Details
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-3">
            You can add more documents later
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
