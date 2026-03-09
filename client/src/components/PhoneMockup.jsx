export default function PhoneMockup() {
  return (
    <div className="phone-mockup">
      <div className="phone-screen">
        <div className="phone-nav"></div>
        <div className="app-header text-center tracking-widest">KKN CONNECT</div>
        <div className="app-content-box p-6 flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 rounded-full border border-accent/30 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full animate-ping bg-accent/10"></div>
            <span className="text-accent font-black text-2xl">KKN</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-white text-base">Sistem Monitoring</p>
            <p className="text-[10px] text-accent mt-1 tracking-widest">
              ALUR DOKUMEN AKTIF
            </p>
          </div>
          <div className="w-full space-y-3">
            <div className="h-10 bg-[#161616] rounded-lg border border-white/5 flex items-center px-4 justify-between">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <div className="w-24 h-1 bg-white/10"></div>
              <span className="text-[8px] text-gray-500">80%</span>
            </div>
            <div className="h-10 bg-[#161616] rounded-lg border border-white/5 flex items-center px-4 justify-between">
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-24 h-1 bg-white/10"></div>
              <span className="text-[8px] text-gray-500">PENDING</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 w-full text-center">
            <p className="text-[9px] text-gray-500 italic">
              "Terintegrasi dengan sistem OSS RBA"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
