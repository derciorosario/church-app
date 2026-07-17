import { MINISTRIES } from "./data";

export default function MinistriesSection() {
  return (
    <section id="ministries" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Ministérios</h2>
          <p className="text-secondary-400 mt-1">Cada ministério tem a sua própria área</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {MINISTRIES.map((ministry) => (
          <div
            key={ministry.id}
            className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg hover:shadow-gray-200/50 hover:border-primary-100 transition-all duration-300 cursor-pointer text-center"
          >
            <div className={`w-14 h-14 ${ministry.bg} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
              {ministry.icon}
            </div>
            <h3 className="font-semibold text-secondary-900 text-sm mb-1">{ministry.name}</h3>
            <p className="text-xs text-secondary-400 line-clamp-2">{ministry.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
