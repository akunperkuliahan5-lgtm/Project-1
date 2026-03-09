import { Router } from 'express';
import db from '../db/database.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const portfolio = db.prepare('SELECT * FROM portfolio ORDER BY id ASC').all();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { title, description, image_url, year, tag } = req.body;
    const stmt = db.prepare('INSERT INTO portfolio (title, description, image_url, year, tag) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(title, description, image_url, year, tag);
    res.status(201).json({ id: result.lastInsertRowid, title, description, image_url, year, tag });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { title, description, image_url, year, tag } = req.body;
    db.prepare('UPDATE portfolio SET title=?, description=?, image_url=?, year=?, tag=? WHERE id=?')
      .run(title, description, image_url, year, tag, req.params.id);
    res.json({ id: Number(req.params.id), title, description, image_url, year, tag });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM portfolio WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
