import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  Camera, 
  Activity,
  MapPin,
  Clock
} from "lucide-react";
import { SensorData } from "./SensorData";
import { InfectionHeatmap } from "./InfectionHeatmap";
import { AlertsPanel } from "./AlertsPanel";
import { PhotoGallery } from "./PhotoGallery";

const Dashboard = () => {
  const plantHealthScore = 78;
  const activeAlerts = 3;
  const totalSensors = 12;
  const infectedAreas = 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Leaf className="h-8 w-8 text-primary" />
              CropGuard Monitor
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time plant health monitoring and infection detection
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Live Data
            </Badge>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Capture
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-forest text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">Plant Health</p>
                  <p className="text-2xl font-bold">{plantHealthScore}%</p>
                </div>
                <Leaf className="h-8 w-8 text-white/80" />
              </div>
              <Progress value={plantHealthScore} className="mt-3 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Alerts</p>
                  <p className="text-2xl font-bold text-destructive">{activeAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                2 critical, 1 warning
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Sensors</p>
                  <p className="text-2xl font-bold text-success">{totalSensors}</p>
                </div>
                <Activity className="h-8 w-8 text-success" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                All systems operational
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-soft transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Infected Areas</p>
                  <p className="text-2xl font-bold text-warning">{infectedAreas}</p>
                </div>
                <MapPin className="h-8 w-8 text-warning" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Zones A3, B7 affected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Heatmap
            </TabsTrigger>
            <TabsTrigger value="sensors" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Sensors
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InfectionHeatmap />
              </div>
              <div>
                <AlertsPanel />
              </div>
            </div>
            <SensorData />
          </TabsContent>

          <TabsContent value="heatmap">
            <InfectionHeatmap expanded />
          </TabsContent>

          <TabsContent value="sensors">
            <SensorData expanded />
          </TabsContent>

          <TabsContent value="photos">
            <PhotoGallery />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="border-0 bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last updated: 2 minutes ago
              </div>
              <div>
                Raspberry Pi 4 • Cloud Analysis • SMS Alerts
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;