import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Send, MessageCircle, Users } from "lucide-react";

const projects = [
    {
        id: 1,
        name: "City Center Mall",
    },
    {
        id: 2,
        name: "Highway 45",
    },
    {
        id: 3,
        name: "Green Valley",
    },
];

const chatsByProject: Record<number, { id: number; title: string; lastMessage: string; time: string; unread?: number; participants: string }[]> = {
    1: [
        {
            id: 1,
            title: "Site Coordination",
            lastMessage: "Please share today’s progress photos.",
            time: "10:24 AM",
            unread: 3,
            participants: "You, Site Engg, Client",
        },
        {
            id: 2,
            title: "Tender Clarifications",
            lastMessage: "Sharing revised BOQ for review.",
            time: "Yesterday",
            participants: "You, Estimation Team",
        },
    ],
    2: [
        {
            id: 3,
            title: "Highway Design",
            lastMessage: "Curve realignment drawings uploaded.",
            time: "Mon",
            participants: "You, Design Team",
        },
    ],
    3: [
        {
            id: 4,
            title: "Client Updates",
            lastMessage: "Site visit scheduled for Friday.",
            time: "Sun",
            unread: 1,
            participants: "You, Client PM",
        },
    ],
};

export default function Chat() {
    const [selectedProjectId, setSelectedProjectId] = useState<number>(projects[0]?.id ?? 1);
    const [search, setSearch] = useState("");

    const chats = (chatsByProject[selectedProjectId] || []).filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MobileLayout title="Chat">
            <div className="pt-6 px-5 pb-3 space-y-4 sticky top-0 bg-background z-20">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Chat</h1>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>Project Channels</span>
                    </div>
                </div>

                <Tabs
                    defaultValue={String(selectedProjectId)}
                    value={String(selectedProjectId)}
                    onValueChange={(val) => setSelectedProjectId(Number(val))}
                    className="w-full"
                >
                    <TabsList className="w-full grid grid-cols-3 bg-secondary/30 p-1 mb-2">
                        {projects.map((p) => (
                            <TabsTrigger key={p.id} value={String(p.id)} className="text-xs">
                                {p.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search in project chats..."
                        className="pl-9 bg-secondary/30 border-none rounded-xl h-11 text-sm"
                    />
                </div>
            </div>

            <div className="px-5 space-y-3 pb-24 mt-1">
                {chats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground border-2 border-dashed border-border/50 rounded-xl">
                        <MessageCircle className="h-6 w-6 mb-2 opacity-60" />
                        <p className="text-sm">No chats in this project yet</p>
                        <p className="text-xs mt-1">Start a new conversation from tasks, documents or project detail.</p>
                    </div>
                ) : (
                    chats.map((chat) => (
                        <Card key={chat.id} className="border-none shadow-sm ring-1 ring-black/5 active:scale-[0.99] transition-transform cursor-pointer">
                            <CardContent className="p-3.5 flex items-start gap-3">
                                <Avatar className="h-9 w-9 mt-0.5">
                                    <AvatarFallback className="text-[11px] bg-primary/10 text-primary font-semibold">
                                        {chat.title
                                            .split(" ")
                                            .map((w) => w[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-semibold truncate">{chat.title}</h3>
                                            <p className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                                                {chat.lastMessage}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 shrink-0">
                                            <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                                            {chat.unread ? (
                                                <Badge className="h-5 px-1.5 text-[10px] rounded-full bg-primary text-primary-foreground">
                                                    {chat.unread}
                                                </Badge>
                                            ) : null}
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        {chat.participants}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-5">
                <div className="flex items-center gap-2 bg-background border border-border/60 rounded-2xl px-3 py-2 shadow-lg">
                    <Input
                        placeholder="Type a quick message..."
                        className="border-none shadow-none h-9 px-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button size="icon" className="h-9 w-9 rounded-xl">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </MobileLayout>
    );
}
