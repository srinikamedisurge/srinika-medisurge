const CONFIG = require('../../site.config.js');
const { askPriceLink, priceWhatsAppUrl } = require('./ask_price.js');

function renderPricingPage() {
  const priceCatalogList = [
    // Procedures
    { name: "Surgical Wound Dressing (Small)", category: "Surgical Dressing", details: "Hospital-grade sterile dressing, stitch care, and antiseptic cleaning for minor wounds/stitches." },
    { name: "Surgical Wound Dressing (Medium)", category: "Surgical Dressing", details: "Sterile dressing pack for post-operative incisions, laparotomy, or medium open wounds." },
    { name: "Surgical Wound Dressing (Large)", category: "Surgical Dressing", details: "Advanced sterile dressing for deep bed sores (Grade 3-4), diabetic ulcers, and extensive surgical sites." },
    { name: "Urinary Catheterization (Foley / Silicone)", category: "Catheter Care", details: "Aseptic Foley or 100% silicone catheter insertion/change with 2% Lignocaine jelly and sterile urobag." },
    { name: "Ryle's Tube / NG Feeding Tube Insertion", category: "Catheter Care", details: "Sterile nasogastric tube insertion, placement confirmation by auscultation, and feeding demonstration." },
    { name: "Surgical Drain Out / Drainage Care", category: "Surgical Care", details: "Sterile drain emptying, measuring fluid, bulb recharge, and sterile dressing at drain exit site." },
    { name: "Nebulization & Demonstration", category: "Respiratory Care", details: "Compressor nebulizer setup, bronchodilator respule administration, and chest recovery guidance." },
    { name: "Enema PR Insertion & Bowel Care", category: "Nursing Procedures", details: "Gentle PR enema administration, relief of fecal impaction, and post-procedure hygiene." },
    { name: "Tracheostomy Care & Suctioning", category: "Tracheostomy Care", details: "Inner cannula cleaning, sterile airway suctioning, stoma skin dressing, and tie change." },
    { name: "Tracheostomy Tube Change", category: "Tracheostomy Care", details: "Sterile tracheostomy tube replacement by experienced clinical staff under medical protocol." },
    { name: "Tracheostomy Out (Decannulation)", category: "Tracheostomy Care", details: "Clinical tube removal, stoma occlusion dressing, and post-decannulation respiratory monitoring." },
    { name: "IV Injection Administration", category: "Injections & IV", details: "Painless IV cannulation and intravenous drug administration with sterile disposable syringe." },
    { name: "IM / SC Injection Administration", category: "Injections & IV", details: "Intramuscular or subcutaneous injection with vital signs check." },
    { name: "IV Fluid Infusion Therapy", category: "Injections & IV", details: "Normal Saline (NS), Ringer Lactate (RL), or D5 infusion with continuous flow-rate monitoring." },
    { name: "Nursing Duty - Morning Shift (7 Hours)", category: "Nursing Shifts", details: "7-hour morning day shift certified GNM/B.Sc nurse: vitals, medicine, IV, feeding, and recovery care." },
    { name: "Nursing Duty - Evening Shift (7 Hours)", category: "Nursing Shifts", details: "7-hour evening day shift certified nurse for vital monitoring, oral/IV medications, and patient comfort." },
    { name: "Nursing Duty - Night Shift (10 Hours)", category: "Nursing Shifts", details: "10-hour dedicated night nursing care for critical, elderly, or post-surgical monitoring." },
    { name: "Diaper Change & Urine Bag Emptying", category: "Attendant & Hygiene", details: "Bedside sponge bath, gentle diaper change, skin rash cream application, and urine bag empty." },
    { name: "Doctor Home Visit (Within 5km)", category: "Doctor Consultation", details: "Comprehensive physical checkup, diagnosis, vital evaluation & prescription at home." },
    { name: "Online Doctor Video Consultation", category: "Doctor Consultation", details: "Direct Video/Audio call with Dr. Piyush Saxena or Specialists; WhatsApp digital prescription." },
    { name: "Physiotherapy at Doorstep Session", category: "Physiotherapy", details: "Targeted 45-60 min neuro/ortho rehab by certified BPT/MPT therapist with electrotherapy." },

    // Medical Equipment Rentals
    { name: "BiPAP Machine Support", category: "Equipment Rental", details: "Dual-pressure titration, mask fitting, humidifier maintenance, and continuous SpO2 check." },
    { name: "Oxygen Concentrator (5 Litre)", category: "Equipment Rental", details: "Continuous 5L medical-grade oxygen output (93% ± 3%) with nasal cannula and humidifier." },
    { name: "B-Type Oxygen Cylinder & Regulator", category: "Equipment Rental", details: "Emergency portable medical oxygen cylinder with double gauge regulator and flowmeter." },
    { name: "Vital Monitor (Multi-Para Bedside)", category: "Equipment Rental", details: "Continuous ECG, Pulse, NIBP Blood Pressure, SpO2, and Body Temperature tracking." },
    { name: "Medical Suction Machine", category: "Equipment Rental", details: "Airway secretion clearance for tracheostomy, stroke, and bedridden patients." },
    { name: "Hospital Patient Bed", category: "Equipment Rental", details: "Adjustable backrest elevation, safety side railings, and hospital-grade mattress." },
    { name: "Infusion Pump / Syringe Pump", category: "Equipment Rental", details: "Micro-controlled precise volumetric drug delivery with safety occlusion alarms." },
    { name: "ICU Ventilator Machine Support", category: "Equipment Rental", details: "Life-support invasive & non-invasive mechanical ventilation under physician oversight." }
  ];

  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Charges & Quotes
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Doorstep Healthcare & Nursing Charges in Lucknow
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Every patient's needs are different, so we confirm the exact charges with you directly. Message us on WhatsApp or call, tell us the service and your area, and we will share the rate for your case.
        </p>
      </div>
    </div>

    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        <!-- GET A QUOTE -->
        <div id="calculator" class="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-4 text-center">
          <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Quick Quote
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Get the Exact Price for Your Case
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Share the service you need, the patient's condition and your Lucknow locality. Our team replies within minutes with charges and the earliest visit slot.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a href="${priceWhatsAppUrl()}" target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2">
              <i class="fa-brands fa-whatsapp text-lg"></i>
              <span>Get Price on WhatsApp</span>
            </a>
            <a href="tel:${CONFIG.phoneTel}" class="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2">
              <i class="fa-solid fa-phone"></i>
              <span>Call ${CONFIG.phoneFormatted}</span>
            </a>
          </div>
        </div>

        <!-- SERVICE CATALOG (no rates: ask on WhatsApp) -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 font-heading">
                Services & Equipment We Provide (Lucknow)
              </h2>
              <p class="text-xs sm:text-sm text-slate-500">
                Available across Gomti Nagar, Indira Nagar, Hazratganj, and all Lucknow localities. Tap "Price on WhatsApp" next to any service to ask for its charges.
              </p>
            </div>
            <span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> No Hidden Charges
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider">
                  <th class="p-3.5 font-bold border border-slate-200">Service Category</th>
                  <th class="p-3.5 font-bold border border-slate-200">Service / Rental Name</th>
                  <th class="p-3.5 font-bold border border-slate-200">What's Included</th>
                  <th class="p-3.5 font-bold border border-slate-200">Charges</th>
                  <th class="p-3.5 font-bold border border-slate-200">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs sm:text-sm">
                ${priceCatalogList.map(item => `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-3.5 font-semibold text-slate-500 text-xs">${item.category}</td>
                    <td class="p-3.5 font-bold text-slate-900">${item.name}</td>
                    <td class="p-3.5 text-slate-600 text-xs leading-relaxed max-w-xs">${item.details}</td>
                    <td class="p-3.5 whitespace-nowrap">${askPriceLink(item.name, "text-emerald-700 hover:text-emerald-800 font-bold text-xs")}</td>
                    <td class="p-3.5 whitespace-nowrap">
                      <a href="/book/?service=${encodeURIComponent(item.name)}" class="text-xs bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white font-bold py-1.5 px-3 rounded-lg border border-sky-200 transition">
                        Book
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong class="text-slate-800 block">Accepted Payment Modes:</strong>
            <p>Cash on arrival for doorstep visits, and instant UPI (Google Pay, PhonePe, Paytm, BHIM), NetBanking, or Credit/Debit Cards via Razorpay Secure checkout.</p>
          </div>
        </div>

      </div>
    </div>
  `;
}

module.exports = {
  renderPricingPage
};
