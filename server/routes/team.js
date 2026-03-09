import { Router } from 'express';
import db from '../db/database.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const { group } = req.query;
    if (group) {
      res.json(db.prepare('SELECT * FROM team_members WHERE team_group=? ORDER BY sort_order ASC').all(group));
    } else {
      res.json(db.prepare('SELECT * FROM team_members ORDER BY team_group ASC, sort_order ASC').all());
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { name, title, image_url, team_group, sort_order } = req.body;
    const stmt = db.prepare('INSERT INTO team_members (name, title, image_url, team_group, sort_order) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(name, title, image_url, team_group, sort_order || 0);
    res.status(201).json({ id: result.lastInsertRowid, name, title, image_url, team_group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { name, title, image_url, team_group, sort_order } = req.body;
    db.prepare('UPDATE team_members SET name=?, title=?, image_url=?, team_group=?, sort_order=? WHERE id=?')
      .run(name, title, image_url, team_group, sort_order || 0, req.params.id);
    res.json({ id: Number(req.params.id), name, title, image_url, team_group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM team_members WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
