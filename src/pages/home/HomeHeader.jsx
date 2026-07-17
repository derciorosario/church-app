import { useAuth } from "../contexts/AuthContext";

export default function HomeHeader() {
  return (
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
            <UserBadge />
          </div>
        </div>
      </div>
    </header>
  );
}

function UserBadge() {
  const { user, isAuthed } = useAuth();
  if (isAuthed && user) {
    return (
      <span className="text-sm bg-primary-500 px-3 py-1 rounded-full">
        Olá, {user.name.split(" ")[0]}
      </span>
    );
  }
  return <span className="text-sm bg-primary-500 px-3 py-1 rounded-full">Visitante</span>;
}
