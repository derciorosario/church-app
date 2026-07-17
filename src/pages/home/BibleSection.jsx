import { useState } from "react";

const BIBLE_ITEMS = [
  {
    id: 1,
    title: "Leitura Diária",
    subtitle: "Capítulo do dia disponível",
    bg: "bg-highlight-50",
    iconBg: "bg-highlight-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Plano de Leitura Anual",
    subtitle: "Leia a Bíblia em 1 ano",
    bg: "bg-primary-50",
    iconBg: "bg-primary-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Estudos Bíblicos",
    subtitle: "Material disponível para download",
    bg: "bg-accent-50",
    iconBg: "bg-accent-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

export default function BibleSection() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Bíblia e Devocionais</h2>
        <p className="text-secondary-400 mt-1">Leitura diária, planos e estudos</p>
      </div>
      <div className="space-y-4">
        {BIBLE_ITEMS.map((item) => (
          <div key={item.id} className={`flex items-center gap-4 p-4 ${item.bg} rounded-xl`}>
            <div className={`w-10 h-10 ${item.iconBg} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">{item.title}</h3>
              <p className="text-sm text-secondary-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
