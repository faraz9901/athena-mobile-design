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
    <MobileLayout fabAction={() => {}} fabIcon={<Plus className="h-6 w-6" />}>
      {/* Header Area */}
      <div className="bg-primary text-primary-foreground pt-8 pb-6 px-5 rounded-b-[2rem] shadow-lg relative z-10">
        <div className="flex justify-between items-start mb-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <Share2 className="h-5 w-5" />
            </Button>
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
            {["Overview", "Docs", "Money", "Tasks"].map((tab) => (
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

          <TabsContent value="docs" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

          {/* Placeholder for other tabs */}
          <TabsContent value="money" className="text-center py-10 text-muted-foreground animate-in fade-in">
            <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>Expense Management Module</p>
          </TabsContent>
          
           <TabsContent value="tasks" className="text-center py-10 text-muted-foreground animate-in fade-in">
            <CheckSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>Task Management Module</p>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="h-24" /> {/* Bottom spacer */}
    </MobileLayout>
  );
}
