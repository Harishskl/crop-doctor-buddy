import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Gauge,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface SensorDataProps {
  expanded?: boolean;
}

const SensorData = ({ expanded }: SensorDataProps) => {
  const sensors = [
    {
      id: "TEMP_01",
      name: "Temperature",
      value: "24.5°C",
      status: "normal",
      trend: "up",
      icon: Thermometer,
      location: "Zone A",
      lastUpdate: "1 min ago"
    },
    {
      id: "HUM_01", 
      name: "Humidity",
      value: "68%",
      status: "normal",
      trend: "down",
      icon: Droplets,
      location: "Zone A",
      lastUpdate: "1 min ago"
    },
    {
      id: "SOIL_01",
      name: "Soil Moisture",
      value: "45%",
      status: "warning",
      trend: "down",
      icon: Gauge,
      location: "Zone A",
      lastUpdate: "2 min ago"
    },
    {
      id: "WIND_01",
      name: "Wind Speed",
      value: "3.2 m/s",
      status: "normal",
      trend: "up",
      icon: Wind,
      location: "Zone A",
      lastUpdate: "1 min ago"
    },
    {
      id: "LIGHT_01",
      name: "Light Intensity",
      value: "850 lux",
      status: "normal",
      trend: "up",
      icon: Sun,
      location: "Zone A",
      lastUpdate: "30 sec ago"
    },
    {
      id: "PH_01",
      name: "Soil pH",
      value: "6.8",
      status: "normal",
      trend: "up",
      icon: Gauge,
      location: "Zone A",
      lastUpdate: "5 min ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-success";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal": return "default";
      case "warning": return "secondary";
      case "critical": return "destructive";
      default: return "outline";
    }
  };

  const displaySensors = expanded ? sensors : sensors.slice(0, 4);

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          Sensor Readings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid grid-cols-1 ${expanded ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
          {displaySensors.map((sensor) => {
            const IconComponent = sensor.icon;
            const TrendIcon = sensor.trend === "up" ? TrendingUp : TrendingDown;
            
            return (
              <div 
                key={sensor.id}
                className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-4 w-4 ${getStatusColor(sensor.status)}`} />
                    <span className="font-medium text-sm">{sensor.name}</span>
                  </div>
                  <Badge variant={getStatusBadge(sensor.status) as any} className="text-xs">
                    {sensor.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold">{sensor.value}</span>
                    <TrendIcon className={`h-4 w-4 ${
                      sensor.trend === "up" ? "text-success" : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{sensor.location}</span>
                    <span>{sensor.lastUpdate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {!expanded && sensors.length > 4 && (
          <div className="mt-4 text-center">
            <Badge variant="outline" className="text-xs">
              +{sensors.length - 4} more sensors
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { SensorData };