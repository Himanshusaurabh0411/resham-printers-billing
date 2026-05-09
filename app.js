const STORAGE_KEY = "resham-printers-ledger-v1";

const DEFAULT_STATE = {
  business: {
    name: "Resham Printers",
    address: "Add shop address here",
    phone: "",
    email: "",
    gstin: "",
    upi: "",
    bank: "",
    defaultTax: 18,
    invoicePrefix: "RP",
    logo: ""
  },
  cloud: {
    endpoint: "",
    token: "",
    lastSync: ""
  },
  invoiceCounter: 0,
  invoices: [],
  parties: [],
  items: [],
  transactions: [],
  paymentMethods: ["Cash", "UPI", "Bank transfer", "Cheque", "Card"]
};

const SERVICE_PRESETS = [
  { description: "Visiting cards printing", hsn: "9989", unit: "job", qty: 1, rate: 750, tax: 18 },
  { description: "Flex banner printing", hsn: "4911", unit: "sq.ft", qty: 1, rate: 120, tax: 18 },
  { description: "Letterhead printing", hsn: "4821", unit: "ream", qty: 1, rate: 850, tax: 18 },
  { description: "Sticker printing", hsn: "3919", unit: "job", qty: 1, rate: 450, tax: 18 },
  { description: "Photocopy / Xerox", hsn: "9989", unit: "pcs", qty: 100, rate: 2, tax: 18 },
  { description: "Designing charges", hsn: "9983", unit: "job", qty: 1, rate: 300, tax: 18 }
];

const ICONS = {
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2H5z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M16 11h6v6h-6a3 3 0 0 1 0-6z"/><path d="M18 14h.01"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-7"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 0 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.22.4.56.74 1 .95.32.15.68.23 1.04.23H21a2 2 0 0 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
  printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/><path d="M18 12h.01"/></svg>',
  rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H7a5 5 0 1 1 1.1-9.88A7 7 0 0 1 21 13a4 4 0 0 1-3.5 6z"/></svg>'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

let state = loadState();
let currentView = "dashboard";
let editingInvoiceId = null;
let invoiceItems = [createBlankItem()];
let toastTimer = null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function seedItems() {
  return SERVICE_PRESETS.map((service, index) => ({
    id: `preset-item-${index + 1}`,
    name: service.description,
    hsn: service.hsn,
    unit: service.unit,
    rate: service.rate,
    tax: service.tax
  }));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") {
      return { ...clone(DEFAULT_STATE), items: seedItems() };
    }
    return {
      ...clone(DEFAULT_STATE),
      ...saved,
      business: { ...clone(DEFAULT_STATE.business), ...(saved.business || {}) },
      cloud: { ...clone(DEFAULT_STATE.cloud), ...(saved.cloud || {}) },
      invoices: Array.isArray(saved.invoices) ? saved.invoices : [],
      parties: Array.isArray(saved.parties) ? saved.parties : [],
      items: Array.isArray(saved.items) ? saved.items : seedItems(),
      transactions: Array.isArray(saved.transactions) ? saved.transactions : [],
      paymentMethods: Array.isArray(saved.paymentMethods) ? saved.paymentMethods : clone(DEFAULT_STATE.paymentMethods)
    };
  } catch (error) {
    console.warn("Could not load saved data", error);
    return { ...clone(DEFAULT_STATE), items: seedItems() };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function currentMonthISO() {
  return new Date().toISOString().slice(0, 7);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatMonth(value) {
  if (!value) return "";
  const date = new Date(`${value}-01T00:00:00`);
  return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function monthKey(dateValue) {
  return String(dateValue || "").slice(0, 7);
}

function money(value) {
  const amount = Number(value || 0);
  return `Rs. ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function numberValue(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nl2br(value) {
  return escapeHtml(value).replaceAll("\n", "<br>");
}

function createBlankItem(overrides = {}) {
  return {
    description: "",
    hsn: "",
    unit: "job",
    qty: 1,
    rate: 0,
    tax: numberValue(state?.business?.defaultTax ?? DEFAULT_STATE.business.defaultTax),
    ...overrides
  };
}

function calculateInvoice(invoice) {
  const items = (invoice.items || []).map((item) => ({
    description: item.description || "",
    hsn: item.hsn || "",
    unit: item.unit || "job",
    qty: Math.max(0, numberValue(item.qty)),
    rate: Math.max(0, numberValue(item.rate)),
    tax: Math.max(0, numberValue(item.tax))
  }));
  const taxable = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const tax = invoice.billType === "gst"
    ? items.reduce((sum, item) => sum + (item.qty * item.rate * item.tax) / 100, 0)
    : 0;
  const discount = Math.min(Math.max(0, numberValue(invoice.discount)), taxable + tax);
  const total = Math.max(0, taxable + tax - discount);
  const rawPaid = invoice.billType === "estimate" ? 0 : Math.max(0, numberValue(invoice.paid));
  const paid = Math.min(rawPaid, total);
  const due = Math.max(0, total - paid);
  const status = invoice.billType === "estimate"
    ? "estimate"
    : due <= 0.009
      ? "paid"
      : paid > 0
        ? "partial"
        : "due";

  return { items, taxable, tax, discount, total, paid, due, status };
}

function invoiceTitle(type) {
  if (type === "gst") return "Tax Invoice";
  if (type === "estimate") return "Estimate";
  return "Bill";
}

function invoiceNumberPreview() {
  const prefix = state.business.invoicePrefix || "RP";
  return `${prefix}-${String(state.invoiceCounter + 1).padStart(4, "0")}`;
}

function invoiceNumberForNew() {
  return invoiceNumberPreview();
}

function allMoneyEntries() {
  const invoiceEntries = state.invoices
    .map((invoice) => ({ invoice, calc: calculateInvoice(invoice) }))
    .filter(({ invoice, calc }) => invoice.billType !== "estimate" && calc.paid > 0)
    .map(({ invoice, calc }) => ({
      id: `payment-${invoice.id}`,
      type: "income",
      date: invoice.date,
      party: invoice.customerName || "Customer",
      category: "Invoice payment",
      amount: calc.paid,
      method: invoice.paymentMethod || "Cash",
      note: invoice.number,
      origin: "invoice",
      invoiceId: invoice.id
    }));

  const manualEntries = state.transactions.map((entry) => ({
    ...entry,
    amount: numberValue(entry.amount),
    origin: "manual"
  }));

  return [...invoiceEntries, ...manualEntries].sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function statsForMonth(month = currentMonthISO()) {
  const invoices = state.invoices.filter((invoice) => invoice.billType !== "estimate" && monthKey(invoice.date) === month);
  const invoiceCalcs = invoices.map((invoice) => calculateInvoice(invoice));
  const entries = allMoneyEntries().filter((entry) => monthKey(entry.date) === month);
  const moneyIn = entries.filter((entry) => entry.type === "income").reduce((sum, entry) => sum + numberValue(entry.amount), 0);
  const moneyOut = entries.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + numberValue(entry.amount), 0);
  const sales = invoiceCalcs.reduce((sum, calc) => sum + calc.total, 0);
  const pending = invoiceCalcs.reduce((sum, calc) => sum + calc.due, 0);

  return {
    invoices,
    entries,
    sales,
    moneyIn,
    moneyOut,
    pending,
    profit: moneyIn - moneyOut
  };
}

function globalStats() {
  const entries = allMoneyEntries();
  const moneyIn = entries.filter((entry) => entry.type === "income").reduce((sum, entry) => sum + numberValue(entry.amount), 0);
  const moneyOut = entries.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + numberValue(entry.amount), 0);
  const pending = state.invoices
    .filter((invoice) => invoice.billType !== "estimate")
    .reduce((sum, invoice) => sum + calculateInvoice(invoice).due, 0);
  const sales = state.invoices
    .filter((invoice) => invoice.billType !== "estimate")
    .reduce((sum, invoice) => sum + calculateInvoice(invoice).total, 0);

  return { moneyIn, moneyOut, pending, sales, balance: moneyIn - moneyOut };
}

function renderIcons(root = document) {
  $$("[data-icon]", root).forEach((node) => {
    const icon = node.dataset.icon;
    if (ICONS[icon]) {
      node.innerHTML = ICONS[icon];
    }
  });
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setView(view) {
  currentView = view;
  $$(".view").forEach((section) => section.classList.remove("active-view"));
  $(`#${view}View`)?.classList.add("active-view");
  $$(".nav-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  const labels = {
    dashboard: "Dashboard",
    billing: "Billing",
    masters: "Masters",
    money: "Money",
    ledger: "Ledger",
    reports: "Reports",
    settings: "Settings"
  };
  $("#viewTitle").textContent = labels[view] || "Dashboard";
  if (view === "settings") renderSettingsForm();
}

function renderBusinessShell() {
  $("#sideBusinessName").textContent = state.business.name || "Resham Printers";
  const logo = state.business.logo || "assets/resham-mark.svg";
  $("#sideLogo").src = logo;
  $("#storageLabel").textContent = state.cloud.endpoint ? "Cloud configured" : "Local browser";
  $("#storageDot").classList.toggle("online", Boolean(state.cloud.endpoint));
  $("#todayLabel").textContent = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function renderPaymentOptions() {
  const options = state.paymentMethods.map((method) => `<option value="${escapeHtml(method)}">${escapeHtml(method)}</option>`).join("");
  const invoiceMethod = $("#invoicePaymentMethod");
  const transactionMethod = $("#transactionMethod");
  const currentInvoice = invoiceMethod.value;
  const currentTransaction = transactionMethod.value;
  invoiceMethod.innerHTML = options;
  transactionMethod.innerHTML = options;
  invoiceMethod.value = state.paymentMethods.includes(currentInvoice) ? currentInvoice : state.paymentMethods[0];
  transactionMethod.value = state.paymentMethods.includes(currentTransaction) ? currentTransaction : state.paymentMethods[0];
}

function renderMasterOptions() {
  $("#partyOptions").innerHTML = state.parties
    .map((party) => `<option value="${escapeHtml(party.name)}"></option>`)
    .join("");
  $("#itemOptions").innerHTML = state.items
    .map((item) => `<option value="${escapeHtml(item.name)}"></option>`)
    .join("");
}

function renderDashboard() {
  const all = globalStats();
  const month = statsForMonth(currentMonthISO());
  $("#monthBadge").textContent = formatMonth(currentMonthISO());
  $("#metricGrid").innerHTML = [
    { label: "Money came in", value: money(all.moneyIn), sub: "Invoice payments + income" },
    { label: "Money went out", value: money(all.moneyOut), sub: "Expenses and purchases" },
    { label: "Cash balance", value: money(all.balance), sub: "Actual money movement" },
    { label: "Pending collection", value: money(all.pending), sub: "Customer dues" }
  ].map((metric) => `
    <article class="metric-card">
      <span class="eyebrow">${metric.label}</span>
      <strong>${metric.value}</strong>
      <span>${metric.sub}</span>
    </article>
  `).join("");

  const maxFlow = Math.max(month.moneyIn, month.moneyOut, month.pending, 1);
  $("#flowVisual").innerHTML = [
    { label: "In", value: month.moneyIn, type: "in" },
    { label: "Out", value: month.moneyOut, type: "out" },
    { label: "Due", value: month.pending, type: "due" }
  ].map((row) => `
    <div class="flow-row">
      <span>${row.label}</span>
      <div class="flow-track"><div class="flow-fill ${row.type}" style="width: ${(row.value / maxFlow) * 100}%"></div></div>
      <span class="flow-value">${money(row.value)}</span>
    </div>
  `).join("");

  renderPendingList();
  renderActivityTable("#activityTable", allMoneyEntries().slice(0, 8), false);
}

function renderPendingList() {
  const pending = state.invoices
    .filter((invoice) => invoice.billType !== "estimate")
    .map((invoice) => ({ invoice, calc: calculateInvoice(invoice) }))
    .filter(({ calc }) => calc.due > 0)
    .sort((a, b) => b.calc.due - a.calc.due)
    .slice(0, 6);

  const list = $("#pendingList");
  if (!pending.length) {
    list.innerHTML = emptyState("No pending customer payment yet.");
    return;
  }

  list.innerHTML = pending.map(({ invoice, calc }) => `
    <div class="list-card">
      <div class="list-card-header">
        <div>
          <strong>${escapeHtml(invoice.customerName || "Customer")}</strong>
          <small>${escapeHtml(invoice.number)} - ${formatDate(invoice.date)}</small>
        </div>
        <span class="pill due">${money(calc.due)}</span>
      </div>
    </div>
  `).join("");
}

function emptyState(message) {
  return `
    <div class="empty-state">
      <div>
        <img src="assets/resham-mark.svg" alt="">
        <strong>${escapeHtml(message)}</strong>
      </div>
    </div>
  `;
}

function renderServiceChips() {
  $("#serviceChips").innerHTML = SERVICE_PRESETS.map((service, index) => `
    <button class="chip" type="button" data-service-index="${index}">
      ${escapeHtml(service.description.replace(" printing", ""))}
    </button>
  `).join("");
}

function findPartyByName(name) {
  const normalized = String(name || "").trim().toLowerCase();
  return state.parties.find((party) => party.name.toLowerCase() === normalized);
}

function findItemByName(name) {
  const normalized = String(name || "").trim().toLowerCase();
  return state.items.find((item) => item.name.toLowerCase() === normalized);
}

function renderItemEditor() {
  const editor = $("#itemEditor");
  editor.innerHTML = invoiceItems.map((item, index) => `
    <div class="item-row" data-index="${index}">
      <label>
        <span>Description</span>
        <input type="text" list="itemOptions" data-field="description" value="${escapeHtml(item.description)}" placeholder="Item / service" required>
      </label>
      <label>
        <span>HSN/SAC</span>
        <input type="text" data-field="hsn" value="${escapeHtml(item.hsn || "")}">
      </label>
      <label>
        <span>Qty</span>
        <input type="number" data-field="qty" min="0" step="0.01" value="${escapeHtml(item.qty)}">
      </label>
      <label>
        <span>Unit</span>
        <input type="text" data-field="unit" value="${escapeHtml(item.unit || "job")}">
      </label>
      <label>
        <span>Rate</span>
        <input type="number" data-field="rate" min="0" step="0.01" value="${escapeHtml(item.rate)}">
      </label>
      <label>
        <span>Tax %</span>
        <input type="number" data-field="tax" min="0" step="0.01" value="${escapeHtml(item.tax)}">
      </label>
      <button class="danger-button" type="button" data-remove-item="${index}" aria-label="Remove item">
        <span data-icon="trash"></span>
      </button>
    </div>
  `).join("");
  renderIcons(editor);
  renderInvoiceSummary();
}

function currentInvoiceDraft() {
  return {
    id: editingInvoiceId || "draft",
    number: editingInvoiceId
      ? state.invoices.find((invoice) => invoice.id === editingInvoiceId)?.number || invoiceNumberPreview()
      : invoiceNumberPreview(),
    billType: $("#billType").value,
    date: $("#invoiceDate").value || todayISO(),
    customerName: $("#customerName").value.trim(),
    customerPhone: $("#customerPhone").value.trim(),
    customerAddress: $("#customerAddress").value.trim(),
    customerGstin: $("#customerGstin").value.trim(),
    paymentMethod: $("#invoicePaymentMethod").value,
    items: invoiceItems
      .map((item) => ({
        description: String(item.description || "").trim(),
        hsn: String(item.hsn || "").trim(),
        unit: String(item.unit || "job").trim() || "job",
        qty: numberValue(item.qty),
        rate: numberValue(item.rate),
        tax: numberValue(item.tax)
      }))
      .filter((item) => item.description),
    discount: numberValue($("#invoiceDiscount").value),
    paid: numberValue($("#invoicePaid").value),
    notes: $("#invoiceNotes").value.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function renderInvoiceSummary() {
  const draft = currentInvoiceDraft();
  const calc = calculateInvoice(draft);
  $("#invoiceSummary").innerHTML = `
    <div class="summary-row"><span>Subtotal</span><strong>${money(calc.taxable)}</strong></div>
    <div class="summary-row"><span>GST</span><strong>${money(calc.tax)}</strong></div>
    <div class="summary-row"><span>Discount</span><strong>${money(calc.discount)}</strong></div>
    <div class="summary-row summary-total"><span>Total</span><strong>${money(calc.total)}</strong></div>
    <div class="summary-row"><span>Pending</span><strong>${money(calc.due)}</strong></div>
  `;
}

function resetInvoiceForm() {
  editingInvoiceId = null;
  $("#billingFormTitle").textContent = "New invoice";
  $("#invoiceForm").reset();
  $("#billType").value = "gst";
  $("#invoiceDate").value = todayISO();
  $("#invoicePaymentMethod").value = state.paymentMethods[0] || "Cash";
  $("#invoiceDiscount").value = 0;
  $("#invoicePaid").value = 0;
  invoiceItems = [createBlankItem({ description: "Printing work", qty: 1, rate: 0 })];
  renderItemEditor();
}

function renderInvoiceList() {
  const search = $("#invoiceSearch").value.trim().toLowerCase();
  const invoices = state.invoices
    .map((invoice) => ({ invoice, calc: calculateInvoice(invoice) }))
    .filter(({ invoice }) => {
      const haystack = `${invoice.number} ${invoice.customerName} ${invoice.customerPhone} ${invoice.billType}`.toLowerCase();
      return !search || haystack.includes(search);
    })
    .sort((a, b) => `${b.invoice.date}${b.invoice.number}`.localeCompare(`${a.invoice.date}${a.invoice.number}`));

  const list = $("#invoiceList");
  if (!invoices.length) {
    list.innerHTML = emptyState("No bill saved yet. Create the first one.");
    return;
  }

  list.innerHTML = invoices.map(({ invoice, calc }) => `
    <div class="list-card">
      <div class="list-card-header">
        <div>
          <strong>${escapeHtml(invoice.customerName || "Customer")}</strong>
          <small>${escapeHtml(invoice.number)} - ${formatDate(invoice.date)} - ${invoiceTitle(invoice.billType)}</small>
        </div>
        <span class="pill ${calc.status}">${calc.status}</span>
      </div>
      <div class="summary-row">
        <span>Total ${money(calc.total)}</span>
        <strong>Due ${money(calc.due)}</strong>
      </div>
      <div class="list-actions">
        <button class="ghost-button small-button" type="button" data-invoice-edit="${invoice.id}">Edit</button>
        <button class="ghost-button small-button" type="button" data-invoice-print="${invoice.id}">
          <span data-icon="printer"></span>
          Print
        </button>
        <button class="ghost-button small-button" type="button" data-invoice-delete="${invoice.id}">
          <span data-icon="trash"></span>
          Delete
        </button>
      </div>
    </div>
  `).join("");
  renderIcons(list);
}

function collectInvoiceForSave() {
  const existing = editingInvoiceId ? state.invoices.find((invoice) => invoice.id === editingInvoiceId) : null;
  const draft = currentInvoiceDraft();
  const invoice = {
    ...draft,
    id: existing?.id || uid("invoice"),
    number: existing?.number || invoiceNumberForNew(),
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const calc = calculateInvoice(invoice);
  invoice.items = calc.items.filter((item) => item.description);
  invoice.paid = calc.paid;
  invoice.discount = calc.discount;
  return invoice;
}

function upsertPartyFromInvoice(invoice) {
  if (!invoice.customerName) return;
  const existing = findPartyByName(invoice.customerName);
  const partyData = {
    type: "customer",
    name: invoice.customerName,
    phone: invoice.customerPhone || "",
    gstin: invoice.customerGstin || "",
    address: invoice.customerAddress || "",
    opening: 0,
    updatedAt: new Date().toISOString()
  };
  if (existing) {
    state.parties = state.parties.map((party) => party.id === existing.id
      ? { ...party, ...partyData, id: party.id, createdAt: party.createdAt }
      : party);
  } else {
    state.parties.unshift({ ...partyData, id: uid("party"), createdAt: new Date().toISOString() });
  }
}

function upsertItemsFromInvoice(invoice) {
  (invoice.items || []).forEach((line) => {
    if (!line.description) return;
    const existing = findItemByName(line.description);
    const itemData = {
      name: line.description,
      hsn: line.hsn || "",
      unit: line.unit || "job",
      rate: numberValue(line.rate),
      tax: numberValue(line.tax),
      updatedAt: new Date().toISOString()
    };
    if (existing) {
      state.items = state.items.map((item) => item.id === existing.id
        ? { ...item, ...itemData, id: item.id, createdAt: item.createdAt }
        : item);
    } else {
      state.items.unshift({ ...itemData, id: uid("item"), createdAt: new Date().toISOString() });
    }
  });
}

function saveInvoice(event) {
  event.preventDefault();
  const invoice = collectInvoiceForSave();
  if (!invoice.customerName) {
    showToast("Please enter customer name.");
    return;
  }
  if (!invoice.items.length) {
    showToast("Please add at least one item.");
    return;
  }

  if (editingInvoiceId) {
    state.invoices = state.invoices.map((item) => item.id === editingInvoiceId ? invoice : item);
    showToast("Bill updated.");
  } else {
    state.invoices.unshift(invoice);
    state.invoiceCounter += 1;
    showToast("Bill saved.");
  }

  upsertPartyFromInvoice(invoice);
  upsertItemsFromInvoice(invoice);
  saveState();
  resetInvoiceForm();
  renderAll();
}

function loadInvoiceIntoForm(id) {
  const invoice = state.invoices.find((item) => item.id === id);
  if (!invoice) return;
  editingInvoiceId = id;
  $("#billingFormTitle").textContent = `Editing ${invoice.number}`;
  $("#billType").value = invoice.billType || "gst";
  $("#invoiceDate").value = invoice.date || todayISO();
  $("#customerName").value = invoice.customerName || "";
  $("#customerPhone").value = invoice.customerPhone || "";
  $("#customerAddress").value = invoice.customerAddress || "";
  $("#customerGstin").value = invoice.customerGstin || "";
  $("#invoicePaymentMethod").value = invoice.paymentMethod || state.paymentMethods[0];
  $("#invoiceDiscount").value = invoice.discount || 0;
  $("#invoicePaid").value = invoice.paid || 0;
  $("#invoiceNotes").value = invoice.notes || "";
  invoiceItems = (invoice.items || []).length ? clone(invoice.items) : [createBlankItem()];
  renderItemEditor();
  setView("billing");
  showToast(`Loaded ${invoice.number}.`);
}

function deleteInvoice(id) {
  const invoice = state.invoices.find((item) => item.id === id);
  if (!invoice) return;
  if (!window.confirm(`Delete ${invoice.number}?`)) return;
  state.invoices = state.invoices.filter((item) => item.id !== id);
  if (editingInvoiceId === id) resetInvoiceForm();
  saveState();
  renderAll();
  showToast("Bill deleted.");
}

function printInvoice(invoice) {
  $("#printArea").innerHTML = renderInvoicePrint(invoice);
  window.print();
}

function renderInvoicePrint(invoice) {
  const calc = calculateInvoice(invoice);
  const business = state.business;
  const logo = business.logo || "assets/resham-mark.svg";
  const title = invoiceTitle(invoice.billType);
  const showTax = invoice.billType === "gst";
  const colCount = showTax ? 9 : 7;
  const rows = calc.items.map((item, index) => {
    const amount = item.qty * item.rate;
    const taxAmount = showTax ? (amount * item.tax) / 100 : 0;
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(item.description)}</td>
        <td>${escapeHtml(item.hsn || "")}</td>
        <td class="num">${item.qty}</td>
        <td>${escapeHtml(item.unit || "")}</td>
        <td class="num">${money(item.rate)}</td>
        ${showTax ? `<td class="num">${item.tax}%</td><td class="num">${money(taxAmount)}</td>` : ""}
        <td class="num">${money(amount + taxAmount)}</td>
      </tr>
    `;
  }).join("");
  const taxSummary = showTax
    ? Array.from(calc.items.reduce((map, item) => {
      const rate = numberValue(item.tax);
      const taxable = item.qty * item.rate;
      const current = map.get(rate) || { rate, taxable: 0, tax: 0 };
      current.taxable += taxable;
      current.tax += (taxable * rate) / 100;
      map.set(rate, current);
      return map;
    }, new Map()).values())
    : [];

  return `
    <div class="print-document">
      <header class="print-header">
        <img class="print-logo" src="${escapeHtml(logo)}" alt="">
        <div>
          <h1>${escapeHtml(business.name || "Resham Printers")}</h1>
          <p>${nl2br(business.address || "")}</p>
          ${business.phone ? `<p>Phone: ${escapeHtml(business.phone)}</p>` : ""}
          ${business.email ? `<p>Email: ${escapeHtml(business.email)}</p>` : ""}
          ${business.gstin ? `<p>GSTIN: ${escapeHtml(business.gstin)}</p>` : ""}
        </div>
        <div class="print-title-box">
          <strong>${title}</strong>
          <span>No: ${escapeHtml(invoice.number || "DRAFT")}</span>
          <span>Date: ${formatDate(invoice.date)}</span>
        </div>
      </header>

      <section class="print-parties">
        <div class="print-box">
          <h2>Bill To</h2>
          <p><strong>${escapeHtml(invoice.customerName || "Customer")}</strong></p>
          ${invoice.customerPhone ? `<p>Phone: ${escapeHtml(invoice.customerPhone)}</p>` : ""}
          ${invoice.customerAddress ? `<p>${nl2br(invoice.customerAddress)}</p>` : ""}
          ${invoice.customerGstin ? `<p>GSTIN: ${escapeHtml(invoice.customerGstin)}</p>` : ""}
        </div>
        <div class="print-box">
          <h2>Payment Details</h2>
          <p>Method: ${escapeHtml(invoice.paymentMethod || "Cash")}</p>
          ${business.upi ? `<p>UPI: ${escapeHtml(business.upi)}</p>` : ""}
          ${business.bank ? `<p>${nl2br(business.bank)}</p>` : ""}
        </div>
      </section>

      <table class="print-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>HSN/SAC</th>
            <th class="num">Qty</th>
            <th>Unit</th>
            <th class="num">Rate</th>
            ${showTax ? `<th class="num">GST</th><th class="num">Tax</th>` : ""}
            <th class="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows || `<tr><td colspan="${colCount}">No item added</td></tr>`}
        </tbody>
      </table>

      <section class="print-totals">
        <div class="amount-words">
          <h2>Amount in words</h2>
          <p>${escapeHtml(numberToIndianWords(Math.round(calc.total)))} only</p>
          ${invoice.notes ? `<h2>Notes</h2><p>${nl2br(invoice.notes)}</p>` : ""}
          ${taxSummary.length ? `
            <h2>GST Summary</h2>
            ${taxSummary.map((row) => `<p>${row.rate}% on ${money(row.taxable)} = ${money(row.tax)}</p>`).join("")}
          ` : ""}
        </div>
        <div class="total-box">
          <h2>Summary</h2>
          <div class="total-line"><span>Subtotal</span><strong>${money(calc.taxable)}</strong></div>
          ${showTax ? `<div class="total-line"><span>CGST</span><strong>${money(calc.tax / 2)}</strong></div><div class="total-line"><span>SGST</span><strong>${money(calc.tax / 2)}</strong></div>` : ""}
          <div class="total-line"><span>Discount</span><strong>${money(calc.discount)}</strong></div>
          <div class="total-line grand"><span>Total</span><strong>${money(calc.total)}</strong></div>
          <div class="total-line"><span>Received</span><strong>${money(calc.paid)}</strong></div>
          <div class="total-line"><span>Balance</span><strong>${money(calc.due)}</strong></div>
        </div>
      </section>

      <footer class="print-footer">
        <div>
          <p>Thank you for your business.</p>
          <p>Goods once printed as approved design are not returnable unless agreed by ${escapeHtml(business.name || "Resham Printers")}.</p>
        </div>
        <div class="signature-box">Authorised Signatory</div>
      </footer>
    </div>
  `;
}

function numberToIndianWords(value) {
  const number = Math.floor(Math.max(0, Number(value) || 0));
  if (number === 0) return "Zero rupees";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function belowHundred(n) {
    if (n < 20) return ones[n];
    return `${tens[Math.floor(n / 10)]} ${ones[n % 10]}`.trim();
  }

  function belowThousand(n) {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    return `${hundred ? `${ones[hundred]} Hundred` : ""} ${rest ? belowHundred(rest) : ""}`.trim();
  }

  const parts = [
    [10000000, "Crore"],
    [100000, "Lakh"],
    [1000, "Thousand"],
    [1, ""]
  ];

  let remaining = number;
  const words = [];
  for (const [size, label] of parts) {
    const count = Math.floor(remaining / size);
    if (count) {
      words.push(`${belowThousand(count)} ${label}`.trim());
      remaining %= size;
    }
  }
  return `${words.join(" ")} rupees`;
}

function renderActivityTable(selector, entries, allowDelete) {
  const target = $(selector);
  if (!entries.length) {
    target.innerHTML = emptyState("No money entry yet.");
    return;
  }
  target.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Party</th>
          <th>Category</th>
          <th>Method</th>
          <th class="amount-cell">Amount</th>
          ${allowDelete ? "<th></th>" : ""}
        </tr>
      </thead>
      <tbody>
        ${entries.map((entry) => `
          <tr>
            <td>${formatDate(entry.date)}</td>
            <td><span class="pill ${entry.type}">${entry.type === "income" ? "In" : "Out"}</span></td>
            <td>
              <strong>${escapeHtml(entry.party || "-")}</strong>
              ${entry.note ? `<br><small>${escapeHtml(entry.note)}</small>` : ""}
            </td>
            <td>${escapeHtml(entry.category || "-")}</td>
            <td>${escapeHtml(entry.method || "-")}</td>
            <td class="amount-cell">${money(entry.amount)}</td>
            ${allowDelete ? `<td>${entry.origin === "manual" ? `<button class="icon-button" type="button" data-transaction-delete="${entry.id}" aria-label="Delete entry"><span data-icon="trash"></span></button>` : ""}</td>` : ""}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  renderIcons(target);
}

function renderTransactions() {
  const search = $("#transactionSearch").value.trim().toLowerCase();
  const entries = allMoneyEntries().filter((entry) => {
    const haystack = `${entry.party} ${entry.category} ${entry.method} ${entry.note}`.toLowerCase();
    return !search || haystack.includes(search);
  });
  renderActivityTable("#transactionTable", entries, true);
}

function saveTransaction(event) {
  event.preventDefault();
  const entry = {
    id: uid("entry"),
    type: $("#transactionType").value,
    date: $("#transactionDate").value || todayISO(),
    party: $("#transactionParty").value.trim(),
    category: $("#transactionCategory").value.trim() || ($("#transactionType").value === "income" ? "Other income" : "Expense"),
    amount: numberValue($("#transactionAmount").value),
    method: $("#transactionMethod").value,
    note: $("#transactionNote").value.trim(),
    createdAt: new Date().toISOString()
  };

  if (!entry.party || entry.amount <= 0) {
    showToast("Please enter party and amount.");
    return;
  }

  state.transactions.unshift(entry);
  saveState();
  $("#transactionForm").reset();
  $("#transactionDate").value = todayISO();
  $("#transactionMethod").value = state.paymentMethods[0];
  renderAll();
  showToast("Money entry saved.");
}

function deleteTransaction(id) {
  const entry = state.transactions.find((item) => item.id === id);
  if (!entry) return;
  if (!window.confirm("Delete this money entry?")) return;
  state.transactions = state.transactions.filter((item) => item.id !== id);
  saveState();
  renderAll();
  showToast("Entry deleted.");
}

function ledgerRows() {
  const map = new Map();
  state.parties.forEach((party) => {
    if (party.type === "supplier") return;
    const opening = numberValue(party.opening);
    map.set(party.name, {
      name: party.name,
      phone: party.phone || "",
      billed: Math.max(0, opening),
      paid: 0,
      due: Math.max(0, opening),
      lastDate: "",
      invoices: 0
    });
  });
  state.invoices
    .filter((invoice) => invoice.billType !== "estimate")
    .forEach((invoice) => {
      const name = invoice.customerName || "Customer";
      const current = map.get(name) || { name, phone: invoice.customerPhone || "", billed: 0, paid: 0, due: 0, lastDate: invoice.date, invoices: 0 };
      const calc = calculateInvoice(invoice);
      current.phone = current.phone || invoice.customerPhone || "";
      current.billed += calc.total;
      current.paid += calc.paid;
      current.due += calc.due;
      current.invoices += 1;
      current.lastDate = !current.lastDate || String(invoice.date) > String(current.lastDate) ? invoice.date : current.lastDate;
      map.set(name, current);
    });
  return Array.from(map.values()).sort((a, b) => b.due - a.due || a.name.localeCompare(b.name));
}

function renderLedger() {
  const rows = ledgerRows();
  const target = $("#ledgerTable");
  if (!rows.length) {
    target.innerHTML = emptyState("Customer ledger will appear after bills are saved.");
    return;
  }
  target.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Phone</th>
          <th>Invoices</th>
          <th>Last bill</th>
          <th class="amount-cell">Billed</th>
          <th class="amount-cell">Paid</th>
          <th class="amount-cell">Pending</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td><strong>${escapeHtml(row.name)}</strong></td>
            <td>${escapeHtml(row.phone || "-")}</td>
            <td>${row.invoices}</td>
            <td>${formatDate(row.lastDate)}</td>
            <td class="amount-cell">${money(row.billed)}</td>
            <td class="amount-cell">${money(row.paid)}</td>
            <td class="amount-cell">${money(row.due)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function resetPartyForm() {
  $("#partyForm").reset();
  $("#partyId").value = "";
  $("#partyType").value = "customer";
  $("#partyOpening").value = 0;
}

function resetItemMasterForm() {
  $("#itemMasterForm").reset();
  $("#itemMasterId").value = "";
  $("#itemMasterTax").value = state.business.defaultTax || 18;
  $("#itemMasterRate").value = 0;
}

function saveParty(event) {
  event.preventDefault();
  const existingId = $("#partyId").value;
  const party = {
    id: existingId || uid("party"),
    type: $("#partyType").value,
    name: $("#partyName").value.trim(),
    phone: $("#partyPhone").value.trim(),
    gstin: $("#partyGstin").value.trim(),
    address: $("#partyAddress").value.trim(),
    opening: numberValue($("#partyOpening").value),
    updatedAt: new Date().toISOString()
  };

  if (!party.name) {
    showToast("Please enter party name.");
    return;
  }

  const duplicate = state.parties.find((item) => item.name.toLowerCase() === party.name.toLowerCase() && item.id !== existingId);
  if (duplicate) {
    showToast("This party already exists.");
    return;
  }

  if (existingId) {
    state.parties = state.parties.map((item) => item.id === existingId ? party : item);
  } else {
    party.createdAt = new Date().toISOString();
    state.parties.unshift(party);
  }
  saveState();
  resetPartyForm();
  renderAll();
  showToast("Party master saved.");
}

function saveItemMaster(event) {
  event.preventDefault();
  const existingId = $("#itemMasterId").value;
  const item = {
    id: existingId || uid("item"),
    name: $("#itemMasterName").value.trim(),
    hsn: $("#itemMasterHsn").value.trim(),
    unit: $("#itemMasterUnit").value.trim() || "job",
    rate: numberValue($("#itemMasterRate").value),
    tax: numberValue($("#itemMasterTax").value),
    updatedAt: new Date().toISOString()
  };

  if (!item.name) {
    showToast("Please enter item name.");
    return;
  }

  const duplicate = state.items.find((master) => master.name.toLowerCase() === item.name.toLowerCase() && master.id !== existingId);
  if (duplicate) {
    showToast("This item already exists.");
    return;
  }

  if (existingId) {
    state.items = state.items.map((master) => master.id === existingId ? item : master);
  } else {
    item.createdAt = new Date().toISOString();
    state.items.unshift(item);
  }
  saveState();
  resetItemMasterForm();
  renderAll();
  showToast("Item master saved.");
}

function renderMasters() {
  const target = $("#masterTables");
  const search = $("#masterSearch").value.trim().toLowerCase();
  const parties = state.parties.filter((party) => {
    const text = `${party.name} ${party.phone} ${party.gstin} ${party.type}`.toLowerCase();
    return !search || text.includes(search);
  });
  const items = state.items.filter((item) => {
    const text = `${item.name} ${item.hsn} ${item.unit}`.toLowerCase();
    return !search || text.includes(search);
  });

  target.innerHTML = `
    <div class="master-list">
      <h3>Parties</h3>
      ${parties.length ? `
        <div class="table-shell">
          <table class="data-table master-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>GSTIN</th>
                <th class="amount-cell">Opening</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${parties.map((party) => `
                <tr>
                  <td><strong>${escapeHtml(party.name)}</strong><br><small>${escapeHtml(party.phone || party.address || "-")}</small></td>
                  <td>${escapeHtml(party.type)}</td>
                  <td>${escapeHtml(party.gstin || "-")}</td>
                  <td class="amount-cell">${money(party.opening)}</td>
                  <td>
                    <div class="table-actions">
                      <button class="ghost-button small-button" type="button" data-party-edit="${party.id}">Edit</button>
                      <button class="ghost-button small-button" type="button" data-party-delete="${party.id}">
                        <span data-icon="trash"></span>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      ` : emptyState("No party master saved yet.")}
    </div>

    <div class="master-list">
      <h3>Items</h3>
      ${items.length ? `
        <div class="table-shell">
          <table class="data-table master-table">
            <thead>
              <tr>
                <th>Item / service</th>
                <th>HSN</th>
                <th>Unit</th>
                <th class="amount-cell">Rate</th>
                <th class="amount-cell">GST</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${items.map((item) => `
                <tr>
                  <td><strong>${escapeHtml(item.name)}</strong></td>
                  <td>${escapeHtml(item.hsn || "-")}</td>
                  <td>${escapeHtml(item.unit || "-")}</td>
                  <td class="amount-cell">${money(item.rate)}</td>
                  <td class="amount-cell">${numberValue(item.tax)}%</td>
                  <td>
                    <div class="table-actions">
                      <button class="ghost-button small-button" type="button" data-item-edit="${item.id}">Edit</button>
                      <button class="ghost-button small-button" type="button" data-item-delete="${item.id}">
                        <span data-icon="trash"></span>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      ` : emptyState("No item master saved yet.")}
    </div>
  `;
  renderIcons(target);
}

function loadPartyIntoForm(id) {
  const party = state.parties.find((item) => item.id === id);
  if (!party) return;
  $("#partyId").value = party.id;
  $("#partyType").value = party.type || "customer";
  $("#partyName").value = party.name || "";
  $("#partyPhone").value = party.phone || "";
  $("#partyGstin").value = party.gstin || "";
  $("#partyAddress").value = party.address || "";
  $("#partyOpening").value = party.opening || 0;
}

function loadItemIntoForm(id) {
  const item = state.items.find((master) => master.id === id);
  if (!item) return;
  $("#itemMasterId").value = item.id;
  $("#itemMasterName").value = item.name || "";
  $("#itemMasterHsn").value = item.hsn || "";
  $("#itemMasterUnit").value = item.unit || "job";
  $("#itemMasterRate").value = item.rate || 0;
  $("#itemMasterTax").value = item.tax || state.business.defaultTax || 18;
}

function deleteParty(id) {
  const party = state.parties.find((item) => item.id === id);
  if (!party) return;
  if (!window.confirm(`Delete party ${party.name}?`)) return;
  state.parties = state.parties.filter((item) => item.id !== id);
  saveState();
  renderAll();
  showToast("Party deleted.");
}

function deleteItemMaster(id) {
  const item = state.items.find((master) => master.id === id);
  if (!item) return;
  if (!window.confirm(`Delete item ${item.name}?`)) return;
  state.items = state.items.filter((master) => master.id !== id);
  saveState();
  renderAll();
  showToast("Item deleted.");
}

function renderReports() {
  const month = $("#reportMonth").value || currentMonthISO();
  const stats = statsForMonth(month);
  $("#reportSummary").innerHTML = [
    ["Invoice sales", stats.sales],
    ["Money received", stats.moneyIn],
    ["Money spent", stats.moneyOut],
    ["Cash profit", stats.profit],
    ["Pending from this month", stats.pending]
  ].map(([label, value]) => `
    <div class="report-line">
      <span>${label}</span>
      <strong>${money(value)}</strong>
    </div>
  `).join("");

  const expenses = stats.entries
    .filter((entry) => entry.type === "expense")
    .reduce((map, entry) => {
      map[entry.category || "Expense"] = (map[entry.category || "Expense"] || 0) + numberValue(entry.amount);
      return map;
    }, {});
  renderBars("#expenseBars", expenses, "No expenses for this month.");

  const methods = stats.entries.reduce((map, entry) => {
    const method = entry.method || "Other";
    const amount = entry.type === "income" ? numberValue(entry.amount) : -numberValue(entry.amount);
    map[method] = (map[method] || 0) + amount;
    return map;
  }, {});
  renderBars("#methodBars", methods, "No payment movement for this month.");
}

function renderBars(selector, values, emptyMessage) {
  const target = $(selector);
  const rows = Object.entries(values).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  if (!rows.length) {
    target.innerHTML = emptyState(emptyMessage);
    return;
  }
  const max = Math.max(...rows.map(([, value]) => Math.abs(value)), 1);
  target.innerHTML = rows.map(([label, value]) => `
    <div class="bar-row">
      <div class="bar-meta">
        <strong>${escapeHtml(label)}</strong>
        <span>${money(value)}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${(Math.abs(value) / max) * 100}%"></div>
      </div>
    </div>
  `).join("");
}

function renderSettingsForm() {
  $("#businessName").value = state.business.name || "";
  $("#businessAddress").value = state.business.address || "";
  $("#businessPhone").value = state.business.phone || "";
  $("#businessEmail").value = state.business.email || "";
  $("#businessGstin").value = state.business.gstin || "";
  $("#defaultTax").value = state.business.defaultTax ?? 0;
  $("#invoicePrefix").value = state.business.invoicePrefix || "RP";
  $("#businessUpi").value = state.business.upi || "";
  $("#businessBank").value = state.business.bank || "";
  $("#cloudEndpoint").value = state.cloud.endpoint || "";
  $("#cloudToken").value = state.cloud.token || "";
  $("#cloudMessage").textContent = state.cloud.lastSync
    ? `Last sync attempt: ${new Date(state.cloud.lastSync).toLocaleString("en-IN")}`
    : "Cloud is not connected yet.";
}

function saveSettings(event) {
  event.preventDefault();
  state.business = {
    ...state.business,
    name: $("#businessName").value.trim() || "Resham Printers",
    address: $("#businessAddress").value.trim(),
    phone: $("#businessPhone").value.trim(),
    email: $("#businessEmail").value.trim(),
    gstin: $("#businessGstin").value.trim(),
    defaultTax: numberValue($("#defaultTax").value),
    invoicePrefix: $("#invoicePrefix").value.trim() || "RP",
    upi: $("#businessUpi").value.trim(),
    bank: $("#businessBank").value.trim()
  };
  invoiceItems = invoiceItems.map((item) => ({ ...item, tax: item.tax || state.business.defaultTax }));
  saveState();
  renderAll();
  showToast("Business settings saved.");
}

function saveCloudSettings() {
  state.cloud.endpoint = $("#cloudEndpoint").value.trim();
  state.cloud.token = $("#cloudToken").value.trim();
  saveState();
  renderAll();
  showToast(state.cloud.endpoint ? "Cloud settings saved." : "Cloud settings cleared.");
}

async function syncCloud() {
  saveCloudSettings();
  if (!state.cloud.endpoint) {
    showToast("Add a cloud endpoint first.");
    return;
  }
  const payload = clone(state);
  payload.cloud.token = "";
  try {
    const response = await fetch(state.cloud.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(state.cloud.token ? { Authorization: `Bearer ${state.cloud.token}` } : {})
      },
      body: JSON.stringify({
        app: "resham-printers-ledger",
        savedAt: new Date().toISOString(),
        data: payload
      })
    });
    if (!response.ok) {
      throw new Error(`Cloud returned ${response.status}`);
    }
    state.cloud.lastSync = new Date().toISOString();
    saveState();
    renderSettingsForm();
    showToast("Cloud sync sent successfully.");
  } catch (error) {
    console.error(error);
    $("#cloudMessage").textContent = "Sync failed. The endpoint must allow browser POST requests.";
    showToast("Cloud sync failed.");
  }
}

function handleLogoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.business.logo = String(reader.result);
    saveState();
    renderAll();
    showToast("Logo added.");
  };
  reader.readAsDataURL(file);
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportBackup() {
  const filename = `resham-printers-backup-${todayISO()}.json`;
  downloadFile(filename, JSON.stringify(state, null, 2), "application/json");
  showToast("Backup downloaded.");
}

function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result));
      if (!imported.business || !Array.isArray(imported.invoices) || !Array.isArray(imported.transactions)) {
        throw new Error("Invalid backup");
      }
      state = {
        ...clone(DEFAULT_STATE),
        ...imported,
        business: { ...clone(DEFAULT_STATE.business), ...imported.business },
        cloud: { ...clone(DEFAULT_STATE.cloud), ...(imported.cloud || {}) },
        parties: Array.isArray(imported.parties) ? imported.parties : [],
        items: Array.isArray(imported.items) ? imported.items : seedItems()
      };
      saveState();
      resetInvoiceForm();
      renderAll();
      showToast("Backup imported.");
    } catch (error) {
      console.error(error);
      showToast("This backup file is not valid.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function exportCsv() {
  const entries = allMoneyEntries();
  const rows = [
    ["Date", "Type", "Party", "Category", "Method", "Amount", "Note"],
    ...entries.map((entry) => [
      entry.date,
      entry.type,
      entry.party,
      entry.category,
      entry.method,
      numberValue(entry.amount).toFixed(2),
      entry.note || ""
    ])
  ];
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadFile(`resham-printers-money-${todayISO()}.csv`, csv, "text/csv");
  showToast("CSV exported.");
}

function printLedger() {
  const rows = ledgerRows();
  $("#printArea").innerHTML = `
    <div class="print-document">
      <header class="print-header">
        <img class="print-logo" src="${escapeHtml(state.business.logo || "assets/resham-mark.svg")}" alt="">
        <div>
          <h1>${escapeHtml(state.business.name || "Resham Printers")}</h1>
          <p>${nl2br(state.business.address || "")}</p>
        </div>
        <div class="print-title-box">
          <strong>Customer Ledger</strong>
          <span>${formatDate(todayISO())}</span>
        </div>
      </header>
      <table class="print-table" style="margin-top:16px">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th class="num">Invoices</th>
            <th class="num">Billed</th>
            <th class="num">Paid</th>
            <th class="num">Pending</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${escapeHtml(row.name)}</td>
              <td>${escapeHtml(row.phone || "-")}</td>
              <td class="num">${row.invoices}</td>
              <td class="num">${money(row.billed)}</td>
              <td class="num">${money(row.paid)}</td>
              <td class="num">${money(row.due)}</td>
            </tr>
          `).join("") || `<tr><td colspan="6">No ledger data</td></tr>`}
        </tbody>
      </table>
    </div>
  `;
  window.print();
}

function printReport() {
  const month = $("#reportMonth").value || currentMonthISO();
  const stats = statsForMonth(month);
  $("#printArea").innerHTML = `
    <div class="print-document">
      <header class="print-header">
        <img class="print-logo" src="${escapeHtml(state.business.logo || "assets/resham-mark.svg")}" alt="">
        <div>
          <h1>${escapeHtml(state.business.name || "Resham Printers")}</h1>
          <p>${nl2br(state.business.address || "")}</p>
        </div>
        <div class="print-title-box">
          <strong>Monthly Report</strong>
          <span>${formatMonth(month)}</span>
        </div>
      </header>
      <section class="print-totals">
        <div class="amount-words">
          <h2>Summary</h2>
          <p>Report generated on ${formatDate(todayISO())}.</p>
        </div>
        <div class="total-box">
          <div class="total-line"><span>Invoice sales</span><strong>${money(stats.sales)}</strong></div>
          <div class="total-line"><span>Money received</span><strong>${money(stats.moneyIn)}</strong></div>
          <div class="total-line"><span>Money spent</span><strong>${money(stats.moneyOut)}</strong></div>
          <div class="total-line grand"><span>Cash profit</span><strong>${money(stats.profit)}</strong></div>
          <div class="total-line"><span>Pending</span><strong>${money(stats.pending)}</strong></div>
        </div>
      </section>
    </div>
  `;
  window.print();
}

function renderAll() {
  renderBusinessShell();
  renderPaymentOptions();
  renderMasterOptions();
  renderDashboard();
  renderInvoiceList();
  renderMasters();
  renderTransactions();
  renderLedger();
  renderReports();
  if (currentView === "settings") renderSettingsForm();
  renderIcons(document);
}

function applyPartyDetailsToInvoice() {
  const party = findPartyByName($("#customerName").value);
  if (!party) return;
  $("#customerPhone").value = party.phone || "";
  $("#customerAddress").value = party.address || "";
  $("#customerGstin").value = party.gstin || "";
}

function bindEvents() {
  $$(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => setView(tab.dataset.view));
  });

  $$("[data-view-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewJump));
  });

  $("#quickBillBtn").addEventListener("click", () => {
    resetInvoiceForm();
    setView("billing");
  });

  $("#exportBackupBtn").addEventListener("click", exportBackup);
  $("#settingsExportBtn").addEventListener("click", exportBackup);
  $("#backupImport").addEventListener("change", importBackup);
  $("#invoiceForm").addEventListener("submit", saveInvoice);
  $("#customerName").addEventListener("change", applyPartyDetailsToInvoice);
  $("#clearInvoiceBtn").addEventListener("click", resetInvoiceForm);
  $("#billType").addEventListener("change", renderInvoiceSummary);
  $("#invoiceDiscount").addEventListener("input", renderInvoiceSummary);
  $("#invoicePaid").addEventListener("input", renderInvoiceSummary);
  $("#addItemBtn").addEventListener("click", () => {
    invoiceItems.push(createBlankItem());
    renderItemEditor();
  });

  $("#serviceChips").addEventListener("click", (event) => {
    const button = event.target.closest("[data-service-index]");
    if (!button) return;
    const preset = SERVICE_PRESETS[Number(button.dataset.serviceIndex)];
    invoiceItems.push(createBlankItem({ ...preset, tax: state.business.defaultTax }));
    renderItemEditor();
  });

  $("#itemEditor").addEventListener("input", (event) => {
    const row = event.target.closest(".item-row");
    if (!row) return;
    const index = Number(row.dataset.index);
    const field = event.target.dataset.field;
    if (!field || !invoiceItems[index]) return;
    invoiceItems[index][field] = ["description", "hsn", "unit"].includes(field)
      ? event.target.value
      : numberValue(event.target.value);
    if (field === "description") {
      const masterItem = findItemByName(event.target.value);
      if (masterItem) {
        invoiceItems[index] = {
          ...invoiceItems[index],
          description: masterItem.name,
          hsn: masterItem.hsn || "",
          unit: masterItem.unit || "job",
          rate: numberValue(masterItem.rate),
          tax: numberValue(masterItem.tax)
        };
        renderItemEditor();
        return;
      }
    }
    renderInvoiceSummary();
  });

  $("#itemEditor").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-item]");
    if (!button) return;
    const index = Number(button.dataset.removeItem);
    invoiceItems.splice(index, 1);
    if (!invoiceItems.length) invoiceItems.push(createBlankItem());
    renderItemEditor();
  });

  $("#printDraftBtn").addEventListener("click", () => {
    const draft = currentInvoiceDraft();
    if (!draft.items.length) {
      showToast("Add an item before printing.");
      return;
    }
    printInvoice(draft);
  });

  $("#invoiceSearch").addEventListener("input", renderInvoiceList);
  $("#invoiceList").addEventListener("click", (event) => {
    const edit = event.target.closest("[data-invoice-edit]");
    const print = event.target.closest("[data-invoice-print]");
    const remove = event.target.closest("[data-invoice-delete]");
    if (edit) loadInvoiceIntoForm(edit.dataset.invoiceEdit);
    if (print) {
      const invoice = state.invoices.find((item) => item.id === print.dataset.invoicePrint);
      if (invoice) printInvoice(invoice);
    }
    if (remove) deleteInvoice(remove.dataset.invoiceDelete);
  });

  $("#transactionForm").addEventListener("submit", saveTransaction);
  $("#transactionSearch").addEventListener("input", renderTransactions);
  $("#transactionTable").addEventListener("click", (event) => {
    const button = event.target.closest("[data-transaction-delete]");
    if (button) deleteTransaction(button.dataset.transactionDelete);
  });

  $("#printLedgerBtn").addEventListener("click", printLedger);
  $("#partyForm").addEventListener("submit", saveParty);
  $("#itemMasterForm").addEventListener("submit", saveItemMaster);
  $("#clearPartyBtn").addEventListener("click", resetPartyForm);
  $("#clearItemMasterBtn").addEventListener("click", resetItemMasterForm);
  $("#masterSearch").addEventListener("input", renderMasters);
  $("#masterTables").addEventListener("click", (event) => {
    const partyEdit = event.target.closest("[data-party-edit]");
    const partyDelete = event.target.closest("[data-party-delete]");
    const itemEdit = event.target.closest("[data-item-edit]");
    const itemDelete = event.target.closest("[data-item-delete]");
    if (partyEdit) loadPartyIntoForm(partyEdit.dataset.partyEdit);
    if (partyDelete) deleteParty(partyDelete.dataset.partyDelete);
    if (itemEdit) loadItemIntoForm(itemEdit.dataset.itemEdit);
    if (itemDelete) deleteItemMaster(itemDelete.dataset.itemDelete);
  });
  $("#reportMonth").addEventListener("change", renderReports);
  $("#exportCsvBtn").addEventListener("click", exportCsv);
  $("#printReportBtn").addEventListener("click", printReport);
  $("#settingsForm").addEventListener("submit", saveSettings);
  $("#logoUpload").addEventListener("change", handleLogoUpload);
  $("#saveCloudBtn").addEventListener("click", saveCloudSettings);
  $("#syncCloudBtn").addEventListener("click", syncCloud);
}

function init() {
  $("#invoiceDate").value = todayISO();
  $("#transactionDate").value = todayISO();
  $("#reportMonth").value = currentMonthISO();
  $("#itemMasterTax").value = state.business.defaultTax || 18;
  renderServiceChips();
  renderItemEditor();
  bindEvents();
  renderAll();
}

init();
