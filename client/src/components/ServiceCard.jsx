export default function ServiceCard({ number, title, description, image_url }) {
  return (
    <div className="service-card p-0 reveal overflow-hidden flex flex-col group h-full cursor-pointer">
      {image_url && (
        <div className="h-48 w-full overflow-hidden relative border-b border-[#222]">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all z-10 duration-500"></div>
          <img src={image_url} alt={title} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700 transform group-hover:scale-105" />
          <div className="absolute top-6 left-6 z-20 service-number text-[32px] drop-shadow-2xl">{number}</div>
        </div>
      )}
      <div className={`p-10 flex-1 flex flex-col ${!image_url ? 'pt-12' : ''}`}>
        {!image_url && <div className="service-number mb-6">{number}</div>}
        <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter text-white group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{description}</p>
      </div>
    </div>
  );
}
