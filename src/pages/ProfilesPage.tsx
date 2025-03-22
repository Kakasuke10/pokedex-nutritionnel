import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Weight, 
  Check,
  Heart,
  Fish,
  Sun,
  Male as MaleIcon,
  Female as FemaleIcon
} from "lucide-react";

const placeholderProfiles = [
  {
    id: "1",
    nom: "Marie",
    sexe: "femme",
    poids_kg: 65,
    objectifs_personnalises: {
      omega_3: 1500,
      vitamine_d: 15,
      magnesium: 400,
      fer: 18
    },
    valeurs_recommandees: {
      omega_3: 1000,
      vitamine_d: 10,
      magnesium: 360,
      fer: 16
    }
  },
  {
    id: "2",
    nom: "Pierre",
    sexe: "homme",
    poids_kg: 80,
    objectifs_personnalises: {
      omega_3: 2000,
      vitamine_d: 20,
      magnesium: 420,
      fer: 10
    },
    valeurs_recommandees: {
      omega_3: 1300,
      vitamine_d: 10,
      magnesium: 400,
      fer: 9
    }
  }
];

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState(placeholderProfiles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);
  
  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    setIsDeleteDialogOpen(false);
    setProfileToDelete(null);
  };
  
  const confirmDelete = (id: string) => {
    setProfileToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="space-y-8 py-6 animate-fade-in">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-light">Profils Nutritionnels</h1>
        <p className="text-muted-foreground">
          Gérez vos profils personnalisés et suivez vos objectifs nutritionnels.
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border border-dashed border-muted-foreground/30 bg-background hover:border-muted-foreground/50 transition-all-200">
          <CardContent className="p-0">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full h-full py-10 flex flex-col items-center gap-4 rounded-none"
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Plus size={30} className="text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground font-medium">
                    Ajouter un profil
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nouveau profil</DialogTitle>
                  <DialogDescription>
                    Créez un nouveau profil pour personnaliser vos objectifs nutritionnels.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" placeholder="Entrez un nom" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sexe</Label>
                    <RadioGroup defaultValue="femme">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="femme" id="femme" />
                        <Label htmlFor="femme" className="flex items-center gap-1.5">
                          <FemaleIcon size={16} />
                          Femme
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="homme" id="homme" />
                        <Label htmlFor="homme" className="flex items-center gap-1.5">
                          <MaleIcon size={16} />
                          Homme
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Poids (kg)</Label>
                    <Input id="weight" type="number" placeholder="kg" />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <Label className="text-base">Objectifs personnalisés</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Les valeurs recommandées seront calculées en fonction de votre sexe et poids.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="omega3" className="text-sm flex items-center gap-1.5">
                          <Fish size={14} />
                          Oméga-3 (mg)
                        </Label>
                        <Input id="omega3" type="number" placeholder="mg/jour" defaultValue={1000} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vitaminD" className="text-sm flex items-center gap-1.5">
                          <Sun size={14} />
                          Vitamine D (μg)
                        </Label>
                        <Input id="vitaminD" type="number" placeholder="μg/jour" defaultValue={10} />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    Enregistrer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        {profiles.map(profile => (
          <ProfileCard 
            key={profile.id} 
            profile={profile}
            onDeleteClick={() => confirmDelete(profile.id)}
          />
        ))}
      </div>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Supprimer le profil</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce profil ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => profileToDelete && handleDeleteProfile(profileToDelete)}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProfileCard({ profile, onDeleteClick }: { profile: any, onDeleteClick: () => void }) {
  const getProgressColor = (value: number, target: number) => {
    const ratio = value / target;
    if (ratio < 0.8) return "bg-red-500";
    if (ratio < 1) return "bg-yellow-500";
    if (ratio <= 1.2) return "bg-green-500";
    return "bg-blue-500";
  };
  
  const genderIcon = profile.sexe === "homme" ? 
    <MaleIcon size={14} className="text-blue-500" /> : 
    <FemaleIcon size={14} className="text-pink-500" />;
  
  const weightString = (
    <span className="flex items-center gap-1">
      {genderIcon}
      <Weight size={14} className="mr-1" />
      {profile.poids_kg} kg
    </span>
  );
  
  return (
    <Card className="glass-card overflow-hidden animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <User size={18} className="text-primary" />
              {profile.nom}
            </CardTitle>
            <CardDescription>{weightString}</CardDescription>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive" 
              onClick={onDeleteClick}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h4 className="text-sm font-medium mb-2">Objectifs nutritionnels</h4>
        
        <div className="space-y-3 text-sm">
          <div className="space-y-1">
            <div className="flex justify-between">
              <div className="flex items-center gap-1.5">
                <Fish size={14} className="text-nutrition-omega3" />
                <span>Oméga-3</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{profile.objectifs_personnalises.omega_3} mg</span>
                <span className="text-xs text-muted-foreground">
                  / {profile.valeurs_recommandees.omega_3} mg
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(
                  profile.objectifs_personnalises.omega_3,
                  profile.valeurs_recommandees.omega_3
                )}`} 
                style={{ 
                  width: `${Math.min(
                    (profile.objectifs_personnalises.omega_3 / profile.valeurs_recommandees.omega_3) * 100,
                    150
                  )}%` 
                }}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <div className="flex items-center gap-1.5">
                <Sun size={14} className="text-nutrition-vitamin" />
                <span>Vitamine D</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{profile.objectifs_personnalises.vitamine_d} μg</span>
                <span className="text-xs text-muted-foreground">
                  / {profile.valeurs_recommandees.vitamine_d} μg
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(
                  profile.objectifs_personnalises.vitamine_d,
                  profile.valeurs_recommandees.vitamine_d
                )}`} 
                style={{ 
                  width: `${Math.min(
                    (profile.objectifs_personnalises.vitamine_d / profile.valeurs_recommandees.vitamine_d) * 100,
                    150
                  )}%` 
                }}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <div className="flex items-center gap-1.5">
                <Heart size={14} className="text-nutrition-mineral" />
                <span>Magnésium</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{profile.objectifs_personnalises.magnesium} mg</span>
                <span className="text-xs text-muted-foreground">
                  / {profile.valeurs_recommandees.magnesium} mg
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(
                  profile.objectifs_personnalises.magnesium,
                  profile.valeurs_recommandees.magnesium
                )}`} 
                style={{ 
                  width: `${Math.min(
                    (profile.objectifs_personnalises.magnesium / profile.valeurs_recommandees.magnesium) * 100,
                    150
                  )}%` 
                }}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-nutrition-protein" />
                <span>Fer</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{profile.objectifs_personnalises.fer} mg</span>
                <span className="text-xs text-muted-foreground">
                  / {profile.valeurs_recommandees.fer} mg
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(
                  profile.objectifs_personnalises.fer,
                  profile.valeurs_recommandees.fer
                )}`} 
                style={{ 
                  width: `${Math.min(
                    (profile.objectifs_personnalises.fer / profile.valeurs_recommandees.fer) * 100,
                    150
                  )}%` 
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/20 pt-3 pb-3 border-t border-border/50">
        <div className="w-full flex justify-between items-center">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {profile.sexe === "homme" ? "Homme" : "Femme"}
          </Badge>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Voir les détails
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
