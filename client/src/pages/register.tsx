import React, { useEffect, useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Check, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------- CONSTANTS -------------------- */

const OCCUPATIONS = [
    "Government Contractor",
    "Non-Government Contractor",
    "Consultant",
    "Architect",
    "Interior Designer",
    "Freelancer",
];

const FIRM_TYPES = [
    "Partnership Firm",
    "LLP",
    "Private Limited",
    "Proprietorship",
    "Any Other",
];

const DEPARTMENTS_LIST = [
    "PWD",
    "Water Resources",
    "MES (GOI)",
    "Local Bodies",
    "Panchayat Raj",
    "Any Other",
];

/* -------------------- COMPONENT -------------------- */

export default function Register() {
    const { user, updateUser } = useAuth();
    const [, navigate] = useLocation();
    const { toast } = useToast();


    /* -------------------- STATE -------------------- */

    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    const [occupation, setOccupation] = useState("");
    const [ownershipType, setOwnershipType] =
        useState<"Single Owner" | "Partnership">("Single Owner");

    const [partners, setPartners] = useState<
        { name: string; share: string }[]
    >([{ name: "", share: "" }]);

    const [firmType, setFirmType] = useState("");
    const [firmDetails, setFirmDetails] = useState({
        name: "",
        address: "",
        gstin: "",
        pan: "",
        epfo: "",
        esic: "",
        tan: "",
    });

    const [departments, setDepartments] = useState<
        { name: string; expiry: string }[]
    >([]);

    useEffect(() => {
        if (user?.onboardingCompleted) {
            navigate("/");
        }
    }, [user?.onboardingCompleted, navigate]);

    /* -------------------- FLOW FLAGS -------------------- */

    const isGovtContractor = occupation === "Government Contractor";
    const isPartnership = ownershipType === "Partnership";
    const totalSteps = occupation ? (isGovtContractor ? (isPartnership ? 6 : 2) : 1) : 0;

    /* -------------------- NAVIGATION -------------------- */

    const nextStep = async () => {
        // Non-govt → finish immediately
        if (step === 1 && !isGovtContractor) {
            await quickComplete();
            return;
        }

        // Auto-skip partnership if single owner
        if (step === 2 && ownershipType === "Single Owner") {
            await handleComplete();
            return;
        }

        setStep((s) => Math.min(s + 1, totalSteps));
    };

    const prevStep = () => {
        if (step === 4 && ownershipType === "Single Owner") {
            setStep(2);
            return;
        }
        setStep((s) => Math.max(s - 1, 1));
    };

    /* -------------------- VALIDATION -------------------- */

    function validateStep() {
        switch (step) {
            case 1:
                return !!occupation;
            case 2:
                return true;
            case 3:
                if (!isPartnership) return true;
                const total = partners.reduce(
                    (s, p) => s + (parseFloat(p.share) || 0),
                    0
                );
                return (
                    partners.every((p) => p.name && p.share) &&
                    Math.abs(total - 100) < 0.1
                );
            case 4:
                return !!firmType;
            case 5:
                return !!firmDetails.name && !!firmDetails.address;
            default:
                return true;
        }
    }

    /* -------------------- SUBMIT -------------------- */

    async function quickComplete() {
        setSubmitting(true);
        try {
            await updateUser({
                occupation,
                onboardingCompleted: true,
            });
            navigate("/");
            toast({ title: "Welcome!", description: "Profile setup complete." });
        } catch {
            toast({
                title: "Error",
                description: "Failed to complete onboarding",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    }

    async function handleComplete() {
        await quickComplete();
    }

    /* -------------------- RENDERS -------------------- */

    const renderOccupation = () => (
        <>
            <div className="grid grid-cols-2 gap-3">
                {OCCUPATIONS.map((occ) => (
                    <div
                        key={occ}
                        onClick={() => setOccupation(occ)}
                        className={cn(
                            "p-4 border rounded-xl text-center cursor-pointer min-h-[96px] flex items-center justify-center font-medium",
                            occupation === occ
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "hover:border-primary/50"
                        )}
                    >
                        {occ}
                    </div>
                ))}
            </div>

            {isGovtContractor && (
                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
                    ℹ️ Additional details are required for Government Contractors to manage
                    tenders, firm registrations, and department enlistments.
                </div>
            )}
        </>
    );

    const renderOwnership = () => (
        <div className="space-y-4">
            {["Single Owner", "Partnership"].map((type) => (
                <div
                    key={type}
                    onClick={() => setOwnershipType(type as any)}
                    className={cn(
                        "p-5 border rounded-xl flex justify-between cursor-pointer",
                        ownershipType === type
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "hover:border-primary/50"
                    )}
                >
                    <span className="font-medium">{type}</span>
                    {ownershipType === type && <Check className="text-primary" />}
                </div>
            ))}
        </div>
    );

    const renderPartnership = () => {
        const totalShare = partners.reduce(
            (s, p) => s + (parseFloat(p.share) || 0),
            0
        );

        return (
            <div className="space-y-4">
                {partners.map((p, i) => (
                    <div key={i} className="flex gap-3">
                        <Input
                            placeholder="Partner name"
                            value={p.name}
                            onChange={(e) => {
                                const n = [...partners];
                                n[i].name = e.target.value;
                                setPartners(n);
                            }}
                        />
                        <Input
                            type="number"
                            placeholder="%"
                            value={p.share}
                            onChange={(e) => {
                                const n = [...partners];
                                n[i].share = e.target.value;
                                setPartners(n);
                            }}
                        />
                        {partners.length > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    setPartners(partners.filter((_, idx) => idx !== i))
                                }
                            >
                                <Trash2 className="text-destructive w-4 h-4" />
                            </Button>
                        )}
                    </div>
                ))}

                <Button
                    variant="outline"
                    onClick={() =>
                        setPartners([...partners, { name: "", share: "" }])
                    }
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Partner
                </Button>

                <div
                    className={cn(
                        "text-right font-medium",
                        totalShare === 100 ? "text-green-600" : "text-destructive"
                    )}
                >
                    Total Share: {totalShare}%
                </div>
            </div>
        );
    };

    const renderFirmType = () => (
        <div className="space-y-3">
            {FIRM_TYPES.map((t) => (
                <div
                    key={t}
                    onClick={() => setFirmType(t)}
                    className={cn(
                        "p-4 border rounded-xl flex justify-between cursor-pointer",
                        firmType === t
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "hover:border-primary/50"
                    )}
                >
                    {t}
                    {firmType === t && <Check className="text-primary" />}
                </div>
            ))}
        </div>
    );

    const renderFirmDetails = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Firm Name <span className="text-destructive">*</span></Label>
                <Input value={firmDetails.name} onChange={e => setFirmDetails({ ...firmDetails, name: e.target.value })} placeholder="Enter firm name" />
            </div>
            <div className="space-y-2">
                <Label>Address <span className="text-destructive">*</span></Label>
                <Input value={firmDetails.address} onChange={e => setFirmDetails({ ...firmDetails, address: e.target.value })} placeholder="Location" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>GSTIN</Label>
                    <Input value={firmDetails.gstin} onChange={e => setFirmDetails({ ...firmDetails, gstin: e.target.value })} placeholder="Optional" />
                </div>
                <div className="space-y-2">
                    <Label>PAN</Label>
                    <Input value={firmDetails.pan} onChange={e => setFirmDetails({ ...firmDetails, pan: e.target.value })} placeholder="Optional" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                    <Label className="text-xs">EPFO</Label>
                    <Input className="h-9" value={firmDetails.epfo} onChange={e => setFirmDetails({ ...firmDetails, epfo: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs">ESIC</Label>
                    <Input className="h-9" value={firmDetails.esic} onChange={e => setFirmDetails({ ...firmDetails, esic: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs">TAN</Label>
                    <Input className="h-9" value={firmDetails.tan} onChange={e => setFirmDetails({ ...firmDetails, tan: e.target.value })} />
                </div>
            </div>
        </div>
    );

    const renderDepartments = () => {
        const addDept = () => setDepartments([...departments, { name: "", expiry: "" }]);
        const removeDept = (idx: number) => setDepartments(departments.filter((_, i) => i !== idx));
        const updateDept = (idx: number, field: 'name' | 'expiry', val: string) => {
            const newDepts = [...departments];
            newDepts[idx] = { ...newDepts[idx], [field]: val };
            setDepartments(newDepts);
        }

        return (
            <div className="space-y-6">
                <p className="text-sm text-muted-foreground">Add details of departments where you are enlisted.</p>

                <div className="space-y-4">
                    {departments.map((dept, idx) => (
                        <Card key={idx} className="p-3 relative">
                            <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => removeDept(idx)}>
                                <Trash2 className="w-3 h-3 text-destructive" />
                            </Button>
                            <div className="space-y-3 mt-1">
                                <div className="space-y-1">
                                    <Label className="text-xs">Department Name</Label>
                                    <Select value={dept.name} onValueChange={(val) => updateDept(idx, 'name', val)}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select dept" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DEPARTMENTS_LIST.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Expiry Date</Label>
                                    <Input
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                        value={dept.expiry}
                                        onChange={(e) => {
                                            const n = [...departments];
                                            n[idx].expiry = e.target.value;
                                            setDepartments(n);
                                        }}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}


                    <Button type="button" variant="outline" onClick={addDept} className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Add Department
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <MobileLayout showBottomNav={false} showSidebarToggle={false} >
            <div className="flex flex-col h-full">
                <div className="px-5 py-6 space-y-3">
                    <h1 className="text-2xl font-bold">Setup Profile</h1>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(step / (totalSteps > 0 ? totalSteps : 1)) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex-1 px-5 pb-24">
                    {step === 1 && renderOccupation()}
                    {step === 2 && isGovtContractor && renderOwnership()}
                    {step === 3 && isGovtContractor && isPartnership && renderPartnership()}
                    {step === 4 && isGovtContractor && renderFirmType()}
                    {step === 5 && isGovtContractor && renderFirmDetails()}
                    {step === 6 && isGovtContractor && renderDepartments()}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-5 bg-background border-t">
                    <div className="flex justify-end gap-3 max-w-md mx-auto">
                        <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>

                        {step < totalSteps ? (
                            <Button onClick={nextStep} disabled={!validateStep()}>
                                Next <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button onClick={handleComplete} disabled={submitting || totalSteps === 0}>
                                Complete Setup
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
