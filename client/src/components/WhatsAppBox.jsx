import { useState } from 'react';

export default function WhatsAppBox() {
  const [message, setMessage] = useState('');

  const sendWA = () => {
    const phone = '6282291307707';
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="wa-box">
      <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4 block">
        Konsultasi Instan
      </span>
      <h4 className="text-xl font-bold text-white mb-4">
        Rencana Aksi &amp; Penawaran Khusus
      </h4>
      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        Kami analisis kebutuhan regulasi dan digital Anda. Ketik pesan Anda di bawah ini:
      </p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="wa-input h-24 resize-none"
        placeholder="Halo KKN Nusantara, saya ingin konsultasi mengenai..."
      />
      <button
        onClick={sendWA}
        className="w-full py-4 bg-accent text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all"
      >
        Kirim ke WhatsApp
      </button>
    </div>
  );
}
