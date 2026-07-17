import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { PRAYER_REQUESTS } from "./data";

export default function PrayersSection() {
  const { isAuthed } = useAuth();
  const [prayerForm, setPrayerForm] = useState({ name: "", request: "" });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pedido de oração enviado! A equipa irá analisar.");
    setPrayerForm({ name: "", request: "" });
    setShowForm(false);
  };

  return (
    <section id="prayers" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Pedidos de Oração</h2>
        <p className="text-secondary-400 mt-1">Compartilhe os seus pedidos com a equipa pastoral</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {isAuthed ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 active:scale-95"
            >
              {showForm ? "Cancelar" : "+ Novo Pedido"}
            </button>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
              <p className="text-sm text-secondary-500">Faça login para enviar pedidos de oração.</p>
            </div>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={prayerForm.name}
                  onChange={(e) => setPrayerForm({ ...prayerForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Pedido</label>
                <textarea
                  value={prayerForm.request}
                  onChange={(e) => setPrayerForm({ ...prayerForm, request: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition resize-none"
                  rows={4}
                  placeholder="Descreva o seu pedido..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition active:scale-95 shadow-lg shadow-primary-500/20"
              >
                Enviar Pedido
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100">
            {PRAYER_REQUESTS.map((pr) => (
              <div key={pr.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-md shadow-primary-500/20">
                    {pr.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-secondary-900">{pr.name}</h4>
                      <span className="text-xs text-secondary-400 flex-shrink-0">{pr.date}</span>
                    </div>
                    <p className="text-sm text-secondary-600 mt-1 leading-relaxed">{pr.request}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
