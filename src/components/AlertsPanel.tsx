import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Bell, 
  Clock, 
  MessageSquare,
  Eye,
  X
} from "lucide-react";

const AlertsPanel = () => {
  const alerts = [
    {
      id: "ALT_001",
      type: "critical",
      title: "Severe Fungal Infection",
      location: "Zone B7",
      time: "2 min ago",
      description: "High probability blight infection detected",
      smsStatus: "sent"
    },
    {
      id: "ALT_002", 
      type: "critical",
      title: "Pest Infestation",
      location: "Zone A3",
      time: "15 min ago", 
      description: "Aphid colony identified via image analysis",
      smsStatus: "sent"
    },
    {
      id: "ALT_003",
      type: "warning",
      title: "Low Soil Moisture",
      location: "Zone C1",
      time: "1 hour ago",
      description: "Moisture levels below optimal threshold",
      smsStatus: "pending"
    },
    {
      id: "ALT_004",
      type: "info",
      title: "Sensor Maintenance",
      location: "Zone D5",
      time: "2 hours ago",
      description: "Temperature sensor requires calibration",
      smsStatus: "none"
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "text-destructive";
      case "warning": return "text-warning";
      case "info": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "info": return "outline";
      default: return "outline";
    }
  };

  const getSmsStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <MessageSquare className="h-3 w-3 text-success" />;
      case "pending": return <Clock className="h-3 w-3 text-warning" />;
      default: return null;
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Active Alerts
          </div>
          <Badge variant="destructive" className="text-xs">
            {alerts.filter(a => a.type === "critical").length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className="border rounded-lg p-3 space-y-2 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${getAlertColor(alert.type)}`} />
                <div>
                  <p className="font-medium text-sm leading-tight">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.location}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">{alert.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={getAlertBadge(alert.type) as any} className="text-xs">
                  {alert.type}
                </Badge>
                {getSmsStatusIcon(alert.smsStatus)}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{alert.time}</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button variant="outline" className="w-full" size="sm">
            View All Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { AlertsPanel };