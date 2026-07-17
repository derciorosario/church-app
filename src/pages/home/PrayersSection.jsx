import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { PRAYER_REQUESTS } from "./data";

export default function PrayersSection() {
  const { isAuthed } = useAuth();
  const [prayerForm, setPrayerForm] = useState({ name: "", request: "" });
  const [showPrayerForm, setShowPrayerForm] = useState(false);

  const handlePrayerSubmit = (e) => {
    e.preventDefault();
    alert("Pedido de oração enviado! A equipa irá analisar.");
    setPrayerForm({ name: "", request: "" });
    setShowPrayerForm(false);
  };

  return (
    <section id="prayers" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Pedidos de Oração</h2>
        <p className="text-secondary-400 mt-1">Compartilhe os seus pedidos com a equipa pastoral</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {isAuthed ? (
          <div className="mb-6">
            <button
              onClick={() => setShowPrayerForm(!showPrayerForm)}
              className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition active:scale-95"
            >
              {showPrayerForm ? "Cancelar" : "Enviar Pedido de Oração"}
            </button>
          </div>
        ) : (
          <p className="text-sm text-secondary-400 mb-4">Faça login para enviar pedidos de oração.</p>
        )}

        {showPrayerForm && (
          <form onSubmit={handlePrayerSubmit} className="mb-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Novo Pedido</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={prayerForm.name}
                  onChange={(e) => setPrayerForm({ ...prayerForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Pedido</label>
                <textarea
                  value={prayerForm.request}
                  onChange={(e) => setPrayerForm({ ...prayerForm, request: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Descreva o seu pedido..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition active:scale-95"
              >
                Enviar Pedido
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {PRAYER_REQUESTS.map((pr) => (
            <div key={pr.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold flex-shrink-0">
                {pr.name[0]}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-secondary-900">{pr.name}</h4>
                <p className="text-sm text-secondary-600 mt-1">{pr.request}</p>
                <p className="text-xs text-secondary-400 mt-1">{pr.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
