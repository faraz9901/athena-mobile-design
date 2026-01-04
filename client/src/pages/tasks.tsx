import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, Calendar, AlertCircle, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLocation } from "wouter";

const tasks = [
  {
    id: 1,
    title: "Finalize Structural Drawings",
    project: "City Center Mall",
    assignee: "JD",
    priority: "High",
    dueDate: "Today",
    status: "todo",
    tag: "Design"
  },
  {
    id: 2,
    title: "Procure Cement - Batch 4",
    project: "City Center Mall",
    assignee: "AS",
    priority: "Medium",
    dueDate: "Tomorrow",
    status: "todo",
    tag: "Procurement"
  },
  {
    id: 3,
    title: "Foundation Inspection",
    project: "Highway 45",
    assignee: "MK",
    priority: "High",
    dueDate: "Overdue",
    status: "inprogress",
    tag: "Site"
  },
  {
    id: 4,
    title: "Submit Monthly Report",
    project: "Green Valley",
    assignee: "JD",
    priority: "Low",
    dueDate: "Next Week",
    status: "done",
    tag: "Admin"
  }
];

export default function Tasks() {
  const projectNames = Array.from(new Set(tasks.map((t) => t.project)));
  const [selectedProject, setSelectedProject] = useState<string>(projectNames[0] ?? "");
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const close = () => setSidebarOpen(false);
  const open = () => setSidebarOpen(true);

  return (
    <MobileLayout
      title="Tasks"
      sidebarOpen={sidebarOpen}
      onCloseSidebar={close}
    >
      <div className="sticky top-0 bg-background z-20 pt-6 pb-3 px-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={open}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Tasks</h1>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">U{i}</AvatarFallback>
              </Avatar>
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] text-muted-foreground font-medium">
              +4
            </div>
          </div>
        </div>

        {projectNames.length > 0 && (
          <Tabs
            value={selectedProject}
            onValueChange={(val) => setSelectedProject(val)}
            className="w-full"
          >
            <TabsList className="w-full grid grid-cols-3 mb-1 bg-secondary/30 p-1">
              {projectNames.map((name) => (
                <TabsTrigger key={name} value={name} className="text-xs truncate">
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      <div className="px-5 mt-2">
        <Tabs defaultValue="todo" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 bg-secondary/30 p-1">
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="inprogress">In Progress</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>

          {["todo", "inprogress", "done"].map((status) => (
            <TabsContent key={status} value={status} className="space-y-3 min-h-[50vh] animate-in slide-in-from-right-8 duration-300">
              {tasks.filter((t) => t.status === status && t.project === selectedProject).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                  <p className="text-sm">No tasks in this column</p>
                </div>
              ) : (
                tasks
                  .filter((t) => t.status === status && t.project === selectedProject)
                  .map((task) => (
                    <Card
                      key={task.id}
                      onClick={() => navigate(`/task/${task.id}`)}
                      className="border-none shadow-sm ring-1 ring-black/5"
                    >
                      <CardContent className="p-4 pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <Badge
                            variant="outline"
                            className={`
                          ${task.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' :
                                task.priority === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                  'bg-blue-50 text-blue-600 border-blue-100'}
                          border-none font-medium
                        `}
                          >
                            {task.priority}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 -mr-2 text-muted-foreground"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/task/${task.id}/edit`);
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Mock-only: remove not implemented yet
                                }}
                              >
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <h3 className="font-semibold text-base leading-snug mb-1">{task.title}</h3>
                        <p className="text-xs text-muted-foreground">{task.project}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">{task.assignee}</AvatarFallback>
                          </Avatar>
                          <div className={`flex items-center gap-1 text-xs font-medium ${task.dueDate === 'Overdue' ? 'text-destructive' : 'text-muted-foreground'}`}>
                            {task.dueDate === 'Overdue' ? <AlertCircle className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
                            {task.dueDate}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px] font-normal">{task.tag}</Badge>
                      </CardFooter>
                    </Card>
                  ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="h-24"></div>
    </MobileLayout>
  );
}
