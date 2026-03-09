import useScrollReveal from '../hooks/useScrollReveal';
import WhatsAppBox from '../components/WhatsAppBox';

const checkItems = [
  'Kecepatan',
  'Profesional',
  'Terjamin',
  'Terintegrasi',
  'Kepastian Proses',
  'Real-time',
];

export default function WhyChooseUs() {
  const waRef = useScrollReveal();
  const checkRef = useScrollReveal({ delay: 0.15 });
  const textRef = useScrollReveal({ delay: 0.3 });

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 items-start">
          {/* Left: WhatsApp */}
          <div ref={waRef}>
            <WhatsAppBox />
          </div>

          {/* Middle: Checkboxes */}
          <div ref={checkRef} className="flex flex-col justify-center h-full space-y-2">
            {checkItems.map((item) => (
              <div key={item} className="checkbox-item">
                <div className="checkmark"></div>
                {item}
              </div>
            ))}
          </div>

          {/* Right: Text */}
          <div ref={textRef}>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-8 leading-[1]">
              Mengapa Pilih <br />
              <span className="text-accent">Kami?</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed italic border-l-2 border-accent pl-6">
              Tim ahli berpengalaman di bidang Perizinan Bangunan Gedung (PBG) dan Sertifikat Laik
              Fungsi (SLF) dan Pendampingan tuntas mulai dari pengumpulan dokumen, perhitungan
              teknis, hingga survei lapangan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
