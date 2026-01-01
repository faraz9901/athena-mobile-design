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

                // 1. Not Logged In
                if (!user) {
                    return <Redirect to="/login" />;
                }

                // 2. Special Case: Register/Onboarding Page
                // Allow access if logged in but not onboarded
                if (path === '/register') {
                    if (user.onboardingCompleted) {
                        return <Redirect to="/" />;
                    }
                    return <Component {...params} />;
                }

                // 3. New User Email Verification Check
                // If they are a new user and haven't verified email, block everything else and send to login handling
                if (user.isNewUser && !user.emailVerified) {
                    return <Redirect to="/login" />;
                }

                // 4. Onboarding Check
                // If they verified email (or aren't new) but haven't finished onboarding, block everything else
                if (!user.onboardingCompleted) {
                    return <Redirect to="/register" />;
                }

                // 5. Allowed
                return <Component {...params} />;
            }}
        </Route>
    );
}