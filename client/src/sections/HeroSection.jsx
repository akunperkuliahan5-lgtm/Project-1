import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const hookRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Initial state
      gsap.set([titleRef.current, hookRef.current, descRef.current, ctaRef.current], { 
        y: 40, 
        opacity: 0 
      });

      // Animate in
      tl.to(titleRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' })
        .to(hookRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, '-=0.8')
        .to(descRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, '-=0.6')
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, '-=0.4');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 bg-[#050505] text-white relative overflow-hidden hero-bg"
    >
      {/* Visual Embellishment to reduce "Dead Black Space" */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="z-10 text-center max-w-4xl pt-20">
        <h1
          ref={titleRef}
          className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[1]"
        >
          PT. Kolaborasi <br />
          <span className="gold-gradient-text">Konsultan Nusantara</span>
        </h1>
        <p
          ref={hookRef}
          className="text-lg md:text-2xl font-bold tracking-tight text-white mb-6"
        >
          Segera Terbitkan Izin &amp; Bangun Kehadiran Digital Anda Tanpa Ribet!
        </p>
        <p
          ref={descRef}
          className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Mulai Dari perizinan bangunan, sertifikat laik fungsi, kajian lingkungan (AMDAL),
          hingga website profesional. Semua solusi kami dirancang untuk mempercepat proses dan
          mengangkat reputasi bisnis Anda.
        </p>
        <div ref={ctaRef} className="mt-12 flex flex-col items-center gap-6">
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
