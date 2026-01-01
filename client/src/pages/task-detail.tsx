import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Paperclip,
  Send,
  Calendar,
  User,
  Flag,
  FileText,
  MessageSquare,
  X
} from "lucide-react";
import { useLocation, useRoute } from "wouter";

// Mock task data
const mockTask = {
  id: 1,
  title: "Finalize Structural Drawings",
  description: "Complete all structural drawings for the foundation and first floor. Include detailed specifications for materials and construction methods. Review with engineering team before final submission.",
  project: "City Center Mall",
  assignee: {
    id: 1,
    name: "John Doe",
    avatar: "JD"
  },
  priority: "High",
  status: "In Progress",
  dueDate: "2025-02-15",
  createdAt: "2025-01-20",
  attachments: [
    { id: 1, name: "draft_drawing_v1.pdf", size: "2.4 MB" },
    { id: 2, name: "specifications.docx", size: "850 KB" }
  ],
  comments: [
    {
      id: 1,
      author: "John Doe",
      avatar: "JD",
      message: "Working on the foundation specifications. Should be ready by tomorrow.",
      time: "2h ago"
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "JS",
      message: "Please ensure all measurements are in metric units.",
      time: "1h ago"
    }
  ]
};

export default function TaskDetail() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/task/:id");
  const taskId = params?.id;
  
  const [newComment, setNewComment] = useState("");
  const [priority, setPriority] = useState(mockTask.priority);
  const [status, setStatus] = useState(mockTask.status);

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In real app, this would add comment to backend
      setNewComment("");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "To Do":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <MobileLayout title="Task Details">
      <div className="px-5 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/tasks")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Task Details</h1>
        </div>

        {/* Task Title & Basic Info */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-3">{mockTask.title}</h2>
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${getPriorityColor(priority)} border font-medium`}>
                  <Flag className="h-3 w-3 mr-1" />
                  {priority}
                </Badge>
                <Badge className={`${getStatusColor(status)} border font-medium`}>
                  {status}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">{new Date(mockTask.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assignee:</span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {mockTask.assignee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{mockTask.assignee.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Project:</span>
                <span className="font-medium">{mockTask.project}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-3">
            <Label className="text-base font-semibold">Description</Label>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mockTask.description}
            </p>
          </CardContent>
        </Card>

        {/* Priority & Status */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="h-11 rounded-xl">
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
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Attachments</Label>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Paperclip className="mr-1.5 h-3.5 w-3.5" />
                Add File (Max 10 MB)
              </Button>
            </div>
            <div className="space-y-2">
              {mockTask.attachments.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 space-y-4">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
            </Label>
            
            <div className="space-y-4">
              {mockTask.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {comment.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="min-h-[80px] rounded-xl resize-none"
              />
            </div>
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="w-full rounded-xl"
            >
              <Send className="mr-2 h-4 w-4" />
              Post Comment
            </Button>
          </CardContent>
        </Card>

        <div className="h-8"></div>
      </div>
    </MobileLayout>
  );
}

