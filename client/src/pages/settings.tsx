import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

export default function SettingsPage() {
    const [pushEnabled, setPushEnabled] = useState(true);

    return (
        <MobileLayout title="Settings">
            <div className="px-5 py-6 space-y-6">
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between py-2">
                            <div className="space-y-1">
                                <Label htmlFor="push-notifications">Enable push notifications</Label>
                                <p className="text-xs text-muted-foreground">
                                    Receive important alerts about your projects and account.
                                </p>
                            </div>
                            <Switch
                                id="push-notifications"
                                checked={pushEnabled}
                                onCheckedChange={setPushEnabled}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );
}
