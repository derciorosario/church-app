import { useNavigate } from "react-router-dom";

const MINISTRIES = [
  { id: 1, name: "Jovens", icon: "👥", description: "Encontros, retiros e atividades para a juventude.", color: "text-primary-600", bg: "bg-primary-50" },
  { id: 2, name: "Mulheres", icon: "💐", description: "Cafés, estudos e eventos para mulheres.", color: "text-accent-600", bg: "bg-accent-50" },
  { id: 3, name: "Homens", icon: "🤝", description: "Cafés da manhã e momentos de comunhão masculina.", color: "text-secondary-600", bg: "bg-secondary-50" },
  { id: 4, name: "Louvor", icon: "🎵", description: "Equipe de música e adoração nos cultos.", color: "text-highlight-600", bg: "bg-highlight-50" },
  { id: 5, name: "Crianças", icon: "🌟", description: "Escola bíblica e atividades infantis.", color: "text-gold-600", bg: "bg-gold-50" },
  { id: 6, name: "Evangelismo", icon: "🌍", description: "Ação social e evangelização na comunidade.", color: "text-primary-600", bg: "bg-primary-50" },
];

export default function Ministries() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">← Voltar</button>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Ministérios</h1>
        <p className="text-secondary-400 mb-8">Cada ministério tem a sua própria área de atuação.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES.map((ministry) => (
            <div key={ministry.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
              <div className={`w-16 h-16 ${ministry.bg} rounded-2xl flex items-center justify-center text-3xl mb-4`}>{ministry.icon}</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">{ministry.name}</h3>
              <p className="text-secondary-400 text-sm mb-4">{ministry.description}</p>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition active:scale-95">Acessar Ministério</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
