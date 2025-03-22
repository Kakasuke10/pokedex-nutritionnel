
import { NavSidebar } from "@/components/layout/NavSidebar";
import { Toaster } from "sonner";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <NavSidebar />
      <main className="min-h-screen pt-4 pb-16 transition-all duration-300 animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {children}
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
