import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useApi from '../hooks/useApi';
import PersonCard from '../components/PersonCard';

gsap.registerPlugin(ScrollTrigger);

const fallbackLeadership = [
  { id: 1, name: 'Alqadri Achmad, S.Kom', title: 'Komisaris', image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600' },
  { id: 2, name: 'M. Dipta Chandra D.P.M, S.T', title: 'Direktur Utama', image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600' },
  { id: 3, name: 'Muh. Raiz Abidin, S.Pd, S.T, M.Pd', title: 'Tim Ahli Lingkungan', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600' },
  { id: 4, name: 'Masri Ridwan, S.Pd, M.Pd', title: 'Tim Ahli Pariwisata', image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600' },
];

const fallbackArchitecture = [
  { id: 5, name: 'Agus Alim Praya Maknun, S.Ars., M.Ars', title: 'Arsitek', image_url: 'https://images.unsplash.com/photo-1556157382-97dee2dcb04e?q=80&w=600' },
  { id: 6, name: 'Rahmat Irshal S.Ars', title: 'Arsitek', image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600' },
  { id: 7, name: 'Mardis Darwis, S.T., M.T. A.Md.B.Ing', title: 'Tenaga Ahli', image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600' },
  { id: 8, name: 'Ar. Hardy Marennu, S.T', title: 'Arsitek Profesional', image_url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=600' },
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
    <section id="structure" className="py-40 bg-black">
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

        <div ref={leaderRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {leadership.map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              title={person.title}
              imageUrl={person.image_url}
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

          <div ref={archRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {architecture.map((person) => (
              <PersonCard
                key={person.id}
                name={person.name}
                title={person.title}
                imageUrl={person.image_url}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
