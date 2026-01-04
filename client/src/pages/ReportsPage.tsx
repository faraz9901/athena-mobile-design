import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    FileText,
    Download,
    ArrowLeft,
    File,
} from "lucide-react";
import { useLocation } from "wouter";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { useToast } from "@/hooks/use-toast";

type GlobalReportType = "Daily" | "Weekly" | "Monthly";

export default function ReportsPage() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    const [selectedProjectId, setSelectedProjectId] = useState<string>("");

    // 👉 NEW STATE
    const [globalType, setGlobalType] = useState<GlobalReportType | "">("");
    const [globalValue, setGlobalValue] = useState<string>("");

    const handleGlobalReport = () => {
        if (!globalType || !globalValue) return;

        toast({
            title: `${globalType} Report Generated`,
            description: `Report for ${globalValue} has been downloaded.`,
        });
    };

    const handleProjectReport = (type: "Single" | "Final") => {
        if (!selectedProjectId) {
            toast({
                title: "Select Project",
                description: "Please select a project first.",
                variant: "destructive",
            });
            return;
        }

        const project = MOCK_PROJECTS.find(p => p.id === selectedProjectId);
        toast({
            title: `${type} Project Report`,
            description: `Downloading ${type.toLowerCase()} report for ${project?.name}...`,
        });
    };

    return (
        <MobileLayout showBottomNav={true} showSidebarToggle={false}>
            {/* Header */}
            <div className="bg-primary text-primary-foreground pt-8 pb-6 px-5 rounded-b-[2rem] shadow-lg relative z-10 mb-6">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-white/10 -ml-2"
                        onClick={() => setLocation("/")}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-xl font-bold flex-1">
                        Reports & Analytics
                    </h1>
                </div>
            </div>

            <div className="px-5 pb-20 space-y-6">
                {/* 🌍 Global Reports */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <File className="h-5 w-5 text-primary" />
                        Global Reports
                    </h2>

                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                                Ongoing Projects Summary
                            </CardTitle>
                            <CardDescription>
                                Generate summary report for all ongoing projects.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Step 1: Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Report Type
                                </label>
                                <Select
                                    value={globalType}
                                    onValueChange={(v: GlobalReportType) => {
                                        setGlobalType(v);
                                        setGlobalValue("");
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Daily">Daily</SelectItem>
                                        <SelectItem value="Weekly">Weekly</SelectItem>
                                        <SelectItem value="Monthly">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Step 2: Dynamic Input */}
                            {globalType === "Daily" && (
                                <div className="space-y-2 pointer-events-auto">
                                    <label htmlFor="date" className="text-sm font-medium">Select Date</label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        className="w-full rounded-md border px-3 py-2 text-sm"
                                        value={globalValue}
                                        onChange={(e) => setGlobalValue(e.target.value)}
                                    />
                                </div>
                            )}

                            {globalType === "Weekly" && (
                                <div className="space-y-2">
                                    <label htmlFor="week" className="text-sm font-medium">Select Week</label>
                                    <input
                                        id="week"
                                        name="week"
                                        type="week"
                                        className="w-full rounded-md border px-3 py-2 text-sm"
                                        value={globalValue}
                                        onChange={(e) => setGlobalValue(e.target.value)}
                                    />
                                </div>
                            )}

                            {globalType === "Monthly" && (
                                <div className="space-y-2">
                                    <label htmlFor="month" className="text-sm font-medium">Select Month</label>
                                    <input
                                        id="month"
                                        name="month"
                                        type="month"
                                        className="w-full rounded-md border px-3 py-2 text-sm"
                                        value={globalValue}
                                        onChange={(e) => setGlobalValue(e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Step 3: Action */}
                            {globalType && (
                                <Button
                                    className="w-full"
                                    disabled={!globalValue}
                                    onClick={handleGlobalReport}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download {globalType} Report
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </section>

                {/* 📄 Project Reports (unchanged) */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Project Specific Reports
                    </h2>

                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                                Detailed Project Reports
                            </CardTitle>
                            <CardDescription>
                                Download comprehensive PDF reports.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Select Project
                                </label>
                                <Select
                                    value={selectedProjectId}
                                    onValueChange={setSelectedProjectId}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a project..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MOCK_PROJECTS.map(project => (
                                            <SelectItem key={project.id} value={project.id}>
                                                {project.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-3">
                                <Button
                                    disabled={!selectedProjectId}
                                    onClick={() => handleProjectReport("Single")}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Single Project Report
                                </Button>

                                <Button
                                    variant="secondary"
                                    disabled={!selectedProjectId}
                                    onClick={() => handleProjectReport("Final")}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Final Completion Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </MobileLayout>
    );
}
