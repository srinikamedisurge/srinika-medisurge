// Prices are NOT shown on the public website. Wherever a price used to appear we show a
// "Price on WhatsApp / Call" prompt instead, so the customer talks to us before a rate is quoted.
// The rates themselves still live in builder/data/price_lines.js and the admin panel (/admin/).
const CONFIG = require('../../site.config.js');

const ASK_LABEL = "Price on WhatsApp / Call";

function priceWhatsAppUrl(serviceName) {
  const text = serviceName
    ? `Namaste Srinika Medisurge, please share the charges for *${serviceName}* in Lucknow.`
    : `Namaste Srinika Medisurge, please share your charges for doorstep care in Lucknow.`;
  return `${CONFIG.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

/** Plain label, safe inside an existing <a> card (no nested links). */
function askPriceText(cls = "") {
  return `<span class="inline-flex items-center gap-1 ${cls}"><i class="fa-brands fa-whatsapp text-emerald-600"></i> ${ASK_LABEL}</span>`;
}

/** Clickable WhatsApp link that asks for this service's price. */
function askPriceLink(serviceName, cls = "text-emerald-700 hover:text-emerald-800 font-bold") {
  return `<a href="${priceWhatsAppUrl(serviceName)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 ${cls}"><i class="fa-brands fa-whatsapp"></i> ${ASK_LABEL}</a>`;
}

/** Larger box: WhatsApp + Call buttons, used where a price block used to be. */
function askPriceBox(serviceName) {
  return `
            <p class="text-xs text-slate-600 leading-relaxed">Charges depend on the patient's condition, care hours and location. Message or call us and we will share the exact rate for your case.</p>
            <div class="flex flex-col sm:flex-row gap-2">
              <a href="${priceWhatsAppUrl(serviceName)}" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2">
                <i class="fa-brands fa-whatsapp text-base"></i><span>Get Price on WhatsApp</span>
              </a>
              <a href="tel:${CONFIG.phoneTel}" class="px-4 py-2.5 bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2">
                <i class="fa-solid fa-phone"></i><span>Call ${CONFIG.phoneFormatted}</span>
              </a>
            </div>`;
}

module.exports = { ASK_LABEL, priceWhatsAppUrl, askPriceText, askPriceLink, askPriceBox };
