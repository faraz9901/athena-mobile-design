import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  MoreVertical,
  FileText,
  DollarSign,
  CheckSquare,
  Share2,
  Clock,
  Download,
  Plus,
  Building2
} from "lucide-react";
import { Link, useRoute } from "wouter";
import { cn } from "@/lib/utils";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const projectId = params?.id;

  // Mock data - normally would fetch based on ID
  const project = {
    title: "City Center Mall Renovation",
    status: "Active",
    department: "Urban Development Authority",
    tenderId: "TDR-2024-892",
    location: "Downtown District, Metro City",
    progress: 65,
    budget: {
      total: 1200000,
      spent: 450000,
      remaining: 750000
    },
    dates: {
      start: "01 Jan 2025",
      end: "30 Dec 2025"
    }
  };

  return (
    <MobileLayout fabAction={() => { }} fabIcon={<Plus className="h-6 w-6" />}>
      {/* Header Area */}
      <div className="bg-primary text-primary-foreground pt-8 pb-6 px-5 rounded-b-[2rem] shadow-lg relative z-10">
        <div className="flex justify-between items-start mb-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex gap-2">
            {/* <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <Share2 className="h-5 w-5" />
            </Button> */}
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 -mr-2">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-400 text-emerald-950 hover:bg-emerald-400 font-semibold border-none">
              {project.status}
            </Badge>
            <span className="text-xs opacity-80 font-mono tracking-wide">{project.tenderId}</span>
          </div>

          <h1 className="text-2xl font-bold leading-tight">{project.title}</h1>

          <div className="flex flex-col gap-1 text-sm opacity-90">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>{project.department}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{project.location}</span>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-[10px] opacity-70 uppercase tracking-wider font-bold">Spent Budget</p>
              <p className="text-lg font-bold mt-1">${(project.budget.spent / 1000).toFixed(0)}k</p>
              <Progress value={(project.budget.spent / project.budget.total) * 100} className="h-1 mt-2 bg-white/20" />
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-[10px] opacity-70 uppercase tracking-wider font-bold">Time Elapsed</p>
              <p className="text-lg font-bold mt-1">45 Days</p>
              <Progress value={35} className="h-1 mt-2 bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="px-5 mt-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-4 bg-transparent p-0 gap-2 h-auto mb-4">
            {["Overview", "Files", "Report", "Analytics"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-primary py-2 text-xs font-medium border border-transparent data-[state=active]:border-primary/10 transition-all"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Project Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Bid Submission", date: "15 Jan 2025", status: "completed" },
                  { title: "Site Handover", date: "01 Feb 2025", status: "completed" },
                  { title: "Foundation Work", date: "20 Mar 2025", status: "current" },
                  { title: "Structure Completion", date: "15 Jun 2025", status: "pending" },
                ].map((milestone, i) => (
                  <div key={i} className="flex gap-3 relative">
                    {i !== 3 && <div className="absolute left-[9px] top-6 bottom-[-8px] w-[2px] bg-secondary" />}
                    <div className={cn(
                      "h-5 w-5 rounded-full border-2 z-10 flex items-center justify-center shrink-0 bg-background",
                      milestone.status === "completed" ? "border-primary bg-primary" :
                        milestone.status === "current" ? "border-primary" : "border-muted"
                    )}>
                      {milestone.status === "completed" && <div className="h-2 w-2 bg-white rounded-full" />}
                      {milestone.status === "current" && <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />}
                    </div>
                    <div>
                      <h4 className={cn("text-sm font-medium leading-none", milestone.status === "pending" && "text-muted-foreground")}>
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Pending Tasks</p>
                  <p className="text-xl font-bold">14</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Docs Pending</p>
                  <p className="text-xl font-bold text-orange-600">3</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {["Tender Documents", "Approvals & NOCs", "Drawings", "Invoices"].map((category, i) => (
              <Card key={i} className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-secondary/30 py-3 px-4 flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-background rounded-md shadow-sm">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-sm font-medium">{category}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-background">3 Files</Badge>
                </CardHeader>
                <div className="divide-y divide-border/50">
                  {[1, 2].map((file) => (
                    <div key={file} className="p-3 flex items-center justify-between hover:bg-secondary/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                          PDF
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">Site_Plan_v{file}.pdf</p>
                          <p className="text-[10px] text-muted-foreground">2.4 MB • 2 days ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="report" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Financial Summary</CardTitle>
                  <CardDescription className="text-xs mt-1">High-level view of project profitability</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Contract Value</p>
                    <p className="text-xl font-bold">${(project.budget.total / 1000000).toFixed(2)}M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Amount Spent</p>
                    <p className="text-xl font-bold text-orange-600">${(project.budget.spent / 1000000).toFixed(2)}M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Projected Profit</p>
                    <p className="text-xl font-bold text-emerald-600">$0.48M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Expected Margin</p>
                    <p className="text-xl font-bold">18%</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Taxable Amount</p>
                    <p className="font-semibold">$0.95M</p>
                    <p className="text-[10px] text-muted-foreground">Before GST & duties</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Taxes Paid</p>
                    <p className="font-semibold">$0.12M</p>
                    <p className="text-[10px] text-muted-foreground">GST, TDS, local</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Outstanding</p>
                    <p className="font-semibold text-orange-600">$0.08M</p>
                    <p className="text-[10px] text-muted-foreground">Expected this quarter</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Collection Progress</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2 rounded-full" />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Invoiced: $0.86M</span>
                    <span>Received: $0.62M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Cost Breakdown</CardTitle>
                <CardDescription className="text-xs mt-1">How the project budget is allocated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/80 via-primary/60 to-emerald-400/70" />
                    <div className="absolute inset-[6px] rounded-full bg-background" />
                    <div className="absolute inset-[12px] rounded-full bg-background flex flex-col items-center justify-center text-[10px] font-medium">
                      <span>Opex</span>
                      <span className="text-xs font-bold">40%</span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <div className="flex-1 flex justify-between">
                        <span>Materials</span>
                        <span className="font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <div className="flex-1 flex justify-between">
                        <span>Labour</span>
                        <span className="font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-400" />
                      <div className="flex-1 flex justify-between">
                        <span>Subcontract</span>
                        <span className="font-medium">18%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      <div className="flex-1 flex justify-between">
                        <span>Overheads</span>
                        <span className="font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Schedule Overview</CardTitle>
                  <CardDescription className="text-xs mt-1">Gantt-style view of key phases</CardDescription>
                </div>
                <Badge variant="outline" className="text-[10px] px-2 py-0.5">Baseline v/s Actual</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-xs">
                  {[
                    { label: "Design & Approvals", start: "Jan", end: "Mar", color: "bg-blue-500", baseline: 30, actual: 35 },
                    { label: "Foundation & Structure", start: "Mar", end: "Aug", color: "bg-emerald-500", baseline: 55, actual: 60 },
                    { label: "Finishes & Handover", start: "Sep", end: "Dec", color: "bg-orange-500", baseline: 40, actual: 32 },
                  ].map((phase, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-xs">{phase.label}</span>
                        <span className="text-[10px] text-muted-foreground">{phase.start} - {phase.end}</span>
                      </div>
                      <div className="relative h-4 rounded-full bg-secondary/60 overflow-hidden">
                        <div className={`absolute inset-y-0 left-0 ${phase.color} opacity-40`} style={{ width: `${phase.baseline}%` }} />
                        <div className={`absolute inset-y-0 left-0 ${phase.color}`} style={{ width: `${phase.actual}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Risk & Effort Distribution</CardTitle>
                <CardDescription className="text-xs mt-1">Where the team is spending time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 rounded-full bg-secondary" />
                    <div className="absolute inset-[4px] rounded-full bg-gradient-to-tr from-orange-400 via-primary to-emerald-400" />
                    <div className="absolute inset-[11px] rounded-full bg-background flex flex-col items-center justify-center text-[10px] font-medium">
                      <span>Critical</span>
                      <span className="text-xs font-bold">28%</span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="flex-1 flex justify-between">
                        <span>Critical path</span>
                        <span className="font-medium">28%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      <div className="flex-1 flex justify-between">
                        <span>Dependencies</span>
                        <span className="font-medium">22%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <div className="flex-1 flex justify-between">
                        <span>Execution</span>
                        <span className="font-medium">34%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      <div className="flex-1 flex justify-between">
                        <span>Reporting</span>
                        <span className="font-medium">16%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-24" /> {/* Bottom spacer */}
    </MobileLayout>
  );
}
