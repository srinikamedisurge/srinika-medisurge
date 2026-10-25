const CONFIG = require('../../site.config.js');

function renderContactPage() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          24/7 Doorstep Helpline
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Contact Srinika Medisurge Lucknow
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Need a doctor visit, home nurse, catheterization, or IV drip in Lucknow? Reach out directly to Dr. Piyush Saxena and the clinical dispatch team anytime.
        </p>
      </div>
    </div>

    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- Contact Details (NAP Consistency) -->
          <div class="lg:col-span-5 space-y-6">
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 class="text-xl font-bold text-slate-900 font-heading mb-1">Clinic & Dispatch Headquarters</h2>
                <p class="text-xs text-slate-500">Founder: ${CONFIG.founderName}</p>
              </div>

              <div class="space-y-4 text-xs sm:text-sm text-slate-700">
                <div class="flex items-start gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0 shadow-inner">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <strong class="block text-slate-900 font-bold mb-0.5">Physical Address</strong>
                    <span>${CONFIG.address.full}</span>
                    <a href="${CONFIG.socialLinks.googleMaps}" target="_blank" rel="noopener noreferrer" class="block text-sky-600 font-bold hover:underline mt-1">
                      <i class="fa-solid fa-arrow-up-right-from-square text-[11px] mr-1"></i> Get Directions on Google Maps
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg shrink-0 shadow-inner">
                    <i class="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <strong class="block text-slate-900 font-bold mb-0.5">Phone Helpline (24/7)</strong>
                    <a href="tel:${CONFIG.phone}" class="text-slate-900 hover:text-sky-600 font-extrabold text-base block">${CONFIG.phoneFormatted}</a>
                    <span class="text-slate-500 text-xs">24/7 Clinical Helpline & Doorstep Dispatch</span>
                  </div>
                </div>

                <div class="flex items-start gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0 shadow-inner">
                    <i class="fa-brands fa-whatsapp"></i>
                  </div>
                  <div>
                    <strong class="block text-slate-900 font-bold mb-0.5">Official WhatsApp</strong>
                    <a href="${CONFIG.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="text-emerald-700 hover:underline font-bold block">${CONFIG.whatsappDisplay}</a>
                    <span class="text-slate-500 text-xs">Fastest response for bookings & prescription reviews</span>
                  </div>
                </div>

                ${CONFIG.email && !CONFIG.email.includes('[') ? `
                <div class="flex items-start gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg shrink-0 shadow-inner">
                    <i class="fa-regular fa-envelope"></i>
                  </div>
                  <div>
                    <strong class="block text-slate-900 font-bold mb-0.5">Email Inquiries</strong>
                    <a href="mailto:${CONFIG.email}" class="text-slate-600 font-mono hover:text-sky-600">${CONFIG.email}</a>
                  </div>
                </div>` : ''}

                <div class="flex items-start gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg shrink-0 shadow-inner">
                    <i class="fa-regular fa-clock"></i>
                  </div>
                  <div>
                    <strong class="block text-slate-900 font-bold mb-0.5">Operating Hours</strong>
                    <span>${CONFIG.hours.display}</span>
                    <span class="text-slate-500 text-xs block mt-0.5">Emergency night visits & weekend service available</span>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              ${(CONFIG.socialLinks.facebook && !CONFIG.socialLinks.facebook.includes('[')) || (CONFIG.socialLinks.instagram && !CONFIG.socialLinks.instagram.includes('[')) || (CONFIG.socialLinks.googleMaps) ? `
              <div class="pt-4 border-t border-slate-100">
                <span class="text-xs font-bold text-slate-700 uppercase block mb-3">Connect on Social Channels</span>
                <div class="flex items-center gap-3">
                  ${CONFIG.socialLinks.facebook && !CONFIG.socialLinks.facebook.includes('[') ? `
                  <a href="${CONFIG.socialLinks.facebook}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 flex items-center justify-center transition" aria-label="Visit Srinika Medisurge on Facebook">
                    <i class="fa-brands fa-facebook-f text-sm"></i>
                  </a>` : ''}
                  ${CONFIG.socialLinks.instagram && !CONFIG.socialLinks.instagram.includes('[') ? `
                  <a href="${CONFIG.socialLinks.instagram}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-700 flex items-center justify-center transition" aria-label="Visit Srinika Medisurge on Instagram">
                    <i class="fa-brands fa-instagram text-sm"></i>
                  </a>` : ''}
                  <a href="${(CONFIG.googleReviewLink && CONFIG.googleReviewLink.startsWith('http') && !CONFIG.googleReviewLink.includes('[')) ? CONFIG.googleReviewLink : CONFIG.socialLinks.googleMaps}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition" aria-label="Review us on Google">
                    <i class="fa-solid fa-star text-amber-500"></i>
                    <span>Review us on Google</span>
                  </a>
                </div>
              </div>` : ''}
            </div>
          </div>

          <!-- Quick Message Form & Map Embed -->
          <div class="lg:col-span-7 space-y-6">
            
            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <h2 class="text-xl font-bold text-slate-900 font-heading">Send an Instant Message</h2>
              
              <form id="contact-inquiry-form" onsubmit="handleContactSubmit(event)" class="space-y-4">
                <input type="text" id="contact-hp" class="hidden" tabindex="-1" autocomplete="off">

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="c-name" class="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                    <input type="text" id="c-name" required placeholder="Full Name" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                  </div>
                  <div>
                    <label for="c-phone" class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                    <input type="tel" id="c-phone" required placeholder="10-digit Mobile" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="c-area" class="block text-xs font-bold text-slate-700 uppercase mb-1">Your Locality in Lucknow *</label>
                    <input type="text" id="c-area" required placeholder="e.g. Gomti Nagar, Indira Nagar" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                  </div>
                  <div>
                    <label for="c-service" class="block text-xs font-bold text-slate-700 uppercase mb-1">Service Needed</label>
                    <select id="c-service" class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none">
                      <option value="General Doorstep Inquiry">General Doorstep Inquiry</option>
                      <option value="Doctor Home Visit">Doctor Home Visit</option>
                      <option value="Online Doctor Consultation">Online Doctor Consultation</option>
                      <option value="Home Nursing / Attendant">Home Nursing / Attendant</option>
                      <option value="Surgical Wound Dressing">Surgical Wound Dressing</option>
                      <option value="Urinary Catheterization">Urinary Catheterization</option>
                      <option value="IV Drip / Injection">IV Drip / Injection</option>
                      <option value="Physiotherapy at Home">Physiotherapy at Home</option>
                      <option value="BiPAP / Oxygen Rental">BiPAP / Oxygen Rental</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="c-msg" class="block text-xs font-bold text-slate-700 uppercase mb-1">Describe Patient Requirement</label>
                  <textarea id="c-msg" rows="3" placeholder="Explain the symptoms or clinical requirements..." class="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 outline-none"></textarea>
                </div>

                <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-brand-600 to-medical-teal hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2">
                  <i class="fa-solid fa-paper-plane text-xs"></i>
                  <span>Send Message & Open WhatsApp</span>
                </button>
              </form>
            </div>

            <!-- Google Maps Embed -->
            <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <i class="fa-solid fa-map-location-dot text-emerald-600"></i> Location Map: Khargapur, Gomti Nagar
                </span>
                <a href="${CONFIG.socialLinks.googleMaps}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-sky-600 hover:underline">
                  Open in Google Maps App →
                </a>
              </div>
              <div class="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.887884179611!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzQ4LjEiTiA4MMKwNTYnNDYuMyJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Srinika Medisurge Location Map">
                </iframe>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

    <script>
      function handleContactSubmit(e) {
        e.preventDefault();
        const hp = document.getElementById("contact-hp")?.value.trim();
        if (hp) return;

        const name = document.getElementById("c-name")?.value.trim() || "Patient";
        const phone = document.getElementById("c-phone")?.value.trim() || "";
        const area = document.getElementById("c-area")?.value.trim() || "Lucknow";
        const service = document.getElementById("c-service")?.value || "General Care";
        const msg = document.getElementById("c-msg")?.value.trim() || "None";

        const text = "Namaste Dr. Piyush Saxena,\\n*Inquiry from Srinika Medisurge Contact Page*\\n- Name: " + name + "\\n- Phone: " + phone + "\\n- Area: " + area + "\\n- Service: " + service + "\\n- Requirement: " + msg;
        const waUrl = "https://wa.me/" + "${CONFIG.whatsappNumber}?text=" + encodeURIComponent(text);
        window.open(waUrl, "_blank");
      }
    </script>
  `;
}

module.exports = {
  renderContactPage
};
