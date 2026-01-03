import React from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Receipt,
  Download,
  Camera,
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const expenses = [
  {
    id: 1,
    title: "Cement Bags (50kg)",
    vendor: "UltraTech Supplies",
    amount: "Rs 450.00",
    date: "Today, 10:30 AM",
    category: "Materials",
    project: "City Center Mall",
    status: "Approved",
    receipt: true
  },
  {
    id: 2,
    title: "Worker Lunch",
    vendor: "Local Canteen",
    amount: "Rs 85.50",
    date: "Yesterday",
    category: "Food",
    project: "Highway 45",
    status: "Pending",
    receipt: true
  },
  {
    id: 3,
    title: "Fuel for Excavator",
    vendor: "Shell Station",
    amount: "Rs 120.00",
    date: "23 Jan 2025",
    category: "Fuel",
    project: "Green Valley",
    status: "Approved",
    receipt: false
  },
  {
    id: 4,
    title: "Safety Helmets",
    vendor: "Safety First Gear",
    amount: "Rs 320.00",
    date: "20 Jan 2025",
    category: "Safety",
    project: "City Center Mall",
    status: "Rejected",
    receipt: true
  }
];

export default function Expenses() {
  return (
    <MobileLayout title="Expenses" fabAction={() => { }} fabIcon={<Plus className="h-6 w-6" />}>
      <div className="sticky top-0 bg-background z-20 pt-6 pb-2 px-5 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 rounded-full">
              <Download className="mr-2 h-3.5 w-3.5" /> Export
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              className="pl-9 bg-secondary/30 border-none rounded-xl h-11"
            />
          </div>
          <Button variant="secondary" size="icon" className="h-11 w-11 rounded-xl shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground px-1">
          <span>Total this month</span>
          <span className="font-bold text-foreground text-lg">Rs 3,420.50</span>
        </div>
      </div>

      <div className="px-5 mt-2 space-y-3 pb-24">
        {expenses.map((expense) => (
          <Card key={expense.id} className="border-none shadow-sm ring-1 ring-black/5 overflow-hidden">
            <div className={`h-1 w-full Rs {
              expense.status === 'Approved' ? 'bg-emerald-500' : 
              expense.status === 'Pending' ? 'bg-orange-400' : 'bg-red-500'
            }`} />
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                <Receipt className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-base truncate">{expense.title}</h3>
                  <span className="font-bold text-base">{expense.amount}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{expense.vendor}</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">
                    {expense.category}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{expense.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MobileLayout>
  );
}
