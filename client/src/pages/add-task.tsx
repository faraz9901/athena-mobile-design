import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, Flag, FolderKanban, Users } from "lucide-react";
import { useLocation } from "wouter";

const mockProjects = [
    "City Center Mall",
    "Highway 45",
    "Green Valley",
];

export default function AddTask() {
    const [, navigate] = useLocation();
    const [title, setTitle] = useState("");
    const [project, setProject] = useState<string | undefined>(mockProjects[0]);
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("John Doe");

    const handleSave = () => {
        // Mock-only: in a real app this would POST to backend
        navigate("/tasks");
    };

    return (
        <MobileLayout title="Add Task" showBottomNav={false}>
            <div className="px-5 py-6 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => navigate("/tasks")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Add Task</h1>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs">Task title</Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Finalize structural drawings"
                                className="h-11 rounded-xl text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-2">
                                <Label className="text-xs flex items-center gap-1">
                                    <FolderKanban className="h-3 w-3" />
                                    Project
                                </Label>
                                <Select value={project} onValueChange={setProject}>
                                    <SelectTrigger className="h-11 rounded-xl text-sm">
                                        <SelectValue placeholder="Select project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mockProjects.map((name) => (
                                            <SelectItem key={name} value={name}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1 space-y-2">
                                    <Label className="text-xs flex items-center gap-1">
                                        <Flag className="h-3 w-3" />
                                        Priority
                                    </Label>
                                    <Select value={priority} onValueChange={setPriority}>
                                        <SelectTrigger className="h-11 rounded-xl text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex-1 space-y-2">
                                    <Label className="text-xs flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Due date
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="h-11 rounded-xl text-sm"
                                        inputMode="numeric"
                                        pattern="\d{4}-\d{2}-\d{2}"
                                        maxLength={10}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-2">
                                <Label className="text-xs flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    Assign To
                                </Label>
                                <Select value={assignedTo} onValueChange={setAssignedTo}>
                                    <SelectTrigger className="h-11 rounded-xl text-sm">
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

                        <div className="space-y-2">
                            <Label className="text-xs">Details</Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add context, links or requirements for this task"
                                className="min-h-[90px] rounded-xl text-sm resize-none"
                            />
                        </div>

                        <Button
                            className="w-full h-11 rounded-xl mt-2"
                            disabled={!title.trim()}
                            onClick={handleSave}
                        >
                            Save Task
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );
}
