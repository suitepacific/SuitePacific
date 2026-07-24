---
title: "How to Start Order Fulfillment from the NetSuite Sales Order List"
description: "NetSuite 2026.2 lets you initiate item fulfillment directly from the sales order list without opening each individual order. Here is how to use it."
category: "Administration"
tags: ["Administration", "Order Management", "NetSuite Tips"]
publishedAt: "2026-07-21"
linkedinDay: 34
---

## What changed in 2026.2

Before 2026.2, starting fulfillment for a sales order required opening the order record first, then initiating the fulfillment action from inside the record.

From 2026.2, you can initiate fulfillment directly from the sales order list without opening each order individually.

<figure style="margin:1.75rem 0">
<svg viewBox="0 0 680 86" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;display:block;font-family:system-ui,-apple-system,sans-serif">
  <defs>
    <marker id="sof-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#4f6fb0"/></marker>
  </defs>
  <text x="340" y="13" text-anchor="middle" font-size="10" font-weight="700" fill="#14306b" letter-spacing="0.05em">FULFILLMENT FROM THE LIST — 4 STEPS (2026.2+)</text>
  <rect x="0" y="22" width="150" height="50" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="75" y="43" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">① Navigate</text>
  <text x="75" y="57" text-anchor="middle" font-size="8" fill="#4f6fb0">Transactions > Sales</text>
  <text x="75" y="68" text-anchor="middle" font-size="8" fill="#4f6fb0">List view</text>
  <line x1="150" y1="47" x2="168" y2="47" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#sof-arrow)"/>
  <rect x="170" y="22" width="150" height="50" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="245" y="43" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">② Locate</text>
  <text x="245" y="57" text-anchor="middle" font-size="8" fill="#4f6fb0">Find order at</text>
  <text x="245" y="68" text-anchor="middle" font-size="8" fill="#4f6fb0">Pending Fulfillment</text>
  <line x1="320" y1="47" x2="338" y2="47" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#sof-arrow)"/>
  <rect x="340" y="22" width="150" height="50" rx="7" fill="#eef2fb" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="415" y="43" text-anchor="middle" font-size="9.5" font-weight="700" fill="#14306b">③ Action</text>
  <text x="415" y="57" text-anchor="middle" font-size="8" fill="#4f6fb0">Fulfill from row</text>
  <text x="415" y="68" text-anchor="middle" font-size="8" fill="#4f6fb0">no record open needed</text>
  <line x1="490" y1="47" x2="508" y2="47" stroke="#4f6fb0" stroke-width="1.5" marker-end="url(#sof-arrow)"/>
  <rect x="510" y="22" width="170" height="50" rx="7" fill="#060f26" stroke="#4f7fff" stroke-width="1.5"/>
  <text x="595" y="43" text-anchor="middle" font-size="9.5" font-weight="700" fill="#eef2fb">④ Fulfillment</text>
  <text x="595" y="57" text-anchor="middle" font-size="8" fill="#8aa2d6">Standard Item Fulfillment</text>
  <text x="595" y="68" text-anchor="middle" font-size="8" fill="#8aa2d6">record created as usual</text>
</svg>
<figcaption style="text-align:center;font-size:0.78rem;color:#8aa2d6;margin-top:0.4rem">The fulfillment logic is unchanged. Only the starting point is new.</figcaption>
</figure>

## Step 1: Navigate to the sales order list

Go to **Transactions > Sales > Enter Sales Orders** and switch to the list view, or access the sales order list from your saved searches or dashboards.

## Step 2: Locate the order to fulfill

Find the sales order you want to fulfill. The order must be in a status that allows fulfillment (typically Pending Fulfillment).

## Step 3: Use the fulfillment action from the list

On the sales order list, use the fulfillment action available directly on the row or through the list's action menu. This initiates fulfillment without requiring you to open the sales order record.

## Step 4: Complete the fulfillment

Follow the standard fulfillment steps. The Item Fulfillment record is created the same way as before. Inventory is committed and decremented using the same logic. Nothing about the fulfillment process itself has changed, only the starting point.

## What stays the same

- Item Fulfillment records are created identically to before
- Inventory commitment and decrement logic is unchanged
- Existing fulfillment workflows and SuiteScript still apply
- All fulfillment rules and order requirements still apply

## Who benefits most

This change is most useful for warehouse and operations teams that fulfill a high volume of orders in sequence. Removing the extra navigation step reduces page loads per order, which adds up across a full shift of order processing.

If your fulfillment process is automated through scripts or workflow, or if you process a small number of orders, the impact is minimal.

The feature is available as of NetSuite 2026.2. If you do not see the list-level fulfillment action, confirm that your account is on the 2026.2 release and that your role has the correct fulfillment permissions.

For background on this change, see [NetSuite 2026.2: Start Order Fulfillment Directly from the Sales Order List](/blog/netsuite-sales-order-fulfillment-list).
