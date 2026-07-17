export default function NotificationsSection() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1">Receba notificações da igreja</h3>
          <p className="text-primary-100 text-sm">Eventos, avisos e estudos bíblicos directamente no seu telemóvel.</p>
        </div>
        <button className="px-6 py-3 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition active:scale-95 whitespace-nowrap">
          Activar Notificações
        </button>
      </div>
    </section>
  );
}
