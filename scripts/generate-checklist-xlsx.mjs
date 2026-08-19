// Generates SuitePacific-NetSuite-2026.2-Release-Readiness-Checklist.xlsx
// Run: node scripts/generate-checklist-xlsx.mjs
import XLSX from "xlsx";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, "../public/downloads/SuitePacific-NetSuite-2026.2-Release-Readiness-Checklist.xlsx");

const ITEMS = [
  { id: "A-01", section: "A - Accounting & Reporting", dept: "Technical / Reporting", area: "SuiteQL and Analytics", priority: "Critical", title: "SuiteQL and Analytics Default Sort Field Change", whatChanged: "In 2026.2, SuiteQL queries and Analytics datasets based on generic transactions use Transaction.tranDate as the default sort when no explicit sort order is specified. Previously, Transaction.tranDisplayName was used.", whyItMatters: "A query may continue to return correct rows while returning them in a different order. Any script, report, integration, or downstream process that relies on implicit result ordering will be affected.", whatToCheck: "1. Identify all SuiteQL queries with no explicit ORDER BY.\n2. Identify Analytics datasets with no explicit sort.\n3. Review every script consuming SuiteQL results.\n4. Review every integration consuming SuiteQL results.\n5. Add explicit ORDER BY wherever business logic depends on sequence." },
  { id: "A-02", section: "A - Accounting & Reporting", dept: "Order Management / Operations", area: "Order Fulfillment", priority: "Medium", title: "Start Fulfillment Directly from Sales Order Lists", whatChanged: "2026.2 adds the ability to start order fulfillment directly from Sales Order record lists.", whyItMatters: "This changes the fulfillment workflow for operations teams and may affect training, role permissions, and documented processes.", whatToCheck: "1. Review the current fulfillment workflow.\n2. Determine whether users should adopt the new process.\n3. Validate permissions for relevant roles.\n4. Test representative Sales Orders in Sandbox." },
  { id: "B-03", section: "B - Authentication & Security", dept: "IT / Security / NetSuite Admin", area: "Authentication", priority: "Medium", title: "Passkey Authentication for Account Login", whatChanged: "NetSuite users can set up passwordless authentication using passkeys for account login as of 2026.2.", whyItMatters: "This is an optional authentication change. IT and security policy must be reviewed before enabling passkeys.", whatToCheck: "1. Review security policy for passkeys.\n2. Test user enrollment in Sandbox.\n3. Test login recovery procedures.\n4. Test passkey login with representative roles." },
  { id: "B-04", section: "B - Authentication & Security", dept: "IT / Security", area: "Authentication", priority: "High", title: "Passkeys as a Second Authentication Factor", whatChanged: "FIDO2-compliant passkeys can now be used as a second authentication factor.", whyItMatters: "Existing two-factor authentication workflows may change. Administrator policy must be explicitly set.", whatToCheck: "1. Review current 2FA policy.\n2. Test FIDO2 passkey enrollment in Sandbox.\n3. Confirm fallback authentication procedures.\n4. Document administrator policy on passkey 2FA." },
  { id: "B-05", section: "B - Authentication & Security", dept: "Technical / Integrations / IT", area: "Authentication", priority: "Critical", title: "NLAuth End of Support (2027.1)", whatChanged: "Starting with 2027.1, integrations using NLAuth will stop working. Oracle recommends migrating to OAuth 2.0 immediately.", whyItMatters: "Any integration still using NLAuth will break when 2027.1 releases. This is a hard cutoff. Accounts with custom integrations or RESTlets using NLAuth need a migration plan now.", whatToCheck: "1. Inventory every NetSuite integration.\n2. Identify all NLAuth usage.\n3. Identify external apps using NLAuth.\n4. Create OAuth 2.0 migration plans.\n5. Prioritize business-critical integrations." },
  { id: "B-06", section: "B - Authentication & Security", dept: "Technical / Integrations", area: "Authentication", priority: "Critical", title: "No New TBA Integrations from 2027.1", whatChanged: "Starting in 2027.1, new integrations using TBA cannot be created. Broader TBA end of support is tentatively targeted for 2028.1.", whyItMatters: "Any integration being designed now should not use TBA. Existing TBA integrations need a migration roadmap before 2028.1.", whatToCheck: "1. Inventory all existing TBA integrations.\n2. Stop designing new integrations using TBA.\n3. Identify which TBA integrations should migrate to OAuth 2.0 first.\n4. Create a migration roadmap." },
  { id: "B-07", section: "B - Authentication & Security", dept: "Technical / Integrations", area: "Authentication", priority: "Critical", title: "OAuth 2.0 Authorization Code Grant Requires PKCE from 2027.1", whatChanged: "New OAuth 2.0 Authorization Code Grant integrations will require PKCE starting in 2027.1.", whyItMatters: "Integrations under development using OAuth 2.0 Authorization Code Grant need to be built with PKCE from the start.", whatToCheck: "1. Review current OAuth 2.0 integration architecture.\n2. Review integrations under development.\n3. Confirm all future OAuth 2.0 implementations include PKCE.\n4. Update internal integration standards." },
  { id: "C-08", section: "C - Banking & Finance", dept: "Finance / Accounting", area: "Bank Reconciliation", priority: "High", title: "System Notes for Reconciliation Activity", whatChanged: "2026.2 adds system-note visibility for matching and reconciliation activity.", whyItMatters: "This improves audit trail completeness. Finance teams should confirm audit requirements are met.", whatToCheck: "1. Review reconciliation audit requirements.\n2. Confirm finance users can identify who performed matching.\n3. Validate existing audit reports." },
  { id: "C-09", section: "C - Banking & Finance", dept: "Finance / Accounting", area: "Bank Reconciliation", priority: "High", title: "Enhanced Bank Matching and Reconciliation UI", whatChanged: "The reconciliation experience includes new matching/submission information, additional filtering, transaction details, and UI enhancements.", whyItMatters: "Finance users will encounter a changed interface. Existing processes should be tested.", whatToCheck: "1. Test existing reconciliation processes in Sandbox.\n2. Validate matching behavior.\n3. Validate transaction submission.\n4. Test finance-user permissions.\n5. Confirm existing reports remain correct." },
  { id: "C-10", section: "C - Banking & Finance", dept: "Finance", area: "Bank Reconciliation", priority: "Medium", title: "Suggested Transaction Matches", whatChanged: "NetSuite introduces suggested transaction matches within bank reconciliation.", whyItMatters: "Finance users will see match suggestions alongside their existing workflow.", whatToCheck: "1. Test suggested matches in Sandbox.\n2. Review the acceptance process.\n3. Determine whether finance users need training." },
  { id: "C-11", section: "C - Banking & Finance", dept: "Finance / AR / AP", area: "Payment Application", priority: "Medium", title: "Payment Application Suggestions", whatChanged: "NetSuite can suggest payments to apply against open invoices and payables.", whyItMatters: "Suggested application changes the AR and AP workflow.", whatToCheck: "1. Test payment application suggestions in Sandbox.\n2. Validate accounting treatment.\n3. Review user approval process." },
  { id: "C-12", section: "C - Banking & Finance", dept: "Finance", area: "Bank Reconciliation", priority: "High", title: "Automatic Submission of Matches", whatChanged: "Manual matches and cleared transactions can now be automatically submitted.", whyItMatters: "Automatic submission changes existing reconciliation controls.", whatToCheck: "1. Review current reconciliation controls.\n2. Test automatic submission in Sandbox.\n3. Ensure finance users understand the new behavior." },
  { id: "C-13", section: "C - Banking & Finance", dept: "Finance / IT / Security", area: "Bank Import", priority: "High", title: "Sensitive Data in Bank Transaction Memo Fields", whatChanged: "NetSuite warns that imported bank transaction memo fields may contain sensitive data such as bank account numbers, credit card numbers, and addresses.", whyItMatters: "This has implications for data retention, access controls, and reporting.", whatToCheck: "1. Review bank import files for sensitive data in memo fields.\n2. Confirm whether sensitive data enters NetSuite via bank imports.\n3. Review data-retention and access policies.\n4. Review reports exposing memo data." },
  { id: "D-14", section: "D - Inventory & Supply Chain", dept: "Inventory / Finance", area: "Inventory Costing", priority: "High", title: "Initial Average Cost by Location", whatChanged: "For Multi-Location Inventory, 2026.2 allows initial average cost to be set for new inventory and assembly items at each location.", whyItMatters: "Costing may now differ by location. Workflows and reporting should be tested.", whatToCheck: "1. Review item creation process.\n2. Test new item creation with location costing.\n3. Validate costing results at location level.\n4. Confirm estimated assembly costing." },
  { id: "D-15", section: "D - Inventory & Supply Chain", dept: "Supply Chain / Planning", area: "Supply Planning", priority: "Medium", title: "Pegging Analysis Workbooks", whatChanged: "New Demand View and Supply View pegging analysis workbooks are available for Supply Planning.", whyItMatters: "Existing supply-planning processes should be validated in Sandbox.", whatToCheck: "1. Determine whether planners need the new workbooks.\n2. Validate existing supply-planning processes.\n3. Identify reporting opportunities." },
  { id: "D-16", section: "D - Inventory & Supply Chain", dept: "Supply Chain / Manufacturing", area: "Capacity Planning", priority: "High", title: "Rough-Cut Capacity Planning", whatChanged: "NetSuite adds Rough-Cut Capacity Planning capabilities associated with Supply Plan Definitions and work-center capacity.", whyItMatters: "Manufacturing and supply chain teams should evaluate adoption and test existing supply plan assumptions.", whatToCheck: "1. Review current capacity planning.\n2. Identify relevant Supply Plan Definitions.\n3. Test capacity assumptions in Sandbox.\n4. Determine whether to enable and adopt." },
  { id: "D-17", section: "D - Inventory & Supply Chain", dept: "Inventory / Operations", area: "Inventory Transfers", priority: "High", title: "Vendor-Consigned Inventory Bin Transfers", whatChanged: "2026.2 adds support for bin transfers involving vendor-consigned inventory.", whyItMatters: "Accounts using consigned inventory should test bin transfers to confirm correct balances and reporting.", whatToCheck: "1. Test consigned inventory bin transfers in Sandbox.\n2. Validate inventory balance calculations.\n3. Validate inventory reporting." },
  { id: "D-18", section: "D - Inventory & Supply Chain", dept: "Inventory / Supply Chain", area: "Reorder Planning", priority: "High", title: "Inventory Optimization for Reorder-Point Planning", whatChanged: "NetSuite introduces Inventory Optimization for reorder-point planning with lead times, safety stock, and projected exceptions.", whyItMatters: "Accounts managing replenishment should evaluate this feature and test existing reorder-point logic.", whatToCheck: "1. Review current reorder-point planning.\n2. Identify applicable items.\n3. Review lead-time and safety-stock settings.\n4. Review reorder-point assumptions.\n5. Evaluate whether to adopt." },
  { id: "E-19", section: "E - Pricing", dept: "Sales / Finance", area: "Advanced Pricing", priority: "High", title: "Item Collections and Customer Groups in Price Rules", whatChanged: "Price Rules can now use Item Collections and Customer Groups, including dynamic collections/groups that update automatically.", whyItMatters: "Dynamic collections mean a Price Rule's scope can change without manual updates. Existing configurations should be reviewed.", whatToCheck: "1. Review existing Price Rules for Item Collections or Customer Groups.\n2. Identify rules where dynamic membership could affect pricing.\n3. Test customer-specific pricing in Sandbox." },
  { id: "E-20", section: "E - Pricing", dept: "Sales", area: "Advanced Pricing", priority: "Medium", title: "Advanced Pricing Context on Sales Order Lines", whatChanged: "Sales Order lines now provide additional context for how the price was determined.", whyItMatters: "Sales users will see more detail on how prices were set. Training may be needed.", whatToCheck: "1. Test representative pricing scenarios in Sandbox.\n2. Train sales users on the new context fields.\n3. Validate customer-specific pricing." },
  { id: "E-21", section: "E - Pricing", dept: "Sales / Admin", area: "Advanced Pricing", priority: "Medium", title: "Pricing Records via CSV Import", whatChanged: "Pricing records can now be managed through the CSV Import Assistant.", whyItMatters: "This opens a new pathway for bulk pricing maintenance. Governance should be established.", whatToCheck: "1. Identify manual pricing maintenance processes.\n2. Determine whether CSV import improves the process.\n3. Establish CSV governance before using in production." },
  { id: "F-22", section: "F - Manufacturing", dept: "Manufacturing / Technical", area: "Manufacturing Transactions", priority: "Critical", title: "Zero-Quantity Manufacturing Components", whatChanged: "NetSuite introduces a preference to exclude zero-quantity components from manufacturing transactions.", whyItMatters: "Scripts, Saved Searches, SuiteQL, integrations, or reports expecting zero-quantity lines may break.", whatToCheck: "1. Review scripts processing zero-quantity component lines.\n2. Review Saved Searches on manufacturing components.\n3. Review SuiteQL selecting manufacturing data.\n4. Review integrations receiving manufacturing data.\n5. Review reports on manufacturing components.\n6. Test in Sandbox before enabling." },
  { id: "F-23", section: "F - Manufacturing", dept: "Manufacturing / Technical", area: "Manufacturing Transactions", priority: "Critical", title: "Advanced BOM Assembly Component Storage Change", whatChanged: "NetSuite changes how assembly components associated with Advanced BOM are stored for manufacturing transactions.", whyItMatters: "Any script, SuiteQL, integration, or report that reads assembly component data from manufacturing transactions may return different results.", whatToCheck: "1. Review transaction-line Saved Searches for manufacturing transactions.\n2. Review SuiteQL reading assembly component data.\n3. Review SuiteScript accessing manufacturing sublist lines.\n4. Review integrations receiving component data.\n5. Compare pre/post-release data in Sandbox." },
  { id: "F-24", section: "F - Manufacturing", dept: "Manufacturing / Finance", area: "Manufacturing Costing", priority: "High", title: "Bulk Update of Manufacturing Charge Costs", whatChanged: "Manufacturing charge costs can now be updated in bulk.", whyItMatters: "Costing changes have financial reporting implications.", whatToCheck: "1. Review current manufacturing charge costing.\n2. Validate purchase-price and custom-cost behavior in Sandbox.\n3. Test costing results after bulk updates." },
  { id: "G-25", section: "G - CPQ", dept: "Sales / CPQ / Technical", area: "CPQ", priority: "Medium", title: "CPQ AI Assistant", whatChanged: "NetSuite CPQ introduces an AI Assistant to guide users through product configuration.", whyItMatters: "CPQ users may encounter the AI Assistant. Evaluate whether it fits the sales process.", whatToCheck: "1. Review CPQ product configuration in Sandbox.\n2. Evaluate whether AI-assisted configuration fits the sales process.\n3. Test representative configurations." },
  { id: "G-26", section: "G - CPQ", dept: "CPQ / Technical", area: "CPQ", priority: "Critical", title: "CPQ Configurator Migration Process", whatChanged: "NetSuite introduces an improved CPQ Configurator migration process.", whyItMatters: "CPQ migrations carry risk to configuration and transaction data.", whatToCheck: "1. Document migration sequence before starting.\n2. Validate bundle requirements in Sandbox.\n3. Protect configuration and transaction data.\n4. Do not uninstall migration components without understanding data implications." },
  { id: "G-27", section: "G - CPQ", dept: "CPQ / Sales", area: "CPQ", priority: "Medium", title: "CPQ Transaction Attachments", whatChanged: "CPQ configuration can now support adding attachments to transactions.", whyItMatters: "Accounts using CPQ should test attachments and permissions.", whatToCheck: "1. Test attachment creation from CPQ configuration.\n2. Validate attachment permissions.\n3. Validate resulting transactions." },
  { id: "H-28", section: "H - Order Management & Billing", dept: "Finance / AR / Order Management", area: "Payment Management", priority: "High", title: "Automated Payment Adjustments", whatChanged: "NetSuite introduces automated payment adjustments.", whyItMatters: "Automated adjustments change existing manual payment processes.", whatToCheck: "1. Identify manual payment adjustment processes.\n2. Test automated adjustment behavior.\n3. Validate accounting treatment.\n4. Validate reconciliation.\n5. Review approval controls." },
  { id: "H-29", section: "H - Order Management & Billing", dept: "Billing / Finance / Technical", area: "SuiteBilling", priority: "Critical", title: "Externally Rated Usage Billing", whatChanged: "SuiteBilling can support usage billing where amounts are calculated externally.", whyItMatters: "Accounts using SuiteBilling for usage-based revenue need to validate external data flows, billing calculations, accounting, and revenue recognition.", whatToCheck: "1. Test external usage data ingestion.\n2. Validate billing calculations.\n3. Validate downstream accounting.\n4. Test revenue recognition.\n5. Review integration error handling." },
  { id: "H-30", section: "H - Order Management & Billing", dept: "Finance / Revenue Operations", area: "SuiteBilling", priority: "High", title: "Expanded Subscription Metrics", whatChanged: "Subscription Metrics functionality has been expanded in 2026.2.", whyItMatters: "Finance and revenue operations teams should validate existing metrics and explore expanded functionality.", whatToCheck: "1. Review recurring revenue metrics.\n2. Review subscription renewal processes.\n3. Validate existing subscription reporting." },
  { id: "H-31", section: "H - Order Management & Billing", dept: "Payments / Technical", area: "Payment Processing", priority: "Medium", title: "Payment Token Type Field", whatChanged: "The Payment Token Type field can now differentiate between different token types.", whyItMatters: "Integrations or reports using token data should review whether token type differentiation affects downstream logic.", whatToCheck: "1. Review payment integrations using token data.\n2. Review payment reporting.\n3. Determine whether token type should affect processing." },
  { id: "I-32", section: "I - Projects", dept: "Project Management / Finance", area: "Project Management", priority: "High", title: "Project Health Indicators", whatChanged: "NetSuite adds five Project Health Indicators: Time Overrun, Overdue Tasks, Resource Coverage, Project Margin, and Unbilled Approved Charges.", whyItMatters: "Project managers and finance teams gain new visibility. Existing project data should be validated.", whatToCheck: "1. Determine which indicators matter to project managers.\n2. Validate project data in Sandbox.\n3. Review margin calculations.\n4. Review unbilled charges.\n5. Establish ownership for exceptions." },
  { id: "J-33", section: "J - Analytics", dept: "Reporting / Finance / Operations", area: "Reporting and Exports", priority: "High", title: "Excel Exports Default to .xlsx Format", whatChanged: "Exports of lists, Saved Searches, and reports to Excel now default to .xlsx rather than .xls.", whyItMatters: "Any process relying on .xls output, including macros and external imports, may break.", whatToCheck: "1. Identify downstream processes consuming NetSuite Excel exports.\n2. Test macros for .xlsx compatibility.\n3. Test external imports.\n4. Test external reporting processes.\n5. Validate formatting." },
  { id: "J-34", section: "J - Analytics", dept: "Reporting / Data / Finance", area: "Analytics Warehouse", priority: "Medium", title: "Transfer Saved Searches to Analytics Warehouse", whatChanged: "Saved Searches can now be transferred to Analytics Warehouse.", whyItMatters: "New data pathway. Data governance should be considered before transferring.", whatToCheck: "1. Identify high-value Saved Searches.\n2. Determine whether they should become Warehouse data sources.\n3. Review data governance." },
  { id: "J-35", section: "J - Analytics", dept: "Data / Reporting / IT", area: "Analytics Warehouse", priority: "Medium", title: "Salesforce Data Source Separation in Analytics Warehouse", whatChanged: "Analytics Warehouse can now distinguish NetSuite and Salesforce as separate data sources.", whyItMatters: "Accounts with both data sources should validate functional-area mappings and check dashboards.", whatToCheck: "1. Review existing data models.\n2. Validate functional-area mappings.\n3. Check dashboards and reports." },
  { id: "K-36", section: "K - Customization & AI", dept: "NetSuite Admin / Technical", area: "Record Customization", priority: "High", title: "Advanced Record Customization", whatChanged: "Advanced Record Customization provides a centralized layer where administrators can review and override supported record definitions. The first attribute available is AI Description.", whyItMatters: "New administration capability. Governance should be established around overrides.", whatToCheck: "1. Review supported record types in Sandbox.\n2. Identify existing AI descriptions.\n3. Establish governance and access controls.\n4. Document any overrides applied." },
  { id: "K-37", section: "K - Customization & AI", dept: "Finance / Technical", area: "Custom Fields", priority: "High", title: "Currency Context for Currency Custom Fields", whatChanged: "Currency custom fields can now have a currency context configured. Oracle notes this is optional.", whyItMatters: "Changes to existing fields should be tested carefully to avoid reporting regressions.", whatToCheck: "1. Inventory currency custom fields.\n2. Identify fields where context is ambiguous.\n3. Review reporting implications.\n4. Configure only where there is a clear business need." },
  { id: "K-38", section: "K - Customization & AI", dept: "NetSuite Admin / Technical", area: "Custom Records and Fields", priority: "Medium", title: "AI Description Fields on Custom Objects", whatChanged: "AI Description fields have been added to custom records, custom fields, and custom transactions.", whyItMatters: "Improves how NetSuite AI features interpret custom objects. Optional but recommended.", whatToCheck: "1. Identify critical custom objects.\n2. Add meaningful AI descriptions in Sandbox.\n3. Review terminology for consistency.\n4. Establish ownership for maintaining descriptions." },
  { id: "L-39", section: "L - SuiteCloud Development", dept: "Development / Technical", area: "Development Tooling", priority: "Critical", title: "SuiteCloud Tooling Availability", whatChanged: "The July 13 preview notes state that 2026.2 versions of the SuiteCloud Extension for VS Code, SuiteCloud CLI for Node.js, WebStorm plug-in, and SuiteCloud CLI for Java were not yet available.", whyItMatters: "Upgrading tooling before 2026.2 versions are released may cause CI/CD or SDF deployment issues.", whatToCheck: "1. Check tool availability before upgrading development environments.\n2. Review CI/CD pipelines.\n3. Review SDF deployment processes.\n4. Verify tooling compatibility before 2026.2 reaches Production.\n5. Do not assume availability from release notes alone." },
  { id: "M-40", section: "M - REST & SuiteTalk", dept: "Technical / Integrations", area: "REST Web Services", priority: "High", title: "REST SuiteQL Bound Parameters", whatChanged: "REST SuiteQL now supports anonymous bound parameters.", whyItMatters: "Integrations building queries dynamically with user-supplied values should evaluate bound parameters.", whatToCheck: "1. Review dynamic SuiteQL integrations using user-supplied values.\n2. Identify queries where string-building creates concerns.\n3. Evaluate whether bound parameters should replace string-built queries.\n4. Test in Sandbox." },
  { id: "M-41", section: "M - REST & SuiteTalk", dept: "Technical / Integrations", area: "REST Web Services", priority: "High", title: "Sequential REST Batch Processing", whatChanged: "REST Web Services now supports sequential processing of batch operations.", whyItMatters: "Integrations with dependent operations may benefit from sequential batch processing.", whatToCheck: "1. Identify integrations with parent/child record dependencies.\n2. Review order-dependent transaction creation.\n3. Determine whether sequential processing simplifies existing logic.\n4. Test in Sandbox." },
  { id: "N-42", section: "N - Tax", dept: "Finance / Tax / AP", area: "SuiteTax", priority: "Critical", title: "SuiteTax on Vendor Term Discounts", whatChanged: "SuiteTax introduces tax handling for term discounts on purchase transactions.", whyItMatters: "Accounts using SuiteTax and vendor term discounts need to validate calculations, accounting, and reconciliation. Direct financial reporting implications.", whatToCheck: "1. Test vendor bills with term discounts in Sandbox.\n2. Validate tax calculations.\n3. Validate accounting transactions.\n4. Review reconciliation.\n5. Test credit/adjustment behavior." },
  { id: "O-43", section: "O - Accounts Payable & Purchasing", dept: "AP / Finance", area: "Accounts Payable", priority: "High", title: "Payment Runs for Bulk Payables Processing", whatChanged: "NetSuite introduces Payment Runs for preparing, reviewing, approving, and processing multiple payables.", whyItMatters: "New AP workflow. Existing Bill Payment processes should be reviewed.", whatToCheck: "1. Review existing Bill Payment process.\n2. Test Payment Runs in Sandbox.\n3. Review approval workflow.\n4. Review payment selection.\n5. Validate accounting entries." },
  { id: "O-44", section: "O - Accounts Payable & Purchasing", dept: "AP / Finance", area: "Accounts Payable", priority: "High", title: "Bill Capture Enhancements", whatChanged: "Bill Capture preferences have been enhanced around item/expense amounts and gross/net handling.", whyItMatters: "Changes to preferences can affect how vendor bills are captured. AP teams should test.", whatToCheck: "1. Review current Bill Capture preference settings.\n2. Test vendor bill capture in Sandbox.\n3. Validate captured amounts.\n4. Test approval workflow." },
];

const STATUS_OPTIONS = ["Not Started", "In Review", "Pass", "Fail", "N/A", "Action Required"];

function makeWorkbook() {
  const wb = XLSX.utils.book_new();

  // -- TAB 1: Executive Summary --
  const summaryRows = [
    ["SuitePacific - NetSuite 2026.2 Release Readiness Assessment"],
    [],
    ["Company", ""],
    ["NetSuite Account ID", ""],
    ["NetSuite Version", "2026.2"],
    ["Release Preview Date", "July 13, 2026"],
    ["Assessment Owner", ""],
    [],
    ["READINESS SUMMARY"],
    ["Critical Items", ITEMS.filter(i => i.priority === "Critical").length],
    ["High Items", ITEMS.filter(i => i.priority === "High").length],
    ["Medium Items", ITEMS.filter(i => i.priority === "Medium").length],
    ["Total Checkpoints", ITEMS.length],
    [],
    ["OVERALL READINESS", ""],
    [],
    ["Readiness Guide", ""],
    ["Green - Ready", "All items Pass or N/A"],
    ["Yellow - Ready With Actions", "All Critical Pass; High items have action plans"],
    ["Orange - Action Required", "One or more Critical items are Fail or Action Required"],
    ["Red - High Risk", "Multiple Critical items unresolved"],
    [],
    ["Source: Oracle NetSuite 2026.2 Release Preview Notes - Revision Date July 13 2026"],
    ["This is a SuitePacific readiness checklist and is not an official Oracle document."],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
  wsSummary["!cols"] = [{ wch: 30 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, "Executive Summary");

  // -- TAB 2: Full Checklist --
  const checklistHeaders = [
    "ID", "Section", "Department", "Area", "Priority",
    "Title", "What Changed", "Why It Matters", "What To Check",
    "Owner", "Status", "Findings", "Action Required",
  ];
  const checklistRows = [checklistHeaders, ...ITEMS.map(i => [
    i.id, i.section, i.dept, i.area, i.priority,
    i.title, i.whatChanged, i.whyItMatters, i.whatToCheck,
    "", "Not Started", "", "",
  ])];
  const wsChecklist = XLSX.utils.aoa_to_sheet(checklistRows);
  wsChecklist["!cols"] = [
    { wch: 8 }, { wch: 30 }, { wch: 28 }, { wch: 24 }, { wch: 10 },
    { wch: 44 }, { wch: 60 }, { wch: 60 }, { wch: 80 },
    { wch: 20 }, { wch: 16 }, { wch: 40 }, { wch: 40 },
  ];
  XLSX.utils.book_append_sheet(wb, wsChecklist, "Full Checklist");

  // -- TAB 3: Technical & Integrations --
  const techItems = ITEMS.filter(i =>
    ["Technical", "Development", "Integrations"].some(k => i.dept.includes(k))
  );
  const techHeaders = ["ID", "Priority", "Title", "What Changed", "What To Check", "Owner", "Status", "Findings"];
  const techRows = [techHeaders, ...techItems.map(i => [
    i.id, i.priority, i.title, i.whatChanged, i.whatToCheck, "", "Not Started", "",
  ])];
  const wsTech = XLSX.utils.aoa_to_sheet(techRows);
  wsTech["!cols"] = [{ wch: 8 }, { wch: 10 }, { wch: 44 }, { wch: 60 }, { wch: 80 }, { wch: 20 }, { wch: 16 }, { wch: 40 }];
  XLSX.utils.book_append_sheet(wb, wsTech, "Technical & Integrations");

  // -- TAB 4: Finance --
  const financeItems = ITEMS.filter(i =>
    ["Finance", "Accounting", "AP", "AR", "Tax", "Billing"].some(k => i.dept.includes(k))
  );
  const financeHeaders = ["ID", "Priority", "Area", "Title", "What Changed", "What To Check", "Owner", "Status", "Findings"];
  const financeRows = [financeHeaders, ...financeItems.map(i => [
    i.id, i.priority, i.area, i.title, i.whatChanged, i.whatToCheck, "", "Not Started", "",
  ])];
  const wsFinance = XLSX.utils.aoa_to_sheet(financeRows);
  wsFinance["!cols"] = [{ wch: 8 }, { wch: 10 }, { wch: 24 }, { wch: 44 }, { wch: 60 }, { wch: 80 }, { wch: 20 }, { wch: 16 }, { wch: 40 }];
  XLSX.utils.book_append_sheet(wb, wsFinance, "Finance");

  // -- TAB 5: Operations --
  const opsItems = ITEMS.filter(i =>
    ["Operations", "Inventory", "Supply Chain", "Manufacturing", "CPQ", "Order", "Sales"].some(k => i.dept.includes(k))
  );
  const opsHeaders = ["ID", "Priority", "Area", "Title", "What Changed", "What To Check", "Owner", "Status", "Findings"];
  const opsRows = [opsHeaders, ...opsItems.map(i => [
    i.id, i.priority, i.area, i.title, i.whatChanged, i.whatToCheck, "", "Not Started", "",
  ])];
  const wsOps = XLSX.utils.aoa_to_sheet(opsRows);
  wsOps["!cols"] = [{ wch: 8 }, { wch: 10 }, { wch: 24 }, { wch: 44 }, { wch: 60 }, { wch: 80 }, { wch: 20 }, { wch: 16 }, { wch: 40 }];
  XLSX.utils.book_append_sheet(wb, wsOps, "Operations");

  // -- TAB 6: Sign-Off --
  const signoffRows = [
    ["NetSuite 2026.2 Release Sign-Off"],
    [],
    ["Role", "Owner", "Date Reviewed", "Sign-Off"],
    ["Finance Owner", "", "", ""],
    ["Operations Owner", "", "", ""],
    ["Technical Owner", "", "", ""],
    ["NetSuite Administrator", "", "", ""],
    ["IT / Security Owner", "", "", ""],
    ["Business Owner", "", "", ""],
    [],
    ["Planned Production Release Date", ""],
    ["Sandbox Testing Completed", ""],
    ["Final Approval", ""],
    [],
    ["Notes", ""],
  ];
  const wsSignoff = XLSX.utils.aoa_to_sheet(signoffRows);
  wsSignoff["!cols"] = [{ wch: 30 }, { wch: 30 }, { wch: 20 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, wsSignoff, "Sign-Off");

  return wb;
}

const wb = makeWorkbook();
XLSX.writeFile(wb, OUTPUT);
console.log(`Generated: ${OUTPUT}`);
