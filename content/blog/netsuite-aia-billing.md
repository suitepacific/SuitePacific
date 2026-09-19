---
title: "NetSuite AIA Billing: How to Produce G702/G703 Pay Applications for Construction"
description: "NetSuite does not generate AIA G702/G703 pay applications natively. Producing standard AIA format billing for construction clients requires a custom advanced PDF template and a schedule of values structure. Here is how it works."
date: "2026-09-19"
updated: "2026-09-19"
tags: ["Construction", "NetSuite", "Billing"]
calloutText: "Building AIA billing in NetSuite? Tell us about your billing setup."
---

AIA billing refers to the standardized pay application format defined by the American Institute of Architects, specifically the G702 Application and Certificate for Payment and the G703 Continuation Sheet. These forms are required by most general contractors and public works projects as the prescribed format for invoicing on construction contracts. NetSuite does not generate AIA-format documents natively; producing a G702/G703 from NetSuite requires a custom advanced PDF template built on FreeMarker and a project billing structure that captures the schedule of values with line-by-line billing history, retainage, and percent complete.

The gap between what NetSuite ships with and what a construction subcontractor or general contractor needs for owner billing is significant. Standard NetSuite invoices are general-purpose documents: they list items, quantities, rates, and totals. They have no concept of a schedule of values, no retainage field, no running cumulative column, and no AIA-standard layout. A subcontractor submitting a pay application to a general contractor on a public works project cannot hand over a standard NetSuite invoice and expect it to be accepted. The G702/G703 format exists for a reason, and building it in NetSuite requires deliberate configuration work.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">SuitePacific builds AIA billing capability in NetSuite by combining a custom schedule of values record, percent-complete and retainage fields on billing lines, and a FreeMarker advanced PDF template that renders the G702 cover sheet and G703 continuation sheet in AIA-standard layout. The schedule of values record tracks each billing line's original contract value, previous billings, current period billing, and cumulative totals. Retainage is calculated as a configurable percentage held from each billing, tracked as a separate receivable on the balance sheet. The G702 cover summarizes contract value, change orders, total billed to date, retainage held, and net amount due this application. The G703 continuation sheet lists every line item in the schedule of values with its running totals. The result is a pay application document that meets general contractor and public agency requirements without leaving NetSuite.</p>
</div>

## What are the G702 and G703 forms?

The G702 and G703 are the two-part pay application package defined by the American Institute of Architects and used industry-wide across construction contracts in the United States.

The **G702** is the cover sheet. It summarizes the project-level billing position: the original contract sum, approved change orders, the revised contract value, the total value of work completed and stored materials to date, the retainage amount held, the total earned less retainage, the amount previously certified, and the current amount due this application. The G702 also carries a notarized certification by the contractor and a separate certification block for the architect or owner's representative. It is essentially the executive summary of the billing event.

The **G703** is the continuation sheet. It is a line-by-line schedule of every item in the contract, with columns for the scheduled value (the original contract value assigned to that line), the work completed in previous periods, the work completed in the current period, materials presently stored, the total completed and stored to date, the percentage complete for that line, and the balance to finish. The G703 is where the detail lives; the G702 rolls it up.

Together, the G702 and G703 form a complete pay application package. Owners and general contractors use the G703 to verify that the amounts on the G702 are supported by line-item detail. Lenders and title companies use the same package to release draw funds on construction loans.

## Why can't NetSuite generate AIA forms out of the box?

NetSuite's invoice record is designed for general commerce: a header with customer, date, and terms, and lines with item, quantity, rate, and amount. That structure does not map to the AIA pay application format for several reasons.

First, there is no schedule of values structure in standard NetSuite. A schedule of values is a project-specific document established at contract signing that assigns a dollar value to each scope item or cost code. It persists across the entire project life and accumulates billing history line by line. NetSuite invoices are point-in-time documents; they do not natively carry a running history of what has been billed against each line in prior periods.

Second, retainage is not a standard field on NetSuite invoices. Retainage requires holding back a percentage of each billing as a separate receivable category, tracking the accumulated withheld amount across the project, and ultimately releasing it through a final pay application. None of this is built into the standard invoice workflow.

Third, percent-complete billing requires a mechanism to bill a calculated percentage of a line's total value rather than a flat quantity times rate. A contractor billing 40% complete on a $50,000 concrete scope item needs to generate a $20,000 line item from that percentage, not from a quantity entry.

Fourth, the G703 format requires a multi-period cumulative running total by line, which is fundamentally different from a single-period invoice. Standard NetSuite invoice lines show only what is being billed now, not what was billed in all prior periods combined.

## What does the build involve?

Building AIA billing in NetSuite requires four components working together.

**Schedule of values record.** This is typically a custom record or a project-linked transaction that lists each billing line with its original contract value. Each line needs fields for the amount billed in prior periods (populated automatically from prior invoices) and the amount being billed in the current period. The schedule of values is the source of truth for the G703.

**Percent-complete field.** A custom field on the billing line (or on the project record) holds the percentage complete for that line item in the current billing period. A formula or workflow calculates the current-period billing amount as the percent complete times the scheduled value, minus amounts already billed. This drives the current-period column on the G703.

**Retainage calculation.** A custom field holds the retainage percentage (typically 5% or 10%). Formulas calculate the gross billing amount, the retainage held on this application, and the net amount due. A separate retainage receivable account tracks the cumulative amount withheld across all billing periods. At project completion, a final pay application releases the retained amount.

**Advanced PDF template.** The FreeMarker-based advanced PDF template renders the G702 cover and G703 continuation sheet in AIA-standard layout. The template reads from the schedule of values record, the current invoice, and the retainage field to populate every cell in the pay application package. The template is attached to the invoice record type within NetSuite's document template configuration; no external tool generates the document.

A note on navigation: the exact menu path for configuring advanced PDF templates varies by NetSuite version and account configuration. Rather than prescribe a specific path that may not match your account, the template attachment is handled within NetSuite's standard customization area for transaction forms and print templates.

## What is retainage and how is it handled?

Retainage, sometimes called retention, is a contractual mechanism in construction billing where the owner or general contractor withholds a percentage of each progress billing until the project reaches substantial completion or until all punch list items are resolved. It exists to give the owner financial leverage to ensure the contractor completes the work.

Typical retainage rates are 5% to 10% of each billing application. So on a $100,000 pay application at 10% retainage, the contractor invoices $100,000 but receives $90,000. The $10,000 withheld is a retainage receivable on the contractor's books.

From an accounting standpoint, retainage creates a receivable that does not appear in the standard accounts receivable aging until it is released. It needs its own account on the balance sheet so that financial statements accurately reflect the total amount owed to the contractor. When a WIP report is prepared, the retainage balance is reported separately from the earned-but-unbilled position.

At project close, the contractor submits a final pay application that includes both the last progress billing and the release of all accumulated retainage. Some contracts reduce retainage from 10% to 5% at a defined completion milestone (often 50% complete) to improve the contractor's cash flow in the latter half of the project.

In NetSuite, retainage is handled through a combination of a custom percentage field on the billing record, a formula field computing the withheld amount, a net-due field showing the amount actually receivable, and a separate retainage receivable account that accumulates across all billing periods on the project.

## Standard NetSuite invoice vs AIA-formatted billing

| Element | Standard NetSuite Invoice | AIA-Formatted Billing |
|---|---|---|
| Schedule of values | Not available | Custom record per project with line-by-line tracking |
| G702 cover sheet | Not available | FreeMarker PDF template rendering AIA-standard layout |
| G703 continuation sheet | Not available | FreeMarker PDF template with running SOV totals |
| Retainage | Not available natively | Custom field with formula; separate retainage receivable account |
| Percent complete | Not available | Custom field on SOV line driving current period amount |
| Billing history by line | Not tracked across invoices | Cumulative billed column on G703 spanning all prior periods |
| Change order tracking | Not available | Change order amounts reflected in revised contract sum on G702 |

## What other billing formats do construction companies use in NetSuite?

AIA billing is the dominant format for commercial and public works contracts, but construction companies use several other billing methods depending on their contract type and trade.

**Time and materials billing** generates invoices from time entries and expense reports attached to a project. This works with standard NetSuite project billing and does not require a custom schedule of values. T&M billing is common for service and maintenance contractors and for small scope changes that fall outside the main contract.

**Fixed-fee milestone billing** triggers an invoice when a defined project phase is marked complete. The contractor does not track percent-complete by line; instead, the contract defines specific payment milestones such as foundation complete, rough-in complete, or substantial completion. See the discussion of milestone billing for how to configure this in NetSuite.

**Unit price billing** charges the owner based on the number of units installed in the period: linear feet of pipe, square feet of drywall, fixtures installed. The invoice lines drive from a quantity count rather than a percent complete. Unit price billing is common for civil work and specialty trades where scope is measured in physical quantities.

**Cost-plus billing** passes actual project costs through to the owner with a markup percentage applied. The invoice reflects actual cost transactions from the period plus the markup. This is common on design-build and negotiated contracts where the scope is not fully defined at contract start.

## FAQ

**Does NetSuite support AIA billing natively?**
No. NetSuite's standard invoice record does not generate G702 or G703 documents. Producing AIA-format pay applications requires a custom schedule of values structure, retainage fields, percent-complete logic, and a FreeMarker advanced PDF template. These components must be built and configured specifically for each company's billing structure.

**What is a schedule of values in NetSuite?**
A schedule of values is a project-specific list of billing line items, each with an assigned contract value representing the portion of the total contract attributed to that scope item or cost code. In NetSuite, a schedule of values is typically built as a custom record linked to the project record. It tracks the original value, prior billings, current-period billing, and cumulative totals for each line, providing the source data for the G703 continuation sheet.

**How is retainage tracked in NetSuite?**
Retainage is tracked through custom fields on the billing record: a retainage percentage field, a calculated withheld amount field, and a net-due field. The cumulative retainage balance across all billing periods is recorded to a separate retainage receivable account on the balance sheet. At project completion, the final pay application releases the accumulated retainage to the standard accounts receivable account.

**Can SuitePacific build a G702/G703 template for our NetSuite account?**
Yes. SuitePacific builds AIA billing configurations including the schedule of values record, retainage fields, percent-complete logic, and the FreeMarker PDF template producing the G702 and G703. The build is scoped to your specific contract structure, retainage terms, and any trade-specific billing requirements such as stored materials or change order tracking.

**How long does an AIA billing build take?**
A standard AIA billing build for a single entity with a defined contract structure typically takes four to eight weeks from scoping to first live pay application. Complexity factors include the number of cost code levels in the schedule of values, whether stored materials need to be tracked separately, and whether the G702 requires notarization fields or lender-specific formatting. Multi-entity or multi-contract structures take longer.

**What certifications does SuitePacific hold for construction NetSuite work?**
SuitePacific is a NetSuite Solution Provider specializing in post-go-live support and customization for mid-market companies, including construction contractors. Our work spans custom PDF templates, project billing configuration, WIP reporting, and retainage management across commercial, residential, and specialty trade contractors. We focus on accounts that are already live on NetSuite and need the billing and reporting infrastructure built out properly.
