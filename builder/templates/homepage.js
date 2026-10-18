const CONFIG = require('../../site.config.js');
const { P, pricify } = require('../data/price_lines.js');
const SERVICES = require('../data/services.js');
const DOCTORS = require('../data/doctors.js');
const EQUIPMENT = require('../data/equipment.js');
const TESTIMONIALS = require('../data/testimonials.js');
const AREAS = require('../data/areas.js');
const BLOG_POSTS = require('../data/blog.js');

// 1. HOMEPAGE BUILDER (Strictly follows TASK 2)
function renderHomePage() {
  const top6Services = SERVICES.slice(0, 6);
  const top3Testimonials = TESTIMONIALS.slice(0, 3);
  const homeDoctors = DOCTORS.filter(d => d.id !== 'certified-nursing-officers');

  return `
    <!-- 1. HERO SECTION -->
    <section id="hero" class="relative pt-6 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-50 border-b border-slate-200/60">
      <!-- Background subtle glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-100/40 via-medical-lightGreen/50 to-transparent blur-3xl pointer-events-none -z-10"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div class="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-sky-100 text-sky-800 border border-sky-200 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Types of Medical & Surgical Services at Your Doorstep | Gomti Nagar, Lucknow</span>
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight font-heading leading-[1.15]">
              Hospital-Grade Care, <br>
              <span class="text-gradient">Right At Your Doorstep.</span>
            </h1>

            <p class="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Founded by <strong>${CONFIG.founderName}</strong>. Experience compassionate, sterile, and professional patient care, drug administration, catheterization, and surgical dressing in the comfort of your home.
            </p>

            <p class="hidden sm:block text-xs sm:text-sm text-slate-500 italic max-w-xl mx-auto lg:mx-0 font-medium">
              &ldquo;All types of care, every step we share &bull; Strong Bonds. Lifelong Care.&rdquo;
            </p>

            <!-- Hero CTAs: Primary Action + Side-by-Side Quick Contact on Mobile -->
            <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <a href="/book/" class="h-12 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-medical-teal hover:from-brand-700 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2">
                <i class="fa-solid fa-calendar-check"></i>
                <span>Book Doorstep Visit</span>
              </a>

              <div class="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
                <a href="tel:${CONFIG.drPiyushPhoneTel}" class="h-11 sm:h-12 px-3 sm:px-5 rounded-xl border-2 border-sky-600 hover:bg-sky-50 text-sky-700 font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 whitespace-nowrap">
                  <i class="fa-solid fa-phone text-sky-600"></i>
                  <span>Call Doctor</span>
                </a>

                <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush Saxena, I need doorstep medical care in Lucknow')}" target="_blank" rel="noopener noreferrer" class="h-11 sm:h-12 px-3 sm:px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition transform active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap">
                  <i class="fa-brands fa-whatsapp text-base"></i>
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            <!-- Online Consultation Direct Flow Teal Pill Button -->
            <div class="pt-1 flex items-center justify-center lg:justify-start">
              <a href="/book/?service=online-consultation#booking-form" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs sm:text-sm font-bold shadow-2xs transition group">
                <i class="fa-solid fa-video text-teal-600 group-hover:scale-110 transition-transform"></i>
                <span>Need immediate teleconsultation? Consult Online (${P('consult-online')})</span>
                <i class="fa-solid fa-arrow-right text-[11px] text-teal-600 ml-0.5"></i>
              </a>
            </div>

            <!-- Quick Services Picker: Instant clarity on what services can be booked -->
            <div class="pt-2 text-left">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <a href="/services/doctor-home-visit-lucknow/" class="bg-white hover:bg-sky-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-sky-400 shadow-xs transition group flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-user-doctor"></i>
                  </div>
                  <div>
                    <strong class="text-xs font-bold text-slate-900 block leading-tight">Doctor Visit</strong>
                    <span class="text-[10px] text-sky-600 font-semibold block">${P('consult-doorstep')}</span>
                  </div>
                </a>

                <a href="/services/home-nursing-lucknow/" class="bg-white hover:bg-emerald-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-emerald-400 shadow-xs transition group flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-user-nurse"></i>
                  </div>
                  <div>
                    <strong class="text-xs font-bold text-slate-900 block leading-tight">Home Nursing</strong>
                    <span class="text-[10px] text-emerald-600 font-semibold block">From ${P('im-injection')}</span>
                  </div>
                </a>

                <a href="/services/urinary-catheterization-at-home-lucknow/" class="bg-white hover:bg-amber-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-amber-400 shadow-xs transition group flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-kit-medical"></i>
                  </div>
                  <div>
                    <strong class="text-xs font-bold text-slate-900 block leading-tight">Catheter Care</strong>
                    <span class="text-[10px] text-amber-600 font-semibold block">${P('catheter-insertion')}</span>
                  </div>
                </a>

                <a href="/services/online-doctor-consultation/" class="bg-white hover:bg-teal-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-teal-400 shadow-xs transition group flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-video"></i>
                  </div>
                  <div>
                    <strong class="text-xs font-bold text-slate-900 block leading-tight">Tele-Consult</strong>
                    <span class="text-[10px] text-teal-600 font-semibold block">${P('consult-online')}</span>
                  </div>
                </a>
              </div>
            </div>

            <!-- Existing 4 Stats -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80">
              <div class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span class="block text-2xl font-black text-slate-900 font-heading">30-45m</span>
                <span class="text-xs font-semibold text-slate-500">Doorstep Response</span>
              </div>
              <div class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span class="block text-2xl font-black text-emerald-600 font-heading">100%</span>
                <span class="text-xs font-semibold text-slate-500">Sterile Surgical Kits</span>
              </div>
              <div class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span class="block text-2xl font-black text-slate-900 font-heading">2,500+</span>
                <span class="text-xs font-semibold text-slate-500">Home Visits Done</span>
              </div>
              <div class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span class="block text-2xl font-black text-amber-500 font-heading">4.9 ★</span>
                <span class="text-xs font-semibold text-slate-500">Patient Satisfaction</span>
              </div>
            </div>

          </div>

          <!-- Hero Image & Founder Card -->
          <div class="lg:col-span-5 relative">
            <div class="relative mx-auto max-w-md lg:max-w-none">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img src="/assets/images/dr-piyush-saxena.jpg" alt="Dr. Piyush Saxena - Founder Srinika Medisurge Lucknow" width="500" height="580" class="w-full h-[380px] sm:h-[460px] object-cover object-top transition duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-1 z-10">
                  <div class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Doctor On-Call Active
                  </div>
                  <p class="text-2xl font-bold font-heading">Dr. Piyush Saxena</p>
                  <p class="text-xs text-slate-200">Founder & Lead Medical Practitioner • Srinika Medisurge</p>
                  <p class="text-[11px] text-slate-300 pt-0.5">Kaushal Puri Rd, Khargapur, Gomti Nagar HQ</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. EMERGENCY / AVAILABILITY STRIP -->
    <section class="bg-gradient-to-r from-medical-navy to-brand-900 text-white py-4 px-4 shadow-inner">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-lg font-bold shrink-0 animate-bounce">
            <i class="fa-solid fa-bell"></i>
          </div>
          <div>
            <span class="font-bold text-sm block sm:text-base">Need Care At Home Today? Lucknow Wide Coverage</span>
            <p class="text-xs text-slate-300">Professional nursing staff equipped with sterile kits reaches your doorstep within 30-45 minutes.</p>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <a href="tel:${CONFIG.businessPhoneTel}" class="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition shadow">
            <i class="fa-solid fa-phone mr-1.5"></i> Call ${CONFIG.businessPhoneFormatted}
          </a>
          <a href="/services/online-doctor-consultation/" class="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition border border-white/20">
            Consult Online (${P('consult-online')})
          </a>
        </div>
      </div>
    </section>

    <!-- 3. TOP 6 SERVICES SECTION -->
    <section class="py-16 sm:py-24 bg-white" id="services">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
            Hospital-Grade Home Care
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-3 mb-4">
            Our Top Doorstep Medical Services
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            Delivering hospital-standard clinical procedures directly to your residence with sterile single-use disposable kits and licensed medical oversight.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          ${top6Services.map(service => `
            <div class="service-card bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-sky-300 shadow-sm flex flex-col justify-between transition-all group">
              <div>
                <div class="flex items-start justify-between mb-4">
                  <div class="w-14 h-14 rounded-2xl ${service.iconColor} flex items-center justify-center text-2xl shadow-inner">
                    <i class="fa-solid ${service.icon}"></i>
                  </div>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white text-sky-700 border border-slate-200 shadow-2xs">
                    ${service.badge}
                  </span>
                </div>

                <h3 class="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                  <a href="/services/${service.slug}/" class="hover:underline">${service.title}</a>
                </h3>

                <p class="text-slate-600 text-sm leading-relaxed mb-4">
                  ${service.summary}
                </p>

                <div class="space-y-2 mb-6">
                  ${service.whatsIncluded.slice(0, 3).map(f => `
                    <div class="flex items-start text-xs text-slate-700">
                      <i class="fa-solid fa-circle-check text-emerald-500 mr-2 mt-0.5 text-[11px] shrink-0"></i>
                      <span>${f}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-4 border-t border-slate-200/80">
                <div class="flex items-center justify-between mb-3 text-xs">
                  <span class="font-bold text-slate-900 text-sm">${pricify(service.price, service.slug)}</span>
                  <span class="text-slate-500"><i class="fa-regular fa-clock mr-1 text-slate-400"></i>${service.duration}</span>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <a href="${service.slug === 'online-doctor-consultation' ? '/book/?service=online-consultation#booking-form' : '/book/?service=' + encodeURIComponent(service.shortTitle)}" class="py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl text-center shadow-sm transition">
                    ${service.slug === 'online-doctor-consultation' ? 'Book Consultation' : 'Book Visit'}
                  </a>
                  <a href="/services/${service.slug}/" class="py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl text-center border border-slate-200 transition">
                    Details
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mt-12 text-center">
          <a href="/services/" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base shadow-lg transition">
            <span>View All Doorstep Services</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- 4. WHY HOME CARE - 3 PILLARS (Existing text) -->
    <section class="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80" id="about">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            The Srinika Medisurge Standard
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-3 mb-4">
            Why Families in Lucknow Prefer Home Care Over Hospital Queues
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            Taking elderly or bedridden patients to a hospital creates unnecessary stress, physical pain, and exposure to viral infections. Here is how Srinika Medisurge transforms recovery.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Pillar 1 -->
          <div class="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div class="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-2xl shadow-inner">
              <i class="fa-solid fa-bed-pulse"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 font-heading">Zero Travel Pain & Stress</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              No painful ambulance rides, wheelchair transfers, or long hours in hospital OPD waiting areas for routine catheter changes, injections, or wound dressing.
            </p>
            <ul class="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Comfort of patient's own bed</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Emotional peace for elderly family members</li>
            </ul>
          </div>

          <!-- Pillar 2 -->
          <div class="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shadow-inner">
              <i class="fa-solid fa-shield-virus"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 font-heading">Protected from Cross-Infections</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Hospitals harbor multi-drug resistant superbugs and infectious viruses. Home care isolates recovering patients in a clean, sanitized sanctuary.
            </p>
            <ul class="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Single-use disposable surgical packs</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Complete sterile aseptic dressing procedure</li>
            </ul>
          </div>

          <!-- Pillar 3 -->
          <div class="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div class="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-inner">
              <i class="fa-solid fa-user-doctor"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 font-heading">Direct Doctor Oversight</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              Unlike anonymous agencies, Srinika Medisurge operates under the personal guidance of <strong>Dr. Piyush Saxena</strong>, ensuring clinical accountability.
            </p>
            <ul class="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Case history reviewed before procedures</li>
              <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-500"></i> Continuous follow-up on recovery progress</li>
            </ul>
          </div>
        </div>

        <div class="mt-10 text-center">
          <a href="/about/" class="text-sm font-bold text-sky-600 hover:text-sky-800 hover:underline">
            Read full comparison with hospital OPD visits on our About page →
          </a>
        </div>
      </div>
    </section>

    <!-- 5. FOUNDER + DOCTORS PREVIEW -->
    <section class="py-16 sm:py-24 bg-white" id="doctors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
            Medical Specialists Team
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-3 mb-4">
            Meet Our Dedicated Specialist Doctors & Clinicians
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            Expert care delivered with empathy. Consult online (${P('consult-online')}) or request personal doorstep doctor visits (${P('consult-doorstep')} within 5km) and physiotherapy sessions (${P('physiotherapy-doorstep')}) across Lucknow.
          </p>
        </div>

        <!-- Responsive Doctor Grid: 3 columns with bottom 2 centered on desktop (>=1100px), 2 on tablet, 1 on mobile -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          ${homeDoctors.slice(0, 3).map(doc => `
            <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div>
                <div class="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img src="/${doc.image}" alt="${doc.name} - ${doc.specialty}" width="340" height="260" class="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105" loading="lazy">
                </div>
                <div class="flex flex-wrap gap-1 mb-2">
                  ${doc.badges.slice(0, 2).map(b => `
                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100">${b}</span>
                  `).join('')}
                </div>
                <h3 class="text-lg font-bold text-slate-900 font-heading mb-0.5">${doc.name}</h3>
                <p class="text-xs font-semibold text-emerald-600 mb-2">${doc.specialty}</p>
                <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">${doc.bio}</p>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="font-bold text-slate-900">${doc.pricing.split('•')[0]}</span>
                ${doc.id === 'dr-piyush-saxena' ? `
                <a href="tel:${CONFIG.drPiyushPhoneTel}" class="text-sky-600 font-bold hover:underline">Call Dr. Piyush →</a>
                ` : `
                <a href="/doctors/#${doc.id}" class="text-sky-600 font-bold hover:underline">View Bio →</a>
                `}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Second Row: Centered 2 Cards on Desktop -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl lg:max-w-[760px] mx-auto mt-6 lg:mt-8">
          ${homeDoctors.slice(3, 5).map(doc => `
            <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div>
                <div class="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img src="/${doc.image}" alt="${doc.name} - ${doc.specialty}" width="340" height="260" class="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105" loading="lazy">
                </div>
                <div class="flex flex-wrap gap-1 mb-2">
                  ${doc.badges.slice(0, 2).map(b => `
                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100">${b}</span>
                  `).join('')}
                </div>
                <h3 class="text-lg font-bold text-slate-900 font-heading mb-0.5">${doc.name}</h3>
                <p class="text-xs font-semibold text-emerald-600 mb-2">${doc.specialty}</p>
                <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">${doc.bio}</p>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="font-bold text-slate-900">${doc.pricing.split('•')[0]}</span>
                <a href="/doctors/#${doc.id}" class="text-sky-600 font-bold hover:underline">View Bio →</a>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mt-10 text-center">
          <a href="/doctors/" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md transition">
            <span>Meet All Doctors & Clinical Staff</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- 6. 3 BEST TESTIMONIALS + REVIEWS LINK -->
    <section class="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80" id="reviews">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-100">
            Real Patient Stories
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-3 mb-4">
            Trusted by Families Across Lucknow
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hear how Srinika Medisurge helped families care for their loved ones in their hour of need with compassionate, hospital-grade care.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          ${top3Testimonials.map(t => `
            <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="flex text-amber-400 text-xs gap-1">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                  <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    ${t.category}
                  </span>
                </div>
                <blockquote class="text-slate-700 text-sm leading-relaxed italic mb-6">
                  &ldquo;${t.quote}&rdquo;
                </blockquote>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm shadow-inner">
                  ${t.initials}
                </div>
                <div>
                  <strong class="text-sm text-slate-900 block">${t.name}</strong>
                  <span class="text-xs text-slate-500">${t.location}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/reviews/" class="px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow transition">
            Read All Reviews & Stories
          </a>
          <a href="${(CONFIG.googleReviewLink && CONFIG.googleReviewLink.startsWith('http')) ? CONFIG.googleReviewLink : CONFIG.socialLinks.googleMaps}" target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition flex items-center gap-2">
            <i class="fa-solid fa-star text-amber-500"></i>
            <span>4.9★ Patient Satisfaction</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 7. 4-STEP PROCESS (Existing) -->
    <section class="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
            Simple 4-Step Process
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-3 mb-4">
            How to Receive Care At Your Doorstep
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            Getting professional healthcare at home in Lucknow is effortless, reliable, and instant.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/70 text-center space-y-3">
            <div class="w-12 h-12 rounded-full bg-sky-600 text-white font-black text-lg mx-auto flex items-center justify-center shadow-md">
              1
            </div>
            <h3 class="font-bold text-slate-900 text-base">Request Care</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Call <strong>${CONFIG.businessPhoneFormatted}</strong> or tap Book Online. Tell us the patient's requirement (catheter, injection, dressing, elderly care).
            </p>
          </div>

          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/70 text-center space-y-3">
            <div class="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg mx-auto flex items-center justify-center shadow-md">
              2
            </div>
            <h3 class="font-bold text-slate-900 text-base">Doctor Assessment</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Dr. Piyush Saxena reviews the prescription/needs and assigns the right qualified nursing specialist with sterile supplies.
            </p>
          </div>

          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/70 text-center space-y-3">
            <div class="w-12 h-12 rounded-full bg-purple-600 text-white font-black text-lg mx-auto flex items-center justify-center shadow-md">
              3
            </div>
            <h3 class="font-bold text-slate-900 text-base">Rapid Doorstep Arrival</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Our medical staff arrives at your home in Gomti Nagar or Lucknow within 30-45 minutes with sealed, sterile instruments.
            </p>
          </div>

          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/70 text-center space-y-3">
            <div class="w-12 h-12 rounded-full bg-teal-600 text-white font-black text-lg mx-auto flex items-center justify-center shadow-md">
              4
            </div>
            <h3 class="font-bold text-slate-900 text-base">Safe Care & Follow-Up</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Procedure is performed painlessly following aseptic protocols, vitals recorded, and post-procedure advice provided.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. SHORT FAQ (5 existing questions) -->
    <section class="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80" id="faq">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
            Got Questions?
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-slate-600 text-sm sm:text-base">
            Transparent information about our doorstep clinical procedures and home care in Lucknow.
          </p>
        </div>

        <div class="space-y-4">
          ${[
            {
              q: "Are the nurses and healthcare staff certified and qualified?",
              a: "Yes, 100%. All nursing attendants and clinical officers at Srinika Medisurge are certified professionals (GNM/B.Sc Nursing) trained in clinical hygiene, sterile catheterization, painless injection administration, and surgical dressing under the direct oversight of Dr. Piyush Saxena."
            },
            {
              q: "How fast can a nurse reach my house in Lucknow?",
              a: "In Gomti Nagar, Gomti Nagar Extension, and Vibhuti Khand, our average arrival time is 15 to 25 minutes. For other areas like Indira Nagar, Hazratganj, and Mahanagar, arrival is typically within 30 to 45 minutes."
            },
            {
              q: "Do you bring the required medicines and equipment?",
              a: "Our team carries complete sterile consumable kits (sterile gloves, Betadine, gauze, surgical tape, syringes, normal saline, catheter packs). Specific prescribed medicines (such as specialty antibiotics or injectable ampoules) should be available at home or can be arranged upon prior prescription confirmation."
            },
            {
              q: "Is Dr. Piyush Saxena available for telephonic consultation before visits?",
              a: "Yes. You can directly call +91 8931985484 to explain the patient's condition, surgical history, or immediate symptoms. Dr. Piyush Saxena ensures the exact care requirements are clearly understood before dispatching staff."
            },
            {
              q: "Are home medical services available at night or on weekends?",
              a: "Yes, Srinika Medisurge provides 24/7 on-call emergency doorstep coverage across all 7 days of the week, including holidays and night hours."
            }
          ].map((item, idx) => `
            <div class="faq-item bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
              <button onclick="toggleFaq(this)" type="button" class="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus:outline-none" aria-expanded="false">
                <span>${item.q}</span>
                <i class="fa-solid fa-chevron-down faq-icon text-slate-400 text-xs shrink-0 transition-transform"></i>
              </button>
              <div class="faq-content px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                ${item.a}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 9. FINAL CTA BAND -->
    <section class="py-16 sm:py-20 bg-gradient-to-r from-medical-navy via-brand-900 to-medical-teal text-white text-center relative overflow-hidden" id="contact">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
          Hospital-Grade Care, Dignity & Comfort in Lucknow
        </h2>
        <p class="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Avoid agonizing hospital OPD lines. Call Dr. Piyush Saxena and team now for rapid, sterile doorstep medical visits across Gomti Nagar and all Lucknow areas.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a href="tel:${CONFIG.businessPhoneTel}" class="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl transition transform active:scale-95 flex items-center gap-2">
            <i class="fa-solid fa-phone"></i>
            <span>Call ${CONFIG.businessPhoneFormatted}</span>
          </a>
          <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I need home medical care in Lucknow')}" target="_blank" rel="noopener noreferrer" class="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl transition transform active:scale-95 flex items-center gap-2">
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>Chat on WhatsApp</span>
          </a>
          <a href="/book/" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-2xl border border-white/30 transition">
            Book Online
          </a>
        </div>
      </div>
    </section>
  `;
}

module.exports = {
  renderHomePage
};
