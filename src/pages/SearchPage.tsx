import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search as SearchIcon, 
  Filter, 
  Leaf, 
  Heart, 
  Flame,
  Apple,
  Fish,
  Wheat,
  Egg,
  Salad,
  Banana,
  Cherry,
  Droplets,
  Sun
} from "lucide-react";

// Placeholder data - will be replaced with Supabase data
const placeholderFoods = [
  {
    id: "1",
    nom: "Avocat",
    categorie: "fruits",
    image_url: "https://images.unsplash.com/photo-1551460226-a5b8c49a8709?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    proprietes: ["anti-inflammatoire", "riche-omega3"],
    proteines: 2,
    glucides: 9,
    lipides_totaux: 15,
    omega_3: 0.1,
    vitamine_c: 10,
    magnesium: 29,
  },
  {
    id: "2",
    nom: "Saumon",
    categorie: "poissons",
    image_url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    proprietes: ["riche-omega3", "riche-vitamine-d"],
    proteines: 20,
    glucides: 0,
    lipides_totaux: 13,
    omega_3: 2.3,
    vitamine_c: 0,
    magnesium: 29,
  },
  {
    id: "3",
    nom: "Noix",
    categorie: "oleagineux",
    image_url: "https://images.unsplash.com/photo-1611070950847-18a1aace3a7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    proprietes: ["anti-inflammatoire", "antioxydant"],
    proteines: 15,
    glucides: 14,
    lipides_totaux: 65,
    omega_3: 9,
    vitamine_c: 1.3,
    magnesium: 158,
  },
  {
    id: "4",
    nom: "Épinards",
    categorie: "legumes",
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    proprietes: ["riche-fer", "antioxydant"],
    proteines: 2.9,
    glucides: 3.6,
    lipides_totaux: 0.4,
    omega_3: 0.1,
    vitamine_c: 28,
    magnesium: 79,
  }
];

// Nutrient filters
const nutrientFilters = [
  { 
    id: "proteines", 
    name: "Protéines", 
    icon: <Egg size={16} />,
    threshold: 15,
    unit: "g"
  },
  { 
    id: "omega_3", 
    name: "Oméga-3", 
    icon: <Heart size={16} />,
    threshold: 1.0,
    unit: "g"
  },
  { 
    id: "vitamine_c", 
    name: "Vitamine C", 
    icon: <Leaf size={16} />,
    threshold: 20,
    unit: "mg"
  },
  { 
    id: "magnesium", 
    name: "Magnésium", 
    icon: <Flame size={16} />,
    threshold: 50,
    unit: "mg"
  }
];

// Property filters
const propertyFilters = [
  { id: "anti-inflammatoire", name: "Anti-inflammatoire", icon: <Flame size={16} /> },
  { id: "riche-omega3", name: "Riche en Oméga-3", icon: <Heart size={16} /> },
  { id: "antioxydant", name: "Antioxydant", icon: <Leaf size={16} /> },
  { id: "riche-vitamine-d", name: "Vitamine D", icon: <Sun size={16} /> },
  { id: "riche-fer", name: "Riche en fer", icon: <Droplets size={16} /> },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("proprietes");
  const [selectedFilter, setSelectedFilter] = useState("");
  const navigate = useNavigate();
  
  // Category icon mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fruits": return <Apple size={16} />;
      case "legumes": return <Salad size={16} />;
      case "poissons": return <Fish size={16} />;
      case "cereales": return <Wheat size={16} />;
      case "oleagineux": return <Cherry size={16} />;
      case "huiles": return <Droplets size={16} />;
      default: return <Banana size={16} />;
    }
  };
  
  // Map properties to badge styles
  const getBadgeClass = (property: string) => {
    switch (property) {
      case "anti-inflammatoire": return "badge-fats";
      case "riche-omega3": return "badge-omega3";
      case "antioxydant": return "badge-vitamin";
      case "riche-vitamine-d": return "badge-vitamin";
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
      case "riche-fer": return "Riche en fer";
      default: return property;
    }
  };
  
  // Filter foods based on search input and selected filters
  const filteredFoods = placeholderFoods.filter(food => {
    // Name search filter
    const matchesSearch = searchTerm === "" || 
      food.nom.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Property filter
    let matchesFilter = true;
    if (searchMode === "proprietes" && selectedFilter) {
      matchesFilter = food.proprietes.includes(selectedFilter);
    }
    
    // Nutrient filter
    if (searchMode === "nutriments" && selectedFilter) {
      const nutrient = nutrientFilters.find(n => n.id === selectedFilter);
      if (nutrient) {
        matchesFilter = (food as any)[selectedFilter] >= nutrient.threshold;
      }
    }
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="space-y-8 py-6 animate-fade-in">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-light">Recherche avancée</h1>
        <p className="text-muted-foreground">
          Trouvez les aliments adaptés à vos besoins nutritionnels spécifiques.
        </p>
      </section>
      
      {/* Search input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Rechercher un aliment par nom..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Filter tabs */}
      <Tabs defaultValue="proprietes" value={searchMode} onValueChange={(value) => {
        setSearchMode(value);
        setSelectedFilter("");
      }}>
        <TabsList className="w-full flex mb-6 bg-muted/40">
          <TabsTrigger 
            value="proprietes" 
            className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Propriétés
          </TabsTrigger>
          <TabsTrigger 
            value="nutriments" 
            className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Nutriments
          </TabsTrigger>
        </TabsList>
        
        {/* Properties filters */}
        <TabsContent value="proprietes" className="mt-0 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedFilter ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedFilter("")}
            >
              <Filter size={16} className="mr-1.5" />
              Tous
            </Button>
            
            {propertyFilters.map(filter => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.icon}
                <span className="ml-1.5">{filter.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFoods.map(food => (
              <FoodCard 
                key={food.id} 
                food={food} 
                onClick={() => navigate(`/aliments/${food.id}`)}
                getCategoryIcon={getCategoryIcon}
                getBadgeClass={getBadgeClass}
                getPropertyName={getPropertyName}
              />
            ))}
            
            {filteredFoods.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Aucun aliment trouvé</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Nutrients filters */}
        <TabsContent value="nutriments" className="mt-0 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedFilter ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedFilter("")}
            >
              <Filter size={16} className="mr-1.5" />
              Tous
            </Button>
            
            {nutrientFilters.map(filter => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.icon}
                <span className="ml-1.5">
                  {filter.name} (≥ {filter.threshold}{filter.unit})
                </span>
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFoods.map(food => (
              <FoodCard 
                key={food.id} 
                food={food} 
                onClick={() => navigate(`/aliments/${food.id}`)}
                getCategoryIcon={getCategoryIcon}
                getBadgeClass={getBadgeClass}
                getPropertyName={getPropertyName}
              />
            ))}
            
            {filteredFoods.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Aucun aliment trouvé</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface FoodCardProps {
  food: any;
  onClick: () => void;
  getCategoryIcon: (category: string) => React.ReactNode;
  getBadgeClass: (property: string) => string;
  getPropertyName: (property: string) => string;
}

function FoodCard({ 
  food, 
  onClick,
  getCategoryIcon,
  getBadgeClass,
  getPropertyName
}: FoodCardProps) {
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer glass-card animate-scale-in"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={food.image_url} 
          alt={food.nom} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-3 pb-2">
        <h3 className="font-medium text-base">{food.nom}</h3>
      </CardHeader>
      <CardContent className="p-3 pt-0 pb-0">
        <Badge variant="outline" className="text-xs capitalize flex items-center gap-1">
          {getCategoryIcon(food.categorie)}
          <span>
            {food.categorie === "fruits" ? "Fruit" : 
             food.categorie === "legumes" ? "Légume" : 
             food.categorie === "poissons" ? "Poisson" : 
             food.categorie === "oleagineux" ? "Oléagineux" : 
             food.categorie === "cereales" ? "Céréale" : 
             food.categorie === "huiles" ? "Huile" : food.categorie}
          </span>
        </Badge>
      </CardContent>
      <CardFooter className="p-3 pt-2 flex gap-2 flex-wrap">
        {food.proprietes.slice(0, 2).map((property: string) => (
          <Badge 
            key={property} 
            variant="outline" 
            className={`text-xs py-0.5 ${getBadgeClass(property)}`}
          >
            {getPropertyName(property)}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
