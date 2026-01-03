import { MobileLayout } from "@/components/layout/MobileLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  ArrowLeft,
  MapPin,
  MoreVertical,
  FileText,
  Calendar,
  AlertCircle,
  TrendingUp,
  LayoutDashboard,
  FileCheck,
  Share2,
  Download,
  Plus,
  Building2,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from "recharts"

import { Link, useRoute, useLocation } from "wouter";
import ProjectWorkflow, { WorkflowStatus } from "@/components/ProjectWorkflow";
import Others from "@/components/Others";

export const pieData = [
  { name: "Critical Path", value: 28 },
  { name: "Dependencies", value: 22 },
  { name: "Execution", value: 34 },
  { name: "Reporting", value: 16 },
]

import { MOCK_PROJECTS } from "@/data/mockProjects";
import { GanttChart } from "@/components/GanttGraph";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const projectId = params?.id;
  const [, navigate] = useLocation();

  // Find project from mock data
  const projectData = MOCK_PROJECTS.find(p => p.id === projectId);

  // Fallback or derived data
  const project = {
    title: projectData?.name || "City Center Mall Renovation",
    status: projectData?.status || "Active",
    department: "Urban Development Authority",
    tenderId: "TDR-2024-892",
    location: projectData?.location || "Downtown District, Metro City",
    progress: 65,
    budget: {
      total: projectData?.totalAmount || 1200000,
      spent: 450000,
      remaining: (projectData?.totalAmount || 1200000) - 450000
    },
    dates: {
      start: "01 Jan 2025",
      end: "30 Dec 2025"
    }
  };

  return (
    <MobileLayout showBottomNav={false} fabAction={() => { }} fabIcon={<Plus className="h-6 w-6" />}>
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
            {/* <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 -mr-2">
              <MoreVertical className="h-5 w-5" />
            </Button> */}
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
              <p className="text-lg font-bold mt-1">Rs.{(project.budget.spent / 1000).toFixed(0)}k</p>
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
        <Tabs defaultValue="workflow" className="w-full">
          <TabsList className="w-full grid grid-cols-4 bg-transparent p-0 gap-2 h-auto mb-4">
            {["Workflow", "Files", "Report & Analytics", "Others"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="rounded-xl data-[state=active]:bg-secondary data-[state=active]:text-primary py-2 text-xs font-medium border border-transparent data-[state=active]:border-primary/10 transition-all truncate line-clamp-1"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="workflow" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProjectWorkflow projectId={projectId} projectStatus={project.status as WorkflowStatus} />
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

          <TabsContent value="report & analytics" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex flex-col gap-3  justify-between bg-muted/40 border rounded-lg px-4 py-6">
              <div>
                <h3 className="text-sm font-semibold">Project Reports</h3>
                <p className="text-xs text-muted-foreground">
                  Generate live or final reports for this project
                </p>
              </div>

              <div className="flex gap-2">
                {/* Live / Interim Report */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => console.log("INTERIM")}
                >
                  Download Project Report
                </Button>

                {/* Final Report */}
                <Button
                  size="sm"
                  variant="default"
                  disabled={project.status !== "COMPLETED"}
                  onClick={() => console.log("FINAL")}
                >
                  Final Project Report
                </Button>
              </div>
            </div>


            {/* <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Financial Summary</CardTitle>
                  <CardDescription className="text-xs mt-1">High-level view of project profitability</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" onClick={() => console.log("Download Single Project Report")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">


                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Contract Value</p>
                    <p className="text-xl font-bold">Rs {(project.budget.total / 1000000).toFixed(2)}M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Amount Spent</p>
                    <p className="text-xl font-bold text-orange-600">Rs {(project.budget.spent / 1000000).toFixed(2)}M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Projected Profit</p>
                    <p className="text-xl font-bold text-emerald-600">Rs 0.48M</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Expected Margin</p>
                    <p className="text-xl font-bold">18%</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Taxable Amount</p>
                    <p className="font-semibold">Rs 0.95M</p>
                    <p className="text-[10px] text-muted-foreground">Before GST & duties</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Taxes Paid</p>
                    <p className="font-semibold">Rs 0.12M</p>
                    <p className="text-[10px] text-muted-foreground">GST, TDS, local</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Outstanding</p>
                    <p className="font-semibold text-orange-600">Rs 0.08M</p>
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
                    <span>Invoiced: Rs 0.86M</span>
                    <span>Received: Rs 0.62M</span>
                  </div>
                </div>
              </CardContent>
            </Card> */}

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

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Schedule Overview</CardTitle>
                  <CardDescription className="text-xs mt-1">Gantt-style view of key phases</CardDescription>
                </div>
                <Badge variant="outline" className="text-[10px] px-2 py-0.5">Baseline v/s Actual</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <GanttChart />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Risk & Effort Distribution</CardTitle>
                <CardDescription className="text-xs mt-1">Where the team is spending time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <RiskPieChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="others" className="space-y-4">
            <Others />
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-24" /> {/* Bottom spacer */}
    </MobileLayout >
  );
}


const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#38bdf8"]

function RiskPieChart() {
  return (
    <div className="flex items-center gap-6">
      <PieChart width={120} height={120}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={38}
          outerRadius={55}
          paddingAngle={3}
        >
          {pieData.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {pieData.map((item, idx) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: COLORS[idx] }}
            />
            <span className="flex-1">{item.name}</span>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}