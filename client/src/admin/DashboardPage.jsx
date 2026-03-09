import { useEffect, useState } from 'react';

const API = 'http://localhost:3001/api';

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] p-8 relative overflow-hidden group hover:border-accent/30 transition-all">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }}></div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-3">{label}</p>
      <p className="text-5xl font-black text-white">{value ?? '—'}</p>
      <div className="absolute bottom-4 right-6 text-4xl opacity-10 group-hover:opacity-20 transition-all" style={{ color }}>
        {icon}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ services: null, portfolio: null, team: null, blog: null });

  useEffect(() => {
    async function load() {
      try {
        const [s, p, t, b] = await Promise.all([
          fetch(`${API}/services`).then(r => r.json()),
          fetch(`${API}/portfolio`).then(r => r.json()),
          fetch(`${API}/team`).then(r => r.json()),
          fetch(`${API}/blog`).then(r => r.json()),
        ]);
        setStats({ services: s.length, portfolio: p.length, team: t.length, blog: b.length });
      } catch (_) {}
    }
    load();
  }, []);

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-12 border-b border-[#1e1e1e] pb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Overview</span>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-2">Kelola konten website PT. Kolaborasi Konsultan Nusantara</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="Layanan" value={stats.services} icon="◈" color="#b08d57" />
        <StatCard label="Portofolio" value={stats.portfolio} icon="◉" color="#6b7280" />
        <StatCard label="Anggota Tim" value={stats.team} icon="◎" color="#b08d57" />
        <StatCard label="Artikel Blog" value={stats.blog} icon="◇" color="#6b7280" />
      </div>

      {/* Quick Links */}
      <div className="bg-[#111] border border-[#1e1e1e] p-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">Aksi Cepat</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { href: '/admin/services', label: 'Kelola Layanan', desc: 'Tambah, edit, atau hapus layanan' },
            { href: '/admin/portfolio', label: 'Kelola Portofolio', desc: 'Perbarui proyek pilihan' },
            { href: '/admin/team', label: 'Kelola Tim', desc: 'Atur struktur organisasi' },
            { href: '/admin/blog', label: 'Kelola Blog', desc: 'Tulis atau edit artikel' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center justify-between p-5 border border-[#222] hover:border-accent/40 hover:bg-accent/5 transition-all group"
            >
              <div>
                <p className="font-bold text-white text-sm">{item.label}</p>
                <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
              </div>
              <span className="text-accent group-hover:translate-x-2 transition-transform">→</span>
            </a>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="mt-6 flex gap-4 text-[10px] text-gray-700 uppercase tracking-widest">
        <span>Backend: <span className="text-green-700">● localhost:3001</span></span>
        <span>Frontend: <span className="text-green-700">● localhost:5173</span></span>
        <span>DB: <span className="text-green-700">● SQLite</span></span>
      </div>
    </div>
  );
}
