---
title: "NetSuite Lot Tracking with Expiry for Medical Devices"
description: "NetSuite lot tracking with expiration dates for medical devices requires FEFO picking logic and automated expiry alerts to meet FDA traceability needs."
date: "2026-09-20"
updated: "2026-09-20"
tags: ["Healthcare", "Medical Device", "NetSuite", "Lot Tracking"]
calloutText: "Need lot tracking and expiry management built for your NetSuite account?"
---

Lot tracking with expiration dates in the medical device and pharmaceutical industries means recording the lot number and expiration date at every point in the product lifecycle: when a lot is received from a supplier, when units are allocated to a sales order, when they ship to a customer, and when they are returned or recalled. FDA regulations under 21 CFR Part 820 (medical devices) and 21 CFR Part 211 (pharmaceuticals) require manufacturers and distributors to maintain records that allow them to trace any unit back to its manufacturing lot and forward to every customer who received units from that lot. NetSuite supports lot tracking natively through its Lot Numbered Inventory feature, which records lot numbers on item receipts and item fulfillments and links them to the underlying transactions. What NetSuite does not provide natively is expiration date tracking at the lot level, first-expired-first-out (FEFO) picking enforcement, automated expiry alerts, and the recall traceability reports that regulators and quality teams need.

The gap between NetSuite's native lot tracking and what regulated healthcare companies need is most visible during a recall or a customer complaint investigation. A recall notice from a supplier requires the quality team to identify every customer who received units from the affected lot within a specified date range. If lot numbers were not captured on item fulfillments, or if the data exists in NetSuite but cannot be queried in a usable format, the team must search manually through order records. A complaint investigation requires tracing a customer-reported lot number back to the receipt, the supplier, and the other customers who received units from the same lot. These investigations are time-critical and the data infrastructure to support them must be in place before a recall or complaint occurs.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite lot tracking with expiration dates for medical device and pharma companies is implemented by enabling Lot Numbered Inventory with bin management and adding a custom expiration date field to the inventory lot record. A SuiteScript on item receipt populates the expiration date when the lot is received. A FEFO picking script reads the expiration dates on available lots and allocates the earliest-expiring lots to fulfillments first, preventing out-of-sequence shipments that could result in expired product reaching customers. An expiry alert script runs on a schedule and sends email notifications when lots are within a configurable number of days of expiration, so the warehouse team can remove near-expired lots before they become unusable. Recall traceability is supported by a saved search that shows every transaction linked to a specific lot number across receipts, fulfillments, returns, and adjustments. SuitePacific builds these for medical device and pharma companies on NetSuite. Plans start at $799 per month.</p>
</div>

## What is the difference between FEFO and FIFO lot picking?

First-in-first-out (FIFO) lot picking selects the oldest inventory by receipt date: the lot received first is the first to ship. First-expired-first-out (FEFO) lot picking selects by expiration date: the lot expiring soonest is the first to ship, regardless of when it was received.

For most products, FIFO and FEFO produce the same result because earlier-received lots typically have earlier expiration dates. The difference matters when:

| Scenario | FIFO picks | FEFO picks | Risk if FIFO is used |
|---|---|---|---|
| Two lots received same day, different expiry dates | Either lot (ambiguous) | Shorter-expiry lot first | Longer-expiry lot ships first; shorter expires in warehouse |
| Lot received late with short remaining shelf life | Older lot first | Short-expiry lot first | Short-expiry lot ages further before shipping |
| Customer requests minimum remaining shelf life | Ignores expiry | Enforces expiry threshold | Customer returns product for insufficient shelf life |
| Supplier-mandated lot sequence requirements | Receipt order | Expiry date order | Non-compliance with supplier or customer requirements |

NetSuite's native Advanced Inventory Management supports FIFO as a costing method but does not natively enforce FEFO at the picking stage. FEFO picking requires a SuiteScript that reads the expiration dates of available lots for the item, sorts them by expiration date ascending, and allocates the quantity from the earliest-expiring lots first before using later-expiring lots.

## How does lot traceability work for recalls?

A lot traceability report for a recall shows the forward trace (all customers who received units from the affected lot) and the backward trace (the supplier lot and receipt that brought the affected units into inventory). In NetSuite, the data for both directions exists in the transaction records linked to the lot number:

**Forward trace:** Item fulfillments that include the affected lot number, linked to the sales orders and customer records for those shipments. The report shows the customer, ship date, quantity shipped from the lot, and the customer's address and contact information for the recall notification.

**Backward trace:** The item receipt that introduced the lot into inventory, linked to the purchase order and vendor record for the supplier. If the item was manufactured internally, the backward trace shows the work order and the component lots used in the manufacturing run.

A saved search in NetSuite can retrieve both traces in a single query by joining the inventory detail records (which link lot numbers to transaction lines) to the transaction headers and then to the customer or vendor records. The output can be exported to a spreadsheet for the FDA field alert report or customer notification letters.

## What expiry alerts prevent quality failures?

Automated expiry alerts give the warehouse and quality teams advance notice before a lot reaches its expiration date, allowing them to either ship the product before expiry or quarantine and dispose of it in a controlled manner. Effective alert configuration typically includes three notification thresholds:

**90-day alert:** For products with a 12-month or longer shelf life, a 90-day advance alert gives sufficient time to prioritize the lot in picking or plan a controlled disposition. Notification goes to the inventory manager and the sales team so they can identify customers who could receive the lot before expiry.

**30-day alert:** A 30-day alert signals that the lot needs immediate action. If the product cannot be shipped in time, a quarantine workflow should be initiated to remove the lot from the available inventory pool and create a quality event record documenting the reason for disposition.

**At-expiry block:** A User Event script on item fulfillment that checks the expiration date of each lot being shipped and blocks the fulfillment from saving if any lot has already expired or falls below the customer's minimum remaining shelf life requirement.

These alerts require that expiration dates are accurately captured on every item receipt and that the lot records are kept current. If a lot's expiration date changes (for example, when a stability study extends the shelf life), the update must be applied to the lot record in NetSuite so that the alert thresholds recalculate correctly.

SuitePacific provides ongoing NetSuite support for medical device and pharmaceutical companies including lot tracking configuration, FEFO scripts, expiry alert builds, and recall traceability reporting. See [NetSuite healthcare support](/industries/healthcare) for the full engagement scope.

## Related reading

- [NetSuite healthcare support](/industries/healthcare): full overview of post-go-live support for medical device, pharma, and health tech companies
- [NetSuite SuiteScript development](/netsuite-suitescript-development): custom script builds for FEFO picking, expiry alerts, and lot traceability
- [NetSuite lot and serial tracking](/netsuite-lot-serial-tracking): lot and serial number configuration, bin management, and compliance reporting
- [NetSuite quality management](/netsuite-quality-management): CAPA workflows, non-conformance records, and audit trail configuration
