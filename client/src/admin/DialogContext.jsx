import { createContext, useContext, useState, useCallback } from 'react';

const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'confirm', // 'confirm' | 'alert' | 'success'
    onConfirm: null,
    onCancel: null,
  });

  const showConfirm = useCallback((title, message, onConfirm, onCancel) => {
    setDialog({
      isOpen: true,
      title,
      message,
      type: 'confirm',
      onConfirm: () => {
        setDialog(prev => ({ ...prev, isOpen: false }));
        if (onConfirm) onConfirm();
      },
      onCancel: () => {
        setDialog(prev => ({ ...prev, isOpen: false }));
        if (onCancel) onCancel();
      }
    });
  }, []);

  const showAlert = useCallback((title, message, type = 'alert') => {
    setDialog({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: () => setDialog(prev => ({ ...prev, isOpen: false })),
      onCancel: () => setDialog(prev => ({ ...prev, isOpen: false })),
    });
  }, []);

  return (
    <DialogContext.Provider value={{ showConfirm, showAlert }}>
      {children}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#111] border border-[#222] w-full max-w-sm overflow-hidden shadow-2xl shadow-black/50">
            {/* Header Stripe */}
            <div className={`h-1 w-full ${
              dialog.type === 'success' ? 'bg-green-500' : 
              dialog.type === 'alert' ? 'bg-red-500' : 'bg-accent'
            }`}></div>
            
            <div className="p-8">
              <h3 className="text-white font-black uppercase tracking-widest text-xs mb-3">
                {dialog.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {dialog.message}
              </p>
              
              <div className="flex gap-3">
                {dialog.type === 'confirm' && (
                  <button 
                    onClick={dialog.onCancel}
                    className="flex-1 py-3 border border-[#333] text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-white hover:border-white transition-all"
                  >
                    Batal
                  </button>
                )}
                <button 
                  onClick={dialog.onConfirm}
                  className={`flex-1 py-3 font-black text-[10px] uppercase tracking-widest transition-all ${
                    dialog.type === 'alert' ? 'bg-red-500 text-white hover:bg-red-600' : 
                    dialog.type === 'success' ? 'bg-green-500 text-white hover:bg-green-600' :
                    'bg-accent text-black hover:bg-white'
                  }`}
                >
                  {dialog.type === 'confirm' ? 'Lanjutkan' : 'Ok'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

export const useAdminDialog = () => useContext(DialogContext);
