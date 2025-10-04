import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface NEOData {
  name: string;
  diameter: number;
  velocity: number;
  distance: number;
}

export function useNASAData() {
  const [loading, setLoading] = useState(false);

  const fetchNEOData = async (): Promise<NEOData | null> => {
    setLoading(true);
    try {
      // NASA NEO API endpoint
      const apiKey = 'DEMO_KEY'; // Users should replace with their own key
      const today = new Date().toISOString().split('T')[0];
      
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`
      );

      const neos = response.data.near_earth_objects[today];
      
      if (neos && neos.length > 0) {
        const neo = neos[0];
        
        const diameter = (
          neo.estimated_diameter.kilometers.estimated_diameter_min +
          neo.estimated_diameter.kilometers.estimated_diameter_max
        ) / 2;
        
        const velocity = parseFloat(
          neo.close_approach_data[0].relative_velocity.kilometers_per_second
        );
        
        const distance = parseFloat(
          neo.close_approach_data[0].miss_distance.astronomical
        );

        toast.success(`Loaded NEO: ${neo.name}`);
        
        return {
          name: neo.name,
          diameter,
          velocity,
          distance
        };
      }
      
      toast.error('No NEO data available for today');
      return null;
    } catch (error) {
      console.error('Error fetching NEO data:', error);
      toast.error('Failed to fetch NASA data. Using default parameters.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchNEOData, loading };
}
