import { useState, useEffect, useRef } from 'react';
import { useAdminDialog } from './DialogContext';

const API_BASE = 'http://127.0.0.1:3001/api';

export default function MediaLibraryModal({ isOpen, onClose, onSelect }) {
    const [media, setMedia] = useState([]);
    const [selected, setSelected] = useState(null);
    const [tab, setTab] = useState('library'); // 'library' or 'upload'
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const { showAlert } = useAdminDialog();

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
        if (isOpen) {
            loadMedia();
            setSelected(null);
            setTab('library');
        }
    }, [isOpen]);

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
            const data = await res.json();
            if (res.ok) {
                showAlert('Berhasil', 'Media berhasil diunggah', 'success');
                await loadMedia();
                setTab('library');
                // Auto select the newly uploaded image
                const newMedia = data.imageUrl; // The upload endpoint returns imageUrl
                // Actually we need the whole object from DB, but loadMedia will refresh it.
            }
        } catch (err) {
            showAlert('Error', 'Gagal mengunggah media', 'error');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-10">
            <div className="bg-[#0d0d0d] border border-[#222] w-full max-w-6xl h-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="border-b border-[#222] px-8 py-6 flex justify-between items-center bg-[#111]">
                    <div className="flex gap-8">
                        <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">Pustaka Media</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setTab('library')}
                                className={`text-[10px] font-bold uppercase tracking-widest transition-all ${tab === 'library' ? 'text-accent border-b border-accent pb-1' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                                Pustaka
                            </button>
                            <button
                                onClick={() => setTab('upload')}
                                className={`text-[10px] font-bold uppercase tracking-widest transition-all ${tab === 'upload' ? 'text-accent border-b border-accent pb-1' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                                Unggah Berkas
                            </button>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors text-xl">✕</button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Main Area */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {tab === 'upload' ? (
                            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-[#222] bg-[#0a0a0a] rounded-lg">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <div className="text-center">
                                    <div className="text-accent text-4xl mb-4 group-hover:scale-110 transition-transform cursor-pointer" onClick={() => fileInputRef.current?.click()}>☁</div>
                                    <p className="text-white text-sm font-bold uppercase tracking-widest mb-2">Lepaskan berkas untuk diunggah</p>
                                    <p className="text-gray-600 text-[10px] mb-6">ATAU</p>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                        className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-all"
                                    >
                                        {isUploading ? 'Mengunggah...' : 'Pilih Berkas'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                {media.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelected(item)}
                                        className={`
                      aspect-square relative group cursor-pointer border-2 transition-all overflow-hidden
                      ${selected?.id === item.id
                                                ? 'border-accent ring-2 ring-accent/20'
                                                : 'border-[#1e1e1e] hover:border-[#333]'}
                    `}
                                    >
                                        <img
                                            src={item.url}
                                            alt={item.original_name}
                                            className={`w-full h-full object-cover transition-all duration-700 ${selected?.id === item.id ? 'scale-110 brightness-110' : 'grayscale group-hover:grayscale-0'}`}
                                        />
                                        {selected?.id === item.id && (
                                            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                                                <div className="w-6 h-6 bg-accent text-black rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">✓</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-72 bg-[#0a0a0a] border-l border-[#222] p-6 overflow-y-auto hidden md:block select-none">
                        {selected ? (
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Detail Media</h3>
                                <div className="aspect-video bg-[#000] border border-[#222] flex items-center justify-center overflow-hidden">
                                    <img src={selected.url} alt="preview" className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase break-all">{selected.original_name}</p>
                                    <p className="text-[9px] text-gray-700 uppercase">{new Date(selected.created_at).toLocaleDateString()} — {(selected.size / 1024).toFixed(0)} KB</p>
                                </div>
                                <div className="pt-4 border-t border-[#222]">
                                    <button
                                        onClick={() => onSelect(selected.url)}
                                        className="w-full py-4 bg-accent text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-accent/10"
                                    >
                                        Pilih Gambar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 border border-[#222] rounded-full flex items-center justify-center text-gray-800 text-xl mb-4">i</div>
                                <p className="text-gray-700 text-[10px] font-bold uppercase tracking-widest">Pilih gambar untuk melihat detail</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer for Mobile */}
                <div className="md:hidden border-t border-[#222] p-4 bg-[#111]">
                    <button
                        disabled={!selected}
                        onClick={() => onSelect(selected.url)}
                        className="w-full py-4 bg-accent text-black font-black text-xs uppercase tracking-widest disabled:opacity-30"
                    >
                        Pilih Gambar
                    </button>
                </div>
            </div>
        </div>
    );
}
