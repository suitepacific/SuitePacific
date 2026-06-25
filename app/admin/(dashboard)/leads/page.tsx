import { getAllLeads } from "@/lib/admin-data";

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-brand-900">Leads</h1>
      <p className="mt-1 text-sm text-brand-400">{leads.length} total submissions.</p>

      <div className="mt-8 bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-50 text-left text-brand-400">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Message</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-brand-50 last:border-0">
                <td className="px-5 py-3 font-medium text-brand-900 whitespace-nowrap">{lead.name}</td>
                <td className="px-5 py-3 text-brand-600 whitespace-nowrap">{lead.email}</td>
                <td className="px-5 py-3 text-brand-600 whitespace-nowrap">{lead.company}</td>
                <td className="px-5 py-3 text-brand-400 max-w-xs truncate">{lead.message ?? "No message"}</td>
                <td className="px-5 py-3 text-brand-300 whitespace-nowrap">
                  {lead.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-brand-300">No leads yet.</p>
        )}
      </div>
    </div>
  );
}
