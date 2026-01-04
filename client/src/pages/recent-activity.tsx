import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, FileCheck, Receipt, Clock, Building2, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

export default function RecentActivity() {
    const [, navigate] = useLocation();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const activities = [
        {
            icon: FileCheck,
            bg: "bg-blue-100 text-blue-600",
            title: "Tender Document Approved",
            desc: "Metro Station Project • 2h ago",
            unread: true,
        },
        {
            icon: Receipt,
            bg: "bg-orange-100 text-orange-600",
            title: "New Expense Added",
            desc: "Cement Supply Invoice #402 • 5h ago",
            unread: false,
        },
        {
            icon: Clock,
            bg: "bg-purple-100 text-purple-600",
            title: "Task Deadline Updated",
            desc: "Foundation Work • 1d ago",
            unread: false,
        },
        {
            icon: Building2,
            bg: "bg-gray-100 text-gray-600",
            title: "New Site Photos",
            desc: "Highway Expansion • 2d ago",
            unread: false,
        },
    ];

    return (
        <MobileLayout sidebarOpen={sidebarOpen} onCloseSidebar={() => setSidebarOpen(false)}>
            <header className="px-6 pt-8 pb-4 bg-background sticky top-0 z-30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-lg font-bold text-foreground leading-tight">Recent Activity</h1>
                        <p className="text-xs text-muted-foreground">All your latest updates in one place</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => navigate("/notifications")}
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-secondary/50 relative"
                    >
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute top-2 right-2.5 h-2 w-2 bg-destructive rounded-full border border-background" />
                    </Button>
                </div>
            </header>

            <div className="px-5 py-4 space-y-4">
                <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-semibold">Activity Feed</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs"
                                onClick={() => navigate("/")}
                            >
                                Back to Dashboard
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Stay on top of approvals, expenses, tasks and site updates.
                        </p>
                    </CardContent>
                </Card>

                <div className="space-y-1">
                    {activities.map((item, i) => (
                        <div
                            key={i}
                            className="flex gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group"
                        >
                            <div
                                className={cn(
                                    "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                                    item.bg
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4
                                        className={cn(
                                            "text-sm font-semibold truncate pr-2",
                                            item.unread ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.title}
                                    </h4>
                                    {item.unread && (
                                        <span className="h-2 w-2 bg-primary rounded-full shrink-0 mt-1.5" />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MobileLayout>
    );
}
