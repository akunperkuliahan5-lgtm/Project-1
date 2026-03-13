import { useAdminDialog } from './DialogContext';
import MediaLibraryModal from './MediaLibraryModal';

const API = 'http://127.0.0.1:3001/api/portfolio';

function Modal({ item, onClose, onSave }) {
  const { showAlert } = useAdminDialog();
  const [form, setForm] = useState(
    item || { title: '', description: '', image_url: '', year: '', tag: '' }
  );
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = item ? 'PUT' : 'POST';
    const url = item ? `${API}/${item.id}` : API;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    showAlert('Berhasil', `Proyek berhasil ${item ? 'diperbarui' : 'ditambahkan'}`, 'success');
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="border-b border-[#222] px-8 py-6 flex justify-between items-center sticky top-0 bg-[#111]">
          <h2 className="text-sm font-black text-white uppercase tracking-widest">
            {item ? 'Edit Proyek' : 'Tambah Proyek'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="admin-label">Judul</label>
            <input className="admin-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Nama proyek" required />
          </div>
          <div>
            <label className="admin-label">Deskripsi</label>
            <textarea className="admin-input h-20 resize-none" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi proyek..." required />
          </div>
          <div>
            <label className="admin-label">Gambar Proyek</label>
            <div className="flex gap-2">
              <input
                className="admin-input flex-1"
                value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => setIsMediaOpen(true)}
                className="px-4 bg-[#222] text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all border border-[#333]"
              >
                Pilih Media
              </button>
            </div>
            <MediaLibraryModal
              isOpen={isMediaOpen}
              onClose={() => setIsMediaOpen(false)}
              onSelect={(url) => {
                setForm({ ...form, image_url: url });
                setIsMediaOpen(false);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Tahun</label>
              <input className="admin-input" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="2024" />
            </div>
            <div>
              <label className="admin-label">Tag</label>
              <input className="admin-input" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="2024 / APP / MONITOR" />
            </div>
          </div>
          {form.image_url && (
            <div>
              <label className="admin-label">Preview</label>
              <img src={form.image_url} alt="preview" className="w-full h-32 object-cover border border-[#333]" onError={e => { e.target.style.display = 'none'; }} />
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

export default function PortfolioPage() {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(null);

  const load = () => fetch(API).then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const { showConfirm, showAlert } = useAdminDialog();

  const handleDelete = async (id) => {
    showConfirm(
      'Konfirmasi Hapus',
      'Hapus proyek ini dari portofolio?',
      async () => {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        showAlert('Berhasil', 'Proyek telah dihapus', 'success');
        load();
      }
    );
  };

  return (
    <div className="p-10">
      <div className="mb-8 border-b border-[#1e1e1e] pb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Manajemen</span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Portofolio</h1>
        </div>
        <button onClick={() => setModal('add')} className="px-6 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all">+ Tambah</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-[#111] border border-[#1e1e1e] hover:border-accent/30 transition-all group">
            {item.image_url && (
              <div className="h-40 overflow-hidden">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover filter grayscale brightness-50 group-hover:brightness-75 transition-all" />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white text-sm flex-1">{item.title}</h3>
                <span className="text-[9px] border border-[#333] px-2 py-0.5 text-gray-600 ml-3 flex-shrink-0">{item.tag}</span>
              </div>
              <p className="text-gray-600 text-xs mb-4">{item.description}</p>
              <div className="flex gap-2">
                <button onClick={() => setModal(item)} className="px-3 py-1 border border-[#333] text-gray-400 text-[10px] uppercase hover:border-accent hover:text-accent transition-all">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="px-3 py-1 border border-[#333] text-gray-400 text-[10px] uppercase hover:border-red-500 hover:text-red-400 transition-all">Hapus</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-700 py-12 text-sm col-span-2 text-center">Belum ada data.</p>}
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
