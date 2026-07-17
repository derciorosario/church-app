import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRAYER_REQUESTS = [
  { id: 1, name: "Família Silva", request: "Pedido de cura para a matriarca.", date: "2026-07-15" },
  { id: 2, name: "Irmã Ana", request: "Gratidão pela provisão divina no emprego.", date: "2026-07-14" },
  { id: 3, name: "Irmão Pedro", request: "Pedido de sabedoria para decisão importante.", date: "2026-07-13" },
  { id: 4, name: "Família Costa", request: "Pedido de saúde e paz para a família.", date: "2026-07-12" },
];

export default function Prayers() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", request: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pedido de oração enviado! A equipa irá analisar.");
    setForm({ name: "", request: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm text-secondary-500 hover:text-secondary-800 transition">← Voltar</button>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">Pedidos de Oração</h1>
        <p className="text-secondary-400 mb-8">Compartilhe os seus pedidos com a equipa pastoral.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Nome</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition" placeholder="Seu nome" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Pedido</label>
                <textarea value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none" rows={4} placeholder="Descreva o seu pedido..." required></textarea>
              </div>
              <button type="submit" className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20">Enviar Pedido</button>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100">
              {PRAYER_REQUESTS.map((pr) => (
                <div key={pr.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">{pr.name[0]}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-secondary-900">{pr.name}</h4>
                        <span className="text-xs text-secondary-400">{pr.date}</span>
                      </div>
                      <p className="text-sm text-secondary-600 mt-1">{pr.request}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
