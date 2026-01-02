import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Users, Send } from "lucide-react";
import { useLocation, useRoute } from "wouter";

const projects = [
    { id: 1, name: "City Center Mall" },
    { id: 2, name: "Highway 45" },
    { id: 3, name: "Green Valley" },
];

type ChatMessage = {
    id: number;
    text: string;
    time: string;
    fromMe?: boolean;
    sender?: string;
};

const initialMessagesByProject: Record<number, ChatMessage[]> = {
    1: [
        {
            id: 1,
            text: "Morning team, sharing today’s site progress shortly.",
            time: "09:05",
            sender: "You",
            fromMe: true,
        },
        {
            id: 2,
            text: "Please share today’s progress photos.",
            time: "09:12",
            sender: "Client PM",
        },
        {
            id: 3,
            text: "Uploading now – shuttering completed for grid A1-A5.",
            time: "09:18",
            sender: "Site Engg",
        },
    ],
    2: [
        {
            id: 4,
            text: "Curve realignment drawings uploaded in Documents.",
            time: "Mon",
            sender: "Design Lead",
        },
        {
            id: 5,
            text: "Got it, will review and confirm today.",
            time: "Mon",
            sender: "You",
            fromMe: true,
        },
    ],
    3: [
        {
            id: 6,
            text: "Site visit scheduled for Friday 11 AM.",
            time: "Sun",
            sender: "Client PM",
        },
        {
            id: 7,
            text: "Confirmed – team will be ready with drawings and BOQ.",
            time: "Sun",
            sender: "You",
            fromMe: true,
        },
    ],
};

export default function ChatProject() {
    const [, setLocation] = useLocation();
    const [match, params] = useRoute("/chat/:projectId");
    const projectIdParam = params?.projectId;
    const projectId = projectIdParam ? Number(projectIdParam) : undefined;

    const project = projects.find((p) => p.id === projectId) || projects[0];

    const [messagesByProject, setMessagesByProject] = useState<Record<number, ChatMessage[]>>(
        initialMessagesByProject
    );
    const [newMessage, setNewMessage] = useState("");

    const activeMessages = project ? messagesByProject[project.id] || [] : [];

    const handleSendMessage = () => {
        if (!project || !newMessage.trim()) return;
        setMessagesByProject((prev) => {
            const existing = prev[project.id] || [];
            const nextId = existing.length ? existing[existing.length - 1].id + 1 : 1;
            const updated: ChatMessage[] = [
                ...existing,
                {
                    id: nextId,
                    text: newMessage.trim(),
                    time: "Now",
                    fromMe: true,
                    sender: "You",
                },
            ];
            return {
                ...prev,
                [project.id]: updated,
            };
        });
        setNewMessage("");
    };

    return (
        <MobileLayout title="Chat">
            <div className="pt-6 px-5 pb-3 sticky top-0 bg-background z-20 border-b border-border/40">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setLocation("/chat")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-[11px] bg-primary/10 text-primary font-semibold">
                                {project.name
                                    .split(" ")
                                    .map((w) => w[0])
                                    .join("")
                                    .slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-sm font-semibold leading-tight">{project.name}</h2>
                            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Project group • Site, client & internal team
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 pt-3 pb-24 space-y-2">
                <div className="flex flex-col gap-2 text-[11px] text-muted-foreground items-center mb-2">
                    <span>Messages are visible to all members of this project group.</span>
                </div>
                <div className="space-y-4">
                    {activeMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-2 ${msg.fromMe ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`relative max-w-[75%] px-3 py-2 text-xs leading-snug shadow-sm ${msg.fromMe
                                    ? "bg-primary text-primary-foreground rounded-lg "
                                    : "bg-muted text-foreground rounded-lg"
                                    }`}
                            >
                                {/* Sender name */}
                                {!msg.fromMe && msg.sender && (
                                    <p className="mb-0.5 text-[10px] font-medium text-muted-foreground">
                                        {msg.sender}
                                    </p>
                                )}

                                {/* Message */}
                                <p className="whitespace-pre-wrap">{msg.text}</p>

                                {/* Time */}
                                <span className="mt-1 block text-[9px] opacity-60 text-right">
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-5">
                <div className="flex items-center gap-2 bg-background border border-border/60 rounded-2xl px-3 py-2 shadow-lg">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={`Message ${project.name} group...`}
                        className="border-none shadow-none h-9 px-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button size="icon" className="h-9 w-9 rounded-xl" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </MobileLayout>
    );
}
