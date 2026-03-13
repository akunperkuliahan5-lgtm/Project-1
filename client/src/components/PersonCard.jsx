export default function PersonCard({ name, title, imageUrl, contact, wa, ig }) {
  return (
    <div className="person-card group">
      <div className="person-frame">
        <img src={imageUrl} alt={name} />
        <div className="person-overlay">
          <div className="mb-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {contact && (
              <a href={`mailto:${contact}`} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all">
                <span className="text-[10px] font-black">✉</span>
              </a>
            )}
            {wa && (
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-green-500 hover:text-white transition-all">
                <span className="text-[10px] font-black">WA</span>
              </a>
            )}
            {ig && (
              <a href={`https://instagram.com/${ig}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-pink-500 hover:text-white transition-all">
                <span className="text-[10px] font-black">IG</span>
              </a>
            )}
          </div>
          <h4 className="text-xs font-black uppercase text-white leading-tight">
            {name}
          </h4>
          <p className="text-[9px] text-accent uppercase tracking-widest mt-2 font-bold">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

