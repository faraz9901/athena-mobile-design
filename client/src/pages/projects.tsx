import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, MoreVertical, Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const projects = [
  {
    id: 1,
    title: "City Center Mall Renovation",
    client: "Urban Development Authority",
    status: "Active",
    statusColor: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    progress: 65,
    dueDate: "Dec 2024",
    budget: "$1.2M",
    tags: ["Commercial", "Civil"]
  },
  {
    id: 2,
    title: "Highway 45 Extension",
    client: "National Highways Dept",
    status: "Submitted",
    statusColor: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    progress: 100,
    dueDate: "Jan 2025",
    budget: "$4.5M",
    tags: ["Infrastructure", "Road"]
  },
  {
    id: 3,
    title: "Green Valley Housing Phase 2",
    client: "Green Valley Pvt Ltd",
    status: "Draft",
    statusColor: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    progress: 15,
    dueDate: "Mar 2025",
    budget: "$850k",
    tags: ["Residential"]
  },
  {
    id: 4,
    title: "Tech Park Block C",
    client: "Innovate Builders",
    status: "Secured",
    statusColor: "bg-purple-100 text-purple-700 hover:bg-purple-100",
    progress: 0,
    dueDate: "Feb 2025",
    budget: "$2.1M",
    tags: ["Commercial", "Tech"]
  }
];

export default function ProjectList() {
  return (
    <MobileLayout title="Projects" fabAction={() => {}}>
      <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Button variant="outline" size="sm" className="h-8 rounded-full">
            <Filter className="mr-2 h-3.5 w-3.5" /> Filter
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9 bg-secondary/30 border-none rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["All", "Active", "Submitted", "Draft", "Completed"].map((filter, i) => (
            <Badge 
              key={i} 
              variant={i === 0 ? "default" : "secondary"}
              className="rounded-full px-4 py-1.5 text-xs font-normal cursor-pointer hover:opacity-90 shrink-0"
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div className="px-5 py-2 space-y-4">
        {projects.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id}>
            <a className="block">
              <Card className="border-none shadow-sm ring-1 ring-black/5 active:scale-[0.99] transition-transform">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start gap-4">
                    <Badge className={`rounded-md font-medium px-2 py-0.5 pointer-events-none shadow-none border-0 ${project.statusColor}`}>
                      {project.status}
                    </Badge>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <CardTitle className="text-lg font-bold leading-tight mt-2">{project.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{project.client}</p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 rounded-full" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground border-t border-border/40 mt-2 py-3 bg-secondary/10">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Due: {project.dueDate}</span>
                  </div>
                  <div className="font-semibold text-foreground">
                    {project.budget}
                  </div>
                </CardFooter>
              </Card>
            </a>
          </Link>
        ))}
        
        <div className="h-8"></div> {/* Spacer */}
      </div>
    </MobileLayout>
  );
}
