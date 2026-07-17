import { useAuth } from "../contexts/AuthContext";

export default function ProfileSection() {
  const { user, isAuthed } = useAuth();

  if (!isAuthed || !user) return null;

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Perfil do Membro</h2>
        <p className="text-secondary-400 mt-1">Gerencie as suas informações</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg shadow-primary-500/20">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-secondary-900 text-lg">{user.name}</h3>
              <p className="text-sm text-secondary-400 mt-1">{user.email}</p>
              <span className="inline-block mt-3 text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full font-medium">
                {user.role || "Membro"}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Eventos Inscritos", value: "3", color: "from-primary-500 to-accent-500" },
              { label: "Mensagens", value: "5", color: "from-highlight-500 to-gold-500" },
              { label: "Contribuições", value: "12", color: "from-accent-500 to-primary-600" },
              { label: "Ministério", value: "Jovens", color: "from-secondary-500 to-secondary-600" },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <p className="text-xs text-secondary-400 uppercase tracking-wide mb-2">{stat.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
