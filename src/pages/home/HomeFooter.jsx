export default function HomeFooter() {
  return (
    <footer className="bg-secondary-900 text-secondary-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">IC</div>
            <span className="font-semibold text-white">Igreja Conectada</span>
          </div>
          <p className="text-sm text-secondary-400">
            &copy; {new Date().getFullYear()} Igreja Conectada. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-white transition">Privacidade</a>
            <a href="#" className="hover:text-white transition">Termos</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
