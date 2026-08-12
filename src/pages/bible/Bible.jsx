import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DEVOTIONALS = [
  {
    id: 1,
    title: "Leitura Diária",
    description: "Capítulo do dia disponível para leitura",
    gradient: "from-primary-500 to-accent-500",
    icon: "📖",
    content: "Jeremias 29:11 - Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais. Medite sobre este versículo hoje e confie que Deus tem planos de esperança para a sua vida.",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Plano de Leitura Anual",
    description: "Leia a Bíblia em 1 ano com nosso plano guiado",
    gradient: "from-highlight-500 to-gold-500",
    icon: "📅",
    content: "Plano de leitura de 365 dias, cobrindo todo o panorama bíblico do Génesis ao Apocalipse. Cada dia inclui passagens do Antigo e Novo Testamento.",
    readTime: "15 min/dia",
  },
  {
    id: 3,
    title: "Estudos Bíblicos",
    description: "Material disponível para download e estudo",
    gradient: "from-accent-500 to-primary-600",
    icon: "📚",
    content: "Série de estudos sobre os Salmos, cartas de Paulo e evangelhos. Material em PDF com perguntas para reflexão em grupo.",
    readTime: "30 min",
  },
];

const CHAPTERS = [
  { book: "Génesis", chapter: 1, title: "A Criação", verses: 31, read: true },
  { book: "Génesis", chapter: 2, title: "O Sábado", verses: 25, read: true },
  { book: "Salmos", chapter: 23, title: "O Senhor é o meu Pastor", verses: 6, read: false },
  { book: "Salmos", chapter: 91, title: "Morada do Altíssimo", verses: 16, read: false },
  { book: "Isaías", chapter: 40, title: "O Consolo de Israel", verses: 31, read: false },
  { book: "Mateus", chapter: 5, title: "O Sermão do Monte", verses: 48, read: true },
  { book: "João", chapter: 3, title: "Jesus e Nicodemos", verses: 36, read: false },
  { book: "Romanos", chapter: 8, title: "Vida no Espírito", verses: 39, read: false },
];

const PLAN_PROGRESS = {
  total: 365,
  completed: 127,
  currentDay: 128,
  currentBook: "Salmos",
  streak: 12,
};

export default function Bible() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [readChapters, setReadChapters] = useState(CHAPTERS.map((c) => c.book + c.chapter));
  const [activeTab, setActiveTab] = useState("devotionals");
  const [readingProgress, setReadingProgress] = useState(PLAN_PROGRESS);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");

  const toggleRead = (chapterKey) => {
    setReadChapters((prev) => {
      if (prev.includes(chapterKey)) {
        return prev.filter((k) => k !== chapterKey);
      }
      return [...prev, chapterKey];
    });
  };

  const toggleBookmark = (chapterKey) => {
    setBookmarks((prev) => (prev.includes(chapterKey) ? prev.filter((k) => k !== chapterKey) : [...prev, chapterKey]));
  };

  const handleSaveNote = (chapterKey) => {
    if (!noteInput.trim()) return;
    setNotes((prev) => ({ ...prev, [chapterKey]: noteInput }));
    setNoteInput("");
  };

  const progressPercentage = Math.round((readingProgress.completed / readingProgress.total) * 100);

  const getDevotionalContent = (id) => {
    const item = DEVOTIONALS.find((d) => d.id === id);
    return item?.content || "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">
          ← Voltar
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Bíblia e Devocionais</h1>
          <p className="text-secondary-400">Leitura diária, planos e estudos bíblicos.</p>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
          {[
            { id: "devotionals", label: "Devocionais", icon: "📖" },
            { id: "bible", label: "Bíblia", icon: "📕" },
            { id: "plan", label: "Plano de Leitura", icon: "📅" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                activeTab === tab.id ? "bg-white text-secondary-900 shadow-sm" : "text-secondary-500 hover:text-secondary-700"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "devotionals" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEVOTIONALS.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4`}>{item.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{item.title}</h3>
                <p className="text-secondary-400 text-sm mb-4">{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-secondary-400 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item.readTime} de leitura</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedItem(item)} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20">
                    Ler Agora
                  </button>
                  <button className="px-4 py-2 border border-gray-200 text-secondary-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition active:scale-95">Guardar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "bible" && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-secondary-900 mb-1">Sagrada Escritura</h3>
              <p className="text-sm text-secondary-400">Selecione um capítulo para ler</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {CHAPTERS.map((chapter) => {
                  const chapterKey = chapter.book + chapter.chapter;
                  const isRead = readChapters.includes(chapterKey);
                  const isBookmarked = bookmarks.includes(chapterKey);

                  return (
                    <div
                      key={chapterKey}
                      className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isRead ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100 hover:border-primary-200 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedChapter(chapter)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-secondary-900 text-sm">{chapter.book}</h4>
                          <p className="text-xs text-secondary-500">Capítulo {chapter.chapter}</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(chapterKey);
                            }}
                            className={`p-1 rounded transition ${isBookmarked ? "text-yellow-500" : "text-gray-300 hover:text-yellow-500"}`}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M5 3v18l7-5 7 5V3H5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-secondary-600 mb-2 line-clamp-2">{chapter.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-secondary-400">{chapter.verses} versículos</span>
                        {isRead && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Lido</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "plan" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-1">Plano de Leitura Anual</h3>
                  <p className="text-sm text-secondary-400">
                    Dia {readingProgress.currentDay} de {readingProgress.total} • {readingProgress.currentBook}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{progressPercentage}%</p>
                    <p className="text-xs text-secondary-400">Concluído</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent-600">{readingProgress.streak}</p>
                    <p className="text-xs text-secondary-400">Dias seguidos</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-4 mb-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-secondary-900">{readingProgress.completed}</p>
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mt-1">Capítulos Lidos</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-secondary-900">{readingProgress.total - readingProgress.completed}</p>
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mt-1">Restantes</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-secondary-900">~238</p>
                  <p className="text-xs text-secondary-400 uppercase tracking-wider mt-1">Dias Restantes</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setReadingProgress((prev) => ({ ...prev, completed: prev.completed + 1, currentDay: prev.currentDay + 1, streak: prev.streak + 1 }))}
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20"
                >
                  Marcar como Lido Hoje
                </button>
                <button className="px-4 py-3 border border-gray-200 text-secondary-700 rounded-xl font-medium hover:bg-gray-50 transition active:scale-95">
                  Reiniciar Plano
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Leitura de Hoje</h3>
              <div className="space-y-3">
                {[
                  { book: "Salmos", chapter: 119, verses: "1-8", title: "Bem-aventurados os que trilham o caminho" },
                  { book: "Mateus", chapter: 5, verses: "1-12", title: "As Bem-aventuranças" },
                ].map((reading, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 font-bold text-xs">{i + 1}</div>
                      <div>
                        <p className="text-sm font-medium text-secondary-900">
                          {reading.book} {reading.chapter}:{reading.verses}
                        </p>
                        <p className="text-xs text-secondary-400">{reading.title}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className={`h-48 bg-gradient-to-br ${selectedItem.gradient} relative`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-white/80 hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">{selectedItem.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedItem.title}</h2>
                    <p className="text-white/80 text-sm mt-1">{selectedItem.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-secondary-500">{selectedItem.readTime} de leitura</span>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-6">{selectedItem.content}</p>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20">
                  Iniciar Leitura
                </button>
                <button onClick={() => setSelectedItem(null)} className="px-4 py-3 border border-gray-200 text-secondary-700 rounded-xl font-medium hover:bg-gray-50 transition active:scale-95">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedChapter(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900">
                    {selectedChapter.book} {selectedChapter.chapter}
                  </h3>
                  <p className="text-secondary-400 mt-1">{selectedChapter.title} • {selectedChapter.verses} versículos</p>
                </div>
                <button onClick={() => setSelectedChapter(null)} className="text-secondary-400 hover:text-secondary-600 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 mb-6 border border-primary-100">
                <p className="text-center text-lg text-secondary-800 leading-relaxed italic">
                  "No princípio criou Deus os céus e a terra. E a terra era sem forma e vazia; e havia trevas sobre a face do abismo, e o Espírito de Deus se movia sobre a face das águas."
                </p>
                <p className="text-center text-sm text-secondary-500 mt-3 font-medium">— Génesis 1:1-2</p>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => toggleRead(selectedChapter.book + selectedChapter.chapter)}
                  className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition active:scale-95 ${
                    readChapters.includes(selectedChapter.book + selectedChapter.chapter)
                      ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                      : "bg-white border border-gray-200 text-secondary-700 hover:bg-gray-50"
                  }`}
                >
                  {readChapters.includes(selectedChapter.book + selectedChapter.chapter) ? "✓ Marcado como Lido" : "Marcar como Lido"}
                </button>
                <button
                  onClick={() => toggleBookmark(selectedChapter.book + selectedChapter.chapter)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition active:scale-95 ${
                    bookmarks.includes(selectedChapter.book + selectedChapter.chapter)
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : "bg-white border border-gray-200 text-secondary-700 hover:bg-gray-50"
                  }`}
                >
                  {bookmarks.includes(selectedChapter.book + selectedChapter.chapter) ? "★ Guardado" : "☆ Guardar"}
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {[1, 2, 3, 4, 5].map((verse) => (
                  <p key={verse} className="text-sm text-secondary-700 leading-relaxed">
                    <span className="text-primary-600 font-semibold mr-2">{verse}</span>
                    Versículo de exemplo do capítulo {selectedChapter.chapter} de {selectedChapter.book}. O Senhor é bom para todos, e as suas misericórdias são sobre todas as suas obras.
                  </p>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-medium text-secondary-700 mb-2">As minhas notas</label>
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none text-sm"
                  rows={3}
                  placeholder="Escreva as suas anotações aqui..."
                ></textarea>
                <button onClick={() => handleSaveNote(selectedChapter.book + selectedChapter.chapter)} className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition active:scale-95">
                  Guardar Nota
                </button>
                {notes[selectedChapter.book + selectedChapter.chapter] && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                    <p className="text-xs text-secondary-500 mb-1">Nota guardada:</p>
                    <p className="text-sm text-secondary-700">{notes[selectedChapter.book + selectedChapter.chapter]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
