const logos = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Mandiri_logo.svg', alt: 'Mandiri' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Telkomsel_2021_logo.svg', alt: 'Telkomsel' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', alt: 'Google' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', alt: 'IBM' },
  { src: 'https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg', alt: 'BNI' },
];

export default function ClientMarquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-group">
        {logos.map((logo, i) => (
          <img key={i} src={logo.src} className="client-logo h-8" alt={logo.alt} />
        ))}
      </div>
      <div className="marquee-group">
        {logos.map((logo, i) => (
          <img key={`dup-${i}`} src={logo.src} className="client-logo h-8" alt={logo.alt} />
        ))}
      </div>
    </div>
  );
}
