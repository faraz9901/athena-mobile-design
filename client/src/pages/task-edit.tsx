import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, Flag, FileText, User } from "lucide-react";
import { useLocation, useRoute } from "wouter";

// For now, mirror the mock task structure from TaskDetail
const mockTask = {
    id: 1,
    title: "Finalize Structural Drawings",
    description:
        "Complete all structural drawings for the foundation and first floor. Include detailed specifications for materials and construction methods.",
    project: "City Center Mall",
    assignee: {
        id: 1,
        name: "John Doe",
        avatar: "JD",
    },
    priority: "High",
    status: "In Progress",
    dueDate: "2025-02-15",
};

export default function TaskEdit() {
    const [, navigate] = useLocation();
    const [, params] = useRoute("/task/:id/edit");
    const taskId = params?.id;

    const [title, setTitle] = useState(mockTask.title);
    const [project, setProject] = useState(mockTask.project);
    const [priority, setPriority] = useState<string>(mockTask.priority);
    const [status, setStatus] = useState<string>(mockTask.status);
    const [dueDate, setDueDate] = useState<string>(mockTask.dueDate);
    const [description, setDescription] = useState(mockTask.description);

    const handleSave = () => {
        // Mock-only: in a real app this would PATCH to backend
        if (taskId) {
            navigate(`/task/${taskId}`);
        } else {
            navigate("/tasks");
        }
    };

    return (
        <MobileLayout title="Edit Task" showBottomNav={false}>
            <div className="px-5 py-6 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => (taskId ? navigate(`/task/${taskId}`) : navigate("/tasks"))}
                        className="h-8 w-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Edit Task</h1>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs">Task title</Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-11 rounded-xl text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs flex items-center gap-1">
                                <FileText className="h-3 w-3" /> Project
                            </Label>
                            <Input
                                value={project}
                                onChange={(e) => setProject(e.target.value)}
                                className="h-11 rounded-xl text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label className="text-xs flex items-center gap-1">
                                    <Flag className="h-3 w-3" /> Priority
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

                            <div className="space-y-2">
                                <Label className="text-xs flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> Due date
                                </Label>
                                <Input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="h-11 rounded-xl text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs flex items-center gap-1">
                                <User className="h-3 w-3" /> Assignee
                            </Label>
                            <Input
                                value={mockTask.assignee.name}
                                disabled
                                className="h-11 rounded-xl text-sm bg-secondary/40 border-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="h-11 rounded-xl text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs">Description</Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="min-h-[100px] rounded-xl text-sm resize-none"
                            />
                        </div>

                        <Button
                            className="w-full h-11 rounded-xl mt-1"
                            onClick={handleSave}
                            disabled={!title.trim()}
                        >
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );
}
