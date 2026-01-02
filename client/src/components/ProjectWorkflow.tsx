import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

/* =========================
   Workflow Status Types
========================= */

const workflowStatuses = [
    "Draft",
    "Tender Submitted",
    "Tender Failed",
    "Tender Secured",
    "Project Ready for Execution",
    "Active",
    "Completed",
    "Closed",
] as const;

export type WorkflowStatus = (typeof workflowStatuses)[number];

/* =========================
   UI Action Types
========================= */

type ActionType =
    | "button"
    | "upload"
    | "input"
    | "email"
    | "decision"
    | "whatsapp";

interface WorkflowAction {
    id: string;
    label: string;
    type: ActionType;
    placeholder?: string;
    accept?: string;
    variant?: "primary" | "danger" | "outline";
}

/* =========================
   CENTRAL DEMO FLOW CONFIG
========================= */

/* =========================
   CENTRAL DEMO FLOW CONFIG
========================= */

const WORKFLOW_FLOW = [
    {
        key: "Draft",
        title: "Draft Created",
        description: "Tender documents uploaded & reviewed",
        actions: [
            { id: "upload_tender_docs", label: "Upload Tender Docs", type: "upload" },
            { id: "review_extracted_data", label: "Review Extracted Data", type: "button" },
        ],
    },
    {
        key: "Tender Submitted",
        title: "Tender Submitted",
        actions: [
            {
                id: "tender_secured",
                label: "Tender Secured",
                type: "decision",
                variant: "primary",
            },
            {
                id: "tender_failed",
                label: "Tender Failed",
                type: "decision",
                variant: "danger",
            },
        ],
    },
    {
        key: "Tender Secured",
        title: "Tender Secured",
        actions: [
            { id: "upload_loa", label: "Upload LOA / Work Order", type: "upload" },
            {
                id: "security_deposit_details",
                label: "Security Deposit Amount",
                type: "input",
                placeholder: "Enter amount",
            },
        ],
    },
    {
        key: "Project Ready for Execution",
        title: "Execution Ready",
        actions: [
            { id: "upload_drawings", label: "Upload Drawings", type: "upload" },
            {
                id: "set_project_dates",
                label: "Start Project",
                type: "button",
                variant: "primary",
            },
        ],
    },
    {
        key: "Active",
        title: "Project Active",
        actions: [
            { id: "upload_daily_photos", label: "Upload Daily Photos", type: "upload" },
            {
                id: "running_bill_received",
                label: "Running Bill Amount",
                type: "input",
                placeholder: "Enter amount",
            },
            { id: "send_whatsapp_summary", label: "Send WhatsApp Summary", type: "whatsapp" },
            {
                id: "mark_project_completed",
                label: "Mark Project Completed",
                type: "button",
                variant: "primary",
            },
        ],
    },
    {
        key: "Completed",
        title: "Project Completed",
        actions: [
            { id: "calculate_taxes", label: "Calculate Taxes", type: "button" },
            { id: "generate_delay_email", label: "Generate Delay Email", type: "email" },
        ],
    },
    {
        key: "Closed",
        title: "Workflow Closed",
        actions: [],
    },
] satisfies {
    key: WorkflowStatus;
    title: string;
    description?: string;
    actions: WorkflowAction[];
}[];

/* =========================
   Helpers
========================= */

type StepState = "completed" | "current" | "pending";

function resolveStepState(index: number, currentIndex: number): StepState {
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "current";
    return "pending";
}

/* =========================
   Props (UNCHANGED)
========================= */

interface ProjectWorkflowProps {
    projectId?: string | null;
    projectStatus: WorkflowStatus;
}

/* =========================
   DROP-IN COMPONENT
========================= */

export default function ProjectWorkflow({
    projectId,
    projectStatus,
}: ProjectWorkflowProps) {
    const currentIndex = useMemo(
        () => WORKFLOW_FLOW.findIndex((s) => s.key === projectStatus),
        [projectStatus]
    );

    // 🔥 DEMO STATE: click any step to preview its actions
    const [selectedStep, setSelectedStep] =
        useState<WorkflowStatus>(projectStatus);

    const [, setLocation] = useLocation();

    function handleActionClick(actionId: string) {
        if (!projectId) return;
        setLocation(`/projects/${projectId}/${actionId}`);
    }

    // Separate actions into types
    const getStepActions = (actions: WorkflowAction[]) => {
        const decisions = actions.filter(a => a.type === "decision");
        const pendingTasks = actions.filter(a => a.type !== "decision");
        return { decisions, pendingTasks };
    };

    function renderDecision(action: WorkflowAction) {
        return (
            <button
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                className={cn(
                    "text-xs px-3 py-1.5 rounded-full border transition-colors hover:shadow-sm",
                    action.variant === "primary" &&
                    "bg-primary text-white border-primary hover:bg-primary/90",
                    action.variant === "danger" &&
                    "bg-red-500 text-white border-red-500 hover:bg-red-600",
                    !action.variant && "hover:bg-secondary"
                )}
            >
                {action.label}
            </button>
        );
    }

    return (
        <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-base">Project Workflow</CardTitle>
                        {projectId && (
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Project ID: {projectId}
                            </p>
                        )}
                    </div>

                    <Badge variant="outline" className="text-[10px] rounded-full">
                        {projectStatus}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-5">
                {WORKFLOW_FLOW.map((step, index) => {
                    const state = resolveStepState(index, currentIndex);
                    const { decisions, pendingTasks } = getStepActions(step.actions);

                    return (
                        <div key={step.key} className="flex gap-4 relative">
                            {index !== WORKFLOW_FLOW.length - 1 && (
                                <div className="absolute left-[9px] top-6 bottom-[-10px] w-[2px] bg-secondary" />
                            )}

                            <div
                                className={cn(
                                    "h-5 w-5 rounded-full border-2 z-10 flex items-center justify-center bg-background",
                                    state === "completed" && "border-primary bg-primary",
                                    state === "current" && "border-primary",
                                    state === "pending" && "border-muted"
                                )}
                            >
                                {state === "completed" && (
                                    <div className="h-2 w-2 bg-white rounded-full" />
                                )}
                                {state === "current" && (
                                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                                )}
                            </div>

                            <div className="flex-1">
                                <h4
                                    onClick={() => setSelectedStep(step.key)}
                                    className={cn(
                                        "text-sm font-medium cursor-pointer",
                                        step.key === selectedStep && "text-primary"
                                    )}
                                >
                                    {step.title}
                                </h4>

                                {step.description && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {step.description}
                                    </p>
                                )}

                                {step.key === selectedStep && (
                                    <div className="relative mt-3 flex flex-wrap gap-2 items-center">
                                        {/* 1. Render Decisions Inline */}
                                        {decisions.map(renderDecision)}

                                        {/* 2. Render "View Actions" Button if there are pending tasks */}
                                        {pendingTasks.length > 0 && (
                                            <Drawer>
                                                <DrawerTrigger asChild>
                                                    <button className="text-xs px-3 py-1.5 rounded-full border bg-secondary/50 hover:bg-secondary transition-colors text-foreground">
                                                        View Actions
                                                    </button>
                                                </DrawerTrigger>
                                                <DrawerContent className="">
                                                    <DrawerHeader>
                                                        <DrawerTitle>Pending Actions</DrawerTitle>
                                                        <DrawerDescription>
                                                            Select an action to proceed with the {step.title} stage.
                                                        </DrawerDescription>
                                                    </DrawerHeader>
                                                    <div className="p-4 space-y-3 pb-8">
                                                        {pendingTasks.map((action) => (
                                                            <div
                                                                key={action.id}
                                                                onClick={() => handleActionClick(action.id)}
                                                                className="flex items-center p-3 rounded-xl border bg-card hover:bg-secondary/50 cursor-pointer transition-colors gap-3"
                                                            >
                                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                                    {action.type === "upload" && "📎"}
                                                                    {action.type === "email" && "📧"}
                                                                    {action.type === "whatsapp" && "💬"}
                                                                    {action.type === "input" && "✏️"}
                                                                    {["button", "decision"].includes(action.type) && "⚡"}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium">{action.label}</p>
                                                                    {action.placeholder && (
                                                                        <p className="text-xs text-muted-foreground">{action.placeholder}</p>
                                                                    )}
                                                                </div>
                                                                <div className="text-muted-foreground">→</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </DrawerContent>
                                            </Drawer>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card >
    );
}
