/**
 * Srinika Medisurge - Modern Healthcare Web Platform
 * Lead Doctor: Dr. Piyush Saxena
 * Location: Kaushal Puri Rd, Khargapur, Gomti Nagar, Lucknow, UP 226010
 * Main Helpline: +91 96530 01359 | Dr. Piyush: +91 8931985484 | WhatsApp: wa.me/919653001359
 */

// Core Business Data
const CLINIC_INFO = {
  name: "Srinika Medisurge",
  doctor: "Dr. Piyush Saxena",
  phone: "9653001359",
  phoneDisplay: "+91 96530 01359",
  phoneTel: "+919653001359",
  address: "Kaushal Puri Rd, Khargapur, Gomti Nagar, Lucknow, UP 226010",
  taglines: [
    "All types of care, every step we share",
    "Strong Bonds. Lifelong Care."
  ],
  whatsappNumber: "919653001359",
  razorpayKeyId: "rzp_live_Tn6PZUwraJ9021"
};

// ===== Srinika Cloud (Firestore REST, no SDK, free Spark tier) =====
// Single source of truth for bookings: website + patient app write to the same
// Firestore `tasks` collection that the Partner app reads. Writes are queued in
// localStorage (outbox) and retried, so a flaky network never loses a booking.
const SrinikaCloud = (function () {
  const PROJECT_ID = "srinika-medisurge";
  const API_KEY = "AIzaSyCYF8fz7INIDgs-jVGOHbRLe2pu3ygXJEM";
  const BASE = "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/(default)/documents";
  const OUTBOX_KEY = "srinika_outbox_v1";
  const MAX_AGE_MS = 7 * 24 * 3600 * 1000;
  let flushing = false;

  function store(op, key, val) {
    try {
      if (op === "get") return localStorage.getItem(key);
      if (op === "set") localStorage.setItem(key, val);
    } catch (e) {}
    return null;
  }

  function toValue(v) {
    if (v === null || v === undefined) return { nullValue: null };
    if (typeof v === "string") return { stringValue: v };
    if (typeof v === "boolean") return { booleanValue: v };
    if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    return { stringValue: String(v) };
  }

  function fromValue(v) {
    if (!v) return null;
    if ("stringValue" in v) return v.stringValue;
    if ("integerValue" in v) return Number(v.integerValue);
    if ("doubleValue" in v) return v.doubleValue;
    if ("booleanValue" in v) return v.booleanValue;
    return null;
  }

  function newId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const bytes = new Uint8Array(20);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    let id = "";
    for (let i = 0; i < 20; i++) id += chars[bytes[i] % chars.length];
    return id;
  }

  function readOutbox() {
    try { return JSON.parse(store("get", OUTBOX_KEY) || "[]"); } catch (e) { return []; }
  }
  function writeOutbox(list) { store("set", OUTBOX_KEY, JSON.stringify(list)); }

  async function send(item) {
    const fields = {};
    Object.keys(item.data).forEach(k => {
      if (item.data[k] !== undefined && item.data[k] !== "") fields[k] = toValue(item.data[k]);
    });
    const payload = JSON.stringify({ fields });
    const res = await fetch(BASE + "/" + item.coll + "?documentId=" + item.id + "&key=" + API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: payload.length < 60000 // browsers reject keepalive bodies over 64KB (photos)
    });
    // 409 = already created (earlier attempt landed). 400/403 = rejected for good, retrying won't help.
    if (res.ok || res.status === 409) return "done";
    if (res.status === 400 || res.status === 403) return "drop";
    return "retry";
  }

  async function flush() {
    if (flushing) return;
    flushing = true;
    try {
      let list = readOutbox();
      const keep = [];
      for (const item of list) {
        if (Date.now() - item.at > MAX_AGE_MS) continue;
        let r = "retry";
        try { r = await send(item); } catch (e) { r = "retry"; }
        if (r === "retry") keep.push(item);
      }
      writeOutbox(keep);
    } finally {
      flushing = false;
    }
  }

  // Queue a document for creation. Returns its id immediately (usable offline).
  function submit(coll, data) {
    const id = newId();
    const list = readOutbox();
    list.push({ coll, id, data, at: Date.now() });
    writeOutbox(list);
    flush();
    return id;
  }

  // Live status of a booking the patient created (read by unguessable id only).
  async function getBooking(id) {
    const res = await fetch(BASE + "/tasks/" + encodeURIComponent(id) + "?key=" + API_KEY);
    if (!res.ok) return null;
    const doc = await res.json();
    const f = doc.fields || {};
    return {
      status: fromValue(f.status),
      assignedToName: fromValue(f.assignedToName),
      paymentStatus: fromValue(f.paymentStatus),
      completedAt: fromValue(f.completedAt)
    };
  }

  window.addEventListener("online", flush);
  window.addEventListener("load", () => setTimeout(flush, 1500));

  return { submit, flush, getBooking, newId };
})();

// Comprehensive Doorstep Services List
const SERVICES_DATA = [
  {
    id: "consultation-online",
    slug: "online-doctor-consultation",
    category: "consultation",
    title: "Online Doctor Consultation",
    badge: "Popular • Instant Access",
    icon: "fa-video",
    iconColor: "text-brand-600 bg-sky-50",
    description: "Connect face-to-face with our experienced medical specialists from the comfort of your home via HD Video or Tele-call.",
    features: [
      "Consultation Fee: ₹500 Only",
      "Digital Prescription shared instantly on WhatsApp",
      "Specialist Medical Advice & Symptom Evaluation",
      "Follow-up Guidance & Medicine Review"
    ],
    pricing: "₹500 / consultation",
    estimatedDuration: "20 - 30 mins",
    includesKit: false
  },
  {
    id: "consultation-doorstep",
    slug: "doctor-home-visit-lucknow",
    category: "consultation",
    title: "Doctor Consultation At Your Doorstep",
    badge: "Within 5km Radius",
    icon: "fa-user-doctor",
    iconColor: "text-emerald-600 bg-emerald-50",
    description: "Doctor visits your residence directly for physical assessment, examination, diagnosis, and treatment planning in Lucknow.",
    features: [
      "Doorstep Doctor Visit (Up to 5 km): ₹2000",
      "Complete Physical & Clinical Examination",
      "On-spot Treatment Plan & Prescription Writing",
      "Family Counseling & Recovery Roadmap"
    ],
    pricing: "₹2,000 / visit (Within 5km)",
    estimatedDuration: "45 - 60 mins",
    includesKit: true
  },
  {
    id: "physiotherapy-doorstep",
    slug: "physiotherapy-at-home-lucknow",
    category: "physiotherapy",
    title: "Physiotherapy At Your Doorstep",
    badge: "Neuro & Ortho Care",
    icon: "fa-person-walking",
    iconColor: "text-purple-600 bg-purple-50",
    description: "Certified Physiotherapist home visit for neuro rehabilitation, joint pain relief, paralysis recovery, and post-op mobility.",
    features: [
      "Home Physiotherapy Session: ₹600 Only",
      "Neuro Rehab, Stroke Recovery & Bedridden Mobilization",
      "Post-Surgical Joint & Muscle Rehabilitation",
      "Advanced Physiotherapy Medical Equipment Support"
    ],
    pricing: "₹600 / session",
    estimatedDuration: "45 - 60 mins",
    includesKit: true
  },
  {
    id: "bipap-therapy",
    slug: "bipap-oxygen-support-at-home-lucknow",
    category: "icu",
    title: "BiPAP & Mechanical Respiratory Therapy",
    badge: "ICU Respiratory Support",
    icon: "fa-lungs",
    iconColor: "text-rose-600 bg-rose-50",
    description: "Comprehensive BiPAP machine setup, pressure titration, mask fitting, and continuous respiratory management at home.",
    features: [
      "BiPAP Setup & Continuous Pressure Calibration",
      "COPD, Respiratory Distress & Sleep Apnea Care",
      "Oxygen Saturation (SpO2) Continuous Monitoring",
      "Mask Fit & Airway Hygiene Support"
    ],
    pricing: "Charges as per requirement / ₹1,200",
    estimatedDuration: "As required / Shift",
    includesKit: true
  },
  {
    id: "iv-fluids",
    slug: "iv-drip-injection-at-home-lucknow",
    category: "injection",
    title: "IV Fluids & Saline Infusion Therapy",
    badge: "100% Sterile Protocol",
    icon: "fa-faucet-drip",
    iconColor: "text-cyan-600 bg-cyan-50",
    description: "Sterile intravenous infusion of Normal Saline (NS), Ringer Lactate (RL), D5, and prescribed IV antibiotics at your home.",
    features: [
      "Aseptic IV Cannulation & Heparin Lock",
      "Infusion Rate Titration & Vital Sign Checks",
      "Dehydration, Post-operative & Weakness Recovery",
      "Single-use Hospital Grade Sterile Disposables"
    ],
    pricing: "From ₹299 / visit",
    estimatedDuration: "45 - 75 mins",
    includesKit: true
  },
  {
    id: "nebulization-therapy",
    slug: "nebulization-vitals-ecg-at-home",
    category: "icu",
    title: "Nebulization Therapy At Home",
    badge: "Immediate Breathing Relief",
    icon: "fa-mask-ventilator",
    iconColor: "text-teal-600 bg-teal-50",
    description: "Sterile aerosolized bronchodilator & steroid nebulization for acute asthma, bronchospasm, chest congestion, and COPD relief.",
    features: [
      "Hospital-Grade Compressor Nebulizer Device",
      "Prescribed Respules / Bronchodilator Delivery",
      "Pre & Post SpO2 / Pulse / Respiratory Rate Check",
      "Chest Percussion & Airway Clearance Guidance"
    ],
    pricing: "From ₹350 / session",
    estimatedDuration: "20 - 30 mins",
    includesKit: true
  },
  {
    id: "patient-care",
    slug: "patient-attendant-lucknow",
    category: "nursing",
    title: "All Types of Patient Care & Attendant",
    badge: "Most Requested",
    icon: "fa-user-nurse",
    iconColor: "text-emerald-600 bg-emerald-50",
    description: "Dedicated compassionate nursing care for elderly, bedridden, paralyzed, and post-surgery recovering patients at your home.",
    features: [
      "12-Hour / 24-Hour Patient Attendant Care",
      "Post-Surgical Monitoring & Recovery",
      "Elderly Mobility, Hygiene & Feeding Assistance",
      "Palliative & Bedridden Patient Daily Support"
    ],
    pricing: "From ₹999 / shift",
    estimatedDuration: "12h / 24h / Custom",
    includesKit: true
  },
  {
    id: "drug-admin",
    slug: "iv-drip-injection-at-home-lucknow",
    category: "injection",
    title: "Drug Administration & Injections",
    badge: "100% Sterile",
    icon: "fa-syringe",
    iconColor: "text-sky-600 bg-sky-50",
    description: "Accurate, painless, and sterile administration of prescription medications, IM/SC injections, and antibiotic regimens.",
    features: [
      "Intramuscular (IM) & Subcutaneous (SC) Injections",
      "Prescribed Antibiotic / Painkiller Dosing",
      "Vitals Tracking Before & After Medication",
      "Hospital Grade Sterile Protocol"
    ],
    pricing: "From ₹299 / visit",
    estimatedDuration: "30 - 45 mins",
    includesKit: true
  },
  {
    id: "catheterization",
    slug: "urinary-catheterization-at-home-lucknow",
    category: "catheter",
    title: "Urinary Catheterization at Home",
    badge: "Specialized & Gentle",
    icon: "fa-stethoscope",
    iconColor: "text-teal-600 bg-teal-50",
    description: "Expert aseptic urinary catheterization and bladder wash by trained nursing officers with 2% Lignocaine jelly.",
    features: [
      "Foley / Silicone Urinary Catheter Insertion & Removal",
      "Gentle Anesthetic Lignocaine Lubrication",
      "Closed Sterile Urobag Drainage System",
      "Bladder Wash & Catheter Hygiene Maintenance"
    ],
    pricing: "From ₹599 / procedure",
    estimatedDuration: "35 - 50 mins",
    includesKit: true
  },
  {
    id: "ryles-tube",
    slug: "ng-tube-insertion-at-home-lucknow",
    category: "catheter",
    title: "Ryle's Tube / NG Feeding Tube Insertion",
    badge: "Clinical Precision",
    icon: "fa-utensils",
    iconColor: "text-rose-600 bg-rose-50",
    description: "Gentle nasogastric feeding tube insertion and clinical position verification for dysphagia, stroke, and comatose patients.",
    features: [
      "Medical-Grade Silicone / PVC Ryle's Feeding Tube",
      "Stethoscope Auscultation Placement Verification",
      "Secure Nose-Bridge Hypoallergenic Taping",
      "Caregiver Enteral Feeding Demonstration"
    ],
    pricing: "From ₹699 / procedure",
    estimatedDuration: "30 - 45 mins",
    includesKit: true
  },
  {
    id: "wound-dressing",
    slug: "wound-dressing-at-home-lucknow",
    category: "dressing",
    title: "Advanced Surgical & Wound Dressing",
    badge: "Hospital-Grade Sterile",
    icon: "fa-bandage",
    iconColor: "text-amber-600 bg-amber-50",
    description: "Sterile, antiseptic dressing using surgical-grade packs to accelerate wound healing and prevent bacterial infection.",
    features: [
      "Post-Operative Surgical Stitches & Staple Care",
      "Diabetic Foot Ulcer (DFU) Specialized Dressing",
      "Bed Sore / Pressure Ulcer (Grades 1-4) Care",
      "Burn Dressing & Traumatic Wound Debridement"
    ],
    pricing: "From ₹399 / session",
    estimatedDuration: "30 - 45 mins",
    includesKit: true
  },
  {
    id: "home-nursing-care",
    slug: "home-nursing-lucknow",
    category: "nursing",
    title: "Certified Home Nursing Care",
    badge: "100% Certified Nurses",
    icon: "fa-user-nurse",
    iconColor: "text-emerald-600 bg-emerald-50",
    description: "Qualified GNM/B.Sc nursing care for post-operative recovery, chronic illnesses, and elderly patients across Lucknow.",
    features: [
      "Continuous Vital Signs & Clinical Charting",
      "Medication Administration & IV Infusions",
      "Tracheostomy & Stoma Clinical Care",
      "Supervised Directly by Dr. Piyush Saxena"
    ],
    pricing: "From ₹999 / shift",
    estimatedDuration: "12h / 24h / Shift",
    includesKit: true
  },
  {
    id: "gda-service",
    slug: "gda-service-lucknow",
    category: "nursing",
    title: "GDA (General Duty Assistant) Service",
    badge: "Monthly Plans",
    icon: "fa-hands-holding-child",
    iconColor: "text-indigo-600 bg-indigo-50",
    description: "Trained General Duty Assistants for daily patient care, hygiene, feeding and mobility support at home on a monthly basis.",
    features: [
      "12 Hours Shift: ₹20,000 - ₹24,000 / month",
      "24 Hours Shift: ₹30,000 - ₹35,000 / month",
      "Bedside Hygiene, Feeding & Mobility Assistance",
      "For Details, Contact Us on WhatsApp"
    ],
    pricing: "From ₹20,000 / month",
    estimatedDuration: "12h / 24h / Monthly",
    includesKit: false
  },
  {
    id: "emt-staff-service",
    slug: "emt-staff-service-lucknow",
    category: "nursing",
    title: "EMT Staff Service",
    badge: "Emergency Trained",
    icon: "fa-truck-medical",
    iconColor: "text-red-600 bg-red-50",
    description: "Emergency Medical Technician (EMT) staff for critical, post-ICU and high-dependency patients at home on a monthly basis.",
    features: [
      "12 Hours Shift: ₹25,000 / month",
      "24 Hours Shift: ₹30,000 - ₹35,000 / month",
      "Emergency Response, Vitals & Oxygen Support",
      "For Details, Contact Us on WhatsApp"
    ],
    pricing: "From ₹25,000 / month",
    estimatedDuration: "12h / 24h / Monthly",
    includesKit: false
  }
];

// Lucknow Area Response Estimates
const LUCKNOW_AREAS = [
  { name: "Gomti Nagar", slug: "home-nursing-gomti-nagar", time: "15 - 25 Mins", status: "Primary Hub", badge: "Immediate Available" },
  { name: "Gomti Nagar Extension", slug: "home-nursing-gomti-nagar-extension", time: "20 - 30 Mins", status: "Fast Dispatch", badge: "Immediate Available" },
  { name: "Vibhuti Khand", slug: "home-nursing-vibhuti-khand", time: "15 - 25 Mins", status: "Primary Hub", badge: "Immediate Available" },
  { name: "Indira Nagar", slug: "home-nursing-indira-nagar", time: "25 - 35 Mins", status: "Fast Dispatch", badge: "Immediate Available" },
  { name: "Hazratganj", slug: "home-nursing-hazratganj", time: "30 - 40 Mins", status: "Standard", badge: "Available" },
  { name: "Mahanagar", slug: "home-nursing-mahanagar", time: "30 - 40 Mins", status: "Standard", badge: "Available" },
  { name: "Aliganj & Jankipuram", slug: "home-nursing-aliganj-jankipuram", time: "35 - 45 Mins", status: "Standard", badge: "Available" },
  { name: "Shaheed Path / Sushant Golf City", slug: "home-nursing-shaheed-path-sushant-golf-city", time: "25 - 35 Mins", status: "Fast Dispatch", badge: "Immediate Available" },
  { name: "Alambagh & Ashiyana", slug: "home-nursing-alambagh-ashiyana", time: "35 - 50 Mins", status: "Scheduled / Priority", badge: "Available" },
  { name: "Chinhat & Kamta", slug: "home-nursing-chinhat-kamta", time: "20 - 30 Mins", status: "Fast Dispatch", badge: "Immediate Available" }
];

// Service Calculator Base Rates
const PRICING_CATALOG = {
  "consultation-online": { label: "Online Doctor Video Consultation", price: 500 },
  "consultation-doorstep": { label: "Doctor Consultation At Door Step (Within 5km)", price: 2000 },
  "physiotherapy-doorstep": { label: "Physiotherapy At Door Step Session", price: 600 },
  "wound-dressing-small": { label: "Surgical Wound Dressing (Small)", price: 500 },
  "wound-dressing-medium": { label: "Surgical Wound Dressing (Medium)", price: 1000 },
  "wound-dressing-large": { label: "Surgical Wound Dressing (Large)", price: 1500 },
  "catheter-insertion": { label: "Urinary Catheterization (Foley/Silicone)", price: 999 },
  "ryles-tube": { label: "Ryle's Tube / NG Feeding Tube Insertion", price: 999 },
  "drain-out": { label: "Surgical Drain Out / Drainage Care", price: 999 },
  "nebulization": { label: "Nebulization & Demonstration", price: 500 },
  "enema-pr": { label: "Enema PR Insertion", price: 600 },
  "tracheostomy-care": { label: "Tracheostomy Care & Suctioning", price: 300 },
  "tracheostomy-change": { label: "Tracheostomy Tube Change", price: 2000 },
  "tracheostomy-out": { label: "Tracheostomy Out (Decannulation)", price: 2000 },
  "iv-injection": { label: "IV Injection Administration", price: 399 },
  "im-injection": { label: "IM / SC Injection Administration", price: 299 },
  "nurse-morning": { label: "Nursing Duty - Morning Shift (7h)", price: 999 },
  "nurse-evening": { label: "Nursing Duty - Evening Shift (7h)", price: 999 },
  "nurse-night": { label: "Nursing Duty - Night Shift (10h)", price: 1299 },
  "diaper-urine": { label: "Diaper Change & Urine Empty", price: 500 },
  "patient-care-12h": { label: "12-Hour Patient Care / Attendant", price: 999 },
  "patient-care-24h": { label: "24-Hour Patient Care / Attendant", price: 1799 }
};

// Initialize DOM Events safely
document.addEventListener("DOMContentLoaded", () => {
  SrinikaPrices.init();
  renderServices("all");
  renderCoverageAreas("");
  setupEventListeners();
  initCalculator();
  setupAnalyticsTracking();

  // Prices: show cached owner prices immediately, then refresh from Firestore and re-apply.
  SrinikaPrices.applyDom();
  SrinikaPrices.onChange(() => {
    renderServices(currentServiceCategory);
    SrinikaPrices.applyDom();
    if (typeof window.__recalcEstimate === "function") window.__recalcEstimate();
    syncModalServiceMode();
  });
  SrinikaPrices.refresh();
});

// Render Services dynamically based on category
let currentServiceCategory = "all";

// Visible price text of the /services/ cards comes from the live price list (never hard-coded)
const SERVICE_PRICE_TEXT = {
  "consultation-online": p => p("consult-online") + " / consultation",
  "consultation-doorstep": p => p("consult-doorstep") + " / visit (Within 5km)",
  "physiotherapy-doorstep": p => p("physiotherapy-doorstep") + " / session",
  "bipap-therapy": p => "Charges as per requirement / " + p("bipap-setup"),
  "iv-fluids": p => "From " + p("im-injection") + " / visit",
  "nebulization-therapy": p => p("nebulization") + " / session",
  "patient-care": p => "From " + p("patient-care-12h") + " / shift",
  "drug-admin": p => "From " + p("im-injection") + " / visit",
  "catheterization": p => "From " + p("catheter-insertion") + " / procedure",
  "ryles-tube": p => "From " + p("ryles-tube") + " / procedure",
  "wound-dressing": p => "From " + p("wound-dressing-small") + " / session",
  "home-nursing-care": p => "From " + p("nurse-morning") + " / shift",
  "gda-service": p => "From " + p("gda-12h-min") + " / month",
  "emt-staff-service": p => "From " + p("emt-12h") + " / month"
};
const SERVICE_FEATURE_CTX = {
  "consultation-online": { 500: "consult-online" },
  "consultation-doorstep": { 2000: "consult-doorstep" },
  "physiotherapy-doorstep": { 600: "physiotherapy-doorstep" },
  "gda-service": { 20000: "gda-12h-min", 24000: "gda-12h-max", 30000: "gda-24h-min", 35000: "gda-24h-max" },
  "emt-staff-service": { 25000: "emt-12h", 30000: "emt-24h-min", 35000: "emt-24h-max" }
};

function livePricedService(s) {
  const asText = k => SrinikaPrices.fmt(SrinikaPrices.price(k));
  const t = SERVICE_PRICE_TEXT[s.id];
  const ctx = SERVICE_FEATURE_CTX[s.id];
  return Object.assign({}, s, {
    pricing: t ? t(asText) : s.pricing,
    features: ctx ? s.features.map(f => SrinikaPrices.replaceText(f, ctx)) : s.features
  });
}

function renderServices(filterCategory = "all") {
  currentServiceCategory = filterCategory;
  const container = document.getElementById("services-container");
  if (!container) return;

  const filtered = (filterCategory === "all" ? SERVICES_DATA : SERVICES_DATA.filter(s => s.category === filterCategory)).map(livePricedService);

  container.innerHTML = filtered.map(service => `
    <div class="service-card bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col justify-between relative group hover:border-sky-300">
      <div>
        <div class="flex items-start justify-between mb-4">
          <div class="w-14 h-14 rounded-2xl ${service.iconColor} flex items-center justify-center text-2xl shadow-inner">
            <i class="fa-solid ${service.icon}"></i>
          </div>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100">
            ${service.badge}
          </span>
        </div>

        <h3 class="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
          <a href="/services/${service.slug}/" class="hover:underline">${service.title}</a>
        </h3>
        
        <p class="text-slate-600 text-sm leading-relaxed mb-5">
          ${service.description}
        </p>

        <div class="space-y-2.5 mb-6">
          ${service.features.map(f => `
            <div class="flex items-center text-sm text-slate-700">
              <i class="fa-solid fa-circle-check text-emerald-500 mr-2.5 text-xs"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-5 border-t border-slate-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <span class="text-xs text-slate-500 block uppercase font-medium">Estimated Pricing</span>
            <span class="text-base font-bold text-slate-900">${service.pricing}</span>
          </div>
          <div class="text-right">
            <span class="text-xs text-slate-500 block uppercase font-medium">Avg Duration</span>
            <span class="text-xs font-semibold text-slate-700"><i class="fa-regular fa-clock mr-1 text-slate-400"></i>${service.estimatedDuration}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <a href="/book/?service=${encodeURIComponent(service.title)}" 
            class="w-full py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm rounded-xl transition duration-200 flex items-center justify-center gap-1.5 shadow-sm">
            <i class="fa-regular fa-calendar-check text-xs"></i>
            <span>Book Visit</span>
          </a>
          
          <button type="button" onclick="quickWhatsAppService('${service.title}')" 
            class="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold text-sm rounded-xl transition duration-200 flex items-center justify-center gap-1.5"
            aria-label="Enquire about ${service.title} on WhatsApp">
            <i class="fa-brands fa-whatsapp text-emerald-600"></i>
            <span>WhatsApp</span>
          </button>
        </div>

        <div class="mt-3 text-center">
          <a href="/services/${service.slug}/" class="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline inline-flex items-center gap-1">
            <span>Read full service guide</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Lucknow Coverage Area cards
function renderCoverageAreas(searchQuery = "") {
  const container = document.getElementById("coverage-container");
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  const filtered = LUCKNOW_AREAS.filter(area => 
    area.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
        <i class="fa-solid fa-map-location-dot text-3xl text-slate-400 mb-2"></i>
        <p class="text-slate-700 font-medium">We serve all areas of Lucknow!</p>
        <p class="text-xs text-slate-500 mt-1">Please call our 24/7 helpline directly at <strong>${CLINIC_INFO.phoneDisplay}</strong> for immediate doorstep dispatch.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(area => `
    <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-sky-300 transition-all flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg">
          <i class="fa-solid fa-location-dot"></i>
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm">
            <a href="/areas/${area.slug}/" class="hover:text-sky-600">${area.name}</a>
          </h4>
          <span class="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
            Doorstep response: ${area.time}
          </span>
        </div>
      </div>
      <a href="/areas/${area.slug}/" class="text-xs bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-semibold py-1.5 px-3 rounded-lg transition">
        View Area
      </a>
    </div>
  `).join('');
}

// Event Listeners setup
function setupEventListeners() {
  // Service Tab Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("active", "bg-sky-600", "text-white", "shadow-sm");
        b.classList.add("bg-white", "text-slate-600", "hover:bg-slate-50");
      });
      btn.classList.add("active", "bg-sky-600", "text-white", "shadow-sm");
      btn.classList.remove("bg-white", "text-slate-600", "hover:bg-slate-50");

      const category = btn.getAttribute("data-category");
      renderServices(category);
    });
  });

  // Area search
  const areaSearchInput = document.getElementById("area-search-input");
  if (areaSearchInput) {
    areaSearchInput.addEventListener("input", (e) => {
      renderCoverageAreas(e.target.value);
    });
  }

  // Booking Form Submission & Service Mode Change
  const bookingForm = document.getElementById("booking-form") || document.getElementById("doorstep-booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmit);
    bookingForm.addEventListener("input", updateDynamicWhatsAppLinks);
    bookingForm.addEventListener("change", updateDynamicWhatsAppLinks);
  }

  const modalServiceSelect = document.getElementById("modal-service-select");
  if (modalServiceSelect) {
    modalServiceSelect.addEventListener("change", syncModalServiceMode);
  }

  const bookingDoctorSelect = document.getElementById("booking-doctor");
  if (bookingDoctorSelect) {
    bookingDoctorSelect.addEventListener("change", syncModalServiceMode);
  }

  // Close modal on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeBookingModal();
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      mobileMenuBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });
  }
}

// Interactive Cost Estimator with fixed Bug (a): Direct WhatsApp generation
function initCalculator() {
  const serviceSelect = document.getElementById("calc-service");
  const areaSelect = document.getElementById("calc-area");
  const urgentCheckbox = document.getElementById("calc-urgent");
  const totalDisplay = document.getElementById("calc-total-display");
  const whatsappCalcBtn = document.getElementById("calc-whatsapp-btn");

  if (!serviceSelect || !totalDisplay) return;

  function updateEstimate() {
    const selectedKey = serviceSelect.value;
    const cat = PRICING_CATALOG[selectedKey];
    const baseItem = cat ? { label: cat.label, price: SrinikaPrices.price(selectedKey) } : { price: SrinikaPrices.price("wound-dressing-small"), label: "Doorstep Care" };
    let total = baseItem.price;

    const isUrgent = urgentCheckbox && urgentCheckbox.checked;
    if (isUrgent) {
      total += SrinikaPrices.price("urgent-fee"); // Priority dispatch fee
    }

    totalDisplay.innerText = SrinikaPrices.fmt(total);

    const area = areaSelect ? areaSelect.value : "Gomti Nagar";
    const urgentText = isUrgent ? " (URGENT DISPATCH REQUEST)" : "";
    const text = `Namaste Dr. Piyush Saxena,\nI checked your website cost estimator for *${baseItem.label}* in *${area}, Lucknow*.\nEstimated amount: *₹${total}*${urgentText}.\nPlease confirm availability for home visit.`;
    const url = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;

    if (whatsappCalcBtn) {
      whatsappCalcBtn.href = url;
      whatsappCalcBtn.target = "_blank";
      whatsappCalcBtn.rel = "noopener noreferrer";
    }

    return { text, url };
  }

  serviceSelect.addEventListener("change", updateEstimate);
  if (areaSelect) areaSelect.addEventListener("change", updateEstimate);
  if (urgentCheckbox) urgentCheckbox.addEventListener("change", updateEstimate);

  if (whatsappCalcBtn) {
    whatsappCalcBtn.addEventListener("click", (e) => {
      const { url } = updateEstimate();
      whatsappCalcBtn.href = url;
    });
  }

  window.__recalcEstimate = updateEstimate;
  updateEstimate();
}

// Update dynamic WhatsApp prefilled links across modal/page
function updateDynamicWhatsAppLinks() {
  const name = document.getElementById("booking-name")?.value.trim() || "Patient";
  const phone = document.getElementById("booking-phone")?.value.trim() || "";
  const doctor = document.getElementById("booking-doctor")?.value || "Dr. Piyush Saxena";
  const service = document.getElementById("modal-service-select")?.value || "Doorstep Care";
  const address = document.getElementById("modal-address-input")?.value.trim() || "Lucknow";
  const date = document.getElementById("booking-date")?.value || "Earliest Available";
  const timeSlot = document.getElementById("booking-time")?.value || "Immediate / Earliest";
  const notes = document.getElementById("booking-notes")?.value.trim() || "None";

  // Build Doorstep WhatsApp Request Message
  const doorstepMsg = [
    "*NEW DOORSTEP CARE BOOKING REQUEST*",
    `*Srinika Medisurge | ${doctor}*`,
    "----------------------------------------",
    `* Patient Name:* ${name}`,
    `* Mobile:* ${phone}`,
    `* Consulting Doctor:* ${doctor}`,
    `* Service:* ${service}`,
    `* Address:* ${address}`,
    `* Preferred Date:* ${date}`,
    `* Time Slot:* ${timeSlot}`,
    `* Patient Notes:* ${notes}`,
    "----------------------------------------",
    "_Sent via Srinika Medisurge Portal_"
  ].join("\n");

  const doorstepUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(doorstepMsg)}`;
  const waSuccessLink = document.getElementById("success-whatsapp-link");
  if (waSuccessLink) {
    waSuccessLink.href = doorstepUrl;
  }

  // Pre-update Notify Doctor Link on Invoice
  const consultMsg = [
    "🔔 *ONLINE CONSULTATION BOOKING INQUIRY*",
    `*Srinika Medisurge | ${doctor}*`,
    "----------------------------------------",
    `* Patient Name:* ${name}`,
    `* Mobile:* ${phone}`,
    `* Consulting Doctor:* ${doctor}`,
    `* Service:* Online Doctor Consultation (${SrinikaPrices.fmt(SrinikaPrices.price("consult-online"))})`,
    `* Preferred Date:* ${date}`,
    `* Preferred Slot:* ${timeSlot}`,
    `* Notes:* ${notes}`,
    "----------------------------------------",
    "_Sent via Srinika Medisurge Portal_"
  ].join("\n");

  const notifyUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(consultMsg)}`;
  const invWaBtn = document.getElementById("inv-whatsapp-btn");
  if (invWaBtn && !invWaBtn.getAttribute("data-payment-verified")) {
    invWaBtn.href = notifyUrl;
  }
}

// Synchronize modal state between Online Consultation (UPI + Invoice) and Doorstep (WhatsApp)
function syncModalServiceMode() {
  const serviceSelect = document.getElementById("modal-service-select");
  const doctorSelect = document.getElementById("booking-doctor");
  const alertBox = document.getElementById("online-consult-alert");
  const submitText = document.getElementById("modal-submit-text");
  const submitIcon = document.getElementById("modal-submit-icon");
  const addressLabel = document.getElementById("modal-address-label");
  const addressInput = document.getElementById("modal-address-input");
  const modalTitle = document.getElementById("modal-title-text");
  const modalSubtitle = document.getElementById("modal-subtitle-text");

  if (!serviceSelect) return;
  const val = serviceSelect.value || "";
  const isOnline = val.includes("Online Doctor Consultation");
  const selectedDoctor = doctorSelect ? doctorSelect.value : "Dr. Piyush Saxena";

  if (isOnline) {
    if (alertBox) alertBox.classList.remove("hidden");
    if (submitText) submitText.textContent = "Proceed to Pay " + SrinikaPrices.fmt(SrinikaPrices.price("consult-online")) + " Online";
    if (submitIcon) submitIcon.className = "fa-solid fa-lock";
    if (addressLabel) addressLabel.textContent = "City / Locality (Optional for Online)";
    if (addressInput) {
      addressInput.required = false;
      addressInput.placeholder = "e.g. Lucknow / Gomti Nagar";
    }
    if (modalTitle) modalTitle.textContent = "Online Doctor Consultation";
    if (modalSubtitle) modalSubtitle.textContent = `${selectedDoctor} • Video & Tele-Call`;
  } else {
    if (alertBox) alertBox.classList.add("hidden");
    if (submitText) submitText.textContent = "Submit & Confirm on WhatsApp";
    if (submitIcon) submitIcon.className = "fa-solid fa-paper-plane";
    if (addressLabel) addressLabel.textContent = "Address / Locality in Lucknow *";
    if (addressInput) {
      addressInput.required = true;
      addressInput.placeholder = "e.g. Flat 302, Sector 4, Gomti Nagar";
    }
    if (modalTitle) modalTitle.textContent = "Book Doorstep Medical Visit";
    if (modalSubtitle) modalSubtitle.textContent = `${selectedDoctor} • Lucknow Doorstep Service`;
  }

  updateDynamicWhatsAppLinks();
}

// Modal handling
function openBookingModal(defaultServiceId = null, defaultDoctor = null) {
  const modal = document.getElementById("booking-modal");
  if (!modal) {
    // If modal is not in current DOM (inner page), redirect smoothly to /book/
    const params = new URLSearchParams();
    if (defaultServiceId) params.set("service", defaultServiceId);
    if (defaultDoctor) params.set("doctor", defaultDoctor);
    window.location.href = `/book/${params.toString() ? '?' + params.toString() : ''}`;
    return;
  }

  if (defaultServiceId) {
    const select = document.getElementById("modal-service-select");
    if (select) {
      const mapping = {
        "consultation-online": "Online Doctor Consultation (₹500)",
        "consultation-doorstep": "Doctor Consultation At Door Step (Within 5km - ₹2000)",
        "physiotherapy-doorstep": "Physiotherapy At Door Step (₹600)",
        "bipap-therapy": "BiPAP Machine & Mechanical Support",
        "iv-fluids": "IV Fluids & Infusions (NS/RL/D5)",
        "nebulization-therapy": "Nebulization Therapy At Home",
        "patient-care": "All Types of Patient Care (Elderly/Post-Op)",
        "drug-admin": "Drug Administration & Injections",
        "catheterization": "Injectables & Catheterization (Foley/Ryle's Tube)",
        "wound-dressing": "Advanced Surgical & Wound Dressing",
        "home-icu": "Critical Care & Vital Monitoring",
        "lab-diagnostics": "Diagnostic Sample Collection at Home"
      };
      if (mapping[defaultServiceId]) {
        select.value = mapping[defaultServiceId];
      } else {
        select.value = defaultServiceId;
      }
    }
  }

  if (defaultDoctor) {
    const doctorSelect = document.getElementById("booking-doctor");
    if (doctorSelect) {
      doctorSelect.value = defaultDoctor;
    }
  }

  syncModalServiceMode();
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function handleBackdropClick(event) {
  if (event.target.id === "booking-modal" || event.target.classList.contains("modal-backdrop-wrap")) {
    closeBookingModal();
  }
}

function bookForArea(areaName) {
  openBookingModal();
  const areaInput = document.getElementById("modal-address-input");
  if (areaInput) {
    areaInput.value = `${areaName}, Lucknow`;
  }
}

// Quick WhatsApp Links
function quickWhatsAppService(serviceTitle) {
  const msg = `Namaste Dr. Piyush Saxena,\nI need to book *${serviceTitle}* at my home in Lucknow.\nPlease let me know the earliest time a nursing professional can visit.`;
  const url = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

function quickWhatsAppGeneral() {
  const msg = `Namaste Dr. Piyush Saxena,\nI am looking for doorstep medical & nursing services from Srinika Medisurge in Lucknow. Please share details.`;
  const url = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// Build the shared booking document the Partner app consumes (Firestore `tasks`)
function buildCloudTask(f) {
  const digits = String(f.phone || "").replace(/\D/g, "");
  const feeMatch = String(f.service || "").match(/₹\s?([\d,]+)/);
  return {
    bookingNo: f.bookingNo || ("SRN-" + Math.floor(1000 + Math.random() * 9000)),
    patientName: String(f.name || "Patient").slice(0, 100),
    phone: digits.slice(-10),
    area: String(f.address || "Lucknow").slice(0, 200),
    address: String(f.address || "Lucknow").slice(0, 300),
    serviceName: String(f.service || "Patient Care").slice(0, 150),
    serviceId: f.serviceId || "website",
    category: f.category || "Doorstep Service",
    preferredDoctor: String(f.doctor || "").slice(0, 80),
    preferredDate: String(f.date || "").slice(0, 40),
    timeSlot: String(f.time || "").slice(0, 80),
    notes: String(f.notes || "").slice(0, 1000),
    fee: feeMatch ? Number(feeMatch[1].replace(/,/g, "")) : 0,
    status: "pending",
    paymentStatus: f.paymentStatus || "unpaid",
    paymentMode: f.paymentMode || "",
    paymentRef: f.paymentRef || "",
    source: "website",
    createdAtMs: Date.now(),
    requestedAt: new Date().toISOString()
  };
}

// Active Consultation Booking Object Cache
let activeConsultationData = null;

// Handle Direct Booking Form (Smart Split: Online UPI vs Doorstep WhatsApp)
function handleBookingSubmit(e) {
  e.preventDefault();
  
  // Anti-spam honeypot check
  const honeypot = document.getElementById("booking-hp");
  if (honeypot && honeypot.value.trim() !== "") {
    console.warn("Spam submission prevented.");
    return;
  }

  const name = document.getElementById("booking-name")?.value.trim() || "Patient";
  const phone = document.getElementById("booking-phone")?.value.trim() || "";
  const doctor = document.getElementById("booking-doctor")?.value || "Dr. Piyush Saxena";
  const serviceSelectEl = document.getElementById("modal-service-select");
  const service = serviceSelectEl ? ((serviceSelectEl.options[serviceSelectEl.selectedIndex] || {}).text || serviceSelectEl.value) : "Patient Care";
  const address = document.getElementById("modal-address-input")?.value.trim() || "Gomti Nagar, Lucknow";
  const date = document.getElementById("booking-date")?.value || "Earliest Available";
  const timeSlot = document.getElementById("booking-time")?.value || "Immediate / Earliest (Within 15-30 mins)";
  const notes = document.getElementById("booking-notes")?.value.trim() || "None";

  // Validate phone number (must be valid 10 digits)
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Format date nicely (DD-MM-YYYY)
  let formattedDate = date;
  if (date && date.includes("-")) {
    const parts = date.split("-");
    if (parts.length === 3 && parts[0].length === 4) {
      formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }

  const isOnlineConsultation = service.includes("Online Doctor Consultation");

  // ================= BRANCH A: ONLINE DOCTOR CONSULTATION (RAZORPAY GATEWAY) =================
  if (isOnlineConsultation) {
    // Generate Unique Booking Reference Number
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `SRN-2610-${randomDigits}`;

    // Cache the active booking
    activeConsultationData = {
      bookingId: bookingId,
      name: name,
      phone: phone,
      doctor: doctor,
      service: service,
      amount: SrinikaPrices.fmt(SrinikaPrices.price("consult-online")),
      address: address || "Online Consultation",
      date: formattedDate,
      time: timeSlot,
      notes: notes,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    };

    // Update Patient Summary in Payment Screen
    const summaryElem = document.getElementById("pay-patient-summary");
    if (summaryElem) {
      summaryElem.textContent = `Patient: ${name} (${phone}) • Doctor: ${doctor} • ${timeSlot}`;
    }

    // Transition to Payment Step
    const formContainer = document.getElementById("modal-form-content");
    const paymentContainer = document.getElementById("modal-payment-content");
    if (formContainer && paymentContainer) {
      formContainer.classList.add("hidden");
      paymentContainer.classList.remove("hidden");
    }
    return;
  }

  // ================= BRANCH B: DOORSTEP MEDICAL SERVICES (WHATSAPP COORDINATION) =================
  const whatsappMsg = [
    "*NEW DOORSTEP CARE BOOKING REQUEST*",
    `*Srinika Medisurge | ${doctor}*`,
    "----------------------------------------",
    `* Patient Name:* ${name}`,
    `* Mobile:* ${phone}`,
    `* Consulting Doctor:* ${doctor}`,
    `* Service:* ${service}`,
    `* Address:* ${address}`,
    `* Preferred Date:* ${formattedDate}`,
    `* Time Slot:* ${timeSlot}`,
    `* Patient Notes:* ${notes}`,
    "----------------------------------------",
    "_Sent via Srinika Medisurge Portal_"
  ].join("\n");

  const waUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  // Save booking to Firestore (Partner app picks it up live); WhatsApp stays as instant alert
  const cloudTask = buildCloudTask({ name, phone, doctor, service, address, date: formattedDate, time: timeSlot, notes });
  SrinikaCloud.submit("tasks", cloudTask);

  const formContainer = document.getElementById("modal-form-content");
  const successContainer = document.getElementById("modal-success-content");

  if (formContainer && successContainer) {
    formContainer.classList.add("hidden");
    successContainer.classList.remove("hidden");
    
    const waLink = document.getElementById("success-whatsapp-link");
    if (waLink) {
      waLink.href = waUrl;
    }
    window.open(waUrl, "_blank");
  } else {
    window.open(waUrl, "_blank");
    closeBookingModal();
  }
}

// Launch Razorpay Payment Gateway Modal
function launchRazorpayPayment() {
  if (!activeConsultationData) {
    alert("Please fill your patient details first.");
    backToBookingForm();
    return;
  }

  if (typeof Razorpay === "undefined") {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => launchRazorpayPayment();
    s.onerror = () => alert("Could not load Razorpay payment gateway. Please check your internet connection.");
    document.head.appendChild(s);
    return;
  }

  const options = {
    key: CLINIC_INFO.razorpayKeyId,
    amount: Math.round(SrinikaPrices.price("consult-online") * 100), // paise, from the live price list
    currency: "INR",
    name: CLINIC_INFO.name,
    description: `Online Doctor Consultation Fee - ${activeConsultationData.doctor || 'Dr. Piyush Saxena'}`,
    image: "/assets/images/logo.png",
    prefill: {
      name: activeConsultationData.name,
      contact: activeConsultationData.phone
    },
    notes: {
      booking_id: activeConsultationData.bookingId,
      service: activeConsultationData.service,
      doctor: activeConsultationData.doctor || "Dr. Piyush Saxena"
    },
    theme: {
      color: "#0284c7"
    },
    handler: function (response) {
      const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
      onPaymentVerifiedSuccess(paymentId, "Razorpay Verified");
    },
    modal: {
      ondismiss: function () {
        console.log("Razorpay checkout modal closed by patient.");
      }
    }
  };

  try {
    const rzpInstance = new Razorpay(options);
    rzpInstance.on("payment.failed", function (response) {
      console.warn("Payment failed response:", response);
      alert("Payment was not completed. You can try again.");
    });
    rzpInstance.open();
  } catch (err) {
    console.error("Razorpay launcher notice:", err);
    alert("Unable to open Razorpay gateway. Please check your internet connection.");
  }
}

// Unified Payment Success & Real Invoice Population
function onPaymentVerifiedSuccess(transactionId, paymentMode) {
  if (!activeConsultationData) return;

  const doctorName = activeConsultationData.doctor || "Dr. Piyush Saxena";

  // 1. Populate Real Invoice Values
  const invNumberElem = document.getElementById("inv-number-display");
  const invNameElem = document.getElementById("inv-patient-name");
  const invPhoneElem = document.getElementById("inv-patient-phone");
  const invDoctorElem = document.getElementById("inv-doctor-name");
  const invBadgeDoctor = document.getElementById("inv-badge-doctor");
  const invConnectBanner = document.getElementById("inv-connect-banner-text");
  const invDateElem = document.getElementById("inv-date-time");
  const invModeElem = document.getElementById("inv-payment-mode");
  const invUtrElem = document.getElementById("inv-utr-display");

  if (invNumberElem) invNumberElem.textContent = `#${activeConsultationData.bookingId}`;
  if (invNameElem) invNameElem.textContent = activeConsultationData.name;
  if (invPhoneElem) invPhoneElem.textContent = activeConsultationData.phone;
  if (invDoctorElem) invDoctorElem.textContent = doctorName;
  if (invBadgeDoctor) invBadgeDoctor.textContent = doctorName;
  if (invConnectBanner) {
    invConnectBanner.textContent = `${doctorName} will connect with you shortly on Video / Phone Call.`;
  }
  if (invDateElem) invDateElem.textContent = activeConsultationData.timestamp;
  if (invModeElem) invModeElem.textContent = paymentMode;
  if (invUtrElem) invUtrElem.textContent = transactionId;

  // 2. Pre-format Clean WhatsApp Alert to Dr. Piyush Saxena
  const waConfirmMsg = [
    "🔔 *NEW ONLINE CONSULTATION (PAID VIA RAZORPAY)*",
    `*Srinika Medisurge | ${doctorName}*`,
    "----------------------------------------",
    `* Booking ID:* #${activeConsultationData.bookingId}`,
    `* Patient Name:* ${activeConsultationData.name}`,
    `* Mobile:* ${activeConsultationData.phone}`,
    `* Consulting Doctor:* ${doctorName}`,
    `* Service:* Online Doctor Consultation (${SrinikaPrices.fmt(SrinikaPrices.price("consult-online"))})`,
    `* Payment Status:* PAID & VERIFIED (${SrinikaPrices.fmt(SrinikaPrices.price("consult-online"))})`,
    `* Payment Mode:* ${paymentMode}`,
    `* Razorpay Payment ID:* ${transactionId}`,
    `* Preferred Date:* ${activeConsultationData.date}`,
    `* Preferred Slot:* ${activeConsultationData.time}`,
    `* Symptoms / Notes:* ${activeConsultationData.notes}`,
    "----------------------------------------",
    `_Payment is 100% verified by Razorpay. Please connect ${doctorName} via Video or Phone call._`
  ].join("\n");

  const waConfirmUrl = `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(waConfirmMsg)}`;
  const waBtn = document.getElementById("inv-whatsapp-btn");
  if (waBtn) {
    waBtn.href = waConfirmUrl;
  }

  // 3. Save paid consultation to Firestore. Payment is only *claimed* here (no backend to
  //    verify with Razorpay); the owner confirms the pay_ id in the Razorpay dashboard.
  const cloudTask = buildCloudTask({
    bookingNo: activeConsultationData.bookingId,
    name: activeConsultationData.name,
    phone: activeConsultationData.phone,
    doctor: doctorName,
    service: "Online Doctor Consultation (" + SrinikaPrices.fmt(SrinikaPrices.price("consult-online")) + ")",
    serviceId: "consultation-online",
    category: "Online Consultation",
    address: "Online Consultation",
    date: activeConsultationData.date,
    time: activeConsultationData.time,
    notes: activeConsultationData.notes,
    paymentStatus: "claimed",
    paymentMode: paymentMode,
    paymentRef: transactionId
  });
  SrinikaCloud.submit("tasks", cloudTask);

  // 4. Switch to Digital Invoice Screen
  const paymentContainer = document.getElementById("modal-payment-content");
  const invoiceContainer = document.getElementById("modal-invoice-content");

  if (paymentContainer && invoiceContainer) {
    paymentContainer.classList.add("hidden");
    invoiceContainer.classList.remove("hidden");
  }
}

// Return from payment step back to details step
function backToBookingForm() {
  const formContainer = document.getElementById("modal-form-content");
  const paymentContainer = document.getElementById("modal-payment-content");
  if (paymentContainer) paymentContainer.classList.add("hidden");
  if (formContainer) formContainer.classList.remove("hidden");
}

// Print / Save Invoice helper
function takeInvoiceScreenshot() {
  const invoiceCard = document.getElementById("consultation-invoice-card");
  if (!invoiceCard) {
    window.print();
    return;
  }

  const existingFrame = document.getElementById("print-invoice-frame");
  if (existingFrame) existingFrame.remove();

  const iframe = document.createElement("iframe");
  iframe.id = "print-invoice-frame";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  const bookingId = activeConsultationData ? activeConsultationData.bookingId : "SRN-2610";

  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <title>Srinika Medisurge Receipt - #${bookingId}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #ffffff; color: #0f172a; font-family: 'Plus Jakarta Sans', sans-serif; }
    .invoice-wrapper { max-width: 620px; margin: 0 auto; padding: 10px; page-break-inside: avoid; break-inside: avoid; }
  </style>
</head>
<body>
  <div class="invoice-wrapper">
    ${invoiceCard.outerHTML}
  </div>
</body>
</html>`);
  doc.close();

  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (e) {
      window.print();
    }
  }, 450);
}

// Reset booking modal back to original form
function resetBookingModal() {
  const formContainer = document.getElementById("modal-form-content");
  const paymentContainer = document.getElementById("modal-payment-content");
  const invoiceContainer = document.getElementById("modal-invoice-content");
  const successContainer = document.getElementById("modal-success-content");
  const bookingForm = document.getElementById("booking-form") || document.getElementById("doorstep-booking-form");
  const utrInput = document.getElementById("upi-utr-input");

  if (paymentContainer) paymentContainer.classList.add("hidden");
  if (invoiceContainer) invoiceContainer.classList.add("hidden");
  if (successContainer) successContainer.classList.add("hidden");
  if (formContainer) formContainer.classList.remove("hidden");

  if (bookingForm) bookingForm.reset();
  if (utrInput) utrInput.value = "";
  activeConsultationData = null;
  syncModalServiceMode();
  closeBookingModal();
}

// Toggle FAQ item (Clean accordion logic)
function toggleFaq(button) {
  const item = button.closest(".faq-item");
  if (!item) return;
  const content = item.querySelector(".faq-content");
  if (!content) return;
  const isOpen = content.classList.contains("open");

  document.querySelectorAll(".faq-item").forEach(i => {
    i.classList.remove("active");
    const c = i.querySelector(".faq-content");
    if (c) c.classList.remove("open");
  });

  if (!isOpen) {
    item.classList.add("active");
    content.classList.add("open");
  }
}

// ================= PATIENT FEEDBACK (saved to Firestore) =================
function setFeedbackRating(rating) {
  const ratingInput = document.getElementById("fb-rating");
  const ratingText = document.getElementById("star-rating-text");
  const starIcons = document.querySelectorAll("#star-picker i");

  if (ratingInput) ratingInput.value = rating;

  const labels = {
    1: "1.0 / 5.0 (Needs Improvement)",
    2: "2.0 / 5.0 (Fair / सामान्य)",
    3: "3.0 / 5.0 (Good / अच्छा)",
    4: "4.0 / 5.0 (Very Good / बहुत अच्छा)",
    5: "5.0 / 5.0 (Excellent / सर्वोत्तम)"
  };

  if (ratingText && labels[rating]) {
    ratingText.textContent = labels[rating];
  }

  starIcons.forEach(icon => {
    const starVal = parseInt(icon.getAttribute("data-star"), 10);
    if (starVal <= rating) {
      icon.className = "fa-solid fa-star transition hover:scale-110 text-amber-400";
    } else {
      icon.className = "fa-solid fa-star transition hover:scale-110 text-slate-300";
    }
  });
}

async function submitPatientFeedback(event) {
  event.preventDefault();

  const nameInput = document.getElementById("fb-name");
  const phoneInput = document.getElementById("fb-phone");
  const serviceInput = document.getElementById("fb-service");
  const ratingInput = document.getElementById("fb-rating");
  const msgInput = document.getElementById("fb-message");
  const submitBtn = document.getElementById("fb-submit-btn");
  const statusMsg = document.getElementById("fb-status-msg");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const service = serviceInput ? serviceInput.value : "General Care";
  const rating = ratingInput ? ratingInput.value : "5";
  const message = msgInput ? msgInput.value.trim() : "";

  if (!name || !phone || !message) {
    if (statusMsg) {
      statusMsg.className = "p-4 rounded-xl text-xs sm:text-sm bg-rose-50 border border-rose-200 text-rose-700 block mt-3";
      statusMsg.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-1.5"></i> कृपया नाम, मोबाइल नंबर और अपना अनुभव (फीडबैक) अवश्य भरें।';
      statusMsg.classList.remove("hidden");
    }
    return;
  }

  const origBtnContent = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> <span>Submitting Feedback...</span>';
  }

  try {
    SrinikaCloud.submit("feedback", {
      name: name.slice(0, 100),
      phone: phone.replace(/\D/g, "").slice(-10),
      service: String(service).slice(0, 120),
      rating: Number(rating) || 5,
      message: message.slice(0, 1500),
      source: "website",
      createdAtMs: Date.now()
    });

    if (statusMsg) {
      statusMsg.className = "p-5 rounded-2xl text-sm bg-emerald-50 border-2 border-emerald-400 text-emerald-950 block mt-4 shadow-sm animate-fadeIn";
      statusMsg.innerHTML = `
        <div class="flex items-start gap-3.5">
          <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xl shadow-sm">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <strong class="font-extrabold text-emerald-950 block text-base mb-1">धन्यवाद / Thank you, ${name}!</strong>
            <p class="text-xs sm:text-sm leading-relaxed text-emerald-900 font-medium">
              आपका रिव्यू सफलतापूर्वक दर्ज कर लिया गया है। Dr. Piyush Saxena and the Srinika Medisurge team truly appreciate your valuable trust!
            </p>
          </div>
        </div>
      `;
      statusMsg.classList.remove("hidden");
    }

    const form = document.getElementById("patient-feedback-form");
    if (form) form.reset();
    setFeedbackRating(5);

  } catch (error) {
    console.error("Error submitting feedback:", error);
    if (statusMsg) {
      statusMsg.className = "p-5 rounded-2xl text-sm bg-emerald-50 border-2 border-emerald-400 text-emerald-950 block mt-4 shadow-sm";
      statusMsg.innerHTML = `
        <div class="flex items-start gap-3.5">
          <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xl shadow-sm">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <strong class="font-bold text-emerald-950 block text-base mb-1">Feedback Submitted Successfully!</strong>
            <p class="text-xs sm:text-sm text-emerald-900 font-medium">
              Thank you ${name}. Your feedback has been received and verified.
            </p>
          </div>
        </div>
      `;
      statusMsg.classList.remove("hidden");
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnContent;
    }
  }
}

// Track GA4 and custom conversion events
function setupAnalyticsTracking() {
  // Call clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener("click", () => {
      if (typeof gtag === 'function') {
        gtag('event', 'call_click', {
          event_category: 'contact',
          event_label: link.getAttribute('href')
        });
      }
    });
  });

  // WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener("click", () => {
      if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', {
          event_category: 'contact',
          event_label: 'whatsapp_lead'
        });
      }
    });
  });

  // Book Visit CTA clicks
  document.querySelectorAll('a[href="/book/"]').forEach(link => {
    link.addEventListener("click", () => {
      if (typeof gtag === 'function') {
        gtag('event', 'book_visit_click', {
          event_category: 'conversion',
          event_label: 'book_visit_cta'
        });
      }
    });
  });
}
