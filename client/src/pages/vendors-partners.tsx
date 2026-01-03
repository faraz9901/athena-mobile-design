import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  UserPlus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockProjects = [
  { id: 1, name: "City Center Mall" },
  { id: 2, name: "Highway 45" },
  { id: 3, name: "Green Valley" },
];

const mockPartners = [
  {
    id: 1,
    name: "ABC Construction Co.",
    email: "info@abcconstruction.com",
    phone: "+91 98765 43211",
    role: "Civil Works Partner",
    share: 40,
    projects: [1, 3],
  },
  {
    id: 2,
    name: "Skyline Infra JV",
    email: "team@skylineinfra.com",
    phone: "+91 98765 43001",
    role: "JV Partner",
    share: 55,
    projects: [1],
  },
  {
    id: 3,
    name: "Greenfield Associates",
    email: "hello@greenfield.com",
    phone: "+91 98765 43999",
    role: "Landscape & External",
    share: 30,
    projects: [3],
  },
];

export default function VendorsPartners() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<number>(mockProjects[0]?.id ?? 1);
  const [, navigate] = useLocation();

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesProject = partner.projects.includes(selectedProjectId);
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  return (
    <MobileLayout
      title="Partners"
      fabAction={() => navigate("/add-partner")}
      fabIcon={<UserPlus className="h-6 w-6" />}
    >
      <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Partners</h1>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <Users className="h-3 w-3" />
              Manage JV & delivery partners per project
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-[11px] text-muted-foreground mb-1 block">Project</Label>
            <div className="flex items-center gap-2">
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                className="flex-1 h-10 rounded-xl border bg-secondary/30 px-3 text-xs"
              >
                {mockProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search partners in this project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary/30 border-none rounded-xl h-11"
            />
          </div>
        </div>
      </div>

      <div className="px-5 py-2 space-y-4">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="border-none shadow-sm ring-1 ring-black/5">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {partner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base">{partner.name}</h3>
                      <Badge
                        variant="default"
                        className="text-xs"
                      >
                        Partner
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{partner.role}</p>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{partner.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{partner.phone}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">Share in this project</p>
                      <div className="flex items-center gap-2">
                        <Badge className="text-xs px-3 py-1 rounded-full">
                          {partner.share}% project share
                        </Badge>
                        <span className="text-[11px] text-muted-foreground">Scope: {partner.role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/partner/${partner.id}`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPartners.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center space-y-3">
              <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-1" />
              <p className="text-sm text-muted-foreground">
                No partners configured for this project yet
              </p>
              <Button
                size="sm"
                className="mt-1"
                onClick={() => navigate("/add-partner")}
              >
                Add partner
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="h-8"></div>
      </div>
    </MobileLayout>
  );
}

