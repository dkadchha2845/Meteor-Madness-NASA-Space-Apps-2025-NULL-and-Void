import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Waves, Mountain, Wind, Target, Flame, Radio, Layers, Trash2 } from "lucide-react";

interface ImpactResults {
  energy: number;
  craterDiameter: number;
  craterDepth: number;
  shockwaveRadius: number;
  tsunamiRisk: string;
  seismicMagnitude: number;
  atmosphericEffects: string;
  casualties: string;
  fireballRadius: number;
  thermalRadiationRadius: number;
  overpressureRadius: number;
  debrisZone: number;
}

interface SavedScenario {
  id: number;
  name: string;
  parameters: any;
  results: ImpactResults;
}

interface ResultsPanelProps {
  results: ImpactResults | null;
  mitigation: string;
  composition: string;
  impactLocation: string;
  savedScenarios: SavedScenario[];
  onDeleteScenario: (id: number) => void;
}

export default function ResultsPanel({ 
  results, 
  mitigation, 
  composition, 
  impactLocation,
  savedScenarios,
  onDeleteScenario 
}: ResultsPanelProps) {
  if (!results) {
    return (
      <Card className="glass-panel border-muted/30 h-full flex items-center justify-center">
        <CardContent className="text-center py-12">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground text-lg">
            Configure parameters and calculate impact to see results
          </p>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColor = (magnitude: number) => {
    if (magnitude < 5) return "text-success";
    if (magnitude < 7) return "text-warning";
    return "text-destructive";
  };

  const getMitigationBadge = () => {
    const mitigationLabels: Record<string, string> = {
      none: "No Deflection",
      kinetic: "Kinetic Impactor",
      gravity: "Gravity Tractor",
      nuclear: "Nuclear Device",
      laser: "Laser Ablation"
    };
    
    return (
      <Badge 
        variant={mitigation === "none" ? "destructive" : "default"}
        className={mitigation === "none" ? "" : "bg-success/20 text-success border-success/50"}
      >
        {mitigationLabels[mitigation] || mitigation}
      </Badge>
    );
  };

  return (
    <Card className="glass-panel border-destructive/30 danger-glow">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-destructive to-warning bg-clip-text text-transparent">
            Impact Analysis
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{composition}</Badge>
            <Badge variant="outline">{impactLocation}</Badge>
            {getMitigationBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="zones">Damage Zones</TabsTrigger>
            <TabsTrigger value="scenarios">Saved ({savedScenarios.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center gap-2 text-warning">
                  <Target className="h-5 w-5" />
                  <span className="text-sm font-medium">Impact Energy</span>
                </div>
                <p className="text-2xl font-bold">{results.energy.toExponential(2)} J</p>
                <p className="text-xs text-muted-foreground">
                  {(results.energy / 4.184e15).toFixed(2)} Megatons TNT
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center gap-2 text-destructive">
                  <Mountain className="h-5 w-5" />
                  <span className="text-sm font-medium">Crater Size</span>
                </div>
                <p className="text-2xl font-bold">{results.craterDiameter.toFixed(2)} km</p>
                <p className="text-xs text-muted-foreground">
                  Depth: {results.craterDepth.toFixed(2)} km
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center gap-2 text-accent">
                  <Wind className="h-5 w-5" />
                  <span className="text-sm font-medium">Shockwave</span>
                </div>
                <p className="text-2xl font-bold">{results.shockwaveRadius.toFixed(1)} km</p>
                <p className="text-xs text-muted-foreground">
                  Radius of destruction
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center gap-2 text-cosmic-blue">
                  <Waves className="h-5 w-5" />
                  <span className="text-sm font-medium">Tsunami Risk</span>
                </div>
                <p className="text-sm font-bold">{results.tsunamiRisk}</p>
              </div>
            </div>

            <div className="space-y-4 p-4 rounded-lg bg-card/50 border border-destructive/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Seismic Magnitude</span>
                <span className={`text-2xl font-bold ${getSeverityColor(results.seismicMagnitude)}`}>
                  {results.seismicMagnitude.toFixed(1)}
                </span>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Atmospheric Effects</span>
                <p className="text-sm">{results.atmosphericEffects}</p>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Estimated Casualties</span>
                <p className="text-sm font-bold text-destructive">{results.casualties}</p>
              </div>
            </div>

            {mitigation !== "none" && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                <p className="text-sm text-success font-medium">
                  ✓ Deflection strategy active - Impact severity reduced by estimated 60-90%
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="zones" className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-5 w-5 text-red-500" />
                  <span className="font-semibold">Fireball Zone</span>
                </div>
                <p className="text-2xl font-bold text-red-500">{results.fireballRadius.toFixed(2)} km radius</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete vaporization, temperatures exceed 5000°C
                </p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Radio className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold">Thermal Radiation Zone</span>
                </div>
                <p className="text-2xl font-bold text-orange-500">{results.thermalRadiationRadius.toFixed(2)} km radius</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Third-degree burns, ignition of flammable materials
                </p>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">Overpressure Zone</span>
                </div>
                <p className="text-2xl font-bold text-yellow-500">{results.overpressureRadius.toFixed(2)} km radius</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Structural collapse, severe wind damage
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">Debris Ejection Zone</span>
                </div>
                <p className="text-2xl font-bold text-blue-500">{results.debrisZone.toFixed(2)} km radius</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Projectile ejecta, secondary impacts
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-3">
            {savedScenarios.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No saved scenarios yet</p>
                <p className="text-sm">Calculate and save scenarios to compare them</p>
              </div>
            ) : (
              savedScenarios.map((scenario) => (
                <div key={scenario.id} className="p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{scenario.name}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {scenario.parameters.asteroidSize.toFixed(1)}km
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {scenario.parameters.composition}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {scenario.parameters.mitigation}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteScenario(scenario.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                    <div>
                      <span className="text-muted-foreground">Energy:</span>{" "}
                      <span className="font-semibold">{(scenario.results.energy / 4.184e15).toFixed(1)} MT</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Crater:</span>{" "}
                      <span className="font-semibold">{scenario.results.craterDiameter.toFixed(1)} km</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
