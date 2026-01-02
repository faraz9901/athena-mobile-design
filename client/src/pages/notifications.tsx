import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Info,
  X,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

// Mock notifications data
const taskAlerts = [
  {
    id: 1,
    title: "Task Deadline Approaching",
    message: "Foundation Inspection is due in 2 hours",
    project: "Highway 45",
    time: "5m ago",
    read: false,
    type: "task"
  },
  {
    id: 2,
    title: "Task Completed",
    message: "Structural Drawings finalized by John Doe",
    project: "City Center Mall",
    time: "1h ago",
    read: false,
    type: "task"
  },
  {
    id: 3,
    title: "New Task Assigned",
    message: "You have been assigned to 'Material Procurement'",
    project: "Green Valley",
    time: "3h ago",
    read: true,
    type: "task"
  }
];

const budgetAlerts = [
  {
    id: 1,
    title: "Budget Threshold Reached",
    message: "City Center Mall has reached 85% of allocated budget",
    project: "City Center Mall",
    amount: "$1,020,000",
    threshold: 85,
    time: "10m ago",
    read: false,
    type: "budget"
  },
  {
    id: 2,
    title: "Budget Warning",
    message: "Highway 45 has reached 70% of allocated budget",
    project: "Highway 45",
    amount: "$3,150,000",
    threshold: 70,
    time: "2h ago",
    read: false,
    type: "budget"
  },
  {
    id: 3,
    title: "Budget Exceeded",
    message: "Green Valley has exceeded 100% of allocated budget",
    project: "Green Valley",
    amount: "$900,000",
    threshold: 100,
    time: "1d ago",
    read: true,
    type: "budget"
  }
];

const systemMessages = [
  {
    id: 1,
    title: "System Maintenance",
    message: "Scheduled maintenance on Feb 1, 2025 from 2:00 AM to 4:00 AM",
    time: "2d ago",
    read: false,
    type: "system"
  },
  {
    id: 2,
    title: "New Feature Available",
    message: "OCR document scanning is now available for all projects",
    time: "5d ago",
    read: true,
    type: "system"
  },
  {
    id: 3,
    title: "Update Available",
    message: "App version 2.1.0 is now available with improved performance",
    time: "1w ago",
    read: true,
    type: "system"
  }
];

const getThresholdColor = (threshold: number) => {
  if (threshold >= 100) return "bg-red-100 text-red-700 border-red-200";
  if (threshold >= 85) return "bg-orange-100 text-orange-700 border-orange-200";
  if (threshold >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-blue-100 text-blue-700 border-blue-200";
};

export default function Notifications() {
  return (
    <MobileLayout title="Notifications">
      {/* <Link href="/">
        <Button variant="outline" size="icon" className="text-primary hover:bg-primary/80 hover:text-primary-foreground">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </Link> */}

      <div className="px-5 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
            <TabsTrigger value="budget" className="text-xs">Project</TabsTrigger>
            <TabsTrigger value="system" className="text-xs">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {/* Task Alerts */}
            {taskAlerts.map((alert) => (
              <Card key={alert.id} className={cn(
                "border-none shadow-sm",
                !alert.read && "ring-2 ring-primary/20 bg-primary/5"
              )}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                      alert.type === "task" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    )}>
                      {alert.type === "task" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Bell className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={cn(
                          "text-sm font-semibold",
                          !alert.read && "text-foreground"
                        )}>
                          {alert.title}
                        </h4>
                        {!alert.read && (
                          <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-muted-foreground">{alert.project}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Budget Alerts */}
            {budgetAlerts.map((alert) => (
              <Card key={alert.id} className={cn(
                "border-none shadow-sm",
                !alert.read && "ring-2 ring-primary/20 bg-primary/5"
              )}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                      getThresholdColor(alert.threshold).replace("border", "bg").replace("text", "text")
                    )}>
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={cn(
                          "text-sm font-semibold",
                          !alert.read && "text-foreground"
                        )}>
                          {alert.title}
                        </h4>
                        {!alert.read && (
                          <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge className={cn(
                          "text-xs font-semibold border",
                          getThresholdColor(alert.threshold)
                        )}>
                          {alert.threshold}%
                        </Badge>
                        <span className="text-xs font-medium">{alert.amount}</span>
                        <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* System Messages */}
            {systemMessages.map((message) => (
              <Card key={message.id} className={cn(
                "border-none shadow-sm",
                !message.read && "ring-2 ring-primary/20 bg-primary/5"
              )}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <Info className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={cn(
                          "text-sm font-semibold",
                          !message.read && "text-foreground"
                        )}>
                          {message.title}
                        </h4>
                        {!message.read && (
                          <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{message.message}</p>
                      <span className="text-[10px] text-muted-foreground mt-2 block">{message.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-3">
            {taskAlerts.map((alert) => (
              <Card key={alert.id} className={cn(
                "border-none shadow-sm",
                !alert.read && "ring-2 ring-primary/20 bg-primary/5"
              )}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={cn(
                          "text-sm font-semibold",
                          !alert.read && "text-foreground"
                        )}>
                          {alert.title}
                        </h4>
                        {!alert.read && (
                          <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-muted-foreground">{alert.project}</span>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="budget" className="space-y-3">
            {budgetAlerts.map((alert) => (
              <Card key={alert.id} className={cn(
                "border-none shadow-sm",
                !alert.read && "ring-2 ring-primary/20 bg-primary/5"
              )}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                      getThresholdColor(alert.threshold).replace("border", "bg").replace("text", "text")
                    )}>
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={cn(
                          "text-sm font-semibold",
                          !alert.read && "text-foreground"
                        )}>
                          {alert.title}
                        </h4>
                        {!alert.read && (
                          <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge className={cn(
                          "text-xs font-semibold border",
                          getThresholdColor(alert.threshold)
                        )}>
                          {alert.threshold}%
                        </Badge>
                        <span className="text-xs font-medium">{alert.amount}</span>
                        <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="system" className="space-y-3">
            {systemMessages.map((message) => (
              <Card key={message.id} className={cn(
                "border-none shadow-sm",
                !message.read && "ring-2 ring-primary/20 bg-primary/5"
              )}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <Info className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={cn(
                          "text-sm font-semibold",
                          !message.read && "text-foreground"
                        )}>
                          {message.title}
                        </h4>
                        {!message.read && (
                          <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{message.message}</p>
                      <span className="text-[10px] text-muted-foreground mt-2 block">{message.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}

