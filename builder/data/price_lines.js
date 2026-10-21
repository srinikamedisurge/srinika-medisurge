/**
 * SINGLE SOURCE OF TRUTH for every price Srinika charges.
 *
 * - `price` here is the built-in default that is baked into the static pages/apps.
 * - The owner can override any line from the admin panel (/admin/). Overrides live in
 *   Firestore `config/prices` and are applied at runtime by the website and the patient app.
 * - Run `node builder/gen-price-lines.js` after editing this file; it regenerates
 *   assets/js/price-lines.js (browser copy used by the website, admin panel and patient app).
 */

const LINES = [
  // ---- Doctor & therapy
  { key: "consult-online",        group: "Doctor & Therapy", label: "Online Doctor Video Consultation", unit: "/ consult", price: 500 },
  { key: "consult-doorstep",      group: "Doctor & Therapy", label: "Doctor Home Visit (within 5 km)", unit: "/ visit", price: 2000 },
  { key: "physiotherapy-doorstep", group: "Doctor & Therapy", label: "Physiotherapy at Doorstep", unit: "/ session", price: 600 },

  // ---- Dressing
  { key: "wound-dressing-small",  group: "Surgical Dressing", label: "Wound Dressing (Small)", unit: "/ session", price: 500 },
  { key: "wound-dressing-medium", group: "Surgical Dressing", label: "Wound Dressing (Medium)", unit: "/ session", price: 1000 },
  { key: "wound-dressing-large",  group: "Surgical Dressing", label: "Wound Dressing (Large / bed sore)", unit: "/ session", price: 1500 },

  // ---- Procedures
  { key: "catheter-insertion",    group: "Nursing Procedures", label: "Urinary Catheterization (Foley / Silicone)", unit: "/ procedure", price: 999 },
  { key: "ryles-tube",            group: "Nursing Procedures", label: "Ryle's Tube / NG Tube Insertion", unit: "/ procedure", price: 999 },
  { key: "drain-out",             group: "Nursing Procedures", label: "Surgical Drain Out / Drainage Care", unit: "/ procedure", price: 999 },
  { key: "nebulization",          group: "Nursing Procedures", label: "Nebulization & Demonstration", unit: "(one-time)", price: 500 },
  { key: "enema-pr",              group: "Nursing Procedures", label: "Enema PR Insertion & Bowel Care", unit: "/ procedure", price: 600 },
  { key: "tracheostomy-care",     group: "Nursing Procedures", label: "Tracheostomy Care & Suctioning", unit: "/ session", price: 300 },
  { key: "tracheostomy-change",   group: "Nursing Procedures", label: "Tracheostomy Tube Change", unit: "/ procedure", price: 2000 },
  { key: "tracheostomy-out",      group: "Nursing Procedures", label: "Tracheostomy Out (Decannulation)", unit: "/ procedure", price: 2000 },
  { key: "iv-injection",          group: "Injections", label: "IV Injection Administration", unit: "/ visit", price: 399 },
  { key: "im-injection",          group: "Injections", label: "IM / SC Injection Administration", unit: "/ visit", price: 299 },

  // ---- Nursing & attendants
  { key: "nurse-morning",         group: "Nursing & Attendant Shifts", label: "Nursing Duty - Morning (7h)", unit: "/ shift", price: 999 },
  { key: "nurse-evening",         group: "Nursing & Attendant Shifts", label: "Nursing Duty - Evening (7h)", unit: "/ shift", price: 999 },
  { key: "nurse-night",           group: "Nursing & Attendant Shifts", label: "Nursing Duty - Night (10h)", unit: "/ shift", price: 1299 },
  { key: "diaper-urine",          group: "Nursing & Attendant Shifts", label: "Diaper Change & Urine Bag Emptying", unit: "/ session", price: 500 },
  { key: "patient-care-12h",      group: "Nursing & Attendant Shifts", label: "Patient Attendant - 12 hours", unit: "/ shift", price: 999 },
  { key: "patient-care-24h",      group: "Nursing & Attendant Shifts", label: "Patient Attendant - 24 hours", unit: "/ day", price: 1799 },

  // ---- Monthly staff (GDA / EMT): ranges are stored as min / max lines
  { key: "gda-12h-min",           group: "Monthly Staff (GDA / EMT)", label: "GDA - 12 hours (from)", unit: "/ month", price: 20000 },
  { key: "gda-12h-max",           group: "Monthly Staff (GDA / EMT)", label: "GDA - 12 hours (up to)", unit: "/ month", price: 24000 },
  { key: "gda-24h-min",           group: "Monthly Staff (GDA / EMT)", label: "GDA - 24 hours (from)", unit: "/ month", price: 30000 },
  { key: "gda-24h-max",           group: "Monthly Staff (GDA / EMT)", label: "GDA - 24 hours (up to)", unit: "/ month", price: 35000 },
  { key: "emt-12h",               group: "Monthly Staff (GDA / EMT)", label: "EMT Staff - 12 hours", unit: "/ month", price: 25000 },
  { key: "emt-24h-min",           group: "Monthly Staff (GDA / EMT)", label: "EMT Staff - 24 hours (from)", unit: "/ month", price: 30000 },
  { key: "emt-24h-max",           group: "Monthly Staff (GDA / EMT)", label: "EMT Staff - 24 hours (up to)", unit: "/ month", price: 35000 },

  // ---- Respiratory / misc
  { key: "bipap-setup",           group: "Other", label: "BiPAP setup & titration (from)", unit: "", price: 1200 },
  { key: "urgent-fee",            group: "Other", label: "Urgent priority dispatch surcharge", unit: "", price: 150 },

  // ---- Equipment rental (daily / weekly / monthly)
  ...[
    ["bipap", "BiPAP Machine", 750, 4500, 18000],
    ["o2-concentrator", "Oxygen Concentrator (5 L)", 500, 3000, 12000],
    ["o2-cylinder", "B-Type Oxygen Cylinder & Regulator", 150, 800, 2000],
    ["vital-monitor", "Vital Monitor (Multi-Para)", 300, 1800, 7500],
    ["suction", "Medical Suction Machine", 150, 900, 3500],
    ["bed", "Hospital Patient Bed", 200, 1200, 5000],
    ["infusion-pump", "Infusion / Syringe Pump", 300, 1800, 7500],
    ["ventilator", "ICU Ventilator Machine", 3000, 18000, 75000]
  ].flatMap(([id, label, d, w, m]) => [
    { key: `eq-${id}-daily`,   group: "Equipment Rental", label: `${label} - per day`,   unit: "/ day",   price: d },
    { key: `eq-${id}-weekly`,  group: "Equipment Rental", label: `${label} - per 7 days`, unit: "/ 7 days", price: w },
    { key: `eq-${id}-monthly`, group: "Equipment Rental", label: `${label} - per month`, unit: "/ month", price: m }
  ])
];

/**
 * Where each amount appears inside ONE service detail page of the website (matched by
 * URL slug). amount -> key (or list of keys when two lines share an amount; they are
 * assigned in order of appearance, e.g. nursing "Morning ₹999 | Evening ₹999").
 */
const WEBSITE_PAGE_CONTEXT = {
  "doctor-home-visit-lucknow": { 2000: "consult-doorstep" },
  "online-doctor-consultation": { 500: "consult-online" },
  "home-nursing-lucknow": { 999: ["nurse-morning", "nurse-evening"], 1299: "nurse-night" },
  "wound-dressing-at-home-lucknow": { 500: "wound-dressing-small", 1000: "wound-dressing-medium", 1500: "wound-dressing-large" },
  "urinary-catheterization-at-home-lucknow": { 999: "catheter-insertion" },
  "ng-tube-insertion-at-home-lucknow": { 999: "ryles-tube" },
  "iv-drip-injection-at-home-lucknow": { 399: "iv-injection", 299: "im-injection" },
  "physiotherapy-at-home-lucknow": { 600: "physiotherapy-doorstep" },
  "bipap-oxygen-support-at-home-lucknow": { 1200: "bipap-setup" },
  "nebulization-vitals-ecg-at-home": { 500: "nebulization" },
  "patient-attendant-lucknow": { 999: "patient-care-12h", 1799: "patient-care-24h" },
  "gda-service-lucknow": { 20000: "gda-12h-min", 24000: "gda-12h-max", 30000: "gda-24h-min", 35000: "gda-24h-max" },
  "emt-staff-service-lucknow": { 25000: "emt-12h", 30000: "emt-24h-min", 35000: "emt-24h-max" }
};

/** Pages outside /services/: matched by URL prefix. */
const WEBSITE_PATH_CONTEXT = {
  "/areas/": { 2000: "consult-doorstep", 600: "physiotherapy-doorstep", 500: "consult-online" },
  "/blog/home-physiotherapy-stroke-surgery-recovery/": { 600: "physiotherapy-doorstep" },
  "/blog/doorstep-doctor-visit-vs-hospital-opd-elderly/": { 2000: "consult-doorstep" }
};

/** Same idea for the patient app: item id -> amount -> key(s). */
const APP_ITEM_CONTEXT = {
  "wound-dressing": { 500: "wound-dressing-small", 1000: "wound-dressing-medium", 1500: "wound-dressing-large" },
  "foley-catheterization": { 999: "catheter-insertion" },
  "ryles-tube-insertion": { 999: "ryles-tube" },
  "surgical-drain-out": { 999: "drain-out" },
  "nebulization-explanation": { 500: "nebulization" },
  "enema-pr-insertion": { 600: "enema-pr" },
  "tracheostomy-care": { 300: "tracheostomy-care" },
  "tracheostomy-change": { 2000: "tracheostomy-change" },
  "tracheostomy-out": { 2000: "tracheostomy-out" },
  "iv-injection": { 399: "iv-injection" },
  "im-sc-injection": { 299: "im-injection" },
  "nursing-duties-shifts": { 999: ["nurse-morning", "nurse-evening"], 1299: "nurse-night" },
  "diaper-change-urine-empty": { 500: "diaper-urine" },
  "gda-service": { 20000: "gda-12h-min", 24000: "gda-12h-max", 30000: "gda-24h-min", 35000: "gda-24h-max" },
  "emt-staff-service": { 25000: "emt-12h", 30000: "emt-24h-min", 35000: "emt-24h-max" },
  "doctor-home-visit-lucknow": { 2000: "consult-doorstep" },
  "physiotherapy-at-home-lucknow": { 600: "physiotherapy-doorstep" },
  "online-doctor-consultation": { 500: "consult-online" },
  "bipap-machine": { 750: "eq-bipap-daily", 4500: "eq-bipap-weekly", 18000: "eq-bipap-monthly" },
  "oxygen-concentrator": { 500: "eq-o2-concentrator-daily", 3000: "eq-o2-concentrator-weekly", 12000: "eq-o2-concentrator-monthly" },
  "oxygen-cylinder": { 150: "eq-o2-cylinder-daily", 800: "eq-o2-cylinder-weekly", 2000: "eq-o2-cylinder-monthly" },
  "multipara-monitor": { 300: "eq-vital-monitor-daily", 1800: "eq-vital-monitor-weekly", 7500: "eq-vital-monitor-monthly" },
  "suction-machine": { 150: "eq-suction-daily", 900: "eq-suction-weekly", 3500: "eq-suction-monthly" },
  "patient-bed": { 200: "eq-bed-daily", 1200: "eq-bed-weekly", 5000: "eq-bed-monthly" },
  "infusion-pump": { 300: "eq-infusion-pump-daily", 1800: "eq-infusion-pump-weekly", 7500: "eq-infusion-pump-monthly" },
  "ventilator-machine": { 3000: "eq-ventilator-daily", 18000: "eq-ventilator-weekly", 75000: "eq-ventilator-monthly" }
};

/** Patient app "rate chart" rows, in order (null = no fixed price). */
const APP_RATE_CHART_KEYS = [
  "wound-dressing-small", "wound-dressing-medium", "wound-dressing-large", "catheter-insertion", "ryles-tube", "drain-out",
  "nebulization", "enema-pr", "tracheostomy-care", "tracheostomy-change", "tracheostomy-out", "iv-injection", "im-injection", null,
  "nurse-morning", "nurse-evening", "nurse-night", "diaper-urine", "consult-doorstep", "consult-online", "physiotherapy-doorstep",
  "eq-bipap-daily", "eq-o2-concentrator-daily", "eq-o2-cylinder-monthly", "eq-vital-monitor-daily", "eq-suction-daily",
  "eq-bed-daily", "eq-infusion-pump-daily", "eq-ventilator-daily"
];

const byKey = Object.fromEntries(LINES.map(l => [l.key, l]));

/** ₹ amount in Indian grouping, e.g. 18000 -> "₹18,000" */
function money(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

/** Template helper: <span data-pk="key">₹500</span> (default amount baked in). */
function P(key, fmt) {
  const line = byKey[key];
  if (!line) throw new Error("Unknown price key: " + key);
  const txt = fmt === "dec" ? money(line.price) + ".00" : money(line.price);
  return `<span data-pk="${key}"${fmt ? ` data-pfmt="${fmt}"` : ""}>${txt}</span>`;
}

/** Wrap every known ₹ amount of a service's own price text in a live-price span. */
function pricify(text, slug) {
  const ctx = WEBSITE_PAGE_CONTEXT[slug];
  if (!ctx || text == null) return text;
  const counters = {};
  return String(text).replace(/₹\s?(\d[\d,]*)/g, (whole, digits) => {
    const n = parseInt(digits.replace(/,/g, ""), 10);
    const entry = ctx[n];
    if (!entry) return whole;
    const keys = Array.isArray(entry) ? entry : [entry];
    const i = (counters[n] = counters[n] || 0);
    counters[n] = i + 1;
    return P(keys[i % keys.length]);
  });
}

module.exports = { pricify, APP_RATE_CHART_KEYS, LINES, WEBSITE_PAGE_CONTEXT, WEBSITE_PATH_CONTEXT, APP_ITEM_CONTEXT, byKey, money, P };
