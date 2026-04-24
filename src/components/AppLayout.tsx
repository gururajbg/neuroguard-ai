import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border bg-card/60 backdrop-blur px-4 sticky top-0 z-30">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="text-xs text-muted-foreground hidden sm:block">
              RVCE · Dept. of Computer Science · 22CSP81
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border bg-card/40 px-6 py-3 text-xs text-muted-foreground text-center">
            © MedFusion · RVCE Dept. of Computer Science · 22CSP81
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
