import { useAuth } from "./auth-context";
import { Route, Redirect } from "wouter";
import { Loader2 } from "lucide-react";
export function ProtectedRoute({ component: Component, path }: { component: React.ComponentType, path?: string }) {
    const { user, isLoading } = useAuth();
    return (
        <Route path={path}>
            {(params) => {
                if (isLoading) {
                    return (
                        <div className="flex items-center justify-center min-h-screen bg-background">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    );
                }
                if (!user) {
                    return <Redirect to="/login" />;
                }
                // Optional: Check onboarding status here if needed
                // if (!user.onboardingCompleted && path !== '/onboarding') {
                //    return <Redirect to="/onboarding" />;
                // }
                return <Component {...params} />;
            }}
        </Route>
    );
}