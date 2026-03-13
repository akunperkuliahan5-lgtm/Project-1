import { useEffect, useState, useMemo } from 'react';

const API = 'http://127.0.0.1:3001/api';

/* ═══════════════════════════════════════════
   MINI SVG AREA CHART (Pure inline SVG)
   ═══════════════════════════════════════════ */
function AreaChart({ data, width = 320, height = 120, colorStart = '#00f2ff', colorEnd = '#bc13fe', id = 'chart' }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const padding = 8;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * chartW;
    const y = padding + chartH - ((v - min) / range) * chartH;
    return `${x},${y}`;
  });

  const linePath = `M${points.join(' L')}`;
  const areaPath = `${linePath} L${padding + chartW},${padding + chartH} L${padding},${padding + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 20px rgba(0,242,255,0.08))' }}>
      <defs>
        <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorStart} stopOpacity="0.25" />
          <stop offset="50%" stopColor={colorEnd} stopOpacity="0.08" />
          <stop offset="100%" stopColor={colorEnd} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={colorStart} />
          <stop offset="100%" stopColor={colorEnd} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${id}-gradient)`} />
      <path d={linePath} fill="none" stroke={`url(#${id}-line)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* End dot */}
      {data.length > 0 && (
        <circle
          cx={padding + chartW}
          cy={padding + chartH - ((data[data.length - 1] - min) / range) * chartH}
          r="3"
          fill={colorEnd}
          style={{ filter: `drop-shadow(0 0 6px ${colorEnd})` }}
        />
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   BAR CHART (Pure inline SVG)
   ═══════════════════════════════════════════ */
function BarChart({ data, labels, width = 400, height = 180, colorStart = '#00f2ff', colorEnd = '#bc13fe', id = 'bar' }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const padding = { top: 10, bottom: 30, left: 10, right: 10 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const barW = chartW / data.length * 0.5;
  const gap = chartW / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <linearGradient id={`${id}-bar-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorStart} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colorEnd} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
        <line
          key={frac}
          x1={padding.left}
          y1={padding.top + chartH * (1 - frac)}
          x2={width - padding.right}
          y2={padding.top + chartH * (1 - frac)}
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
        />
      ))}
      {data.map((v, i) => {
        const barH = (v / (max || 1)) * chartH;
        const x = padding.left + gap * i + (gap - barW) / 2;
        const y = padding.top + chartH - barH;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx="4"
              fill={`url(#${id}-bar-grad)`}
              className="animate-bar-grow origin-bottom"
              style={{ animationDelay: `${i * 0.08}s`, transformOrigin: `${x + barW / 2}px ${padding.top + chartH}px`, opacity: 0.85 }}
            />
            {labels && labels[i] && (
              <text
                x={x + barW / 2}
                y={height - 8}
                textAnchor="middle"
                fill="rgba(255,255,255,0.2)"
                fontSize="9"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
              >
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   DONUT CHART (Pure inline SVG)
   ═══════════════════════════════════════════ */
function DonutChart({ segments, size = 140, thickness = 14 }) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let offset = 0;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}>
      {/* Background ring */}
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={thickness} />
      {segments.map((seg, i) => {
        const len = (seg.value / total) * circumference;
        const dashArray = `${len} ${circumference - len}`;
        const dashOffset = -offset;
        offset += len;
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              filter: `drop-shadow(0 0 4px ${seg.color}40)`,
              transition: 'all 1s ease',
            }}
          />
        );
      })}
      {/* Center text */}
      <text x="50%" y="48%" textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="Inter, sans-serif">
        {total}
      </text>
      <text x="50%" y="62%" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif" textTransform="uppercase">
        TOTAL
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   STAT CARD COMPONENT
   ═══════════════════════════════════════════ */
function StatCard({ label, value, icon, color, trend, trendValue, sparkData, delay = 0 }) {
  return (
    <div
      className="stat-card-float p-6 group animate-slide-up opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -right-6 -top-6 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-700"
        style={{ backgroundColor: color }}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">{label}</span>
          <span
            className="w-9 h-9 flex items-center justify-center rounded-xl text-base transition-all duration-300 group-hover:scale-110"
            style={{
              background: `${color}10`,
              color: color,
              border: `1px solid ${color}15`,
            }}
          >
            {icon}
          </span>
        </div>

        {/* Value */}
        <div className="flex items-end gap-3 mb-3">
          <p className="text-4xl font-black text-white tracking-tighter leading-none">
            {value ?? <span className="shimmer-line inline-block w-12 h-8 rounded-lg"></span>}
          </p>
          {trend && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
              trend === 'up'
                ? 'text-emerald-400 bg-emerald-400/10'
                : 'text-red-400 bg-red-400/10'
            }`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </span>
          )}
        </div>

        {/* Sparkline */}
        {sparkData && (
          <div className="h-10 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <AreaChart data={sparkData} width={200} height={40} colorStart={color} colorEnd={color} id={`spark-${label}`} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN DASHBOARD PAGE
   ═══════════════════════════════════════════ */
export default function DashboardPage() {
  const [stats, setStats] = useState({ services: null, portfolio: null, team: null, blog: null });

  useEffect(() => {
    async function load() {
      try {
        const [s, p, t, b] = await Promise.all([
          fetch(`${API}/services`).then(r => r.json()),
          fetch(`${API}/portfolio`).then(r => r.json()),
          fetch(`${API}/team`).then(r => r.json()),
          fetch(`${API}/blog`).then(r => r.json()),
        ]);
        setStats({ services: s.length, portfolio: p.length, team: t.length, blog: b.length });
      } catch (_) {}
    }
    load();
  }, []);

  // Simulated chart data
  const revenueData = useMemo(() => [18, 25, 22, 35, 30, 45, 40, 55, 50, 62, 58, 72], []);
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const activityData = useMemo(() => [4, 8, 6, 12, 9, 15, 11, 18, 14, 20, 16, 22], []);
  const sparkServices = useMemo(() => [3, 5, 4, 7, 6, 8, 7, 9], []);
  const sparkPortfolio = useMemo(() => [2, 4, 3, 6, 5, 8, 7, 9], []);
  const sparkTeam = useMemo(() => [4, 4, 5, 5, 6, 6, 7, 7], []);
  const sparkBlog = useMemo(() => [1, 3, 2, 5, 4, 7, 6, 8], []);

  const recentActivities = [
    { action: 'Portofolio baru ditambahkan', time: '2 menit lalu', type: 'portfolio', color: '#bc13fe' },
    { action: 'Blog artikel dipublikasikan', time: '15 menit lalu', type: 'blog', color: '#b08d57' },
    { action: 'Tim anggota diperbarui', time: '1 jam lalu', type: 'team', color: '#ffffff' },
    { action: 'Layanan baru aktif', time: '3 jam lalu', type: 'service', color: '#00f2ff' },
    { action: 'Media file diunggah', time: '5 jam lalu', type: 'media', color: '#6366f1' },
  ];

  const topServices = [
    { name: 'Konsultasi Bisnis', visits: 248, fill: 92 },
    { name: 'Manajemen Proyek', visits: 186, fill: 70 },
    { name: 'Riset & Analisis', visits: 145, fill: 55 },
    { name: 'Pelatihan SDM', visits: 98, fill: 37 },
  ];

  const donutSegments = useMemo(() => [
    { value: stats.services || 4, color: '#00f2ff', label: 'Layanan' },
    { value: stats.portfolio || 6, color: '#bc13fe', label: 'Portofolio' },
    { value: stats.team || 5, color: '#ffffff', label: 'Tim' },
    { value: stats.blog || 3, color: '#b08d57', label: 'Blog' },
  ], [stats]);

  return (
    <div className="relative space-y-8">

      {/* ═══ ROW 1: WELCOME HERO + STATS ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <div className="xl:col-span-1 stat-card-float p-8 animate-slide-up opacity-0 overflow-hidden group" style={{ animationDelay: '0s' }}>
          {/* Decorative orbs */}
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700"
            style={{ background: 'radial-gradient(circle, rgba(0,242,255,0.3), transparent)' }}></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(188,19,254,0.4), transparent)' }}></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-[2px] w-5 rounded-full" style={{ background: 'var(--neon-cyan)' }}></div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-neon-cyan/60">System Overview</span>
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight leading-tight mb-2">
              Welcome<br/>
              <span className="neo-gradient-text">back, Admin</span>
            </h1>

            <p className="text-[11px] text-white/20 leading-relaxed mb-6 max-w-xs">
              Central hub for <span className="text-white/40">PT. Kolaborasi Konsultan Nusantara</span> infrastructure management.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="neon-dot" style={{ background: '#00f2ff' }}></div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/25">
                  Status: <span className="text-emerald-400">Operational</span>
                </span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/[0.03] flex items-center gap-3">
              <span className="text-[9px] text-white/15 font-bold uppercase tracking-wider">
                Synced: {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.03] to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="xl:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Layanan"
            value={stats.services}
            icon="◈"
            color="#00f2ff"
            trend="up"
            trendValue="+12%"
            sparkData={sparkServices}
            delay={0.05}
          />
          <StatCard
            label="Portofolio"
            value={stats.portfolio}
            icon="◉"
            color="#bc13fe"
            trend="up"
            trendValue="+8%"
            sparkData={sparkPortfolio}
            delay={0.1}
          />
          <StatCard
            label="Tim Kami"
            value={stats.team}
            icon="◎"
            color="#ffffff"
            trend="up"
            trendValue="+3%"
            sparkData={sparkTeam}
            delay={0.15}
          />
          <StatCard
            label="Artikel Blog"
            value={stats.blog}
            icon="◇"
            color="#b08d57"
            trend="up"
            trendValue="+18%"
            sparkData={sparkBlog}
            delay={0.2}
          />
        </div>
      </div>

      {/* ═══ ROW 2: PERFORMANCE CHART + DONUT ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue / Performance Chart */}
        <div className="xl:col-span-2 stat-card-float p-7 animate-slide-up opacity-0" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
                <span className="h-4 w-[2px] rounded-full" style={{ background: 'var(--neon-cyan)' }}></span>
                Performance Overview
              </h3>
              <p className="text-[9px] text-white/15 mt-1 tracking-wider uppercase">Monthly engagement metrics</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/20">
                <div className="w-2 h-2 rounded-full" style={{ background: '#00f2ff' }}></div>
                Views
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/20">
                <div className="w-2 h-2 rounded-full" style={{ background: '#bc13fe' }}></div>
                Visits
              </div>
            </div>
          </div>
          <div className="h-48">
            <BarChart
              data={revenueData}
              labels={monthLabels}
              width={700}
              height={180}
              id="performance"
            />
          </div>
        </div>

        {/* Donut Chart Distribution */}
        <div className="stat-card-float p-7 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3 mb-6">
            <span className="h-4 w-[2px] rounded-full" style={{ background: 'var(--neon-violet)' }}></span>
            Content Distribution
          </h3>
          <div className="flex justify-center mb-5">
            <div className="w-32 h-32">
              <DonutChart segments={donutSegments} size={140} thickness={12} />
            </div>
          </div>
          {/* Legend */}
          <div className="space-y-2.5">
            {donutSegments.map((seg, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: seg.color, boxShadow: `0 0 6px ${seg.color}40` }}></div>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{seg.label}</span>
                </div>
                <span className="text-[11px] font-black text-white/60">{seg.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ROW 3: TOP SERVICES + RECENT ACTIVITY ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="stat-card-float p-7 animate-slide-up opacity-0" style={{ animationDelay: '0.35s' }}>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3 mb-7">
            <span className="h-4 w-[2px] rounded-full" style={{ background: 'var(--neon-cyan)' }}></span>
            Top Performing Services
          </h3>
          <div className="space-y-5">
            {topServices.map((svc, i) => (
              <div key={i} className="group/svc">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-white/50 group-hover/svc:text-white/80 transition-colors">{svc.name}</span>
                  <span className="text-[10px] font-black text-white/30">{svc.visits} <span className="text-white/15">views</span></span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${svc.fill}%`,
                      background: `linear-gradient(90deg, #00f2ff, #bc13fe)`,
                      boxShadow: '0 0 8px rgba(0,242,255,0.2)',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="stat-card-float p-7 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3 mb-7">
            <span className="h-4 w-[2px] rounded-full" style={{ background: '#b08d57' }}></span>
            Recent Activity
          </h3>
          <div className="space-y-1">
            {recentActivities.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/[0.015] transition-all group/act"
              >
                {/* Icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/act:scale-110"
                  style={{
                    background: `${act.color}08`,
                    border: `1px solid ${act.color}12`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: act.color, boxShadow: `0 0 6px ${act.color}40` }}></div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-white/50 group-hover/act:text-white/70 transition-colors truncate">
                    {act.action}
                  </p>
                  <p className="text-[9px] text-white/15 font-semibold uppercase tracking-wider mt-0.5">{act.time}</p>
                </div>

                {/* Arrow */}
                <span className="text-white/10 text-xs group-hover/act:text-white/30 transition-all group-hover/act:translate-x-0.5">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ROW 4: ENGAGEMENT TREND + QUICK ACCESS ═══ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Engagement Trend */}
        <div className="xl:col-span-2 stat-card-float p-7 animate-slide-up opacity-0" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
                <span className="h-4 w-[2px] rounded-full" style={{ background: '#6366f1' }}></span>
                Engagement Trend
              </h3>
              <p className="text-[9px] text-white/15 mt-1 tracking-wider uppercase">Weekly active interactions</p>
            </div>
            <div className="flex items-center gap-2">
              {['7D', '1M', '3M'].map((period, i) => (
                <button
                  key={period}
                  className={`text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all ${
                    i === 1
                      ? 'bg-white/[0.05] text-white/60 border border-white/[0.06]'
                      : 'text-white/20 hover:text-white/40'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-32">
            <AreaChart
              data={activityData}
              width={600}
              height={130}
              colorStart="#6366f1"
              colorEnd="#bc13fe"
              id="engagement"
            />
          </div>
        </div>

        {/* Quick Access */}
        <div className="stat-card-float p-7 animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-3 mb-6">
            <span className="h-4 w-[2px] rounded-full" style={{ background: '#b08d57' }}></span>
            Quick Access
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/admin/services', label: 'Services', icon: '◈', color: '#00f2ff' },
              { href: '/admin/portfolio', label: 'Portfolio', icon: '◉', color: '#bc13fe' },
              { href: '/admin/team', label: 'Structure', icon: '◎', color: '#ffffff' },
              { href: '/admin/blog', label: 'Journal', icon: '◇', color: '#b08d57' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="p-4 rounded-xl hover:scale-[1.03] transition-all duration-300 group/qa text-center"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${item.color}20`;
                  e.currentTarget.style.background = `${item.color}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                }}
              >
                <span
                  className="text-2xl block mb-2 transition-transform duration-300 group-hover/qa:scale-110"
                  style={{ color: `${item.color}40` }}
                >
                  {item.icon}
                </span>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover/qa:text-white/60 transition-colors">
                  {item.label}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FOOTER: CONNECTION NODES ═══ */}
      <div className="flex flex-wrap gap-8 text-[9px] font-bold text-white/15 uppercase tracking-[0.3em] pt-4 animate-slide-up opacity-0" style={{ animationDelay: '0.55s' }}>
        <div className="flex items-center gap-2.5">
          <span className="neon-dot" style={{ background: '#00f2ff' }}></span>
          <span>API <span className="text-white/8">3001/TCP</span></span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="neon-dot" style={{ background: '#bc13fe' }}></span>
          <span>Web <span className="text-white/8">5173/TCP</span></span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="neon-dot" style={{ background: '#b08d57' }}></span>
          <span>Core <span className="text-white/8">v3.0.0</span></span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="neon-dot" style={{ background: '#6366f1' }}></span>
          <span>DB <span className="text-white/8">SQLite</span></span>
        </div>
      </div>
    </div>
  );
}
