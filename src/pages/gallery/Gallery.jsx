import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: 1, title: "Culto de Domingo", type: "photo" },
  { id: 2, title: "Retiro de Jovens", type: "photo" },
  { id: 3, title: "Batismo Coletivo", type: "photo" },
  { id: 4, title: "Conferência 2025", type: "video" },
  { id: 5, title: "Natal da Igreja", type: "photo" },
  { id: 6, title: "Evangelismo de Rua", type: "video" },
  { id: 7, title: "Café Mulheres", type: "photo" },
  { id: 8, title: "Ensaio Louvor", type: "photo" },
];

export default function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">← Voltar</button>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Galeria</h1>
        <p className="text-secondary-400 mb-8">Fotos e vídeos dos eventos da igreja.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ITEMS.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center"><span className="text-secondary-400 text-xs font-medium px-2 text-center">{item.title}</span></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                {item.type === "video" && <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
              </div>
              {item.type === "video" && <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>Vídeo</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
