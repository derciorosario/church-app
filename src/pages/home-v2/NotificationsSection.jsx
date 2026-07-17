export default function NotificationsSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 rounded-3xl p-8 md:p-10 text-white overflow-hidden shadow-xl shadow-primary-500/20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.3),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">Receba notificações da igreja</h3>
            <p className="text-white/80 text-sm md:text-base max-w-xl">
              Eventos, avisos e estudos bíblicos directamente no seu telemóvel. Nunca mais perca uma actividade.
            </p>
          </div>
        </div>

        <button className="px-8 py-3.5 bg-white text-primary-700 rounded-2xl font-bold hover:bg-primary-50 transition-all duration-300 active:scale-95 shadow-lg whitespace-nowrap flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Activar Notificações
        </button>
      </div>
    </section>
  );
}
