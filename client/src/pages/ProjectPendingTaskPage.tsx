import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { PENDING_TASK_CONFIG } from "@/config/pendingTaskConfig";
import { useState } from "react";

export default function ProjectPendingTaskPage() {
    const { projectId, pendingTask } = useParams<{ projectId: string; pendingTask: string }>();
    const [, setLocation] = useLocation();

    // Load config
    const taskConfig = PENDING_TASK_CONFIG[pendingTask as keyof typeof PENDING_TASK_CONFIG];

    // Local state for form values
    const [formData, setFormData] = useState<Record<string, any>>({});

    if (!taskConfig) {
        return (
            <MobileLayout>
                <div className="p-5 flex flex-col items-center justify-center min-h-[50vh]">
                    <h2 className="text-xl font-bold text-red-500">Task Not Found</h2>
                    <p className="text-muted-foreground mt-2">
                        The requested workflow task "{pendingTask}" does not exist.
                    </p>
                    <Button
                        className="mt-6"
                        variant="outline"
                        onClick={() => setLocation(`/project/${projectId}`)}
                    >
                        Return to Project
                    </Button>
                </div>
            </MobileLayout>
        );
    }

    const handleSubmit = () => {
        console.log({
            projectId,
            pendingTask,
            payload: formData
        });
        // Navigate back to project detail
        setLocation(`/project/${projectId}`);
    };

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Helper to check conditions
    const checkCondition = (condition: any) => {
        if (!condition) return true;
        return formData[condition.field] === condition.value;
    };

    return (
        <MobileLayout showBottomNav={false}>
            {/* Header */}
            <div className="bg-primary text-primary-foreground pt-8 pb-6 px-5 rounded-b-[2rem] shadow-lg relative z-10 mb-6">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground hover:bg-white/10 -ml-2"
                        onClick={() => setLocation(`/project/${projectId}`)}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-xl font-bold leading-tight flex-1">
                        {taskConfig.title}
                    </h1>
                </div>
            </div>

            <div className="px-5 pb-20 space-y-6">
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Task Details</CardTitle>
                        <CardDescription>
                            Complete the following to proceed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {taskConfig.fields.length === 0 && (
                            <p className="text-sm text-muted-foreground italic">
                                No additional information required. Click Save to proceed.
                            </p>
                        )}

                        {taskConfig.fields.map((field, index) => {
                            const fieldKey = `field_${index}`;
                            const f = field as any;

                            if (!checkCondition(f.condition)) return null;

                            // Special handling for info_action (Button)
                            if (f.type === "info_action") {
                                return (
                                    <div key={index} className="pt-2">
                                        <Label className="block mb-2">{f.label}</Label>
                                        <Button
                                            variant="secondary"
                                            className="w-full justify-between"
                                            onClick={() => {
                                                // Handle navigation if link is provided
                                                if (f.link) {
                                                    setLocation(`/project/${projectId}/task/${f.link}`);
                                                } else {
                                                    console.log("Action triggered:", f.actionLabel);
                                                }
                                            }}
                                        >
                                            {f.actionLabel}
                                            <Save className="h-4 w-4 ml-2 opacity-50" />
                                        </Button>
                                    </div>
                                );
                            }

                            if (f.type === "info") {
                                return (
                                    <div key={index} className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                                        {f.label}
                                    </div>
                                );
                            }

                            // Decision Buttons (Yes/No style)
                            if (f.type === "decision") {
                                return (
                                    <div key={index} className="space-y-3">
                                        <Label className="text-base font-medium">{f.label}</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {f.options?.map((opt: string) => (
                                                <Button
                                                    key={opt}
                                                    type="button"
                                                    variant={formData[f.label] === opt ? "default" : "outline"}
                                                    className={formData[f.label] === opt ? "shadow-md" : "border-dashed"}
                                                    onClick={() => handleChange(f.label, opt)}
                                                >
                                                    {opt}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            switch (field.type) {
                                case "text":
                                case "number":
                                case "date":
                                    return (
                                        <div key={index} className="space-y-2">
                                            <Label htmlFor={fieldKey}>{f.label}</Label>
                                            <Input
                                                id={fieldKey}
                                                type={field.type}
                                                placeholder={f.label}
                                                value={formData[f.label] || ''}
                                                readOnly={f.readOnly}
                                                onChange={(e) => handleChange(f.label, e.target.value)}
                                            />
                                        </div>
                                    );

                                case "textarea":
                                    return (
                                        <div key={index} className="space-y-2">
                                            <Label htmlFor={fieldKey}>{f.label}</Label>
                                            <Textarea
                                                id={fieldKey}
                                                placeholder={f.label}
                                                className="min-h-[100px]"
                                                value={formData[f.label] || ''}
                                                onChange={(e) => handleChange(f.label, e.target.value)}
                                            />
                                        </div>
                                    );

                                case "file":
                                    return (
                                        <div key={index} className="space-y-2">
                                            <Label htmlFor={fieldKey}>
                                                {f.label} {f.optional && <span className="text-muted-foreground font-normal">(Optional)</span>}
                                            </Label>
                                            <Input
                                                id={fieldKey}
                                                type="file"
                                                accept={f.accept}
                                                multiple={f.multiple}
                                                onChange={(e) => handleChange(f.label, e.target.files)}
                                            />
                                        </div>
                                    );

                                case "checkbox":
                                    return (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={fieldKey}
                                                checked={!!formData[f.label]}
                                                onCheckedChange={(checked) => handleChange(f.label, checked)}
                                            />
                                            <Label htmlFor={fieldKey}>{f.label}</Label>
                                        </div>
                                    );

                                case "radio":
                                    return (
                                        <div key={index} className="space-y-3">
                                            <Label>{f.label}</Label>
                                            <RadioGroup
                                                value={formData[f.label]}
                                                onValueChange={(val) => handleChange(f.label, val)}
                                            >
                                                {f.options?.map((opt: string) => (
                                                    <div key={opt} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={opt} id={`${fieldKey}_${opt}`} />
                                                        <Label htmlFor={`${fieldKey}_${opt}`}>{opt}</Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </CardContent>
                </Card>

                <Button
                    className="w-full text-base py-6 rounded-xl shadow-lg shadow-primary/20"
                    onClick={handleSubmit}
                >
                    <Save className="mr-2 h-5 w-5" />
                    Save & Continue
                </Button>
            </div>
        </MobileLayout>
    );
}
