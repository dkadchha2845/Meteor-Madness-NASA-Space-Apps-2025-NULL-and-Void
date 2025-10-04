import { Link } from 'react-router-dom';
import { Target, Shield, Database, Telescope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 glass-panel rounded-full text-sm">
            🌍 NASA Space Apps Challenge 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Meteor Madness
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explore the science of asteroid impacts with real NASA data. Simulate collisions, evaluate planetary defense strategies, and learn from historical events.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/simulator">
              <Button size="lg" className="gap-2">
                <Target className="w-5 h-5" />
                Launch Simulator
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="gap-2">
                <Telescope className="w-5 h-5" />
                Browse NEO Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Can You Do?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-panel border-0">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Impact Simulator</CardTitle>
                <CardDescription>
                  Simulate asteroid impacts with customizable parameters. Adjust size, velocity, angle, and composition to see realistic outcomes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/simulator">
                  <Button variant="ghost" className="gap-2 p-0">
                    Try Simulator <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-panel border-0">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Telescope className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle>NEO Gallery</CardTitle>
                <CardDescription>
                  Browse real Near-Earth Objects from NASA's database. View orbital data, size estimates, and approach distances.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/gallery">
                  <Button variant="ghost" className="gap-2 p-0">
                    Explore Gallery <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-panel border-0">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-pink-500" />
                </div>
                <CardTitle>Historical Impacts</CardTitle>
                <CardDescription>
                  Learn from past asteroid impacts on Earth. Discover the Chicxulub event, Tunguska explosion, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/impacts">
                  <Button variant="ghost" className="gap-2 p-0">
                    View History <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="glass-panel p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-center mb-12">By The Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">30,000+</div>
                <div className="text-muted-foreground">Known NEOs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-500 mb-2">~1,000</div>
                <div className="text-muted-foreground">Potentially Hazardous</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-500 mb-2">65M</div>
                <div className="text-muted-foreground">Years Since Chicxulub</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
                <div className="text-muted-foreground">NASA Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planetary Defense Starts With Understanding
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the effort to understand and mitigate asteroid threats. Every simulation brings us closer to protecting our planet.
            </p>
            <Link to="/simulator">
              <Button size="lg" className="gap-2">
                Start Simulating Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
