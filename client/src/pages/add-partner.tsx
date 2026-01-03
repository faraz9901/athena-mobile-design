import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Users, UserPlus } from "lucide-react";
import { useLocation } from "wouter";

const mockProjects = [
    { id: 1, name: "City Center Mall" },
    { id: 2, name: "Highway 45" },
    { id: 3, name: "Green Valley" },
];

const initialPartners = [
    {
        id: 1,
        name: "ABC Construction Co.",
        email: "info@abcconstruction.com",
        phone: "+91 98765 43211",
        role: "Civil Works Partner",
        share: 40,
        projects: [1, 3],
    },
    {
        id: 2,
        name: "Skyline Infra JV",
        email: "team@skylineinfra.com",
        phone: "+91 98765 43001",
        role: "JV Partner",
        share: 55,
        projects: [1],
    },
    {
        id: 3,
        name: "Greenfield Associates",
        email: "hello@greenfield.com",
        phone: "+91 98765 43999",
        role: "Landscape & External",
        share: 30,
        projects: [3],
    },
];

export default function AddPartner() {
    const [, navigate] = useLocation();
    const [selectedProjectId, setSelectedProjectId] = useState<number>(
        mockProjects[0]?.id ?? 1
    );
    const [partners, setPartners] = useState(initialPartners);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [share, setShare] = useState("");

    const filteredPartners = partners.filter((p) =>
        p.projects.includes(selectedProjectId)
    );

    const handleAddPartner = () => {
        if (!name.trim()) return;

        const nextId = partners.reduce((max, p) => Math.max(max, p.id), 0) + 1;

        const newPartner = {
            id: nextId,
            name: name.trim(),
            email: email.trim() || "-",
            phone: phone.trim() || "-",
            role: role.trim() || "Partner",
            share: Number(share) || 0,
            projects: [selectedProjectId],
        };

        setPartners([...partners, newPartner]);
        setName("");
        setEmail("");
        setPhone("");
        setRole("");
        setShare("");
    };

    return (
        <MobileLayout
            title="Add Partner"
            fabAction={undefined}
            fabIcon={undefined}
            showBottomNav={false}
        >
            <div className="px-5 pt-6 pb-4 space-y-4">
                <div className="flex items-center justify-between mb-1">
                    <div>
                        <h1 className="text-2xl font-bold">Add Partner</h1>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Link a new partner to a project
                        </p>
                    </div>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[11px] text-muted-foreground mb-1 block">
                                Project
                            </Label>
                            <select
                                value={selectedProjectId}
                                onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                                className="flex-1 h-10 rounded-xl border bg-secondary/30 px-3 text-xs w-full"
                            >
                                {mockProjects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-2">
                                <Label className="text-[11px] text-muted-foreground mb-1 block">
                                    Partner name
                                </Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. ABC Construction Co."
                                    className="h-10 rounded-xl text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] text-muted-foreground mb-1 block">
                                    Email
                                </Label>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="contact@partner.com"
                                    className="h-10 rounded-xl text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] text-muted-foreground mb-1 block">
                                    Phone
                                </Label>
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 98xxx xxxxx"
                                    className="h-10 rounded-xl text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] text-muted-foreground mb-1 block">
                                    Role / Scope
                                </Label>
                                <Input
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="JV Partner / Civil Works / ..."
                                    className="h-10 rounded-xl text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] text-muted-foreground mb-1 block">
                                    Share %
                                </Label>
                                <Input
                                    type="number"
                                    value={share}
                                    onChange={(e) => setShare(e.target.value)}
                                    placeholder="0"
                                    className="h-10 rounded-xl text-sm"
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full h-11 rounded-xl mt-1 flex items-center justify-center gap-2"
                            onClick={handleAddPartner}
                            disabled={!name.trim()}
                        >
                            <UserPlus className="h-4 w-4" />
                            Add Partner
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-muted-foreground">
                            Partners in this project
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-[11px]"
                            onClick={() => navigate("/vendors-partners")}
                        >
                            Manage all
                        </Button>
                    </div>

                    {filteredPartners.map((partner) => (
                        <Card
                            key={partner.id}
                            className="border-none shadow-sm ring-1 ring-black/5"
                        >
                            <CardContent className="p-3 flex items-start gap-3">
                                <Avatar className="h-9 w-9 border border-primary/20">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                        {partner.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-semibold text-sm truncate">
                                            {partner.name}
                                        </p>
                                        <Badge className="text-[10px] px-2 py-0.5 flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            Partner
                                        </Badge>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mb-1 truncate">
                                        {partner.role}
                                    </p>
                                    <div className="space-y-1 text-[11px] text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-3 w-3" />
                                            <span className="truncate">{partner.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-3 w-3" />
                                            <span>{partner.phone}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Badge className="text-[10px] px-2 py-0.5 rounded-full">
                                            {partner.share}% project share
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground">
                                            Scope: {partner.role}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredPartners.length === 0 && (
                        <Card className="border-dashed">
                            <CardContent className="p-6 text-center text-xs text-muted-foreground">
                                No partners added yet for this project.
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
}
