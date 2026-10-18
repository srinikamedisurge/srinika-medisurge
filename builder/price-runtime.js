// ===== Srinika live prices (runtime) =====
// PRICE_LINES / WEBSITE_PAGE_CONTEXT / APP_ITEM_CONTEXT are generated above this block
// from builder/data/price_lines.js. Owner overrides come from Firestore `config/prices`
// (public read, owner-only write). Without any override the built-in default is used, so
// pages still show correct prices when offline or before the first fetch.
const SrinikaPrices = (function () {
  const PROJECT_ID = "__PROJECT_ID__";
  const API_KEY = "__API_KEY__";
  const URL = "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/(default)/documents/config/prices?key=" + API_KEY;
  const CACHE_KEY = "srinika_prices_v1";
  const FRESH_MS = 2 * 60 * 1000;

  const defaults = {};
  PRICE_LINES.forEach(l => { defaults[l.key] = l.price; });
  let overrides = {};
  let updatedAtMs = 0;
  const listeners = [];

  function store(op, v) {
    try {
      if (op === "get") return localStorage.getItem(CACHE_KEY);
      localStorage.setItem(CACHE_KEY, v);
    } catch (e) {}
    return null;
  }

  function valid(n) { return typeof n === "number" && isFinite(n) && n > 0 && n <= 1000000; }

  // The website's older select values -> price keys
  const ALIAS = { "consultation-online": "consult-online", "consultation-doorstep": "consult-doorstep" };

  function price(key) {
    key = ALIAS[key] || key;
    return valid(overrides[key]) ? overrides[key] : defaults[key];
  }

  function fmt(n) { return "₹" + Number(n).toLocaleString("en-IN"); }

  // Replace every ₹ amount in `text` that this context knows about, in ONE pass (no chaining).
  // ctx: { amount: key | [keys] }, counters: occurrence counters per amount (for shared amounts).
  function replaceAmounts(text, ctx, counters) {
    return text.replace(/₹\s?(\d[\d,]*)/g, (whole, digits) => {
      const n = parseInt(digits.replace(/,/g, ""), 10);
      const entry = ctx[n];
      if (!entry) return whole;
      const keys = Array.isArray(entry) ? entry : [entry];
      const i = (counters[n] = (counters[n] || 0));
      counters[n] = i + 1;
      const key = keys[i % keys.length];
      return fmt(price(key));
    });
  }

  const original = new WeakMap();

  function applyDom() {
    // 1) explicit price spans
    document.querySelectorAll("[data-pk]").forEach(el => {
      const key = el.getAttribute("data-pk");
      if (!(key in defaults)) return;
      el.textContent = fmt(price(key)) + (el.getAttribute("data-pfmt") === "dec" ? ".00" : "");
    });

    // 2) service detail page: amounts inside the copy (FAQ, features, notes...)
    const path = location.pathname.replace(/\/?$/, "/");
    const m = path.match(/^\/services\/([^\/]+)\/$/);
    let ctx = m && WEBSITE_PAGE_CONTEXT[m[1]];
    if (!ctx) {
      const prefix = Object.keys(WEBSITE_PATH_CONTEXT).find(p => path.indexOf(p) === 0);
      if (prefix) ctx = WEBSITE_PATH_CONTEXT[prefix];
    }
    if (ctx) {
      const counters = {};
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const p = node.parentElement;
          if (!p || p.closest("script,style,noscript,[data-pk]")) return NodeFilter.FILTER_REJECT;
          const text = original.has(node) ? original.get(node) : node.nodeValue;
          return text.indexOf("₹") >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        if (!original.has(node)) original.set(node, node.nodeValue);
        node.nodeValue = replaceAmounts(original.get(node), ctx, counters);
      });
    }

    // 3) <option> labels that show a price
    document.querySelectorAll("#calc-service option").forEach(opt => {
      const key = ALIAS[opt.value] || opt.value;
      if (!(key in defaults)) return;
      if (!original.has(opt)) original.set(opt, opt.textContent);
      opt.textContent = original.get(opt).replace(/\(₹[\d,]+\)\s*$/, "(" + fmt(price(key)) + ")");
    });
    document.querySelectorAll("#modal-service-select option").forEach(opt => {
      const key = bookingOptionKey(opt.value);
      if (!key) return;
      if (!original.has(opt)) original.set(opt, opt.textContent);
      opt.textContent = original.get(opt).replace(/₹\s?[\d,]+/, fmt(price(key)));
    });
  }

  function bookingOptionKey(value) {
    const v = String(value || "");
    if (v.indexOf("Online Doctor Consultation") >= 0) return "consult-online";
    if (v.indexOf("Door Step (Within 5km") >= 0) return "consult-doorstep";
    if (v.indexOf("Physiotherapy At Door Step") >= 0) return "physiotherapy-doorstep";
    return null;
  }

  // ----- patient app: produce a priced copy of the pristine APP_DATA -----
  function pricedItem(item, ctx) {
    const counters = {};
    const walk = v => {
      if (typeof v === "string") return replaceAmounts(v, ctx, counters);
      if (Array.isArray(v)) return v.map(walk);
      if (v && typeof v === "object") { const o = {}; Object.keys(v).forEach(k => { o[k] = walk(v[k]); }); return o; }
      return v;
    };
    return walk(item);
  }

  function pricedAppData(pristine) {
    const out = JSON.parse(JSON.stringify(pristine));
    ["services", "rentals"].forEach(list => {
      out[list] = (pristine[list] || []).map(item => {
        const ctx = APP_ITEM_CONTEXT[item.id];
        return ctx ? pricedItem(item, ctx) : JSON.parse(JSON.stringify(item));
      });
    });
    out.rateChart = (pristine.rateChart || []).map((row, i) => {
      const key = APP_RATE_CHART_KEYS[i];
      const first = String(row.price).match(/₹\s?(\d[\d,]*)/);
      if (!key || !first) return Object.assign({}, row);
      const ctx = {}; ctx[parseInt(first[1].replace(/,/g, ""), 10)] = key;
      return Object.assign({}, row, { price: replaceAmounts(row.price, ctx, {}) });
    });
    out.consultationFee = price("consult-online");
    (out.doctors || []).forEach(d => {
      if (typeof d.onlineFee === "number") d.onlineFee = price("consult-online");
      // The physiotherapist's "doorstep fee" is the physio session price, not the doctor visit fee
      if (typeof d.doorstepFee === "number") d.doorstepFee = d.doorstepFee === defaults["physiotherapy-doorstep"] ? price("physiotherapy-doorstep") : price("consult-doorstep");
    });
    return out;
  }

  // ----- load / refresh -----
  function parse(doc) {
    const f = doc && doc.fields && doc.fields.prices && doc.fields.prices.mapValue && doc.fields.prices.mapValue.fields;
    const out = {};
    if (f) Object.keys(f).forEach(k => {
      const v = f[k];
      const n = "integerValue" in v ? Number(v.integerValue) : ("doubleValue" in v ? v.doubleValue : NaN);
      if (valid(n) && k in defaults) out[k] = n;
    });
    const t = doc && doc.fields && doc.fields.updatedAtMs;
    return { prices: out, updatedAtMs: t && t.integerValue ? Number(t.integerValue) : 0 };
  }

  function setOverrides(next, at) {
    const changed = JSON.stringify(next) !== JSON.stringify(overrides);
    overrides = next;
    updatedAtMs = at || updatedAtMs;
    if (changed) listeners.forEach(fn => { try { fn(); } catch (e) {} });
    return changed;
  }

  function loadCache() {
    try {
      const c = JSON.parse(store("get") || "null");
      if (c && c.prices) { setOverrides(c.prices, c.updatedAtMs); return c.fetchedAt || 0; }
    } catch (e) {}
    return 0;
  }

  async function refresh(force) {
    const fetchedAt = loadCache();
    if (!force && Date.now() - fetchedAt < FRESH_MS) return;
    try {
      const res = await fetch(URL);
      if (res.status === 404) { setOverrides({}, 0); store("set", JSON.stringify({ prices: {}, updatedAtMs: 0, fetchedAt: Date.now() })); return; }
      if (!res.ok) return;
      const parsed = parse(await res.json());
      setOverrides(parsed.prices, parsed.updatedAtMs);
      store("set", JSON.stringify({ prices: parsed.prices, updatedAtMs: parsed.updatedAtMs, fetchedAt: Date.now() }));
    } catch (e) { /* offline: keep cached / default prices */ }
  }

  return {
    price, fmt, defaults, applyDom,
    replaceText(text, ctx) { return replaceAmounts(text, ctx || {}, {}); }, pricedAppData, refresh, bookingOptionKey,
    onChange(fn) { listeners.push(fn); },
    init() { loadCache(); }
  };
})();
