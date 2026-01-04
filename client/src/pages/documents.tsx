import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Camera,
  MoreVertical,
  Menu,
} from "lucide-react";
import { DocumentsType } from "@/types/documents.types";

type DocumentItem = {
  id: number;
  name: string;
  type: "PDF" | "IMG" | "DOC";
  size: string;
  date: string;
  project: string;
  documentType: DocumentsType;
};

const documents: DocumentItem[] = [
  {
    id: 1,
    name: "Tender_Notice_City_Center_Mall.pdf",
    type: "PDF",
    size: "4.5 MB",
    date: "Today",
    project: "City Center Mall",
    documentType: DocumentsType.TENDER_NOTICE,
  },
  {
    id: 2,
    name: "Work_Drawings_Highway_45_Structural.pdf",
    type: "PDF",
    size: "12.1 MB",
    date: "Yesterday",
    project: "Highway 45",
    documentType: DocumentsType.WORK_DRAWINGS,
  },
  {
    id: 3,
    name: "Payment_Receipt_Green_Valley_1st_Interim.pdf",
    type: "PDF",
    size: "1.2 MB",
    date: "23 Jan",
    project: "Green Valley",
    documentType: DocumentsType.PAYMENT_RECEIPT,
  },
  {
    id: 4,
    name: "Work_Agreement_City_Center_Mall.pdf",
    type: "PDF",
    size: "800 KB",
    date: "20 Jan",
    project: "City Center Mall",
    documentType: DocumentsType.WORK_AGREEMENT,
  },
];

const projects = Array.from(new Set(documents.map((doc) => doc.project)));

export default function Documents() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [projectFilter, setProjectFilter] = React.useState<string | "all">("all");
  const [documentTypeFilter, setDocumentTypeFilter] = React.useState<DocumentsType | "all">("all");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProject =
      projectFilter === "all" || doc.project === projectFilter;

    const matchesDocumentType =
      documentTypeFilter === "all" || doc.documentType === documentTypeFilter;

    return matchesSearch && matchesProject && matchesDocumentType;
  });

  return (
    <MobileLayout
      title="Documents"
      sidebarOpen={sidebarOpen}
      onCloseSidebar={() => setSidebarOpen(false)}
      fabAction={() => { }}
      fabIcon={<Camera className="h-6 w-6" />}
    >
      <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Documents</h1>
          </div>
          {/* <Button variant="outline" size="sm" className="h-8 rounded-full">
            <FolderOpen className="mr-2 h-3.5 w-3.5" /> Folders
          </Button> */}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                className="pl-9 bg-secondary/30 border-none rounded-xl h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <Button variant="secondary" size="icon" className="h-11 w-11 rounded-xl shrink-0">
            <Filter className="h-4 w-4" />
          </Button> */}
          </div>

          <div className="flex gap-2">
            <select
              className="flex-1 h-9 rounded-lg bg-secondary/40 text-xs px-2 border border-border/40"
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value as string | "all")}
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>

            <select
              className="flex-1 h-9 rounded-lg bg-secondary/40 text-xs px-2 border border-border/40"
              value={documentTypeFilter === "all" ? "all" : documentTypeFilter}
              onChange={(e) =>
                setDocumentTypeFilter(
                  e.target.value === "all"
                    ? "all"
                    : (e.target.value as DocumentsType)
                )
              }
            >
              <option value="all">All Document Types</option>
              {Object.values(DocumentsType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="px-5 mt-2 space-y-3 pb-24">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group border border-border/40">
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
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
                  {doc.documentType}
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
