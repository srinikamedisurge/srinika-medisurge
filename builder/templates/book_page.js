const CONFIG = require('../../site.config.js');
const { P } = require('../data/price_lines.js');

function renderBookPage() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Fast & Seamless Scheduling
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Book Doorstep Care or Online Doctor Consultation
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Select your required service below. For doorstep care in Lucknow, we dispatch within 30-45 minutes. For online consultation, connect directly via video/tele-call. For charges, message us on WhatsApp or call.
        </p>
      </div>
    </div>

    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-xl mx-auto px-4 sm:px-6">
        
        <div class="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative">
          
          <!-- Modal Top Header -->
          <div class="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 p-5 text-white flex items-center justify-between">
            <div>
              <div class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                <i class="fa-solid fa-house-medical"></i> Srinika Medisurge Lucknow
              </div>
              <h2 id="modal-title-text" class="text-lg sm:text-xl font-extrabold font-heading">
                Book Medical Service
              </h2>
              <p id="modal-subtitle-text" class="text-xs text-slate-300">
                Dr. Piyush Saxena &bull; Doorstep & Digital Care
              </p>
            </div>
          </div>

          <!-- Step 1: Booking Details Form -->
          <div id="modal-form-content" class="p-6 sm:p-8 space-y-4">
            
            <div id="online-consult-alert-wrap" class="transition-all duration-200">
              <div id="online-consult-alert" class="hidden p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-200 text-sky-950 text-xs sm:text-sm flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <i class="fa-solid fa-video text-xs"></i>
                </div>
                <div>
                  <strong class="font-bold text-slate-900 block">Online Tele-Consultation</strong>
                  <span class="text-slate-600 text-xs leading-relaxed">
                    Connect directly via video or tele-call. Pay the consultation fee securely via Razorpay (UPI, Debit/Credit Cards, NetBanking) to generate your confirmed invoice & instant doctor slot.
                  </span>
                </div>
              </div>
            </div>

            <form id="booking-form" class="space-y-4">
              <!-- Spam protection honeypot field (hidden from real users) -->
              <input type="text" id="booking-hp" name="hp_field" class="hidden" tabindex="-1" autocomplete="off">

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="booking-name" class="block text-xs font-bold text-slate-700 uppercase mb-1">Patient Name *</label>
                  <input type="text" id="booking-name" required placeholder="Full Name" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                </div>
                <div>
                  <label for="booking-phone" class="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number *</label>
                  <input type="tel" id="booking-phone" required placeholder="10-digit Mobile" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                </div>
              </div>

              <div>
                <label for="booking-doctor" class="block text-xs font-bold text-slate-700 uppercase mb-1">Select Consulting Doctor *</label>
                <select id="booking-doctor" required class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none font-medium text-slate-800">
                  <option value="Dr. Piyush Saxena">Dr. Piyush Saxena (Founder)</option>
                  <option value="Dr. Harshit Nigam">Dr. Harshit Nigam (MBBS, MD • Senior Medical Officer)</option>
                  <option value="Dr. Akash Shrivastav">Dr. Akash Shrivastav (M.B.B.S. • UP Medical Council Reg. • Emergency)</option>
                  <option value="Dr. Reshmi R">Dr. Reshmi R (M.B.B.S. • UP Medical Council Reg. • Physician)</option>
                  <option value="Dr. Desh Deepak Singh">Dr. Desh Deepak Singh (B.P.T., M.P.T. • Neuro Physiotherapist)</option>
                </select>
              </div>

              <div>
                <label for="modal-service-select" class="block text-xs font-bold text-slate-700 uppercase mb-1">Required Service *</label>
                <select id="modal-service-select" required class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                  <option value="Doctor Consultation At Door Step (Within 5km)">Doctor Consultation At Door Step (Within 5km)</option>
                  <option value="Online Doctor Consultation">Online Doctor Consultation</option>
                  <option value="Physiotherapy At Door Step">Physiotherapy At Door Step</option>
                  <option value="BiPAP Machine & Mechanical Support">BiPAP Machine & Mechanical Support</option>
                  <option value="IV Fluids & Infusions (NS/RL/D5)">IV Fluids & Infusions (NS/RL/D5)</option>
                  <option value="Nebulization Therapy At Home">Nebulization Therapy At Home</option>
                  <option value="All Types of Patient Care (Elderly/Post-Op)">All Types of Patient Care (Elderly / Post-Op)</option>
                  <option value="Drug Administration & Injections">Drug Administration & Injections</option>
                  <option value="Injectables & Catheterization (Foley/Ryle's Tube)">Injectables & Catheterization (Foley / Ryle's Tube)</option>
                  <option value="Advanced Surgical & Wound Dressing">Advanced Surgical & Wound Dressing</option>
                  <option value="Critical Care & Vital Monitoring">Critical Care & Vital Monitoring</option>
                  <option value="Diagnostic Sample Collection at Home">Diagnostic Sample Collection at Home</option>
                </select>
                <!-- Payment clarity notice -->
                <p class="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <i class="fa-solid fa-circle-info text-sky-500"></i>
                  <span><strong>Online Consultation</strong> is paid upfront securely via Razorpay. All <strong>doorstep visits and nursing procedures</strong> are confirmed directly on WhatsApp/call first, with payment after service confirmation.</span>
                </p>
              </div>

              <div id="modal-address-field">
                <label for="modal-address-input" class="block text-xs font-bold text-slate-700 uppercase mb-1">
                  <span id="modal-address-label">Address / Locality in Lucknow *</span>
                </label>
                <input type="text" id="modal-address-input" placeholder="e.g. Flat 302, Sector 4, Gomti Nagar" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="booking-date" class="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Date</label>
                  <input type="date" id="booking-date" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                </div>

                <div>
                  <label for="booking-time" class="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Slot</label>
                  <select id="booking-time" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                    <option value="Immediate / Earliest Slot (Within 15-30 mins)">Immediate / Earliest (Within 15-30 mins)</option>
                    <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                    <option value="Night (8 PM - 11 PM)">Night (8 PM - 11 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="booking-notes" class="block text-xs font-bold text-slate-700 uppercase mb-1">Patient Symptoms / Notes (Optional)</label>
                <textarea id="booking-notes" rows="2" placeholder="Briefly describe patient symptoms, surgical history, or immediate concerns..." class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none"></textarea>
              </div>

              <div class="pt-2">
                <button type="submit" id="modal-submit-btn" class="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-medical-teal hover:from-brand-700 hover:to-teal-700 text-white font-extrabold text-base shadow-lg transition flex items-center justify-center gap-2">
                  <i id="modal-submit-icon" class="fa-solid fa-paper-plane"></i>
                  <span id="modal-submit-text">Submit & Confirm on WhatsApp</span>
                </button>
                <p id="modal-security-note" class="text-center text-xs text-slate-500 mt-2">
                  <i class="fa-solid fa-shield-halved text-emerald-600"></i> Direct oversight by Dr. Piyush Saxena &bull; Instant Confirmation
                </p>
              </div>
            </form>

          </div>

          <!-- Step 2: Razorpay Payment Screen -->
          <div id="modal-payment-content" class="hidden p-6 sm:p-8 space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <button onclick="backToBookingForm()" type="button" class="text-xs font-bold text-slate-600 hover:text-brand-600 flex items-center gap-1.5 transition">
                <i class="fa-solid fa-arrow-left"></i> Edit Details
              </button>
              <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Step 2: Payment (${P('consult-online')})
              </span>
            </div>

            <!-- Summary -->
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Service</span>
                <h3 class="font-bold text-slate-800 text-sm">Online Doctor Video Consultation</h3>
                <p id="pay-patient-summary" class="text-xs text-slate-500 mt-0.5">Patient Details Confirmed</p>
              </div>
              <div class="text-right">
                <span class="text-2xl font-black text-brand-700">${P('consult-online')}</span>
                <span class="text-[10px] text-emerald-600 font-bold block uppercase">Zero Fee</span>
              </div>
            </div>

            <!-- Razorpay Option -->
            <div class="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 rounded-2xl p-5 text-white shadow-xl space-y-3.5 border border-brand-500/30">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <i class="fa-solid fa-bolt text-amber-400"></i> Automatic Bank Verification
                </span>
                <span class="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-300 font-bold border border-emerald-500/40">
                  Instant Receipt
                </span>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed">
                Pay securely using <strong>UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards, or NetBanking</strong> via Razorpay. Your appointment is confirmed immediately with an official digital receipt.
              </p>

              <button onclick="launchRazorpayPayment()" type="button" class="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base shadow-lg transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-lock text-sm"></i>
                <span>Pay ${P('consult-online')} via Razorpay Secure</span>
              </button>

              <div class="flex items-center justify-center gap-4 pt-2 text-[11px] text-slate-400">
                <span class="flex items-center gap-1"><i class="fa-solid fa-shield-halved text-emerald-400"></i> 256-Bit Encrypted</span>
                <span>•</span>
                <span class="flex items-center gap-1"><i class="fa-solid fa-rotate-left text-sky-400"></i> 100% Refund Guarantee</span>
              </div>
            </div>

          </div>

          <!-- Step 3: Verified Digital Invoice (NO visible placeholder text before real payment!) -->
          <div id="modal-invoice-content" class="hidden p-6 sm:p-8 space-y-5">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <i class="fa-solid fa-circle-check"></i> Confirmed Slot & Official Receipt
              </span>
              <button onclick="resetBookingModal()" type="button" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition focus:outline-none" aria-label="Book another consultation">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <div class="text-center space-y-2">
              <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <h3 class="text-2xl font-black text-slate-900 font-heading">
                Booking & Payment Confirmed!
              </h3>
              <div class="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md max-w-md mx-auto text-center">
                <div class="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-100 mb-0.5">
                  <i class="fa-solid fa-stethoscope"></i> <span id="inv-badge-doctor">Dr. Piyush Saxena</span> Connecting
                </div>
                <p id="inv-connect-banner-text" class="text-sm sm:text-base font-extrabold">
                  Dr. Piyush Saxena will connect with you shortly on Video / Phone Call.
                </p>
                <span class="text-xs text-emerald-100 font-medium block mt-1">
                  Estimated connect time: <strong>15 to 30 minutes</strong>
                </span>
              </div>
            </div>

            <!-- Clean Invoice Card without dummy static placeholders -->
            <div id="consultation-invoice-card" class="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-5 sm:p-6 shadow-sm space-y-4 relative overflow-hidden">
              <div class="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <div class="flex items-center gap-2">
                    <img src="/assets/images/logo.png" alt="Srinika Medisurge Official Logo" width="28" height="28" class="w-7 h-7 object-contain">
                    <span class="font-extrabold text-base text-slate-900 font-heading">Srinika <span class="text-sky-600">Medisurge</span></span>
                  </div>
                  <p class="text-[11px] text-slate-500 mt-0.5">Lucknow Doorstep & Digital Care • Dr. Piyush Saxena</p>
                </div>
                <div class="text-right">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <i class="fa-solid fa-check text-[10px]"></i> PAID
                  </span>
                  <p id="inv-number-display" class="font-mono text-xs font-bold text-slate-700 mt-1">-</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span class="text-[10px] text-slate-400 font-bold uppercase block">Patient Name</span>
                  <strong id="inv-patient-name" class="text-slate-800 text-sm block">-</strong>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 font-bold uppercase block">Mobile Number</span>
                  <strong id="inv-patient-phone" class="text-slate-800 text-sm block">-</strong>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 font-bold uppercase block">Consulting Doctor</span>
                  <strong id="inv-doctor-name" class="text-slate-800 block">Dr. Piyush Saxena</strong>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 font-bold uppercase block">Date & Time</span>
                  <strong id="inv-date-time" class="text-slate-800 block">-</strong>
                </div>
              </div>

              <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="font-semibold text-slate-700">Online Doctor Consultation (Tele-call / Video)</span>
                  <span class="font-bold text-slate-800">${P('consult-online','dec')}</span>
                </div>
                <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>Payment Mode: <strong id="inv-payment-mode" class="text-emerald-700">-</strong></span>
                  <span>Ref / ID: <strong id="inv-utr-display" class="font-mono text-slate-700">-</strong></span>
                </div>
                <div class="flex items-center justify-between text-sm font-black text-slate-900 pt-2 mt-2 border-t border-slate-200">
                  <span>Total Paid:</span>
                  <span class="text-brand-700 text-base">${P('consult-online','dec')}</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button onclick="takeInvoiceScreenshot()" type="button" class="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-print"></i>
                <span>Save / Print Invoice</span>
              </button>
              <a id="inv-whatsapp-btn" href="https://wa.me/919653001359?text=Namaste%20Dr.%20Piyush%20Saxena%2C%20I%20have%20completed%20the%20online%20consultation%20booking%20and%20payment%20on%20Srinika%20Medisurge." target="_blank" rel="noopener noreferrer" class="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 text-center">
                <i class="fa-brands fa-whatsapp text-base"></i>
                <span>Notify Doctor</span>
              </a>
            </div>
          </div>

          <!-- Step 4: Doorstep WhatsApp Success Screen -->
          <div id="modal-success-content" class="hidden p-6 sm:p-8 space-y-4 text-center">
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
              <i class="fa-solid fa-check"></i>
            </div>
            <h3 class="text-2xl font-black text-slate-900 font-heading">
              Doorstep Request Received!
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Your details have been logged. Dr. Piyush Saxena or our duty clinical officer is reviewing your request. Please confirm via WhatsApp to ensure immediate dispatch.
            </p>
            <div class="pt-2">
              <a id="success-whatsapp-link" href="https://wa.me/919653001359?text=Namaste%20Dr.%20Piyush%20Saxena%2C%20I%20would%20like%20to%20confirm%20my%20doorstep%20healthcare%20booking%20with%20Srinika%20Medisurge." target="_blank" rel="noopener noreferrer" class="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition inline-flex items-center justify-center gap-2">
                <i class="fa-brands fa-whatsapp text-lg"></i>
                <span>Open WhatsApp & Confirm</span>
              </a>
            </div>
            <div class="pt-3">
              <button onclick="resetBookingModal()" type="button" class="text-xs text-slate-500 hover:text-slate-800 font-bold underline">
                Book Another Service
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- URL Query Param Sync Script for Booking Page (Executed synchronously before paint) -->
    <script>
      (function() {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const serviceParam = urlParams.get("service");
          const doctorParam = urlParams.get("doctor");
          const areaParam = urlParams.get("area");

          const select = document.getElementById("modal-service-select");
          if (serviceParam && select) {
            const isOnline = serviceParam.toLowerCase().includes("online");
            if (isOnline) {
              select.value = "Online Doctor Consultation";
            } else {
              for (let opt of select.options) {
                if (opt.value.toLowerCase().includes(serviceParam.toLowerCase()) || opt.text.toLowerCase().includes(serviceParam.toLowerCase())) {
                  select.value = opt.value;
                  break;
                }
              }
            }
          }

          const docSelect = document.getElementById("booking-doctor");
          if (doctorParam && docSelect) {
            for (let opt of docSelect.options) {
              if (opt.value.toLowerCase().includes(doctorParam.toLowerCase())) {
                docSelect.value = opt.value;
                break;
              }
            }
          }

          const addr = document.getElementById("modal-address-input");
          if (areaParam && addr) {
            addr.value = areaParam + ", Lucknow";
          }

          if (typeof syncModalServiceMode === "function") {
            syncModalServiceMode();
          }
        } catch(e) {}
      })();

      document.addEventListener("DOMContentLoaded", function() {
        if (typeof syncModalServiceMode === "function") {
          syncModalServiceMode();
        }
      });
    </script>
  `;
}

module.exports = {
  renderBookPage
};
