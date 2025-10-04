import { useState } from "react";
import AsteroidVisualization from "@/components/AsteroidVisualization";
import ControlPanel from "@/components/ControlPanel";
import ResultsPanel from "@/components/ResultsPanel";
import { useNASAData } from "@/hooks/useNASAData";
import { calculateImpact } from "@/utils/impactCalculations";
import { AlertTriangle, Satellite } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [asteroidSize, setAsteroidSize] = useState(1.0);
  const [velocity, setVelocity] = useState(20);
  const [angle, setAngle] = useState(45);
  const [distance, setDistance] = useState(1.0);
  const [composition, setComposition] = useState("rocky");
  const [impactLocation, setImpactLocation] = useState("land");
  const [mitigation, setMitigation] = useState("none");
  const [results, setResults] = useState<any>(null);
  const [savedScenarios, setSavedScenarios] = useState<any[]>([]);

  const { fetchNEOData, loading } = useNASAData();

  const handleFetchNEO = async () => {
    const neoData = await fetchNEOData();
    if (neoData) {
      setAsteroidSize(neoData.diameter);
      setVelocity(neoData.velocity);
      setDistance(neoData.distance);
      toast.success("NEO data loaded successfully!");
    }
  };

  const handleCalculate = () => {
    const impactResults = calculateImpact(asteroidSize, velocity, angle, mitigation, composition, impactLocation);
    setResults(impactResults);
    
    if (mitigation === "none") {
      toast.error("Impact calculated - Implement mitigation strategy!", {
        description: "Consider using deflection techniques to reduce damage"
      });
    } else {
      toast.success("Mitigation strategy applied successfully!", {
        description: "Impact severity significantly reduced"
      });
    }
  };

  const handleSaveScenario = () => {
    if (!results) {
      toast.error("Calculate impact first before saving");
      return;
    }
    
    const scenario = {
      id: Date.now(),
      name: `Scenario ${savedScenarios.length + 1}`,
      parameters: { asteroidSize, velocity, angle, composition, impactLocation, mitigation },
      results
    };
    
    setSavedScenarios([...savedScenarios, scenario]);
    toast.success("Scenario saved!", {
      description: "Compare with other scenarios"
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Satellite className="h-12 w-12 text-primary animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-cosmic-pink bg-clip-text text-transparent">
            Meteor Madness
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          NASA Space Apps Challenge 2025 • Interactive Asteroid Impact Simulator
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-warning">
          <AlertTriangle className="h-5 w-5" />
          <p className="text-sm font-medium">
            Real-time NEO tracking and impact prediction system
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1800px] mx-auto">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-1 space-y-6">
          <ControlPanel
            asteroidSize={asteroidSize}
            setAsteroidSize={setAsteroidSize}
            velocity={velocity}
            setVelocity={setVelocity}
            angle={angle}
            setAngle={setAngle}
            distance={distance}
            setDistance={setDistance}
            composition={composition}
            setComposition={setComposition}
            impactLocation={impactLocation}
            setImpactLocation={setImpactLocation}
            mitigation={mitigation}
            setMitigation={setMitigation}
            onFetchNEO={handleFetchNEO}
            onCalculate={handleCalculate}
            onSaveScenario={handleSaveScenario}
            loading={loading}
          />
        </div>

        {/* Center Panel - 3D Visualization */}
        <div className="lg:col-span-1 h-[500px] lg:h-[700px]">
          <AsteroidVisualization
            asteroidSize={asteroidSize * 0.3}
            orbitDistance={distance * 8}
            velocity={velocity / 10}
          />
        </div>

        {/* Right Panel - Results */}
        <div className="lg:col-span-1">
          <ResultsPanel 
            results={results} 
            mitigation={mitigation} 
            composition={composition}
            impactLocation={impactLocation}
            savedScenarios={savedScenarios}
            onDeleteScenario={(id) => setSavedScenarios(savedScenarios.filter(s => s.id !== id))}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Data sources: NASA NEO API • USGS Seismic Data • JPL Small-Body Database</p>
        <p className="mt-2">Built for NASA Space Apps Challenge 2025</p>
      </footer>
    </div>
  );
};

export default Index;
