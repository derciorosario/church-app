import { useNavigate } from "react-router-dom";

const EVENTS = [
  { id: 1, title: "Culto de Domingo", date: "2026-07-20T10:00:00", location: "Templo Principal", type: "Culto", description: "Culto dominical com Santa Ceia." },
  { id: 2, title: "Ensaios do Louvor", date: "2026-07-22T19:00:00", location: "Sala de Música", type: "Ensaio", description: "Ensaio para o culto de domingo." },
  { id: 3, title: "Vigília de Oração", date: "2026-07-25T22:00:00", location: "Templo Principal", type: "Vigília", description: "Noite de vigília e oração." },
  { id: 4, title: "Reunião de Líderes", date: "2026-07-28T18:30:00", location: "Sala de Conferências", type: "Reunião", description: "Reunião mensal de líderes." },
  { id: 5, title: "Conferência Anual", date: "2026-08-02T09:00:00", location: "Auditório Central", type: "Conferência", description: "Conferência anual com pregadores convidados." },
  { id: 6, title: "Campanha de Jejum", date: "2026-08-05T08:00:00", location: "Templo Principal", type: "Campanha", description: "Campanha especial de jejum e oração." },
];

export default function Events() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">← Voltar</button>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Agenda da Igreja</h1>
        <p className="text-secondary-400 mb-8">Todos os cultos, ensaios, vigílias e conferências.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVENTS.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                  <span className="text-[10px] uppercase font-bold">{new Date(event.date).toLocaleDateString("pt-PT", { month: "short" })}</span>
                  <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
                </div>
                <div>
                  <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-lg font-medium">{event.type}</span>
                  <h3 className="font-semibold text-secondary-900 mt-1">{event.title}</h3>
                </div>
              </div>
              <p className="text-sm text-secondary-500 mb-4">{event.description}</p>
              <div className="space-y-1 text-sm text-secondary-500">
                <p className="flex items-center gap-2"><svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{new Date(event.date).toLocaleString("pt-PT")}</p>
                <p className="flex items-center gap-2"><svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{event.location}</p>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition active:scale-95">Inscrever-se</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
