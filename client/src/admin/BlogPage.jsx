import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/api/blog';

function Modal({ item, onClose, onSave }) {
  const [form, setForm] = useState(
    item || { category: '', title: '', excerpt: '', content: '' }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = item ? 'PUT' : 'POST';
    const url = item ? `${API}/${item.id}` : API;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-[#222] px-8 py-6 flex justify-between items-center sticky top-0 bg-[#111]">
          <h2 className="text-sm font-black text-white uppercase tracking-widest">
            {item ? 'Edit Artikel' : 'Tulis Artikel Baru'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Kategori</label>
              <input className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Tourism / Environment / Building Code" required />
            </div>
            <div className="flex items-end">
              <span className="text-gray-700 text-xs">Contoh: Tourism, Environment, Building Code</span>
            </div>
          </div>
          <div>
            <label className="admin-label">Judul Artikel</label>
            <input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Judul artikel..." required />
          </div>
          <div>
            <label className="admin-label">Ringkasan (Excerpt)</label>
            <textarea className="admin-input h-20 resize-none" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Singkat deskripsi artikel yang ditampilkan di homepage..." required />
          </div>
          <div>
            <label className="admin-label">Konten Lengkap</label>
            <textarea className="admin-input h-40 resize-y" value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Isi artikel lengkap..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all">Simpan</button>
            <button type="button" onClick={onClose} className="px-6 py-3 border border-[#333] text-gray-400 text-xs font-bold uppercase hover:border-white transition-all">Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => fetch(API).then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Hapus artikel ini?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="p-10">
      <div className="mb-8 border-b border-[#1e1e1e] pb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Manajemen</span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Blog</h1>
        </div>
        <button onClick={() => setModal('add')} className="px-6 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all">+ Tulis Artikel</button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-[#111] border border-[#1e1e1e] hover:border-accent/20 transition-all p-6 flex gap-6 items-start group">
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">{item.category}</span>
              <h3 className="font-bold text-white text-base mb-1 group-hover:text-accent/80 transition-colors">{item.title}</h3>
              <p className="text-gray-600 text-xs leading-relaxed">{item.excerpt}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0 mt-1">
              <button onClick={() => setModal(item)} className="px-3 py-1 border border-[#333] text-gray-400 text-[10px] uppercase hover:border-accent hover:text-accent transition-all">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-3 py-1 border border-[#333] text-gray-400 text-[10px] uppercase hover:border-red-500 hover:text-red-400 transition-all">Hapus</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-700 py-12 text-sm text-center">Belum ada artikel.</p>}
      </div>

      {modal && (
        <Modal
          item={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}
