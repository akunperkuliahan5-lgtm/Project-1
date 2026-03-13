import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useApi from '../hooks/useApi';
import PersonCard from '../components/PersonCard';

gsap.registerPlugin(ScrollTrigger);

const fallbackLeadership = [
  { id: 1, name: 'Alqadri Achmad, S.Kom', title: 'Komisaris', image_url: '/foto/alqadri.jpeg' },
  { id: 2, name: 'M. Dipta Chandra D.P.M, S.T', title: 'Direktur Utama', image_url: '/foto/dipta.jpeg' },
  { id: 3, name: 'Muh. Raiz Abidin, S.Pd, S.T, M.Pd', title: 'Tim Ahli Lingkungan', image_url: '/foto/raiz.jpeg' },
  { id: 4, name: 'Masri Ridwan, S.Pd, M.Pd', title: 'Tim Ahli Pariwisata', image_url: '/foto/masri.jpeg' },
];

const fallbackArchitecture = [
  { id: 5, name: 'Agus Alim Praya Maknun, S.Ars., M.Ars', title: 'Arsitek', image_url: '/foto/agus.jpeg' },
  { id: 6, name: 'Rahmat Irshal S.Ars', title: 'Arsitek', image_url: '/foto/rahmat.jpeg' },
  { id: 7, name: 'Mardis Darwis, S.T., M.T. A.Md.B.Ing', title: 'Tenaga Ahli', image_url: '/foto/mardis.jpeg' },
  { id: 8, name: 'Ar. Hardy Marennu, S.T', title: 'Arsitek Profesional', image_url: '/foto/hardy.jpeg' },
];

export default function StructureSection() {
  const { data: teamData } = useApi('/team');
  const leaderRef = useRef(null);
  const archRef = useRef(null);

  const leadership = teamData
    ? teamData.filter((m) => m.team_group === 'leadership')
    : fallbackLeadership;

  const architecture = teamData
    ? teamData.filter((m) => m.team_group === 'architecture')
    : fallbackArchitecture;

  useEffect(() => {
    const animateCards = (container) => {
      if (!container) return;
      const cards = container.querySelectorAll('.person-card');
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
    };

    animateCards(leaderRef.current);
    animateCards(archRef.current);

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [leadership, architecture]);

  return (
    <section id="structure" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Leadership */}
        <div className="text-center mb-24">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-accent mb-4 block">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Struktur Organisasi
          </h2>
        </div>

        <div ref={leaderRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              title={person.title}
              imageUrl={person.image_url}
              contact={person.contact}
              wa={person.wa}
              ig={person.ig}
            />
          ))}
        </div>

        {/* Architecture Team */}
        <div className="mt-40">
          <div className="text-center mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-accent mb-4 block">
              Creative Experts
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Tim Ahli Arsitektur
            </h2>
          </div>

          <div ref={archRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {architecture.map((person) => (
              <PersonCard
                key={person.id}
                name={person.name}
                title={person.title}
                imageUrl={person.image_url}
                contact={person.contact}
                wa={person.wa}
                ig={person.ig}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
