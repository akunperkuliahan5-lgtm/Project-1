import { Router } from 'express';
import db from '../db/database.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

const router = Router();

// Get all media
router.get('/', (req, res) => {
    try {
        const media = db.prepare('SELECT * FROM media ORDER BY created_at DESC').all();
        res.json(media);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete media
router.delete('/:id', (req, res) => {
    try {
        // Get filename first
        const media = db.prepare('SELECT filename FROM media WHERE id = ?').get(req.params.id);

        if (media) {
            const filePath = path.join(uploadDir, media.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            db.prepare('DELETE FROM media WHERE id = ?').run(req.params.id);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Media not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
