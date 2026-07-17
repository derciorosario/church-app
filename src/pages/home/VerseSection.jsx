import { VERSE } from "./data";

export default function VerseSection() {
  return (
    <section id="verse" className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 text-white py-16 md:py-24">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'url("/api/placeholder/1200/400")', backgroundSize: "cover", backgroundPosition: "center" }}
        ></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <p className="text-sm uppercase tracking-widest text-highlight-300 mb-4 font-semibold">Versículo do Dia</p>
        <blockquote className="text-2xl md:text-4xl font-light leading-relaxed mb-6 italic">
          &ldquo;{VERSE.text}&rdquo;
        </blockquote>
        <cite className="text-lg md:text-xl font-semibold not-italic text-highlight-200">
          &mdash; {VERSE.reference}
        </cite>
      </div>
    </section>
  );
}
