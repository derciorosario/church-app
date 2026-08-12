import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const EVENTS = [
  {
    id: 1,
    title: "Culto de Domingo",
    date: "2026-08-16T10:00:00",
    location: "Templo Principal",
    type: "Culto",
    description: "Culto dominical com Santa Ceia e louvor.",
    capacity: 200,
    participants: 156,
    organizer: "Pastor João",
    contact: "culto@igrejaconectada.mz",
    image: "from-primary-500 to-primary-700",
  },
  {
    id: 2,
    title: "Ensaios do Louvor",
    date: "2026-08-19T19:00:00",
    location: "Sala de Música",
    type: "Ensaio",
    description: "Ensaio para o culto de domingo.",
    capacity: 30,
    participants: 22,
    organizer: "Irmã Maria",
    contact: "louvor@igrejaconectada.mz",
    image: "from-accent-500 to-accent-700",
  },
  {
    id: 3,
    title: "Vigília de Oração",
    date: "2026-08-22T22:00:00",
    location: "Templo Principal",
    type: "Vigília",
    description: "Noite de vigília e oração pela igreja.",
    capacity: 150,
    participants: 98,
    organizer: "Pastor João",
    contact: "oracao@igrejaconectada.mz",
    image: "from-highlight-500 to-highlight-700",
  },
  {
    id: 4,
    title: "Reunião de Líderes",
    date: "2026-08-25T18:30:00",
    location: "Sala de Conferências",
    type: "Reunião",
    description: "Reunião mensal de líderes de ministério.",
    capacity: 20,
    participants: 18,
    organizer: "Presbítero Carlos",
    contact: "lideranca@igrejaconectada.mz",
    image: "from-secondary-500 to-secondary-700",
  },
  {
    id: 5,
    title: "Conferência Anual",
    date: "2026-09-02T09:00:00",
    location: "Auditório Central",
    type: "Conferência",
    description: "Conferência anual com pregadores convidados.",
    capacity: 500,
    participants: 342,
    organizer: "Pastor João",
    contact: "eventos@igrejaconectada.mz",
    image: "from-gold-500 to-gold-700",
  },
  {
    id: 6,
    title: "Campanha de Jejum",
    date: "2026-09-05T08:00:00",
    location: "Templo Principal",
    type: "Campanha",
    description: "Campanha especial de jejum e oração de 21 dias.",
    capacity: 300,
    participants: 210,
    organizer: "Irmã Ana",
    contact: "campanha@igrejaconectada.mz",
    image: "from-red-500 to-red-700",
  },
  {
    id: 7,
    title: "Retiro de Jovens",
    date: "2026-09-12T08:00:00",
    location: "Centro de Convivência",
    type: "Retiro",
    description: "Retiro anual da juventude com temas bíblicos.",
    capacity: 80,
    participants: 65,
    organizer: "Irmão Pedro",
    contact: "jovens@igrejaconectada.mz",
    image: "from-emerald-500 to-emerald-700",
  },
  {
    id: 8,
    title: "Café Mulheres",
    date: "2026-09-18T14:00:00",
    location: "Salão Social",
    type: "Convívio",
    description: "Manhã de convívio e comunhão entre mulheres.",
    capacity: 60,
    participants: 48,
    organizer: "Irmã Ana",
    contact: "mulheres@igrejaconectada.mz",
    image: "from-pink-500 to-pink-700",
  },
];

const EVENT_TYPES = ["Todos", "Culto", "Ensaio", "Vigília", "Reunião", "Conferência", "Campanha", "Retiro", "Convívio"];

export default function Events() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [rsvpEvents, setRsvpEvents] = useState([]);
  const [showSuccess, setShowSuccess] = useState(null);

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "Todos" || event.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const handleRsvp = (eventId) => {
    const event = EVENTS.find((e) => e.id === eventId);
    if (!event) return;

    setRsvpEvents((prev) => {
      const isRsvpd = prev.includes(eventId);
      if (isRsvpd) {
        return prev.filter((id) => id !== eventId);
      }
      if (event.participants >= event.capacity) {
        setShowSuccess("Evento lotado!");
        return prev;
      }
      setShowSuccess(`Inscrição confirmada para "${event.title}"!`);
      setTimeout(() => setShowSuccess(null), 3000);
      return [...prev, eventId];
    });
  };

  const getEventStatus = (dateStr) => {
    const now = new Date();
    const eventDate = new Date(dateStr);
    const diff = eventDate - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (diff < 0) return { label: "Realizado", color: "bg-gray-100 text-gray-600" };
    if (days === 0) return { label: "Hoje", color: "bg-red-100 text-red-700" };
    if (days === 1) return { label: "Amanhã", color: "bg-orange-100 text-orange-700" };
    if (days <= 7) return { label: `Em ${days} dias`, color: "bg-yellow-100 text-yellow-700" };
    return { label: `Em ${days} dias`, color: "bg-green-100 text-green-700" };
  };

  const formatEventDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">
          ← Voltar
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Agenda da Igreja</h1>
          <p className="text-secondary-400">Todos os cultos, ensaios, vigílias e conferências.</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="w-5 h-5 text-secondary-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar eventos..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm bg-white"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">{showSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => {
            const status = getEventStatus(event.date);
            const isRsvpd = rsvpEvents.includes(event.id);
            const isFull = event.participants >= event.capacity;

            return (
              <div key={event.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                <div className={`h-24 bg-gradient-to-r ${event.image} relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-white/90 backdrop-blur-sm text-secondary-700 px-2.5 py-1 rounded-lg font-medium">{event.type}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${status.color}`}>{status.label}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] uppercase font-bold text-secondary-500">{new Date(event.date).toLocaleDateString("pt-PT", { month: "short" })}</span>
                      <span className="text-lg font-bold text-secondary-900 leading-none">{new Date(event.date).getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-secondary-900 leading-tight">{event.title}</h3>
                      <p className="text-xs text-secondary-400 mt-0.5">Organizado por {event.organizer}</p>
                    </div>
                  </div>

                  <p className="text-sm text-secondary-500 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-1.5 mb-4 text-sm">
                    <p className="flex items-center gap-2 text-secondary-600">
                      <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formatEventDate(event.date)}</span>
                    </p>
                    <p className="flex items-center gap-2 text-secondary-600">
                      <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </p>
                    <p className="flex items-center gap-2 text-secondary-600">
                      <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 014 4V6.5a2.5 2.5 0 00-5 0v.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14.5A3.5 3.5 0 017.5 11h9a3.5 3.5 0 013.5 3.5v1a2.5 2.5 0 01-5 0v-1" />
                      </svg>
                      <span>
                        {event.participants}/{event.capacity} participantes
                      </span>
                    </p>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((event.participants / event.capacity) * 100, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setSelectedEvent(event)} className="flex-1 px-4 py-2 bg-white border border-gray-200 text-secondary-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition active:scale-95">
                      Detalhes
                    </button>
                    <button
                      onClick={() => handleRsvp(event.id)}
                      disabled={isFull && !isRsvpd}
                      className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition active:scale-95 ${
                        isRsvpd
                          ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/20"
                          : isFull
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20"
                      }`}
                    >
                      {isRsvpd ? "✓ Inscrito" : isFull ? "Lotado" : "Inscrever-se"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Nenhum evento encontrado</h3>
            <p className="text-secondary-400 text-sm">Tente ajustar os filtros de pesquisa.</p>
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className={`h-48 bg-gradient-to-r ${selectedEvent.image} relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-white/80 hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="inline-block text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-medium mb-2">{selectedEvent.type}</span>
                <h2 className="text-2xl font-bold text-white">{selectedEvent.title}</h2>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mb-1">Data</p>
                  <p className="text-sm font-semibold text-secondary-900">{new Date(selectedEvent.date).toLocaleDateString("pt-PT")}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mb-1">Horário</p>
                  <p className="text-sm font-semibold text-secondary-900">{new Date(selectedEvent.date).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mb-1">Local</p>
                  <p className="text-sm font-semibold text-secondary-900">{selectedEvent.location}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mb-1">Vagas</p>
                  <p className="text-sm font-semibold text-secondary-900">
                    {selectedEvent.participants}/{selectedEvent.capacity}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Sobre o Evento</h3>
                <p className="text-secondary-600 text-sm leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Organizador</h3>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">{selectedEvent.organizer[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-secondary-900">{selectedEvent.organizer}</p>
                    <p className="text-xs text-secondary-400">{selectedEvent.contact}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleRsvp(selectedEvent.id);
                    if (!rsvpEvents.includes(selectedEvent.id) && selectedEvent.participants < selectedEvent.capacity) {
                      setSelectedEvent({ ...selectedEvent, participants: selectedEvent.participants + 1 });
                    }
                  }}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition active:scale-95 ${
                    rsvpEvents.includes(selectedEvent.id)
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/20"
                      : "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20"
                  }`}
                >
                  {rsvpEvents.includes(selectedEvent.id) ? "✓ Inscrito" : "Inscrever-se"}
                </button>
                <button onClick={() => setSelectedEvent(null)} className="px-4 py-3 border border-gray-200 text-secondary-700 rounded-xl font-medium hover:bg-gray-50 transition active:scale-95">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
