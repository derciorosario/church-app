export const VERSE = {
  text: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
  reference: "Jeremias 29:11",
};

export const EVENTS = [
  { id: 1, title: "Culto de Domingo", date: "2026-07-20T10:00:00", location: "Templo Principal", type: "Culto" },
  { id: 2, title: "Ensaios do Louvor", date: "2026-07-22T19:00:00", location: "Sala de Música", type: "Ensaio" },
  { id: 3, title: "Vigília de Oração", date: "2026-07-25T22:00:00", location: "Templo Principal", type: "Vigília" },
  { id: 4, title: "Reunião de Líderes", date: "2026-07-28T18:30:00", location: "Sala de Conferências", type: "Reunião" },
  { id: 5, title: "Conferência Anual", date: "2026-08-02T09:00:00", location: "Auditório Central", type: "Conferência" },
];

export const ANNOUNCEMENTS = [
  { id: 1, title: "Inscrições Abertas para o Batismo", date: "2026-07-15", content: "As inscrições para o próximo batismo estão abertas. Procure a secretaria.", priority: "high" },
  { id: 2, title: "Campanha de Alimentos", date: "2026-07-14", content: "Estamos a recolher alimentos não perecíveis para famílias carentes.", priority: "medium" },
  { id: 3, title: "Novo Estudo Bíblico", date: "2026-07-13", content: "Disponibilizamos o novo estudo sobre os Salmos.", priority: "low" },
];

export const MINISTRIES = [
  { id: 1, name: "Jovens", description: "Encontros, retiros e atividades para a juventude.", color: "bg-primary-500" },
  { id: 2, name: "Mulheres", description: "Cafés, estudos e eventos para mulheres.", color: "bg-accent-500" },
  { id: 3, name: "Homens", description: "Cafés da manhã e momentos de comunhão masculina.", color: "bg-secondary-500" },
  { id: 4, name: "Louvor", description: "Equipe de música e adoração nos cultos.", color: "bg-highlight-500" },
  { id: 5, name: "Crianças", description: "Escola bíblica e atividades infantis.", color: "bg-gold-500" },
  { id: 6, name: "Evangelismo", description: "Ação social e evangelização na comunidade.", color: "bg-primary-600" },
];

export const PRAYER_REQUESTS = [
  { id: 1, name: "Família Silva", request: "Pedido de cura para a matriarca.", date: "2026-07-15" },
  { id: 2, name: "Irmã Ana", request: "Gratidão pela provisão divina no emprego.", date: "2026-07-14" },
  { id: 3, name: "Irmão Pedro", request: "Pedido de sabedoria para decisão importante.", date: "2026-07-13" },
];

export const GALLERY = [
  { id: 1, title: "Culto de Domingo", type: "photo" },
  { id: 2, title: "Retiro de Jovens", type: "photo" },
  { id: 3, title: "Batismo Coletivo", type: "photo" },
  { id: 4, title: "Conferência 2025", type: "video" },
  { id: 5, title: "Natal da Igreja", type: "photo" },
  { id: 6, title: "Evangelismo de Rua", type: "video" },
];

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
