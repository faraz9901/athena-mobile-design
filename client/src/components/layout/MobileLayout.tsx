import React from "react";
import { useLocation, Link } from "wouter";
import { LayoutDashboard, Briefcase, CheckSquare, Plus, File, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showProfile?: boolean;
  fabAction?: () => void;
  fabIcon?: React.ReactNode;
}

export function MobileLayout({ children, title, showProfile = false, fabAction, fabIcon }: MobileLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Home", href: "/" },
    { icon: Briefcase, label: "Projects", href: "/projects" },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
    { icon: MessageSquare, label: "Chat", href: "/chat" },
    { icon: File, label: "Scan Documents", href: "/scan" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-border/40">

      {/* Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {children}
      </main>

      {/* FAB - Conditional */}
      {/* {fabAction && (
        <div className="absolute bottom-20 right-4 z-50">
          <Button
            size="icon"
            className="h-14 w-14 rounded-2xl shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            onClick={fabAction}
          >
            {fabIcon || <Plus className="h-6 w-6" />}
          </Button>
        </div>
      )} */}

      {/* Bottom Navigation */}
      <nav className={cn(location.includes("project/") ? "hidden" : "fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-border/40 z-40 max-w-md mx-auto")}>
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className="flex flex-col items-center justify-center w-full h-full space-y-1 group">
                  <div className={cn(
                    "px-4 py-1 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
