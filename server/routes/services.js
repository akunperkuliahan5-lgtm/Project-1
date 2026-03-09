import { Router } from 'express';
import db from '../db/database.js';

const router = Router();

// GET all
router.get('/', (req, res) => {
  try {
    const services = db.prepare('SELECT * FROM services ORDER BY id ASC').all();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post('/', (req, res) => {
  try {
    const { number, title, description, image_url } = req.body;
    const stmt = db.prepare('INSERT INTO services (number, title, description, image_url) VALUES (?, ?, ?, ?)');
    const result = stmt.run(number, title, description, image_url || '');
    res.status(201).json({ id: result.lastInsertRowid, number, title, description, image_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
router.put('/:id', (req, res) => {
  try {
    const { number, title, description, image_url } = req.body;
    const stmt = db.prepare('UPDATE services SET number=?, title=?, description=?, image_url=? WHERE id=?');
    stmt.run(number, title, description, image_url || '', req.params.id);
    res.json({ id: Number(req.params.id), number, title, description, image_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM services WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
