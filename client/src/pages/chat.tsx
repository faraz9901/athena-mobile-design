import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MessageCircle, Users, Menu } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const projects = [
    { id: 1, name: "City Center Mall" },
    { id: 2, name: "Highway 45" },
    { id: 3, name: "Green Valley" },
];

export default function Chat() {
    const [, navigate] = useLocation();
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredProjects = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const close = () => setSidebarOpen(false);
    const open = () => setSidebarOpen(true);


    return (
        <MobileLayout title="Chat" sidebarOpen={sidebarOpen} onCloseSidebar={close}>
            <div className="pt-6 px-5 pb-3 sticky top-0 bg-background z-20 border-b border-border/40">
                <div className="space-y-3">
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
                            <h1 className="text-2xl font-bold">Chat</h1>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>Project groups</span>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects..."
                            className="pl-9 bg-secondary/30 border-none rounded-xl h-11 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="px-5 space-y-3 pb-24 mt-2">
                {filteredProjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                        <MessageCircle className="h-6 w-6 mb-2 opacity-60" />
                        <p className="text-sm">No matching projects</p>
                        <p className="text-xs mt-1">Adjust your search or create a new project.</p>
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            className="border-none shadow-sm ring-1 ring-black/5 active:scale-[0.99] transition-transform cursor-pointer"
                            onClick={() => navigate(`/chat/${project.id}`)}
                        >
                            <CardContent className="p-3.5 flex items-start gap-3">
                                <Avatar className="h-9 w-9 mt-0.5">
                                    <AvatarFallback className="text-[11px] bg-primary/10 text-primary font-semibold">
                                        {project.name
                                            .split(" ")
                                            .map((w) => w[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-semibold truncate">{project.name}</h3>
                                            <p className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                                                Project chat for updates & coordination
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        Site, client & internal team
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </MobileLayout>
    );
}
