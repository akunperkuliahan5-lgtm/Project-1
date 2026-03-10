import { useState, useEffect } from 'react';

const fallbackLogos = [
  { logo_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Mandiri_logo.svg', name: 'Mandiri' },
  { logo_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Telkomsel_2021_logo.svg', name: 'Telkomsel' },
  { logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', name: 'Google' },
  { logo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', name: 'IBM' },
  { logo_url: 'https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg', name: 'BNI' },
];

export default function ClientMarquee() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/clients')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setClients(data);
        else setClients(fallbackLogos);
      })
      .catch(() => setClients(fallbackLogos));
  }, []);

  return (
    <div className="marquee-wrapper">
      <div className="marquee-group">
        {clients.map((client, i) => (
          <img key={`g1-${i}`} src={client.logo_url} className="client-logo h-8" alt={client.name} title={client.name} />
        ))}
      </div>
      <div className="marquee-group">
        {clients.map((client, i) => (
          <img key={`g2-${i}`} src={client.logo_url} className="client-logo h-8" alt={client.name} title={client.name} />
        ))}
      </div>
    </div>
  );
}
