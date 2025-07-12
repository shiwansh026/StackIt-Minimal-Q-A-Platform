const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Test route for deployment
app.get('/api/test', (req, res) => {
  res.json({ message: 'StackIt API is working!', status: 'success' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Try to load routes, but don't fail if database is not available
try {
  const authRoutes = require('./routes/auth');
  const questionRoutes = require('./routes/questions');
  const answerRoutes = require('./routes/answers');

  app.use('/api', authRoutes);
  app.use('/api/questions', questionRoutes);
  app.use('/api/questions', answerRoutes);
  
  console.log('✅ Database routes loaded successfully');
} catch (error) {
  console.log('⚠️  Database routes not available (free tier mode)');
  console.log('   This is normal for free tier deployments without database');
}

// Serve frontend for SPA
app.use(express.static(path.join(__dirname, '../Frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 StackIt server running on port ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`📡 API Test: http://localhost:${PORT}/api/test`);
});
