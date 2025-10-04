import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, MapPin, Calendar, Ruler, Skull, Mountain } from 'lucide-react';

const historicalImpacts = [
  {
    id: 1,
    name: "Chicxulub Impact",
    location: "Yucatán Peninsula, Mexico",
    date: "66 million years ago",
    diameter: "10-15 km",
    craterSize: "180 km",
    consequences: "Mass extinction event (dinosaurs), created the Cretaceous-Paleogene boundary, global wildfires, tsunami waves up to 100m high",
    severity: "catastrophic",
    icon: Skull,
    color: "text-red-500"
  },
  {
    id: 2,
    name: "Tunguska Event",
    location: "Siberia, Russia",
    date: "June 30, 1908",
    diameter: "50-60 m",
    craterSize: "No crater (airburst)",
    consequences: "Flattened 2,000 km² of forest, knocked down ~80 million trees, airburst explosion equivalent to 10-15 megatons of TNT",
    severity: "major",
    icon: Mountain,
    color: "text-orange-500"
  },
  {
    id: 3,
    name: "Chelyabinsk Meteor",
    location: "Chelyabinsk Oblast, Russia",
    date: "February 15, 2013",
    diameter: "20 m",
    craterSize: "No crater (airburst)",
    consequences: "~1,500 people injured by glass from shattered windows, equivalent to ~500 kilotons of TNT, brightest superbolide since 1908",
    severity: "moderate",
    icon: MapPin,
    color: "text-yellow-500"
  },
  {
    id: 4,
    name: "Barringer Crater",
    location: "Arizona, USA",
    date: "~50,000 years ago",
    diameter: "50 m",
    craterSize: "1.2 km",
    consequences: "First confirmed impact crater on Earth, blast equivalent to 10 megatons of TNT, well-preserved crater",
    severity: "major",
    icon: Mountain,
    color: "text-orange-500"
  },
  {
    id: 5,
    name: "Vredefort Impact",
    location: "Free State, South Africa",
    date: "2.023 billion years ago",
    diameter: "10-15 km",
    craterSize: "300 km (largest verified)",
    consequences: "Largest verified impact structure on Earth, created massive crater visible from space, significant geological changes",
    severity: "catastrophic",
    icon: Skull,
    color: "text-red-500"
  },
  {
    id: 6,
    name: "Sudbury Basin",
    location: "Ontario, Canada",
    date: "1.849 billion years ago",
    diameter: "10-15 km",
    craterSize: "130 km",
    consequences: "One of the oldest impact structures, created rich ore deposits (nickel, copper, platinum), reshaped regional geology",
    severity: "catastrophic",
    icon: Skull,
    color: "text-red-500"
  }
];

const getSeverityBadge = (severity: string) => {
  const variants: { [key: string]: any } = {
    catastrophic: "destructive",
    major: "default",
    moderate: "secondary"
  };
  return <Badge variant={variants[severity]}>{severity.toUpperCase()}</Badge>;
};

export default function HistoricalImpacts() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4">
            <Database className="w-4 h-4" />
            <span className="text-sm">Historical Records</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Historical Impact Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from Earth's past encounters with asteroids and comets. Each impact has taught us more about planetary defense.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-6">
          {historicalImpacts.map((impact) => {
            const Icon = impact.icon;
            return (
              <Card key={impact.id} className="glass-panel border-0">
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center ${impact.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{impact.name}</CardTitle>
                        <CardDescription className="flex flex-wrap gap-4 text-base">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {impact.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {impact.date}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    {getSeverityBadge(impact.severity)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="glass-panel p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Ruler className="w-4 h-4" />
                        <span>Object Diameter</span>
                      </div>
                      <div className="text-2xl font-bold">{impact.diameter}</div>
                    </div>
                    <div className="glass-panel p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Mountain className="w-4 h-4" />
                        <span>Crater Size</span>
                      </div>
                      <div className="text-2xl font-bold">{impact.craterSize}</div>
                    </div>
                    <div className="glass-panel p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Skull className="w-4 h-4" />
                        <span>Severity</span>
                      </div>
                      <div className="text-2xl font-bold capitalize">{impact.severity}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Consequences</h4>
                    <p className="text-muted-foreground leading-relaxed">{impact.consequences}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Educational Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle>What We've Learned</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• Impact events have shaped Earth's geological and biological history</p>
              <p>• Even small asteroids can cause significant regional damage</p>
              <p>• Airburst events can be just as dangerous as direct impacts</p>
              <p>• Early detection is crucial for planetary defense</p>
              <p>• Understanding past impacts helps us prepare for future threats</p>
            </CardContent>
          </Card>

          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle>Modern Detection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>• NASA tracks over 30,000 near-Earth objects</p>
              <p>• Advanced telescopes scan the sky 24/7</p>
              <p>• Impact prediction accuracy has greatly improved</p>
              <p>• Multiple defense strategies are being developed</p>
              <p>• International cooperation ensures global preparedness</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
