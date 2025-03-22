
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Apple, 
  User, 
  Home, 
  Menu, 
  X,
  Filter,
  Settings,
} from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function NavSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };
  
  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}
      
      {/* Mobile menu button */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-white/90 backdrop-blur-md border-r border-border/50 transition-all-300 shadow-md",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
          "w-64 lg:w-72"
        )}
      >
        <div className="h-full flex flex-col p-4">
          {/* Logo */}
          <div className="flex items-center gap-2 py-6">
            <Apple className="h-8 w-8 text-primary" />
            <h1 className="font-semibold text-xl">Nutri Pokédex</h1>
          </div>
          
          <Separator className="my-2" />
          
          {/* Navigation */}
          <nav className="flex-1 pt-4">
            <ul className="space-y-1">
              <NavItem icon={<Home size={18} />} to="/" onClick={closeSidebar}>
                Accueil
              </NavItem>
              <NavItem icon={<Apple size={18} />} to="/aliments" onClick={closeSidebar}>
                Aliments
              </NavItem>
              <NavItem icon={<Filter size={18} />} to="/recherche" onClick={closeSidebar}>
                Recherche
              </NavItem>
              <NavItem icon={<User size={18} />} to="/profils" onClick={closeSidebar}>
                Profils
              </NavItem>
            </ul>
          </nav>
          
          <Separator className="my-2" />
          
          {/* Settings */}
          <div className="py-2">
            <NavItem icon={<Settings size={18} />} to="/parametres" onClick={closeSidebar}>
              Paramètres
            </NavItem>
          </div>
        </div>
      </aside>
      
      {/* Page margin to accommodate sidebar */}
      <div className={cn(
        "transition-all-300",
        !isMobile ? "ml-64 lg:ml-72" : "ml-0"
      )}>
        {/* Button margin for mobile */}
        {isMobile && <div className="h-16" />}
      </div>
    </>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavItem({ icon, to, children, onClick }: NavItemProps) {
  return (
    <li>
      <NavLink 
        to={to} 
        className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all-200",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
        onClick={onClick}
      >
        {icon}
        <span>{children}</span>
      </NavLink>
    </li>
  );
}
