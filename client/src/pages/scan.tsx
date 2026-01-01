import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Search, FileText, Clock, FolderOpen } from "lucide-react";

const projects = [
    { id: 1, name: "City Center Mall" },
    { id: 2, name: "Highway 45" },
    { id: 3, name: "Green Valley" },
];

const scansByProject: Record<number, { id: number; name: string; type: string; time: string; project: string; category: string }[]> = {
    1: [
        {
            id: 1,
            name: "Site_Log_01-02-2025.jpg",
            type: "IMG",
            time: "Today • 10:15 AM",
            project: "City Center Mall",
            category: "Site Photo",
        },
        {
            id: 2,
            name: "Signed_Work_Order.pdf",
            type: "PDF",
            time: "Yesterday • 5:42 PM",
            project: "City Center Mall",
            category: "Approvals",
        },
    ],
    2: [
        {
            id: 3,
            name: "Chainage_Markers_Set1.jpg",
            type: "IMG",
            time: "Today • 9:02 AM",
            project: "Highway 45",
            category: "Survey",
        },
    ],
    3: [
        {
            id: 4,
            name: "Client_Signoff_Slab1.pdf",
            type: "PDF",
            time: "Mon • 3:30 PM",
            project: "Green Valley",
            category: "Client Signoff",
        },
    ],
};

export default function ScanDocuments() {
    const [selectedProjectId, setSelectedProjectId] = useState<number>(projects[0]?.id ?? 1);
    const [search, setSearch] = useState("");

    const scans = (scansByProject[selectedProjectId] || []).filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MobileLayout title="Scan Documents" fabAction={() => { }} fabIcon={<Camera className="h-6 w-6" />}>
            <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Scan Documents</h1>
                    {/* <Button variant="outline" size="sm" className="h-8 rounded-full">
                        <FolderOpen className="mr-2 h-3.5 w-3.5" /> Library
                    </Button> */}
                </div>

                <Tabs
                    defaultValue={String(selectedProjectId)}
                    value={String(selectedProjectId)}
                    onValueChange={(val) => setSelectedProjectId(Number(val))}
                    className="w-full"
                >
                    <TabsList className="w-full grid grid-cols-3 bg-secondary/30 p-1">
                        {projects.map((p) => (
                            <TabsTrigger key={p.id} value={String(p.id)} className="text-xs">
                                {p.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search scans in this project..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-secondary/30 border-none rounded-xl h-11"
                        />
                    </div>
                    <Button variant="secondary" size="icon" className="h-11 w-11 rounded-xl shrink-0">
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="px-5 mt-2 space-y-3 pb-24">
                {scans.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                        <Camera className="h-6 w-6 mb-2 opacity-60" />
                        <p className="text-sm">No scans for this project yet</p>
                        <p className="text-xs mt-1">Use the camera button to capture or upload a document.</p>
                    </div>
                ) : (
                    scans.map((doc) => (
                        <Card
                            key={doc.id}
                            className="border-none shadow-sm ring-1 ring-black/5 hover:bg-secondary/20 transition-colors cursor-pointer"
                        >
                            <CardContent className="p-3 flex items-center gap-3">
                                <div
                                    className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-[11px] ${doc.type === "PDF" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                        }`}
                                >
                                    {doc.type}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="text-sm font-semibold truncate text-foreground">{doc.name}</h4>
                                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                                            <Clock className="h-3 w-3" /> {doc.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge
                                            variant="outline"
                                            className="text-[10px] h-5 px-1.5 font-normal border-border bg-background"
                                        >
                                            {doc.category}
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground truncate">{doc.project}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </MobileLayout>
    );
}
