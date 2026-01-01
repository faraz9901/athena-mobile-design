import React, { useEffect, useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";

export default function Login() {
    const [, navigate] = useLocation();
    const { login, user } = useAuth();
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            if (!user.onboardingCompleted) {
                navigate("/register");
            } else {
                navigate("/");
            }
        }

    }, [user, navigate])

    async function handleRequestOtp(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!phone || phone.replace(/\D/g, "").length < 10) {
            setError("Please enter a valid phone number.");
            return;
        } try {
            await api.auth.sendOtp(phone);
            // Mock OTP generation for display/demo purposes (in real app, this is server-side)
            const mock = "123456";
            setGeneratedOtp(mock);
            setStep("otp");
        } catch (err: any) {
            setError(err.message || "Failed to send OTP");
        }
    }

    async function handleVerifyOtp(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await login(phone, otpInput);
            // Navigation handled by useEffect
        } catch (err: any) {
            console.log(error)
            setError(err.message || "Invalid OTP");
        } finally {
            setSubmitting(false);
            navigate("/", { replace: true });
        }
    }


    return (
        <MobileLayout>
            <div className="px-5 py-10 space-y-6">
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Welcome to Athena</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {step === "phone" && (
                            <form className="space-y-4" onSubmit={handleRequestOtp}>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Mobile number</label>
                                    <Input
                                        type="tel"
                                        placeholder="Enter your mobile number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        We will send an OTP to this number for verification.
                                    </p>
                                </div>
                                {error && <p className="text-xs text-destructive">{error}</p>}
                                <Button type="submit" className="w-full rounded-xl">
                                    Get OTP
                                </Button>
                            </form>
                        )}
                        {step === "otp" && (
                            <form className="space-y-4" onSubmit={handleVerifyOtp}>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Verifying</p>
                                            <p className="text-sm font-medium">{phone}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs"
                                            onClick={() => {
                                                setStep("phone");
                                                setOtpInput("");
                                                setGeneratedOtp("");
                                                setError(null);
                                            }}
                                        >
                                            Change
                                        </Button>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">Mock OTP (for demo only)</p>
                                        <Badge variant="secondary" className="text-base tracking-[0.3em] px-3 py-1">
                                            {generatedOtp || "------"}
                                        </Badge>
                                        <p className="text-[10px] text-muted-foreground">
                                            Use 123456 as the OTP.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Enter OTP</label>
                                    <Input
                                        inputMode="numeric"
                                        maxLength={6}
                                        placeholder="6-digit code"
                                        value={otpInput}
                                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                                {error && <p className="text-xs text-destructive">{error}</p>}
                                <Button
                                    type="submit"
                                    className="w-full rounded-xl"
                                    disabled={otpInput.length !== 6 || submitting}
                                >
                                    {submitting ? "Verifying..." : "Continue"}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );

}