import { SITE_URL } from "./content";

export type CaseStudyData = {
  slug: string;
  title: string;
  metaDescription: string;
  tags: string[];
  relatedServices: { label: string; href: string }[];
  cardChallenge: string;
  cardOutcome: string;
  sections: {
    challenge: string[];
    solution: string[];
    outcome: string[];
  };
};

export const CASE_STUDIES_DETAIL: CaseStudyData[] = [
  {
    slug: "project-performance-dashboard",
    title: "Custom Project Performance Dashboard",
    metaDescription:
      "How SuitePacific built a custom NetSuite dashboard consolidating actual hours, budgeted effort, and project progress into a single real-time view for project managers.",
    tags: ["Saved Searches", "Dashboards"],
    relatedServices: [
      { label: "Saved Searches & Dashboards", href: "/netsuite-saved-searches-dashboards" },
      { label: "Post-Go-Live Support", href: "/netsuite-post-go-live-support" },
    ],
    cardChallenge:
      "Project managers were rebuilding status reports manually before every meeting. NetSuite had the data but no way to surface it in one place.",
    cardOutcome:
      "Budget-versus-actual status became visible at a glance, so overruns were caught while there was still time to act.",
    sections: {
      challenge: [
        "The client's project managers were rebuilding status reports manually before every stakeholder meeting. NetSuite had the data — actual hours logged, budgeted effort by phase, remaining work — but it was spread across Projects, Tasks, and Time records with no way to see all three together without exporting to Excel. By the time the spreadsheet was ready, the numbers were already a few days old.",
        "The team had tried using standard NetSuite reporting, but the built-in tools couldn't join these record types in a single view. Managers were spending time before each meeting reconstructing a picture that NetSuite already had the raw data to produce.",
      ],
      solution: [
        "We built a set of formula-based saved searches comparing budgeted hours to actuals at both the project and task level, pulling from the three record types NetSuite's standard reports couldn't join cleanly. These fed into a role-based dashboard with portlets showing current budget health across the active project portfolio, a red/amber/green status indicator driven by percentage consumed versus percentage complete, and a list of tasks approaching their budget ceiling.",
        "We also added a drill-through view so project managers could click from the portfolio summary into individual project detail without leaving NetSuite. The dashboard was scoped to the Project Manager role so each manager saw only their own active projects by default, with an admin view available for portfolio-level oversight.",
      ],
      outcome: [
        "Project managers could see the budget status of every active project in one view the moment they logged in, instead of spending time before each meeting rebuilding a spreadsheet. Overruns became visible while there was still runway to act — not after the project had already blown its budget.",
        "The time spent preparing for status meetings dropped significantly. The dashboard became the default starting point for project reviews rather than a spreadsheet assembled the night before.",
      ],
    },
  },
  {
    slug: "vendor-quotation-management",
    title: "Vendor Quotation Management Solution",
    metaDescription:
      "How SuitePacific built a custom NetSuite quotation workflow that centralized vendor quotes, enabled side-by-side comparison, and converted accepted quotes directly to purchase orders.",
    tags: ["SuiteScript", "Workflow Automation"],
    relatedServices: [
      { label: "Workflow Automation", href: "/netsuite-workflow-automation" },
      { label: "SuiteScript Development", href: "/netsuite-suitescript-development" },
    ],
    cardChallenge:
      "Procurement was managing supplier quotes through email and spreadsheets. There was no audit trail of why a vendor was chosen or how prices were compared.",
    cardOutcome:
      "The full quotation process — from request to purchase order — now runs inside NetSuite, with a complete audit trail and no re-entry of data.",
    sections: {
      challenge: [
        "The procurement team was managing supplier quotations through a combination of emails, a shared spreadsheet, and manual price comparisons. When a buyer needed to choose between three vendors, they'd gather quotes over email, enter them into a spreadsheet, compare columns manually, and then key the winning price into a purchase order by hand. The process was slow, prone to transcription errors, and left no record of why a particular vendor was selected.",
        "When procurement decisions were questioned later — by finance, auditors, or management — there was no documentation inside NetSuite to reference. The reasoning existed only in email threads and spreadsheets that were difficult to locate after the fact.",
      ],
      solution: [
        "We built a custom record type in NetSuite — a Quotation Request — that linked to purchase requirements and let buyers send standardized requests to multiple vendors directly from NetSuite. Vendor responses were captured against each line item, and a comparison view was built as a Suitelet that rendered all quotes side by side, highlighting the lowest price per item and flagging lead time differences.",
        "A SuiteFlow workflow managed the approval process and converted the accepted quote to a purchase order automatically, with the audit trail — which vendors were contacted, what they quoted, and which was selected — stored against the originating requirement. Thresholds and approval routing were configurable by an administrator without changes to the underlying scripts.",
      ],
      outcome: [
        "The full quotation cycle now runs inside NetSuite. Buyers compare vendors in a single view without assembling a spreadsheet, the decision and its rationale are documented, and purchase orders are created directly from the accepted quote without re-keying any data.",
        "The procurement team reduced the time from quote request to purchase order issuance, and the audit trail meant vendor selection decisions were fully traceable — a requirement that had been an ongoing compliance concern.",
      ],
    },
  },
  {
    slug: "sales-order-approval-workflow",
    title: "Intelligent Sales Order Approval Workflow",
    metaDescription:
      "How SuitePacific built a configurable NetSuite SuiteFlow workflow that automatically flags low-margin sales orders and routes them to the appropriate approver based on margin thresholds.",
    tags: ["Workflow Automation"],
    relatedServices: [
      { label: "Workflow Automation", href: "/netsuite-workflow-automation" },
      { label: "Post-Go-Live Support", href: "/netsuite-post-go-live-support" },
    ],
    cardChallenge:
      "Low-margin sales orders were slipping through unreviewed. Finance only noticed after the orders had already been processed and the pricing conversation was over.",
    cardOutcome:
      "Every order below the margin threshold is now held and routed to the right approver automatically, with consistent enforcement across every transaction.",
    sections: {
      challenge: [
        "The client's sales team was authorized to negotiate pricing within a range, but there was no mechanism to reliably catch transactions where the negotiated margin had dropped below an acceptable floor. Finance periodically discovered low-margin orders after they had already shipped, at which point the conversation with the customer was already over and the margin concession was locked in.",
        "The approval process that was supposed to catch these situations was informal — it depended on a sales manager noticing the problem before the order moved forward. Whether an order got reviewed depended on which manager was available and whether they happened to check it, rather than on consistent policy enforcement.",
      ],
      solution: [
        "We built a SuiteFlow workflow that evaluated gross margin percentage on every sales order at submission. If the margin fell below a configurable threshold — set per customer class, with different floors for different customer segments — the order was automatically held and routed to the appropriate approver based on the margin bracket and the order value. Approvers received a formatted email showing the order details, the margin calculation, and a direct approval or rejection link.",
        "The margin thresholds and approval routing rules were stored in a custom configuration record so they could be adjusted by an administrator without modifying the workflow. The workflow also captured the approver's decision and any comments as a note on the sales order, creating a record of every exception and how it was resolved.",
      ],
      outcome: [
        "Every sales order with a margin below the threshold is now reviewed before it ships. The sales team knows exactly when their pricing will trigger a review, the routing is consistent regardless of who is available, and finance has a complete record of every margin exception.",
        "The number of low-margin orders that reached the warehouse without review dropped to zero in the first month. The improvement was a matter of process reliability rather than catching more problems — the problems were already happening, they just weren't being caught.",
      ],
    },
  },
  {
    slug: "invoice-processing-automation",
    title: "High-Volume Invoice Processing Automation",
    metaDescription:
      "How SuitePacific built a NetSuite Map/Reduce script to automate batch invoice generation, turning a multi-day manual process into an overnight scheduled run with exception reporting.",
    tags: ["SuiteScript"],
    relatedServices: [
      { label: "SuiteScript Development", href: "/netsuite-suitescript-development" },
      { label: "Post-Go-Live Support", href: "/netsuite-post-go-live-support" },
    ],
    cardChallenge:
      "The billing team was generating invoices one at a time at month-end. Hundreds of transactions meant multiple days of repetitive manual work every cycle.",
    cardOutcome:
      "Batch invoice generation now runs overnight as a scheduled process. The team starts each day with a completion report and a short exceptions list instead of a queue of individual records.",
    sections: {
      challenge: [
        "The client's billing team was processing invoices at month-end by opening each parent transaction individually, generating the invoice, reviewing the output, and moving to the next. With several hundred transactions per billing cycle, this consumed two to three days of staff time every month — time spent on repetitive data entry rather than review and exception handling.",
        "The process was also sensitive to interruptions. If a team member had to stop midway through the batch, tracking where they had left off required reconciling against the source list by hand. There was no reliable checkpoint, which meant mistakes were possible and time was lost re-verifying work.",
      ],
      solution: [
        "We developed a Map/Reduce script that automated the batch invoice generation process. The Get Input Data stage identified all transactions eligible for invoicing based on configurable criteria — transaction type, subsidiary, customer class, and date range. Each record was then processed in parallel across the Map stage, with the generated invoice validated before being finalized. Records that failed validation were flagged with the specific reason rather than silently skipped.",
        "The Summarize stage produced a completion report written to a custom record in NetSuite, showing how many invoices were generated, how many were skipped, and the reason for any failures. A saved search surfaced all exceptions so the billing team could review and resolve them without re-running the full batch. The script was scheduled to run automatically at the beginning of each billing cycle, with the parameters controlled through a configuration record.",
      ],
      outcome: [
        "A process that previously took multiple days of manual work now completes as an overnight run. The billing team starts the next morning with a summary of what was generated and a short list of exceptions to review — rather than working through a queue of individual records from scratch.",
        "Staff time that had been allocated to repetitive invoice generation was redirected to exception review and customer follow-up. The billing cycle shortened, and the risk of records being missed or processed out of order was eliminated.",
      ],
    },
  },
  {
    slug: "advanced-pdf-document-automation",
    title: "Advanced PDF Document Automation",
    metaDescription:
      "How SuitePacific rebuilt NetSuite invoice, purchase order, and statement templates using FreeMarker to handle multi-subsidiary headers, barcode generation, and conditional formatting.",
    tags: ["Advanced PDF Templates"],
    relatedServices: [
      { label: "Advanced PDF Templates", href: "/netsuite-advanced-pdf-templates" },
      { label: "Post-Go-Live Support", href: "/netsuite-post-go-live-support" },
    ],
    cardChallenge:
      "Standard NetSuite templates couldn't handle multi-subsidiary headers, barcode requirements, or conditional document sections. Every document needed manual touch-up before it was sent.",
    cardOutcome:
      "Every document now generates correctly formatted and on-brand straight out of NetSuite, with no manual intervention required.",
    sections: {
      challenge: [
        "The client's standard NetSuite PDF templates were producing documents that didn't meet their operational or branding requirements. Invoices needed different headers, contact details, and payment instructions depending on which subsidiary was billing — but maintaining a separate template for each entity was creating a maintenance problem. Purchase orders needed to include a Code 128 barcode for the receiving team's scanning workflow, which the standard template engine didn't support. Customer statements had conditional sections that should only appear when the account carried a credit balance.",
        "The workaround was manual: staff would generate documents from NetSuite and then open them in a separate tool to apply corrections, add barcodes, or remove sections that shouldn't have appeared. Every document that left the business had been touched at least once after NetSuite generated it.",
      ],
      solution: [
        "We rebuilt the invoice, purchase order, and statement templates using NetSuite's Advanced PDF/HTML framework with FreeMarker templating. The invoice template used conditional blocks to switch headers, contact details, and payment instructions based on subsidiary — a single template that handled all entities correctly without branching into separate files. The purchase order template generated a Code 128 barcode from the order number using NetSuite's built-in barcode rendering, sized and positioned to match the receiving team's scanner specification.",
        "The statement template included FreeMarker conditional sections that rendered only when triggered by specific account conditions. A shared CSS stylesheet was applied across all three templates so global formatting changes — fonts, spacing, colour values — could be made in one place and applied consistently. All templates were tested against a representative set of real transactions in sandbox before deployment.",
      ],
      outcome: [
        "Every document generated out of NetSuite now matches the client's brand standards and handles the full range of transaction variations correctly. The receiving team scans purchase orders directly without a separate barcode label step. Invoices display the correct subsidiary information without any manual correction.",
        "The post-generation editing step was eliminated entirely. Documents go from NetSuite to the customer or vendor with no manual touch-up in between, and the template maintenance burden dropped because all formatting lives in one shared stylesheet rather than multiple independently maintained files.",
      ],
    },
  },
  {
    slug: "operational-reporting",
    title: "Operational Reporting & Business Intelligence",
    metaDescription:
      "How SuitePacific built role-based NetSuite dashboards and saved searches for operations and finance teams, replacing weekly manual exports with real-time visibility into the data that mattered.",
    tags: ["Saved Searches", "Dashboards"],
    relatedServices: [
      { label: "Saved Searches & Dashboards", href: "/netsuite-saved-searches-dashboards" },
      { label: "Post-Go-Live Support", href: "/netsuite-post-go-live-support" },
    ],
    cardChallenge:
      "Operations and finance teams were exporting data weekly and reformatting it in Excel before it could be shared. New report requests meant waiting on someone with NetSuite access and time to build them.",
    cardOutcome:
      "Each team now has a dashboard that answers their recurring questions in real time, without a weekly export or a request queue.",
    sections: {
      challenge: [
        "The operations and finance teams were spending significant time each week running NetSuite reports, exporting results to Excel, and reformatting the data before it could be shared with management. NetSuite had most of the underlying data, but the standard reporting tools didn't produce the cross-record summaries the business actually needed — particularly views that combined data from multiple transaction types or applied conditional logic that saved searches alone couldn't handle.",
        "Requests for a new report or a modified view went into a queue and typically waited for someone with both the NetSuite access and the time to build it. By the time a report was ready, the data it contained was often several days old and the question it was meant to answer had already been worked around using spreadsheets.",
      ],
      solution: [
        "We built a set of role-based dashboards and supporting saved searches tailored to each team's specific reporting needs. For operations, this included a real-time inventory position by location, open purchase order tracking with expected receipt dates, and a backorder report that flagged unfulfilled customer demand against current stock levels. For finance, we built a consolidated AR aging view, a cash flow summary combining open invoices and expected receipts by period, and an exception report for transactions sitting in a pending state past a configurable threshold.",
        "Each dashboard was configured to the role so each user saw only the metrics relevant to their function without needing to filter or reconfigure the view on login. Saved searches were formula-based where possible to reduce query load and avoid the performance issues that come from running heavy searches on dashboards with frequent refresh cycles.",
      ],
      outcome: [
        "Each team now has a dashboard that answers their recurring questions without building a report or waiting on someone else. The reporting that previously required weekly manual work is available at any point during the day, updated in real time from NetSuite's live data.",
        "The finance team's weekly export process was retired. The operations team's backorder reconciliation — which had been a standing Monday morning task — was replaced by a dashboard view they could check at any time. New reporting requests, when they came up, were additions to an existing structured system rather than one-off exports built from scratch.",
      ],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return CASE_STUDIES_DETAIL.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES_DETAIL.map((cs) => cs.slug);
}

export function getCaseStudyUrl(slug: string): string {
  return `${SITE_URL}/case-studies/${slug}`;
}
