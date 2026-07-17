import { useState } from "react";
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
];

const ANNOUNCEMENTS = [
  { id: 1, title: "Inscrições Abertas para o Batismo", date: "2026-07-15", content: "As inscrições para o próximo batismo estão abertas. Procure a secretaria.", priority: "high" },
  { id: 2, title: "Campanha de Alimentos", date: "2026-07-14", content: "Estamos a recolher alimentos não perecíveis para famílias carentes.", priority: "medium" },
  { id: 3, title: "Novo Estudo Bíblico", date: "2026-07-13", content: "Disponibilizamos o novo estudo sobre os Salmos.", priority: "low" },
];

const MINISTRIES = [
  { id: 1, name: "Jovens", description: "Encontros, retiros e atividades para a juventude.", color: "bg-primary-500" },
  { id: 2, name: "Mulheres", description: "Cafés, estudos e eventos para mulheres.", color: "bg-accent-500" },
  { id: 3, name: "Homens", description: "Cafés da manhã e momentos de comunhão masculina.", color: "bg-secondary-500" },
  { id: 4, name: "Louvor", description: "Equipe de música e adoração nos cultos.", color: "bg-highlight-500" },
  { id: 5, name: "Crianças", description: "Escola bíblica e atividades infantis.", color: "bg-gold-500" },
  { id: 6, name: "Evangelismo", description: "Ação social e evangelização na comunidade.", color: "bg-primary-600" },
];

const PRAYER_REQUESTS = [
  { id: 1, name: "Família Silva", request: "Pedido de cura para a matriarca.", date: "2026-07-15" },
  { id: 2, name: "Irmã Ana", request: "Gratidão pela provisão divina no emprego.", date: "2026-07-14" },
  { id: 3, name: "Irmão Pedro", request: "Pedido de sabedoria para decisão importante.", date: "2026-07-13" },
];

const GALLERY = [
  { id: 1, title: "Culto de Domingo", type: "photo" },
  { id: 2, title: "Retiro de Jovens", type: "photo" },
  { id: 3, title: "Batismo Coletivo", type: "photo" },
  { id: 4, title: "Conferência 2025", type: "video" },
  { id: 5, title: "Natal da Igreja", type: "photo" },
  { id: 6, title: "Evangelismo de Rua", type: "video" },
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

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">{children}</h2>
    {subtitle && <p className="text-secondary-400 mt-1">{subtitle}</p>}
  </div>
);

export default function Home() {
  const { user, isAuthed } = useAuth();
  const [prayerForm, setPrayerForm] = useState({ name: "", request: "" });
  const [showPrayerForm, setShowPrayerForm] = useState(false);

  const handlePrayerSubmit = (e) => {
    e.preventDefault();
    alert("Pedido de oração enviado! A equipa irá analisar.");
    setPrayerForm({ name: "", request: "" });
    setShowPrayerForm(false);
  };

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="bg-primary-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">IC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight">Igreja Conectada</h1>
                <p className="text-xs text-primary-100">Plataforma da Igreja</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#verse" className="hover:text-highlight-300 transition">Versículo</a>
              <a href="#events" className="hover:text-highlight-300 transition">Eventos</a>
              <a href="#ministries" className="hover:text-highlight-300 transition">Ministérios</a>
              <a href="#prayers" className="hover:text-highlight-300 transition">Oração</a>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthed ? (
                <span className="text-sm bg-primary-500 px-3 py-1 rounded-full">
                  Olá, {user?.name?.split(" ")[0]}
                </span>
              ) : (
                <span className="text-sm bg-primary-500 px-3 py-1 rounded-full">Visitante</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Versículo do Dia */}
      <section id="verse" className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("/api/placeholder/1200/400")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-sm uppercase tracking-widest text-highlight-300 mb-4 font-semibold">Versículo do Dia</p>
          <blockquote className="text-2xl md:text-4xl font-light leading-relaxed mb-6 italic">
            "{VERSE.text}"
          </blockquote>
          <cite className="text-lg md:text-xl font-semibold not-italic text-highlight-200">
            — {VERSE.reference}
          </cite>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Próximos Eventos + Transmissão */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="events">
          <div className="lg:col-span-2">
            <SectionTitle subtitle="Fique por dentro de todas as atividades">
              Próximos Eventos
            </SectionTitle>
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
          </div>

          {/* Transmissão ao Vivo */}
          <div className="lg:col-span-1">
            <SectionTitle subtitle="Acompanhe os cultos em directo">Transmissão ao Vivo</SectionTitle>
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
            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-secondary-900 mb-2">Últimos Avisos</h3>
              <ul className="space-y-2">
                {ANNOUNCEMENTS.map((a) => (
                  <li key={a.id} className="flex items-start gap-2 text-sm">
                    <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${a.priority === "high" ? "bg-red-500" : a.priority === "medium" ? "bg-highlight-500" : "bg-secondary-300"}`}></span>
                    <div>
                      <p className="font-medium text-secondary-800">{a.title}</p>
                      <p className="text-secondary-400 text-xs">{a.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ministérios */}
        <section id="ministries" className="scroll-mt-20">
          <SectionTitle subtitle="Cada ministério tem a sua própria área">
            Ministérios
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MINISTRIES.map((ministry) => (
              <div
                key={ministry.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition group"
              >
                <div className={`w-12 h-12 ${ministry.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 transition-transform`}>
                  {ministry.name[0]}
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{ministry.name}</h3>
                <p className="text-secondary-400 text-sm leading-relaxed">{ministry.description}</p>
                <button className="mt-4 text-primary-600 text-sm font-semibold hover:text-primary-700 transition">
                  Saber mais →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Bíblia e Devocionais + Galeria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bíblia e Devocionais */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <SectionTitle subtitle="Leitura diária, planos e estudos">Bíblia e Devocionais</SectionTitle>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-highlight-50 rounded-xl">
                <div className="w-10 h-10 bg-highlight-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Leitura Diária</h3>
                  <p className="text-sm text-secondary-400">Capítulo do dia disponível</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Plano de Leitura Anual</h3>
                  <p className="text-sm text-secondary-400">Leia a Bíblia em 1 ano</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-accent-50 rounded-xl">
                <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Estudos Bíblicos</h3>
                  <p className="text-sm text-secondary-400">Material disponível para download</p>
                </div>
              </div>
            </div>
          </section>

          {/* Galeria */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <SectionTitle subtitle="Fotos e vídeos dos eventos">Galeria</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              {GALLERY.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-secondary-400 text-xs">{item.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    {item.type === "video" && (
                      <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                  {item.type === "video" && (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Vídeo
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pedidos de Oração */}
        <section id="prayers" className="scroll-mt-20">
          <SectionTitle subtitle="Compartilhe os seus pedidos com a equipa pastoral">
            Pedidos de Oação
          </SectionTitle>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {isAuthed ? (
              <div className="mb-6">
                <button
                  onClick={() => setShowPrayerForm(!showPrayerForm)}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition active:scale-95"
                >
                  {showPrayerForm ? "Cancelar" : "Enviar Pedido de Oração"}
                </button>
              </div>
            ) : (
              <p className="text-sm text-secondary-400 mb-4">
                Faça login para enviar pedidos de oração.
              </p>
            )}

            {showPrayerForm && (
              <form onSubmit={handlePrayerSubmit} className="mb-8 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Novo Pedido</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={prayerForm.name}
                      onChange={(e) => setPrayerForm({ ...prayerForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Pedido</label>
                    <textarea
                      value={prayerForm.request}
                      onChange={(e) => setPrayerForm({ ...prayerForm, request: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      rows={3}
                      placeholder="Descreva o seu pedido..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition active:scale-95"
                  >
                    Enviar Pedido
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {PRAYER_REQUESTS.map((pr) => (
                <div key={pr.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold flex-shrink-0">
                    {pr.name[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-secondary-900">{pr.name}</h4>
                    <p className="text-sm text-secondary-600 mt-1">{pr.request}</p>
                    <p className="text-xs text-secondary-400 mt-1">{pr.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfil do Membro */}
        {isAuthed && user && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <SectionTitle subtitle="Gerencie as suas informações">
              Perfil do Membro
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-3xl font-bold mx-auto md:mx-0">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div className="text-center md:text-left mt-4">
                  <h3 className="font-semibold text-secondary-900 text-lg">{user.name}</h3>
                  <p className="text-sm text-secondary-400">{user.email}</p>
                  <span className="inline-block mt-2 text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
                    {user.role || "Membro"}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-secondary-400 uppercase tracking-wide mb-1">Eventos Inscritos</p>
                  <p className="text-2xl font-bold text-secondary-900">3</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-secondary-400 uppercase tracking-wide mb-1">Mensagens</p>
                  <p className="text-2xl font-bold text-secondary-900">5</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-secondary-400 uppercase tracking-wide mb-1">Contribuições</p>
                  <p className="text-2xl font-bold text-secondary-900">12</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-secondary-400 uppercase tracking-wide mb-1">Ministério</p>
                  <p className="text-lg font-bold text-secondary-900">Jovens</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Notificações rápidas */}
        <section className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Receba notificações da igreja</h3>
              <p className="text-primary-100 text-sm">Eventos, avisos e estudos bíblicos directamente no seu telemóvel.</p>
            </div>
            <button className="px-6 py-3 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition active:scale-95 whitespace-nowrap">
              Activar Notificações
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">IC</div>
              <span className="font-semibold text-white">Igreja Conectada</span>
            </div>
            <p className="text-sm text-secondary-400">
              © {new Date().getFullYear()} Igreja Conectada. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-white transition">Privacidade</a>
              <a href="#" className="hover:text-white transition">Termos</a>
              <a href="#" className="hover:text-white transition">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
