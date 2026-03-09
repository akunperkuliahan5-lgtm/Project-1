import useScrollReveal from '../hooks/useScrollReveal';

export default function AboutSection() {
  const contentRef = useScrollReveal();

  return (
    <section id="about" className="py-40 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-24 items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-6 block">
            Visionary Firm
          </span>
          <h2 className="section-title mb-10">
            Merespon Peluang, <br />
            Menjaga <span className="text-accent italic font-light">Integritas</span>.
          </h2>
        </div>
        <div ref={contentRef}>
          <p className="text-lg leading-relaxed text-gray-400 mb-10">
            Didirikan pada tahun 2024, PT. Kolaborasi Konsultan Nusantara hadir sebagai mitra
            strategis dalam menavigasi kompleksitas regulasi dan manajemen pembangunan di Indonesia.
          </p>
          <div className="p-10 border border-gray-800 bg-secondary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
            <p className="italic text-gray-300 mb-6 text-xl">
              "Kami menyinergikan tenaga ahli lintas disiplin untuk memastikan setiap proyek
              mencapai standar kelaikan tertinggi."
            </p>
            <p className="font-bold uppercase tracking-widest text-accent text-xs">
              — Our Philosophy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
