const CONFIG = require('../../site.config.js');
const { askPriceText, askPriceLink, askPriceBox } = require('./ask_price.js');
const DOCTORS = require('../data/doctors.js');

function renderDoctorsPage() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Medical Leadership & Clinicians
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Our Specialist Doctors & Clinical Team in Lucknow
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Compassionate clinical care delivered with dignity. Led by <strong>${CONFIG.founderName}</strong> and backed by senior specialist physicians, neuro physiotherapists, and certified nursing staff across Lucknow.
        </p>
      </div>
    </div>

    <!-- Doctor Profiles Section -->
    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${DOCTORS.map(doc => `
            <div id="${doc.id}" class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between scroll-mt-24">
              <div>
                <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5 text-center sm:text-left">
                  <div class="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border-2 border-slate-100 shadow-inner">
                    <img src="/${doc.image}" alt="${doc.name} - ${doc.specialty}" width="160" height="160" class="w-full h-full object-cover object-top" loading="lazy">
                  </div>
                  <div>
                    <div class="flex flex-wrap gap-1 justify-center sm:justify-start mb-2">
                      ${doc.badges.map(b => `
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">${b}</span>
                      `).join('')}
                    </div>
                    <h2 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading">${doc.name}</h2>
                    <p class="text-xs font-bold text-emerald-600 mb-1">${doc.degrees}</p>
                    <p class="text-xs font-semibold text-slate-500">${doc.specialty}</p>
                    <p class="text-[11px] text-slate-400 mt-1">${Array.isArray(doc.experience) ? doc.experience.join(' • ') : doc.experience}</p>
                  </div>
                </div>

                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  ${doc.bio}
                </p>
              </div>

              <div class="pt-5 border-t border-slate-100 space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 uppercase font-bold text-[10px]">${doc.pricing}</span>
                  ${askPriceLink("consultation with " + doc.name, "text-emerald-700 hover:text-emerald-800 font-extrabold")}
                </div>

                <div class="grid grid-cols-2 gap-2">
                  ${doc.id === 'dr-piyush-saxena' ? `
                  <a href="tel:${CONFIG.drPiyushPhoneTel}" class="py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl text-center shadow-sm transition">
                    Call Dr. Piyush
                  </a>
                  <a href="${CONFIG.drPiyushWhatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I would like to consult with you')}" target="_blank" rel="noopener noreferrer" class="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1.5">
                    <i class="fa-brands fa-whatsapp text-emerald-600"></i>
                    <span>WhatsApp</span>
                  </a>
                  ` : `
                  <a href="/book/?doctor=${encodeURIComponent(doc.name)}" class="py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl text-center shadow-sm transition">
                    Book Consult
                  </a>
                  <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste, I would like to consult with ' + doc.name)}" target="_blank" rel="noopener noreferrer" class="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1.5">
                    <i class="fa-brands fa-whatsapp text-emerald-600"></i>
                    <span>WhatsApp</span>
                  </a>
                  `}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Transparent Doctor Fee Breakdown Table -->
        <div class="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 class="text-xl font-bold text-slate-900 font-heading">
            Transparent Specialist Consultation Fees in Lucknow
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-700">
                  <th class="p-3 font-bold border border-slate-200">Consultation Format</th>
                  <th class="p-3 font-bold border border-slate-200">Charges</th>
                  <th class="p-3 font-bold border border-slate-200">Coverage & Scope</th>
                  <th class="p-3 font-bold border border-slate-200">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs sm:text-sm">
                <tr>
                  <td class="p-3 font-semibold text-slate-800">Online Doctor Video Consultation</td>
                  <td class="p-3">${askPriceLink("Online Doctor Video Consultation", "text-emerald-700 hover:text-emerald-800 font-bold text-xs")}</td>
                  <td class="p-3 text-slate-600">Direct Video / Tele-Call with Dr. Piyush Saxena or Specialists; digital prescription on WhatsApp</td>
                  <td class="p-3"><a href="/book/?service=Online%20Doctor%20Consultation" class="text-sky-600 font-bold hover:underline">Book Online</a></td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-800">Doctor Consultation At Doorstep</td>
                  <td class="p-3">${askPriceLink("Doctor Consultation At Doorstep", "text-emerald-700 hover:text-emerald-800 font-bold text-xs")}</td>
                  <td class="p-3 text-slate-600">Physical examination at residence (within 5 km radius in Lucknow); treatment plan & follow-up</td>
                  <td class="p-3"><a href="/book/?service=Doctor%20Consultation%20At%20Door%20Step" class="text-sky-600 font-bold hover:underline">Book Visit</a></td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-800">Home Physiotherapy Session</td>
                  <td class="p-3">${askPriceLink("Home Physiotherapy Session", "text-emerald-700 hover:text-emerald-800 font-bold text-xs")}</td>
                  <td class="p-3 text-slate-600">45-60 min targeted session by Dr. Desh Deepak Singh (P.T.) or certified therapist; includes electrotherapy</td>
                  <td class="p-3"><a href="/book/?service=Physiotherapy%20At%20Door%20Step" class="text-sky-600 font-bold hover:underline">Book Physio</a></td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-slate-800">Certified Nurse Procedure Visit</td>
                  <td class="p-3">${askPriceLink("Nurse Procedure Visit", "text-emerald-700 hover:text-emerald-800 font-bold text-xs")}</td>
                  <td class="p-3 text-slate-600">Catheterization, IV drips, injections, wound dressing under Dr. Piyush Saxena's clinical oversight</td>
                  <td class="p-3"><a href="/services/" class="text-sky-600 font-bold hover:underline">View All</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  `;
}

module.exports = {
  renderDoctorsPage
};
