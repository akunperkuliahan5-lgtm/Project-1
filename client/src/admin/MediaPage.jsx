import { useState, useEffect, useRef } from 'react';
import { useAdminDialog } from './DialogContext';

const API_BASE = 'http://127.0.0.1:3001/api';

export default function MediaPage() {
    const [media, setMedia] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const { showAlert, showConfirm } = useAdminDialog();

    const loadMedia = async () => {
        try {
            const res = await fetch(`${API_BASE}/media`);
            const data = await res.json();
            setMedia(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadMedia();
    }, []);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`${API_BASE}/upload`, {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                showAlert('Berhasil', 'Media berhasil diunggah', 'success');
                loadMedia();
            } else {
                showAlert('Error', 'Gagal mengunggah media', 'error');
            }
        } catch (err) {
            showAlert('Error', 'Gagal mengunggah media', 'error');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const handleDelete = () => {
        if (!selected) return;

        showConfirm(
            'Hapus Media',
            'Apakah Anda yakin ingin menghapus media ini secara permanen?',
            async () => {
                try {
                    const res = await fetch(`${API_BASE}/media/${selected.id}`, {
                        method: 'DELETE',
                    });
                    if (res.ok) {
                        showAlert('Berhasil', 'Media dihapus', 'success');
                        setSelected(null);
                        loadMedia();
                    }
                } catch (err) {
                    showAlert('Error', 'Gagal menghapus media', 'error');
                }
            }
        );
    };

    const copyUrl = () => {
        if (!selected) return;
        navigator.clipboard.writeText(selected.url);
        showAlert('Copied', 'URL disalin ke clipboard', 'success');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#0d0d0d]">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="px-10 py-8 border-b border-[#1e1e1e] flex justify-between items-end bg-[#0a0a0a]">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Perpustakaan</span>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Media</h1>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUpload}
                            className="hidden"
                            accept="image/*"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="px-6 py-3 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                        >
                            {isUploading ? 'Mengunggah...' : '+ Tambah Baru'}
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 bg-pattern">
                    {media.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-700">
                            <span className="text-6xl mb-4 opacity-10 font-black">EMPTY</span>
                            <p className="text-sm font-bold uppercase tracking-widest">Belum ada media diunggah</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {media.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelected(item)}
                                    className={`
                    aspect-square relative group cursor-pointer border-2 transition-all
                    ${selected?.id === item.id
                                            ? 'border-accent ring-2 ring-accent/20'
                                            : 'border-[#1e1e1e] hover:border-accent/40'}
                  `}
                                >
                                    <img
                                        src={item.url}
                                        alt={item.original_name}
                                        className={`w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 ${selected?.id === item.id ? 'grayscale-0' : ''}`}
                                    />
                                    {selected?.id === item.id && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-accent text-black flex items-center justify-center text-[10px] font-black">
                                            ✓
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Details (WordPress style) */}
            <aside className={`
        w-80 bg-[#111] border-l border-[#1e1e1e] flex flex-col transition-all duration-300
        ${selected ? 'translate-x-0' : 'translate-x-full opacity-0 pointer-events-none'}
      `}>
                {selected && (
                    <>
                        <div className="p-6 border-b border-[#1e1e1e] flex justify-between items-center bg-[#0d0d0d]">
                            <h2 className="text-[10px] font-black text-white uppercase tracking-widest">Detail Lampiran</h2>
                            <button onClick={() => setSelected(null)} className="text-gray-600 hover:text-white transition-colors">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="aspect-square bg-[#0a0a0a] border border-[#1e1e1e] overflow-hidden">
                                <img src={selected.url} alt="detail" className="w-full h-full object-contain" />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Nama File</h3>
                                    <p className="text-white text-xs font-mono break-all">{selected.original_name}</p>
                                </div>
                                <div>
                                    <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Diambil dari</h3>
                                    <p className="text-white text-xs font-mono break-all">{selected.filename}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Tipe</h3>
                                        <p className="text-white text-xs uppercase">{selected.mime_type.split('/')[1]}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Ukuran</h3>
                                        <p className="text-white text-xs">{(selected.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Tanggal Unggah</h3>
                                    <p className="text-white text-xs">{new Date(selected.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#1e1e1e] space-y-3">
                                <button
                                    onClick={copyUrl}
                                    className="w-full py-3 border border-[#333] text-gray-400 text-[10px] font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all"
                                >
                                    Salin URL Gambar
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-full py-3 border border-[#333] text-red-900 text-[10px] font-black uppercase tracking-widest hover:bg-red-900/10 hover:border-red-500 hover:text-red-500 transition-all"
                                >
                                    Hapus Permanen
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
