---
title: "NetSuite Saved Search vs SuiteAnalytics Workbook: Which One to Use"
description: "Saved Searches and SuiteAnalytics Workbook may look similar, but they are built for different jobs. Using the wrong one leads to slow reports and frustrated users. Learn the distinction and how to choose."
category: "Saved Searches"
tags: ["Saved Searches", "SuiteAnalytics", "Reporting", "Performance"]
publishedAt: "2026-07-05"
linkedinDay: 5
---

## Two reporting tools with different purposes

NetSuite offers two primary reporting tools that can produce similar-looking output: Saved Searches and SuiteAnalytics Workbook. The difference is not just in the interface — they query different data sources and are optimized for different types of work.

Using the wrong one is one of the most common causes of slow month-end reporting, inconsistent numbers, and user frustration with NetSuite's reporting capabilities.

## Saved Search: built for operational data

A Saved Search queries NetSuite's operational (transactional) data — the live database that records are written to and read from in real time.

This makes Saved Searches the right tool for:
- **Day-to-day operations** — open orders, pending approvals, items below reorder point, overdue invoices
- **Dashboard portlets and KPIs** — current metrics that need to reflect live data
- **Workflow triggers and alerts** — conditions evaluated in real time as records are saved
- **Operational automation** — searches used by scripts to find records to process

The defining characteristic is that Saved Searches return live data. When you run a search for open sales orders, it reflects the exact state of the database at that moment.

## SuiteAnalytics Workbook: built for analytical reporting

SuiteAnalytics Workbook uses a separate analytical data source designed for reporting and analysis. It is not querying the same live operational database that Saved Searches use — it is optimized for the types of queries that operational databases handle poorly: large result sets, period comparisons, trend analysis, and complex aggregations.

SuiteAnalytics Workbook is the right tool for:
- **Financial reporting** — income statements, balance sheets, period-over-period comparisons
- **Management reports** — summaries across large datasets that span months or years
- **Trend analysis** — comparing performance across multiple periods
- **Pivot tables and interactive reports** — cross-dimensional analysis of large volumes of data
- **Year-to-date and multi-period summaries** — reports that aggregate across wide date ranges

## Where the confusion happens

The two tools can produce similar output for simple cases, which makes the distinction less obvious until you hit a scenario where the difference matters.

The clearest signal is month-end and year-end reporting. When finance needs a revenue summary for the quarter, a comparison of this year versus last year, or a cost analysis across all subsidiaries — these are analytical queries running against large datasets. A Saved Search attempting to do this work will be slow and may time out. The query pattern does not match what Saved Searches were designed for.

Similarly, if a Saved Search is consistently slow — taking more than a few seconds to run, timing out under normal conditions, or causing complaints from users who run it regularly — rebuilding it as a Workbook is one of the first things to try. The performance difference on the right query type can be significant.

## The license consideration

SuiteAnalytics Workbook is not available to every NetSuite customer by default — it requires the SuiteAnalytics module to be included in your NetSuite license. If you navigate to Reports and do not see a Workbook option, confirm with your NetSuite account manager whether it is included in your subscription.

## The quick rule

**Need operational data?** → Saved Search
Use for real-time operations, dashboard KPIs, workflow triggers, alerts, and day-to-day monitoring.

**Need analytical reporting?** → SuiteAnalytics Workbook (if licensed)
Use for large datasets, period comparisons, trend analysis, management summaries, and financial reporting.

The clearest version of the rule: if a Saved Search keeps getting slower as your data grows, and the report covers a large date range or requires complex aggregation, it has probably outgrown what Saved Searches were designed to do.
