import React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, Mail, MoreVertical, Phone, Trash2, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import { useLocation } from "wouter";


// Local mock partners for this project detail page
const projectPartners = [
    {
        id: 1,
        name: "ABC Construction Co.",
        email: "info@abcconstruction.com",
        phone: "+91 98765 43211",
        role: "Civil Works Partner",
        share: 40,
    },
    {
        id: 2,
        name: "Skyline Infra JV",
        email: "team@skylineinfra.com",
        phone: "+91 98765 43001",
        role: "JV Partner",
        share: 55,
    },
    {
        id: 3,
        name: "Greenfield Associates",
        email: "hello@greenfield.com",
        phone: "+91 98765 43999",
        role: "Landscape & External",
        share: 30,
    },
];

function Others() {
    const [_, navigate] = useLocation()
    return (
        <Accordion
            type="multiple"
            defaultValue={["partners"]}
            className="w-full"
        >
            {/* Partner Management */}
            <AccordionItem value="partners">
                <AccordionTrigger className="px-4 py-3 text-sm font-semibold">
                    Partner Management
                </AccordionTrigger>

                <AccordionContent className="pb-4">
                    <div className="space-y-3">
                        {projectPartners.map((partner) => (
                            <div
                                key={partner.id}
                                className="flex items-start justify-between gap-3 rounded-xl border border-border/60 px-3 py-3"
                            >
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <Avatar className="h-8 w-8 border border-primary/20">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                            {partner.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-sm truncate">
                                                {partner.name}
                                            </p>
                                            <Badge className="text-[10px] px-2 py-0.5 flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                Partner
                                            </Badge>
                                        </div>

                                        <p className="text-[11px] text-muted-foreground mb-2 truncate">
                                            {partner.role}
                                        </p>

                                        <div className="space-y-1 text-[11px] text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3" />
                                                <span className="truncate">
                                                    {partner.email}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3" />
                                                <span>{partner.phone}</span>
                                            </div>
                                        </div>

                                        <div className="mt-2 flex items-center gap-2">
                                            <Badge className="text-[10px] px-2 py-0.5 rounded-full">
                                                {partner.share}% project share
                                            </Badge>
                                            <span className="text-[10px] text-muted-foreground">
                                                Scope: {partner.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 shrink-0"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() =>
                                                navigate(`/partner/${partner.id}`)
                                            }
                                        >
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
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* Future sections */}
            {/* <AccordionItem value="documents">
                <AccordionTrigger className="px-4 py-3 text-sm font-semibold">
                    Documents (Coming Soon)
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                    You can add document management here later.
                </AccordionContent>
            </AccordionItem> */}

            {/* <AccordionItem value="financials">
                <AccordionTrigger className="px-4 py-3 text-sm font-semibold">
                    Financial Details (Coming Soon)
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                    Revenue split, payments, invoices, etc.
                </AccordionContent>
            </AccordionItem> */}
        </Accordion>
    )
}

export default Others
