import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Telescope, RefreshCw, Calendar, Ruler, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AsteroidGallery() {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState<any>(null);

  const fetchNEOData = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = 'DEMO_KEY';
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7); // Fetch next 7 days
      
      const startDateStr = today.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateStr}&end_date=${endDateStr}&api_key=${apiKey}`
      );

      setData(response.data);
      toast({
        title: "Gallery Updated",
        description: "Fetched the latest NEO data from NASA",
      });
    } catch (err) {
      setError('Failed to load NEO data');
      toast({
        title: "Error",
        description: "Failed to fetch NASA data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNEOData();
  }, []);

  const handleRefresh = () => {
    fetchNEOData();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDistance = (km: number) => {
    return (km / 384400).toFixed(2); // Convert to lunar distances
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full mb-4">
            <Telescope className="w-4 h-4" />
            <span className="text-sm">NASA NEO Data</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Near-Earth Object Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore real asteroids approaching Earth. Data provided by NASA's Center for Near-Earth Object Studies.
          </p>
          <Button onClick={handleRefresh} disabled={loading} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {error && (
          <div className="glass-panel border-destructive p-6 rounded-lg mb-8 text-center">
            <p className="text-destructive">Failed to load NEO data: {error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.near_earth_objects && Object.entries(data.near_earth_objects).map(([date, asteroids]: [string, any]) => (
            (asteroids as any[]).map((asteroid) => {
              const closeApproach = asteroid.close_approach_data?.[0];
              const isPotentiallyHazardous = asteroid.is_potentially_hazardous_asteroid;
              const diameter = asteroid.estimated_diameter?.kilometers;

              return (
                <Card 
                  key={asteroid.id} 
                  className={`glass-panel border-0 cursor-pointer transition-all hover:scale-105 ${
                    selectedAsteroid?.id === asteroid.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedAsteroid(asteroid)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg line-clamp-1">{asteroid.name}</CardTitle>
                      {isPotentiallyHazardous && (
                        <Badge variant="destructive" className="ml-2">PHA</Badge>
                      )}
                    </div>
                    <CardDescription className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{closeApproach ? formatDate(closeApproach.close_approach_date) : 'N/A'}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Ruler className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {diameter ? 
                          `${diameter.estimated_diameter_min.toFixed(2)} - ${diameter.estimated_diameter_max.toFixed(2)} km` 
                          : 'Size unknown'
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {closeApproach?.relative_velocity?.kilometers_per_hour ? 
                          `${Math.round(parseFloat(closeApproach.relative_velocity.kilometers_per_hour)).toLocaleString()} km/h`
                          : 'Velocity unknown'
                        }
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="text-xs text-muted-foreground mb-1">Miss Distance</div>
                      <div className="text-lg font-semibold">
                        {closeApproach?.miss_distance?.kilometers ?
                          `${formatDistance(parseFloat(closeApproach.miss_distance.kilometers))} LD`
                          : 'N/A'
                        }
                      </div>
                      <div className="text-xs text-muted-foreground">Lunar Distances</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ))}
        </div>

        {data?.near_earth_objects && Object.keys(data.near_earth_objects).length === 0 && (
          <div className="text-center glass-panel p-12 rounded-lg">
            <Telescope className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No asteroids found for the selected date range.</p>
          </div>
        )}

        {loading && (
          <div className="text-center glass-panel p-12 rounded-lg">
            <RefreshCw className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading NEO data from NASA...</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 glass-panel p-8 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Understanding the Data</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <strong className="text-foreground">PHA Badge:</strong> Potentially Hazardous Asteroid - objects that come within 0.05 AU of Earth's orbit and are larger than ~140 meters.
            </div>
            <div>
              <strong className="text-foreground">Lunar Distance (LD):</strong> Distance from Earth to the Moon (~384,400 km). Used as a reference for close approaches.
            </div>
            <div>
              <strong className="text-foreground">Close Approach Date:</strong> The date when the asteroid passes closest to Earth.
            </div>
            <div>
              <strong className="text-foreground">Velocity:</strong> Speed relative to Earth at the time of close approach.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
