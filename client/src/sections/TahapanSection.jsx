import useScrollReveal from '../hooks/useScrollReveal';
import PhoneMockup from '../components/PhoneMockup';
import StepItem from '../components/StepItem';

const steps = [
  {
    number: '01',
    title: 'Konsultasi Awal',
    description: 'Identifikasi kebutuhan spesifik klien dan pemetaan regulasi yang relevan untuk proyek atau aplikasi.',
  },
  {
    number: '02',
    title: 'Pengerjaan Teknis',
    description: 'Penyusunan berkas, survei lapangan, redrawing, hingga proses submit dokumen ke dinas terkait.',
  },
  {
    number: '03',
    title: 'Pelatihan & Evaluasi',
    description: 'Penyusunan laporan kelaikan dan transfer pengetahuan kepada tenaga kerja lokal untuk keberlanjutan layanan.',
  },
  {
    number: '04',
    title: 'Legalitas Final',
    description: 'Penerbitan dokumen resmi (PBG, SLF, atau Persetujuan Lingkungan) sebagai fondasi hukum usaha Anda.',
  },
];

export default function TahapanSection() {
  const phoneRef = useScrollReveal();
  const textRef = useScrollReveal({ delay: 0.2 });

  return (
    <section id="tahapan" className="py-40 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        {/* Left: Phone Mockup */}
        <div ref={phoneRef} className="flex justify-center">
          <PhoneMockup />
        </div>

        {/* Right: Steps */}
        <div ref={textRef}>
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-6 block">
            Workflow
          </span>
          <h2 className="section-title mb-10">Tahapan Kerja.</h2>
          <p className="text-gray-400 mb-16 text-lg leading-relaxed">
            Kami menerapkan alur kerja yang terstruktur untuk memastikan setiap tahapan—mulai dari
            perizinan gedung (PBG/SLF), kajian lingkungan, hingga pengembangan website—berjalan
            sesuai target waktu dan regulasi yang berlaku.
          </p>

          <div className="space-y-12">
            {steps.map((step) => (
              <StepItem
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
