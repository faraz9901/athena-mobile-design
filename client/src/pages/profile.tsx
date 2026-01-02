import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Building2,
  CreditCard,
  Settings,
  LogOut,
  Crown,
  CheckCircle2,
  X,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  company: "ABC Construction Pvt Ltd",
  avatar: "JD",
  plan: {
    name: "Professional",
    tier: "pro",
    projects: 15,
    maxProjects: 50,
    storage: 45,
    maxStorage: 100,
    expiresAt: "2025-12-31"
  }
};

const planFeatures = {
  pro: [
    "Up to 50 projects",
    "100 GB storage",
    "Unlimited team members",
    "Advanced reporting",
    "Priority support",
    "OCR document scanning"
  ],
  basic: [
    "Up to 10 projects",
    "20 GB storage",
    "5 team members",
    "Basic reporting",
    "Email support"
  ]
};

export default function Profile() {
  return (
    <MobileLayout title="Profile">

      {/* <Link href="/">
        <Button variant="outline" size="icon" className="text-primary hover:bg-primary/80 hover:text-primary-foreground">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </Link> */}

      <div className="px-5 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                <AvatarImage src={`https://github.com/${mockUser.avatar.toLowerCase()}.png`} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {mockUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                  <Badge className="bg-primary text-primary-foreground">
                    <Crown className="h-3 w-3 mr-1" />
                    {mockUser.plan.name}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{mockUser.company}</p>
                <p className="text-xs text-muted-foreground mt-1">{mockUser.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Details */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Plan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <Badge variant="default" className="font-semibold">
                  {mockUser.plan.name}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Valid Until</span>
                <span className="text-sm font-medium">
                  {new Date(mockUser.plan.expiresAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Projects</span>
                  <span className="text-sm font-medium">
                    {mockUser.plan.projects} / {mockUser.plan.maxProjects}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(mockUser.plan.projects / mockUser.plan.maxProjects) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Storage</span>
                  <span className="text-sm font-medium">
                    {mockUser.plan.storage} GB / {mockUser.plan.maxStorage} GB
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(mockUser.plan.storage / mockUser.plan.maxStorage) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-semibold mb-2">Plan Features</p>
              {planFeatures.pro.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full rounded-xl" variant="outline">
              <ArrowRight className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{mockUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{mockUser.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="text-sm font-medium">{mockUser.company}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-xl">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start rounded-xl">
              <Settings className="mr-2 h-4 w-4" />
              App Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start rounded-xl">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing & Payments
            </Button>
            <Button variant="ghost" className="w-full justify-start rounded-xl">
              <User className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="destructive"
          className="w-full rounded-xl"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>

        <div className="h-8"></div>
      </div>
    </MobileLayout>
  );
}

