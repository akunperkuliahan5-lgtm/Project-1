import db from './database.js';

function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  db.exec('DELETE FROM services');
  db.exec('DELETE FROM portfolio');
  db.exec('DELETE FROM team_members');
  db.exec('DELETE FROM blog_posts');

  // ===== Services =====
  const insertService = db.prepare('INSERT INTO services (number, title, description, image_url) VALUES (?, ?, ?, ?)');
  const services = [
    ['01', 'Perizinan PBG & SLF', 'Penyusunan dokumen teknis untuk mendapatkan Persetujuan Bangunan Gedung & Sertifikat Laik Fungsi resmi.', '/services/service_pbg.png'],
    ['02', 'AMDAL & UKL-UPL', 'Kajian komprehensif dampak lingkungan untuk memastikan operasional bisnis yang berkelanjutan dan legal.', '/services/service_amdal.png'],
    ['03', 'Digital Branding', 'Pengembangan website korporat dan aplikasi kustom untuk memperkuat kehadiran digital entitas bisnis Anda.', '/services/service_digital.png'],
    ['04', 'Pariwisata', 'Perencanaan destinasi wisata strategis mulai dari masterplan hingga manajemen kunjungan berkelanjutan.', '/services/service_tourism.png'],
    ['05', 'Redrawing DED', 'Digitalisasi dan penyempurnaan Detail Engineering Design untuk akurasi konstruksi yang maksimal.', '/services/service_ded.png'],
    ['06', 'Audit Struktur', 'Investigasi forensik bangunan untuk menilai kekuatan, keamanan, dan masa pakai struktur gedung.', '/services/service_audit.png'],
  ];
  for (const s of services) {
    insertService.run(...s);
  }

  // ===== Portfolio =====
  const insertPortfolio = db.prepare('INSERT INTO portfolio (title, description, image_url, tag) VALUES (?, ?, ?, ?)');
  const portfolioItems = [
    ['Summarecon Mutiara Makassar', 'Dokumen Lingkungan UKL-UPL (Morizen, Ville Park, Ambani)', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200', '2024'],
    ['Izin PBG Hunian & Komersial', 'Proyek Ruko Hengky G, Imelda Unggul, & Hunian Grand Rivera', 'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=1200', '2024'],
    ['Aplikasi Inventory GUPUSMU IV', 'Sistem manajemen persenjataan & inventaris terintegrasi', 'https://images.unsplash.com/photo-1551288049-bbbda546697c?q=80&w=1200', 'APP'],
    ['PT. Sulawesi Kapur Generasi Mandiri', 'Monitoring & Kepatuhan Lingkungan Berkala (Maros)', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200', 'MONITOR'],
  ];
  for (const p of portfolioItems) {
    insertPortfolio.run(...p);
  }

  // ===== Team Members =====
  const insertTeam = db.prepare('INSERT INTO team_members (name, title, image_url, team_group, sort_order) VALUES (?, ?, ?, ?, ?)');
  const teamMembers = [
    // Leadership
    ['Alqadri Achmad, S.Kom', 'Komisaris', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600', 'leadership', 1],
    ['M. Dipta Chandra D.P.M, S.T', 'Direktur Utama', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600', 'leadership', 2],
    ['Muh. Raiz Abidin, S.Pd, S.T, M.Pd', 'Tim Ahli Lingkungan', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600', 'leadership', 3],
    ['Masri Ridwan, S.Pd, M.Pd', 'Tim Ahli Pariwisata', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600', 'leadership', 4],
    // Architecture
    ['Agus Alim Praya Maknun, S.Ars., M.Ars', 'Arsitek', 'https://images.unsplash.com/photo-1556157382-97dee2dcb04e?q=80&w=600', 'architecture', 1],
    ['Rahmat Irshal S.Ars', 'Arsitek', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600', 'architecture', 2],
    ['Mardis Darwis, S.T., M.T. A.Md.B.Ing', 'Tenaga Ahli', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600', 'architecture', 3],
    ['Ar. Hardy Marennu, S.T', 'Arsitek Profesional', 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=600', 'architecture', 4],
  ];
  for (const t of teamMembers) {
    insertTeam.run(...t);
  }

  // ===== Blog Posts =====
  const insertBlog = db.prepare('INSERT INTO blog_posts (category, title, excerpt, content) VALUES (?, ?, ?, ?)');
  const blogPosts = [
    ['Tourism', 'Strategi Destinasi Berkelanjutan 2025', 'Implementasi green tourism dalam pengelolaan kawasan wisata Nusantara.', 'Artikel lengkap tentang strategi destinasi berkelanjutan...'],
    ['Environment', 'Esensi AMDAL Bagi Skala Industri', 'Prosedur terbaru pengurusan dokumen lingkungan melalui sistem terpadu.', 'Artikel lengkap tentang esensi AMDAL...'],
    ['Building Code', 'Transisi IMB ke PBG: Hal Penting', 'Langkah-langkah krusial dalam migrasi dokumen perizinan bangunan lama ke baru.', 'Artikel lengkap tentang transisi IMB ke PBG...'],
  ];
  for (const b of blogPosts) {
    insertBlog.run(...b);
  }

  console.log('✅ Database seeded successfully!');
  console.log(`   - ${services.length} services`);
  console.log(`   - ${portfolioItems.length} portfolio items`);
  console.log(`   - ${teamMembers.length} team members`);
  console.log(`   - ${blogPosts.length} blog posts`);
}

seed();
