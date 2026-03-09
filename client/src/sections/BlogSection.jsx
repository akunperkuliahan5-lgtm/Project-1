import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useApi from '../hooks/useApi';
import BlogCard from '../components/BlogCard';

gsap.registerPlugin(ScrollTrigger);

const fallbackBlogs = [
  {
    id: 1,
    category: 'Tourism',
    title: 'Strategi Destinasi Berkelanjutan 2025',
    excerpt: 'Implementasi green tourism dalam pengelolaan kawasan wisata Nusantara.',
  },
  {
    id: 2,
    category: 'Environment',
    title: 'Esensi AMDAL Bagi Skala Industri',
    excerpt: 'Prosedur terbaru pengurusan dokumen lingkungan melalui sistem terpadu.',
  },
  {
    id: 3,
    category: 'Building Code',
    title: 'Transisi IMB ke PBG: Hal Penting',
    excerpt: 'Langkah-langkah krusial dalam migrasi dokumen perizinan bangunan lama ke baru.',
  },
];

export default function BlogSection() {
  const { data: blogs } = useApi('/blog');
  const gridRef = useRef(null);

  const items = blogs || fallbackBlogs;

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
    <section id="blog" className="py-40 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
              Knowledge Hub
            </span>
            <h2 className="section-title">Artikel Terbaru.</h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm">
            Informasi terkini mengenai kebijakan tata ruang, kelestarian lingkungan, dan teknologi.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {items.map((blog) => (
            <BlogCard
              key={blog.id}
              category={blog.category}
              title={blog.title}
              excerpt={blog.excerpt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
