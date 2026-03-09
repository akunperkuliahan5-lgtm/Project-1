import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useApi from '../hooks/useApi';
import ServiceCard from '../components/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

// Fallback data in case API is not available
const fallbackServices = [
  { id: 1, number: '01', title: 'Perizinan PBG & SLF', description: 'Penyusunan dokumen teknis untuk mendapatkan Persetujuan Bangunan Gedung & Sertifikat Laik Fungsi resmi.' },
  { id: 2, number: '02', title: 'AMDAL & UKL-UPL', description: 'Kajian komprehensif dampak lingkungan untuk memastikan operasional bisnis yang berkelanjutan dan legal.' },
  { id: 3, number: '03', title: 'Digital Branding', description: 'Pengembangan website korporat dan aplikasi kustom untuk memperkuat kehadiran digital entitas bisnis Anda.' },
  { id: 4, number: '04', title: 'Pariwisata', description: 'Perencanaan destinasi wisata strategis mulai dari masterplan hingga manajemen kunjungan berkelanjutan.' },
  { id: 5, number: '05', title: 'Redrawing DED', description: 'Digitalisasi dan penyempurnaan Detail Engineering Design untuk akurasi konstruksi yang maksimal.' },
  { id: 6, number: '06', title: 'Audit Struktur', description: 'Investigasi forensik bangunan untuk menilai kekuatan, keamanan, dan masa pakai struktur gedung.' },
];

export default function ServicesSection() {
  const { data: services, error } = useApi('/services');
  const gridRef = useRef(null);

  const items = services || fallbackServices;

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.service-card');

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: card, start: 'top 90%' },
          opacity: 1, y: 0,
          duration: 1.5,
          delay: i * 0.1,
          ease: 'power2.out',
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [items]);

  return (
    <section id="services" className="py-40 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
              Expertise
            </span>
            <h2 className="section-title">Layanan Utama.</h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm">
            Solusi terintegrasi untuk perizinan, lingkungan, dan pengembangan bisnis pariwisata.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service) => (
            <ServiceCard
              key={service.id}
              number={service.number}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
