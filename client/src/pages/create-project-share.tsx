import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  CheckCircle2,
  Info,
  UserPlus,
  Percent,
  Users,
  AlertCircle
} from "lucide-react";
import { useLocation } from "wouter";

// Mock partners data
const mockPartners = [
  { id: "1", name: "John Doe", email: "john@example.com", avatar: "JD" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "JS" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", avatar: "MJ" }
];

export default function CreateProjectShare() {
  const [, setLocation] = useLocation();
  const [shareType, setShareType] = useState<"fixed" | "partnership">("fixed");
  const [partners, setPartners] = useState<Array<{
    id: string;
    name: string;
    email: string;
    share: string;
  }>>([
    { id: "1", name: "John Doe", email: "john@example.com", share: "60" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", share: "40" }
  ]);

  const handleShareChange = (partnerId: string, value: string) => {
    setPartners(prev =>
      prev.map(p =>
        p.id === partnerId ? { ...p, share: value } : p
      )
    );
  };

  const addPartner = () => {
    const newPartner = mockPartners.find(
      p => !partners.some(existing => existing.id === p.id)
    );
    if (newPartner) {
      setPartners([...partners, { ...newPartner, share: "0" }]);
    }
  };

  const removePartner = (partnerId: string) => {
    setPartners(partners.filter(p => p.id !== partnerId));
  };

  const totalShare = partners.reduce((sum, p) => sum + parseFloat(p.share || "0"), 0);
  const isValid = shareType === "fixed" || totalShare === 100;

  const handleConfirm = () => {
    // Navigate to project detail or dashboard
    setLocation("/projects");
  };

  const handleBack = () => {
    setLocation("/create-project-form");
  };

  return (
    <MobileLayout title="Project Share">
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
            <h1 className="text-2xl font-bold">Project Share</h1>
          </div>
          <p className="text-sm text-muted-foreground ml-10">
            Configure project ownership and profit sharing
          </p>
        </div>

        {/* Share Type Selection */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <Label className="text-base font-semibold">Share Type</Label>
            <RadioGroup
              value={shareType}
              onValueChange={(value) => setShareType(value as "fixed" | "partnership")}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-transparent hover:border-primary/20 transition-colors cursor-pointer"
                   onClick={() => setShareType("fixed")}>
                <RadioGroupItem value="fixed" id="fixed" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="fixed" className="text-base font-medium cursor-pointer">
                    Fixed Share
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fixed percentage distribution among partners
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-transparent hover:border-primary/20 transition-colors cursor-pointer"
                   onClick={() => setShareType("partnership")}>
                <RadioGroupItem value="partnership" id="partnership" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="partnership" className="text-base font-medium cursor-pointer">
                    Partnership
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dynamic partnership with profit sharing
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Partners List */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Partners</Label>
              {shareType === "partnership" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addPartner}
                  className="h-8 text-xs"
                  disabled={partners.length >= mockPartners.length}
                >
                  <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                  Add Partner
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {partners.map((partner) => (
                <Card key={partner.id} className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            {partner.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{partner.name}</p>
                            <p className="text-xs text-muted-foreground">{partner.email}</p>
                          </div>
                        </div>
                        {shareType === "partnership" && partners.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePartner(partner.id)}
                            className="h-8 w-8"
                          >
                            <span className="text-lg">×</span>
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`share-${partner.id}`}>
                          Share Percentage
                        </Label>
                        <div className="relative">
                          <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id={`share-${partner.id}`}
                            type="number"
                            value={partner.share}
                            onChange={(e) => handleShareChange(partner.id, e.target.value)}
                            className="h-11 rounded-xl pr-9"
                            placeholder="0"
                            min="0"
                            max="100"
                            disabled={shareType === "fixed"}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Total Share Indicator */}
            {shareType === "partnership" && (
              <div className="pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Total Share</span>
                  </div>
                  <Badge
                    variant={totalShare === 100 ? "default" : "destructive"}
                    className="text-sm font-semibold"
                  >
                    {totalShare.toFixed(1)}%
                  </Badge>
                </div>
                {totalShare !== 100 && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-destructive">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>Total share must equal 100%</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200 mb-1">
                  Important Note
                </p>
                <p className="text-xs text-amber-800/80 dark:text-amber-300/80">
                  Only the project owner can edit share settings later. 
                  Make sure all information is correct before confirming.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profit Preview (if partnership) */}
        {shareType === "partnership" && totalShare === 100 && (
          <Card className="border-none shadow-sm bg-primary/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Profit Preview</Label>
              </div>
              <div className="space-y-2">
                {partners.map((partner) => {
                  const sharePercent = parseFloat(partner.share || "0");
                  const estimatedProfit = 150000; // Mock profit amount
                  const partnerProfit = (estimatedProfit * sharePercent) / 100;
                  
                  return (
                    <div key={partner.id} className="flex items-center justify-between p-2 rounded-lg bg-background">
                      <span className="text-sm text-muted-foreground">{partner.name}</span>
                      <span className="text-sm font-semibold">
                        ₹{partnerProfit.toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 pb-8 space-y-3">
          <Button
            onClick={handleConfirm}
            disabled={!isValid}
            className="w-full h-12 rounded-xl text-base font-semibold"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Confirm & Create Project
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

