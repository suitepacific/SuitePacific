import { MapPin, Clock, Compass } from "lucide-react";
import { getVisitorSessions } from "@/lib/admin-data";

function formatDuration(ms: number) {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function formatLocation(city: string | null, region: string | null, country: string | null) {
  const parts = [city, region, country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Unknown";
}

function formatTimeIST(date: Date) {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function VisitorsPage() {
  const sessions = await getVisitorSessions();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-900">Visitors</h1>
      <p className="mt-1 text-sm text-brand-400">
        Per-visit location, time on page, sections viewed, and exit point. Most recent 200 sessions.
      </p>

      <div className="mt-8 bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-50 text-left text-brand-400">
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Page</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Duration</th>
                <th className="px-5 py-3 font-medium">Sections viewed</th>
                <th className="px-5 py-3 font-medium">Exited at</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-6 text-brand-300 text-center">
                    No visitor sessions recorded yet.
                  </td>
                </tr>
              )}
              {sessions.map((session) => (
                <tr key={session.id} className="border-b border-brand-50 last:border-0 align-top">
                  <td className="px-5 py-3 text-brand-400 whitespace-nowrap">
                    {formatTimeIST(session.createdAt)} IST
                  </td>
                  <td className="px-5 py-3 text-brand-900 font-medium whitespace-nowrap">{session.path}</td>
                  <td className="px-5 py-3 text-brand-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <Compass className="h-3.5 w-3.5 text-brand-300" />
                      {session.source ?? "Direct / Unknown"}
                    </span>
                    {session.campaign && (
                      <div className="text-xs text-brand-300 mt-0.5">{session.campaign}</div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-brand-700">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-brand-300" />
                      {formatLocation(session.city, session.region, session.country)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-brand-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-300" />
                      {formatDuration(session.durationMs)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-brand-700">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {session.sectionsViewed.length === 0 && (
                        <span className="text-brand-300">None</span>
                      )}
                      {session.sectionsViewed.map((sectionId) => (
                        <span
                          key={sectionId}
                          className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs whitespace-nowrap"
                        >
                          {sectionId}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-brand-700 whitespace-nowrap">
                    {session.exitSection ?? <span className="text-brand-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
