import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

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
    "Proprietorship", // Added as it wasn't in list but "Single Owner" was mentioned
    "Any Other"
];

export default function Register() {
    const { user, updateUser } = useAuth();
    const [, navigate] = useLocation();
    const { toast } = useToast();

    // Redirect if already onboarded
    if (user?.onboardingCompleted) {
        navigate("/");
        return null;
    }

    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [occupation, setOccupation] = useState("");
    const [firmName, setFirmName] = useState("");
    const [firmType, setFirmType] = useState("");

    async function handleComplete() {
        if (!occupation || !firmName || !firmType) {
            toast({
                title: "Missing Fields",
                description: "Please fill in all fields",
                variant: "destructive"
            });
            return;
        }

        setSubmitting(true);
        try {
            await updateUser({
                occupation,
                // firm details would be saved too in a real app
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

    return (
        <MobileLayout>
            <div className="px-5 py-6 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Setup Profile</h1>
                    <p className="text-sm text-muted-foreground">
                        Step {step} of 2
                    </p>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="pt-6 space-y-6">
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Select Occupation</Label>
                                    <Select value={occupation} onValueChange={setOccupation}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose one..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {OCCUPATIONS.map(occ => (
                                                <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={() => setStep(2)}
                                    disabled={!occupation}
                                >
                                    Next
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Firm Name</Label>
                                    <Input
                                        placeholder="Enter firm name"
                                        value={firmName}
                                        onChange={e => setFirmName(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Firm Type</Label>
                                    <Select value={firmType} onValueChange={setFirmType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose one..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FIRM_TYPES.map(type => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onClick={handleComplete}
                                        disabled={submitting}
                                    >
                                        {submitting ? "Saving..." : "Complete"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );
}
