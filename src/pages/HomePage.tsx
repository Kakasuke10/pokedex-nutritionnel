
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Apple, Search, User, ArrowRight } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8 py-6">
      <section className="text-center space-y-4 py-10 md:py-16 animate-slide-in">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
          Votre <span className="font-medium text-primary">Pokédex Nutritionnel</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez les propriétés nutritionnelles détaillées des aliments et gérez vos objectifs personnalisés pour une santé optimale.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button size="lg" onClick={() => navigate('/aliments')} className="gap-2">
            Parcourir les aliments
            <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/profils')} className="gap-2">
            Vos profils
            <User size={16} />
          </Button>
        </div>
      </section>
      
      <Separator />
      
      <section className="py-8 space-y-6">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">Fonctionnalités principales</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Apple className="h-8 w-8 text-nutrition-carbs" />}
            title="Base de données nutritionnelle"
            description="Accédez à des informations détaillées sur les protéines, lipides, vitamines et minéraux pour chaque aliment."
            delay="animation-delay-100"
          />
          
          <FeatureCard 
            icon={<Search className="h-8 w-8 text-nutrition-protein" />}
            title="Recherche avancée"
            description="Filtrez les aliments par catégorie, nutriments spécifiques ou propriétés comme 'anti-inflammatoire'."
            delay="animation-delay-200"
          />
          
          <FeatureCard 
            icon={<User className="h-8 w-8 text-nutrition-vitamin" />}
            title="Profils personnalisés"
            description="Créez des profils avec des objectifs nutritionnels personnalisés adaptés à vos besoins spécifiques."
            delay="animation-delay-300"
          />
        </div>
      </section>
      
      <Separator />
      
      <section className="py-8 space-y-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-medium">Commencez à explorer</h2>
          <p className="text-muted-foreground">
            Parcourez notre base de données d'aliments pour découvrir leurs propriétés nutritionnelles et comment ils peuvent contribuer à votre santé.
          </p>
          <Button size="lg" onClick={() => navigate('/aliments')} className="mt-4">
            Découvrir les aliments
          </Button>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <Card className={`glass-card overflow-hidden animate-scale-in ${delay || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-foreground/80">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
