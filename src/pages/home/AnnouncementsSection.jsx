import { ANNOUNCEMENTS } from "./data";

export default function AnnouncementsSection() {
  return (
    <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-secondary-900 mb-2">Últimos Avisos</h3>
      <ul className="space-y-2">
        {ANNOUNCEMENTS.map((a) => (
          <li key={a.id} className="flex items-start gap-2 text-sm">
            <span
              className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                a.priority === "high"
                  ? "bg-red-500"
                  : a.priority === "medium"
                  ? "bg-highlight-500"
                  : "bg-secondary-300"
              }`}
            ></span>
            <div>
              <p className="font-medium text-secondary-800">{a.title}</p>
              <p className="text-secondary-400 text-xs">{a.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
