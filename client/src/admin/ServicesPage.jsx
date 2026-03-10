import { useState, useEffect } from 'react';
import { useAdminDialog } from './DialogContext';

const API = 'http://127.0.0.1:3001/api/services';
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

// ===== Modal Component =====
function Modal({ item, onClose, onSave }) {
  const { showAlert } = useAdminDialog();
  const [form, setForm] = useState(
    item || { number: '', title: '', description: '', image_url: '' }
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
    showAlert('Berhasil', `Layanan berhasil ${item ? 'diperbarui' : 'ditambahkan'}`, 'success');
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] w-full max-w-lg">
        <div className="border-b border-[#222] px-8 py-6 flex justify-between items-center">
          <h2 className="text-sm font-black text-white uppercase tracking-widest">
            {item ? 'Edit Layanan' : 'Tambah Layanan'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="admin-label">Nomor</label>
            <input className="admin-input" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} placeholder="01" required />
          </div>
          <div>
            <label className="admin-label">Judul</label>
            <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Perizinan PBG & SLF" required />
          </div>
          <div>
            <label className="admin-label">Deskripsi</label>
            <textarea className="admin-input h-24 resize-none" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi layanan..." required />
          </div>
          <div>
            <label className="admin-label">URL Gambar Ekstra (Opsional)</label>
            <input className="admin-input" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="/services/... atau https://..." />
          </div>
          {form.image_url && (
            <div className="flex items-center gap-4">
              <img src={form.image_url} alt="preview" className="w-16 h-16 object-cover border border-[#333] grayscale" onError={e => { e.target.style.display = 'none'; }} />
              <p className="text-gray-600 text-xs">Preview foto layanan</p>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all">
              Simpan
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3 border border-[#333] text-gray-400 text-xs font-bold uppercase hover:border-white transition-all">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===== Pagination Component =====
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex items-center gap-1 mt-6 justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center border border-[#333] text-gray-500 text-xs hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ←
      </button>
      {pages.map(page => {
        const show = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
        const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
        const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

        if (showEllipsisBefore || showEllipsisAfter) {
          return <span key={`ellipsis-${page}`} className="w-9 h-9 flex items-center justify-center text-gray-700 text-xs">…</span>;
        }
        if (!show) return null;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center border text-xs font-bold transition-all ${
              currentPage === page
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-[#333] text-gray-500 hover:border-accent hover:text-accent'
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center border border-[#333] text-gray-500 text-xs hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        →
      </button>
    </div>
  );
}

// ===== Main Page =====
export default function ServicesPage() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null); // null | 'add' | item object

  // Filter & Pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const load = () => fetch(API).then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  // Reset to page 1 whenever search or itemsPerPage changes
  useEffect(() => { setCurrentPage(1); }, [searchQuery, itemsPerPage]);

  const { showConfirm, showAlert } = useAdminDialog();

  const handleDelete = async (id) => {
    showConfirm(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus layanan ini? Tindakan ini tidak dapat dibatalkan.',
      async () => {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        showAlert('Berhasil', 'Layanan telah dihapus', 'success');
        load();
      }
    );
  };

  // === Filtering ===
  const filtered = items.filter(item => {
    return (
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.number.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // === Pagination calculation ===
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-8 border-b border-[#1e1e1e] pb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Manajemen</span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Layanan</h1>
          <p className="text-gray-600 text-xs mt-2">Total: {items.length} layanan terdaftar</p>
        </div>
        <button
          onClick={() => setModal('add')}
          className="px-6 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all"
        >
          + Tambah
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs pointer-events-none">⌕</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari layanan berdasarkan judul, deskripsi, atau nomor..."
            className="w-full bg-[#111] border border-[#333] text-white pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-accent transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Items Per Page */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-600 uppercase tracking-widest whitespace-nowrap">Per hal:</span>
          <select
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
            className="bg-[#111] border border-[#333] text-gray-400 text-xs px-3 py-2.5 focus:outline-none focus:border-accent transition-colors"
          >
            {ITEMS_PER_PAGE_OPTIONS.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Summary */}
      <div className="flex justify-between items-center mb-3 text-[10px] text-gray-600 uppercase tracking-widest">
        <span>
          Menampilkan {filtered.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + itemsPerPage, filtered.length)} dari {filtered.length} layanan
          {searchQuery && <span className="text-accent ml-2">· Pencarian: "{searchQuery}"</span>}
        </span>
        {totalPages > 1 && (
          <span>Halaman {currentPage} / {totalPages}</span>
        )}
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-[#1e1e1e] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1e1e1e]">
              <th className="admin-th w-14">Img</th>
              <th className="admin-th w-16">No.</th>
              <th className="admin-th">Judul</th>
              <th className="admin-th hidden lg:table-cell">Teks Gambar / URL</th>
              <th className="admin-th hidden md:table-cell">Deskripsi</th>
              <th className="admin-th w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                <td className="admin-td">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-8 h-8 rounded object-cover grayscale border border-[#333]" onError={e => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div className="w-8 h-8 bg-[#1e1e1e] border border-[#333] rounded"></div>
                  )}
                </td>
                <td className="admin-td font-mono text-accent">{item.number}</td>
                <td className="admin-td font-bold text-white text-sm">{item.title}</td>
                <td className="admin-td hidden lg:table-cell text-xs text-gray-500 font-mono">
                  {item.image_url ? (
                    <span className="truncate block max-w-[120px]" title={item.image_url}>{item.image_url}</span>
                  ) : (
                    <span className="text-gray-700 italic">-</span>
                  )}
                </td>
                <td className="admin-td text-gray-500 hidden md:table-cell text-xs leading-relaxed">
                  {item.description.length > 80 ? item.description.substring(0, 80) + '…' : item.description}
                </td>
                <td className="admin-td">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModal(item)}
                      className="px-3 py-1 border border-[#333] text-gray-400 text-[10px] uppercase hover:border-accent hover:text-accent transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 border border-[#333] text-gray-400 text-[10px] uppercase hover:border-red-500 hover:text-red-400 transition-all"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginated.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-700 text-sm">
              {searchQuery
                ? `Tidak ada hasil untuk "${searchQuery}"`
                : 'Belum ada data layanan.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-accent text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                Hapus pencarian
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
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
