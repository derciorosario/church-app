import { useAuth } from "../contexts/AuthContext";

export default function ProfileSection() {
  const { user, isAuthed } = useAuth();

  if (!isAuthed || !user) return null;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Perfil do Membro</h2>
        <p className="text-secondary-400 mt-1">Gerencie as suas informações</p>
      </div>
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
  );
}
