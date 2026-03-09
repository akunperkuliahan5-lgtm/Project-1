export default function BlogCard({ category, title, excerpt }) {
  return (
    <a href="#" className="blog-card p-12 group block">
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-6 block">
        {category}
      </span>
      <h3 className="text-xl font-bold mb-6 group-hover:text-accent transition-colors text-white">
        {title}
      </h3>
      <p className="text-xs text-gray-500 mb-10 leading-relaxed">{excerpt}</p>
      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-accent">
        READ MORE{' '}
        <span className="ml-3 group-hover:translate-x-3 transition-transform">
          →
        </span>
      </div>
    </a>
  );
}
