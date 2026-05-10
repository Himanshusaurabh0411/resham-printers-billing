const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { URL } = require("node:url");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");
const PORT = Number(process.env.PORT || 3000);
const API_TOKEN = process.env.RESHAM_API_TOKEN || "";

const SERVICE_PRESETS = [
  { name: "Visiting cards printing", hsn: "9989", unit: "job", rate: 750, tax: 18 },
  { name: "Flex banner printing", hsn: "4911", unit: "sq.ft", rate: 120, tax: 18 },
  { name: "Letterhead printing", hsn: "4821", unit: "ream", rate: 850, tax: 18 },
  { name: "Sticker printing", hsn: "3919", unit: "job", rate: 450, tax: 18 },
  { name: "Photocopy / Xerox", hsn: "9989", unit: "pcs", rate: 2, tax: 18 },
  { name: "Designing charges", hsn: "9983", unit: "job", rate: 300, tax: 18 }
].map((item, index) => ({
  ...item,
  id: `preset-item-${index + 1}`,
  createdAt: "",
  updatedAt: ""
}));

const DEFAULT_STATE = {
  business: {
    name: "Resham Printers",
    address: "Add shop address here",
    phone: "",
    email: "",
    gstin: "",
    state: "",
    upi: "",
    bank: "",
    defaultTax: 18,
    invoicePrefix: "RP"
  },
  cloud: { endpoint: "", token: "", lastSync: "" },
  invoiceCounter: 0,
  invoices: [],
  parties: [],
  items: SERVICE_PRESETS,
  leads: [],
  employees: [{ id: "owner", name: "Owner", role: "owner", pin: "", active: true, createdAt: "" }],
  activeEmployeeId: "owner",
  notifications: [],
  transactions: [],
  paymentMethods: ["Cash", "UPI", "Bank transfer", "Cheque", "Card"]
};

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    ...headers
  });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload), { "Content-Type": "application/json; charset=utf-8" });
}

function authorized(req) {
  if (!API_TOKEN) return true;
  return req.headers.authorization === `Bearer ${API_TOKEN}`;
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function normalizeState(input) {
  const data = input && input.data ? input.data : input;
  if (!data || typeof data !== "object" || !data.business || !Array.isArray(data.invoices)) {
    throw new Error("Invalid billing state");
  }
  return {
    ...DEFAULT_STATE,
    ...data,
    business: { ...DEFAULT_STATE.business, ...(data.business || {}) },
    cloud: { ...DEFAULT_STATE.cloud, ...(data.cloud || {}), token: "" },
    invoices: Array.isArray(data.invoices) ? data.invoices : [],
    parties: Array.isArray(data.parties) ? data.parties : [],
    items: Array.isArray(data.items) && data.items.length ? data.items : SERVICE_PRESETS,
    leads: Array.isArray(data.leads) ? data.leads : [],
    employees: Array.isArray(data.employees) && data.employees.length ? data.employees : DEFAULT_STATE.employees,
    notifications: Array.isArray(data.notifications) ? data.notifications : [],
    transactions: [],
    paymentMethods: Array.isArray(data.paymentMethods) ? data.paymentMethods : DEFAULT_STATE.paymentMethods
  };
}

async function loadState() {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") console.warn("Using default state:", error.message);
    return DEFAULT_STATE;
  }
}

async function saveState(data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const state = normalizeState(data);
  await fs.writeFile(STORE_PATH, JSON.stringify({ ...state, savedAt: new Date().toISOString() }, null, 2));
  return state;
}

async function handleApi(req, res, pathname) {
  if (req.method === "OPTIONS") return send(res, 204, "");
  if (pathname === "/api/health") return sendJson(res, 200, { ok: true, app: "resham-printers-billing" });
  if (pathname !== "/api/state") return sendJson(res, 404, { error: "API route not found" });
  if (!authorized(req)) return sendJson(res, 401, { error: "Unauthorized" });

  if (req.method === "GET") {
    return sendJson(res, 200, { data: await loadState() });
  }
  if (req.method === "PUT" || req.method === "POST") {
    try {
      const state = await saveState(await readJson(req));
      return sendJson(res, 200, { ok: true, savedAt: new Date().toISOString(), data: state });
    } catch (error) {
      return sendJson(res, 400, { error: error.message });
    }
  }
  return sendJson(res, 405, { error: "Method not allowed" });
}

async function serveStatic(req, res, pathname) {
  const cleanPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(ROOT, cleanPath));
  if (!filePath.startsWith(ROOT)) return send(res, 403, "Forbidden");
  try {
    const file = await fs.readFile(filePath);
    const type = MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    return send(res, 200, file, { "Content-Type": type });
  } catch (error) {
    if (error.code === "ENOENT") return send(res, 404, "Not found");
    return send(res, 500, "Server error");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url.pathname);
    return await serveStatic(req, res, decodeURIComponent(url.pathname));
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: "Unexpected server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Resham Printers Billing running at http://localhost:${PORT}`);
});
