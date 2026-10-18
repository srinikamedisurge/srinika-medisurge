const CONFIG = require('../../site.config.js');
const { pricify } = require('../data/price_lines.js');
const SERVICES = require('../data/services.js');
const DOCTORS = require('../data/doctors.js');
const AREAS = require('../data/areas.js');
const BLOG_POSTS = require('../data/blog.js');

function renderSitemapPage() {
  const mainPages = [
    { title: "Home", url: "/", desc: "Doorstep healthcare, nursing care and specialist doctor consultations across Lucknow." },
    { title: "Services Overview", url: "/services/", desc: "Comprehensive range of medical and surgical doorstep home procedures." },
    { title: "Our Doctors & Clinicians", url: "/doctors/", desc: "Specialist doctors, neuro physiotherapists, and certified nursing staff." },
    { title: "Medical Equipment Rental", url: "/equipment/", desc: "Hospital-grade BiPAP, oxygen concentrators, and monitoring equipment." },
    { title: "Areas We Serve", url: "/areas/", desc: "Locality coverage and rapid response times across Lucknow." },
    { title: "Pricing & Calculator", url: "/pricing/", desc: "100% transparent pricing and instant cost estimator for home care." },
    { title: "Patient Reviews", url: "/reviews/", desc: "Genuine patient testimonials and verified clinical care stories." },
    { title: "Healthcare Blog", url: "/blog/", desc: "Clinical advice, elderly care guidance, and procedure protocols." },
    { title: "Book Medical Visit", url: "/book/", desc: "Online doctor video consultations and doorstep visit scheduling." },
    { title: "Contact & Clinic Location", url: "/contact/", desc: "Clinic address in Gomti Nagar, helpline phone numbers, and WhatsApp." }
  ];

  const policyPages = [
    { title: "Privacy Policy", url: "/privacy-policy/", desc: "Patient data confidentiality and digital privacy compliance." },
    { title: "Terms and Conditions", url: "/terms-and-conditions/", desc: "Terms of clinical service, scheduling, and doorstep protocol." },
    { title: "Refund and Cancellation Policy", url: "/refund-and-cancellation-policy/", desc: "Clear cancellation terms for online consultations and home visits." },
    { title: "Medical Disclaimer", url: "/medical-disclaimer/", desc: "Scope of home care, emergency 108 protocol, and clinical guidance." }
  ];

  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Navigation Index
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Site Map
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Complete, structured index of all pages, doorstep clinical services, doctor directories, area coverage guides, and medical resources across Srinika Medisurge Lucknow.
        </p>
      </div>
    </div>

    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- 1. Main Pages -->
        <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg">
              <i class="fa-solid fa-house-chimney-medical"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 font-heading">Main Website Pages</h2>
              <p class="text-xs text-slate-500">Core navigation pages and booking tools</p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${mainPages.map(page => `
              <a href="${page.url}" class="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-100 hover:border-sky-200 transition group flex flex-col justify-between">
                <div>
                  <h3 class="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition flex items-center justify-between">
                    <span>${page.title}</span>
                    <i class="fa-solid fa-arrow-right text-[11px] text-slate-400 group-hover:text-sky-600 transition"></i>
                  </h3>
                  <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">${page.desc}</p>
                </div>
                <span class="text-[10px] font-mono text-slate-400 mt-3 block">${page.url}</span>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- 2. All Doorstep Services -->
        <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg">
              <i class="fa-solid fa-stethoscope"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 font-heading">Doorstep Medical & Nursing Services (${SERVICES.length})</h2>
              <p class="text-xs text-slate-500">Hospital-grade clinical procedures delivered at your home</p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${SERVICES.map(srv => `
              <a href="/services/${srv.slug}/" class="p-4 rounded-2xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 hover:border-teal-200 transition group flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">${pricify(srv.price, srv.slug)}</span>
                    <i class="fa-solid fa-arrow-right text-[11px] text-slate-400 group-hover:text-teal-600 transition"></i>
                  </div>
                  <h3 class="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition">${srv.shortTitle || srv.title}</h3>
                  <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">${srv.summary}</p>
                </div>
                <span class="text-[10px] font-mono text-slate-400 mt-3 block">/services/${srv.slug}/</span>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- 3. Specialist Doctors & Equipment -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg">
                <i class="fa-solid fa-user-doctor"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-900 font-heading">Doctors & Specialists</h2>
                <p class="text-xs text-slate-500">Leadership and clinical team profiles</p>
              </div>
            </div>
            <div class="space-y-3">
              <a href="/doctors/" class="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-bold text-slate-900">All Doctors & Medical Officers Directory</h3>
                  <p class="text-xs text-slate-500">View complete credentials, experience & consultation fees</p>
                </div>
                <i class="fa-solid fa-arrow-right text-xs text-sky-600"></i>
              </a>
              ${DOCTORS.map(doc => `
                <a href="/doctors/#${doc.id}" class="p-3 rounded-xl bg-slate-50/60 hover:bg-sky-50/40 border border-slate-100 transition flex items-center justify-between text-xs">
                  <div>
                    <strong class="text-slate-800">${doc.name}</strong>
                    <span class="text-slate-500 block text-[11px]">${doc.role}</span>
                  </div>
                  <span class="font-bold text-emerald-600">${doc.pricing.split('•')[0]}</span>
                </a>
              `).join('')}
            </div>
          </div>

          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
                <i class="fa-solid fa-lungs"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-900 font-heading">Medical Equipment Rental</h2>
                <p class="text-xs text-slate-500">Home respiratory & ICU monitoring setup</p>
              </div>
            </div>
            <div class="space-y-3">
              <a href="/equipment/" class="p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-bold text-slate-900">Medical Equipment Rental Page</h3>
                  <p class="text-xs text-slate-500">BiPAP machines, 5L/10L oxygen concentrators, and vitals monitors</p>
                </div>
                <i class="fa-solid fa-arrow-right text-xs text-indigo-600"></i>
              </a>
              <div class="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1.5">
                <p class="font-semibold text-slate-800">Featured Hospital-Grade Equipment:</p>
                <p>• ResMed & BMC BiPAP / CPAP Machines (From ₹1,200 / session)</p>
                <p>• 5L & 10L High-Purity Oxygen Concentrators</p>
                <p>• Multi-Para Patient Vitals Monitors & Syringe Infusion Pumps</p>
                <p>• Hospital Beds with Air Mattresses for Bedridden Care</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. Lucknow Areas We Serve -->
        <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 font-heading">Lucknow Areas We Serve (${AREAS.length})</h2>
              <p class="text-xs text-slate-500">Locality-specific doorstep healthcare guides with real response times</p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${AREAS.map(area => `
              <a href="/areas/${area.slug}/" class="p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border border-slate-100 hover:border-amber-200 transition group flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">⏱ ${area.responseTime}</span>
                    <i class="fa-solid fa-arrow-right text-[11px] text-slate-400 group-hover:text-amber-600 transition"></i>
                  </div>
                  <h3 class="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition">${area.name}</h3>
                  <p class="text-xs text-slate-500 mt-1 line-clamp-2">${Array.isArray(area.landmarks) ? area.landmarks.slice(0, 3).join(', ') : area.landmarks}</p>
                </div>
                <span class="text-[10px] font-mono text-slate-400 mt-3 block">/areas/${area.slug}/</span>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- 5. Healthcare Blog Articles -->
        <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg">
              <i class="fa-solid fa-newspaper"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 font-heading">Clinical Blog Articles (${BLOG_POSTS.length})</h2>
              <p class="text-xs text-slate-500">Doctor-verified guides on home nursing, injections, catheterization, and post-op care</p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${BLOG_POSTS.map(post => `
              <a href="/blog/${post.slug}/" class="p-4 rounded-2xl bg-slate-50 hover:bg-rose-50/60 border border-slate-100 hover:border-rose-200 transition group flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">${post.category}</span>
                    <span class="text-[10px] text-slate-400">${post.readTime}</span>
                  </div>
                  <h3 class="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition line-clamp-2">${post.title}</h3>
                  <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">${post.excerpt}</p>
                </div>
                <span class="text-[10px] font-mono text-slate-400 mt-3 block">/blog/${post.slug}/</span>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- 6. Policies & Legal -->
        <section class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg">
              <i class="fa-solid fa-scale-balanced"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900 font-heading">Policies, Legal & Clinical Guidelines</h2>
              <p class="text-xs text-slate-500">Patient rights, transparent terms, privacy, and safety protocols</p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${policyPages.map(pol => `
              <a href="${pol.url}" class="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition group flex flex-col justify-between">
                <div>
                  <h3 class="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition">${pol.title}</h3>
                  <p class="text-xs text-slate-500 mt-1 line-clamp-2">${pol.desc}</p>
                </div>
                <span class="text-[10px] font-mono text-slate-400 mt-2 block">${pol.url}</span>
              </a>
            `).join('')}
          </div>
        </section>

      </div>
    </div>
  `;
}

module.exports = {
  renderSitemapPage
};
