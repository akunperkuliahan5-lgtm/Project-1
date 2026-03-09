const API_BASE = 'http://localhost:3001/api';

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function fetchPortfolio() {
  const res = await fetch(`${API_BASE}/portfolio`);
  if (!res.ok) throw new Error('Failed to fetch portfolio');
  return res.json();
}

export async function fetchTeam(group) {
  const url = group ? `${API_BASE}/team?group=${group}` : `${API_BASE}/team`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch team');
  return res.json();
}

export async function fetchBlog() {
  const res = await fetch(`${API_BASE}/blog`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}
