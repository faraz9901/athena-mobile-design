import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, CheckCircle2, ArrowRight } from "lucide-react";

const mockPlan = {
    name: "Professional",
    projects: 15,
    maxProjects: 50,
    storage: 45,
    maxStorage: 100,
    expiresAt: "2025-12-31",
};

const planFeatures = [
    "Up to 50 projects",
    "100 GB storage",
    "Unlimited team members",
    "Advanced reporting",
    "Priority support",
    "OCR document scanning",
];

export default function Subscription() {
    return (
        <MobileLayout title="Subscription">
            <div className="px-5 py-6 space-y-6">
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Current Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Plan</span>
                                <Badge variant="default" className="font-semibold">
                                    {mockPlan.name}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Valid Until</span>
                                <span className="text-sm font-medium">
                                    {new Date(mockPlan.expiresAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-muted-foreground">Projects</span>
                                    <span className="text-sm font-medium">
                                        {mockPlan.projects} / {mockPlan.maxProjects}
                                    </span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full"
                                        style={{ width: `${(mockPlan.projects / mockPlan.maxProjects) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-muted-foreground">Storage</span>
                                    <span className="text-sm font-medium">
                                        {mockPlan.storage} GB / {mockPlan.maxStorage} GB
                                    </span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full"
                                        style={{ width: `${(mockPlan.storage / mockPlan.maxStorage) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <p className="text-sm font-semibold mb-2">Plan Features</p>
                            {planFeatures.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full rounded-xl" variant="outline">
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Upgrade Plan
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );
}
