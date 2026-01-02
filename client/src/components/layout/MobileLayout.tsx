import React, { useState } from "react";
import { useLocation, Link } from "wouter";
import { LayoutDashboard, Briefcase, CheckSquare, Plus, File, MessageSquare, Menu, Users as UsersIcon, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showProfile?: boolean;
  fabAction?: () => void;
  fabIcon?: React.ReactNode;
  sidebarOpen?: boolean; // optional external control
  sidebarContent?: React.ReactNode; // optional override
  onCloseSidebar?: () => void; // optional external handler
  showBottomNav?: boolean;
  showSidebarToggle?: boolean; // kept for backward compat, defaults to true
  onOpenSidebar?: () => void; // optional external handler
}

export function MobileLayout({ children, sidebarOpen, sidebarContent, onCloseSidebar, showBottomNav = true, showSidebarToggle = true, onOpenSidebar }: MobileLayoutProps) {
  const [location] = useLocation();
  const { logout } = useAuth();
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(false);

  const isSidebarOpen = sidebarOpen ?? internalSidebarOpen;
  const handleOpenSidebar = () => {
    if (onOpenSidebar) onOpenSidebar();
    else setInternalSidebarOpen(true);
  };
  const handleCloseSidebar = () => {
    if (onCloseSidebar) onCloseSidebar();
    else setInternalSidebarOpen(false);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Home", href: "/" },
    { icon: Briefcase, label: "Projects", href: "/projects" },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
    { icon: MessageSquare, label: "Chat", href: "/chat" },
    { icon: File, label: "Documents", href: "/documents" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-border/40">

      {showSidebarToggle && (
        <div className=" z-40">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="bg-background/80 shadow-sm border rounded-t-none rounded-l border-border/40"
            onClick={handleOpenSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {children}
      </main>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex max-w-md mx-auto">
          <div className="w-64 max-w-[75%] bg-background border-l border-border/60 shadow-xl p-4 space-y-4">
            {sidebarContent ?? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Welcome back,</p>
                    <h1 className="text-lg font-bold text-foreground leading-tight">John Doe</h1>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { icon: UsersIcon, label: "Partners", href: "/vendors-partners" },
                    { icon: User, label: "Profile", href: "/profile" },
                    { icon: Settings, label: "Settings", href: "/profile" },
                    { icon: LogOut, label: "Logout", onClick: () => { logout(); window.location.href = "/login"; } },
                  ].map((action, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        handleCloseSidebar();
                        if (action.href) {
                          window.location.href = action.href;
                        } else if (action.onClick) {
                          action.onClick();
                        }
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/40 text-sm"
                    >
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                        <action.icon className="h-4 w-4" />
                      </div>
                      <span className="flex-1 text-left font-medium text-foreground">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="flex-1 bg-black/30"
            onClick={handleCloseSidebar}
          />
        </div>
      )}

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
      {showBottomNav && (
        <nav className={cn("fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-border/40 z-40 max-w-md mx-auto")}>
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
      )}
    </div>
  );
}
