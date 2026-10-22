const CONFIG = require('../../site.config.js');
const { pricify } = require('../data/price_lines.js');
const SERVICES = require('../data/services.js');
const AREAS = require('../data/areas.js');
const { POSTS_BY_DATE } = require('./blog_pages.js');

function renderServicesOverview() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Hospital-Grade Home Healthcare
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Doorstep Healthcare & Home Nursing Services in Lucknow
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive medical and clinical procedures performed in the comfort, hygiene, and dignity of your home. Founded and supervised by <strong>${CONFIG.founderName}</strong>.
        </p>

        <!-- Category Filters -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button class="filter-btn active px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-sky-600 text-white shadow-sm transition" data-category="all">
            All Services (${SERVICES.length})
          </button>
          <button class="filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition" data-category="consultation">
            Doctor Visits & Consult
          </button>
          <button class="filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition" data-category="nursing">
            Nursing & Patient Care
          </button>
          <button class="filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition" data-category="dressing">
            Surgical Wound Care
          </button>
          <button class="filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition" data-category="catheter">
            Catheter & NG Tube
          </button>
          <button class="filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition" data-category="injection">
            IV Fluids & Injections
          </button>
          <button class="filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition" data-category="physiotherapy">
            Physiotherapy
          </button>
          <button class="filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 transition" data-category="icu">
            BiPAP & Critical Care
          </button>
        </div>
      </div>
    </div>

    <!-- Services Grid Container -->
    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="services-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          ${SERVICES.map(service => `
            <div class="service-card bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col justify-between relative group hover:border-sky-300 transition">
              <div>
                <div class="flex items-start justify-between mb-4">
                  <div class="w-14 h-14 rounded-2xl ${service.iconColor} flex items-center justify-center text-2xl shadow-inner">
                    <i class="fa-solid ${service.icon}"></i>
                  </div>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                    ${service.badge}
                  </span>
                </div>

                <h2 class="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                  <a href="/services/${service.slug}/" class="hover:underline">${service.title}</a>
                </h2>
                
                <p class="text-slate-600 text-sm leading-relaxed mb-5">
                  ${service.summary}
                </p>

                <div class="space-y-2 mb-6">
                  ${service.whatsIncluded.slice(0, 4).map(f => `
                    <div class="flex items-start text-xs text-slate-700">
                      <i class="fa-solid fa-circle-check text-emerald-500 mr-2 mt-0.5 text-[11px] shrink-0"></i>
                      <span>${f}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-5 border-t border-slate-100">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <span class="text-[10px] text-slate-400 block uppercase font-bold">Estimated Pricing</span>
                    <span class="text-base font-bold text-slate-900">${pricify(service.price, service.slug)}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] text-slate-400 block uppercase font-bold">Avg Duration</span>
                    <span class="text-xs font-semibold text-slate-700"><i class="fa-regular fa-clock mr-1 text-slate-400"></i>${service.duration}</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2 mb-2">
                  <a href="${service.slug === 'online-doctor-consultation' ? '/book/?service=online-consultation#booking-form' : '/book/?service=' + encodeURIComponent(service.shortTitle)}" 
                    class="w-full py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition duration-200 flex items-center justify-center gap-1.5 shadow-sm text-center">
                    <i class="fa-regular fa-calendar-check text-xs"></i>
                    <span>${service.slug === 'online-doctor-consultation' ? 'Book Consultation' : 'Book Visit'}</span>
                  </a>
                  
                  <button type="button" onclick="quickWhatsAppService('${service.shortTitle}')" 
                    class="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold text-xs sm:text-sm rounded-xl transition duration-200 flex items-center justify-center gap-1.5"
                    aria-label="Enquire about ${service.shortTitle} on WhatsApp">
                    <i class="fa-brands fa-whatsapp text-emerald-600"></i>
                    <span>WhatsApp</span>
                  </button>
                </div>

                <div class="text-center pt-2">
                  <a href="/services/${service.slug}/" class="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline inline-flex items-center gap-1">
                    <span>Full procedure details, pricing & FAQs</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderServiceDetailPage(service) {
  const relatedServicesList = SERVICES.filter(s => service.relatedServices && service.relatedServices.includes(s.slug));
  const relatedAreasList = AREAS.filter(a => service.relatedAreas && service.relatedAreas.includes(a.slug));
  const relatedGuides = POSTS_BY_DATE.filter(p => (p.relatedServices || []).includes(service.slug)).slice(0, 3);

  return `
    <!-- Hero / Header of Service Page -->
    <div class="bg-gradient-to-b from-brand-50 via-white to-slate-50 py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 mb-4">
          <i class="fa-solid ${service.icon}"></i>
          <span>${service.badge} • Lucknow Doorstep Service</span>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight mb-4">
          ${service.title}
        </h1>

        <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-8">
          ${service.summary} ${service.heroNote || `Delivered with 100% sterile consumable kits, direct clinical guidance by <strong>${CONFIG.founderName}</strong>, and an average doorstep arrival of <strong>30 to 45 minutes</strong> across Lucknow.`}
        </p>

        <!-- Quick Summary Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs">
          <div>
            <span class="text-slate-400 uppercase font-bold block text-[10px]">Transparent Fee</span>
            <strong class="text-sm font-extrabold text-slate-900">${pricify(service.price, service.slug)}</strong>
          </div>
          <div>
            <span class="text-slate-400 uppercase font-bold block text-[10px]">Doorstep Response</span>
            <strong class="text-sm font-extrabold text-emerald-600">${service.responseTime.split('(')[0]}</strong>
          </div>
          <div>
            <span class="text-slate-400 uppercase font-bold block text-[10px]">Clinical Oversight</span>
            <strong class="text-sm font-extrabold text-slate-900">${CONFIG.founderName}</strong>
          </div>
          <div>
            <span class="text-slate-400 uppercase font-bold block text-[10px]">${service.trustLabel || "Kit Sterility"}</span>
            <strong class="text-sm font-extrabold text-sky-600">${service.trustValue || "100% Sealed Sterile Disposables"}</strong>
          </div>
        </div>

        <!-- Primary Action CTAs -->
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a href="/book/?service=${encodeURIComponent(service.shortTitle)}" class="px-6 py-3.5 bg-gradient-to-r from-brand-600 to-medical-teal hover:from-brand-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center gap-2">
            <i class="fa-solid fa-calendar-check"></i>
            <span>Book Doorstep Visit</span>
          </a>

          <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush Saxena, I need ' + service.shortTitle + ' at my home in Lucknow.')}" target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>Confirm on WhatsApp</span>
          </a>

          <a href="tel:${CONFIG.businessPhoneTel}" class="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-sm transition flex items-center gap-2">
            <i class="fa-solid fa-phone text-sky-600"></i>
            <span>Call ${CONFIG.businessPhoneFormatted}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Content Body -->
    <div class="py-12 sm:py-16 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Section: Who Needs It -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-4 flex items-center gap-2.5">
            <i class="fa-solid fa-user-check text-sky-600 text-xl"></i>
            <span>Who Needs This Service in Lucknow?</span>
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            Visiting a hospital OPD or clinic in Lucknow for non-emergency medical procedures causes immense physical strain for frail patients and their family members. This doorstep service is ideal for:
          </p>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${service.whoNeedsIt.map(item => `
              <li class="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 shrink-0"></i>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Section: What's Included -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-4 flex items-center gap-2.5">
            <i class="fa-solid fa-clipboard-list text-emerald-600 text-xl"></i>
            <span>What's Included in Every Visit</span>
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            We follow strict hospital clinical hygiene protocols. Every doorstep visit comes completely equipped with:
          </p>
          <div class="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <ul class="space-y-3 text-xs sm:text-sm text-slate-700">
              ${service.whatsIncluded.map(item => `
                <li class="flex items-start gap-3">
                  <i class="fa-solid fa-check-double text-emerald-600 mt-1 shrink-0 text-xs"></i>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Section: Step-by-Step Clinical Process -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-4 flex items-center gap-2.5">
            <i class="fa-solid fa-list-ol text-purple-600 text-xl"></i>
            <span>Step-by-Step Procedure at Home</span>
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            ${service.steps.map(s => `
              <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <span class="w-8 h-8 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                  ${s.step}
                </span>
                <h3 class="font-bold text-slate-900 text-sm">${s.title}</h3>
                <p class="text-xs text-slate-600 leading-relaxed">${s.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section: Pricing & Doctor Oversight -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 bg-sky-50 rounded-2xl border border-sky-100 space-y-3">
            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
              <i class="fa-solid fa-indian-rupee-sign text-sky-600"></i>
              <span>Transparent Pricing Guarantee</span>
            </h3>
            <p class="text-2xl font-black text-brand-700">${pricify(service.price, service.slug)}</p>
            <p class="text-xs text-slate-600 leading-relaxed">${pricify(service.priceNote, service.slug)}</p>
            <p class="text-[11px] text-slate-500 font-medium">Payment accepted via Cash, UPI (GPay/PhonePe/Paytm), or Razorpay online.</p>
          </div>

          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
              <i class="fa-solid fa-user-doctor text-emerald-600"></i>
              <span>Doctor Oversight & Safety</span>
            </h3>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Oversight:</strong> ${service.oversight}
            </p>
            <p class="text-xs text-slate-600 leading-relaxed">
              <strong>${service.safetyLabel || "Sterility Protocol"}:</strong> ${service.safetyNote}
            </p>
          </div>
        </div>

        <!-- Section: FAQs -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-6 flex items-center gap-2.5">
            <i class="fa-solid fa-circle-question text-amber-500 text-xl"></i>
            <span>Frequently Asked Questions (${service.shortTitle})</span>
          </h2>
          <div class="space-y-4">
            ${service.faqs.map(faq => `
              <div class="faq-item bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <button onclick="toggleFaq(this)" type="button" class="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus:outline-none">
                  <span>${faq.q}</span>
                  <i class="fa-solid fa-chevron-down faq-icon text-slate-400 text-xs shrink-0 transition-transform"></i>
                </button>
                <div class="faq-content px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  ${faq.a}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Cross-Links: Related Services -->
        ${relatedServicesList.length > 0 ? `
          <div class="pt-6 border-t border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 font-heading mb-4">Related Doorstep Healthcare Services in Lucknow</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              ${relatedServicesList.map(rel => `
                <a href="/services/${rel.slug}/" class="p-4 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition block group">
                  <span class="text-xs font-bold text-slate-900 group-hover:text-sky-600 block mb-1">${rel.title}</span>
                  <span class="text-[11px] text-slate-500 block">${pricify(rel.price, rel.slug)}</span>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Cross-Links: Related Blog Guides -->
        ${relatedGuides.length > 0 ? `
          <div class="pt-4 border-t border-slate-100">
            <h3 class="text-lg font-bold text-slate-900 font-heading mb-4">Helpful Guides on ${service.shortTitle}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              ${relatedGuides.map(p => `
                <a href="/blog/${p.slug}/" class="p-4 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition block group">
                  <span class="text-xs font-bold text-slate-900 group-hover:text-sky-600 block mb-1">${p.title}</span>
                  <span class="text-[11px] text-slate-500 block">${p.readTime}</span>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Cross-Links: Covered Localities in Lucknow -->
        ${relatedAreasList.length > 0 ? `
          <div class="pt-4 border-t border-slate-100">
            <h3 class="text-lg font-bold text-slate-900 font-heading mb-3">Covered Localities for ${service.shortTitle}</h3>
            <div class="flex flex-wrap gap-2 text-xs">
              ${relatedAreasList.map(area => `
                <a href="/areas/${area.slug}/" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-800 transition">
                  <i class="fa-solid fa-location-dot text-emerald-500 mr-1 text-[10px]"></i>
                  <span>${area.name} (${area.responseTime})</span>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Final Service Callout CTA -->
        <div class="p-8 bg-gradient-to-r from-medical-navy via-brand-900 to-medical-teal text-white rounded-3xl text-center space-y-4">
          <h3 class="text-2xl sm:text-3xl font-extrabold font-heading">
            Schedule Your ${service.shortTitle} in Lucknow
          </h3>
          <p class="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            ${service.ctaNote || "Our qualified staff reaches your home in Gomti Nagar within 15-25 minutes, or within 30-45 minutes across Lucknow. 100% sterile kits and gentle care guaranteed."}
          </p>
          <div class="flex flex-wrap justify-center gap-3 pt-2">
            <a href="/book/?service=${encodeURIComponent(service.shortTitle)}" class="px-7 py-3.5 bg-white text-slate-900 font-extrabold text-sm rounded-xl hover:bg-slate-100 transition shadow">
              Book Online
            </a>
            <a href="tel:${CONFIG.businessPhoneTel}" class="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl transition shadow flex items-center gap-2">
              <i class="fa-solid fa-phone"></i>
              <span>Call ${CONFIG.businessPhoneFormatted}</span>
            </a>
            <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I want to book ' + service.shortTitle)}" target="_blank" rel="noopener noreferrer" class="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl transition shadow flex items-center gap-2">
              <i class="fa-brands fa-whatsapp"></i>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  `;
}

module.exports = {
  renderServicesOverview,
  renderServiceDetailPage
};
