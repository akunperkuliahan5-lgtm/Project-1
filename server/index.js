import express from 'express';
import cors from 'cors';
import servicesRouter from './routes/services.js';
import portfolioRouter from './routes/portfolio.js';
import teamRouter from './routes/team.js';
import blogRouter from './routes/blog.js';
import clientsRouter from './routes/clients.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/services', servicesRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/team', teamRouter);
app.use('/api/blog', blogRouter);
app.use('/api/clients', clientsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 KKN Nusantara API running at http://localhost:${PORT}`);
  console.log(`   Endpoints:`);
  console.log(`   - GET /api/services`);
  console.log(`   - GET /api/portfolio`);
  console.log(`   - GET /api/team`);
  console.log(`   - GET /api/blog`);
  console.log(`   - GET /api/health`);
});
