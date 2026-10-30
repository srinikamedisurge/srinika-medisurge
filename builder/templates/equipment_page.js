const CONFIG = require('../../site.config.js');
const { askPriceText, askPriceLink, askPriceBox } = require('./ask_price.js');
const EQUIPMENT = require('../data/equipment.js');

function renderEquipmentPage() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Hospital-Grade Medical Technology
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Available Instruments & Mechanical Support at Home
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Complete high-dependency medical infrastructure delivered and operated at your doorstep with certified technicians and clinical supervision under <strong>${CONFIG.founderName}</strong>.
        </p>
      </div>
    </div>

    <!-- Equipment Grid -->
    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${EQUIPMENT.map(item => `
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between mb-4">
                  <div class="w-14 h-14 rounded-2xl ${item.iconColor} flex items-center justify-center text-2xl shadow-inner">
                    <i class="fa-solid ${item.icon}"></i>
                  </div>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100">
                    ${item.badge}
                  </span>
                </div>

                <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">${item.category}</span>
                <h2 class="text-xl font-bold text-slate-900 font-heading mb-3">${item.title}</h2>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">${item.description}</p>

                <div class="space-y-2 mb-6">
                  ${item.specs.map(spec => `
                    <div class="flex items-start text-xs text-slate-700">
                      <i class="fa-solid fa-check text-emerald-500 mr-2 mt-0.5 text-[11px] shrink-0"></i>
                      <span>${spec}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-4 border-t border-slate-100 space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <div>
                    <span class="text-[10px] text-slate-400 font-bold block uppercase">Rental Charges</span>
                    ${askPriceLink(item.title + " (rental)", "text-emerald-700 hover:text-emerald-800 font-bold")}
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] text-slate-400 font-bold block uppercase">Dispatch</span>
                    <span class="text-emerald-600 font-semibold text-[11px]"><i class="fa-solid fa-truck-fast mr-1"></i>${item.dispatchTime}</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <a href="/book/?service=${encodeURIComponent(item.title)}" class="py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl text-center shadow-sm transition">
                    Book / Rent
                  </a>
                  <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I want to enquire about ' + item.title + ' in Lucknow.')}" target="_blank" rel="noopener noreferrer" class="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1.5">
                    <i class="fa-brands fa-whatsapp text-emerald-600"></i>
                    <span>Enquire</span>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Equipment Safety & Setup Guide -->
        <div class="p-8 bg-sky-50 rounded-3xl border border-sky-200 text-slate-800 space-y-4">
          <h3 class="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <i class="fa-solid fa-shield-halved text-sky-600"></i>
            <span>Sanitization & Technician Setup Protocol</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every medical instrument delivered by Srinika Medisurge undergoes rigorous multi-point chemical disinfection and electrical safety inspection before dispatch. Our certified technician or nurse installs the equipment, calibrates machine parameters, sizes fresh single-use masks and tubing, and trains family caregivers in operation and emergency precautions.
          </p>
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  renderEquipmentPage
};
