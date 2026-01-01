import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Check, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const OCCUPATIONS = [
    "Government Contractor",
    "Non-Government Contractor",
    "Consultant",
    "Architect",
    "Interior Designer",
    "Freelancer"
];

const FIRM_TYPES = [
    "Partnership Firm",
    "LLP",
    "Private Limited",
    "Proprietorship",
    "Any Other"
];

const DEPARTMENTS_LIST = [
    "PWD",
    "Water Resources",
    "MES (GOI)",
    "Local Bodies",
    "Panchayat Raj",
    "Any Other"
];

export default function Register() {
    const { user, updateUser } = useAuth();
    const [, navigate] = useLocation();
    const { toast } = useToast();

    if (user?.onboardingCompleted) {
        navigate("/");
        return null;
    }

    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [occupation, setOccupation] = useState("");
    const [ownershipType, setOwnershipType] = useState<"Single Owner" | "Partnership">("Single Owner");

    // Partnership
    const [partners, setPartners] = useState<{ name: string, share: string }[]>([{ name: "", share: "" }]);
    const [shareType, setShareType] = useState<"Fixed" | "Flexible">("Fixed");

    // Firm
    const [firmType, setFirmType] = useState("");
    const [firmDetails, setFirmDetails] = useState({
        name: "",
        address: "",
        gstin: "",
        pan: "",
        epfo: "",
        esic: "",
        tan: ""
    });

    // Departments
    const [departments, setDepartments] = useState<{ name: string, expiry: string }[]>([]);

    const totalSteps = 6;

    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    function validateStep() {
        switch (step) {
            case 1: return !!occupation;
            case 2: return !!ownershipType;
            case 3:
                if (ownershipType === 'Single Owner') return true;
                // Validate partners
                if (partners.length === 0) return false;
                const totalShare = partners.reduce((sum, p) => sum + (parseFloat(p.share) || 0), 0);
                return partners.every(p => p.name && p.share) && (Math.abs(totalShare - 100) < 0.1);
            case 4: return !!firmType;
            case 5: return !!firmDetails.name && !!firmDetails.address; // Basic validation
            case 6: return true; // Optional or checked on submit
            default: return false;
        }
    }

    async function handleComplete() {
        setSubmitting(true);
        try {
            await updateUser({
                occupation,
                // In a real app, we would save extended profile data to a profile table/store
                // For this demo, we assume the user object is updated or side-effect calls happen here
                onboardingCompleted: true
            });
            navigate("/");
            toast({
                title: "Welcome!",
                description: "Your profile has been set up."
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save profile",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    }

    /* --- Step Components --- */

    const renderOccupation = () => (
        <div className="grid grid-cols-2 gap-3">
            {OCCUPATIONS.map(occ => (
                <div
                    key={occ}
                    className={cn(
                        "p-4 border rounded-xl cursor-pointer transition-all text-center flex items-center justify-center min-h-[100px] text-sm font-medium",
                        occupation === occ ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setOccupation(occ)}
                >
                    {occ}
                </div>
            ))}
        </div>
    );

    const renderOwnership = () => (
        <div className="space-y-4">
            {["Single Owner", "Partnership"].map(type => (
                <div
                    key={type}
                    className={cn(
                        "p-6 border rounded-xl cursor-pointer transition-all flex items-center justify-between",
                        ownershipType === type ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setOwnershipType(type as any)}
                >
                    <span className="font-medium text-lg">{type}</span>
                    {ownershipType === type && <Check className="w-5 h-5 text-primary" />}
                </div>
            ))}
        </div>
    );

    const renderPartnership = () => {
        if (ownershipType !== "Partnership") {
            // Should technically skip this step in logic, but for UI wizard we might just auto-skip or show message
            // Ideally we logic-skip. For now, let's just show a "Not Applicable" or auto-advance
            return (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">Not applicable for Single Owner.</p>
                    <Button variant="link" onClick={nextStep} className="mt-4">Skip to next</Button>
                </div>
            )
        }

        const addPartner = () => setPartners([...partners, { name: "", share: "" }]);
        const removePartner = (idx: number) => setPartners(partners.filter((_, i) => i !== idx));
        const updatePartner = (idx: number, field: 'name' | 'share', val: string) => {
            const newPartners = [...partners];
            newPartners[idx] = { ...newPartners[idx], [field]: val };
            setPartners(newPartners);
        };
        const totalShare = partners.reduce((sum, p) => sum + (parseFloat(p.share) || 0), 0);

        return (
            <div className="space-y-6">
                <div className="flex gap-4 p-1 bg-muted rounded-lg">
                    {["Fixed", "Flexible"].map(t => (
                        <div
                            key={t}
                            className={cn(
                                "flex-1 text-center py-2 text-sm font-medium rounded-md cursor-pointer transition-all",
                                shareType === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                            )}
                            onClick={() => setShareType(t as any)}
                        >
                            {t} Share
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    {partners.map((p, idx) => (
                        <div key={idx} className="flex gap-3 items-end">
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs">Partner Name</Label>
                                <Input value={p.name} onChange={e => updatePartner(idx, 'name', e.target.value)} placeholder="Name" />
                            </div>
                            <div className="w-24 space-y-1">
                                <Label className="text-xs">Share %</Label>
                                <Input
                                    type="number"
                                    value={p.share}
                                    onChange={e => updatePartner(idx, 'share', e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            {partners.length > 1 && (
                                <Button variant="ghost" size="icon" onClick={() => removePartner(idx)} className="text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addPartner} className="w-full dashed border-primary/20 text-primary">
                        <Plus className="w-4 h-4 mr-2" /> Add Partner
                    </Button>
                </div>

                <div className={cn("text-sm text-right font-medium", totalShare !== 100 ? "text-destructive" : "text-green-600")}>
                    Total Share: {totalShare}%
                </div>
            </div>
        );
    };

    const renderFirmType = () => (
        <div className="space-y-3">
            {FIRM_TYPES.map(type => (
                <div
                    key={type}
                    className={cn(
                        "p-4 border rounded-xl cursor-pointer transition-all flex items-center justify-between",
                        firmType === type ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/50"
                    )}
                    onClick={() => setFirmType(type)}
                >
                    <span className="font-medium">{type}</span>
                    {firmType === type && <Check className="w-5 h-5 text-primary" />}
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
                                        type="date"
                                        className="h-9"
                                        value={dept.expiry}
                                        onChange={e => updateDept(idx, 'expiry', e.target.value)}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                    <Button variant="outline" onClick={addDept} className="w-full">
                        <Plus className="w-4 h-4 mr-2" /> Add Department
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <MobileLayout showBottomNav={false}>
            <div className="flex flex-col h-full">
                <div className="px-5 py-6 space-y-2 flex-none">
                    <h1 className="text-2xl font-bold tracking-tight">Setup Profile</h1>
                    <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${(step / totalSteps) * 100}%` }}
                            />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground w-12 text-right">
                            {step}/{totalSteps}
                        </span>
                    </div>
                </div>

                <div className="flex-1 px-5 pb-24 overflow-y-auto">
                    <div className="space-y-1 mb-6">
                        <h2 className="text-lg font-semibold">
                            {step === 1 && "Select Occupation"}
                            {step === 2 && "Ownership Type"}
                            {step === 3 && "Partnership Details"}
                            {step === 4 && "Firm Type"}
                            {step === 5 && "Firm Details"}
                            {step === 6 && "Enlistment"}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {step === 1 && "What best describes your role?"}
                            {step === 2 && "How is your business owned?"}
                            {step === 3 && "Define shareholding patterns"}
                            {step === 4 && "Select the legal structure"}
                            {step === 5 && "Enter basic registration details"}
                            {step === 6 && "Add department Enlistments (Optional)"}
                        </p>
                    </div>

                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        {step === 1 && renderOccupation()}
                        {step === 2 && renderOwnership()}
                        {step === 3 && renderPartnership()}
                        {step === 4 && renderFirmType()}
                        {step === 5 && renderFirmDetails()}
                        {step === 6 && renderDepartments()}
                    </div>
                </div>

                <div className="flex-none p-5 bg-background border-t fixed bottom-0 left-0 right-0 md:relative z-10">
                    <div className="flex gap-3 max-w-md mx-auto">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={step === 1 || submitting}
                            className="flex-1"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>

                        {step < totalSteps ? (
                            <Button
                                className="flex-[2]"
                                onClick={nextStep}
                                disabled={!validateStep()}
                            >
                                Next <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                className="flex-[2]"
                                onClick={handleComplete}
                                disabled={submitting}
                            >
                                {submitting ? "Finishing..." : "Complete Setup"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </MobileLayout>
    );
}
