---
title: "NetSuite SOAP Web Services Are Being Retired: What You Need to Know"
description: "Oracle has announced a phased retirement of NetSuite SOAP Web Services, with full removal in 2028.2. If your business runs integrations built on the SOAP API, here is what the timeline means and what to do before the deadlines hit."
date: "2026-08-24"
updated: "2026-08-26"
tags: ["Integrations", "SuiteTalk", "REST API", "Development"]
---

Oracle has announced that NetSuite SOAP Web Services are being phased out, with full removal scheduled for NetSuite 2028.2. If your business uses any integrations built on the SOAP API, whether through a third-party platform or custom-built SuiteTalk code, you have a defined window to migrate before those integrations stop working.

<div style="background:#eef2fb;border:1px solid #b2c2e6;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:system-ui,-apple-system,sans-serif">
<p style="margin:0 0 0.5rem;font-size:0.7rem;font-weight:700;color:#4f7fff;text-transform:uppercase;letter-spacing:0.08em">Quick answer</p>
<p style="margin:0;color:#14306b;font-size:0.9rem;line-height:1.6">NetSuite SOAP Web Services will be fully removed in the 2028.2 release. Oracle is retiring them in four stages: after 2027.1, no new SOAP integrations can be created; after 2027.2, only the 2025.2 SOAP endpoint remains active and all older WSDL versions stop working; 2028.1 disables additional legacy endpoints; and 2028.2 removes SOAP entirely. The replacement is NetSuite REST Web Services, which launched in 2020.1 and has expanded coverage with every release since. Most integration platforms including Celigo, Boomi, and MuleSoft have REST connectors for NetSuite. The 2027.2 milestone is the one that catches most businesses off guard: integrations pinned to a pre-2025.2 WSDL version will stop working at that point, not at final SOAP removal. Businesses should audit active SOAP integrations now, identify the WSDL version each references, and begin REST migration planning before 2027.1 to preserve the ability to test in parallel.</p>
</div>

This post covers the retirement timeline, what it affects, and how to approach the migration to REST.

## The Retirement Timeline

Oracle has outlined a phased approach to removing SOAP Web Services:

**2027.1:** New SOAP integrations can no longer be created. Existing integrations continue to function, but no new SOAP-based connections can be built from this point forward.

**2027.2:** Only the final 2025.2 SOAP endpoint remains supported. Any integration pinned to an older WSDL version, such as 2019.1, 2021.2, or earlier, will stop working at this milestone.

**2028.1:** Additional older SOAP endpoints are disabled.

**2028.2:** SOAP is removed completely. All remaining SOAP integrations stop working.

The 2027.2 milestone is the one that will catch most businesses off guard. Many long-running integrations are pinned to older endpoint versions and never updated as part of normal maintenance. If your integration references a WSDL version older than 2025.2, it will break at 2027.2, not 2028.2.

## What Is the SOAP API and Who Uses It?

NetSuite's SOAP Web Services, also known as SuiteTalk, have been the primary integration API for NetSuite since the mid-2000s. The SOAP API uses a WSDL-based XML protocol and supports operations across most NetSuite record types: customers, vendors, transactions, items, custom records, and more.

Businesses that commonly rely on SOAP-based connections include:

- Companies using older Celigo, Boomi, MuleSoft, or Dell Boomi recipes or flows built on the NetSuite SOAP connector
- Businesses with custom .NET, Java, or PHP integrations written against the SuiteTalk WSDL
- Third-party software vendors whose NetSuite connector was built before REST Web Services became available in 2020.1
- Companies using saved search or search operations via SOAP that have never been migrated

If your integration was built before 2021 and has not been updated since, there is a high probability it is using the SOAP API.

## What Replaces SOAP: REST Web Services

NetSuite REST Web Services launched in 2020.1 and has been expanding its record coverage with each release. The REST API uses JSON, standard HTTP methods, and OAuth 2.0 for authentication.

For most integration use cases, REST Web Services supports the same operations the SOAP API does:

- Create, read, update, delete operations on standard and custom records
- SuiteQL for running structured queries against NetSuite data
- Upsert operations for insert-or-update patterns
- Sublist access on transaction records

The main area where REST coverage is still catching up is certain search and reporting operations that have been available via SOAP for years. For complex saved search-based integrations, SuiteQL through the REST API is typically the right approach, though it requires more query design than the equivalent SOAP search operation.

## How to Assess Your Exposure

Before planning a migration, you need to understand what you are dealing with. The key questions are:

**What integrations are running?** Work with your IT team or NetSuite administrator to list every active integration. Check the Integration records in NetSuite under Setup > Integration > Manage Integrations for any connections using Token-Based Authentication with SOAP.

**What WSDL version are they using?** SOAP integrations reference a specific endpoint version in their connection URL, for example `webservices.netsuite.com/services/NetSuitePort_2021_1`. Any version older than 2025.2 will stop working at the 2027.2 milestone.

**Who built the integration?** If it was a third-party platform like Celigo or Boomi, check with that vendor for their REST migration roadmap. If it was custom-built, the migration will need to be scoped and executed by a SuiteScript or integration developer.

**How complex is it?** A simple integration that creates customer records or pulls invoice data is a straightforward REST migration. An integration that runs complex saved searches, processes large data volumes with custom error handling, or connects to multiple subsidiaries will take more planning.

## What to Do Now

The 2027.1 cutoff, when no new SOAP integrations can be created, is the practical deadline for planning. If you start a migration after 2027.1, you cannot build a test environment using SOAP while you develop the REST replacement. You will be working directly against the live connection.

The sensible approach is to treat the 2027.1 milestone as your completion target, not your start date. That gives you until early 2027 to have all existing SOAP integrations replaced and running on REST.

Steps to take now:

1. Audit your active integrations and document which ones use SOAP
2. Identify the WSDL version each integration references
3. Prioritize by risk: anything on a pre-2025.2 endpoint is highest priority
4. Engage your integration vendor or developer to scope the REST migration
5. Plan sandbox testing before switching production connections

A SOAP-to-REST migration for a straightforward integration typically takes two to four weeks including testing. A complex integration with multiple record types, error handling, and reconciliation logic can take longer. Starting early gives you time to handle those cases without pressure.

## The Bigger Picture

The retirement of SOAP Web Services is part of a broader shift in how NetSuite handles external connectivity. The REST API is where Oracle is investing ongoing development, and it will continue to expand its record and operation coverage with each release. Staying on SOAP means working with an API that will receive no further improvements and has a fixed end date.

For businesses with legacy integrations that have worked reliably for years, the instinct is often to leave them alone until something breaks. In this case, the break is scheduled and the timeline is public. The earlier you start, the more time you have to plan and test rather than respond.

---

**Running SOAP-based integrations with NetSuite and not sure where to start?** SuitePacific works with businesses on NetSuite integration reviews and REST migrations. We can help you identify what is running, what needs to change, and how to sequence the work. [Get in touch](/contact).
