import { MINISTRIES } from "./data";

export default function MinistriesSection() {
  return (
    <section id="ministries" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Ministérios</h2>
        <p className="text-secondary-400 mt-1">Cada ministério tem a sua própria área</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MINISTRIES.map((ministry) => (
          <div
            key={ministry.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition group"
          >
            <div
              className={`w-12 h-12 ${ministry.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 transition-transform`}
            >
              {ministry.name[0]}
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">{ministry.name}</h3>
            <p className="text-secondary-400 text-sm leading-relaxed">{ministry.description}</p>
            <button className="mt-4 text-primary-600 text-sm font-semibold hover:text-primary-700 transition">
              Saber mais →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
