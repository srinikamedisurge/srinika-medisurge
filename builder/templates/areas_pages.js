const CONFIG = require('../../site.config.js');
const { pricify } = require('../data/price_lines.js');
const AREAS = require('../data/areas.js');
const SERVICES = require('../data/services.js');

function renderAreasOverview() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Lucknow Citywide Coverage
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Doorstep Healthcare & Home Nursing Across Lucknow
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          From our primary hub in Khargapur, Gomti Nagar, Srinika Medisurge dispatches certified nursing officers and specialist doctors across every sector of Lucknow. Select your locality below to see response times and services.
        </p>

        <!-- Area Search Bar -->
        <div class="max-w-md mx-auto mt-8 relative">
          <input type="text" id="area-search-input" placeholder="Search your locality (e.g. Indira Nagar, Vibhuti Khand)..." class="w-full bg-white border border-slate-300 rounded-2xl py-3.5 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-sky-500 outline-none">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        </div>
      </div>
    </div>

    <!-- Areas Grid -->
    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="coverage-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${AREAS.map(area => `
            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-sky-300 transition flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    ${area.badge}
                  </span>
                </div>
                <h2 class="text-xl font-bold text-slate-900 font-heading mb-1">
                  <a href="/areas/${area.slug}/" class="hover:text-sky-600">${area.name}</a>
                </h2>
                <p class="text-xs font-bold text-emerald-600 mb-3 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  Response Time: ${area.responseTime}
                </p>
                <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  ${area.intro}
                </p>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a href="/areas/${area.slug}/" class="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline">
                  Area details & services →
                </a>
                <a href="/book/?area=${encodeURIComponent(area.name)}" class="text-xs bg-sky-600 hover:bg-sky-700 text-white font-bold py-1.5 px-3 rounded-lg shadow-sm transition">
                  Book Here
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderAreaDetailPage(area) {
  const topServices = SERVICES.slice(0, 8);

  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 mb-4">
          <i class="fa-solid fa-location-dot text-emerald-600"></i>
          <span>${area.badge}</span>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight mb-4">
          ${area.title}
        </h1>

        <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-8">
          ${area.intro}
        </p>

        <!-- Response Time & Address Bar -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs">
          <div>
            <span class="text-slate-400 uppercase font-bold block text-[10px]">Doorstep Response</span>
            <strong class="text-base font-extrabold text-emerald-600">${area.responseTime}</strong>
          </div>
          <div>
            <span class="text-slate-400 uppercase font-bold block text-[10px]">Primary Dispatch Hub</span>
            <strong class="text-sm font-bold text-slate-900">${CONFIG.address.street}</strong>
          </div>
          <div>
            <span class="text-slate-400 uppercase font-bold block text-[10px]">Operating Hours</span>
            <strong class="text-sm font-bold text-slate-900">24/7 (All 7 Days)</strong>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <a href="/book/?area=${encodeURIComponent(area.name)}" class="px-6 py-3.5 bg-gradient-to-r from-brand-600 to-medical-teal text-white font-bold text-sm rounded-xl shadow-md hover:from-brand-700 hover:to-teal-700 transition">
            Book Doorstep Care in ${area.name}
          </a>
          <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I need home medical care in ' + area.name + ', Lucknow.')}" target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>WhatsApp Dispatch</span>
          </a>
          <a href="tel:${CONFIG.businessPhoneTel}" class="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-sm transition">
            Call ${CONFIG.businessPhoneFormatted}
          </a>
        </div>
      </div>
    </div>

    <div class="py-12 sm:py-16 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Locality Highlights -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-4">
            Why Residents in ${area.name} Choose Srinika Medisurge
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${area.highlights.map(h => `
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <i class="fa-solid fa-circle-check text-emerald-500 mt-1 shrink-0"></i>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>
          <p class="text-xs text-slate-500 mt-3">
            <strong>Key Landmarks & Sectors Covered:</strong> ${area.landmarks}
          </p>
        </div>

        <!-- Available Doorstep Services in this Area -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-6">
            Healthcare Services Available in ${area.name}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${topServices.map(s => `
              <a href="/services/${s.slug}/" class="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition block group">
                <div class="w-10 h-10 rounded-xl ${s.iconColor} flex items-center justify-center text-lg mb-2 shadow-2xs">
                  <i class="fa-solid ${s.icon}"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-sm group-hover:text-sky-600 mb-1">${s.title}</h3>
                <span class="text-xs font-bold text-emerald-700 block">${pricify(s.price, s.slug)}</span>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Area Specific FAQs -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-6">
            Frequently Asked Questions (${area.name})
          </h2>
          <div class="space-y-4">
            ${area.faqs.map(faq => `
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

        <!-- Local Hub Map / Address Box -->
        <div class="p-6 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-2">
            <h3 class="font-bold text-slate-900 text-base">Direct Dispatch from Gomti Nagar HQ</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              ${CONFIG.address.full}
            </p>
            <p class="text-xs text-emerald-700 font-semibold">
              <i class="fa-solid fa-clock mr-1"></i> Average response to ${area.name}: <strong>${area.responseTime}</strong>
            </p>
          </div>
          <div class="shrink-0 flex gap-3">
            <a href="${CONFIG.socialLinks.googleMaps}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition">
              View on Google Maps
            </a>
            <a href="/contact/" class="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 shadow-sm transition">
              Get Directions
            </a>
          </div>
        </div>

      </div>
    </div>
  `;
}

module.exports = {
  renderAreasOverview,
  renderAreaDetailPage
};
