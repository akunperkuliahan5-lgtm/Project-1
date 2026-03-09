import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'Tentang' },
    { href: '#services', label: 'Layanan' },
    { href: '#tahapan', label: 'Tahapan' },
    { href: '#portfolio', label: 'Portofolio' },
    { href: '#structure', label: 'Struktur' },
    { href: '#blog', label: 'Blog' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 px-6 flex justify-between items-center text-white transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5'
          : 'py-8'
      }`}
    >
      <div className="text-xl font-bold tracking-tighter">
        <span className="text-accent">KKN</span> Nusantara
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-[0.2em] items-center">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all"
        >
          Kontak
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-accent"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? 'Tutup' : 'Menu'}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/5 p-6 flex flex-col space-y-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-bold uppercase tracking-widest"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all text-center text-sm font-bold uppercase tracking-widest"
            onClick={() => setMobileOpen(false)}
          >
            Kontak
          </a>
        </div>
      )}
    </nav>
  );
}
