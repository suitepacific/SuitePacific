import { MapPin, Clock, Compass, ArrowRight } from "lucide-react";
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

function SectionPath({
  sections,
  exitSection,
}: {
  sections: string[];
  exitSection: string | null;
}) {
  if (sections.length === 0) {
    return <span className="text-brand-300 text-xs">No sections tracked</span>;
  }

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-1">
        {sections.map((s, i) => {
          const isExit = s === exitSection;
          return (
            <span key={`${s}-${i}`} className="inline-flex items-center gap-1">
              <span
                className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap font-medium ${
                  isExit
                    ? "bg-accent/10 text-accent ring-1 ring-accent/30"
                    : "bg-brand-50 text-brand-600"
                }`}
              >
                {s}
              </span>
              {i < sections.length - 1 && (
                <ArrowRight className="h-3 w-3 text-brand-200 shrink-0" />
              )}
            </span>
          );
        })}
      </div>
      <p className="text-xs text-brand-300">
        {sections.length} section{sections.length !== 1 ? "s" : ""}
        {exitSection && exitSection !== sections[sections.length - 1] && (
          <> &middot; exited at <span className="text-accent">{exitSection}</span></>
        )}
      </p>
    </div>
  );
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
                <th className="px-5 py-3 font-medium whitespace-nowrap">Time</th>
                <th className="px-5 py-3 font-medium whitespace-nowrap">Page</th>
                <th className="px-5 py-3 font-medium whitespace-nowrap">Source</th>
                <th className="px-5 py-3 font-medium whitespace-nowrap">Location</th>
                <th className="px-5 py-3 font-medium whitespace-nowrap">Duration</th>
                <th className="px-5 py-3 font-medium">Sections viewed</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-6 text-brand-300 text-center">
                    No visitor sessions recorded yet.
                  </td>
                </tr>
              )}
              {sessions.map((session) => (
                <tr key={session.id} className="border-b border-brand-50 last:border-0 align-top hover:bg-brand-50/30 transition-colors">
                  <td className="px-5 py-3 text-brand-400 whitespace-nowrap text-xs">
                    {formatTimeIST(session.createdAt)} IST
                  </td>
                  <td className="px-5 py-3 text-brand-900 font-medium whitespace-nowrap max-w-[220px]">
                    <span className="block truncate text-xs" title={session.path}>
                      {session.path}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-brand-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <Compass className="h-3.5 w-3.5 text-brand-300 shrink-0" />
                      {session.source ?? "Direct / Unknown"}
                    </span>
                    {session.campaign && (
                      <div className="text-xs text-brand-300 mt-0.5">{session.campaign}</div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-brand-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <MapPin className="h-3.5 w-3.5 text-brand-300 shrink-0" />
                      {formatLocation(session.city, session.region, session.country)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-brand-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <Clock className="h-3.5 w-3.5 text-brand-300 shrink-0" />
                      {formatDuration(session.durationMs)}
                    </span>
                  </td>
                  <td className="px-5 py-3 min-w-[320px]">
                    <SectionPath
                      sections={session.sectionsViewed}
                      exitSection={session.exitSection}
                    />
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
