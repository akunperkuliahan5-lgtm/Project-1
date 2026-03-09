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

router.post('/', (req, res) => {
  try {
    const { category, title, excerpt, content } = req.body;
    const stmt = db.prepare('INSERT INTO blog_posts (category, title, excerpt, content) VALUES (?, ?, ?, ?)');
    const result = stmt.run(category, title, excerpt, content || '');
    res.status(201).json({ id: result.lastInsertRowid, category, title, excerpt, content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { category, title, excerpt, content } = req.body;
    db.prepare('UPDATE blog_posts SET category=?, title=?, excerpt=?, content=? WHERE id=?')
      .run(category, title, excerpt, content || '', req.params.id);
    res.json({ id: Number(req.params.id), category, title, excerpt, content });
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
