import { Router } from 'express';
import db from '../db/database.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    res.json(db.prepare('SELECT * FROM blog_posts ORDER BY id DESC').all());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/categories', (req, res) => {
  try {
    const categories = db.prepare("SELECT DISTINCT category FROM blog_posts WHERE category IS NOT NULL AND category != ''").all();
    res.json(categories.map(c => c.category));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { category, title, excerpt, content, thumbnail_url } = req.body;
    const stmt = db.prepare('INSERT INTO blog_posts (category, title, excerpt, content, thumbnail_url) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(category, title, excerpt, content || '', thumbnail_url || '');
    res.status(201).json({ id: result.lastInsertRowid, category, title, excerpt, content, thumbnail_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { category, title, excerpt, content, thumbnail_url } = req.body;
    db.prepare('UPDATE blog_posts SET category=?, title=?, excerpt=?, content=?, thumbnail_url=? WHERE id=?')
      .run(category, title, excerpt, content || '', thumbnail_url || '', req.params.id);
    res.json({ id: Number(req.params.id), category, title, excerpt, content, thumbnail_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM blog_posts WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
