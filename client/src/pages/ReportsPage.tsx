
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Share2, ArrowLeft, FileDownIcon, File } from "lucide-react";
import { useLocation } from "wouter";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { useToast } from "@/hooks/use-toast";

export default function ReportsPage() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [selectedProjectId, setSelectedProjectId] = useState<string>("");

    const handleGlobalReport = (type: "Daily" | "Weekly" | "Monthly") => {
        toast({
            title: `${type} Report Generated`,
            description: `The ${type.toLowerCase()} summary report has been sent to WhatsApp group.`,
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
        <MobileLayout showBottomNav={true}>
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
                    <h1 className="text-xl font-bold leading-tight flex-1">
                        Reports & Analytics
                    </h1>
                </div>
            </div>

            <div className="px-5 pb-20 space-y-6">
                {/* Global Reports Section */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <File className="h-5 w-5 text-primary" />
                        Global Reports (WhatsApp)
                    </h2>
                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Ongoing Projects Summary</CardTitle>
                            <CardDescription>Send summary of all active projects to partners.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full justify-between"
                                onClick={() => handleGlobalReport("Daily")}
                            >
                                <span>Daily Summary Report</span>
                                <Download className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-between"
                                onClick={() => handleGlobalReport("Weekly")}
                            >
                                <span>Weekly Summary Report</span>
                                <Download className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-between"
                                onClick={() => handleGlobalReport("Monthly")}
                            >
                                <span>Monthly Summary Report</span>
                                <Download className="h-4 w-4 text-green-600" />
                            </Button>
                        </CardContent>
                    </Card>
                </section>

                {/* Project Specific Reports */}
                <section>
                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Project Specific Reports
                    </h2>
                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Detailed Project Reports</CardTitle>
                            <CardDescription>Download comprehensive PDF reports.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Project</label>
                                <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a project..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MOCK_PROJECTS.map((project) => (
                                            <SelectItem key={project.id} value={project.id}>
                                                {project.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <Button
                                    className="w-full"
                                    disabled={!selectedProjectId}
                                    onClick={() => handleProjectReport("Single")}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Single Project Report
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full"
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
