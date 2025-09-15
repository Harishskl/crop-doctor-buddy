import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Download, 
  Eye, 
  Filter,
  Calendar,
  MapPin
} from "lucide-react";

const PhotoGallery = () => {
  const photos = [
    {
      id: "IMG_001",
      url: "/api/placeholder/300/200", 
      title: "Fungal Infection - Zone B7",
      timestamp: "2024-01-15 14:30",
      location: "Zone B7",
      severity: "critical",
      analyzed: true,
      confidence: 95
    },
    {
      id: "IMG_002", 
      url: "/api/placeholder/300/200",
      title: "Aphid Colony - Zone A3", 
      timestamp: "2024-01-15 14:15",
      location: "Zone A3",
      severity: "critical", 
      analyzed: true,
      confidence: 88
    },
    {
      id: "IMG_003",
      url: "/api/placeholder/300/200",
      title: "Leaf Discoloration - Zone C1",
      timestamp: "2024-01-15 13:45",
      location: "Zone C1", 
      severity: "warning",
      analyzed: true,
      confidence: 72
    },
    {
      id: "IMG_004",
      url: "/api/placeholder/300/200",
      title: "Healthy Growth - Zone D2",
      timestamp: "2024-01-15 13:30", 
      location: "Zone D2",
      severity: "normal",
      analyzed: true,
      confidence: 91
    },
    {
      id: "IMG_005",
      url: "/api/placeholder/300/200",
      title: "Processing - Zone E1",
      timestamp: "2024-01-15 13:15",
      location: "Zone E1",
      severity: "unknown", 
      analyzed: false,
      confidence: 0
    },
    {
      id: "IMG_006",
      url: "/api/placeholder/300/200", 
      title: "Wilting Detected - Zone F3",
      timestamp: "2024-01-15 12:50",
      location: "Zone F3",
      severity: "warning",
      analyzed: true, 
      confidence: 78
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-destructive";
      case "warning": return "text-warning"; 
      case "normal": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "normal": return "default";
      default: return "outline";
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Detection Photos
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Capture
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="border rounded-lg overflow-hidden hover:shadow-medium transition-shadow">
              <div className="aspect-video bg-muted/30 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge variant={getSeverityBadge(photo.severity) as any} className="text-xs">
                    {photo.severity}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    {photo.location}
                  </div>
                </div>
              </div>
              
              <div className="p-3 space-y-2">
                <h4 className="font-medium text-sm leading-tight">{photo.title}</h4>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {photo.timestamp}
                </div>
                
                {photo.analyzed && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Confidence: {photo.confidence}%
                    </span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {!photo.analyzed && (
                  <div className="flex items-center justify-center py-2">
                    <Badge variant="outline" className="text-xs">
                      Processing...
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">
            Load More Photos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { PhotoGallery };