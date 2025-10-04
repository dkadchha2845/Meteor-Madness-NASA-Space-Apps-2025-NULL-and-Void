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

export function calculateImpact(
  asteroidSize: number, // in kilometers
  velocity: number, // in km/s
  angle: number, // in degrees
  mitigation: string,
  composition: string = "rocky",
  impactLocation: string = "land"
): ImpactResults {
  // Convert angle to radians
  const angleRad = (angle * Math.PI) / 180;
  
  // Density based on composition
  const densities: Record<string, number> = {
    rocky: 3000,
    metallic: 7800,
    icy: 1000
  };
  const density = densities[composition] || 3000;
  
  const radius = (asteroidSize * 1000) / 2; // convert to meters
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  const mass = volume * density;
  
  // Calculate kinetic energy: E = 0.5 * m * v²
  const velocityMS = velocity * 1000; // convert to m/s
  let energy = 0.5 * mass * Math.pow(velocityMS, 2);
  
  // Apply mitigation reduction
  const mitigationFactors: Record<string, number> = {
    none: 1.0,
    kinetic: 0.3,
    gravity: 0.4,
    nuclear: 0.1,
    laser: 0.5
  };
  energy *= mitigationFactors[mitigation] || 1.0;
  
  // Crater diameter (simplified Collins et al. 2005 formula)
  // D = 1.161 * L^0.78 where L is projectile diameter in km
  const craterDiameter = 1.161 * Math.pow(asteroidSize, 0.78) * 5 * Math.sin(angleRad);
  const craterDepth = craterDiameter * 0.3;
  
  // Shockwave radius (in km)
  const shockwaveRadius = Math.pow(energy / 1e18, 0.33) * 10;
  
  // Tsunami risk assessment
  let tsunamiRisk = "None";
  if (impactLocation === "ocean") {
    if (asteroidSize > 0.5) {
      if (craterDiameter > 15) tsunamiRisk = "Catastrophic - Global tsunamis over 100m";
      else if (craterDiameter > 8) tsunamiRisk = "Severe - Regional tsunamis 50-100m";
      else if (craterDiameter > 3) tsunamiRisk = "Moderate - Local tsunamis 10-50m";
      else tsunamiRisk = "Low - Coastal waves <10m";
    } else if (asteroidSize > 0.1) {
      tsunamiRisk = "Low - Local waves";
    }
  } else {
    tsunamiRisk = "N/A - Land Impact";
  }
  
  // Seismic magnitude (Richter scale approximation)
  const seismicMagnitude = Math.min(10, 4 + Math.log10(energy / 1e15));
  
  // Atmospheric effects
  let atmosphericEffects = "";
  if (asteroidSize < 0.5) {
    atmosphericEffects = "Local dust clouds, minimal climate impact";
  } else if (asteroidSize < 2) {
    atmosphericEffects = "Regional dust injection, temperature drop 1-3°C for months";
  } else {
    atmosphericEffects = "Global dust cloud, nuclear winter scenario, temperature drop 5-15°C for years";
  }
  
  // Casualty estimation (simplified)
  let casualties = "";
  const affectedArea = Math.PI * Math.pow(shockwaveRadius, 2);
  if (affectedArea < 100) casualties = "Hundreds to thousands";
  else if (affectedArea < 1000) casualties = "Tens of thousands";
  else if (affectedArea < 10000) casualties = "Hundreds of thousands";
  else casualties = "Millions to extinction-level";
  
  if (mitigation !== "none") {
    casualties = `Significantly reduced: ${casualties}`;
  }
  
  // Detailed damage zones
  const fireballRadius = Math.pow(energy / 4.184e15, 0.4) * 0.5; // km
  const thermalRadiationRadius = fireballRadius * 2.5;
  const overpressureRadius = Math.pow(energy / 1e15, 0.33) * 3;
  const debrisZone = craterDiameter * 3;
  
  return {
    energy,
    craterDiameter,
    craterDepth,
    shockwaveRadius,
    tsunamiRisk,
    seismicMagnitude,
    atmosphericEffects,
    casualties,
    fireballRadius,
    thermalRadiationRadius,
    overpressureRadius,
    debrisZone
  };
}
