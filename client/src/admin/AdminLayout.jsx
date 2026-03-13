import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { DialogProvider } from './DialogContext';
import { useState } from 'react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '⊞', iconActive: '⊞' },
  { to: '/admin/services', label: 'Layanan', icon: '◈', iconActive: '◈' },
  { to: '/admin/portfolio', label: 'Portofolio', icon: '◉', iconActive: '◉' },
  { to: '/admin/team', label: 'Tim', icon: '◎', iconActive: '◎' },
  { to: '/admin/blog', label: 'Blog', icon: '◇', iconActive: '◇' },
  { to: '/admin/clients', label: 'Klien', icon: '☆', iconActive: '☆' },
  { to: '/admin/media', label: 'Media', icon: '🖼', iconActive: '🖼' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('kkn_admin_auth');
    navigate('/admin/login');
  };

  const currentPage = navItems.find(item => location.pathname.startsWith(item.to));
  const pageTitle = currentPage?.label || 'Dashboard';

  return (
    <DialogProvider>
      <div className="min-h-screen flex" style={{ background: 'var(--charcoal)' }}>
        {/* ===== FLOATING SIDEBAR ===== */}
        <aside
          className={`floating-sidebar flex flex-col flex-shrink-0 overflow-hidden m-4 mr-0 transition-all duration-500 ease-out ${
            sidebarCollapsed ? 'w-[80px]' : 'w-[260px]'
          }`}
        >
          {/* Brand */}
          <div className="px-6 pt-8 pb-6">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-11 h-11 flex items-center justify-center rounded-2xl relative neo-glow-border flex-shrink-0"
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="neo-gradient-text font-black text-sm">K</span>
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-white font-black text-sm tracking-tight">Admin Core</p>
                  <p className="text-[9px] text-white/20 font-semibold tracking-[0.3em] uppercase">v3.0 Nexus</p>
                </div>
              )}
            </div>
          </div>

          {/* Separator */}
          <div className="mx-5 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"></div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto dash-scroll">
            {!sidebarCollapsed && (
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/15 px-3 mb-3">Menu</p>
            )}
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-[11px] font-bold tracking-wide transition-all duration-300 rounded-xl relative overflow-hidden group ${
                    sidebarCollapsed ? 'justify-center' : ''
                  } ${
                    isActive
                      ? 'text-neon-cyan'
                      : 'text-white/30 hover:text-white/70 hover:bg-white/[0.02]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator glow background */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'linear-gradient(90deg, rgba(0, 242, 255, 0.06), transparent)',
                          border: '1px solid rgba(0, 242, 255, 0.08)',
                        }}
                      ></div>
                    )}

                    {/* Active left bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-full"
                        style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 8px var(--neon-cyan)' }}>
                      </div>
                    )}

                    <span className={`text-base leading-none relative z-10 transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`}>
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && (
                      <span className="relative z-10 uppercase">{item.label}</span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-3 py-5 mt-auto">
            <div className="mx-2 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mb-4"></div>
            <a
              href="/"
              target="_blank"
              className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white/20 rounded-xl hover:text-white/50 hover:bg-white/[0.02] transition-all ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <span className="text-sm">↗</span>
              {!sidebarCollapsed && 'View Site'}
            </a>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-red-500/40 rounded-xl hover:text-red-400 hover:bg-red-500/[0.04] transition-all mt-1 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <span className="text-sm">⎋</span>
              {!sidebarCollapsed && 'Logout'}
            </button>
          </div>
        </aside>

        {/* ===== MAIN CONTENT AREA ===== */}
        <div className="flex-1 flex flex-col min-h-screen p-4">
          {/* Top Bar – Floating */}
          <header
            className="stat-card-float flex items-center justify-between px-7 py-4 mb-4"
          >
            <div className="flex items-center gap-5">
              {/* Sidebar Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="text-white/20 hover:text-white/60 transition-colors text-lg"
                title="Toggle sidebar"
              >
                {sidebarCollapsed ? '☰' : '✕'}
              </button>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="text-white/15">Admin</span>
                <span className="text-white/10">/</span>
                <span className="text-neon-cyan/70">{pageTitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Search */}
              <div className="relative hidden lg:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white/[0.02] border border-white/[0.04] rounded-xl px-4 py-2 text-xs text-white/60 placeholder-white/15 focus:outline-none focus:border-neon-cyan/20 transition-all w-52"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/15 text-[10px]">⌘K</span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <div className="neon-dot" style={{ background: 'var(--neon-cyan)' }}></div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/25">Online</span>
              </div>

              {/* Notifications */}
              <button className="relative text-white/20 hover:text-white/50 transition-colors">
                <span className="text-lg">🔔</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon-violet animate-glow-pulse"></span>
              </button>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-xl flex items-center justify-center neo-glow-border cursor-pointer"
                style={{ background: 'linear-gradient(135deg, rgba(0,242,255,0.1), rgba(188,19,254,0.1))', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="text-sm font-black neo-gradient-text">A</span>
              </div>
            </div>
          </header>

          {/* Page Content – Floating Container */}
          <main className="flex-1 futuristic-card overflow-auto dash-scroll relative">
            {/* Ambient Glow Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
              style={{ background: 'radial-gradient(circle, rgba(0,242,255,0.03) 0%, transparent 70%)' }}></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none -z-10"
              style={{ background: 'radial-gradient(circle, rgba(188,19,254,0.03) 0%, transparent 70%)' }}></div>

            <div className="p-8 lg:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </DialogProvider>
  );
}
