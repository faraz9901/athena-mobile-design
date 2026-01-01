import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  ArrowRight,
  Calendar,
  DollarSign,
  Building2,
  MapPin,
  FileText,
  Percent
} from "lucide-react";
import { useLocation } from "wouter";

// Mock auto-filled data (simulating OCR extraction)
const mockExtractedData = {
  nameOfWork: "City Center Mall Renovation & Expansion",
  locationOfWork: "123 Main Street, Downtown District, City 12345",
  tenderingAuthorityName: "Urban Development Authority",
  tenderingAuthorityAddress: "456 Government Plaza, Administrative Block, City 12345",
  departmentName: "Public Works Department",
  typeOfWork: "Commercial Construction",
  tenderId: "TDR-2024-001234",
  totalWorkAmount: "1200000",
  tentativeAmount: "1150000",
  workDuration: "18",
  bidSubmissionDate: "2024-02-15",
  emdAmount: "120000",
  emdRefundDate: "2024-03-01",
  startDate: "2024-03-15",
  endDate: "2024-09-15",
  applicableTaxes: [
    { name: "GST", percentage: "18" },
    { name: "Service Tax", percentage: "5" }
  ]
};

export default function CreateProjectForm() {
  const [, setLocation] = useLocation();
  
  // Form state with auto-filled values
  const [formData, setFormData] = useState({
    nameOfWork: mockExtractedData.nameOfWork,
    locationOfWork: mockExtractedData.locationOfWork,
    tenderingAuthorityName: mockExtractedData.tenderingAuthorityName,
    tenderingAuthorityAddress: mockExtractedData.tenderingAuthorityAddress,
    departmentName: mockExtractedData.departmentName,
    typeOfWork: mockExtractedData.typeOfWork,
    tenderId: mockExtractedData.tenderId,
    totalWorkAmount: mockExtractedData.totalWorkAmount,
    tentativeAmount: mockExtractedData.tentativeAmount,
    workDuration: mockExtractedData.workDuration,
    bidSubmissionDate: mockExtractedData.bidSubmissionDate,
    emdAmount: mockExtractedData.emdAmount,
    emdRefundDate: mockExtractedData.emdRefundDate,
    startDate: mockExtractedData.startDate,
    endDate: mockExtractedData.endDate,
    taxes: mockExtractedData.applicableTaxes
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTaxChange = (index: number, field: string, value: string) => {
    const newTaxes = [...formData.taxes];
    newTaxes[index] = { ...newTaxes[index], [field]: value };
    setFormData(prev => ({ ...prev, taxes: newTaxes }));
  };

  const addTax = () => {
    setFormData(prev => ({
      ...prev,
      taxes: [...prev.taxes, { name: "", percentage: "" }]
    }));
  };

  const removeTax = (index: number) => {
    setFormData(prev => ({
      ...prev,
      taxes: prev.taxes.filter((_, i) => i !== index)
    }));
  };

  const handleContinue = () => {
    setLocation("/create-project-share");
  };

  const handleBack = () => {
    setLocation("/create-project-upload");
  };

  return (
    <MobileLayout title="Project Details">
      <div className="px-5 py-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Project Details</h1>
          </div>
          <p className="text-sm text-muted-foreground ml-10">
            Review and edit auto-extracted information
          </p>
        </div>

        {/* Basic Information Section */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nameOfWork">Name of Work</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nameOfWork"
                    value={formData.nameOfWork}
                    onChange={(e) => handleInputChange("nameOfWork", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="locationOfWork">Location of Work</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="locationOfWork"
                    value={formData.locationOfWork}
                    onChange={(e) => handleInputChange("locationOfWork", e.target.value)}
                    className="pl-9 rounded-xl min-h-[80px]"
                    placeholder="Enter full address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="typeOfWork">Type of Work</Label>
                <Input
                  id="typeOfWork"
                  value={formData.typeOfWork}
                  onChange={(e) => handleInputChange("typeOfWork", e.target.value)}
                  className="h-11 rounded-xl"
                  placeholder="e.g., Commercial Construction"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenderId">Tender ID</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="tenderId"
                    value={formData.tenderId}
                    onChange={(e) => handleInputChange("tenderId", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tendering Authority Section */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Tendering Authority
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tenderingAuthorityName">Authority Name</Label>
                <Input
                  id="tenderingAuthorityName"
                  value={formData.tenderingAuthorityName}
                  onChange={(e) => handleInputChange("tenderingAuthorityName", e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenderingAuthorityAddress">Authority Address</Label>
                <Textarea
                  id="tenderingAuthorityAddress"
                  value={formData.tenderingAuthorityAddress}
                  onChange={(e) => handleInputChange("tenderingAuthorityAddress", e.target.value)}
                  className="rounded-xl min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departmentName">Department Name</Label>
                <Input
                  id="departmentName"
                  value={formData.departmentName}
                  onChange={(e) => handleInputChange("departmentName", e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information Section */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Financial Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="totalWorkAmount">Total Work Amount (₹)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="totalWorkAmount"
                    type="number"
                    value={formData.totalWorkAmount}
                    onChange={(e) => handleInputChange("totalWorkAmount", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tentativeAmount">Tentative Amount (₹) - Manual</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="tentativeAmount"
                    type="number"
                    value={formData.tentativeAmount}
                    onChange={(e) => handleInputChange("tentativeAmount", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emdAmount">EMD Amount (₹)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="emdAmount"
                    type="number"
                    value={formData.emdAmount}
                    onChange={(e) => handleInputChange("emdAmount", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dates & Duration Section */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Dates & Duration
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bidSubmissionDate">Bid Submission Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="bidSubmissionDate"
                    type="date"
                    value={formData.bidSubmissionDate}
                    onChange={(e) => handleInputChange("bidSubmissionDate", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emdRefundDate">EMD Refund Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="emdRefundDate"
                    type="date"
                    value={formData.emdRefundDate}
                    onChange={(e) => handleInputChange("emdRefundDate", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    className="pl-9 h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workDuration">Work Duration (Months)</Label>
                <Input
                  id="workDuration"
                  type="number"
                  value={formData.workDuration}
                  onChange={(e) => handleInputChange("workDuration", e.target.value)}
                  className="h-11 rounded-xl"
                  placeholder="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applicable Taxes Section */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Applicable Taxes
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTax}
                className="h-8 text-xs"
              >
                + Add Tax
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.taxes.map((tax, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <Label>Tax Name</Label>
                    <Input
                      value={tax.name}
                      onChange={(e) => handleTaxChange(index, "name", e.target.value)}
                      className="h-10 rounded-xl"
                      placeholder="e.g., GST"
                    />
                  </div>
                  <div className="w-24 space-y-2">
                    <Label>%</Label>
                    <div className="relative">
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={tax.percentage}
                        onChange={(e) => handleTaxChange(index, "percentage", e.target.value)}
                        className="h-10 rounded-xl pr-9"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  {formData.taxes.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTax(index)}
                      className="h-10 w-10 mt-6"
                    >
                      <span className="text-lg">×</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="pt-4 pb-8 space-y-3">
          <Button
            onClick={handleContinue}
            className="w-full h-12 rounded-xl text-base font-semibold"
          >
            Continue to Share Setup
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-full h-11 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}

