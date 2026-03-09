import db from './db/database.js';
try {
  db.exec('ALTER TABLE services ADD COLUMN image_url TEXT');
  console.log('Column image_url added.');
} catch (err) {
  console.log('Column already exists or error:', err.message);
}
