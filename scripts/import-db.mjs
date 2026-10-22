import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();
const __dir = dirname(fileURLToPath(import.meta.url));
const src = join(__dir, "../db-export");

function load(name) {
  return JSON.parse(readFileSync(join(src, `${name}.json`), "utf8"));
}

async function main() {
  console.log("Restoring data...\n");

  // Posts
  const posts = load("posts");
  for (const p of posts) {
    await prisma.post.upsert({ where: { id: p.id }, update: p, create: p });
  }
  console.log(`✓ posts: ${posts.length}`);

  // Leads
  const leads = load("leads");
  for (const l of leads) {
    await prisma.leadSubmission.upsert({ where: { id: l.id }, update: l, create: l });
  }
  console.log(`✓ leads: ${leads.length}`);

  // Partners
  const partners = load("partners");
  for (const p of partners) {
    await prisma.partner.upsert({ where: { id: p.id }, update: p, create: p });
  }
  console.log(`✓ partners: ${partners.length}`);

  // Referrals
  const referrals = load("referrals");
  for (const r of referrals) {
    await prisma.referral.upsert({ where: { id: r.id }, update: r, create: r });
  }
  console.log(`✓ referrals: ${referrals.length}`);

  // SuiteCompare orgs
  const scOrgs = load("sc_orgs");
  for (const o of scOrgs) {
    await prisma.scOrg.upsert({ where: { id: o.id }, update: o, create: o });
  }
  console.log(`✓ sc_orgs: ${scOrgs.length}`);

  // SuiteCompare users
  const scUsers = load("sc_users");
  for (const u of scUsers) {
    await prisma.scUser.upsert({ where: { id: u.id }, update: u, create: u });
  }
  console.log(`✓ sc_users: ${scUsers.length}`);

  // SuiteCompare org members
  const scOrgMembers = load("sc_org_members");
  for (const m of scOrgMembers) {
    await prisma.scOrgMember.upsert({ where: { id: m.id }, update: m, create: m });
  }
  console.log(`✓ sc_org_members: ${scOrgMembers.length}`);

  // SuiteCompare NetSuite accounts
  const scAccounts = load("sc_netsuite_accounts");
  for (const a of scAccounts) {
    await prisma.scNetSuiteAccount.upsert({ where: { id: a.id }, update: a, create: a });
  }
  console.log(`✓ sc_netsuite_accounts: ${scAccounts.length}`);

  // SuiteCompare environments
  const scEnvs = load("sc_environments");
  for (const e of scEnvs) {
    await prisma.scEnvironment.upsert({ where: { id: e.id }, update: e, create: e });
  }
  console.log(`✓ sc_environments: ${scEnvs.length}`);

  // SuiteCompare scripts
  const scScripts = load("sc_scripts");
  for (const s of scScripts) {
    await prisma.scScript.upsert({ where: { id: s.id }, update: s, create: s });
  }
  console.log(`✓ sc_scripts: ${scScripts.length}`);

  // SuiteCompare admin invites
  const scAdminInvites = load("sc_admin_invites");
  for (const i of scAdminInvites) {
    await prisma.scAdminInvite.upsert({ where: { id: i.id }, update: i, create: i });
  }
  console.log(`✓ sc_admin_invites: ${scAdminInvites.length}`);

  // Customers
  const customers = load("customers");
  for (const c of customers) {
    await prisma.customer.upsert({ where: { id: c.id }, update: c, create: c });
  }
  console.log(`✓ customers: ${customers.length}`);

  // Employees
  const employees = load("employees");
  for (const e of employees) {
    const { customers: _c, ...data } = e;
    await prisma.employee.upsert({ where: { id: data.id }, update: data, create: data });
  }
  console.log(`✓ employees: ${employees.length}`);

  // Tickets
  const tickets = load("tickets");
  for (const t of tickets) {
    await prisma.ticket.upsert({ where: { id: t.id }, update: t, create: t });
  }
  console.log(`✓ tickets: ${tickets.length}`);

  // Ticket comments
  const comments = load("ticket_comments");
  for (const c of comments) {
    await prisma.ticketComment.upsert({ where: { id: c.id }, update: c, create: c });
  }
  console.log(`✓ ticket_comments: ${comments.length}`);

  // Time entries
  const timeEntries = load("time_entries");
  for (const t of timeEntries) {
    await prisma.timeEntry.upsert({ where: { id: t.id }, update: t, create: t });
  }
  console.log(`✓ time_entries: ${timeEntries.length}`);

  // Invoices
  const invoices = load("invoices");
  for (const i of invoices) {
    await prisma.invoice.upsert({ where: { id: i.id }, update: i, create: i });
  }
  console.log(`✓ invoices: ${invoices.length}`);

  // Invoice items
  const invoiceItems = load("invoice_items");
  for (const i of invoiceItems) {
    await prisma.invoiceItem.upsert({ where: { id: i.id }, update: i, create: i });
  }
  console.log(`✓ invoice_items: ${invoiceItems.length}`);

  // Page views (skip if too slow — analytics only)
  const pageViews = load("page_views");
  for (const v of pageViews) {
    await prisma.pageView.upsert({ where: { id: v.id }, update: v, create: v });
  }
  console.log(`✓ page_views: ${pageViews.length}`);

  console.log("\nRestore complete.");
}

main()
  .catch((e) => { console.error("Import failed:", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
