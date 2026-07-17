import { VERSE } from "./data";

export default function VerseSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-accent-600/5 to-highlight-500/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Versículo do Dia
          </div>

          <blockquote className="text-2xl md:text-4xl font-medium text-secondary-900 leading-relaxed mb-6 tracking-tight">
            &ldquo;{VERSE.text}&rdquo;
          </blockquote>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
            <cite className="text-sm font-semibold text-secondary-700 not-italic">
              {VERSE.reference}
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
