import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MINISTRIES = [
  {
    id: 1,
    name: "Jovens",
    icon: "👥",
    description: "Encontros, retiros e atividades para a juventude.",
    color: "text-primary-600",
    bg: "bg-primary-50",
    leader: "Irmão Pedro",
    members: 45,
    schedule: "Sábados às 18h",
    activities: ["Ensaio Louvor Jovem", "Retiro Anual", "Café da Manhã"],
    contact: "jovens@igrejaconectada.mz",
  },
  {
    id: 2,
    name: "Mulheres",
    icon: "💐",
    description: "Cafés, estudos e eventos para mulheres.",
    color: "text-accent-600",
    bg: "bg-accent-50",
    leader: "Irmã Ana",
    members: 62,
    schedule: "Terças às 14h",
    activities: ["Estudo Bíblico", "Café Mulheres", "Ação Social"],
    contact: "mulheres@igrejaconectada.mz",
  },
  {
    id: 3,
    name: "Homens",
    icon: "🤝",
    description: "Cafés da manhã e momentos de comunhão masculina.",
    color: "text-secondary-600",
    bg: "bg-secondary-50",
    leader: "Irmão Carlos",
    members: 38,
    schedule: "Sábados às 7h",
    activities: ["Café da Manhã", "Futebol Solidário", "Estudo Bíblico"],
    contact: "homens@igrejaconectada.mz",
  },
  {
    id: 4,
    name: "Louvor",
    icon: "🎵",
    description: "Equipe de música e adoração nos cultos.",
    color: "text-highlight-600",
    bg: "bg-highlight-50",
    leader: "Irmã Maria",
    members: 25,
    schedule: "Quintas e Domingos",
    activities: ["Ensaio Semanal", "Culto Especial", "Workshop Musical"],
    contact: "louvor@igrejaconectada.mz",
  },
  {
    id: 5,
    name: "Crianças",
    icon: "🌟",
    description: "Escola bíblica e atividades infantis.",
    color: "text-gold-600",
    bg: "bg-gold-50",
    leader: "Irmã Joana",
    members: 55,
    schedule: "Domingos às 10h",
    activities: ["Escola Bíblica", "Teatro Infantil", "Festa de Natal"],
    contact: "criancas@igrejaconectada.mz",
  },
  {
    id: 6,
    name: "Evangelismo",
    icon: "🌍",
    description: "Ação social e evangelização na comunidade.",
    color: "text-primary-600",
    bg: "bg-primary-50",
    leader: "Irmão Paulo",
    members: 30,
    schedule: "Sábados às 15h",
    activities: ["Visita Comunitária", "Distribuição Alimentos", "Culto ao Ar Livre"],
    contact: "evangelismo@igrejaconectada.mz",
  },
];

const EVENTS = [
  { id: 1, ministryId: 1, title: "Ensaio Louvor Jovem", date: "2026-08-15", time: "18:00" },
  { id: 2, ministryId: 2, title: "Café Mulheres", date: "2026-08-18", time: "14:00" },
  { id: 3, ministryId: 4, title: "Ensaio Geral", date: "2026-08-14", time: "19:00" },
];

export default function Ministries() {
  const navigate = useNavigate();
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [joinedMinistries, setJoinedMinistries] = useState([]);

  const handleJoinMinistry = (ministryId) => {
    setJoinedMinistries((prev) => (prev.includes(ministryId) ? prev.filter((id) => id !== ministryId) : [...prev, ministryId]));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setShowContactForm(false);
      setContactData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">
          ← Voltar
        </button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Ministérios</h1>
          <p className="text-secondary-400">Cada ministério tem a sua própria área de atuação.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES.map((ministry) => {
            const isJoined = joinedMinistries.includes(ministry.id);
            return (
              <div
                key={ministry.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${ministry.bg} rounded-2xl flex items-center justify-center text-3xl mb-4`}>{ministry.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{ministry.name}</h3>
                <p className="text-secondary-400 text-sm mb-4">{ministry.description}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-secondary-600">
                    <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{ministry.leader}</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary-600">
                    <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 014 4V6.5a2.5 2.5 0 00-5 0v.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14.5A3.5 3.5 0 017.5 11h9a3.5 3.5 0 013.5 3.5v1a2.5 2.5 0 01-5 0v-1" />
                    </svg>
                    <span>{ministry.members} membros</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary-600">
                    <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{ministry.schedule}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSelectedMinistry(ministry)}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition active:scale-95"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => handleJoinMinistry(ministry.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition active:scale-95 ${
                      isJoined ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200" : "bg-white border border-gray-200 text-secondary-700 hover:bg-gray-50"
                    }`}
                  >
                    {isJoined ? "✓ Participar" : "Participar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedMinistry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedMinistry(null)}>
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${selectedMinistry.bg} rounded-2xl flex items-center justify-center text-3xl`}>{selectedMinistry.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-900">{selectedMinistry.name}</h2>
                    <p className="text-secondary-400 text-sm mt-1">{selectedMinistry.description}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMinistry(null)} className="text-secondary-400 hover:text-secondary-600 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mb-1">Líder</p>
                  <p className="font-semibold text-secondary-900">{selectedMinistry.leader}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mb-1">Membros</p>
                  <p className="font-semibold text-secondary-900">{selectedMinistry.members}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mb-1">Horário</p>
                  <p className="font-semibold text-secondary-900">{selectedMinistry.schedule}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Atividades Recentes</h3>
                <div className="space-y-2">
                  {selectedMinistry.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-secondary-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">Próximos Eventos</h3>
                <div className="space-y-2">
                  {EVENTS.filter((e) => e.ministryId === selectedMinistry.id).length > 0 ? (
                    EVENTS.filter((e) => e.ministryId === selectedMinistry.id).map((event) => (
                      <div key={event.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                        <div>
                          <p className="font-medium text-secondary-900">{event.title}</p>
                          <p className="text-sm text-secondary-400">{event.date} às {event.time}</p>
                        </div>
                        <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-lg font-medium">Confirmar</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-secondary-400 text-center py-4">Nenhum evento agendado para este ministério.</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleJoinMinistry(selectedMinistry.id)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition active:scale-95 ${
                    joinedMinistries.includes(selectedMinistry.id)
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/20"
                      : "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20"
                  }`}
                >
                  {joinedMinistries.includes(selectedMinistry.id) ? "✓ Já Participa" : "Participar do Ministério"}
                </button>
                <button onClick={() => setShowContactForm(true)} className="flex-1 px-4 py-3 border border-gray-200 text-secondary-700 rounded-xl font-medium hover:bg-gray-50 transition active:scale-95">
                  Contactar Líder
                </button>
              </div>
            </div>
          </div>
        )}

        {showContactForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowContactForm(false)}>
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-secondary-900">Contactar Líder</h3>
                <button onClick={() => setShowContactForm(false)} className="text-secondary-400 hover:text-secondary-600 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {contactSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-secondary-900 mb-2">Mensagem Enviada!</h4>
                  <p className="text-sm text-secondary-400">O líder entrará em contacto consigo em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Nome</label>
                    <input
                      type="text"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Mensagem</label>
                    <textarea
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
                      rows={4}
                      placeholder="Escreva a sua mensagem..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20">
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
