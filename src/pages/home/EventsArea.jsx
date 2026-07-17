import EventsSection from "./EventsSection";
import AnnouncementsSection from "./AnnouncementsSection";

export default function EventsArea() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="events">
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Próximos Eventos</h2>
          <p className="text-secondary-400 mt-1">Fique por dentro de todas as atividades</p>
        </div>
        <EventsSection />
      </div>
      <div className="lg:col-span-1">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Transmissão ao Vivo</h2>
          <p className="text-secondary-400 mt-1">Acompanhe os cultos em directo</p>
        </div>
        <div className="bg-black rounded-2xl overflow-hidden shadow-lg aspect-video flex items-center justify-center relative">
          <div className="text-center text-white p-6">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="font-semibold text-lg">Em Directo</p>
            <p className="text-sm text-gray-300 mt-1">Domingo, 10:00h</p>
          </div>
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            AO VIVO
          </div>
        </div>
        <AnnouncementsSection />
      </div>
    </div>
  );
}
