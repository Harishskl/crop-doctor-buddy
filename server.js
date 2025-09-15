const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server
  credentials: true
}));
app.use(express.json());
app.use(express.static('dist')); // Serve your built React app

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Store analysis results (in production, use a database)
let analysisResults = [];

// API endpoint to receive analysis from Raspberry Pi
app.post('/api/analysis', (req, res) => {
  try {
    const { timestamp, image_name, analysis, image_data, status } = req.body;
    
    // Store the analysis
    const newAnalysis = {
      id: Date.now(),
      timestamp,
      image_name,
      analysis,
      image_data,
      status
    };
    
    analysisResults.unshift(newAnalysis);
    
    console.log('Analysis received:', { timestamp, image_name, status });
    
    res.status(200).json({ 
      message: 'Analysis received successfully',
      id: newAnalysis.id
    });
  } catch (error) {
    console.error('Error processing analysis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint to get all analyses
app.get('/api/analyses', (req, res) => {
  res.json(analysisResults);
});

// API endpoint to get a specific analysis by ID
app.get('/api/analyses/:id', (req, res) => {
  const analysis = analysisResults.find(a => a.id == req.params.id);
  if (!analysis) {
    return res.status(404).json({ message: 'Analysis not found' });
  }
  res.json(analysis);
});

// API endpoint to upload image from web app
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: req.file.path
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Serve the frontend (for production)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Crop Doctor Buddy server running on port ${PORT}`);
});