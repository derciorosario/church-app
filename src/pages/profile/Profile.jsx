import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthed } = useAuth();

  if (!isAuthed || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">Acesso Restrito</h1>
          <p className="text-secondary-400 mb-6">Faça login para ver o seu perfil.</p>
          <button onClick={() => navigate("/")} className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition">Voltar ao Início</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">← Voltar</button>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Perfil do Membro</h1>
        <p className="text-secondary-400 mb-8">Gerencie as suas informações.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-secondary-900 text-lg">{user.name}</h3>
                <p className="text-sm text-secondary-400 mt-1">{user.email}</p>
                <span className="inline-block mt-3 text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full font-medium">{user.role || "Membro"}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Eventos Inscritos", value: "3" },
                { label: "Mensagens", value: "5" },
                { label: "Contribuições", value: "12" },
                { label: "Ministério", value: "Jovens" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <p className="text-xs text-secondary-400 uppercase tracking-wide mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
