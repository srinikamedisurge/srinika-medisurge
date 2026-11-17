const CONFIG = require('../../site.config.js');
const { askPriceText, askPriceBox } = require('./ask_price.js');
const SERVICES = require('../data/services.js');
const AREAS = require('../data/areas.js');
const CONDITIONS = require('../data/conditions.js');
const BLOG_POSTS = require('../data/blog.js');

const FEATURED_AREAS = [
  "home-nursing-gomti-nagar",
  "home-nursing-vibhuti-khand",
  "home-nursing-indira-nagar",
  "home-nursing-hazratganj",
  "home-nursing-mahanagar",
  "home-nursing-aliganj-jankipuram"
];

function waLink(text) {
  return `${CONFIG.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

function renderConditionsOverview() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Care by Condition
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Home Care for Every Patient Situation in Lucknow
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Not sure which service you need? Pick the patient's situation and we show the nurses, attendants, physiotherapy and doctor visits that fit it. Guided by <strong>${CONFIG.founderName}</strong>.
        </p>
      </div>
    </div>

    <div class="py-12 sm:py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${CONDITIONS.map(c => `
            <a href="/conditions/${c.slug}/" class="group p-6 bg-white rounded-3xl border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-md transition flex flex-col">
              <span class="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl mb-4">
                <i class="fa-solid ${c.icon}"></i>
              </span>
              <h2 class="text-lg font-bold text-slate-900 font-heading group-hover:text-sky-600 mb-2">${c.name}</h2>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 grow">${c.intro.split('. ')[0]}.</p>
              <span class="text-xs font-bold text-sky-600">See care options →</span>
            </a>
          `).join('')}
        </div>

        <div class="mt-12 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
          <h2 class="text-xl font-bold text-slate-900 font-heading">Situation not listed?</h2>
          <p class="text-sm text-slate-600 max-w-xl mx-auto">Tell us about the patient on WhatsApp and Dr. Piyush Saxena's team will suggest the right care.</p>
          <a href="${waLink('Namaste Dr. Piyush Saxena, I need home care for a patient in Lucknow. Please guide me.')}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition">
            <i class="fa-brands fa-whatsapp text-lg"></i><span>Talk to us on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderConditionPage(c) {
  const services = c.services.map(slug => SERVICES.find(s => s.slug === slug)).filter(Boolean);
  const guides = c.guides.map(slug => BLOG_POSTS.find(p => p.slug === slug)).filter(Boolean);
  const areas = FEATURED_AREAS.map(slug => AREAS.find(a => a.slug === slug)).filter(Boolean);
  const others = CONDITIONS.filter(x => x.slug !== c.slug);
  const waText = `Namaste Dr. Piyush Saxena, I need home care for a patient with ${c.name} in Lucknow. Please guide me.`;

  return `
    <!-- Hero -->
    <div class="bg-gradient-to-b from-brand-50 via-white to-slate-50 py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 mb-4">
          <i class="fa-solid ${c.icon}"></i>
          <span>${c.name} • Home Care in Lucknow</span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight mb-4">
          ${c.title}
        </h1>
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-8">${c.intro}</p>

        <div class="flex flex-wrap items-center gap-3">
          <a href="/book/?service=${encodeURIComponent(services.length ? services[0].shortTitle : '')}" class="px-6 py-3.5 bg-gradient-to-r from-brand-600 to-medical-teal hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2">
            <i class="fa-solid fa-calendar-check"></i><span>Book Home Care</span>
          </a>
          <a href="${waLink(waText)}" target="_blank" rel="noopener noreferrer" class="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-lg"></i><span>Talk to Us on WhatsApp</span>
          </a>
          <a href="tel:${CONFIG.businessPhoneTel}" class="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-sm transition flex items-center gap-2">
            <i class="fa-solid fa-phone text-sky-600"></i><span>Call ${CONFIG.businessPhoneFormatted}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="py-12 sm:py-16 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <!-- What care is needed -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-4 flex items-center gap-2.5">
            <i class="fa-solid fa-clipboard-check text-sky-600 text-xl"></i>
            <span>What Care Does This Patient Usually Need?</span>
          </h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${c.needs.map(n => `
              <li class="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 shrink-0"></i><span>${n}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Services that fit -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-2 flex items-center gap-2.5">
            <i class="fa-solid fa-hand-holding-medical text-emerald-600 text-xl"></i>
            <span>How Srinika Medisurge Helps</span>
          </h2>
          <p class="text-sm text-slate-600 mb-5">Each service below is delivered at the patient's bedside in Lucknow.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${services.map(s => `
              <a href="/services/${s.slug}/" class="p-5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition block group">
                <i class="fa-solid ${s.icon} text-sky-600 text-lg mb-3"></i>
                <span class="text-sm font-bold text-slate-900 group-hover:text-sky-600 block mb-1">${s.shortTitle}</span>
                ${askPriceText("text-[11px] text-slate-500")}
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Plan -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-4 flex items-center gap-2.5">
            <i class="fa-solid fa-list-ol text-purple-600 text-xl"></i>
            <span>How Home Care Works</span>
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            ${c.plan.map((p, i) => `
              <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <span class="w-8 h-8 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">${i + 1}</span>
                <h3 class="font-bold text-slate-900 text-sm">${p.title}</h3>
                <p class="text-xs text-slate-600 leading-relaxed">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Price + Red flags -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 bg-sky-50 rounded-2xl border border-sky-100 space-y-3">
            <h3 class="font-bold text-slate-900 text-base flex items-center gap-2">
              <i class="fa-brands fa-whatsapp text-emerald-600"></i><span>Charges for ${c.shortTitle}</span>
            </h3>${askPriceBox(c.shortTitle)}
          </div>
          <div class="p-6 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
            <h3 class="font-bold text-amber-900 text-base flex items-center gap-2">
              <i class="fa-solid fa-triangle-exclamation"></i><span>Go to a hospital or call 108 if</span>
            </h3>
            <ul class="space-y-2 text-xs sm:text-sm text-amber-900 leading-relaxed list-disc pl-5">
              ${c.redFlags.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- FAQs -->
        <div>
          <h2 class="text-2xl font-bold text-slate-900 font-heading mb-6 flex items-center gap-2.5">
            <i class="fa-solid fa-circle-question text-amber-500 text-xl"></i>
            <span>Frequently Asked Questions</span>
          </h2>
          <div class="space-y-4">
            ${c.faqs.map(faq => `
              <div class="faq-item bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <button onclick="toggleFaq(this)" type="button" class="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition">
                  <span>${faq.q}</span>
                  <i class="fa-solid fa-chevron-down faq-icon text-slate-400 text-xs shrink-0 transition-transform"></i>
                </button>
                <div class="faq-content px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">${faq.a}</div>
              </div>
            `).join('')}
          </div>
        </div>

        ${guides.length > 0 ? `
        <div class="pt-6 border-t border-slate-200">
          <h3 class="text-lg font-bold text-slate-900 font-heading mb-4">Helpful Guides</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${guides.map(p => `
              <a href="/blog/${p.slug}/" class="p-4 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition block group">
                <span class="text-xs font-bold text-slate-900 group-hover:text-sky-600 block mb-1">${p.title}</span>
                <span class="text-[11px] text-slate-500 block">${p.readTime}</span>
              </a>
            `).join('')}
          </div>
        </div>` : ''}

        <div class="pt-4 border-t border-slate-100">
          <h3 class="text-lg font-bold text-slate-900 font-heading mb-3">Serving These Localities in Lucknow</h3>
          <div class="flex flex-wrap gap-2">
            ${areas.map(a => `<a href="/areas/${a.slug}/" class="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-xs font-semibold text-slate-700 hover:text-sky-700 transition">${a.name}</a>`).join('')}
            <a href="/areas/" class="px-3 py-1.5 rounded-full text-xs font-bold text-sky-600 hover:underline">All areas →</a>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100">
          <h3 class="text-lg font-bold text-slate-900 font-heading mb-3">Other Care Situations</h3>
          <div class="flex flex-wrap gap-2">
            ${others.map(o => `<a href="/conditions/${o.slug}/" class="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-xs font-semibold text-slate-700 hover:text-sky-700 transition">${o.name}</a>`).join('')}
          </div>
        </div>

        <p class="text-[11px] text-slate-500 leading-relaxed">
          This page is general information, not a medical diagnosis or a replacement for your treating doctor's advice. In an emergency call 108 or go to the nearest hospital. <a href="/medical-disclaimer/" class="text-sky-600 hover:underline">Medical disclaimer</a>.
        </p>
      </div>
    </div>
  `;
}

module.exports = { renderConditionsOverview, renderConditionPage };
