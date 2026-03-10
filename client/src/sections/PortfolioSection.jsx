import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useApi from '../hooks/useApi';
import PortfolioCard from '../components/PortfolioCard';

gsap.registerPlugin(ScrollTrigger);

const fallbackPortfolio = [
  {
    id: 1,
    title: 'Summarecon Mutiara Makassar',
    description: 'Dokumen Lingkungan UKL-UPL (Morizen, Ville Park, Ambani)',
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200',
    tag: '2024',
  },
  {
    id: 2,
    title: 'Izin PBG Hunian & Komersial',
    description: 'Proyek Ruko Hengky G, Imelda Unggul, & Hunian Grand Rivera',
    image_url: 'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=1200',
    tag: '2024',
  },
  {
    id: 3,
    title: 'Aplikasi Inventory GUPUSMU IV',
    description: 'Sistem manajemen persenjataan & inventaris terintegrasi',
    image_url: 'https://images.unsplash.com/photo-1551288049-bbbda546697c?q=80&w=1200',
    tag: 'APP',
  },
  {
    id: 4,
    title: 'PT. Sulawesi Kapur Generasi Mandiri',
    description: 'Monitoring & Kepatuhan Lingkungan Berkala (Maros)',
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200',
    tag: 'MONITOR',
  },
];

export default function PortfolioSection() {
  const { data: portfolio } = useApi('/portfolio');
  const gridRef = useRef(null);

  const items = portfolio || fallbackPortfolio;

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;

    Array.from(cards).forEach((card, i) => {
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
    <section id="portfolio" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
            Archive
          </span>
          <h2 className="section-title">Proyek Pilihan.</h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item) => (
            <PortfolioCard
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.image_url}
              tag={item.tag}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
