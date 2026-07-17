import { useNavigate } from "react-router-dom";

const DEVOTIONALS = [
  { id: 1, title: "Leitura Diária", description: "Capítulo do dia disponível", gradient: "from-primary-500 to-accent-500" },
  { id: 2, title: "Plano de Leitura Anual", description: "Leia a Bíblia em 1 ano", gradient: "from-highlight-500 to-gold-500" },
  { id: 3, title: "Estudos Bíblicos", description: "Material disponível para download", gradient: "from-accent-500 to-primary-600" },
];

export default function Bible() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">← Voltar</button>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Bíblia e Devocionais</h1>
        <p className="text-secondary-400 mb-8">Leitura diária, planos e estudos bíblicos.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEVOTIONALS.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center text-white shadow-lg mb-4`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">{item.title}</h3>
              <p className="text-secondary-400 text-sm mb-4">{item.description}</p>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition active:scale-95">Abrir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
