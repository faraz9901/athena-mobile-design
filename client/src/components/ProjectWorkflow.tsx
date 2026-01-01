import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
   Central Workflow Config
========================= */

type ActionType = "button" | "upload" | "email" | "decision" | "whatsapp";

interface WorkflowAction {
    label: string;
    type: ActionType;
    variant?: "primary" | "danger" | "outline";
}

interface WorkflowStep {
    key: WorkflowStatus;
    title: string;
    description?: string;
    actions?: WorkflowAction[];
}

const WORKFLOW_STEPS: WorkflowStep[] = [
    {
        key: "Draft",
        title: "Draft Created",
        description: "Tender documents uploaded & reviewed",
        actions: [
            { label: "Upload Tender Docs", type: "upload" },
            { label: "Review Extracted Data", type: "button" },
            { label: "Submit Tender", type: "button", variant: "primary" },
        ],
    },
    {
        key: "Tender Submitted",
        title: "Tender Submitted",
        actions: [
            { label: "Tender Secured", type: "decision", variant: "primary" },
            { label: "Tender Failed", type: "decision", variant: "danger" },
        ],
    },
    // {
    //     key: "Tender Failed",
    //     title: "Tender Failed",
    //     description: "Await EMD refund",
    //     actions: [
    //         { label: "Verify EMD Refund", type: "button" },
    //         { label: "Generate Refund Email", type: "email" },
    //     ],
    // },
    {
        key: "Tender Secured",
        title: "Tender Secured",
        actions: [
            { label: "Upload LOA / Work Order", type: "upload" },
            { label: "Add Security Deposit", type: "button" },
        ],
    },
    {
        key: "Project Ready for Execution",
        title: "Execution Ready",
        actions: [
            { label: "Upload Drawings", type: "upload" },
            { label: "Start Daily Progress", type: "button", variant: "primary" },
        ],
    },
    {
        key: "Active",
        title: "Project Active",
        actions: [
            { label: "Upload Daily Photos", type: "upload" },
            { label: "Any Running Bill Received ?", type: "button" },
            { label: "Send WhatsApp Summary", type: "whatsapp" },
            { label: "Mark Project Completed", type: "button", variant: "primary" },
        ],
    },
    {
        key: "Completed",
        title: "Project Completed",
        actions: [
            { label: "Calculate Taxes", type: "button" },
            { label: "Generate Delay Email", type: "email" },
        ],
    },
    {
        key: "Closed",
        title: "Workflow Closed",
        description: "Project lifecycle completed",
    },
];

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
        () => WORKFLOW_STEPS.findIndex((s) => s.key === projectStatus),
        [projectStatus]
    );

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
                {WORKFLOW_STEPS.map((step, index) => {
                    const state = resolveStepState(index, currentIndex);

                    return (
                        <div key={step.key} className="flex gap-4 relative">
                            {/* Vertical line */}
                            {index !== WORKFLOW_STEPS.length - 1 && (
                                <div className="absolute left-[9px] top-6 bottom-[-10px] w-[2px] bg-secondary" />
                            )}

                            {/* Status Dot */}
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

                            {/* Step Content */}
                            <div className="flex-1">
                                <h4
                                    className={cn(
                                        "text-sm font-medium",
                                        state === "pending" && "text-muted-foreground"
                                    )}
                                >
                                    {step.title}
                                </h4>

                                {step.description && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {step.description}
                                    </p>
                                )}

                                {/* Contextual Actions */}
                                {state === "current" && step.actions && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {step.actions.map((action, i) => (
                                            <button
                                                key={i}
                                                className={cn(
                                                    "text-xs px-3 py-1.5 rounded-full border",
                                                    action.variant === "primary" &&
                                                    "bg-primary text-white border-primary",
                                                    action.variant === "danger" &&
                                                    "bg-red-500 text-white border-red-500"
                                                )}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
