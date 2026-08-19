export type Priority = "Critical" | "High" | "Medium" | "Low";

export interface ChecklistItem {
  id: string;
  section: string;
  team: string;
  area: string;
  priority: Priority;
  title: string;
  whatChanged: string;
  whyItMatters: string;
  whatToCheck: string[];
}

export const SECTIONS: { id: string; label: string }[] = [
  { id: "A", label: "Accounting and Reporting" },
  { id: "B", label: "Authentication and Security" },
  { id: "C", label: "Banking and Finance" },
  { id: "D", label: "Inventory and Supply Chain" },
  { id: "E", label: "Pricing" },
  { id: "F", label: "Manufacturing" },
  { id: "G", label: "CPQ" },
  { id: "H", label: "Order Management and Billing" },
  { id: "I", label: "Projects" },
  { id: "J", label: "Analytics" },
  { id: "K", label: "Customization and AI" },
  { id: "L", label: "SuiteCloud Development" },
  { id: "M", label: "REST and SuiteTalk" },
  { id: "N", label: "Tax" },
  { id: "O", label: "Accounts Payable and Purchasing" },
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // -- SECTION A --
  {
    id: "A-01",
    section: "A",
    team: "Technical / Reporting",
    area: "SuiteQL and Analytics",
    priority: "Critical",
    title: "SuiteQL and Analytics Default Sort Field Change",
    whatChanged:
      "In 2026.2, SuiteQL queries and Analytics datasets based on generic transactions use Transaction.tranDate as the default sort when no explicit sort order is specified. Previously, Transaction.tranDisplayName was used.",
    whyItMatters:
      "A query may continue to return correct rows while returning them in a different order. Any script, report, integration, or downstream process that relies on implicit result ordering will be affected.",
    whatToCheck: [
      "Identify all SuiteQL queries that have no explicit ORDER BY clause.",
      "Identify Analytics datasets with no explicit sort configured.",
      "Review every script that consumes SuiteQL results and depends on ordering.",
      "Review every integration that consumes SuiteQL results.",
      "Add explicit ORDER BY to queries wherever business logic depends on sequence.",
    ],
  },
  {
    id: "A-02",
    section: "A",
    team: "Order Management / Operations",
    area: "Order Fulfillment",
    priority: "Medium",
    title: "Start Fulfillment Directly from Sales Order Lists",
    whatChanged:
      "2026.2 adds the ability to start order fulfillment directly from Sales Order record lists without opening each individual record.",
    whyItMatters:
      "This changes the fulfillment workflow for operations teams and may affect training, role permissions, and documented processes.",
    whatToCheck: [
      "Review the current fulfillment workflow.",
      "Determine whether users should adopt the new list-level fulfillment process.",
      "Validate permissions for relevant fulfillment roles.",
      "Test representative Sales Orders in Sandbox.",
    ],
  },
  // -- SECTION B --
  {
    id: "B-03",
    section: "B",
    team: "IT / Security / NetSuite Admin",
    area: "Authentication",
    priority: "Medium",
    title: "Passkey Authentication for Account Login",
    whatChanged:
      "NetSuite users can set up passwordless authentication using passkeys for account login as of 2026.2.",
    whyItMatters:
      "This is an optional authentication change. IT and security policy must be reviewed before enabling passkeys across the organization.",
    whatToCheck: [
      "Review your security policy to determine whether passkeys should be enabled.",
      "Test user enrollment in Sandbox.",
      "Test login recovery procedures with passkeys.",
      "Test passkey login with representative user roles.",
    ],
  },
  {
    id: "B-04",
    section: "B",
    team: "IT / Security",
    area: "Authentication",
    priority: "High",
    title: "Passkeys as a Second Authentication Factor",
    whatChanged:
      "FIDO2-compliant passkeys can now be used as a second authentication factor. Administrators can disable this option to keep users on authenticator apps.",
    whyItMatters:
      "Existing two-factor authentication workflows may change. The administrator policy must be explicitly set to match the organization's security requirements.",
    whatToCheck: [
      "Review your current two-factor authentication policy.",
      "Test FIDO2 passkey enrollment in Sandbox.",
      "Confirm fallback authentication procedures remain documented.",
      "Set and document the administrator policy on passkey 2FA.",
    ],
  },
  {
    id: "B-05",
    section: "B",
    team: "Technical / Integrations / IT",
    area: "Authentication",
    priority: "Critical",
    title: "NLAuth End of Support in 2027.1",
    whatChanged:
      "Starting with NetSuite 2027.1, integrations using NLAuth will stop working. The only exception is the existing IssueToken endpoint use case explicitly excluded by Oracle. Oracle recommends migrating to OAuth 2.0 as soon as possible.",
    whyItMatters:
      "Any integration still using NLAuth will break when 2027.1 releases. This is a hard cutoff, not a deprecation warning. Accounts with custom integrations, RESTlets, or external applications using NLAuth need a migration plan now.",
    whatToCheck: [
      "Inventory every NetSuite integration in your account.",
      "Identify all NLAuth usage across integrations and RESTlets.",
      "Identify external applications authenticating via NLAuth.",
      "Create OAuth 2.0 migration plans for each affected integration.",
      "Prioritize business-critical integrations for migration first.",
    ],
  },
  {
    id: "B-06",
    section: "B",
    team: "Technical / Integrations",
    area: "Authentication",
    priority: "Critical",
    title: "No New TBA Integrations from 2027.1",
    whatChanged:
      "Starting in 2027.1, new integrations using Token-Based Authentication cannot be created. Oracle is preparing for broader TBA end of support, tentatively targeted for 2028.1. Existing TBA integrations continue until the final end-of-support date.",
    whyItMatters:
      "Any integration being designed or built now should not use TBA. Existing TBA integrations need a migration roadmap before 2028.1.",
    whatToCheck: [
      "Inventory all existing TBA integrations.",
      "Stop designing any new integrations that use TBA.",
      "Identify which existing TBA integrations should migrate to OAuth 2.0 first.",
      "Create a migration roadmap aligned to the 2028.1 deadline.",
    ],
  },
  {
    id: "B-07",
    section: "B",
    team: "Technical / Integrations",
    area: "Authentication",
    priority: "Critical",
    title: "OAuth 2.0 Authorization Code Grant Requires PKCE from 2027.1",
    whatChanged:
      "New OAuth 2.0 Authorization Code Grant integrations will require PKCE (Proof Key for Code Exchange) starting in NetSuite 2027.1.",
    whyItMatters:
      "Integrations currently under development using OAuth 2.0 Authorization Code Grant need to be built with PKCE from the start. This affects architecture decisions being made now.",
    whatToCheck: [
      "Review current OAuth 2.0 Authorization Code Grant integration architecture.",
      "Review integrations currently under development.",
      "Confirm that all future OAuth 2.0 Authorization Code Grant implementations include PKCE support.",
      "Update internal integration standards and documentation to require PKCE.",
    ],
  },
  // -- SECTION C --
  {
    id: "C-08",
    section: "C",
    team: "Finance / Accounting",
    area: "Bank Reconciliation",
    priority: "High",
    title: "System Notes for Reconciliation Activity",
    whatChanged:
      "2026.2 adds system-note visibility for matching and reconciliation activity, so the audit trail now captures who performed matching.",
    whyItMatters:
      "This improves audit trail completeness for bank reconciliation. Finance teams should confirm that reconciliation audit requirements are met and that existing audit reports reflect the new note structure.",
    whatToCheck: [
      "Review reconciliation audit requirements against the new system notes.",
      "Confirm finance users can identify who performed matching activity.",
      "Validate any existing audit reports that cover reconciliation activity.",
    ],
  },
  {
    id: "C-09",
    section: "C",
    team: "Finance / Accounting",
    area: "Bank Reconciliation",
    priority: "High",
    title: "Enhanced Bank Matching and Reconciliation UI",
    whatChanged:
      "The reconciliation experience includes new matching and submission information, additional filtering options, transaction details, and UI enhancements.",
    whyItMatters:
      "Finance users will encounter a changed reconciliation interface. Existing processes should be tested to confirm expected behavior is preserved.",
    whatToCheck: [
      "Test existing reconciliation processes in Sandbox after 2026.2.",
      "Validate matching behavior.",
      "Validate transaction submission.",
      "Test finance-user permissions within the new UI.",
      "Confirm existing reconciliation reports remain readable and correct.",
    ],
  },
  {
    id: "C-10",
    section: "C",
    team: "Finance",
    area: "Bank Reconciliation",
    priority: "Medium",
    title: "Suggested Transaction Matches",
    whatChanged:
      "NetSuite introduces suggested transaction matches within bank reconciliation, proposing potential matches for finance users to review and accept.",
    whyItMatters:
      "Finance users will see match suggestions alongside their existing workflow. The acceptance process and reconciliation impact should be understood before going live.",
    whatToCheck: [
      "Test suggested matches in Sandbox.",
      "Review the acceptance process for suggestions.",
      "Determine whether finance users need training on the new workflow.",
    ],
  },
  {
    id: "C-11",
    section: "C",
    team: "Finance / AR / AP",
    area: "Payment Application",
    priority: "Medium",
    title: "Payment Application Suggestions",
    whatChanged:
      "NetSuite can suggest payments to apply against open invoices and open payables.",
    whyItMatters:
      "Suggested application changes the AR and AP workflow. The approval process and accounting treatment should be validated before relying on suggestions in production.",
    whatToCheck: [
      "Test payment application suggestions in Sandbox.",
      "Validate the accounting treatment for accepted suggestions.",
      "Review the user approval process for applying suggested payments.",
    ],
  },
  {
    id: "C-12",
    section: "C",
    team: "Finance",
    area: "Bank Reconciliation",
    priority: "High",
    title: "Automatic Submission of Matches and Cleared Transactions",
    whatChanged:
      "Manual matches and cleared transactions can now be automatically submitted based on the new reconciliation functionality.",
    whyItMatters:
      "Automatic submission changes existing reconciliation controls. Finance teams should understand what submits automatically, what still requires manual approval, and whether reconciliation SOPs need updating.",
    whatToCheck: [
      "Review current reconciliation controls and approval steps.",
      "Test automatic submission behavior in Sandbox.",
      "Ensure finance users understand what the new automatic submission means for their process.",
    ],
  },
  {
    id: "C-13",
    section: "C",
    team: "Finance / IT / Security",
    area: "Bank Import",
    priority: "High",
    title: "Sensitive Data in Bank Transaction Memo Fields",
    whatChanged:
      "NetSuite now warns that imported bank transaction memo fields may contain sensitive information such as bank account numbers, credit card numbers, and addresses.",
    whyItMatters:
      "If memo fields contain sensitive data, this has implications for data retention, access controls, and reporting. Finance and IT teams should audit what data enters these fields via bank imports.",
    whatToCheck: [
      "Review bank import files to determine whether sensitive data appears in memo fields.",
      "Confirm whether sensitive data is entering NetSuite via bank imports.",
      "Review data-retention and access policies for bank transaction records.",
      "Review any reports or dashboards that expose bank transaction memo data.",
    ],
  },
  // -- SECTION D --
  {
    id: "D-14",
    section: "D",
    team: "Inventory / Finance",
    area: "Inventory Costing",
    priority: "High",
    title: "Initial Average Cost by Location",
    whatChanged:
      "For Multi-Location Inventory accounts, 2026.2 allows initial average cost to be set for new inventory and assembly items at each individual location.",
    whyItMatters:
      "Costing may now differ by location. Item creation workflows and location-level cost reporting should be tested to confirm expected behavior.",
    whatToCheck: [
      "Review the item creation process for inventory and assembly items.",
      "Test new item creation with location-level costing in Sandbox.",
      "Validate costing results at the location level.",
      "Confirm estimated assembly costing where applicable.",
    ],
  },
  {
    id: "D-15",
    section: "D",
    team: "Supply Chain / Planning",
    area: "Supply Planning",
    priority: "Medium",
    title: "Pegging Analysis Workbooks",
    whatChanged:
      "New Demand View and Supply View pegging analysis workbooks are available for Supply Planning.",
    whyItMatters:
      "Planning teams may benefit from the new views. Existing supply-planning processes should be validated in Sandbox to confirm no behavioral changes.",
    whatToCheck: [
      "Determine whether supply planners need the Demand View and Supply View workbooks.",
      "Validate existing supply-planning processes in Sandbox.",
      "Identify reporting opportunities from the new views.",
    ],
  },
  {
    id: "D-16",
    section: "D",
    team: "Supply Chain / Manufacturing",
    area: "Capacity Planning",
    priority: "High",
    title: "Rough-Cut Capacity Planning",
    whatChanged:
      "NetSuite adds Rough-Cut Capacity Planning capabilities associated with Supply Plan Definitions and work-center capacity.",
    whyItMatters:
      "Manufacturing and supply chain teams should evaluate whether this feature should be adopted and whether it affects existing supply plan assumptions.",
    whatToCheck: [
      "Review current capacity planning processes.",
      "Identify relevant Supply Plan Definitions.",
      "Test capacity assumptions in Sandbox.",
      "Determine whether Rough-Cut Capacity Planning should be enabled and adopted.",
    ],
  },
  {
    id: "D-17",
    section: "D",
    team: "Inventory / Operations",
    area: "Inventory Transfers",
    priority: "High",
    title: "Vendor-Consigned Inventory Bin Transfers",
    whatChanged:
      "NetSuite 2026.2 adds support for bin transfers involving vendor-consigned inventory.",
    whyItMatters:
      "Accounts using vendor-consigned inventory should test bin transfers to confirm inventory balances and reporting are correct after 2026.2.",
    whatToCheck: [
      "Test representative consigned inventory bin transfers in Sandbox.",
      "Validate inventory balance calculations after transfers.",
      "Validate inventory reporting after transfers.",
    ],
  },
  {
    id: "D-18",
    section: "D",
    team: "Inventory / Supply Chain",
    area: "Reorder Planning",
    priority: "High",
    title: "Inventory Optimization for Reorder-Point Planning",
    whatChanged:
      "NetSuite introduces Inventory Optimization functionality for reorder-point planning, incorporating lead times, safety stock, and projected exceptions.",
    whyItMatters:
      "Accounts managing inventory replenishment should evaluate this feature and test whether it affects existing reorder-point logic or planning outputs.",
    whatToCheck: [
      "Review current reorder-point planning processes.",
      "Identify items applicable to Inventory Optimization.",
      "Review lead-time and safety-stock settings for applicable items.",
      "Review reorder-point assumptions and projected exceptions in Sandbox.",
      "Evaluate whether the feature should be adopted.",
    ],
  },
  // -- SECTION E --
  {
    id: "E-19",
    section: "E",
    team: "Sales / Finance",
    area: "Advanced Pricing",
    priority: "High",
    title: "Item Collections and Customer Groups in Price Rules",
    whatChanged:
      "Price Rules can now use Item Collections and Customer Groups, including dynamic collections and groups that update automatically as membership changes.",
    whyItMatters:
      "Dynamic collections mean a Price Rule's scope can change without a manual update. Existing pricing configurations should be reviewed to ensure dynamic membership does not create unintended pricing behavior.",
    whatToCheck: [
      "Review existing Price Rules for any that reference Item Collections or Customer Groups.",
      "Identify rules where dynamic membership could affect pricing outcomes.",
      "Test customer-specific and item-specific pricing scenarios in Sandbox.",
    ],
  },
  {
    id: "E-20",
    section: "E",
    team: "Sales",
    area: "Advanced Pricing",
    priority: "Medium",
    title: "Advanced Pricing Context on Sales Order Lines",
    whatChanged:
      "Sales Order lines now provide additional context for how the price on each line was determined.",
    whyItMatters:
      "Sales users and pricing administrators will see more detail on how prices were set. Training may be needed to explain the new fields and their source.",
    whatToCheck: [
      "Test representative pricing scenarios in Sandbox.",
      "Train sales users on the new pricing context fields.",
      "Validate customer-specific pricing outcomes.",
    ],
  },
  {
    id: "E-21",
    section: "E",
    team: "Sales / Admin",
    area: "Advanced Pricing",
    priority: "Medium",
    title: "Pricing Records via CSV Import",
    whatChanged:
      "Pricing records can now be managed through the CSV Import Assistant.",
    whyItMatters:
      "This opens a new pathway for bulk pricing maintenance. Accounts with large pricing structures maintained manually should evaluate whether CSV import improves the process and establish governance around CSV uploads.",
    whatToCheck: [
      "Identify current manual pricing maintenance processes.",
      "Determine whether bulk CSV import would improve the process.",
      "Establish CSV governance and validation procedures before using in production.",
    ],
  },
  // -- SECTION F --
  {
    id: "F-22",
    section: "F",
    team: "Manufacturing / Technical",
    area: "Manufacturing Transactions",
    priority: "Critical",
    title: "Zero-Quantity Manufacturing Components",
    whatChanged:
      "NetSuite introduces a preference to exclude zero-quantity components from manufacturing transactions.",
    whyItMatters:
      "If scripts, Saved Searches, SuiteQL queries, integrations, or reports currently process or expect zero-quantity component lines on manufacturing transactions, enabling this preference could break that logic. This is a structural change to manufacturing transaction data.",
    whatToCheck: [
      "Review whether any scripts process zero-quantity component lines on manufacturing transactions.",
      "Review Saved Searches filtering on manufacturing transaction components.",
      "Review SuiteQL queries selecting manufacturing component data.",
      "Review integrations that receive manufacturing transaction data.",
      "Review reports based on manufacturing component quantities.",
      "Test manufacturing transactions in Sandbox before enabling this preference.",
    ],
  },
  {
    id: "F-23",
    section: "F",
    team: "Manufacturing / Technical",
    area: "Manufacturing Transactions",
    priority: "Critical",
    title: "Advanced BOM Assembly Component Storage Change",
    whatChanged:
      "NetSuite changes how assembly components associated with Advanced Bill of Materials are stored for affected manufacturing transactions.",
    whyItMatters:
      "This is a data storage change, not a UI change. Any script, SuiteQL query, integration, or report that reads assembly component data from manufacturing transactions may return different results after 2026.2.",
    whatToCheck: [
      "Review transaction-line Saved Searches for manufacturing transactions.",
      "Review SuiteQL queries that read assembly component data.",
      "Review SuiteScript accessing manufacturing transaction sublist lines.",
      "Review integrations that receive manufacturing transaction component data.",
      "Compare pre-release and post-release transaction data in Sandbox.",
    ],
  },
  {
    id: "F-24",
    section: "F",
    team: "Manufacturing / Finance",
    area: "Manufacturing Costing",
    priority: "High",
    title: "Bulk Update of Manufacturing Charge Costs",
    whatChanged:
      "Manufacturing charge costs can now be updated in bulk.",
    whyItMatters:
      "This is primarily an efficiency improvement, but costing changes have financial reporting implications. Finance and manufacturing teams should validate costing outcomes after bulk updates.",
    whatToCheck: [
      "Review current manufacturing charge costing maintenance.",
      "Validate purchase-price and custom-cost behavior in Sandbox.",
      "Test costing results after bulk updates.",
    ],
  },
  // -- SECTION G --
  {
    id: "G-25",
    section: "G",
    team: "Sales / CPQ / Technical",
    area: "CPQ",
    priority: "Medium",
    title: "CPQ AI Assistant",
    whatChanged:
      "NetSuite CPQ introduces an AI Assistant designed to guide users through product configuration.",
    whyItMatters:
      "CPQ users may encounter the AI Assistant during configuration. Sales and CPQ teams should evaluate whether AI-assisted configuration fits the sales process before it is visible in production.",
    whatToCheck: [
      "Review CPQ product configuration in Sandbox.",
      "Evaluate whether AI-assisted configuration fits the sales process.",
      "Test representative product configurations.",
    ],
  },
  {
    id: "G-26",
    section: "G",
    team: "CPQ / Technical",
    area: "CPQ",
    priority: "Critical",
    title: "CPQ Configurator Migration Process",
    whatChanged:
      "NetSuite introduces an improved CPQ Configurator migration process.",
    whyItMatters:
      "CPQ migrations carry risk to configuration and transaction data. The migration sequence and bundle requirements must be documented and understood before migration is attempted.",
    whatToCheck: [
      "Document the full migration sequence before starting.",
      "Validate migration bundle requirements in Sandbox.",
      "Protect existing configuration and transaction data before migrating.",
      "Do not uninstall migration components without understanding the data implications.",
    ],
  },
  {
    id: "G-27",
    section: "G",
    team: "CPQ / Sales",
    area: "CPQ",
    priority: "Medium",
    title: "CPQ Transaction Attachments",
    whatChanged:
      "CPQ configuration can support adding attachments to transactions.",
    whyItMatters:
      "This extends what CPQ can attach to resulting transactions. Accounts using CPQ should test to confirm attachments and permissions work as expected.",
    whatToCheck: [
      "Test attachment creation from CPQ configuration in Sandbox.",
      "Validate attachment permissions.",
      "Validate the resulting transactions.",
    ],
  },
  // -- SECTION H --
  {
    id: "H-28",
    section: "H",
    team: "Finance / AR / Order Management",
    area: "Payment Management",
    priority: "High",
    title: "Automated Payment Adjustments",
    whatChanged:
      "NetSuite introduces automated payment adjustments.",
    whyItMatters:
      "Automated adjustments change existing manual payment processes. Finance teams should understand what triggers an automated adjustment and how it affects accounting and reconciliation.",
    whatToCheck: [
      "Identify current manual payment adjustment processes.",
      "Test automated adjustment behavior in Sandbox.",
      "Validate accounting treatment for automated adjustments.",
      "Validate reconciliation behavior after automated adjustments.",
      "Review approval controls.",
    ],
  },
  {
    id: "H-29",
    section: "H",
    team: "Billing / Finance / Technical",
    area: "SuiteBilling",
    priority: "Critical",
    title: "Externally Rated Usage Billing",
    whatChanged:
      "SuiteBilling can now support usage billing where usage amounts are calculated externally and provided to NetSuite, rather than being calculated within NetSuite.",
    whyItMatters:
      "Accounts using SuiteBilling for usage-based revenue need to validate that external usage data flows correctly, billing calculations are accurate, and downstream accounting and revenue recognition are correct.",
    whatToCheck: [
      "Test external usage data ingestion in Sandbox.",
      "Validate billing calculations against external usage data.",
      "Validate downstream accounting transactions.",
      "Test revenue recognition behavior where applicable.",
      "Review integration error handling for failed usage data submissions.",
    ],
  },
  {
    id: "H-30",
    section: "H",
    team: "Finance / Revenue Operations",
    area: "SuiteBilling",
    priority: "High",
    title: "Expanded Subscription Metrics",
    whatChanged:
      "Subscription Metrics functionality has been expanded in 2026.2.",
    whyItMatters:
      "Finance and revenue operations teams relying on subscription metrics for reporting should validate that existing metrics remain correct and explore whether expanded functionality affects reporting.",
    whatToCheck: [
      "Review recurring revenue metrics in Sandbox.",
      "Review subscription renewal processes.",
      "Validate existing subscription reporting.",
    ],
  },
  {
    id: "H-31",
    section: "H",
    team: "Payments / Technical",
    area: "Payment Processing",
    priority: "Medium",
    title: "Payment Token Type Field",
    whatChanged:
      "The Payment Token Type field can now differentiate between different token types.",
    whyItMatters:
      "Accounts using payment tokens in integrations or reporting should review whether token type differentiation affects downstream logic or processing.",
    whatToCheck: [
      "Review payment integrations that use token data.",
      "Review payment reporting for token-related fields.",
      "Determine whether token type should affect downstream processing or routing.",
    ],
  },
  // -- SECTION I --
  {
    id: "I-32",
    section: "I",
    team: "Project Management / Finance",
    area: "Project Management",
    priority: "High",
    title: "Project Health Indicators",
    whatChanged:
      "NetSuite adds five Project Health Indicators: Planned vs. Actual Time Overrun, Overdue Tasks, Resource Coverage, Project Margin, and Unbilled Approved Charges.",
    whyItMatters:
      "Project managers and finance teams gain new visibility into project health. Existing project data should be validated against the new indicators to confirm they reflect accurate project state.",
    whatToCheck: [
      "Determine which health indicators are relevant to project managers.",
      "Validate project data in Sandbox against the new indicators.",
      "Review margin calculations for accuracy.",
      "Review unbilled approved charges for completeness.",
      "Establish ownership for projects showing exceptions in the new indicators.",
    ],
  },
  // -- SECTION J --
  {
    id: "J-33",
    section: "J",
    team: "Reporting / Finance / Operations",
    area: "Reporting and Exports",
    priority: "High",
    title: "Excel Exports Default to .xlsx Format",
    whatChanged:
      "Exports of lists, Saved Searches, and reports to Microsoft Excel now default to .xlsx rather than .xls.",
    whyItMatters:
      "Any downstream process that relies on .xls output, including macros, external imports, and reporting pipelines, may break. This is a broad change affecting all users who export to Excel.",
    whatToCheck: [
      "Identify all downstream processes that consume NetSuite Excel exports.",
      "Test macros that open .xls exports for compatibility with .xlsx.",
      "Test external imports that ingest NetSuite Excel output.",
      "Test external reporting processes.",
      "Validate formatting and data structure in the new .xlsx output.",
    ],
  },
  {
    id: "J-34",
    section: "J",
    team: "Reporting / Data / Finance",
    area: "Analytics Warehouse",
    priority: "Medium",
    title: "Transfer Saved Searches to Analytics Warehouse",
    whatChanged:
      "Saved Searches can now be transferred to NetSuite Analytics Warehouse, allowing account-specific search data to be analyzed alongside standard Warehouse data.",
    whyItMatters:
      "This is a new data pathway. Accounts using Analytics Warehouse can bring custom Saved Search data into their analytics environment, but data governance should be considered before transferring searches.",
    whatToCheck: [
      "Identify high-value Saved Searches that could benefit from Analytics Warehouse analysis.",
      "Determine whether any searches should become Analytics Warehouse data sources.",
      "Review data governance policies for Analytics Warehouse before enabling.",
    ],
  },
  {
    id: "J-35",
    section: "J",
    team: "Data / Reporting / IT",
    area: "Analytics Warehouse",
    priority: "Medium",
    title: "Salesforce Data Source Separation in Analytics Warehouse",
    whatChanged:
      "NetSuite Analytics Warehouse can now distinguish NetSuite and Salesforce as separate data sources, including functional areas that share the same name in both systems.",
    whyItMatters:
      "Accounts with both NetSuite and Salesforce data in Analytics Warehouse should validate functional-area mappings and check dashboards after 2026.2.",
    whatToCheck: [
      "Review existing NetSuite and Salesforce data models in Analytics Warehouse.",
      "Validate functional-area mappings after 2026.2.",
      "Check existing dashboards and reports for any data-source changes.",
    ],
  },
  // -- SECTION K --
  {
    id: "K-36",
    section: "K",
    team: "NetSuite Admin / Technical",
    area: "Record Customization",
    priority: "High",
    title: "Advanced Record Customization",
    whatChanged:
      "Advanced Record Customization provides a centralized layer where administrators can review, manage, and override supported record definitions. The first attribute available for override is the AI Description.",
    whyItMatters:
      "This is a new administration capability. Accounts should inventory supported record types and establish governance around who can configure overrides, before overrides are applied in production.",
    whatToCheck: [
      "Review supported record types in Sandbox.",
      "Identify any existing AI descriptions on records.",
      "Establish governance and access controls around override configuration.",
      "Document any account-level overrides applied.",
    ],
  },
  {
    id: "K-37",
    section: "K",
    team: "Finance / Technical",
    area: "Custom Fields",
    priority: "High",
    title: "Currency Context for Currency Custom Fields",
    whatChanged:
      "Currency custom fields can now have a currency context configured. Oracle notes this is optional and that existing reporting is unchanged unless currency context is configured.",
    whyItMatters:
      "Finance and technical teams should inventory currency custom fields and evaluate where currency context would improve data clarity. Changes to existing fields should be tested carefully to avoid reporting regressions.",
    whatToCheck: [
      "Inventory currency custom fields across applicable record types.",
      "Identify fields where currency context is ambiguous.",
      "Review reporting implications before configuring currency context.",
      "Configure only where there is a clear business need.",
    ],
  },
  {
    id: "K-38",
    section: "K",
    team: "NetSuite Admin / Technical",
    area: "Custom Records and Fields",
    priority: "Medium",
    title: "AI Description Fields on Custom Objects",
    whatChanged:
      "AI Description fields have been added to custom records, custom fields, and custom transactions. Administrators can provide concise descriptions that NetSuite AI features use to understand custom objects.",
    whyItMatters:
      "This improves how NetSuite AI features interpret custom objects in your account. Adding descriptions is optional but recommended for accounts that use or plan to use NetSuite AI features.",
    whatToCheck: [
      "Identify critical custom objects that AI features interact with.",
      "Add meaningful, accurate AI descriptions in Sandbox.",
      "Review AI-facing terminology for consistency.",
      "Establish ownership for maintaining AI descriptions over time.",
    ],
  },
  // -- SECTION L --
  {
    id: "L-39",
    section: "L",
    team: "Development / Technical",
    area: "Development Tooling",
    priority: "Critical",
    title: "SuiteCloud Tooling Availability",
    whatChanged:
      "The July 13 preview notes state that the 2026.2 versions of the SuiteCloud Extension for VS Code, SuiteCloud CLI for Node.js, WebStorm plug-in, and SuiteCloud CLI for Java were not yet available at the time of the preview draft.",
    whyItMatters:
      "Development teams that upgrade SuiteCloud tooling before 2026.2 versions are released may face CI/CD pipeline or SDF deployment issues. Tooling availability should be confirmed before upgrading development environments.",
    whatToCheck: [
      "Check SuiteCloud tool availability before upgrading any development environments.",
      "Review CI/CD pipelines for SuiteCloud tooling version dependencies.",
      "Review SDF deployment processes.",
      "Verify development team tooling compatibility before 2026.2 reaches Production.",
      "Do not assume tooling availability based solely on the release notes.",
    ],
  },
  // -- SECTION M --
  {
    id: "M-40",
    section: "M",
    team: "Technical / Integrations",
    area: "REST Web Services",
    priority: "High",
    title: "REST SuiteQL Bound Parameters",
    whatChanged:
      "REST SuiteQL now supports anonymous bound parameters, allowing query values to be supplied separately from the query string itself.",
    whyItMatters:
      "Integrations that build SuiteQL queries dynamically with user-supplied values should evaluate whether bound parameters can replace string-built queries. Bound parameters reduce injection risk and improve query reuse.",
    whatToCheck: [
      "Review dynamic SuiteQL integrations that incorporate user-supplied or runtime values.",
      "Identify queries where string-building creates maintenance or security concerns.",
      "Evaluate whether bound parameters should replace string-built queries.",
      "Test affected integrations in Sandbox.",
    ],
  },
  {
    id: "M-41",
    section: "M",
    team: "Technical / Integrations",
    area: "REST Web Services",
    priority: "High",
    title: "Sequential REST Batch Processing",
    whatChanged:
      "REST Web Services now supports sequential processing of batch operations, allowing dependent operations to be chained within a single batch.",
    whyItMatters:
      "Integrations with dependent operations, such as parent/child record creation or order-dependent transactions, may benefit from sequential batch processing. Existing integrations using workarounds for operation ordering should be evaluated.",
    whatToCheck: [
      "Identify integrations with parent/child record creation dependencies.",
      "Review order-dependent transaction creation in integrations.",
      "Determine whether sequential processing can simplify existing integration logic.",
      "Test sequential batch operations in Sandbox.",
    ],
  },
  // -- SECTION N --
  {
    id: "N-42",
    section: "N",
    team: "Finance / Tax / AP",
    area: "SuiteTax",
    priority: "Critical",
    title: "SuiteTax on Vendor Term Discounts",
    whatChanged:
      "SuiteTax introduces tax handling for term discounts on purchase transactions. Tax calculation on vendor term discounts has changed in 2026.2.",
    whyItMatters:
      "Accounts using SuiteTax and vendor term discounts need to validate tax calculations, resulting accounting transactions, and reconciliation in Sandbox before production. This has direct financial reporting implications.",
    whatToCheck: [
      "Test vendor bills with term discounts in Sandbox after 2026.2.",
      "Validate tax calculations on discounted purchase transactions.",
      "Validate resulting accounting transactions.",
      "Review reconciliation for affected transactions.",
      "Test credit and adjustment behavior.",
    ],
  },
  // -- SECTION O --
  {
    id: "O-43",
    section: "O",
    team: "AP / Finance",
    area: "Accounts Payable",
    priority: "High",
    title: "Payment Runs for Bulk Payables Processing",
    whatChanged:
      "NetSuite introduces Payment Runs, a new capability for preparing, reviewing, approving, and processing multiple payables in a single workflow.",
    whyItMatters:
      "Payment Runs is a new AP workflow. Existing Bill Payment processes should be reviewed to determine whether Payment Runs should be adopted, and the approval workflow should be validated in Sandbox.",
    whatToCheck: [
      "Review the existing Bill Payment process.",
      "Test Payment Runs in Sandbox.",
      "Review the approval workflow for Payment Runs.",
      "Review payment selection logic.",
      "Validate accounting entries generated by Payment Runs.",
    ],
  },
  {
    id: "O-44",
    section: "O",
    team: "AP / Finance",
    area: "Accounts Payable",
    priority: "High",
    title: "Bill Capture Enhancements",
    whatChanged:
      "Bill Capture preferences have been enhanced around item and expense amounts and gross/net handling.",
    whyItMatters:
      "Changes to Bill Capture preferences can affect how vendor bills are captured and the amounts that appear on captured bills. AP teams should test representative vendor bill captures in Sandbox after 2026.2.",
    whatToCheck: [
      "Review current Bill Capture preference settings.",
      "Test vendor bill capture in Sandbox after 2026.2.",
      "Validate captured amounts for items and expenses.",
      "Test approval workflow behavior for captured bills.",
    ],
  },
];
