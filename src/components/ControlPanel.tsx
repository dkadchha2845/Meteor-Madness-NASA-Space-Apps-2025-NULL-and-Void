import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Rocket } from "lucide-react";

interface ControlPanelProps {
  asteroidSize: number;
  setAsteroidSize: (value: number) => void;
  velocity: number;
  setVelocity: (value: number) => void;
  angle: number;
  setAngle: (value: number) => void;
  distance: number;
  setDistance: (value: number) => void;
  composition: string;
  setComposition: (value: string) => void;
  impactLocation: string;
  setImpactLocation: (value: string) => void;
  mitigation: string;
  setMitigation: (value: string) => void;
  onFetchNEO: () => void;
  onCalculate: () => void;
  onSaveScenario: () => void;
  loading: boolean;
}

export default function ControlPanel({
  asteroidSize,
  setAsteroidSize,
  velocity,
  setVelocity,
  angle,
  setAngle,
  distance,
  setDistance,
  composition,
  setComposition,
  impactLocation,
  setImpactLocation,
  mitigation,
  setMitigation,
  onFetchNEO,
  onCalculate,
  onSaveScenario,
  loading
}: ControlPanelProps) {
  return (
    <Card className="glass-panel cosmic-glow border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Impact Parameters
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Configure asteroid characteristics and mitigation strategies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="size" className="text-sm font-medium">
              Asteroid Size (km)
            </Label>
            <span className="text-sm font-bold text-primary">{asteroidSize.toFixed(2)}</span>
          </div>
          <Slider
            id="size"
            min={0.1}
            max={10}
            step={0.1}
            value={[asteroidSize]}
            onValueChange={(value) => setAsteroidSize(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="velocity" className="text-sm font-medium">
              Velocity (km/s)
            </Label>
            <span className="text-sm font-bold text-accent">{velocity.toFixed(1)}</span>
          </div>
          <Slider
            id="velocity"
            min={5}
            max={70}
            step={1}
            value={[velocity]}
            onValueChange={(value) => setVelocity(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="angle" className="text-sm font-medium">
              Impact Angle (degrees)
            </Label>
            <span className="text-sm font-bold text-cosmic-pink">{angle}°</span>
          </div>
          <Slider
            id="angle"
            min={15}
            max={90}
            step={5}
            value={[angle]}
            onValueChange={(value) => setAngle(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="distance" className="text-sm font-medium">
              Orbit Distance (AU)
            </Label>
            <span className="text-sm font-bold text-cosmic-blue">{distance.toFixed(2)}</span>
          </div>
          <Slider
            id="distance"
            min={0.5}
            max={3}
            step={0.1}
            value={[distance]}
            onValueChange={(value) => setDistance(value[0])}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="composition" className="text-sm font-medium">
            Asteroid Composition
          </Label>
          <Select value={composition} onValueChange={setComposition}>
            <SelectTrigger id="composition" className="glass-panel">
              <SelectValue placeholder="Select composition" />
            </SelectTrigger>
            <SelectContent className="glass-panel">
              <SelectItem value="rocky">Rocky (3000 kg/m³)</SelectItem>
              <SelectItem value="metallic">Metallic (7800 kg/m³)</SelectItem>
              <SelectItem value="icy">Icy (1000 kg/m³)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="location" className="text-sm font-medium">
            Impact Location
          </Label>
          <Select value={impactLocation} onValueChange={setImpactLocation}>
            <SelectTrigger id="location" className="glass-panel">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="glass-panel">
              <SelectItem value="land">Land Impact</SelectItem>
              <SelectItem value="ocean">Ocean Impact</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="mitigation" className="text-sm font-medium">
            Mitigation Strategy
          </Label>
          <Select value={mitigation} onValueChange={setMitigation}>
            <SelectTrigger id="mitigation" className="glass-panel">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent className="glass-panel">
              <SelectItem value="none">No Deflection</SelectItem>
              <SelectItem value="kinetic">Kinetic Impactor</SelectItem>
              <SelectItem value="gravity">Gravity Tractor</SelectItem>
              <SelectItem value="nuclear">Nuclear Device</SelectItem>
              <SelectItem value="laser">Laser Ablation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 pt-4">
          <Button 
            onClick={onFetchNEO} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Fetch Real NEO Data
          </Button>
          
          <Button 
            onClick={onCalculate}
            variant="outline"
            className="w-full border-destructive/50 hover:bg-destructive/10"
          >
            <Rocket className="mr-2 h-4 w-4" />
            Calculate Impact
          </Button>

          <Button 
            onClick={onSaveScenario}
            variant="secondary"
            className="w-full"
          >
            Save Scenario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
