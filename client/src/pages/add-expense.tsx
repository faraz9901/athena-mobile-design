import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Camera,
  FileText,
  Save,
  Scan,
  DollarSign,
  Percent,
  Calendar,
  User,
  CreditCard,
  Receipt
} from "lucide-react";
import { useLocation } from "wouter";

// Mock categories
const expenseCategories = [
  "Materials",
  "Labor",
  "Equipment",
  "Fuel",
  "Food",
  "Safety",
  "Transport",
  "Other"
];

const paymentModes = ["Cash", "Bank Transfer", "UPI", "Cheque", "Credit Card"];
const billingTypes = ["Bill", "Invoice", "Receipt", "Voucher"];
const paidByOptions = ["Self", "Partner", "Vendor", "Other"];

export default function AddExpense() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"manual" | "ocr">("manual");
  
  const [formData, setFormData] = useState({
    description: "",
    vendor: "",
    rate: "",
    unit: "",
    quantity: "",
    amount: "",
    gstPercent: "",
    category: "",
    paymentMode: "",
    billingType: "",
    paidBy: "",
    receiptReference: "",
    notes: "",
    date: new Date().toISOString().split('T')[0],
    project: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate amount if rate, quantity, and unit are provided
    if (field === "rate" || field === "quantity" || field === "unit") {
      const rate = field === "rate" ? parseFloat(value) : parseFloat(prev.rate);
      const qty = field === "quantity" ? parseFloat(value) : parseFloat(prev.quantity);
      if (rate && qty) {
        setFormData(prev => ({ ...prev, amount: (rate * qty).toFixed(2) }));
      }
    }
  };

  const handleSave = () => {
    // In real app, this would save to backend
    setLocation("/expenses");
  };

  return (
    <MobileLayout title="Add Expense">
      <div className="px-5 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/expenses")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Add Expense</h1>
        </div>

        {/* Mode Selection */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as "manual" | "ocr")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">
              <FileText className="mr-2 h-4 w-4" />
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="ocr">
              <Scan className="mr-2 h-4 w-4" />
              OCR Scan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual" className="space-y-6 mt-6">
            {/* Basic Information */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="h-11 rounded-xl"
                      placeholder="Enter expense description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor</Label>
                    <Input
                      id="vendor"
                      value={formData.vendor}
                      onChange={(e) => handleInputChange("vendor", e.target.value)}
                      className="h-11 rounded-xl"
                      placeholder="Vendor name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select value={formData.project} onValueChange={(v) => handleInputChange("project", v)}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city-center">City Center Mall</SelectItem>
                        <SelectItem value="highway-45">Highway 45</SelectItem>
                        <SelectItem value="green-valley">Green Valley</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(v) => handleInputChange("category", v)}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rate, Unit, Quantity */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Quantity & Pricing
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="rate">Rate (₹)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="rate"
                        type="number"
                        value={formData.rate}
                        onChange={(e) => handleInputChange("rate", e.target.value)}
                        className="pl-9 h-11 rounded-xl"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => handleInputChange("unit", e.target.value)}
                      className="h-11 rounded-xl"
                      placeholder="kg, pcs, etc"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      className="h-11 rounded-xl"
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Details */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Financial Details
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => handleInputChange("amount", e.target.value)}
                        className="pl-9 h-11 rounded-xl"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstPercent">GST %</Label>
                    <div className="relative">
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="gstPercent"
                        type="number"
                        value={formData.gstPercent}
                        onChange={(e) => handleInputChange("gstPercent", e.target.value)}
                        className="pr-9 h-11 rounded-xl"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment & Billing */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Payment & Billing
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMode">Payment Mode</Label>
                    <Select value={formData.paymentMode} onValueChange={(v) => handleInputChange("paymentMode", v)}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select payment mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentModes.map((mode) => (
                          <SelectItem key={mode} value={mode.toLowerCase().replace(' ', '-')}>
                            {mode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingType">Billing Type</Label>
                    <Select value={formData.billingType} onValueChange={(v) => handleInputChange("billingType", v)}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select billing type" />
                      </SelectTrigger>
                      <SelectContent>
                        {billingTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paidBy">Paid By</Label>
                    <Select value={formData.paidBy} onValueChange={(v) => handleInputChange("paidBy", v)}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select who paid" />
                      </SelectTrigger>
                      <SelectContent>
                        {paidByOptions.map((option) => (
                          <SelectItem key={option} value={option.toLowerCase()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receiptReference">Receipt Reference</Label>
                    <Input
                      id="receiptReference"
                      value={formData.receiptReference}
                      onChange={(e) => handleInputChange("receiptReference", e.target.value)}
                      className="h-11 rounded-xl"
                      placeholder="Receipt/Invoice number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="pl-9 h-11 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 space-y-3">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="min-h-[100px] rounded-xl"
                  placeholder="Additional notes or remarks..."
                />
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={!formData.description || !formData.amount}
              className="w-full h-12 rounded-xl text-base font-semibold"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Expense
            </Button>
          </TabsContent>

          <TabsContent value="ocr" className="space-y-6 mt-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                  <Camera className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Scan Receipt</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Take a photo of your receipt or invoice to auto-extract expense details
                  </p>
                  <Button className="rounded-xl">
                    <Camera className="mr-2 h-4 w-4" />
                    Open Camera
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  You can review and edit extracted data before saving
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-8"></div>
      </div>
    </MobileLayout>
  );
}

