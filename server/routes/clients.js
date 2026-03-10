import { Router } from 'express';
import db from '../db/database.js';

const router = Router();

// GET all
router.get('/', (req, res) => {
  try {
    const clients = db.prepare('SELECT * FROM clients ORDER BY id ASC').all();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post('/', (req, res) => {
  try {
    const { name, logo_url } = req.body;
    const stmt = db.prepare('INSERT INTO clients (name, logo_url) VALUES (?, ?)');
    const result = stmt.run(name, logo_url || '');
    res.status(201).json({ id: result.lastInsertRowid, name, logo_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
router.put('/:id', (req, res) => {
  try {
    const { name, logo_url } = req.body;
    const stmt = db.prepare('UPDATE clients SET name=?, logo_url=? WHERE id=?');
    stmt.run(name, logo_url || '', req.params.id);
    res.json({ id: Number(req.params.id), name, logo_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM clients WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
