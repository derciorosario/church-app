import { EVENTS, formatShortDate, formatDate } from "./data";

export default function EventsSection() {
  return (
    <section id="events" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Próximos Eventos</h2>
          <p className="text-secondary-400 mt-1">Fique por dentro de todas as atividades</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 text-secondary-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
          Ver todos →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary-100 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">
                  {new Date(event.date).toLocaleDateString("pt-PT", { month: "short" })}
                </span>
                <span className="text-xl font-bold leading-none">
                  {new Date(event.date).getDate()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-secondary-900 truncate group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                  <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-lg font-medium whitespace-nowrap flex-shrink-0">
                    {event.type}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-secondary-500 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(event.date)}
                  </p>
                  <p className="text-sm text-secondary-500 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
