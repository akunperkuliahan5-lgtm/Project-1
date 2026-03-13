import { useState, useEffect } from 'react';
import { useAdminDialog } from './DialogContext';
import MediaLibraryModal from './MediaLibraryModal';

const API = 'http://127.0.0.1:3001/api/blog';

const DEFAULT_CATEGORIES = [
  'Tourism',
  'Environment',
  'Building Code',
  'Architecture',
  'News',
  'Creative'
];

function Modal({ item, onClose, onSave, categories = [] }) {
  const { showAlert } = useAdminDialog();
  const [form, setForm] = useState(
    item || { category: '', title: '', excerpt: '', content: '', thumbnail_url: '' }
  );
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  const [isManual, setIsManual] = useState(false);

  // If editing an item with a category not in the standard list, 
  // we might want to default to manual or just ensure it's in the dropdown.
  // The dropdown logic already handles it if it's in the 'categories' prop.
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    try {
      setIsSaving(true);
      const method = item ? 'PUT' : 'POST';
      const url = item ? `${API}/${item.id}` : API;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Gagal menyimpan data ke server');
      }

      showAlert('Berhasil', `Artikel berhasil ${item ? 'diperbarui' : 'ditayangkan'}`, 'success');
      onSave();
    } catch (err) {
      console.error('Save error:', err);
      showAlert('Error', err.message || 'Terjadi kesalahan saat menyimpan', 'alert');
    } finally {
      setIsSaving(false);
    }
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
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="admin-label">Kategori</label>
              <button 
                type="button" 
                onClick={() => setIsManual(!isManual)}
                className="text-[9px] font-black uppercase tracking-widest text-accent hover:text-white transition-colors"
              >
                {isManual ? '← Pilih dari Daftar' : '+ Tulis Manual'}
              </button>
            </div>
            
            {!isManual ? (
              <select 
                className="admin-input" 
                value={form.category} 
                onChange={e => setForm({ ...form, category: e.target.value })} 
                required
              >
                <option value="" disabled>Pilih Kategori</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            ) : (
              <input 
                className="admin-input" 
                value={form.category} 
                onChange={e => setForm({ ...form, category: e.target.value })} 
                placeholder="Masukkan kategori baru..." 
                required 
                autoFocus
              />
            )}
            <p className="text-gray-700 text-[10px] italic">Kategori membantu pengelompokan artikel di halaman publik.</p>
          </div>
          <div>
            <label className="admin-label">Judul Artikel</label>
            <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Judul artikel..." required />
          </div>
          <div>
            <label className="admin-label">Featured Image</label>
            <div className="flex gap-4 items-start">
              <div
                onClick={() => setIsMediaOpen(true)}
                className="w-24 h-24 border border-[#333] bg-black flex items-center justify-center cursor-pointer hover:border-accent transition-all overflow-hidden group"
              >
                {form.thumbnail_url ? (
                  <img src={form.thumbnail_url} alt="thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                ) : (
                  <span className="text-gray-700 text-2xl">+</span>
                )}
              </div>
              <div className="flex-1">
                <input
                  className="admin-input mb-2"
                  value={form.thumbnail_url}
                  onChange={e => setForm({ ...form, thumbnail_url: e.target.value })}
                  placeholder="Atau masukkan URL gambar..."
                />
                <button
                  type="button"
                  onClick={() => setIsMediaOpen(true)}
                  className="px-4 py-2 bg-[#222] text-gray-400 text-[9px] font-black uppercase tracking-widest hover:text-white transition-all"
                >
                  Buka Pustaka Media
                </button>
              </div>
            </div>
            <MediaLibraryModal
              isOpen={isMediaOpen}
              onClose={() => setIsMediaOpen(false)}
              onSelect={(url) => {
                setForm({ ...form, thumbnail_url: url });
                setIsMediaOpen(false);
              }}
            />
          </div>
          <div>
            <label className="admin-label">Ringkasan (Excerpt)</label>
            <textarea className="admin-input h-20 resize-none" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Singkat deskripsi artikel yang ditampilkan di homepage..." required />
          </div>
          <div>
            <label className="admin-label">Konten Lengkap</label>
            <textarea className="admin-input h-40 resize-y" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Isi artikel lengkap..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              type="submit" 
              disabled={isSaving}
              className="flex-1 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3 border border-[#333] text-gray-400 text-xs font-bold uppercase hover:border-white transition-all">Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [modal, setModal] = useState(null);

  const loadItems = () => fetch(API).then(r => r.json()).then(setItems);
  const loadCategories = () => fetch(`${API}/categories`).then(r => r.json()).then(data => {
    console.log('Categories from backend:', data);
    // Merge backend categories with defaults and remove duplicates
    const combined = Array.from(new Set([...DEFAULT_CATEGORIES, ...data]));
    // Sort alphabetically
    combined.sort((a, b) => a.localeCompare(b));
    setCategories(combined);
  }).catch(err => {
    console.error('Failed to load categories:', err);
  });

  const loadAll = () => {
    loadItems();
    loadCategories();
  };

  useEffect(() => { loadAll(); }, []);

  const { showConfirm, showAlert } = useAdminDialog();

  const handleDelete = async (id) => {
    showConfirm(
      'Konfirmasi Hapus',
      'Hapus artikel blog ini?',
      async () => {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        showAlert('Berhasil', 'Artikel telah dihapus', 'success');
        loadAll();
      }
    );
  };

  return (
    <div className="relative">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-6 bg-accent"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Publication Hub</span>
          </div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Journal</h1>
        </div>
        <button 
          onClick={() => setModal('add')} 
          className="px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all rounded-xl shadow-2xl shadow-accent/10 hover:-translate-y-1 active:scale-95"
        >
          + Create Article
        </button>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <div key={item.id} className="futuristic-card hover:border-accent/40 bg-white/[0.01] p-6 flex gap-8 items-center group relative overflow-hidden">
            {/* Hover Glow Edge */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>

            {item.thumbnail_url && (
              <div className="w-32 h-32 flex-shrink-0 bg-black rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-[8px] font-black uppercase tracking-widest text-accent rounded-full">
                  {item.category}
                </span>
                <span className="h-[1px] w-4 bg-white/10"></span>
                <span className="text-[8px] font-black uppercase tracking-widest text-gray-700">Dec 2026</span>
              </div>
              <h3 className="font-black text-white text-xl mb-2 group-hover:text-accent transition-colors tracking-tight">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 max-w-2xl">{item.excerpt}</p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button 
                onClick={() => setModal(item)} 
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-gray-500 hover:text-white hover:border-accent transition-all"
                title="Edit Entry"
              >
                ✎
              </button>
              <button 
                onClick={() => handleDelete(item.id)} 
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/5 border border-red-500/5 text-gray-700 hover:text-red-400 hover:border-red-500/40 transition-all"
                title="Delete Entry"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="py-24 text-center futuristic-card border-dashed">
            <p className="text-gray-700 text-xs font-black uppercase tracking-[0.3em]">Neural Database Empty</p>
          </div>
        )}
      </div>

      {modal && (
        <Modal
          item={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); loadAll(); }}
          categories={categories}
        />
      )}
    </div>
  );
}
