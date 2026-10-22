import { PrismaClient } from "@prisma/client";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const __dir = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dir, "../db-export");
mkdirSync(outDir, { recursive: true });

function save(name, data) {
  const file = join(outDir, `${name}.json`);
  writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`✓ ${name}: ${Array.isArray(data) ? data.length : 1} records`);
}

async function main() {
  console.log("Starting export...\n");

  const [
    leads, pageViews, visitors,
    scUsers, scOrgs, scOrgMembers, scInvites, scAccounts, scEnvs, scScripts, scFiles, scAdminInvites, scComparisons,
    customers, tickets, ticketComments, timeEntries, invoices, invoiceItems,
    employees, partners, referrals, referralActivities,
    posts, settings, auditLogs,
  ] = await Promise.all([
    prisma.leadSubmission.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.pageView.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.visitorSession.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.scUser.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.scOrg.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.scOrgMember.findMany(),
    prisma.scInvite.findMany(),
    prisma.scNetSuiteAccount.findMany(),
    prisma.scEnvironment.findMany(),
    prisma.scScript.findMany(),
    prisma.scFile.findMany(),
    prisma.scAdminInvite.findMany(),
    prisma.scComparison.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.customer.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.ticket.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.ticketComment.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.timeEntry.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.invoice.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.invoiceItem.findMany(),
    prisma.employee.findMany({ include: { customers: { select: { id: true } } } }),
    prisma.partner.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.referral.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.referralActivity.findMany(),
    prisma.post.findMany({ orderBy: { date: "asc" } }),
    prisma.systemSetting.findMany(),
    prisma.auditLog.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  save("leads", leads);
  save("page_views", pageViews);
  save("visitor_sessions", visitors);
  save("sc_users", scUsers);
  save("sc_orgs", scOrgs);
  save("sc_org_members", scOrgMembers);
  save("sc_invites", scInvites);
  save("sc_netsuite_accounts", scAccounts);
  save("sc_environments", scEnvs);
  save("sc_scripts", scScripts);
  save("sc_files", scFiles);
  save("sc_admin_invites", scAdminInvites);
  save("sc_comparisons", scComparisons);
  save("customers", customers);
  save("tickets", tickets);
  save("ticket_comments", ticketComments);
  save("time_entries", timeEntries);
  save("invoices", invoices);
  save("invoice_items", invoiceItems);
  save("employees", employees);
  save("partners", partners);
  save("referrals", referrals);
  save("referral_activities", referralActivities);
  save("posts", posts);
  save("system_settings", settings);
  save("audit_logs", auditLogs);

  console.log(`\nExport complete → db-export/`);
}

main()
  .catch((e) => { console.error("Export failed:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
