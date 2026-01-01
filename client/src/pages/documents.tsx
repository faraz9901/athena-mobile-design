import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Camera, 
  MoreVertical,
  FolderOpen
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Tender_Specs_Final_v2.pdf",
    type: "PDF",
    size: "4.5 MB",
    date: "Today",
    project: "City Center Mall",
    category: "Tender"
  },
  {
    id: 2,
    name: "Site_Survey_Map_Plot4.jpg",
    type: "IMG",
    size: "12.1 MB",
    date: "Yesterday",
    project: "Highway 45",
    category: "Drawings"
  },
  {
    id: 3,
    name: "NOC_Fire_Dept_Approval.pdf",
    type: "PDF",
    size: "1.2 MB",
    date: "23 Jan",
    project: "Green Valley",
    category: "Legal"
  },
  {
    id: 4,
    name: "Material_Invoice_Jan.pdf",
    type: "PDF",
    size: "800 KB",
    date: "20 Jan",
    project: "City Center Mall",
    category: "Finance"
  }
];

export default function Documents() {
  return (
    <MobileLayout title="Documents" fabAction={() => {}} fabIcon={<Camera className="h-6 w-6" />}>
      <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Documents</h1>
          <Button variant="outline" size="sm" className="h-8 rounded-full">
            <FolderOpen className="mr-2 h-3.5 w-3.5" /> Folders
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search files..." 
              className="pl-9 bg-secondary/30 border-none rounded-xl h-11"
            />
          </div>
          <Button variant="secondary" size="icon" className="h-11 w-11 rounded-xl shrink-0">
             <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="px-5 mt-2 space-y-3 pb-24">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group border border-border/40">
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
              doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
            }`}>
              {doc.type}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-semibold truncate pr-2 text-foreground">
                  {doc.name}
                </h4>
                <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-2 text-muted-foreground">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal border-border bg-background">
                  {doc.category}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{doc.size} • {doc.date}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 truncate">
                 {doc.project}
              </p>
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
}
