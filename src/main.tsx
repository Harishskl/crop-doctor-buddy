// In your main App.tsx or similar file
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlantAnalysis from './components/PlantAnalysis';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto p-4">
              <h1 className="text-3xl font-bold text-center mb-8">Crop Doctor Buddy</h1>
              <div className="mb-12">
                <ImageUpload />
              </div>
              <PlantAnalysis />
            </div>
          } />
          {/* Your other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;