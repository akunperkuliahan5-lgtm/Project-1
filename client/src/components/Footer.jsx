export default function Footer() {
  return (
    <footer id="contact" className="py-40 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-32">
        <div>
          <h2 className="section-title mb-12">Let's Connect.</h2>
          <div className="space-y-12">
            <div>
              <p className="text-[10px] font-bold uppercase text-accent tracking-[0.3em] mb-4">
                Location
              </p>
              <p className="text-xl text-gray-300">
                Jl. Domba 2A, Makassar,
                <br />
                Sulawesi Selatan, Indonesia.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-accent tracking-[0.3em] mb-4">
                Digital
              </p>
              <a
                href="mailto:ptkolaborasikonsultannusantara@gmail.com"
                className="text-xl text-white hover:text-accent transition-colors block mb-2"
              >
                Email Official
              </a>
              <p className="text-xl text-white">0822-9130-7707</p>
            </div>
          </div>
        </div>

        <div className="bg-black border border-white/5 p-16 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold mb-10 tracking-[0.5em] text-accent uppercase">
              Corporate Credentials
            </h3>
            <div className="space-y-6 text-sm text-gray-500">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>NIB Number</span>
                <span className="text-gray-300">1804250040383</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Legal Entity</span>
                <span className="text-gray-300">AHU-0017820.AH.01.01.2025</span>
              </div>
            </div>
          </div>
          <p className="mt-20 text-[10px] text-gray-700 tracking-widest">
            © 2025 PT. KOLABORASI KONSULTAN NUSANTARA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
