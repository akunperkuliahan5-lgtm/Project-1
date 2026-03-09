import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '⊞' },
  { to: '/admin/services', label: 'Layanan', icon: '◈' },
  { to: '/admin/portfolio', label: 'Portofolio', icon: '◉' },
  { to: '/admin/team', label: 'Tim', icon: '◎' },
  { to: '/admin/blog', label: 'Blog', icon: '◇' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('kkn_admin_auth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0d0d0d] border-r border-[#1e1e1e] flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="px-8 py-8 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-accent/40 flex items-center justify-center bg-accent/5">
              <span className="text-accent font-black text-xs">KKN</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-tight">Admin Panel</p>
              <p className="text-gray-600 text-[9px] uppercase tracking-widest">Nusantara</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-accent/10 text-accent border-l-2 border-accent'
                    : 'text-gray-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`
              }
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-[#1e1e1e]">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 text-xs text-gray-600 hover:text-gray-400 transition-colors mb-2"
          >
            <span>↗</span> Lihat Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs text-gray-600 hover:text-red-400 transition-colors"
          >
            <span>→</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
