---
title: "NetSuite Restricted Fund Accounting for Nonprofits"
description: "NetSuite restricted fund accounting uses class and segment fields to track donor restrictions, grant compliance reports, and budget controls for nonprofits."
date: "2026-09-19"
updated: "2026-09-19"
tags: ["Nonprofit", "NetSuite", "Fund Accounting"]
calloutText: "Need restricted fund reporting built for your NetSuite nonprofit account?"
---

Restricted fund accounting refers to tracking donor-restricted contributions separately from unrestricted operating funds, with reporting that demonstrates each restricted gift was spent only on the purpose the donor specified. A donor who contributes $500,000 to a capital campaign, a foundation that awards a grant for a specific research program, or a government agency that funds a service contract all impose restrictions on how the money can be spent. The organization receiving these funds has a legal and ethical obligation to honor those restrictions and to produce reports showing compliance. NetSuite supports this with a combination of class, department, and custom segment structures, but configuring those structures to produce clean fund-level reporting requires deliberate setup that the standard chart of accounts alone does not provide.

The alternative that most nonprofits start with, before proper fund accounting configuration, is a spreadsheet running alongside NetSuite that tracks grant balances and restricted fund positions. Finance posts transactions in NetSuite for accounting purposes and maintains a separate fund tracking spreadsheet for grant reporting. The spreadsheet diverges from NetSuite whenever transactions are reclassified or reversed, and reconciling the two at grant reporting time becomes a significant effort. The goal of proper restricted fund configuration in NetSuite is to make the fund tracking data a direct output of the same transactions that feed the financial statements.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite restricted fund accounting for nonprofits is implemented using a combination of class, department, and custom segment fields that tag every revenue and expense transaction to the fund it belongs to. Donor-restricted contributions are posted to restricted net asset accounts and tagged with the fund class or segment. Expenditures drawing on restricted funds are tagged with the same class, allowing a fund-level income statement to show revenue and expenses for each restriction category separately. Grant-specific reporting requires saved searches that filter transactions by the grant class or segment and compare expenditures to the approved budget by cost category and grant period. SuiteScript can enforce spending controls that prevent posting an expense to a fund after the grant period has ended or after the approved budget for a cost category has been exhausted. SuitePacific configures this for nonprofits already live on NetSuite. Plans start at $799 per month.</p>
</div>

## What is the difference between restricted and unrestricted net assets?

Nonprofit accounting under ASC 958 (and the FASB standards that preceded it) organizes net assets into two categories: net assets with donor restrictions and net assets without donor restrictions. Restricted net assets carry a donor-imposed constraint on purpose or timing; unrestricted net assets can be spent at the organization's discretion for any mission-related purpose.

Within restricted net assets, purpose restrictions limit spending to a specified activity (a capital project, a program, a geographic location). Time restrictions limit spending to a future period (a pledge payable in three annual installments). Permanently restricted funds require the principal to be maintained in perpetuity, with only income available for spending.

In NetSuite, these categories are typically implemented as separate general ledger accounts: a restricted net assets account for each active restriction, and an unrestricted net assets account for the board-designated and operating reserves. The class or custom segment structure controls which GL account a transaction posts to, depending on the fund it is tagged to.

## How does NetSuite track spending against a grant budget?

Grant budget tracking in NetSuite requires three elements: a budget record at the grant level, a tagging mechanism that associates actual transactions with the grant, and a saved search that compares actual expenditures to the budget by cost category.

The budget record is typically a NetSuite budget record (under the budgets feature) or a custom grant record with budget fields by cost category. The budget holds the approved amount for each allowable cost type: personnel, supplies, travel, indirect costs, and so on.

Each expense transaction drawn on the grant is tagged with the grant's class or segment value. A saved search joins the expense transactions to the budget record by grant and cost category, showing actual expenditures, remaining budget, and percent consumed for each line. This is the grant spend report that program directors and grant accountants use throughout the grant period.

Indirect cost rate application requires a scheduled script or periodic journal entry that calculates the indirect cost charge (the approved rate applied to the direct cost base for the period) and posts it to the grant's indirect cost category.

## What spending controls can NetSuite enforce for restricted funds?

Beyond reporting, NetSuite can enforce controls that prevent spending errors before they occur:

**Grant period enforcement** uses a User Event script on expense transactions that reads the grant's start and end date from the grant record and blocks the transaction from posting if the expense date falls outside the grant period. This prevents charges to an expired grant.

**Budget overspend alerts** use a workflow or script that calculates the remaining budget on expense save and warns the approver if the transaction would take a cost category over the approved amount. A hard block version prevents saving the transaction until the budget overrun is resolved.

**Fund restriction enforcement** uses role-based controls or a script that prevents an expense from being coded to a restricted fund if the expense type does not match the fund's stated purpose.

These controls require that the fund and grant data is maintained in NetSuite as the system of record, which is the broader goal of proper restricted fund configuration.

SuitePacific provides ongoing NetSuite support for nonprofits including fund accounting configuration, grant reporting, and spending control builds. See [NetSuite nonprofit support](/industries/nonprofit) for the full engagement scope and [NetSuite grant management](/netsuite-grant-management) for the service.

## Related reading

- [NetSuite nonprofit support](/industries/nonprofit): full overview of post-go-live support for nonprofit organizations
- [NetSuite grant management service](/netsuite-grant-management): grant record builds, budget-versus-actual reporting, and period controls
- [NetSuite nonprofit fund accounting service](/netsuite-nonprofit-fund-accounting): fund structure configuration and restricted net asset reporting
- [NetSuite nonprofit reporting](/netsuite-nonprofit-reporting): board dashboards, donor reporting, and 990 support
