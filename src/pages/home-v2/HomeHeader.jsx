import { useAuth } from "../contexts/AuthContext";

export default function HomeHeader() {
  const { user, isAuthed } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-white font-bold text-lg">IC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-secondary-900">Igreja Conectada</h1>
              <p className="text-xs text-secondary-400">Plataforma da Igreja</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {["Início", "Eventos", "Ministérios", "Oração"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-900 hover:bg-white rounded-lg transition"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthed && user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold text-sm">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-secondary-700 hidden sm:block">
                  {user.name.split(" ")[0]}
                </span>
              </div>
            ) : (
              <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition shadow-lg shadow-primary-500/20">
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
