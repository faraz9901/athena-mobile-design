import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Users } from "lucide-react";
import { useLocation, useRoute } from "wouter";

const mockProjects = [
    { id: 1, name: "City Center Mall" },
    { id: 2, name: "Highway 45" },
    { id: 3, name: "Green Valley" },
];

const mockPartners = [
    {
        id: 1,
        name: "ABC Construction Co.",
        role: "Civil Works Partner",
        share: 40,
        projects: [1, 3],
    },
    {
        id: 2,
        name: "Skyline Infra JV",
        role: "JV Partner",
        share: 55,
        projects: [1],
    },
    {
        id: 3,
        name: "Greenfield Associates",
        role: "Landscape & External",
        share: 30,
        projects: [3],
    },
];

export default function PartnerEdit() {
    const [, setLocation] = useLocation();
    const [match, params] = useRoute("/partner/:id");
    const partnerIdParam = params?.id;
    const partnerId = partnerIdParam ? Number(partnerIdParam) : undefined;

    const partner = mockPartners.find((p) => p.id === partnerId) || mockPartners[0];

    const [share, setShare] = useState<number>(partner.share);

    const projectsForPartner = mockProjects.filter((p) => partner.projects.includes(p.id));

    const handleSave = () => {
        // In real app, save to backend
        setLocation("/vendors-partners");
    };

    return (
        <MobileLayout title="Edit Partner">
            <div className="px-5 py-6 space-y-6">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setLocation("/vendors-partners")}
                        className="h-8 w-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Edit Partner</h1>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border-2 border-primary/20">
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {partner.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="font-semibold text-base truncate">{partner.name}</h2>
                                    <Badge className="text-xs flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        Partner
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{partner.role}</p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div>
                                <Label className="text-xs mb-1 block">Projects</Label>
                                <div className="flex flex-wrap gap-1">
                                    {projectsForPartner.map((p) => (
                                        <span
                                            key={p.id}
                                            className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                                        >
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs">Share (%) in this partner’s scope</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={share}
                                    onChange={(e) => setShare(Number(e.target.value) || 0)}
                                    className="h-10 rounded-xl text-sm"
                                />
                                <p className="text-[11px] text-muted-foreground">
                                    This is a design‑time mock. In production this would update the commercial split for this partner.
                                </p>
                            </div>
                        </div>

                        <Button className="w-full rounded-xl mt-2" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );
}
