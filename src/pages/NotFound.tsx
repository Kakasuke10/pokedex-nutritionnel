
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Page non trouvée:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-4 animate-slide-in">
        <h1 className="text-6xl font-light text-primary">404</h1>
        <h2 className="text-2xl font-medium">Page non trouvée</h2>
        <p className="text-muted-foreground">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Button asChild className="mt-8">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
