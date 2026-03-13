import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'kkn.sqlite');
const db = new Database(dbPath);

console.log('Updating database with local image paths...');

// Update Team Members
const teamUpdates = [
    { name: 'Alqadri Achmad, S.Kom', img: '/foto/alqadri.jpeg' },
    { name: 'M. Dipta Chandra D.P.M, S.T', img: '/foto/dipta.jpeg' },
    { name: 'Muh. Raiz Abidin, S.Pd, S.T, M.Pd', img: '/foto/raiz.jpeg' },
    { name: 'Masri Ridwan, S.Pd, M.Pd', img: '/foto/masri.jpeg' },
    { name: 'Agus Alim Praya Maknun, S.Ars., M.Ars', img: '/foto/agus.jpeg' },
    { name: 'Rahmat Irshal S.Ars', img: '/foto/rahmat.jpeg' },
    { name: 'Mardis Darwis, S.T., M.T. A.Md.B.Ing', img: '/foto/mardis.jpeg' },
    { name: 'Ar. Hardy Marennu, S.T', img: '/foto/hardy.jpeg' }
];

const updateTeam = db.prepare('UPDATE team_members SET image_url = ? WHERE name LIKE ?');
for (const member of teamUpdates) {
    updateTeam.run(member.img, `%${member.name}%`);
}

// Update Services
const serviceUpdates = [
    { title: 'Perizinan PBG & SLF', img: '/foto/pbg.png' },
    { title: 'AMDAL & UKL-UPL', img: '/foto/amdal.png' },
    { title: 'Digital Branding', img: '/foto/digital.png' },
    { title: 'Pariwisata', img: '/foto/tourism.png' },
    { title: 'Redrawing DED', img: '/foto/ded.png' },
    { title: 'Audit Struktur', img: '/foto/audit.png' }
];

const updateService = db.prepare('UPDATE services SET image_url = ? WHERE title LIKE ?');
for (const svc of serviceUpdates) {
    updateService.run(svc.img, `%${svc.title}%`);
}

console.log('Database updated successfully.');
db.close();
