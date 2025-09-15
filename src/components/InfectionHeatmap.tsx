import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Camera,
  Maximize2
} from "lucide-react";

interface InfectionHeatmapProps {
  expanded?: boolean;
}

const InfectionHeatmap = ({ expanded }: InfectionHeatmapProps) => {
  // Simulated grid data for crop field zones
  const gridData = [
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 2, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 1, 0, 0, 0]
  ];

  const getCellColor = (value: number) => {
    switch (value) {
      case 0: return "bg-success/20 hover:bg-success/30"; // Healthy
      case 1: return "bg-warning/60 hover:bg-warning/70"; // Mild infection
      case 2: return "bg-destructive/60 hover:bg-destructive/70"; // Severe infection
      default: return "bg-muted";
    }
  };

  const getCellStatus = (value: number) => {
    switch (value) {
      case 0: return "Healthy";
      case 1: return "Mild Infection";
      case 2: return "Severe Infection";
      default: return "Unknown";
    }
  };

  const infectionStats = {
    healthy: gridData.flat().filter(v => v === 0).length,
    mild: gridData.flat().filter(v => v === 1).length,
    severe: gridData.flat().filter(v => v === 2).length
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Infection Heatmap
          </CardTitle>
          {!expanded && (
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success/30 rounded border"></div>
            <span>Healthy ({infectionStats.healthy})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning/60 rounded border"></div>
            <span>Mild ({infectionStats.mild})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive/60 rounded border"></div>
            <span>Severe ({infectionStats.severe})</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <div className="grid grid-cols-8 gap-1 max-w-md mx-auto">
            {gridData.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    aspect-square rounded cursor-pointer transition-all duration-200 
                    border border-border/50 hover:scale-110 hover:z-10 relative
                    ${getCellColor(cell)}
                  `}
                  title={`Zone ${String.fromCharCode(65 + rowIndex)}${colIndex + 1}: ${getCellStatus(cell)}`}
                >
                  {cell > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {cell === 1 ? (
                        <AlertTriangle className="h-3 w-3 text-warning-foreground" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-destructive-foreground" />
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Detections */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recent Detections</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-destructive/10 rounded border border-destructive/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Zone B7 - Severe</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-xs">Critical</Badge>
                <Button variant="outline" size="sm">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-warning/10 rounded border border-warning/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Zone A3 - Mild</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">Monitor</Badge>
                <Button variant="outline" size="sm">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
                <p className="text-lg font-bold text-success">{infectionStats.healthy}</p>
                <p className="text-xs text-muted-foreground">Healthy Zones</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-warning mx-auto mb-2" />
                <p className="text-lg font-bold text-warning">{infectionStats.mild}</p>
                <p className="text-xs text-muted-foreground">Mild Infections</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-2" />
                <p className="text-lg font-bold text-destructive">{infectionStats.severe}</p>
                <p className="text-xs text-muted-foreground">Severe Infections</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { InfectionHeatmap };