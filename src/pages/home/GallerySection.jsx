import { GALLERY } from "./data";

export default function GallerySection() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Galeria</h2>
        <p className="text-secondary-400 mt-1">Fotos e vídeos dos eventos</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {GALLERY.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-secondary-400 text-xs">{item.title}</span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
              {item.type === "video" && (
                <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
            {item.type === "video" && (
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Vídeo
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
