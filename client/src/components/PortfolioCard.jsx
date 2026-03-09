export default function PortfolioCard({ title, description, imageUrl, tag }) {
  return (
    <div>
      <div className="portfolio-frame mb-8">
        <img src={imageUrl} alt={title} className="portfolio-img" />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold tracking-tighter text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <span className="text-[10px] border border-gray-800 px-3 py-1 text-gray-500 flex-shrink-0 ml-4">
          {tag}
        </span>
      </div>
    </div>
  );
}
