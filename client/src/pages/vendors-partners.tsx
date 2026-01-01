import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  UserPlus, 
  Search, 
  MoreVertical,
  CheckCircle2,
  Upload,
  Edit,
  Trash2,
  Mail,
  Phone
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockVendors = [
  {
    id: 1,
    name: "UltraTech Supplies",
    email: "contact@ultratech.com",
    phone: "+91 98765 43210",
    type: "vendor",
    access: "full",
    role: "Material Supplier",
    projects: ["City Center Mall", "Highway 45"],
    canUploadInvoices: true,
    canUpdateTasks: false
  },
  {
    id: 2,
    name: "ABC Construction Co.",
    email: "info@abcconstruction.com",
    phone: "+91 98765 43211",
    type: "partner",
    access: "full",
    role: "Construction Partner",
    projects: ["Green Valley", "City Center Mall"],
    canUploadInvoices: false,
    canUpdateTasks: true
  },
  {
    id: 3,
    name: "Safety First Gear",
    email: "sales@safetyfirst.com",
    phone: "+91 98765 43212",
    type: "vendor",
    access: "limited",
    role: "Safety Equipment",
    projects: ["Highway 45"],
    canUploadInvoices: true,
    canUpdateTasks: false
  }
];

export default function VendorsPartners() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "vendor" | "partner">("all");

  const filteredVendors = mockVendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || v.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <MobileLayout 
      title="Team Members" 
      fabAction={() => {}}
      fabIcon={<UserPlus className="h-6 w-6" />}
    >
      <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Vendors & Partners</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search vendors or partners..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/30 border-none rounded-xl h-11"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["All", "Vendors", "Partners"].map((filter, i) => {
            const value = i === 0 ? "all" : i === 1 ? "vendor" : "partner";
            return (
              <Badge 
                key={i} 
                variant={filterType === value ? "default" : "secondary"}
                onClick={() => setFilterType(value)}
                className="rounded-full px-4 py-1.5 text-xs font-normal cursor-pointer hover:opacity-90 shrink-0"
              >
                {filter}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-2 space-y-4">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="border-none shadow-sm ring-1 ring-black/5">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {vendor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">{vendor.name}</h3>
                      <Badge 
                        variant={vendor.type === "vendor" ? "secondary" : "default"}
                        className="text-xs"
                      >
                        {vendor.type === "vendor" ? "Vendor" : "Partner"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{vendor.role}</p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{vendor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{vendor.phone}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {vendor.access === "full" && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Full Access
                        </Badge>
                      )}
                      {vendor.canUploadInvoices && (
                        <Badge variant="outline" className="text-xs">
                          <Upload className="h-3 w-3 mr-1" />
                          Can Upload Invoices
                        </Badge>
                      )}
                      {vendor.canUpdateTasks && (
                        <Badge variant="outline" className="text-xs">
                          <Edit className="h-3 w-3 mr-1" />
                          Can Update Tasks
                        </Badge>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Projects:</p>
                      <div className="flex flex-wrap gap-1">
                        {vendor.projects.map((project, i) => (
                          <span key={i} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVendors.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                No {filterType === "all" ? "members" : filterType === "vendor" ? "vendors" : "partners"} found
              </p>
            </CardContent>
          </Card>
        )}

        <div className="h-8"></div>
      </div>
    </MobileLayout>
  );
}

