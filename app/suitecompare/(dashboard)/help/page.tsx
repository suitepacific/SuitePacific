import { requireScUser } from "@/lib/sc-auth";
import { KeyRound, Building2, FileCode2, GitCompare, Mail, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { FaqItem } from "./FaqItem";

function NavPath({ path }: { path: string[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1 font-mono text-xs bg-brand-50 border border-brand-100 rounded-lg px-2.5 py-1.5 text-brand-700">
      {path.map((p, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-brand-300">›</span>}
          {p}
        </span>
      ))}
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-xs bg-brand-50 border border-brand-100 rounded px-1.5 py-0.5 text-brand-700">
      {children}
    </span>
  );
}

const ROLE_PERMISSIONS = [
  { tab: "Lists", permission: "Documents and Files", level: "View" },
  { tab: "Setup", permission: "Log in using Access Tokens", level: "Full" },
  { tab: "Setup", permission: "REST Web Services", level: "Full" },
  { tab: "Setup", permission: "SOAP Web Services", level: "Full" },
  { tab: "Setup", permission: "Set Up SOAP Web Services", level: "Full" },
  { tab: "Setup", permission: "SuiteScript", level: "View" },
];

export default async function HelpPage() {
  const user = await requireScUser();

  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-brand-900">Help Center</h1>
        <p className="mt-1 text-sm text-brand-400">
          TBA setup guide, how-to walkthrough, and answers to common questions.
        </p>
      </div>

      {/* TBA Setup Guide */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <KeyRound className="h-4 w-4 text-accent" />
          <h2 className="text-base font-semibold text-brand-900">TBA Setup Guide</h2>
        </div>
        <p className="text-sm text-brand-400 mb-6">
          You need four values from NetSuite: Consumer Key, Consumer Secret, Token ID, and Token Secret. Do this separately for each environment (Production and Sandbox).
        </p>

        <div className="space-y-4">

          <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5 flex gap-5">
            <span className="text-2xl font-bold text-brand-100 shrink-0 leading-none mt-0.5 w-6 text-center">1</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-brand-900 mb-3">Create an Integration Record</h3>
              <NavPath path={["Setup", "Integration", "Manage Integrations", "New"]} />
              <ul className="mt-3 space-y-1.5 text-sm text-brand-500">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Give it a name, e.g. <Tag>SuiteCompare</Tag></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Enable <Tag>Token-Based Authentication</Tag></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Save the record</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Copy the <Tag>Consumer Key</Tag> and <Tag>Consumer Secret</Tag> from the confirmation screen</li>
              </ul>
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">The Consumer Secret is shown only once. Copy it before navigating away.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5 flex gap-5">
            <span className="text-2xl font-bold text-brand-100 shrink-0 leading-none mt-0.5 w-6 text-center">2</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-brand-900 mb-3">Generate an Access Token</h3>
              <NavPath path={["Setup", "Users/Roles", "Access Tokens", "New"]} />
              <ul className="mt-3 space-y-1.5 text-sm text-brand-500">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Application: select the integration record you just created</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />User: select the employee who will run comparisons</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Role: select a role with the required permissions (see FAQ below)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Save and copy the <Tag>Token ID</Tag> and <Tag>Token Secret</Tag></li>
              </ul>
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">The Token Secret is shown only once. Copy it before navigating away.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5 flex gap-5">
            <span className="text-2xl font-bold text-brand-100 shrink-0 leading-none mt-0.5 w-6 text-center">3</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-brand-900 mb-3">Find your NetSuite Account ID</h3>
              <p className="text-sm text-brand-500 mb-2">Your Account ID is the number in your NetSuite URL:</p>
              <div className="rounded-lg bg-brand-50 border border-brand-100 px-3 py-2 font-mono text-xs text-brand-700">
                <span className="text-accent font-bold">1234567</span>.app.netsuite.com
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-brand-500">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Production: digits only, e.g. <Tag>1234567</Tag></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Sandbox: includes a suffix, e.g. <Tag>1234567_SB1</Tag></li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-brand-50 shadow-soft p-5 flex gap-5">
            <span className="text-2xl font-bold text-brand-100 shrink-0 leading-none mt-0.5 w-6 text-center">4</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-brand-900 mb-3">Enter Credentials in SuiteCompare</h3>
              <ul className="space-y-1.5 text-sm text-brand-500">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Go to your client page and click the settings icon on the environment card</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />Enter: Account ID, Consumer Key, Consumer Secret, Token ID, Token Secret</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand-200 shrink-0 mt-0.5" />SuiteCompare tests the connection live before saving</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* How to use */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <GitCompare className="h-4 w-4 text-accent" />
          <h2 className="text-base font-semibold text-brand-900">How to Use SuiteCompare</h2>
        </div>
        <p className="text-sm text-brand-400 mb-6">Once credentials are configured, a comparison takes seconds.</p>

        <div className="bg-white rounded-2xl border border-brand-50 shadow-soft overflow-hidden">
          {[
            { icon: Building2, step: "1", title: "Add a Client", items: ["Click Add Client on the Dashboard", "Enter the client name and their NetSuite Account ID", "Production and Sandbox environments are created automatically"] },
            { icon: KeyRound, step: "2", title: "Configure TBA Credentials", items: ["Click the settings icon on each environment card", "Paste in the four TBA values", "A green dot confirms the connection is live"] },
            { icon: FileCode2, step: "3", title: "Browse a Script", items: ["Enter a Script ID in the Browse field on the client page", "SuiteCompare fetches the name and type from NetSuite", "The script appears in your list, ready to compare"] },
            { icon: GitCompare, step: "4", title: "Compare", items: ["Click Compare next to any script", "Code tab: line-by-line diff of source code across environments", "Deployments tab: record type, status, and log level for each deployment"] },
          ].map((s, i, arr) => (
            <div key={s.title} className={`flex gap-4 p-5 ${i < arr.length - 1 ? "border-b border-brand-50" : ""}`}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 mt-0.5">
                <s.icon className="h-4 w-4 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-brand-900 mb-2">{s.step}. {s.title}</p>
                <ul className="space-y-1">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-brand-500">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-brand-200 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="mb-12">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 flex gap-4">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-brand-900 mb-2">How we protect your data</h3>
            <ul className="space-y-1.5">
              {[
                "All four TBA credentials are encrypted with AES-256-GCM before being stored",
                "Credentials are never logged or transmitted in plaintext",
                "Script source code is fetched live from NetSuite and never stored on our servers",
                "SuiteCompare is read-only: no writes, updates, or deletes are ever performed on your NetSuite account",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-base font-semibold text-brand-900 mb-5">Frequently Asked Questions</h2>
        <div className="space-y-3">

          <FaqItem q="What permissions does the NetSuite role need?">
            <p className="text-xs text-brand-400 mb-3">Create a custom role and add these permissions exactly. We never write or modify any records.</p>
            <div className="overflow-x-auto rounded-xl border border-brand-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-50/60 border-b border-brand-100">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-brand-400 uppercase tracking-wide">Tab</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-brand-400 uppercase tracking-wide">Permission</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-brand-400 uppercase tracking-wide">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {ROLE_PERMISSIONS.map((p) => (
                    <tr key={p.permission}>
                      <td className="px-4 py-2.5 text-xs text-brand-400">{p.tab}</td>
                      <td className="px-4 py-2.5 text-xs font-medium text-brand-700">{p.permission}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${p.level === "Full" ? "bg-accent/10 text-accent" : "bg-brand-50 text-brand-500"}`}>
                          {p.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FaqItem>

          <FaqItem q="The connection test failed. What should I check?">
            <ul className="space-y-3">
              {[
                { label: "Account ID matches the environment", detail: "Sandbox IDs must include a suffix like _SB1 or _SB2" },
                { label: "TBA is enabled on the integration record", detail: "Token-Based Authentication checkbox must be checked" },
                { label: "The role has the required permissions", detail: "See the permissions FAQ above" },
                { label: "The access token is assigned the correct role", detail: "Re-check Setup > Users/Roles > Access Tokens" },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-brand-800">{item.label}</p>
                    <p className="text-xs text-brand-400">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </FaqItem>

          {[
            {
              q: "Can I use the same integration record for Production and Sandbox?",
              a: "No. NetSuite Integration Records are environment-specific. You need a separate integration record and access token in each environment.",
            },
            {
              q: "Why does my script show as demo data?",
              a: "TBA credentials have not been configured for that environment. Click the settings icon on the environment card and enter your credentials.",
            },
            {
              q: "Is my script source code stored on SuiteCompare servers?",
              a: "No. Script content is fetched live from NetSuite when you run a comparison and is never persisted to our database. Only script metadata (name, type, Script ID) is stored to build your script list.",
            },
            {
              q: "Can I add multiple sandbox environments?",
              a: "Yes on Pro and Team plans. The Free plan includes one Production and one Sandbox per client. Upgrade to add additional sandboxes.",
            },
          ].map((faq) => (
            <FaqItem key={faq.q} q={faq.q}>
              <p className="text-sm text-brand-400 leading-relaxed">{faq.a}</p>
            </FaqItem>
          ))}

        </div>
      </section>

      {/* Contact Support */}
      <section>
        <div className="rounded-2xl bg-brand-900 px-7 py-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Contact Support</p>
              <p className="mt-0.5 text-sm text-brand-300">
                We reply within one business day.
              </p>
            </div>
          </div>
          <ContactForm userName={user.name} userEmail={user.email} />
        </div>
      </section>
    </div>
  );
}
