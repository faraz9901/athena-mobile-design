import React, { useMemo, useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, Plus, Phone, Edit, Trash2 } from "lucide-react";
import {
    ProjectContact,
    getContactsByProject,
    upsertContact,
    deleteContact,
} from "@/lib/contacts-store";

function ProjectContactsPage() {
    const [match, params] = useRoute("/project/:id/contacts");
    const projectId = params?.id ?? "";
    const [, navigate] = useLocation();

    const [editing, setEditing] = useState<ProjectContact | null>(null);
    const [form, setForm] = useState({ name: "", description: "", phone: "" });
    const [version, setVersion] = useState(0);

    const contacts = useMemo(() => {
        if (!projectId) return [];
        return getContactsByProject(projectId);
    }, [projectId, version]);

    const resetForm = () => {
        setEditing(null);
        setForm({ name: "", description: "", phone: "" });
    };

    const handleSave = () => {
        if (!projectId || !form.name.trim()) return;

        const contact: ProjectContact = {
            id: editing?.id ?? `${Date.now()}`,
            projectId,
            name: form.name.trim(),
            description: form.description.trim(),
            phone: form.phone.trim(),
        };

        upsertContact(contact);
        setVersion((v) => v + 1);
        resetForm();
    };

    const handleEdit = (c: ProjectContact) => {
        setEditing(c);
        setForm({ name: c.name, description: c.description, phone: c.phone });
    };

    const handleDelete = (id: string) => {
        deleteContact(id);
        setVersion((v) => v + 1);
        if (editing?.id === id) {
            resetForm();
        }
    };

    return (
        <MobileLayout
            title="Project Contacts"
            showBottomNav={false}
            fabAction={undefined}
        >
            <div className="px-5 pt-6 pb-24 space-y-5">
                <div className="flex items-center justify-between mb-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="-ml-2"
                        onClick={() => navigate(`/project/${projectId}`)}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Badge variant="outline" className="text-[10px]">
                        Contacts per project
                    </Badge>
                </div>

                <Card className="border-primary/40 bg-primary/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Add contact for this project</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-1">
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                                Name
                            </p>
                            <Input
                                value={form.name}
                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                placeholder="Person or organisation name"
                                className="h-9 text-sm"
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                                Description
                            </p>
                            <Input
                                value={form.description}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, description: e.target.value }))
                                }
                                placeholder="Role / notes (eg. Site engineer, Client POC)"
                                className="h-9 text-sm"
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                                Contact number
                            </p>
                            <Input
                                value={form.phone}
                                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                placeholder="Phone number"
                                className="h-9 text-sm"
                            />
                        </div>

                        <div className="pt-2 flex gap-2">
                            {editing && (
                                <Button
                                    variant="outline"
                                    className="flex-1 h-9 text-xs"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button
                                className="flex-1 h-9 text-xs"
                                onClick={handleSave}
                                disabled={!form.name.trim()}
                            >
                                {editing ? (
                                    <>
                                        <Edit className="h-4 w-4 mr-1" />
                                        Update contact
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4 mr-1" />
                                        Save contact
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Saved contacts
                        </p>
                        <span className="text-[11px] text-muted-foreground">
                            {contacts.length} total
                        </span>
                    </div>

                    {contacts.length === 0 ? (
                        <div className="text-xs text-muted-foreground border border-dashed rounded-xl px-3 py-6 text-center">
                            No contacts added for this project yet.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {contacts.map((c) => (
                                <Card
                                    key={c.id}
                                    className="border border-border/70 shadow-sm rounded-xl"
                                >
                                    <CardContent className="p-3 flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-semibold text-primary">
                                                {c.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .slice(0, 2)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <p className="font-semibold text-sm truncate">{c.name}</p>
                                                    <Badge className="text-[10px] px-2 py-0.5">
                                                        Contact
                                                    </Badge>
                                                </div>
                                                {c.description && (
                                                    <p className="text-[11px] text-muted-foreground mb-1 truncate">
                                                        {c.description}
                                                    </p>
                                                )}
                                                {c.phone && (
                                                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                                        <Phone className="h-3 w-3" />
                                                        <span>{c.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() => handleEdit(c)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-destructive"
                                                onClick={() => handleDelete(c.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MobileLayout>
    );
}

export default ProjectContactsPage;
