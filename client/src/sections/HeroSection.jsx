import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const titleRef = useRef(null);
  const hookRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out' })
      .fromTo(hookRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=1')
      .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.8')
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '-=0.6');

    return () => tl.kill();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-black text-white relative overflow-hidden hero-bg">
      <div className="z-10 text-center max-w-4xl pt-20">
        <h1
          ref={titleRef}
          className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[1]"
          style={{ opacity: 0 }}
        >
          PT. Kolaborasi <br />
          <span className="gold-gradient-text">Konsultan Nusantara</span>
        </h1>
        <p
          ref={hookRef}
          className="text-lg md:text-2xl font-bold tracking-tight text-white mb-6"
          style={{ opacity: 0 }}
        >
          Segera Terbitkan Izin &amp; Bangun Kehadiran Digital Anda Tanpa Ribet!
        </p>
        <p
          ref={descRef}
          className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed"
          style={{ opacity: 0 }}
        >
          Mulai Dari perizinan bangunan, sertifikat laik fungsi, kajian lingkungan (AMDAL),
          hingga website profesional. semua solusi kami dirancang untuk mempercepat proses dan
          mengangkat reputasi bisnis Anda.
        </p>
        <div ref={ctaRef} className="mt-12 flex flex-col items-center gap-6" style={{ opacity: 0 }}>
          <a
            href="#contact"
            className="px-10 py-4 bg-accent text-black font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-accent/20"
          >
            Mulai Konsultasi
          </a>
          <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
