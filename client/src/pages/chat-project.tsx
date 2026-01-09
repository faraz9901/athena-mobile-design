import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Users, Send, Flag, Calendar, ClipboardList, MoreVertical } from "lucide-react";
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
    const [showTaskComposer, setShowTaskComposer] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskPriority, setTaskPriority] = useState("Medium");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("John Doe");
    const [taskSourceMessage, setTaskSourceMessage] = useState<ChatMessage | null>(null);

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

    const resetTaskForm = () => {
        setTaskTitle("");
        setTaskPriority("Medium");
        setTaskDueDate("");
        setTaskDescription("");
        setTaskSourceMessage(null);
    };

    const handleCreateTaskFromMessage = (msg: ChatMessage) => {
        setTaskSourceMessage(msg);

        if (!taskTitle.trim()) {
            setTaskTitle("");
        }

        if (!taskDescription.trim()) {
            const base = msg.text.length > 120 ? msg.text.slice(0, 117) + "..." : msg.text;
            setTaskDescription(`From chat: "${base}"`);
        }

        setShowTaskComposer(true);
    };

    const handleMockCreateTask = () => {
        if (!project || !taskTitle.trim()) return;

        // Mock behaviour: append a system-style message describing the created task
        setMessagesByProject((prev) => {
            const existing = prev[project.id] || [];
            const nextId = existing.length ? existing[existing.length - 1].id + 1 : 1;
            const summaryLines = [
                `New task from chat: ${taskTitle.trim()}`,
                taskPriority ? `Priority: ${taskPriority}` : undefined,
                taskDueDate ? `Due: ${taskDueDate}` : undefined,
                assignedTo ? `Assigned to: ${assignedTo}` : undefined,
                taskDescription ? `Description: ${taskDescription}` : undefined,
            ].filter(Boolean);

            const updated: ChatMessage[] = [
                ...existing,
                {
                    id: nextId,
                    text: summaryLines.join("\n"),
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

        resetTaskForm();
        setShowTaskComposer(false);
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

            <div className="px-5 pt-3 pb-24 space-y-3">
                <div className="flex flex-col gap-2 text-[11px] text-muted-foreground items-center mb-2">
                    <span>Messages are visible to all members of this project group.</span>
                </div>

                {/* Inline task creation from chat */}
                <div className="space-y-2">
                    {!showTaskComposer ? (
                        null
                    ) : (
                        <Card className="border border-primary/40 bg-primary/5 rounded-2xl">
                            <CardContent className="p-3 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ClipboardList className="h-4 w-4 text-primary" />
                                        <p className="text-xs font-semibold">New task for {project.name}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-2 text-[11px]"
                                        onClick={() => {
                                            setShowTaskComposer(false);
                                            resetTaskForm();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <div className="space-y-1">
                                        <Label className="text-[11px]">Task title</Label>
                                        <Input
                                            value={taskTitle}
                                            onChange={(e) => setTaskTitle(e.target.value)}
                                            placeholder="e.g. Share progress report in client format"
                                            className="h-9 rounded-xl text-xs"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="flex-1 space-y-1">
                                            <Label className="text-[11px] flex items-center gap-1">
                                                <Flag className="h-3 w-3" />
                                                Priority
                                            </Label>
                                            <Select value={taskPriority} onValueChange={setTaskPriority}>
                                                <SelectTrigger className="h-9 rounded-xl text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="High">High</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Low">Low</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>


                                        <div className="flex-1 space-y-1">
                                            <Label className="text-[11px] flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Due date
                                            </Label>
                                            <Input
                                                type="text"
                                                placeholder="YYYY-MM-DD"
                                                value={taskDueDate}
                                                onChange={(e) => setTaskDueDate(e.target.value)}
                                                className="h-9 rounded-xl text-xs"
                                                inputMode="numeric"
                                                pattern="\d{4}-\d{2}-\d{2}"
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-[11px]">Details</Label>
                                        <Textarea
                                            value={taskDescription}
                                            onChange={(e) => setTaskDescription(e.target.value)}
                                            placeholder="Add quick context or decisions from this chat"
                                            className="min-h-[60px] rounded-xl text-xs resize-none"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-[11px] flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            Assign To
                                        </Label>
                                        <Select value={assignedTo} onValueChange={setAssignedTo}>
                                            <SelectTrigger className="h-9 rounded-xl text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="John Doe">John Doe</SelectItem>
                                                <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                                                <SelectItem value="Mark Doe">Mark Doe</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-9 rounded-xl text-xs mt-1"
                                    disabled={!taskTitle.trim()}
                                    onClick={handleMockCreateTask}
                                >
                                    Save  task
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div className="space-y-4">
                    {activeMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`group flex items-end gap-2 ${msg.fromMe ? "justify-end" : "justify-start"}`}
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

                                {msg.fromMe && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                type="button"
                                                className="absolute top-5 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-background/80 hover:text-white"
                                            >
                                                <MoreVertical className="h-3.5 w-3.5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" sideOffset={4}>
                                            <DropdownMenuItem
                                                className="text-xs"
                                                onClick={() => handleCreateTaskFromMessage(msg)}
                                            >
                                                Add task
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
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
                    <Button size="icon" variant={"ghost"} className="h-9 aspect-square rounded-xl" onClick={() => setShowTaskComposer(!showTaskComposer)}>
                        <ClipboardList className="h-6 w-6" />
                    </Button>

                    <Button size="icon" className="h-9 aspect-square rounded-xl" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>

            </div>
        </MobileLayout>
    );
}
