import { GALLERY } from "./data";

export default function GallerySection() {
  return (
    <section className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Galeria</h2>
          <p className="text-secondary-400 mt-1">Fotos e vídeos dos eventos</p>
        </div>
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700 transition">
          Ver tudo →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {GALLERY.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-secondary-400 text-xs font-medium px-2 text-center">{item.title}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.type === "video" ? (
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              ) : (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              )}
            </div>
            {item.type === "video" && (
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Vídeo
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
