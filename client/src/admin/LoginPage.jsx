import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (username === 'admin' && password === 'kknnusantara2024') {
        localStorage.setItem('kkn_admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Username atau password salah.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4"
         style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-accent/40 mb-6 relative">
            <div className="absolute inset-0 bg-accent/5"></div>
            <span className="text-accent font-black text-xl tracking-tighter">KKN</span>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-xs text-gray-600 mt-2 tracking-widest uppercase">PT. Kolaborasi Konsultan Nusantara</p>
        </div>

        {/* Form */}
        <div className="bg-[#111] border border-[#222] p-10">
          <div className="w-1 h-8 bg-accent absolute -ml-10 mt-1"></div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-[#333] text-white px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-[#333] text-white px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••••••••"
                required
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs border border-red-900/50 bg-red-900/10 px-4 py-2">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-accent text-black font-black uppercase text-[11px] tracking-widest hover:bg-white transition-all disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Masuk →'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-700 text-[10px] mt-6 tracking-widest">
          © 2025 KKN NUSANTARA
        </p>
      </div>
    </div>
  );
}
