import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const PRAYER_REQUESTS = [
  { id: 1, name: "Família Silva", request: "Pedido de cura para a matriarca que está internada.", date: "2026-08-10", category: "Saúde", urgency: "high", prayers: 12, answered: false },
  { id: 2, name: "Irmã Ana", request: "Gratidão pela provisão divina no emprego novo.", date: "2026-08-09", category: "Gratidão", urgency: "low", prayers: 8, answered: false },
  { id: 3, name: "Irmão Pedro", request: "Pedido de sabedoria para decisão importante sobre mudança de cidade.", date: "2026-08-08", category: "Orientação", urgency: "medium", prayers: 5, answered: false },
  { id: 4, name: "Família Costa", request: "Pedido de saúde e paz para o filho que viaja para estudar.", date: "2026-08-07", category: "Família", urgency: "medium", prayers: 15, answered: false },
  { id: 5, name: "Irmã Marta", request: "Ação de graças pela recuperação do meu filho.", date: "2026-08-06", category: "Gratidão", urgency: "low", prayers: 23, answered: true },
  { id: 6, name: "Diácono João", request: "Pedido de unidade na igreja e nos lares.", date: "2026-08-05", category: "Igreja", urgency: "high", prayers: 31, answered: false },
  { id: 7, name: "Família Oliveira", request: "Pedido de provisão financeira para pagar dívidas.", date: "2026-08-04", category: "Finanças", urgency: "high", prayers: 19, answered: false },
  { id: 8, name: "Irmã Beatriz", request: "Pedido de cura para depressão e ansiedade.", date: "2026-08-03", category: "Saúde", urgency: "high", prayers: 27, answered: false },
];

const CATEGORIES = ["Todos", "Saúde", "Família", "Gratidão", "Orientação", "Igreja", "Finanças", "Outros"];
const URGENCY_LABELS = { high: "Urgente", medium: "Médio", low: "Normal" };

export default function Prayers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedUrgency, setSelectedUrgency] = useState("Todos");
  const [prayingFor, setPrayingFor] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState(PRAYER_REQUESTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", request: "", category: "Outros", urgency: "medium" });
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredPrayers = useMemo(() => {
    return prayerRequests.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.request.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
      const matchesUrgency = selectedUrgency === "Todos" || p.urgency === selectedUrgency;
      return matchesSearch && matchesCategory && matchesUrgency;
    });
  }, [searchQuery, selectedCategory, selectedUrgency, prayerRequests]);

  const handlePray = (prayerId) => {
    setPrayingFor((prev) => {
      if (prev.includes(prayerId)) {
        setPrayerRequests((prevRequests) => prevRequests.map((p) => (p.id === prayerId ? { ...p, prayers: Math.max(0, p.prayers - 1) } : p)));
        return prev.filter((id) => id !== prayerId);
      }
      setPrayerRequests((prevRequests) => prevRequests.map((p) => (p.id === prayerId ? { ...p, prayers: p.prayers + 1 } : p)));
      return [...prev, prayerId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPrayer = {
      id: Date.now(),
      name: form.name,
      request: form.request,
      date: new Date().toISOString().split("T")[0],
      category: form.category,
      urgency: form.urgency,
      prayers: 0,
      answered: false,
    };
    setPrayerRequests((prev) => [newPrayer, ...prev]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowForm(false);
      setForm({ name: "", request: "", category: "Outros", urgency: "medium" });
    }, 2000);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Saúde: "bg-red-50 text-red-700",
      Família: "bg-blue-50 text-blue-700",
      Gratidão: "bg-green-50 text-green-700",
      Orientação: "bg-purple-50 text-purple-700",
      Igreja: "bg-primary-50 text-primary-700",
      Finanças: "bg-gold-50 text-gold-700",
      Outros: "bg-gray-50 text-gray-700",
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
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Pedidos de Oração</h1>
            <p className="text-secondary-400">Compartilhe os seus pedidos com a equipa pastoral e a comunidade.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="px-6 py-3 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20 whitespace-nowrap">
            {showForm ? "Cancelar" : "+ Novo Pedido"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Novo Pedido de Oração</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Categoria</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm bg-white"
                  >
                    {CATEGORIES.filter((c) => c !== "Todos").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Urgência</label>
                  <select
                    value={form.urgency}
                    onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm bg-white"
                  >
                    <option value="low">Normal</option>
                    <option value="medium">Médio</option>
                    <option value="high">Urgente</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Pedido de Oração</label>
                <textarea
                  value={form.request}
                  onChange={(e) => setForm({ ...form, request: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
                  rows={4}
                  placeholder="Descreva o seu pedido de oração..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20">
                Enviar Pedido
              </button>
            </form>
          </div>
        )}

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">Pedido de oração enviado!</p>
              <p className="text-xs text-green-600 mt-0.5">A equipa pastoral entrará em contacto em breve.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-secondary-900 mb-3 uppercase tracking-wider">Filtros</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-secondary-500 mb-1">Pesquisar</label>
                  <div className="relative">
                    <svg className="w-4 h-4 text-secondary-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquisar..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-500 mb-1">Categoria</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-500 mb-1">Urgência</label>
                  <select
                    value={selectedUrgency}
                    onChange={(e) => setSelectedUrgency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition text-sm bg-white"
                  >
                    <option value="Todos">Todos</option>
                    <option value="high">Urgente</option>
                    <option value="medium">Médio</option>
                    <option value="low">Normal</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Equipa Pastoral</h3>
                  <p className="text-xs text-white/80">Estamos a orar por si</p>
                </div>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                Os pedidos são cuidadosamente analisados pela equipa pastoral. Todos os pedidos são tratados com confidencialidade.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100">
              {filteredPrayers.map((pr) => {
                const isPraying = prayingFor.includes(pr.id);

                return (
                  <div key={pr.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {pr.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold text-secondary-900">{pr.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${getCategoryColor(pr.category)}`}>{pr.category}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-lg font-medium border ${getUrgencyColor(pr.urgency)}`}>{URGENCY_LABELS[pr.urgency]}</span>
                          {pr.answered && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-lg font-medium">✓ Respondido</span>}
                        </div>
                        <p className="text-sm text-secondary-600 mb-2 leading-relaxed">{pr.request}</p>
                        <div className="flex items-center gap-4 text-xs text-secondary-400">
                          <span>{new Date(pr.date).toLocaleDateString("pt-PT")}</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {pr.prayers} orações
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handlePray(pr.id)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition active:scale-95 ${
                              isPraying ? "bg-red-50 text-red-700 border border-red-200" : "bg-white border border-gray-200 text-secondary-700 hover:bg-gray-50"
                            }`}
                          >
                            {isPraying ? "💖 A orar" : "Orar por este pedido"}
                          </button>
                          <button
                            onClick={() => setSelectedPrayer(pr)}
                            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-white border border-gray-200 text-secondary-700 hover:bg-gray-50 transition active:scale-95"
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPrayers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">Nenhum pedido encontrado</h3>
                <p className="text-secondary-400 text-sm">Seja o primeiro a compartilhar um pedido de oração.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedPrayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPrayer(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {selectedPrayer.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900">{selectedPrayer.name}</h3>
                  <p className="text-xs text-secondary-400">{new Date(selectedPrayer.date).toLocaleDateString("pt-PT")}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPrayer(null)} className="text-secondary-400 hover:text-secondary-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getCategoryColor(selectedPrayer.category)}`}>{selectedPrayer.category}</span>
              <span className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${getUrgencyColor(selectedPrayer.urgency)}`}>{URGENCY_LABELS[selectedPrayer.urgency]}</span>
              {selectedPrayer.answered && <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-lg font-medium">✓ Respondido</span>}
            </div>

            <p className="text-secondary-700 leading-relaxed mb-6">{selectedPrayer.request}</p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-secondary-600">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">{selectedPrayer.prayers} pessoas orando</span>
                </div>
                <button
                  onClick={() => handlePray(selectedPrayer.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition active:scale-95 ${
                    prayingFor.includes(selectedPrayer.id) ? "bg-red-600 text-white" : "bg-white border border-gray-200 text-secondary-700 hover:bg-gray-50"
                  }`}
                >
                  {prayingFor.includes(selectedPrayer.id) ? "💖 A orar" : "Orar Agora"}
                </button>
              </div>

            <div className="flex gap-3">
              <button onClick={() => setSelectedPrayer(null)} className="flex-1 px-4 py-3 border border-gray-200 text-secondary-700 rounded-xl font-medium hover:bg-gray-50 transition active:scale-95">
                Fechar
              </button>
              <button onClick={() => { setShowForm(true); setSelectedPrayer(null); }} className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20">
                + Novo Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
