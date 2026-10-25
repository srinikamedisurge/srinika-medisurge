const CONFIG = require('../../site.config.js');

function renderAboutPage() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Our Story & Clinical Philosophy
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          About Srinika Medisurge Lucknow
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          &ldquo;Healthcare isn't just medical procedures. It is dignity, trust, and gentle human care.&rdquo;
        </p>
      </div>
    </div>

    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- Founder Story Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-5">
              <div class="rounded-2xl overflow-hidden border-4 border-slate-100 shadow-lg">
                <img src="/assets/images/dr-piyush-saxena.jpg" alt="Dr. Piyush Saxena - Founder of Srinika Medisurge Lucknow" width="400" height="480" class="w-full h-auto object-cover">
              </div>
            </div>
            <div class="lg:col-span-7 space-y-4">
              <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Meet The Founder & Medical Lead</span>
              <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                Dr. Piyush Saxena
              </h2>
              <p class="text-xs text-slate-500 font-semibold uppercase">Founder of Srinika Medisurge</p>
              
              <blockquote class="text-sm sm:text-base text-slate-700 font-medium italic border-l-4 border-sky-500 pl-4 my-2">
                &ldquo;Healthcare isn't just medical procedures. It is dignity, trust, and gentle human care.&rdquo;
              </blockquote>

              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Dr. Piyush Saxena</strong> established Srinika Medisurge with a singular mission: to ensure no patient in Lucknow has to endure excruciating hospital visits for essential clinical procedures like catheter changes, injections, IV drips, and surgical dressing.
              </p>
              
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Headquartered at Kaushal Puri Rd, Khargapur, Gomti Nagar, Srinika Medisurge brings hospital-standard sterilization, licensed medical oversight, and experienced clinical officers directly to the bedside of elderly, paralyzed, and post-operative patients.
              </p>

              <div class="pt-2 flex flex-wrap gap-3">
                <a href="/doctors/" class="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition">
                  Meet Our Doctors
                </a>
                <a href="tel:${CONFIG.drPiyushPhoneTel}" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition">
                  Call Dr. Piyush (${CONFIG.drPiyushPhoneFormatted})
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- The 3 Core Pillars (Preserved Text) -->
        <div class="space-y-6">
          <div class="text-center max-w-2xl mx-auto">
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Our 3 Guiding Pillars of Home Care
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl">
                <i class="fa-solid fa-bed-pulse"></i>
              </div>
              <h3 class="font-bold text-slate-900 text-base">Sterility Without Compromise</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Every procedure utilizes hospital-grade, single-use sterilized consumable kits and strict infection-control protocols.
              </p>
            </div>

            <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                <i class="fa-solid fa-hands-holding-child"></i>
              </div>
              <h3 class="font-bold text-slate-900 text-base">Compassionate Care For Seniors</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Trained nursing staff skilled in gentle handling of delicate elderly skin, diabetic ulcers, and sensitive catheterization.
              </p>
            </div>

            <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                <i class="fa-solid fa-phone-volume"></i>
              </div>
              <h3 class="font-bold text-slate-900 text-base">Direct Access & Availability</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Direct telephonic access to Dr. Piyush Saxena at +91 8931985484 for clinical updates, follow-up, and family guidance.
              </p>
            </div>
          </div>
        </div>

        <!-- Detailed Comparison Table: Doorstep Care vs Hospital OPD -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-2xl mx-auto">
            <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              The Real Comparison
            </span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-2">
              Comparing Doorstep Care with Traditional Hospital Visits
            </h2>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse border border-slate-200 text-sm">
              <thead>
                <tr class="bg-slate-100 text-slate-800">
                  <th class="p-3.5 border border-slate-200 font-bold">Feature / Care Aspect</th>
                  <th class="p-3.5 border border-slate-200 font-bold text-emerald-800 bg-emerald-50">Srinika Medisurge (At Home)</th>
                  <th class="p-3.5 border border-slate-200 font-bold text-rose-800 bg-rose-50">Traditional Hospital Visit</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-xs sm:text-sm">
                <tr>
                  <td class="p-3.5 font-bold text-slate-700">Patient Comfort & Dignity</td>
                  <td class="p-3.5 text-emerald-900 bg-emerald-50/50">100% Home Comfort, Zero Stress</td>
                  <td class="p-3.5 text-rose-900 bg-rose-50/50">Exhausting transport, stretcher waiting</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-bold text-slate-700">Waiting & Queue Time</td>
                  <td class="p-3.5 text-emerald-900 bg-emerald-50/50">0 Mins Wait — Nurse arrives at your time</td>
                  <td class="p-3.5 text-rose-900 bg-rose-50/50">1 to 3 hours in crowded waiting rooms</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-bold text-slate-700">Hospital Infection Exposure</td>
                  <td class="p-3.5 text-emerald-900 bg-emerald-50/50">Zero hospital cross-infection risk</td>
                  <td class="p-3.5 text-rose-900 bg-rose-50/50">High exposure to contagious hospital bacteria & viruses</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-bold text-slate-700">Clinical Attention & Time</td>
                  <td class="p-3.5 text-emerald-900 bg-emerald-50/50">30 to 60 mins dedicated one-on-one attention</td>
                  <td class="p-3.5 text-rose-900 bg-rose-50/50">3 to 5 minutes rushed OPD consultation</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-bold text-slate-700">Travel & Ambulance Costs</td>
                  <td class="p-3.5 text-emerald-900 bg-emerald-50/50">₹0 travel expense, zero fuel or ambulance bills</td>
                  <td class="p-3.5 text-rose-900 bg-rose-50/50">₹1,500 - ₹3,500 per ambulance trip + parking charges</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-bold text-slate-700">Doctor Accountability</td>
                  <td class="p-3.5 text-emerald-900 bg-emerald-50/50">Direct telephonic access to Dr. Piyush Saxena</td>
                  <td class="p-3.5 text-rose-900 bg-rose-50/50">Hard to contact senior doctors directly post-visit</td>
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
  renderAboutPage
};
