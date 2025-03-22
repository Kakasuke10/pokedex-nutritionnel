
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Leaf, 
  Heart, 
  Flame,
  Sun,
  Cloud,
  Snowflake,
  Flower
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Types pour nos données
interface FoodCategory {
  id: string;
  name: string;
}

interface FoodProperty {
  id: string;
  name: string;
}

interface Food {
  id: string;
  nom: string;
  categorie: string;
  image_url: string | null;
  saisonnalite: string | null;
  proprietes: string[];
}

// Filtres pour les propriétés
const filters = [
  { id: "tous", name: "Tous", icon: <Filter size={16} /> },
  { id: "anti-inflammatoire", name: "Anti-inflammatoire", icon: <Flame size={16} /> },
  { id: "riche-omega3", name: "Riche en Oméga-3", icon: <Heart size={16} /> },
  { id: "antioxydant", name: "Antioxydant", icon: <Leaf size={16} /> },
];

export default function FoodsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("tous");
  const [selectedCategory, setSelectedCategory] = useState("tous");
  
  // Récupérer les catégories d'aliments
  const { data: foodCategories = [] } = useQuery({
    queryKey: ['foodCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_categories')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching food categories:', error);
        return [];
      }
      return data as FoodCategory[];
    }
  });
  
  // Récupérer les aliments avec leurs propriétés
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      // Récupérer tous les aliments
      const { data: foodsData, error: foodsError } = await supabase
        .from('foods')
        .select('*');
      
      if (foodsError) {
        console.error('Error fetching foods:', foodsError);
        return [];
      }
      
      // Pour chaque aliment, récupérer ses propriétés
      const foodsWithProperties = await Promise.all(
        foodsData.map(async (food) => {
          const { data: propertiesData, error: propertiesError } = await supabase
            .from('food_property_relations')
            .select('property_id')
            .eq('food_id', food.id);
          
          if (propertiesError) {
            console.error('Error fetching food properties:', propertiesError);
            return { ...food, proprietes: [] };
          }
          
          return {
            ...food,
            proprietes: propertiesData.map(p => p.property_id)
          };
        })
      );
      
      return foodsWithProperties as Food[];
    }
  });
  
  // Filter foods based on search, filter, and category
  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "tous" || food.proprietes.includes(selectedFilter);
    const matchesCategory = selectedCategory === "tous" || food.categorie === selectedCategory;
    
    return matchesSearch && matchesFilter && matchesCategory;
  });
  
  return (
    <div className="space-y-8 py-6 animate-fade-in">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-light">Aliments</h1>
        <p className="text-muted-foreground">
          Découvrez les propriétés nutritionnelles des aliments pour une alimentation optimale.
        </p>
      </section>
      
      {/* Search and filters */}
      <section className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Rechercher un aliment..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {filters.map(filter => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap flex gap-1.5"
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.icon}
              {filter.name}
            </Button>
          ))}
        </div>
      </section>
      
      {/* Categories tabs */}
      <Tabs defaultValue="tous" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full h-auto flex flex-wrap justify-start mb-6 bg-transparent">
          <TabsTrigger value="tous" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            Toutes catégories
          </TabsTrigger>
          {foodCategories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="tous" className="mt-0">
          <FoodGrid foods={filteredFoods} isLoading={isLoading} />
        </TabsContent>
        
        {foodCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <FoodGrid foods={filteredFoods} isLoading={isLoading} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function FoodGrid({ foods, isLoading }: { foods: Food[], isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Chargement des aliments...</p>
      </div>
    );
  }
  
  if (foods.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun aliment trouvé</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {foods.map(food => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}

function FoodCard({ food }: { food: Food }) {
  // Map season to icon
  const seasonIcon = {
    "printemps": <Flower size={16} className="text-green-500" />,
    "été": <Sun size={16} className="text-yellow-500" />,
    "automne": <Cloud size={16} className="text-orange-500" />,
    "hiver": <Snowflake size={16} className="text-blue-500" />
  }[food.saisonnalite || ""];
  
  // Map properties to badge styles
  const getBadgeClass = (property: string) => {
    switch (property) {
      case "anti-inflammatoire": return "badge-fats";
      case "riche-omega3": return "badge-omega3";
      case "antioxydant": return "badge-vitamin";
      case "riche-vitamine-d": return "badge-vitamin";
      case "neuroprotecteur": return "badge-protein";
      case "cardioprotecteur": return "badge-protein";
      case "riche-fer": return "badge-mineral";
      default: return "badge-mineral";
    }
  };
  
  // Map properties to display names
  const getPropertyName = (property: string) => {
    switch (property) {
      case "anti-inflammatoire": return "Anti-inflammatoire";
      case "riche-omega3": return "Riche en Ω-3";
      case "antioxydant": return "Antioxydant";
      case "riche-vitamine-d": return "Vitamine D";
      case "neuroprotecteur": return "Neuroprotecteur";
      case "cardioprotecteur": return "Cardioprotecteur";
      case "riche-fer": return "Riche en fer";
      default: return property;
    }
  };
  
  // Récupérer le nom de la catégorie
  const getCategoryName = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      'fruits': 'Fruits',
      'legumes': 'Légumes',
      'poissons': 'Poissons',
      'viandes': 'Viandes',
      'oleagineux': 'Oléagineux',
      'cereales': 'Céréales',
      'huiles': 'Huiles'
    };
    
    return categoryMap[categoryId] || categoryId;
  };
  
  return (
    <Link to={`/aliments/${food.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 glass-card animate-scale-in">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={food.image_url || "/placeholder.svg"} 
            alt={food.nom} 
            className="w-full h-full object-cover"
          />
          {food.saisonnalite && (
            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full">
              {seasonIcon}
            </div>
          )}
        </div>
        <CardHeader className="p-4 pb-3">
          <h3 className="font-medium text-lg">{food.nom}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Badge variant="outline" className="text-xs capitalize mb-3">
            {getCategoryName(food.categorie)}
          </Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2 flex-wrap">
          {food.proprietes.map(property => (
            <Badge 
              key={property} 
              variant="outline" 
              className={`text-xs ${getBadgeClass(property)}`}
            >
              {getPropertyName(property)}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
