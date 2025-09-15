import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Analysis {
  id: number;
  timestamp: string;
  image_name: string;
  analysis: any;
  image_data: string;
  status: string;
}

const PlantAnalysis: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/analyses');
      const data = await response.json();
      setAnalyses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analyses:', error);
      toast.error('Failed to load analyses');
      setLoading(false);
    }
  };

  const formatAnalysis = (analysis: any) => {
    if (analysis.raw_response) {
      return <div className="whitespace-pre-wrap">{analysis.raw_response}</div>;
    }
    
    return (
      <div className="space-y-2">
        <div>
          <Badge variant={analysis.disease_name ? "destructive" : "outline"} className="mb-2">
            {analysis.disease_name || 'No disease detected'}
          </Badge>
        </div>
        {analysis.confidence_score && (
          <div>
            <p className="text-sm font-medium">Confidence: {analysis.confidence_score}%</p>
            <Progress value={analysis.confidence_score} className="h-2" />
          </div>
        )}
        {analysis.symptoms && (
          <div>
            <p className="text-sm font-semibold">Symptoms:</p>
            <p className="text-sm">{analysis.symptoms}</p>
          </div>
        )}
        {analysis.treatment && (
          <div>
            <p className="text-sm font-semibold">Treatment:</p>
            <p className="text-sm">{analysis.treatment}</p>
          </div>
        )}
        {analysis.affected_areas && (
          <div>
            <p className="text-sm font-semibold">Affected Areas:</p>
            <p className="text-sm">{analysis.affected_areas}</p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Plant Disease Analysis</h1>
        <Button onClick={fetchAnalyses} variant="outline">
          Refresh
        </Button>
      </div>

      {analyses.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground py-8">
              <p>No analyses yet. Upload plant images to get started.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{analysis.image_name}</CardTitle>
                <CardDescription>
                  {new Date(analysis.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <img 
                    src={`data:image/jpeg;base64,${analysis.image_data}`} 
                    alt="Analyzed plant" 
                    className="rounded-md cursor-pointer max-h-48 object-cover w-full"
                    onClick={() => setSelectedImage(analysis.image_data)}
                  />
                </div>
                {formatAnalysis(analysis.analysis)}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img 
              src={`data:image/jpeg;base64,${selectedImage}`} 
              alt="Enlarged plant" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantAnalysis;