type MockScriptTemplate = {
  scriptType: string;
  sandbox: string;
  production: string;
};

const MOCK_SCRIPT_TEMPLATES: MockScriptTemplate[] = [
  {
    scriptType: "userevent",
    sandbox: `/**
 * Customer Auto-Assign User Event Script
 * Automatically assigns a sales rep to new customers
 * based on territory and company size.
 */
define(['N/record', 'N/search'], function(record, search) {

  function afterSubmit(context) {
    if (context.type !== context.UserEventType.CREATE) {
      return;
    }

    var customerId = context.newRecord.id;

    // Search all active sales reps
    var repSearch = search.create({
      type: 'employee',
      filters: [
        ['isinactive', 'is', 'F'],
        'AND',
        ['issalesrep', 'is', 'T']
      ],
      columns: ['internalid', 'entityid', 'custentity_territory']
    });

    var results = repSearch.run().getRange({ start: 0, end: 100 });

    if (!results || results.length === 0) {
      return;
    }

    // Assign first available rep
    var assignedRep = results[0].getValue({ name: 'internalid' });

    record.submitFields({
      type: record.Type.CUSTOMER,
      id: customerId,
      values: { salesrep: assignedRep }
    });
  }

  return {
    afterSubmit: afterSubmit
  };

});`,
    production: `/**
 * Customer Auto-Assign User Event Script
 * Automatically assigns a sales rep to new customers
 * based on territory and company size.
 */
define(['N/record', 'N/search', 'N/log'], function(record, search, log) {

  var SAVED_SEARCH_ID = 'customsearch_active_sales_reps';

  function afterSubmit(context) {
    if (context.type !== context.UserEventType.CREATE) {
      return;
    }

    var customerId = context.newRecord.id;
    var territory = context.newRecord.getValue({ fieldId: 'custentity_territory' });

    log.debug({
      title: 'Customer Auto-Assign',
      details: 'Processing customer ' + customerId + ', territory: ' + territory
    });

    // Use saved search for governance efficiency
    var repSearch = search.load({ id: SAVED_SEARCH_ID });

    if (territory) {
      repSearch.filters.push(
        search.createFilter({
          name: 'custentity_territory',
          operator: search.Operator.IS,
          values: territory
        })
      );
    }

    var results = repSearch.run().getRange({ start: 0, end: 10 });

    if (!results || results.length === 0) {
      log.audit({ title: 'Customer Auto-Assign', details: 'No reps found for territory: ' + territory });
      return;
    }

    var assignedRep = results[0].getValue({ name: 'internalid' });

    record.submitFields({
      type: record.Type.CUSTOMER,
      id: customerId,
      values: { salesrep: assignedRep }
    });

    log.audit({
      title: 'Customer Auto-Assign',
      details: 'Assigned rep ' + assignedRep + ' to customer ' + customerId
    });
  }

  return {
    afterSubmit: afterSubmit
  };

});`,
  },
  {
    scriptType: "scheduled",
    sandbox: `/**
 * Invoice Email Sender — Scheduled Script
 * Sends overdue invoice reminders to customers.
 */
define(['N/search', 'N/email', 'N/runtime'], function(search, email, runtime) {

  function execute(context) {
    var overdueSearch = search.load({ id: 'customsearch_overdue_invoices' });
    var results = overdueSearch.run().getRange({ start: 0, end: 1000 });

    results.forEach(function(result) {
      var customerId = result.getValue({ name: 'entity' });
      var invoiceId  = result.id;
      var amount     = result.getValue({ name: 'amountremaining' });

      email.send({
        author: runtime.getCurrentUser().id,
        recipients: [customerId],
        subject: 'Invoice Overdue — Action Required',
        body: 'Your invoice #' + invoiceId + ' for $' + amount + ' is overdue. Please remit payment.'
      });
    });
  }

  return { execute: execute };

});`,
    production: `/**
 * Invoice Email Sender — Scheduled Script
 * Sends overdue invoice reminders to customers.
 * Batched to stay within governance limits.
 */
define(['N/search', 'N/email', 'N/runtime', 'N/log'], function(search, email, runtime, log) {

  var BATCH_SIZE = 50;
  var TEMPLATE_ID = 123;

  function execute(context) {
    var overdueSearch = search.load({ id: 'customsearch_overdue_invoices' });
    var pagedData = overdueSearch.runPaged({ pageSize: BATCH_SIZE });

    log.audit({
      title: 'Invoice Email Sender',
      details: 'Processing ' + pagedData.count + ' overdue invoices across ' + pagedData.pageRanges.length + ' pages'
    });

    pagedData.pageRanges.forEach(function(pageRange) {
      var page = pagedData.fetch({ index: pageRange.index });

      page.data.forEach(function(result) {
        var customerId = result.getValue({ name: 'entity' });
        var invoiceId  = result.id;
        var amount     = result.getValue({ name: 'amountremaining' });
        var daysOverdue = result.getValue({ name: 'daysoverdue' });

        try {
          email.sendBulk({
            author: runtime.getCurrentUser().id,
            recipients: [customerId],
            subject: 'Invoice Overdue (' + daysOverdue + ' days) — Action Required',
            body: 'Your invoice #' + invoiceId + ' for $' + amount + ' is ' + daysOverdue + ' days overdue.',
            templateId: TEMPLATE_ID,
            relatedTransactionId: invoiceId
          });
        } catch (e) {
          log.error({ title: 'Email failed for invoice ' + invoiceId, details: e.message });
        }
      });
    });
  }

  return { execute: execute };

});`,
  },
  {
    scriptType: "mapreduce",
    sandbox: `/**
 * Sales Order Approval — Map/Reduce Script
 * Routes high-value sales orders to the approval queue.
 */
define(['N/search', 'N/record', 'N/log'], function(search, record, log) {

  function getInputData() {
    return search.load({ id: 'customsearch_pending_so_approval' });
  }

  function map(context) {
    var soId = context.key;
    var so   = JSON.parse(context.value);

    var totalAmount = parseFloat(so.values.amount) || 0;

    context.write({
      key: soId,
      value: { amount: totalAmount, customerId: so.values.entity.value }
    });
  }

  function summarize(summary) {
    summary.mapSummary.errors.iterator().each(function(key, error) {
      log.error({ title: 'Map error for SO ' + key, details: error });
      return true;
    });

    log.audit({ title: 'SO Approval', details: 'Completed. Input: ' + summary.inputSummary.objectCount });
  }

  return {
    getInputData: getInputData,
    map: map,
    summarize: summarize
  };

});`,
    production: `/**
 * Sales Order Approval — Map/Reduce Script
 * Routes high-value sales orders to the approval queue.
 * Reduce stage added to handle concurrent approval routing.
 */
define(['N/search', 'N/record', 'N/workflow', 'N/log'], function(search, record, workflow, log) {

  var APPROVAL_THRESHOLD = 10000;
  var APPROVAL_WORKFLOW_ID = 'customworkflow_so_high_value_approval';

  function getInputData() {
    return search.load({ id: 'customsearch_pending_so_approval' });
  }

  function map(context) {
    var soId = context.key;
    var so   = JSON.parse(context.value);
    var totalAmount = parseFloat(so.values.amount) || 0;

    if (totalAmount >= APPROVAL_THRESHOLD) {
      context.write({
        key: soId,
        value: { amount: totalAmount, customerId: so.values.entity.value }
      });
    }
  }

  function reduce(context) {
    var soId = context.key;
    var data = JSON.parse(context.values[0]);

    try {
      workflow.trigger({
        type: record.Type.SALES_ORDER,
        id: soId,
        workflowId: APPROVAL_WORKFLOW_ID,
        params: { custworkflow_amount: data.amount }
      });

      log.audit({ title: 'Approval triggered', details: 'SO ' + soId + ' — $' + data.amount });
    } catch (e) {
      log.error({ title: 'Workflow trigger failed for SO ' + soId, details: e.message });
    }
  }

  function summarize(summary) {
    summary.mapSummary.errors.iterator().each(function(key, error) {
      log.error({ title: 'Map error for SO ' + key, details: error });
      return true;
    });
    summary.reduceSummary.errors.iterator().each(function(key, error) {
      log.error({ title: 'Reduce error for SO ' + key, details: error });
      return true;
    });
    log.audit({ title: 'SO Approval Complete', details: 'Processed ' + summary.inputSummary.objectCount + ' orders' });
  }

  return {
    getInputData: getInputData,
    map: map,
    reduce: reduce,
    summarize: summarize
  };

});`,
  },
  {
    scriptType: "restlet",
    sandbox: `/**
 * Product Sync RESTlet
 * Accepts product updates from external e-commerce platform.
 */
define(['N/record', 'N/search', 'N/log'], function(record, search, log) {

  function post(requestBody) {
    var items = requestBody.items;

    if (!items || !Array.isArray(items)) {
      return { error: 'Invalid request: items array required' };
    }

    var results = [];

    items.forEach(function(item) {
      var sku  = item.sku;
      var qty  = item.quantity;
      var price = item.price;

      var existingItem = search.lookupFields({
        type: search.Type.INVENTORY_ITEM,
        id: sku,
        columns: ['internalid', 'itemid']
      });

      if (existingItem && existingItem.internalid) {
        record.submitFields({
          type: record.Type.INVENTORY_ITEM,
          id: existingItem.internalid,
          values: { salesprice: price, quantityonhand: qty }
        });
        results.push({ sku: sku, status: 'updated' });
      } else {
        results.push({ sku: sku, status: 'not_found' });
      }
    });

    return { success: true, results: results };
  }

  return { post: post };

});`,
    production: `/**
 * Product Sync RESTlet
 * Accepts product updates from external e-commerce platform.
 * Added token validation and field-level change detection.
 */
define(['N/record', 'N/search', 'N/runtime', 'N/log'], function(record, search, runtime, log) {

  var ALLOWED_INTEGRATION_IDS = ['12345', '67890'];

  function validateRequest(requestBody) {
    var integrationId = runtime.getCurrentUser().roleId;
    if (!ALLOWED_INTEGRATION_IDS.includes(String(integrationId))) {
      throw new Error('Unauthorized: integration not permitted');
    }
    if (!requestBody || !Array.isArray(requestBody.items)) {
      throw new Error('Invalid request body: items array required');
    }
    if (requestBody.items.length > 200) {
      throw new Error('Batch size exceeds limit of 200 items');
    }
  }

  function post(requestBody) {
    try {
      validateRequest(requestBody);
    } catch (e) {
      log.error({ title: 'Product Sync RESTlet — Auth/Validation', details: e.message });
      return { error: e.message, code: 400 };
    }

    var results = [];

    requestBody.items.forEach(function(item) {
      var sku   = item.sku;
      var qty   = item.quantity;
      var price = item.price;

      var existingSearch = search.create({
        type: search.Type.INVENTORY_ITEM,
        filters: [['itemid', 'is', sku]],
        columns: ['internalid', 'salesprice', 'quantityonhand']
      }).run().getRange({ start: 0, end: 1 });

      if (existingSearch.length > 0) {
        var existingId    = existingSearch[0].getValue({ name: 'internalid' });
        var existingPrice = parseFloat(existingSearch[0].getValue({ name: 'salesprice' }));

        var updates = {};
        if (price !== existingPrice) updates.salesprice = price;
        if (qty !== undefined)       updates.quantityonhand = qty;

        if (Object.keys(updates).length > 0) {
          record.submitFields({ type: record.Type.INVENTORY_ITEM, id: existingId, values: updates });
          results.push({ sku: sku, status: 'updated', changed: Object.keys(updates) });
        } else {
          results.push({ sku: sku, status: 'no_change' });
        }
      } else {
        results.push({ sku: sku, status: 'not_found' });
      }
    });

    log.audit({ title: 'Product Sync', details: results.length + ' items processed' });
    return { success: true, results: results };
  }

  return { post: post };

});`,
  },
  {
    scriptType: "suitelet",
    sandbox: `/**
 * Invoice PDF Helper — Suitelet
 * Generates a custom invoice PDF and returns it inline.
 */
define(['N/render', 'N/record', 'N/https'], function(render, record, https) {

  function onRequest(context) {
    if (context.request.method === https.Method.GET) {
      var invoiceId = context.request.parameters.id;

      var invoiceRecord = record.load({
        type: record.Type.INVOICE,
        id: invoiceId
      });

      var pdfFile = render.transaction({
        entityId: parseInt(invoiceId),
        printMode: render.PrintMode.PDF
      });

      context.response.setHeader({ name: 'Content-Type', value: 'application/pdf' });
      context.response.writeFile({ file: pdfFile });
    }
  }

  return { onRequest: onRequest };

});`,
    production: `/**
 * Invoice PDF Helper — Suitelet
 * Generates a custom invoice PDF and returns it inline.
 * Added template selection, error handling, and access control.
 */
define(['N/render', 'N/record', 'N/https', 'N/runtime', 'N/log'], function(render, record, https, runtime, log) {

  var DEFAULT_TEMPLATE_ID = 456;
  var ALLOWED_ROLES = [3, 14, 1031];

  function onRequest(context) {
    if (context.request.method !== https.Method.GET) {
      context.response.setHeader({ name: 'Content-Type', value: 'text/plain' });
      context.response.write('Method not allowed');
      return;
    }

    var currentUser = runtime.getCurrentUser();
    if (!ALLOWED_ROLES.includes(currentUser.role)) {
      context.response.setHeader({ name: 'Content-Type', value: 'text/plain' });
      context.response.write('Access denied');
      return;
    }

    var invoiceId  = context.request.parameters.id;
    var templateId = context.request.parameters.template || DEFAULT_TEMPLATE_ID;

    if (!invoiceId) {
      context.response.setHeader({ name: 'Content-Type', value: 'text/plain' });
      context.response.write('Missing required parameter: id');
      return;
    }

    try {
      var renderer = render.create();
      renderer.setTemplateById({ id: parseInt(templateId) });
      renderer.addRecord({ templateName: 'record', record: record.load({
        type: record.Type.INVOICE,
        id: invoiceId
      })});

      var pdfFile = renderer.renderAsPdf();

      log.audit({
        title: 'Invoice PDF Generated',
        details: 'Invoice ' + invoiceId + ', template ' + templateId + ', user ' + currentUser.id
      });

      context.response.setHeader({ name: 'Content-Type', value: 'application/pdf' });
      context.response.setHeader({
        name: 'Content-Disposition',
        value: 'inline; filename="Invoice-' + invoiceId + '.pdf"'
      });
      context.response.writeFile({ file: pdfFile });

    } catch (e) {
      log.error({ title: 'PDF generation failed for invoice ' + invoiceId, details: e.message });
      context.response.setHeader({ name: 'Content-Type', value: 'text/plain' });
      context.response.write('Error generating PDF: ' + e.message);
    }
  }

  return { onRequest: onRequest };

});`,
  },
];

function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function inferScriptType(scriptId: string): string {
  const id = scriptId.toLowerCase();
  if (id.includes("userevent") || /_ue[_-]/.test(id) || id.endsWith("_ue")) return "userevent";
  if (id.includes("scheduled") || id.includes("_sched") || /_ss[_-]/.test(id) || id.endsWith("_ss")) return "scheduled";
  if (id.includes("mapreduce") || id.includes("map_reduce") || /_mr[_-]/.test(id) || id.endsWith("_mr")) return "mapreduce";
  if (id.includes("restlet") || /_rl[_-]/.test(id) || id.endsWith("_rl")) return "restlet";
  if (id.includes("clientscript") || id.includes("client_script") || /_cs[_-]/.test(id) || id.endsWith("_cs")) return "clientscript";
  if (id.includes("suitelet") || /_sl[_-]/.test(id) || id.endsWith("_sl")) return "suitelet";
  const types = ["userevent", "scheduled", "mapreduce", "restlet", "suitelet"];
  return types[djb2(scriptId) % types.length];
}

export function inferScriptName(scriptId: string): string {
  return scriptId
    .replace(/^customscript[_-]?/i, "")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getMockContent(scriptId: string, envType: string): string {
  const idx = djb2(scriptId) % MOCK_SCRIPT_TEMPLATES.length;
  const template = MOCK_SCRIPT_TEMPLATES[idx];
  return envType === "production" ? template.production : template.sandbox;
}
