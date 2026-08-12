import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const VERSE = {
  text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
  reference: "Jeremias 29:11",
};

const EVENTS = [
  { id: 1, title: "Culto de Domingo", date: "2026-07-20T10:00:00", location: "Templo Principal", type: "Culto" },
  { id: 2, title: "Ensaios do Louvor", date: "2026-07-22T19:00:00", location: "Sala de Música", type: "Ensaio" },
  { id: 3, title: "Vigília de Oração", date: "2026-07-25T22:00:00", location: "Templo Principal", type: "Vigília" },
  { id: 4, title: "Reunião de Líderes", date: "2026-07-28T18:30:00", location: "Sala de Conferências", type: "Reunião" },
  { id: 5, title: "Conferência Anual", date: "2026-08-02T09:00:00", location: "Auditório Central", type: "Conferência" },
  { id: 6, title: "Campanha de Jejum", date: "2026-08-05T08:00:00", location: "Templo Principal", type: "Campanha" },
];

const ANNOUNCEMENTS = [
  { id: 1, title: "Inscrições Abertas para o Batismo", date: "2026-07-15", content: "As inscrições para o próximo batismo estão abertas.", priority: "high" },
  { id: 2, title: "Campanha de Alimentos", date: "2026-07-14", content: "Recolhemos alimentos não perecíveis.", priority: "medium" },
  { id: 3, title: "Novo Estudo Bíblico", date: "2026-07-13", content: "Disponibilizamos o novo estudo sobre os Salmos.", priority: "low" },
  { id: 4, title: "Retiro de Jovens", date: "2026-07-12", content: "Inscrições abertas para Agosto.", priority: "medium" },
];

const MINISTRIES = [
  { id: 1, name: "Jovens", icon: "👥", description: "Encontros, retiros e atividades.", color: "text-primary-600", bg: "bg-primary-50" },
  { id: 2, name: "Mulheres", icon: "💐", description: "Cafés, estudos e eventos.", color: "text-accent-600", bg: "bg-accent-50" },
  { id: 3, name: "Homens", icon: "🤝", description: "Cafés da manhã e comunhão.", color: "text-secondary-600", bg: "bg-secondary-50" },
  { id: 4, name: "Louvor", icon: "🎵", description: "Equipe de música e adoração.", color: "text-highlight-600", bg: "bg-highlight-50" },
  { id: 5, name: "Crianças", icon: "🌟", description: "Escola bíblica e atividades infantis.", color: "text-gold-600", bg: "bg-gold-50" },
  { id: 6, name: "Evangelismo", icon: "🌍", description: "Ação social e evangelização.", color: "text-primary-600", bg: "bg-primary-50" },
];

const PRAYER_REQUESTS = [
  { id: 1, name: "Família Silva", request: "Pedido de cura para a matriarca.", date: "2026-07-15" },
  { id: 2, name: "Irmã Ana", request: "Gratidão pela provisão divina.", date: "2026-07-14" },
  { id: 3, name: "Irmão Pedro", request: "Pedido de sabedoria.", date: "2026-07-13" },
  { id: 4, name: "Família Costa", request: "Pedido de saúde e paz.", date: "2026-07-12" },
];

const GALLERY = [
  { id: 1, title: "Culto de Domingo", type: "photo" },
  { id: 2, title: "Retiro de Jovens", type: "photo" },
  { id: 3, title: "Batismo Coletivo", type: "photo" },
  { id: 4, title: "Conferência 2025", type: "video" },
  { id: 5, title: "Natal da Igreja", type: "photo" },
  { id: 6, title: "Evangelismo de Rua", type: "video" },
  { id: 7, title: "Café Mulheres", type: "photo" },
  { id: 8, title: "Ensaio Louvor", type: "photo" },
];

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatShortDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

export default function Home() {
  const { user, isAuthed } = useAuth();
  const navigate = useNavigate();
  const [prayerForm, setPrayerForm] = useState({ name: "", request: "" });
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePrayerSubmit = (e) => {
    e.preventDefault();
    alert("Pedido de oração enviado!");
    setPrayerForm({ name: "", request: "" });
    setShowPrayerForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Minimalista */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-lg">IC</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-secondary-900 leading-tight">Igreja Conectada</h1>
                <p className="text-xs text-secondary-400">Plataforma da Igreja</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {[
                { label: "Início", href: "/" },
                { label: "Eventos", href: "/events" },
                { label: "Ministérios", href: "/ministries" },
                { label: "Oração", href: "/prayers" },
                { label: "Chat", href: "/chat" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="px-4 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-900 hover:bg-white rounded-lg transition">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-gray-100 transition">
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
              {isAuthed && user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-secondary-700 hidden sm:block">{user.name.split(" ")[0]}</span>
                </div>
              ) : (
                <button onClick={() => navigate("/profile")} className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition shadow-lg shadow-primary-500/20">
                  Entrar
                </button>
              )}
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100">
              <nav className="flex flex-col gap-1 mt-3">
                {[
                  { label: "Início", href: "/" },
                  { label: "Eventos", href: "/events" },
                  { label: "Ministérios", href: "/ministries" },
                  { label: "Oração", href: "/prayers" },
                  { label: "Chat", href: "/chat" },
                ].map((item) => (
                  <a key={item.label} href={item.href} className="px-4 py-3 text-sm font-medium text-secondary-600 hover:text-secondary-900 hover:bg-gray-50 rounded-lg transition" onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero / Versículo do Dia - Clean com blur */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-accent-600/5 to-highlight-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Versículo do Dia
            </div>
            <blockquote className="text-2xl md:text-4xl font-medium text-secondary-900 leading-relaxed mb-6 tracking-tight">
              "{VERSE.text}"
            </blockquote>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
              <cite className="text-sm font-semibold text-secondary-700 not-italic">— {VERSE.reference}</cite>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Eventos + Transmissão */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Próximos Eventos</h2>
                <p className="text-secondary-400 mt-1">Fique por dentro de todas as atividades</p>
              </div>
              <button onClick={() => navigate("/events")} className="px-4 py-2 bg-white border border-gray-200 text-secondary-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                Ver todos →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EVENTS.map((event) => (
                <div key={event.id} className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary-100 transition-all duration-300 cursor-pointer" onClick={() => setSelectedEvent(event)}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">{new Date(event.date).toLocaleDateString("pt-PT", { month: "short" })}</span>
                      <span className="text-xl font-bold leading-none">{new Date(event.date).getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                        <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-lg font-medium whitespace-nowrap flex-shrink-0">{event.type}</span>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-secondary-500 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {formatDate(event.date)}
                        </p>
                        <p className="text-sm text-secondary-500 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {event.location}
                        </p>
                      </div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }} className="sm:self-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition active:scale-95">
                      Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">Transmissão ao Vivo</h2>
              <div className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(220,38,38,0.3),transparent_70%)]"></div></div>
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Ao Vivo</span>
                  </div>
                  <div className="aspect-video bg-black/40 rounded-2xl flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-red-500/50">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <p className="font-bold text-white text-lg">Culto de Domingo</p>
                      <p className="text-gray-300 text-sm mt-1">Domingo, 10:00h</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Últimos Avisos</h3>
                    {ANNOUNCEMENTS.slice(0, 3).map((a) => (
                      <div key={a.id} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.priority === "high" ? "bg-red-500" : a.priority === "medium" ? "bg-highlight-500" : "bg-secondary-400"}`}></div>
                        <span className="text-gray-300 truncate">{a.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ministérios */}
        <section id="ministries" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Ministérios</h2>
            <p className="text-secondary-400 mt-1">Cada ministério tem a sua própria área</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {MINISTRIES.map((ministry) => (
              <div key={ministry.id} onClick={() => setSelectedMinistry(ministry)} className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg hover:shadow-gray-200/50 hover:border-primary-100 transition-all duration-300 cursor-pointer text-center">
                <div className={`w-14 h-14 ${ministry.bg} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>{ministry.icon}</div>
                <h3 className="font-semibold text-secondary-900 text-sm mb-1">{ministry.name}</h3>
                <p className="text-xs text-secondary-400 line-clamp-2">{ministry.description}</p>
                <button onClick={(e) => { e.stopPropagation(); setSelectedMinistry(ministry); }} className="mt-3 text-primary-600 text-xs font-semibold hover:text-primary-700 transition">
                  Saber mais →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Bíblia + Galeria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Bíblia e Devocionais</h2>
              <p className="text-secondary-400 mt-1">Leitura diária, planos e estudos</p>
            </div>
            <div className="space-y-3">
              {[
                { title: "Leitura Diária", subtitle: "Capítulo do dia disponível", gradient: "from-primary-500 to-accent-500" },
                { title: "Plano de Leitura Anual", subtitle: "Leia a Bíblia em 1 ano", gradient: "from-highlight-500 to-gold-500" },
                { title: "Estudos Bíblicos", subtitle: "Material disponível", gradient: "from-accent-500 to-primary-600" },
              ].map((item, i) => (
                <div key={i} onClick={() => navigate("/bible")} className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 p-5 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                      <p className="text-sm text-secondary-400">{item.subtitle}</p>
                    </div>
                    <svg className="w-5 h-5 text-secondary-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Galeria</h2>
                <p className="text-secondary-400 mt-1">Fotos e vídeos dos eventos</p>
              </div>
              <button onClick={() => navigate("/gallery")} className="text-sm text-primary-600 font-medium hover:text-primary-700 transition">Ver tudo →</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {GALLERY.map((item) => (
                <div key={item.id} onClick={() => navigate("/gallery")} className="group relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-secondary-400 text-xs font-medium px-2 text-center">{item.title}</span></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.type === "video" ? (
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    )}
                  </div>
                  {item.type === "video" && (
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      Vídeo
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pedidos de Oração + Perfil */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Pedidos de Oração</h2>
              <p className="text-secondary-400 mt-1">Compartilhe os seus pedidos com a equipa pastoral</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                {isAuthed ? (
                  <button onClick={() => setShowPrayerForm(!showPrayerForm)} className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 active:scale-95">
                    {showPrayerForm ? "Cancelar" : "+ Novo Pedido"}
                  </button>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                    <p className="text-sm text-secondary-500">Faça login para enviar pedidos.</p>
                  </div>
                )}
                {showPrayerForm && (
                  <form onSubmit={handlePrayerSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">Nome</label>
                      <input type="text" value={prayerForm.name} onChange={(e) => setPrayerForm({ ...prayerForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition" placeholder="Seu nome" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">Pedido</label>
                      <textarea value={prayerForm.request} onChange={(e) => setPrayerForm({ ...prayerForm, request: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none" rows={4} placeholder="Descreva o seu pedido..." required></textarea>
                    </div>
                    <button type="submit" className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20">Enviar Pedido</button>
                  </form>
                )}
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100">
                  {PRAYER_REQUESTS.map((pr) => (
                    <div key={pr.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-md shadow-primary-500/20">{pr.name[0]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-secondary-900">{pr.name}</h4>
                            <span className="text-xs text-secondary-400 flex-shrink-0">{pr.date}</span>
                          </div>
                          <p className="text-sm text-secondary-600 mt-1 leading-relaxed">{pr.request}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            {isAuthed && user && (
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 p-6 shadow-sm sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg shadow-primary-500/20">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-secondary-900 text-lg">{user.name}</h3>
                    <p className="text-sm text-secondary-400 mt-1">{user.email}</p>
                    <span className="inline-block mt-3 text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full font-medium">{user.role || "Membro"}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Eventos", value: "3", gradient: "from-primary-500 to-accent-500" },
                    { label: "Mensagens", value: "5", gradient: "from-highlight-500 to-gold-500" },
                    { label: "Contribuições", value: "12", gradient: "from-accent-500 to-primary-600" },
                    { label: "Ministério", value: "Jovens", gradient: "from-secondary-500 to-secondary-600" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                      <p className="text-xs text-secondary-400 uppercase tracking-wide mb-1">{stat.label}</p>
                      <p className={`text-xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notificações */}
        <section className="relative bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 rounded-3xl p-8 md:p-10 text-white overflow-hidden shadow-xl shadow-primary-500/20">
          <div className="absolute inset-0 opacity-10"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.3),transparent_70%)]"></div></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Receba notificações da igreja</h3>
                <p className="text-white/80 text-sm md:text-base max-w-xl">Eventos, avisos e estudos bíblicos directamente no seu telemóvel.</p>
              </div>
            </div>
            <button onClick={() => setSelectedMinistry({ name: "Notificações", description: "Configure as suas preferências de notificação para receber avisos sobre eventos, estudos bíblicos e mensagens da igreja." })} className="px-8 py-3.5 bg-white text-primary-700 rounded-2xl font-bold hover:bg-primary-50 transition-all duration-300 active:scale-95 shadow-lg whitespace-nowrap flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              Activar Notificações
            </button>
          </div>
        </section>

        {/* Chat da Comunidade */}
        <section className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Comunidade</h2>
              <p className="text-secondary-400 mt-1">Converse com outros membros da igreja</p>
            </div>
            <a href="/chat" className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition shadow-lg shadow-primary-500/20">
              Abrir Chat
            </a>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-3.46-.588L3 21l1.588-4.632A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Grupo da Igreja</h3>
            <p className="text-sm text-secondary-400 mb-4 max-w-md mx-auto">Partilhe mensagens, fotos e ficheiros com toda a comunidade. Um espaço de comunhão e partilha.</p>
            <a href="/chat" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-3.46-.588L3 21l1.588-4.632A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              Entrar no Chat
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-300 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center text-white font-bold">IC</div>
                <span className="font-bold text-white text-lg">Igreja Conectada</span>
              </div>
              <p className="text-secondary-400 text-sm max-w-md leading-relaxed">Plataforma para aproximar a igreja dos membros, facilitando a comunicação e o acompanhamento espiritual.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Links Rápidos</h4>
              <ul className="space-y-2 text-sm !text-secondary-400 ">
                <li><a href="#" className="hover:text-white transition !text-secondary-400">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition !text-secondary-400">Ministérios</a></li>
                <li><a href="#" className="hover:text-white transition !text-secondary-400">Eventos</a></li>
                <li><a href="#" className="hover:text-white transition !text-secondary-400">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Contacto</h4>
              <ul className="space-y-2 text-sm text-secondary-400">
                <li>info@igrejaconectada.mz</li>
                <li>+351 123 456 789</li>
                <li>Rua da Igreja, 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-400">© {new Date().getFullYear()} Igreja Conectada. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-white transition">Privacidade</a>
              <a href="#" className="hover:text-white transition">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Dialog */}
      {(selectedEvent || selectedMinistry) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => { setSelectedEvent(null); setSelectedMinistry(null); }}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            {selectedEvent && (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-lg font-medium">{selectedEvent.type}</span>
                    <h3 className="text-xl font-bold text-secondary-900 mt-2">{selectedEvent.title}</h3>
                  </div>
                  <button onClick={() => setSelectedEvent(null)} className="text-secondary-400 hover:text-secondary-600 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-secondary-500 flex items-center gap-2">
                    <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {formatDate(selectedEvent.date)}
                  </p>
                  <p className="text-sm text-secondary-500 flex items-center gap-2">
                    <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {selectedEvent.location}
                  </p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => { navigate("/events"); setSelectedEvent(null); }} className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition">Ver Todos os Eventos</button>
                  <button onClick={() => setSelectedEvent(null)} className="px-4 py-3 border border-gray-200 text-secondary-700 rounded-xl font-medium hover:bg-gray-50 transition">Fechar</button>
                </div>
              </>
            )}
            {selectedMinistry && (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${selectedMinistry.bg} rounded-2xl flex items-center justify-center text-2xl`}>{selectedMinistry.icon}</div>
                    <h3 className="text-xl font-bold text-secondary-900">{selectedMinistry.name}</h3>
                  </div>
                  <button onClick={() => setSelectedMinistry(null)} className="text-secondary-400 hover:text-secondary-600 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <p className="text-secondary-600 mb-6">{selectedMinistry.description}</p>
                <div className="flex gap-3">
                  <button onClick={() => { navigate("/ministries"); setSelectedMinistry(null); }} className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition">Ver Ministério</button>
                  <button onClick={() => setSelectedMinistry(null)} className="px-4 py-3 border border-gray-200 text-secondary-700 rounded-xl font-medium hover:bg-gray-50 transition">Fechar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
