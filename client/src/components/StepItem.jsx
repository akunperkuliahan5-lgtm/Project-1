export default function StepItem({ number, title, description }) {
  return (
    <div className="flex gap-8 group">
      <div className="step-circle flex-shrink-0">{number}</div>
      <div>
        <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
