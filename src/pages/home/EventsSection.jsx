import { EVENTS, formatDate } from "./data";

export default function EventsSection() {
  return (
    <div className="space-y-4">
      {EVENTS.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex flex-col items-center justify-center text-primary-700">
              <span className="text-xs uppercase font-semibold">
                {new Date(event.date).toLocaleDateString("pt-PT", { month: "short" })}
              </span>
              <span className="text-2xl font-bold leading-none">
                {new Date(event.date).getDate()}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-secondary-900 truncate">{event.title}</h3>
            <p className="text-sm text-secondary-400">{formatDate(event.date)}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full font-medium">
                {event.type}
              </span>
              <span className="text-xs text-secondary-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </span>
            </div>
          </div>
          <button className="sm:self-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition active:scale-95">
            Detalhes
          </button>
        </div>
      ))}
    </div>
  );
}
