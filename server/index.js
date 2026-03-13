import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import servicesRouter from './routes/services.js';
import portfolioRouter from './routes/portfolio.js';
import teamRouter from './routes/team.js';
import blogRouter from './routes/blog.js';
import clientsRouter from './routes/clients.js';
import mediaRouter from './routes/media.js';
import db from './db/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

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
app.use('/api/media', mediaRouter);

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    const stmt = db.prepare('INSERT INTO media (filename, original_name, mime_type, size, url) VALUES (?, ?, ?, ?, ?)');
    stmt.run(req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, imageUrl);
    res.json({ imageUrl, filename: req.file.filename });
  } catch (err) {
    console.error('Database error:', err);
    // Even if DB fails, we have the file
    res.json({ imageUrl, filename: req.file.filename });
  }
});

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
