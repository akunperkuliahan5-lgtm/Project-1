import { useState, useEffect } from 'react';
import { useAdminDialog } from './DialogContext';

const API = 'http://127.0.0.1:3001/api/clients';

function Modal({ item, onClose, onSave }) {
  const { showAlert } = useAdminDialog();
  const [form, setForm] = useState(
    item || { name: '', logo_url: '', website_url: '' }
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
    showAlert('Berhasil', `Data client berhasil ${item ? 'diperbarui' : 'ditambahkan'}`, 'success');
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] w-full max-w-lg">
        <div className="border-b border-[#222] px-8 py-6 flex justify-between items-center sticky top-0 bg-[#111]">
          <h2 className="text-sm font-black text-white uppercase tracking-widest">
            {item ? 'Edit Client' : 'Tambah Client'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="admin-label">Nama Client</label>
            <input className="admin-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Nama Client" required />
          </div>
          <div>
            <label className="admin-label">URL Logo</label>
            <input className="admin-input" value={form.logo_url} onChange={e => setForm({...form, logo_url: e.target.value})} placeholder="https://..." required />
          </div>
          <div>
            <label className="admin-label">Website URL (Optional)</label>
            <input className="admin-input" value={form.website_url} onChange={e => setForm({...form, website_url: e.target.value})} placeholder="https://example.com" />
          </div>
          {form.logo_url && (
            <div>
              <label className="admin-label">Preview</label>
              <img src={form.logo_url} alt="preview" className="h-16 object-contain border border-[#333] p-2 bg-white" onError={e => { e.target.style.display='none'; }} />
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all">Simpan</button>
            <button type="button" onClick={onClose} className="px-6 py-3 border border-[#333] text-gray-400 text-xs font-bold uppercase hover:border-white transition-all">Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ClientPage() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => fetch(API).then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const { showConfirm, showAlert } = useAdminDialog();

  const handleDelete = async (id) => {
    showConfirm(
      'Konfirmasi Hapus',
      'Hapus data client ini?',
      async () => {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        showAlert('Berhasil', 'Data client telah dihapus', 'success');
        load();
      }
    );
  };

  return (
    <div className="p-10">
      <div className="mb-8 border-b border-[#1e1e1e] pb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Manajemen</span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Client & Mitra</h1>
        </div>
        <button onClick={() => setModal('add')} className="px-6 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all">+ Tambah</button>
      </div>

      <div className="bg-[#111] border border-[#1e1e1e] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#1e1e1e]">
              <th className="admin-th w-24">Logo</th>
              <th className="admin-th">Nama Client</th>
              <th className="admin-th">Website</th>
              <th className="admin-th w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                <td className="admin-td">
                  <div className="w-16 h-10 bg-white border border-[#333] flex items-center justify-center p-1">
                    <img src={item.logo_url} alt={item.name} className="max-w-full max-h-full object-contain grayscale" onError={e => { e.target.style.display='none'; }} />
                  </div>
                </td>
                <td className="admin-td font-bold text-white text-sm">{item.name}</td>
                <td className="admin-td">
                  {item.website_url ? (
                    <a href={item.website_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-xs">
                      {item.website_url.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  ) : (
                    <span className="text-gray-700 text-xs">—</span>
                  )}
                </td>
                <td className="admin-td">
                  <div className="flex gap-2">
                    <button onClick={() => setModal(item)} className="px-3 py-1 border border-[#333] text-gray-400 text-[10px] uppercase hover:border-accent hover:text-accent transition-all">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="px-3 py-1 border border-[#333] text-gray-400 text-[10px] uppercase hover:border-red-500 hover:text-red-400 transition-all">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p className="text-gray-700 py-12 text-sm text-center">Belum ada data.</p>}
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
