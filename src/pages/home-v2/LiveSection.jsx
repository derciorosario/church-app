export default function LiveSection() {
  return (
    <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 rounded-3xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(220,38,38,0.3),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Ao Vivo</span>
        </div>

        <div className="aspect-video bg-black/40 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/50">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="font-bold text-white text-xl">Culto de Domingo</p>
            <p className="text-gray-300 text-sm mt-1">Domingo, 10:00h</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Últimos Avisos</h3>
          {[
            { text: "Inscrições abertas para batismo", color: "bg-primary-500" },
            { text: "Campanha de alimentos em andamento", color: "bg-highlight-500" },
            { text: "Novo estudo bíblico disponível", color: "bg-accent-500" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div className={`w-1.5 h-1.5 ${item.color} rounded-full flex-shrink-0`}></div>
              <span className="text-gray-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
