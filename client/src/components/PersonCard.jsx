export default function PersonCard({ name, title, imageUrl }) {
  return (
    <div className="person-card">
      <div className="person-frame">
        <img src={imageUrl} alt={name} />
        <div className="person-overlay">
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
