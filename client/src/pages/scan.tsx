import React, { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Search, FileText, Clock, Upload, ArrowLeft, Check, Loader2, X } from "lucide-react";
import { Label } from "@/components/ui/label"; // Assuming this exists or I'll use div/label
import { cn } from "@/lib/utils"; // Assuming utils exists

// Mock Data
const projects = [
    { id: 1, name: "City Center Mall" },
    { id: 2, name: "Highway 45" },
    { id: 3, name: "Green Valley" },
];

const initialScans: Record<number, { id: number; name: string; type: string; time: string; project: string; category: string }[]> = {
    1: [
        { id: 1, name: "Site_Log_01-02-2025.jpg", type: "IMG", time: "Today • 10:15 AM", project: "City Center Mall", category: "Site Photo" },
        { id: 2, name: "Signed_Work_Order.pdf", type: "PDF", time: "Yesterday • 5:42 PM", project: "City Center Mall", category: "Approvals" },
    ],
    2: [
        { id: 3, name: "Chainage_Markers_Set1.jpg", type: "IMG", time: "Today • 9:02 AM", project: "Highway 45", category: "Survey" },
    ],
    3: [
        { id: 4, name: "Client_Signoff_Slab1.pdf", type: "PDF", time: "Mon • 3:30 PM", project: "Green Valley", category: "Client Signoff" },
    ],
};

type ViewState = "LIST" | "CAMERA" | "PROCESSING" | "REVIEW" | "PROJECT_SELECT";

export default function ScanDocuments() {
    const [viewState, setViewState] = useState<ViewState>("LIST");
    const [selectedProjectId, setSelectedProjectId] = useState<number>(projects[0]?.id ?? 1);
    const [search, setSearch] = useState("");
    const [scansByProject, setScansByProject] = useState(initialScans);

    // Form State for Review
    const [extractedData, setExtractedData] = useState({
        name: "",
        category: "Invoice",
        date: new Date().toISOString().split('T')[0],
        vendor: "Home Depot",
        invoiceNumber: "INV-2024-001",
        amount: "$1,250.00",
        tax: "$125.00",
        notes: ""
    });

    // Mock processing effect
    useEffect(() => {
        if (viewState === "PROCESSING") {
            const timer = setTimeout(() => {
                setExtractedData({
                    name: `Scan_${new Date().getTime()}.jpg`,
                    category: "Invoice",
                    date: new Date().toISOString().split('T')[0],
                    vendor: "Apex Supplies Ltd",
                    invoiceNumber: "INV-88392",
                    amount: "$4,520.50",
                    tax: "$452.05",
                    notes: "Material for Block C"
                });
                setViewState("REVIEW");
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [viewState]);

    const handleSave = () => {
        const newScan = {
            id: Date.now(),
            name: extractedData.name,
            type: "IMG",
            time: "Just now",
            project: projects.find(p => p.id === selectedProjectId)?.name || "Unknown",
            category: extractedData.category
        };

        setScansByProject(prev => ({
            ...prev,
            [selectedProjectId]: [newScan, ...(prev[selectedProjectId] || [])]
        }));
        setViewState("LIST");
    };

    const currentScans = (scansByProject[selectedProjectId] || []).filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase())
    );

    // Render Camera View
    if (viewState === "CAMERA") {
        return (
            <div className="fixed inset-0 bg-black z-50 flex flex-col">
                <div className="absolute top-4 left-4 z-10">
                    <Button variant="secondary" size="icon" onClick={() => setViewState("LIST")} className="rounded-full bg-black/50 text-white border-none hover:bg-black/70">
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                {/* Viewfinder Mock */}
                <div className="flex-1 relative flex items-center justify-center bg-gray-900">
                    <div className="w-[80%] h-[60%] border-2 border-white/30 rounded-lg relative">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -mt-1 -ml-1"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary -mt-1 -mr-1"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -mb-1 -ml-1"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary -mb-1 -mr-1"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white/70 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">Align document here</p>
                        </div>
                    </div>
                </div>

                <div className="h-32 bg-black flex items-center justify-center gap-8 pb-8">
                    <Button variant="ghost" size="icon" className="text-white">
                        <FileText className="h-6 w-6" />
                    </Button>
                    <button
                        onClick={() => setViewState("PROCESSING")}
                        className="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center bg-transparent active:bg-white/20 transition-all"
                    >
                        <div className="h-12 w-12 rounded-full bg-white"></div>
                    </button>
                    <Button variant="ghost" size="icon" className="text-white">
                        <Upload className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        );
    }

    // Render Processing View
    if (viewState === "PROCESSING") {
        return (
            <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-6 space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full animate-ping bg-primary/20"></div>
                    <div className="relative bg-primary/10 p-4 rounded-full">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-bold">Processing Document</h2>
                    <p className="text-muted-foreground">Analyzing text and extracting data...</p>
                </div>
            </div>
        );
    }

    // Render Review View
    if (viewState === "REVIEW") {
        return (
            <ReviewView
                extractedData={extractedData}
                setExtractedData={setExtractedData}
                setViewState={setViewState}
            />
        );
    }

    // Render Project Selection View (after review, before saving)
    if (viewState === "PROJECT_SELECT") {
        return (
            <ProjectSelectView
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
                handleSave={handleSave}
                setViewState={setViewState}
            />
        );
    }

    // Default List View
    return (
        <MobileLayout title="Scan Documents" fabAction={() => setViewState("CAMERA")} fabIcon={<Camera className="h-6 w-6" />}>
            <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Scan Documents</h1>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        size="lg"
                        className="h-14 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border-0 shadow-none flex flex-col items-center justify-center gap-1"
                        onClick={() => setViewState("CAMERA")}
                    >
                        <Camera className="h-5 w-5" />
                        <span className="text-xs font-semibold">Open Camera</span>
                    </Button>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="h-14 rounded-xl flex flex-col items-center justify-center gap-1"
                        onClick={() => setViewState("PROCESSING")} // Mock upload by going straight to processing
                    >
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground">Upload File</span>
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search scans..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-secondary/30 border-none rounded-xl h-11"
                    />
                </div>
            </div>

            <div className="px-5 mt-3 space-y-3 pb-24">
                <div className="space-y-3">
                    {currentScans.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                            <Camera className="h-8 w-8 mb-3 opacity-30" />
                            <p className="text-sm font-medium">No scans yet</p>
                            <p className="text-xs text-muted-foreground mt-1 text-center max-w-[200px]">
                                Tap "Open Camera" to start digitizing your documents.
                            </p>
                        </div>
                    ) : (
                        currentScans.map((doc) => (
                            <Card
                                key={doc.id}
                                className="border-none shadow-sm ring-1 ring-black/5 hover:bg-secondary/20 transition-colors cursor-pointer"
                            >
                                <CardContent className="p-3 flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-[11px]",
                                            doc.type === "PDF" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                        )}
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
            </div>
        </MobileLayout>
    );
}

function ReviewView({ extractedData, setExtractedData, setViewState }: any) {
    return (
        <MobileLayout title="Review Scan" >
            <div className="p-5 space-y-6">
                <div className="aspect-[3/4] bg-secondary/30 rounded-xl overflow-hidden relative border border-border">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10">
                        [Document Preview]
                    </div>
                    {/* Mock overlay of extracted fields */}
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white hover:bg-green-600">High Confidence</Badge>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">Extracted Data</h3>
                        <p className="text-xs text-muted-foreground">Review and edit fields below</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase">Document Name</Label>
                            <Input
                                value={extractedData.name}
                                onChange={(e) => setExtractedData({ ...extractedData, name: e.target.value })}
                                className="font-medium bg-background"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase">Vendor / Supplier</Label>
                            <Input
                                value={extractedData.vendor}
                                onChange={(e) => setExtractedData({ ...extractedData, vendor: e.target.value })}
                                className="bg-background"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase">Invoice No.</Label>
                                <Input
                                    value={extractedData.invoiceNumber}
                                    onChange={(e) => setExtractedData({ ...extractedData, invoiceNumber: e.target.value })}
                                    className="bg-background"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase">Date</Label>
                                <Input
                                    type="text"
                                    value={extractedData.date}
                                    onChange={(e) => setExtractedData({ ...extractedData, date: e.target.value })}
                                    className="bg-background"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase">Total Amount</Label>
                                <Input
                                    value={extractedData.amount}
                                    onChange={(e) => setExtractedData({ ...extractedData, amount: e.target.value })}
                                    className="bg-background font-mono"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-muted-foreground uppercase">Tax</Label>
                                <Input
                                    value={extractedData.tax}
                                    onChange={(e) => setExtractedData({ ...extractedData, tax: e.target.value })}
                                    className="bg-background font-mono"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase">Category</Label>
                            <Input
                                value={extractedData.category}
                                onChange={(e) => setExtractedData({ ...extractedData, category: e.target.value })}
                                className="bg-background"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase">Extracted Notes</Label>
                            <Input
                                value={extractedData.notes}
                                onChange={(e) => setExtractedData({ ...extractedData, notes: e.target.value })}
                                className="bg-yellow-50/50 border-yellow-200 text-yellow-800"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setViewState("LIST")}>Cancel</Button>
                        <Button className="flex-1" onClick={() => setViewState("PROJECT_SELECT")}>
                            <Check className="w-4 h-4 mr-2" />
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}

function ProjectSelectView({ selectedProjectId, setSelectedProjectId, handleSave, setViewState }: any) {
    return (
        <MobileLayout title="Select Project" >
            <div className="p-5 space-y-5 pb-24 h-[60vh] flex flex-col justify-center  ">
                <div className="space-y-1">
                    <h2 className="text-lg font-bold">Choose project for this document</h2>
                    <p className="text-xs text-muted-foreground">
                        This scan will be created under the project you select below.
                    </p>
                </div>

                <div className="rounded-2xl border border-primary/50 bg-primary/5 px-4 py-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <p className="text-[11px] font-semibold text-primary uppercase tracking-wide">
                                Project
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                                Required before saving this document
                            </p>
                        </div>
                        <Badge className="text-[10px] px-2 py-0.5 bg-primary text-primary-foreground">
                            Required
                        </Badge>
                    </div>

                    <Tabs
                        defaultValue={String(selectedProjectId)}
                        value={String(selectedProjectId)}
                        onValueChange={(val) => setSelectedProjectId(Number(val))}
                        className="w-full mt-2"
                    >
                        <TabsList className="w-full grid grid-cols-3 bg-background/60 p-1 rounded-xl">
                            {projects.map((p) => (
                                <TabsTrigger
                                    key={p.id}
                                    value={String(p.id)}
                                    className="text-[11px] px-2 py-1 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    {p.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                <div className="pt-2 flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setViewState("REVIEW")}>
                        Back
                    </Button>
                    <Button className="flex-1" onClick={handleSave}>
                        <Check className="w-4 h-4 mr-2" />
                        Save
                    </Button>
                </div>
            </div>
        </MobileLayout>
    );
}

