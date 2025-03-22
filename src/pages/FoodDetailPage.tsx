
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Leaf, 
  Flame, 
  Heart, 
  Utensils, 
  Droplets,
  Coffee,
  Banana,
  Fish,
  Wheat,
  Egg,
  Apple,
  Cherry,
  Salad,
  Flower,
  Sun,
  Cloud,
  Snowflake
} from "lucide-react";

// Placeholder data - will be replaced with Supabase data
const placeholderFood = {
  id: "1",
  nom: "Avocat",
  categorie: "fruits",
  image_url: "https://images.unsplash.com/photo-1551460226-a5b8c49a8709?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  proteines: 2,
  glucides: 9,
  lipides_totaux: 15,
  acides_gras_satures: 2.1,
  mono_insatures: 9.8,
  poly_insatures: 1.8,
  omega_3: 0.1,
  omega_6: 1.7,
  fibres: 7,
  vitamines: {
    "vitamine_c": 10,
    "vitamine_b6": 0.2,
    "vitamine_b9": 81,
    "vitamine_e": 2.1,
    "vitamine_k": 21
  },
  mineraux: {
    "magnesium": 29,
    "potassium": 485,
    "zinc": 0.6,
    "fer": 0.6,
    "cuivre": 0.2
  },
  polyphenols_bioactifs: ["catéchines", "flavonoïdes", "anthocyanes"],
  proprietes: ["anti-inflammatoire", "riche-omega3", "cardioprotecteur"],
  saisonnalite: "été",
  description: "L'avocat est un fruit riche en graisses monoinsaturées bénéfiques pour la santé cardiovasculaire. Sa teneur élevée en potassium, fibres et antioxydants en fait un aliment de choix pour réduire l'inflammation et soutenir la santé métabolique."
};

export default function FoodDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("apercu");
  
  // In a real implementation, this would fetch data from Supabase
  const food = placeholderFood;
  
  // Season icon mapping
  const seasonIcon = {
    "printemps": <Flower size={20} className="text-green-500" />,
    "été": <Sun size={20} className="text-yellow-500" />,
    "automne": <Cloud size={20} className="text-orange-500" />,
    "hiver": <Snowflake size={20} className="text-blue-500" />
  }[food.saisonnalite];
  
  // Map category to icon
  const categoryIcon = () => {
    switch (food.categorie) {
      case "fruits": return <Apple size={20} />;
      case "legumes": return <Salad size={20} />;
      case "poissons": return <Fish size={20} />;
      case "viandes": return <Utensils size={20} />;
      case "oleagineux": return <Cherry size={20} />;
      case "cereales": return <Wheat size={20} />;
      case "huiles": return <Droplets size={20} />;
      default: return <Banana size={20} />;
    }
  };
  
  // Map properties to display names and badge styles
  const propertyInfo = {
    "anti-inflammatoire": { name: "Anti-inflammatoire", class: "badge-fats", icon: <Flame size={16} /> },
    "riche-omega3": { name: "Riche en Ω-3", class: "badge-omega3", icon: <Heart size={16} /> },
    "antioxydant": { name: "Antioxydant", class: "badge-vitamin", icon: <Leaf size={16} /> },
    "riche-vitamine-d": { name: "Vitamine D", class: "badge-vitamin", icon: <Sun size={16} /> },
    "neuroprotecteur": { name: "Neuroprotecteur", class: "badge-protein", icon: <Leaf size={16} /> },
    "cardioprotecteur": { name: "Cardioprotecteur", class: "badge-protein", icon: <Heart size={16} /> },
    "riche-fer": { name: "Riche en fer", class: "badge-mineral", icon: <Egg size={16} /> },
  };
  
  return (
    <div className="space-y-8 py-6 animate-fade-in">
      {/* Back button */}
      <div>
        <Button variant="ghost" asChild>
          <Link to="/aliments" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} />
            Retour aux aliments
          </Link>
        </Button>
      </div>
      
      {/* Food header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image */}
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden aspect-square">
            <img 
              src={food.image_url} 
              alt={food.nom} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-light mb-4">{food.nom}</h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="outline" className="flex items-center gap-1 py-1.5">
                {categoryIcon()}
                <span className="capitalize">
                  {food.categorie === "fruits" ? "Fruit" : 
                   food.categorie === "legumes" ? "Légume" : 
                   food.categorie === "poissons" ? "Poisson" : 
                   food.categorie === "viandes" ? "Viande" : 
                   food.categorie === "oleagineux" ? "Oléagineux" : 
                   food.categorie === "cereales" ? "Céréale" : 
                   food.categorie === "huiles" ? "Huile" : food.categorie}
                </span>
              </Badge>
              
              {food.saisonnalite && (
                <Badge variant="outline" className="flex items-center gap-1 py-1.5">
                  {seasonIcon}
                  <span className="capitalize">
                    {food.saisonnalite === "printemps" ? "Printemps" :
                     food.saisonnalite === "été" ? "Été" :
                     food.saisonnalite === "automne" ? "Automne" : "Hiver"}
                  </span>
                </Badge>
              )}
            </div>
            
            <p className="text-foreground/80 mb-6">{food.description}</p>
            
            {/* Properties */}
            <div className="flex flex-wrap gap-2">
              {food.proprietes.map((property: keyof typeof propertyInfo) => (
                <Badge 
                  key={property} 
                  variant="outline" 
                  className={`py-1.5 px-3 ${propertyInfo[property]?.class || ""}`}
                >
                  {propertyInfo[property]?.icon}
                  <span className="ml-1">{propertyInfo[property]?.name || property}</span>
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Macros Summary */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Macronutriments</CardTitle>
              <CardDescription>
                Valeurs nutritionnelles pour 100g
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <NutrientBadge 
                  label="Protéines" 
                  value={`${food.proteines}g`} 
                  colorClass="bg-nutrition-protein"
                />
                <NutrientBadge 
                  label="Glucides" 
                  value={`${food.glucides}g`} 
                  colorClass="bg-nutrition-carbs"
                />
                <NutrientBadge 
                  label="Lipides" 
                  value={`${food.lipides_totaux}g`} 
                  colorClass="bg-nutrition-fats"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Separator />
      
      {/* Detailed information */}
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-transparent">
            <TabsTrigger 
              value="apercu" 
              className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              Aperçu
            </TabsTrigger>
            <TabsTrigger 
              value="lipides" 
              className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              Lipides
            </TabsTrigger>
            <TabsTrigger 
              value="micronutriments" 
              className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              Micronutriments
            </TabsTrigger>
          </TabsList>
          
          {/* Overview tab */}
          <TabsContent value="apercu" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Macros */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Répartition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Protéines</span>
                        <span className="font-medium">{food.proteines}g</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-nutrition-protein" 
                          style={{ 
                            width: `${(food.proteines / (food.proteines + food.glucides + food.lipides_totaux)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Glucides</span>
                        <span className="font-medium">{food.glucides}g</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-nutrition-carbs" 
                          style={{ 
                            width: `${(food.glucides / (food.proteines + food.glucides + food.lipides_totaux)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Lipides</span>
                        <span className="font-medium">{food.lipides_totaux}g</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-nutrition-fats" 
                          style={{ 
                            width: `${(food.lipides_totaux / (food.proteines + food.glucides + food.lipides_totaux)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fibres</span>
                        <span className="font-medium">{food.fibres}g</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-nutrition-fiber" 
                          style={{ 
                            width: `${(food.fibres / (food.proteines + food.glucides + food.lipides_totaux)) * 50}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Bioactive compounds */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Composés bioactifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {food.polyphenols_bioactifs.map((compound: string) => (
                        <Badge 
                          key={compound} 
                          variant="outline" 
                          className="py-1 px-2 badge-vitamin"
                        >
                          <Coffee size={14} className="mr-1" />
                          <span className="capitalize">{compound}</span>
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Les composés bioactifs sont des molécules présentes naturellement dans les aliments et 
                      qui peuvent avoir des effets bénéfiques sur la santé.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Lipids tab */}
          <TabsContent value="lipides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Acides gras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Saturés</span>
                          <span className="font-medium">{food.acides_gras_satures}g</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-red-400" 
                            style={{ 
                              width: `${(food.acides_gras_satures / food.lipides_totaux) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Mono-insaturés</span>
                          <span className="font-medium">{food.mono_insatures}g</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400" 
                            style={{ 
                              width: `${(food.mono_insatures / food.lipides_totaux) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Poly-insaturés</span>
                        <span className="font-medium">{food.poly_insatures}g</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-green-400" 
                          style={{ 
                            width: `${(food.poly_insatures / food.lipides_totaux) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Ratio Oméga 6:3</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Oméga-3</span>
                          <span className="font-medium">{food.omega_3}g</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-nutrition-omega3" 
                            style={{ 
                              width: `${(food.omega_3 / (food.omega_3 + food.omega_6)) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Oméga-6</span>
                          <span className="font-medium">{food.omega_6}g</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-nutrition-fats" 
                            style={{ 
                              width: `${(food.omega_6 / (food.omega_3 + food.omega_6)) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-sm">
                        <span className="font-medium">Ratio Ω-6:Ω-3: </span>
                        <span className={food.omega_6 / food.omega_3 <= 4 ? "text-green-600" : "text-orange-600"}>
                          {(food.omega_6 / food.omega_3).toFixed(1)}:1
                        </span>
                      </p>
                      <p className="text-xs mt-1 text-muted-foreground">
                        Un ratio idéal est inférieur à 4:1. Les sociétés modernes ont souvent un ratio de 15:1 ou plus.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Micronutrients tab */}
          <TabsContent value="micronutriments" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Vitamines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(food.vitamines).map(([key, value]) => {
                      const formattedKey = key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm">{formattedKey}</span>
                          <Badge variant="outline" className="badge-vitamin">
                            {typeof value === 'number' ? value : 0} 
                            {key.includes('vitamine_d') ? 'µg' : 'mg'}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Minéraux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(food.mineraux).map(([key, value]) => {
                      const formattedKey = key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm">{formattedKey}</span>
                          <Badge variant="outline" className="badge-mineral">
                            {typeof value === 'number' ? value : 0} mg
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface NutrientBadgeProps {
  label: string;
  value: string;
  colorClass: string;
}

function NutrientBadge({ label, value, colorClass }: NutrientBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
      <span className="text-sm font-medium">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
