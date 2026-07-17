export default function BibleSection() {
  const items = [
    {
      title: "Leitura Diária",
      description: "Capítulo do dia disponível",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: "from-primary-500 to-accent-500",
    },
    {
      title: "Plano de Leitura Anual",
      description: "Leia a Bíblia em 1 ano",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      gradient: "from-highlight-500 to-gold-500",
    },
    {
      title: "Estudos Bíblicos",
      description: "Material disponível para download",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      gradient: "from-accent-500 to-primary-600",
    },
  ];

  return (
    <section className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Bíblia e Devocionais</h2>
        <p className="text-secondary-400 mt-1">Leitura diária, planos e estudos</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 p-5 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-secondary-400">{item.description}</p>
              </div>
              <svg className="w-5 h-5 text-secondary-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
