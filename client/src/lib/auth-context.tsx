import React, { createContext, useContext, useEffect, useState } from "react";
import { api, type User } from "./api-client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (phone: string, otp: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        async function initAuth() {
            try {
                const currentUser = await api.auth.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Auth initialization failed:", error);
            } finally {
                setIsLoading(false);
            }
        }
        initAuth();
    }, []);

    const login = async (phone: string, otp: string) => {
        try {
            const res = await api.auth.verifyOtp(phone, otp);
            if (res.success && res.user) {
                setUser(res.user);
                toast({
                    title: "Success",
                    description: "Logged in successfully",
                });
            } else {
                throw new Error(res.error || "Login failed");
            }
        } catch (error: any) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error.message,
            });
            throw error;
        }
    };

    const logout = async () => {
        await api.auth.logout();
        setUser(null);
        toast({
            title: "Logged out",
            description: "See you soon!",
        });
    };

    const updateUser = async (updates: Partial<User>) => {
        if (!user) return;
        try {
            const updated = await api.auth.updateUser(user.id, updates);
            setUser(updated);
        } catch (error) {
            console.error("Failed to update user", error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
