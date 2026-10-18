const CONFIG = require('../../site.config.js');

function renderPricingPage() {
  const priceCatalogList = [
    // Procedures
    { name: "Surgical Wound Dressing (Small)", price: "₹500 / session", category: "Surgical Dressing", details: "Hospital-grade sterile dressing, stitch care, and antiseptic cleaning for minor wounds/stitches." },
    { name: "Surgical Wound Dressing (Medium)", price: "₹1,000 / session", category: "Surgical Dressing", details: "Sterile dressing pack for post-operative incisions, laparotomy, or medium open wounds." },
    { name: "Surgical Wound Dressing (Large)", price: "₹1,500 / session", category: "Surgical Dressing", details: "Advanced sterile dressing for deep bed sores (Grade 3-4), diabetic ulcers, and extensive surgical sites." },
    { name: "Urinary Catheterization (Foley / Silicone)", price: "₹999 / procedure", category: "Catheter Care", details: "Aseptic Foley or 100% silicone catheter insertion/change with 2% Lignocaine jelly and sterile urobag." },
    { name: "Ryle's Tube / NG Feeding Tube Insertion", price: "₹999 / procedure", category: "Catheter Care", details: "Sterile nasogastric tube insertion, placement confirmation by auscultation, and feeding demonstration." },
    { name: "Surgical Drain Out / Drainage Care", price: "₹999 / procedure", category: "Surgical Care", details: "Sterile drain emptying, measuring fluid, bulb recharge, and sterile dressing at drain exit site." },
    { name: "Nebulization & Demonstration", price: "₹500 (One-time)", category: "Respiratory Care", details: "Compressor nebulizer setup, bronchodilator respule administration, and chest recovery guidance." },
    { name: "Enema PR Insertion & Bowel Care", price: "₹600 / procedure", category: "Nursing Procedures", details: "Gentle PR enema administration, relief of fecal impaction, and post-procedure hygiene." },
    { name: "Tracheostomy Care & Suctioning", price: "₹300 / session", category: "Tracheostomy Care", details: "Inner cannula cleaning, sterile airway suctioning, stoma skin dressing, and tie change." },
    { name: "Tracheostomy Tube Change", price: "₹2,000 / procedure", category: "Tracheostomy Care", details: "Sterile tracheostomy tube replacement by experienced clinical staff under medical protocol." },
    { name: "Tracheostomy Out (Decannulation)", price: "₹2,000 / procedure", category: "Tracheostomy Care", details: "Clinical tube removal, stoma occlusion dressing, and post-decannulation respiratory monitoring." },
    { name: "IV Injection Administration", price: "₹399 / visit", category: "Injections & IV", details: "Painless IV cannulation and intravenous drug administration with sterile disposable syringe." },
    { name: "IM / SC Injection Administration", price: "₹299 / visit", category: "Injections & IV", details: "Intramuscular or subcutaneous injection with vital signs check." },
    { name: "IV Fluid Infusion Therapy", price: "As per patient need", category: "Injections & IV", details: "Normal Saline (NS), Ringer Lactate (RL), or D5 infusion with continuous flow-rate monitoring." },
    { name: "Nursing Duty - Morning Shift (7 Hours)", price: "₹999 / shift", category: "Nursing Shifts", details: "7-hour morning day shift certified GNM/B.Sc nurse: vitals, medicine, IV, feeding, and recovery care." },
    { name: "Nursing Duty - Evening Shift (7 Hours)", price: "₹999 / shift", category: "Nursing Shifts", details: "7-hour evening day shift certified nurse for vital monitoring, oral/IV medications, and patient comfort." },
    { name: "Nursing Duty - Night Shift (10 Hours)", price: "₹1,299 / shift", category: "Nursing Shifts", details: "10-hour dedicated night nursing care for critical, elderly, or post-surgical monitoring." },
    { name: "Diaper Change & Urine Bag Emptying", price: "₹500 / session", category: "Attendant & Hygiene", details: "Bedside sponge bath, gentle diaper change, skin rash cream application, and urine bag empty." },
    { name: "Doctor Home Visit (Within 5km)", price: "₹2,000 / visit", category: "Doctor Consultation", details: "Comprehensive physical checkup, diagnosis, vital evaluation & prescription at home." },
    { name: "Online Doctor Video Consultation", price: "₹500 / consult", category: "Doctor Consultation", details: "Direct Video/Audio call with Dr. Piyush Saxena or Specialists; WhatsApp digital prescription." },
    { name: "Physiotherapy at Doorstep Session", price: "₹600 / session", category: "Physiotherapy", details: "Targeted 45-60 min neuro/ortho rehab by certified BPT/MPT therapist with electrotherapy." },

    // Medical Equipment Rentals
    { name: "BiPAP Machine Support", price: "₹750 / Day + Conveyance", category: "Equipment Rental", details: "Dual-pressure titration, mask fitting, humidifier maintenance, and continuous SpO2 check." },
    { name: "Oxygen Concentrator (5 Litre)", price: "₹500 / Day + Conveyance", category: "Equipment Rental", details: "Continuous 5L medical-grade oxygen output (93% ± 3%) with nasal cannula and humidifier." },
    { name: "B-Type Oxygen Cylinder & Regulator", price: "₹2,000 / Month + Conveyance", category: "Equipment Rental", details: "Emergency portable medical oxygen cylinder with double gauge regulator and flowmeter." },
    { name: "Vital Monitor (Multi-Para Bedside)", price: "₹300 / Day + Conveyance", category: "Equipment Rental", details: "Continuous ECG, Pulse, NIBP Blood Pressure, SpO2, and Body Temperature tracking." },
    { name: "Medical Suction Machine", price: "₹150 / Day + Conveyance", category: "Equipment Rental", details: "Airway secretion clearance for tracheostomy, stroke, and bedridden patients." },
    { name: "Hospital Patient Bed", price: "₹200 / Day + Conveyance", category: "Equipment Rental", details: "Adjustable backrest elevation, safety side railings, and hospital-grade mattress." },
    { name: "Infusion Pump / Syringe Pump", price: "₹300 / Day + Conveyance", category: "Equipment Rental", details: "Micro-controlled precise volumetric drug delivery with safety occlusion alarms." },
    { name: "ICU Ventilator Machine Support", price: "₹3,000 / Day + Conveyance", category: "Equipment Rental", details: "Life-support invasive & non-invasive mechanical ventilation under physician oversight." }
  ];

  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Transparent Healthcare Pricing
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Doorstep Healthcare & Nursing Pricing in Lucknow
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Zero hidden costs. 100% upfront transparency. Calculate your estimated visit cost below or browse our official fee catalog.
        </p>
      </div>
    </div>

    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- INTERACTIVE COST ESTIMATOR -->
        <div id="calculator" class="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <div class="text-center mb-8">
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Instant Price Calculator
            </span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-2">
              Estimate Your Doorstep Care Cost
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">
              Select your required service and Lucknow locality to see the exact estimated amount.
            </p>
          </div>

          <div class="space-y-5">
            <div>
              <label for="calc-service" class="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Select Medical Service *
              </label>
              <select id="calc-service" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none font-medium text-slate-800">
                <option value="wound-dressing-small">Surgical Wound Dressing (Small) (₹500)</option>
                <option value="wound-dressing-medium">Surgical Wound Dressing (Medium) (₹1,000)</option>
                <option value="wound-dressing-large">Surgical Wound Dressing (Large) (₹1,500)</option>
                <option value="catheter-insertion">Urinary Catheterization (Foley/Silicone) (₹999)</option>
                <option value="ryles-tube">Ryle's Tube / NG Feeding Tube Insertion (₹999)</option>
                <option value="drain-out">Surgical Drain Out / Drainage Care (₹999)</option>
                <option value="nebulization">Nebulization & Demonstration (₹500)</option>
                <option value="enema-pr">Enema PR Insertion (₹600)</option>
                <option value="tracheostomy-care">Tracheostomy Care & Suctioning (₹300)</option>
                <option value="tracheostomy-change">Tracheostomy Tube Change (₹2,000)</option>
                <option value="tracheostomy-out">Tracheostomy Out (Decannulation) (₹2,000)</option>
                <option value="iv-injection">IV Injection Administration (₹399)</option>
                <option value="im-injection">IM / SC Injection Administration (₹299)</option>
                <option value="nurse-morning">Nursing Duty - Morning Shift (7h) (₹999)</option>
                <option value="nurse-evening">Nursing Duty - Evening Shift (7h) (₹999)</option>
                <option value="nurse-night">Nursing Duty - Night Shift (10h) (₹1,299)</option>
                <option value="diaper-urine">Diaper Change & Urine Empty (₹500)</option>
                <option value="consultation-online">Online Doctor Video Consultation (₹500)</option>
                <option value="consultation-doorstep">Doctor Consultation At Door Step (Within 5km) (₹2,000)</option>
                <option value="physiotherapy-doorstep">Physiotherapy At Door Step Session (₹600)</option>
              </select>
            </div>

            <div>
              <label for="calc-area" class="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Your Area in Lucknow *
              </label>
              <select id="calc-area" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none font-medium text-slate-800">
                <option value="Gomti Nagar">Gomti Nagar (Primary Hub • 15-25 Mins)</option>
                <option value="Gomti Nagar Extension">Gomti Nagar Extension (20-30 Mins)</option>
                <option value="Vibhuti Khand">Vibhuti Khand (15-25 Mins)</option>
                <option value="Indira Nagar">Indira Nagar (25-35 Mins)</option>
                <option value="Hazratganj">Hazratganj (30-40 Mins)</option>
                <option value="Mahanagar">Mahanagar (30-40 Mins)</option>
                <option value="Aliganj & Jankipuram">Aliganj & Jankipuram (35-45 Mins)</option>
                <option value="Shaheed Path / Sushant Golf City">Shaheed Path / Sushant Golf City (25-35 Mins)</option>
                <option value="Alambagh & Ashiyana">Alambagh & Ashiyana (35-50 Mins)</option>
                <option value="Chinhat & Kamta">Chinhat & Kamta (20-30 Mins)</option>
              </select>
            </div>

            <div class="flex items-center gap-2.5 p-3.5 bg-amber-50 rounded-xl border border-amber-200">
              <input type="checkbox" id="calc-urgent" class="w-4 h-4 text-sky-600 rounded focus:ring-sky-500">
              <label for="calc-urgent" class="text-xs font-bold text-amber-950 cursor-pointer">
                Urgent Priority Dispatch (+₹150 for fastest arrival within 20-30 minutes)
              </label>
            </div>

            <!-- Total Cost Display & WhatsApp CTA -->
            <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span class="text-xs text-slate-400 uppercase font-bold block">Estimated Amount</span>
                <span id="calc-total-display" class="text-3xl sm:text-4xl font-black text-brand-700">₹500</span>
                <span class="text-[11px] text-slate-500 block">Includes sterile disposable consumables</span>
              </div>

              <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <a id="calc-whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 text-center">
                  <i class="fa-brands fa-whatsapp text-lg"></i>
                  <span>Confirm on WhatsApp</span>
                </a>
                <a href="/book/" class="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition text-center">
                  Book Online
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- COMPLETE PRICING CATALOG TABLE -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 font-heading">
                Complete Service Fee Catalog (Lucknow)
              </h2>
              <p class="text-xs sm:text-sm text-slate-500">
                Official rates active across Gomti Nagar, Indira Nagar, Hazratganj, and all Lucknow localities.
              </p>
            </div>
            <span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> Zero Hidden Charges
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider">
                  <th class="p-3.5 font-bold border border-slate-200">Service Category</th>
                  <th class="p-3.5 font-bold border border-slate-200">Service / Rental Name</th>
                  <th class="p-3.5 font-bold border border-slate-200">Fee (INR)</th>
                  <th class="p-3.5 font-bold border border-slate-200">What's Included</th>
                  <th class="p-3.5 font-bold border border-slate-200">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs sm:text-sm">
                ${priceCatalogList.map(item => `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="p-3.5 font-semibold text-slate-500 text-xs">${item.category}</td>
                    <td class="p-3.5 font-bold text-slate-900">${item.name}</td>
                    <td class="p-3.5 font-black text-brand-700 whitespace-nowrap">${item.price}</td>
                    <td class="p-3.5 text-slate-600 text-xs leading-relaxed max-w-xs">${item.details}</td>
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
