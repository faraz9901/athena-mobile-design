import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  TrendingUp,
  AlertCircle,
  CheckSquare,
  Clock,
  FileCheck,
  Building2,
  Receipt,
  FileText,
  BriefcaseIcon,
  Menu,
  FileStack,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MobileLayout
      sidebarOpen={sidebarOpen}
      onCloseSidebar={() => setSidebarOpen(false)}
    >
      {/* Top App Bar Area */}
      <header className="px-6 pt-8 pb-4 bg-background sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <Avatar className="h-10 w-10 border-2 border-white shadow-sm cursor-pointer" onClick={() => setSidebarOpen(true)}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar> */}
          <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Welcome back,</p>
            <h1 className="text-lg font-bold text-foreground leading-tight">John Doe</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button> */}
          <Button onClick={() => navigate("/notifications")} variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2.5 h-2 w-2 bg-destructive rounded-full border border-background"></span>
          </Button>
        </div>
      </header>

      <div className="px-5 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-primary text-primary-foreground border-none shadow-md overflow-hidden relative">
            <div className="absolute right-0 top-0 p-3 opacity-10">
              <Building2 className="h-16 w-16" />
            </div>
            <CardContent className="p-4 flex flex-col justify-between h-32">
              <div className="p-2 bg-white/20 w-fit rounded-lg mb-2">
                <BriefcaseIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="text-4xl font-bold tracking-tight">12</span>
                <p className="text-sm opacity-90 font-medium mt-1">Active Projects</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-rows-2 gap-3">
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30 shadow-sm">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">5</span>
                  <p className="text-xs text-red-600/80 font-medium">Overdue Tasks</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-800/40 rounded-full">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30 shadow-sm">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Rs.42k</span>
                  <p className="text-xs text-emerald-600/80 font-medium">Mo. Expenses</p>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-800/40 rounded-full">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <Button
              variant="link"
              className="text-primary h-auto p-0 text-sm"
              onClick={() => navigate("/recent-activity")}
            >
              View All
            </Button>
          </div>

          <div className="space-y-0">
            {[
              {
                icon: FileCheck,
                bg: "bg-blue-100 text-blue-600",
                title: "Tender Document Approved",
                desc: "Metro Station Project • 2h ago",
                unread: true
              },
              {
                icon: Receipt,
                bg: "bg-orange-100 text-orange-600",
                title: "New Expense Added",
                desc: "Cement Supply Invoice #402 • 5h ago",
                unread: false
              },
              {
                icon: Clock,
                bg: "bg-purple-100 text-purple-600",
                title: "Task Deadline Updated",
                desc: "Foundation Work • 1d ago",
                unread: false
              },
              {
                icon: Building2,
                bg: "bg-gray-100 text-gray-600",
                title: "New Site Photos",
                desc: "Highway Expansion • 2d ago",
                unread: false
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", item.bg)}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className={cn("text-sm font-semibold truncate pr-2", item.unread ? "text-foreground" : "text-muted-foreground")}>
                      {item.title}
                    </h4>
                    {item.unread && <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Building2, label: "New Project", href: "/create-project-upload" },
              { icon: CheckSquare, label: "Add Task", href: "/add-task" },
              { icon: FileText, label: "Reports", href: "/reports" },
              { icon: FileStack, label: "Documents", href: "/documents" },
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors">
                <div onClick={() => action.href && navigate(action.href)} className="h-10 w-10 rounded-full bg-background shadow-sm flex items-center justify-center text-primary">
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium text-center leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
