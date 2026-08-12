import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: 1, title: "Culto de Domingo", type: "photo", category: "Culto", date: "2026-08-10", likes: 24, liked: false, description: "Culto dominical com Santa Ceia e louvor.", image: "from-primary-500 to-primary-700" },
  { id: 2, title: "Retiro de Jovens", type: "photo", category: "Jovens", date: "2026-08-05", likes: 18, liked: false, description: "Momento de comunhão e reflexão no retiro anual.", image: "from-accent-500 to-accent-700" },
  { id: 3, title: "Batismo Coletivo", type: "photo", category: "Culto", date: "2026-07-28", likes: 45, liked: false, description: "Batismo de 12 novos membros na igreja.", image: "from-highlight-500 to-highlight-700" },
  { id: 4, title: "Conferência 2025", type: "video", category: "Conferência", date: "2026-07-20", likes: 32, liked: false, description: "Conferência anual com pregadores convidados.", image: "from-gold-500 to-gold-700" },
  { id: 5, title: "Natal da Igreja", type: "photo", category: "Convívio", date: "2025-12-24", likes: 67, liked: false, description: "Celebração de Natal com toda a comunidade.", image: "from-red-500 to-red-700" },
  { id: 6, title: "Evangelismo de Rua", type: "video", category: "Evangelismo", date: "2026-07-15", likes: 29, liked: false, description: "Ação de evangelismo no centro da cidade.", image: "from-emerald-500 to-emerald-700" },
  { id: 7, title: "Café Mulheres", type: "photo", category: "Mulheres", date: "2026-07-12", likes: 15, liked: false, description: "Manhã de convívio e comunhão entre mulheres.", image: "from-pink-500 to-pink-700" },
  { id: 8, title: "Ensaio Louvor", type: "photo", category: "Louvor", date: "2026-07-10", likes: 12, liked: false, description: "Ensaio da equipe de louvor para o culto.", image: "from-secondary-500 to-secondary-700" },
  { id: 9, title: "Ação Social", type: "photo", category: "Evangelismo", date: "2026-07-08", likes: 38, liked: false, description: "Distribuição de alimentos e roupas na comunidade.", image: "from-orange-500 to-orange-700" },
  { id: 10, title: "Culto de Gratidão", type: "video", category: "Culto", date: "2026-07-01", likes: 41, liked: false, description: "Culto especial de ação de graças.", image: "from-indigo-500 to-indigo-700" },
];

const CATEGORIES = ["Todos", "Culto", "Jovens", "Conferência", "Convívio", "Evangelismo", "Mulheres", "Louvor"];
const TYPES = ["Todos", "photo", "video"];

export default function Gallery() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedItem, setSelectedItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState(ITEMS);
  const [viewMode, setViewMode] = useState("grid");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", category: "Culto", description: "" });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesType = selectedType === "Todos" || item.type === selectedType;
      const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
      return matchesType && matchesCategory;
    });
  }, [selectedType, selectedCategory, galleryItems]);

  const handleLike = (itemId) => {
    setGalleryItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const isLiked = item.liked;
        return {
          ...item,
          liked: !isLiked,
          likes: isLiked ? item.likes - 1 : item.likes + 1,
        };
      })
    );
  };

  const handleShare = (item) => {
    const dummyLink = `https://igrejaconectada.mz/gallery/${item.id}`;
    alert(`Link copiado!\n\n${dummyLink}\n\nPartilhe este conteúdo com a comunidade.`);
  };

  const handleDownload = (item) => {
    alert(`A descarregar: ${item.title}\n\nO ficheiro será guardado na sua galeria.`);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title: uploadForm.title,
      type: "photo",
      category: uploadForm.category,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      liked: false,
      description: uploadForm.description,
      image: "from-gray-400 to-gray-600",
    };
    setGalleryItems((prev) => [newItem, ...prev]);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUpload(false);
      setUploadForm({ title: "", category: "Culto", description: "" });
    }, 2000);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Culto: "bg-primary-50 text-primary-700",
      Jovens: "bg-accent-50 text-accent-700",
      Conferência: "bg-gold-50 text-gold-700",
      Convívio: "bg-highlight-50 text-highlight-700",
      Evangelismo: "bg-emerald-50 text-emerald-700",
      Mulheres: "bg-pink-50 text-pink-700",
      Louvor: "bg-secondary-100 text-secondary-700",
    };
    return colors[category] || "bg-gray-50 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">
          ← Voltar
        </button>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Galeria</h1>
            <p className="text-secondary-400">Fotos e vídeos dos eventos da igreja.</p>
          </div>
          <button onClick={() => setShowUpload(!showUpload)} className="px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20 whitespace-nowrap flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showUpload ? "Cancelar" : "Carregar"}
          </button>
        </div>

        {showUpload && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Carregar Nova Foto</h3>
            {uploadSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">Foto Carregada!</h4>
                <p className="text-sm text-secondary-400">A sua foto foi adicionada à galeria.</p>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Título</label>
                    <input
                      type="text"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm"
                      placeholder="Nome do evento"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Categoria</label>
                    <select
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm bg-white"
                    >
                      {CATEGORIES.filter((c) => c !== "Todos").map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Descrição</label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm resize-none"
                    rows={2}
                    placeholder="Descreva a foto..."
                    required
                  ></textarea>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-300 transition">
                  <svg className="w-12 h-12 text-secondary-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-secondary-500">Clique para selecionar ou arraste uma imagem</p>
                  <p className="text-xs text-secondary-400 mt-1">PNG, JPG até 10MB</p>
                </div>
                <button type="submit" className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20">
                  Publicar na Galeria
                </button>
              </form>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1 w-fit">
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                  selectedType === type ? "bg-white text-secondary-900 shadow-sm" : "text-secondary-500 hover:text-secondary-700"
                }`}
              >
                {type === "Todos" ? "🖼️" : type === "photo" ? "📷" : "🎬"}
                {type === "Todos" ? "Todos" : type === "photo" ? "Fotos" : "Vídeos"}
              </button>
            ))}
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 text-sm text-secondary-500">
          {filteredItems.length} {filteredItems.length === 1 ? "item" : "itens"} na galeria
        </div>

        {filteredItems.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-4 gap-4" : "space-y-4"}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group relative bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer ${
                  viewMode === "list" ? "flex items-center gap-4 p-4" : "aspect-square"
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div
                  className={`bg-gradient-to-br ${item.image} relative ${
                    viewMode === "list" ? "w-24 h-24 rounded-xl flex-shrink-0" : "w-full h-full"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/90 font-medium text-sm px-2 text-center">{item.title}</span>
                  </div>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getCategoryColor(item.category)}`}>{item.category}</span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs bg-black/60 text-white px-2 py-1 rounded-lg flex items-center gap-1">
                      {item.type === "video" && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
                      {item.type === "photo" ? "📷" : "🎬"}
                    </span>
                  </div>
                </div>

                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(item.id);
                  }}
                >
                  <div className={`px-4 py-2 rounded-full font-medium text-sm transition ${item.liked ? "bg-red-500 text-white" : "bg-white text-secondary-700"}`}>
                    {item.liked ? "❤️" : "🤍"} {item.likes}
                  </div>
                </div>

                {viewMode === "list" && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-secondary-900 text-sm truncate">{item.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${getCategoryColor(item.category)}`}>{item.category}</span>
                    </div>
                    <p className="text-xs text-secondary-400 mb-2 line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-3 text-xs text-secondary-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {item.likes}
                      </span>
                      <span>{item.date}</span>
                      <span className="capitalize">{item.type === "video" ? "🎬 Vídeo" : "📷 Foto"}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">Nenhum item encontrado</h3>
            <p className="text-secondary-400 text-sm">Seja o primeiro a carregar uma foto ou vídeo.</p>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 bg-black flex items-center justify-center min-h-[300px]">
              <div className={`w-full h-full min-h-[300px] bg-gradient-to-br ${selectedItem.image} flex items-center justify-center relative`}>
                <div className="text-center">
                  <p className="text-white font-medium text-lg mb-2">{selectedItem.title}</p>
                  {selectedItem.type === "video" && (
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getCategoryColor(selectedItem.category)}`}>{selectedItem.category}</span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg">{selectedItem.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 bg-white p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-secondary-900">{selectedItem.title}</h3>
                <button onClick={() => setSelectedItem(null)} className="text-secondary-400 hover:text-secondary-600 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-secondary-600 mb-6 leading-relaxed">{selectedItem.description}</p>

              <div className="flex items-center gap-2 mb-6">
                <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getCategoryColor(selectedItem.category)}`}>{selectedItem.category}</span>
                <span className="text-xs bg-gray-100 text-secondary-600 px-2.5 py-1 rounded-lg">{selectedItem.type === "video" ? "🎬 Vídeo" : "📷 Foto"}</span>
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-secondary-600">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">{selectedItem.likes} gostos</span>
                </div>
                <button
                  onClick={() => {
                    handleLike(selectedItem.id);
                    setSelectedItem((prev) => (prev ? { ...prev, liked: !prev.liked, likes: prev.liked ? prev.likes - 1 : prev.likes + 1 } : prev));
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition active:scale-95 ${
                    selectedItem.liked ? "bg-red-600 text-white" : "bg-white border border-gray-200 text-secondary-700 hover:bg-gray-50"
                  }`}
                >
                  {selectedItem.liked ? "❤️ Gostei" : "🤍 Gostar"}
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <button onClick={() => handleShare(selectedItem)} className="w-full px-4 py-2.5 border border-gray-200 text-secondary-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition active:scale-95 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.5 9 12c0-.5-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Partilhar
                </button>
                <button onClick={() => handleDownload(selectedItem)} className="w-full px-4 py-2.5 border border-gray-200 text-secondary-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition active:scale-95 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descarregar
                </button>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs text-secondary-400">Publicado em {selectedItem.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
