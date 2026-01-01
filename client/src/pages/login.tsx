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
    const { login, user, verifyEmail, googleLogin } = useAuth();
    const [step, setStep] = useState<"phone" | "otp" | "email" | "email-otp">("phone");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [emailOtpInput, setEmailOtpInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // If we land here and user is already logged in
    useEffect(() => {
        if (user) {
            if (user.onboardingCompleted) {
                navigate("/");
            } else if (user.isNewUser && !user.emailVerified) {
                // Remain on Login page, force Email step
                setStep("email");
            } else {
                // Logged in, email verified (or old user), but not onboarded
                navigate("/register");
            }
        }
    }, [user, navigate]);


    async function handleRequestOtp(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!phone || phone.replace(/\D/g, "").length < 10) {
            setError("Please enter a valid phone number.");
            return;
        } try {
            await api.auth.sendOtp(phone);
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
            const loggedInUser = await login(phone, otpInput);

            if (loggedInUser?.isNewUser && !loggedInUser.emailVerified) {
                setStep("email");
            } else {
                // Navigation handled by useEffect
            }
        } catch (err: any) {
            console.log(error)
            setError(err.message || "Invalid OTP");
            setSubmitting(false);
            return;
        }
        setSubmitting(false);
    }

    async function handleEmailRequest(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setError("Invalid email");
            return;
        }
        // Mock sending Email OTP
        setStep("email-otp");
        setGeneratedOtp("123456");
        setError(null);
    }

    async function handleVerifyEmailOtp(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const success = await verifyEmail(email, emailOtpInput);
            if (success) {
                navigate("/register");
            } else {
                setError("Invalid Email OTP");
            }
        } catch (e) {
            setError("Verification failed");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleGoogleAuth() {
        setSubmitting(true);
        try {
            const success = await googleLogin(email || "user@gmail.com");
            if (success) {
                navigate("/register");
            } else {
                setError("Google Auth failed");
            }
        } catch (e) {
            setError("Auth failed");
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <MobileLayout showBottomNav={false}>
            <div className="px-5 py-10 space-y-6 h-[calc(100vh-10rem)] flex flex-col justify-center">
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
                        {step === "email" && (
                            <form className="space-y-4" onSubmit={handleEmailRequest}>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Required for new accounts.
                                    </p>
                                </div>
                                {error && <p className="text-xs text-destructive">{error}</p>}
                                <Button type="submit" className="w-full rounded-xl">
                                    Verify Email
                                </Button>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full rounded-xl"
                                    onClick={handleGoogleAuth}
                                >
                                    Verify with Google
                                </Button>
                            </form>
                        )}
                        {step === "email-otp" && (
                            <form className="space-y-4" onSubmit={handleVerifyEmailOtp}>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Verify Email</p>
                                    <p className="text-xs text-muted-foreground">Sent to {email}</p>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">Mock OTP</p>
                                        <Badge variant="secondary" className="text-base tracking-[0.3em] px-3 py-1">
                                            123456
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Input
                                        inputMode="numeric"
                                        maxLength={6}
                                        placeholder="6-digit code"
                                        value={emailOtpInput}
                                        onChange={(e) => setEmailOtpInput(e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>
                                {error && <p className="text-xs text-destructive">{error}</p>}
                                <Button type="submit" className="w-full rounded-xl" disabled={submitting}>
                                    {submitting ? "Verifying..." : "Complete Verification"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setStep("email")}
                                >
                                    Back to Email
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );

}