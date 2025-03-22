
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, Lock, Database, Bell, Info, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const handleReset = () => {
    toast.info("Cette fonctionnalité sera disponible prochainement.");
  };
  
  return (
    <div className="space-y-8 py-6 animate-fade-in">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-light flex items-center gap-2">
          <Settings size={28} className="text-muted-foreground" />
          Paramètres
        </h1>
        <p className="text-muted-foreground">
          Configurez votre expérience et gérez vos préférences.
        </p>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Database size={18} />
                Données et confidentialité
              </CardTitle>
              <CardDescription>
                Gérez vos données et préférences de confidentialité
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reset" className="text-base">Réinitialiser les données</Label>
                  <p className="text-sm text-muted-foreground">
                    Effacer toutes vos données et réinitialiser l'application
                  </p>
                </div>
                <Button variant="destructive" size="sm" onClick={handleReset}>
                  Réinitialiser
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="offline" className="text-base">Stockage hors ligne</Label>
                  <p className="text-sm text-muted-foreground">
                    Conserver les données nutritionnelles pour un accès sans connexion
                  </p>
                </div>
                <Switch id="offline" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="export" className="text-base">Exporter les données</Label>
                  <p className="text-sm text-muted-foreground">
                    Télécharger une copie de vos données nutritionnelles
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info("Exportation prévue dans une prochaine mise à jour.")}>
                  Exporter
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell size={18} />
                Notifications
              </CardTitle>
              <CardDescription>
                Gérez vos préférences de notification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="updates" className="text-base">Mises à jour des aliments</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications lorsque de nouvelles données sont ajoutées
                  </p>
                </div>
                <Switch id="updates" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reminders" className="text-base">Rappels nutritionnels</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des rappels pour les objectifs nutritionnels non atteints
                  </p>
                </div>
                <Switch id="reminders" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Info size={18} />
                À propos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Pokédex Nutritionnel</h3>
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm">
                  Cette application est conçue pour explorer les propriétés nutritionnelles des aliments et gérer des objectifs personnalisés.
                </p>
                <p className="text-sm">
                  Toutes les données nutritionnelles sont issues de sources scientifiques fiables.
                </p>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2" size="sm" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Sources des données
                    <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Lock size={18} />
                Confidentialité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Vos données sont stockées localement sur votre appareil et synchronisées de façon sécurisée avec notre base de données.
              </p>
              
              <div className="pt-2 flex flex-col gap-2">
                <Button variant="outline" className="w-full flex items-center gap-2" size="sm" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Politique de confidentialité
                    <ExternalLink size={14} />
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full flex items-center gap-2" size="sm" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Conditions d'utilisation
                    <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
