const CONFIG = require('../../site.config.js');
const JOBS = require('../data/jobs.js');

const EMPLOYMENT_LABEL = { FULL_TIME: "Full Time", PART_TIME: "Part Time" };
const PRIMARY_HIRING = CONFIG.hiringPhones[0];
const CAREERS_POSTER = { src: "/assets/images/careers/gda-staff-requirement-lucknow.jpg", width: 1024, height: 1536 };

function hiringWhatsappUrl(phone, roleTitle) {
  const text = roleTitle
    ? `Namaste, I want to apply for the ${roleTitle} job at Srinika Medisurge.`
    : 'Namaste, I want to apply for a GDA job at Srinika Medisurge.';
  return `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(text)}`;
}

// JobPosting schema for one role. Lives only on the role's own page: Google ignores
// JobPosting markup on pages that list several jobs.
function buildJobPostingSchema(job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.schemaTitle,
    "identifier": { "@type": "PropertyValue", "name": CONFIG.brandName, "value": job.slug },
    "description": `<p>${job.summary}</p><p><strong>Key responsibilities:</strong></p><ul>${job.responsibilities.map(r => `<li>${r.en}</li>`).join('')}</ul><p><strong>Who can apply:</strong></p><ul>${job.requirements.map(r => `<li>${r}</li>`).join('')}</ul><p>Call or WhatsApp ${CONFIG.hiringPhones.map(p => p.display).join(' / ')} to apply.</p>`,
    "datePosted": job.datePosted,
    "validThrough": `${job.validThrough}T23:59:59+05:30`,
    "employmentType": job.employmentType,
    "directApply": true,
    "industry": "Home Healthcare",
    ...(job.freshersWelcome ? { "experienceRequirements": "no requirements" } : {}),
    ...(job.salary ? {
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": { "@type": "QuantitativeValue", "minValue": job.salary.min, "maxValue": job.salary.max, "unitText": "MONTH" }
      }
    } : {}),
    "hiringOrganization": {
      "@type": "Organization",
      "name": CONFIG.brandName,
      "sameAs": CONFIG.siteUrl,
      "logo": `${CONFIG.siteUrl}/assets/images/logo.png`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CONFIG.address.street,
        "addressLocality": CONFIG.address.city,
        "addressRegion": CONFIG.address.state,
        "postalCode": CONFIG.address.postalCode,
        "addressCountry": CONFIG.address.country
      }
    }
  };
}

function renderJobCard(job, { showDetailsLink }) {
  const a = job.accent;
  return `
    <article id="${job.slug}" class="bg-white rounded-3xl border-2 border-${a}-200 shadow-sm overflow-hidden flex flex-col">
      <div class="bg-${a}-600 text-white px-6 py-5 flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl shrink-0">
          <i class="fa-solid ${job.icon}"></i>
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold font-heading leading-tight">${job.title}</h2>
          <p lang="hi" class="text-xs sm:text-sm text-${a}-100 font-semibold">${job.titleHi}</p>
        </div>
      </div>

      <div class="p-6 sm:p-7 flex-1 flex flex-col gap-5">
        <p class="text-sm font-semibold text-${a}-800 bg-${a}-50 border border-${a}-100 rounded-xl px-4 py-2.5">${job.tagline}</p>

        <div>
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Responsibilities</h3>
          <ul class="space-y-3">
            ${job.responsibilities.map(r => `
              <li class="flex gap-3">
                <i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 shrink-0"></i>
                <div>
                  <p class="text-sm text-slate-800 leading-snug">${r.en}</p>
                  <p lang="hi" class="text-xs text-slate-500 mt-0.5">${r.hi}</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Who Can Apply</h3>
          <ul class="space-y-2">
            ${job.requirements.map(r => `
              <li class="flex gap-3 text-sm text-slate-700 leading-snug">
                <i class="fa-solid fa-angle-right text-${a}-500 mt-1 shrink-0 text-xs"></i>
                <span>${r}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="flex flex-wrap gap-2 text-xs font-semibold">
          ${job.employmentType.map(t => `<span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700"><i class="fa-solid fa-briefcase mr-1 text-slate-400"></i>${EMPLOYMENT_LABEL[t]}</span>`).join('')}
          <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700"><i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>All over Lucknow</span>
        </div>

        <div class="mt-auto pt-2 flex flex-col sm:flex-row gap-3">
          <a href="#apply" data-role="${job.title}" class="apply-role-link flex-1 text-center px-5 py-3 bg-${a}-600 hover:bg-${a}-700 text-white font-bold text-sm rounded-xl shadow-sm transition">
            Apply for ${job.title}
          </a>
          ${showDetailsLink ? `
          <a href="/careers/${job.slug}/" class="flex-1 text-center px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition">
            Full job details
          </a>` : ''}
        </div>
      </div>
    </article>
  `;
}

function renderContactStrip(roleTitle) {
  return `
    <div class="bg-sky-900 rounded-3xl p-6 sm:p-8 text-white grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div>
        <p class="text-xs font-bold uppercase tracking-wider text-sky-300">Call / WhatsApp to apply</p>
        <p class="text-2xl sm:text-3xl font-extrabold font-heading mt-1">Interested? Contact us today.</p>
        <p lang="hi" class="text-sm text-sky-100 mt-2">इच्छुक उम्मीदवार अधिक जानकारी के लिए कॉल या WhatsApp करें।</p>
      </div>
      <div class="space-y-3">
        ${CONFIG.hiringPhones.map(p => `
          <div class="flex gap-2">
            <a href="tel:${p.tel}" class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-sky-900 font-extrabold rounded-xl hover:bg-sky-50 transition">
              <i class="fa-solid fa-phone"></i> ${p.display}
            </a>
            <a href="${hiringWhatsappUrl(p, roleTitle)}" target="_blank" rel="noopener noreferrer" class="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition flex items-center" aria-label="WhatsApp ${p.display}">
              <i class="fa-brands fa-whatsapp text-xl"></i>
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Quick-apply form: no backend, it composes a WhatsApp message to the hiring number
// so the candidate's details land straight in the hiring chat.
function renderApplyForm(defaultRole) {
  return `
    <section id="apply" class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm scroll-mt-24">
      <div class="text-center max-w-2xl mx-auto mb-8">
        <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Quick Apply</span>
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-3">Apply in 1 minute on WhatsApp</h2>
        <p class="text-sm text-slate-600 mt-2">Fill your details and tap the button. WhatsApp will open with your application ready to send to our hiring team.</p>
        <p lang="hi" class="text-xs text-slate-500 mt-1">अपनी जानकारी भरें, बटन दबाएँ और WhatsApp पर भेज दें।</p>
      </div>

      <form id="career-apply-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto" novalidate>
        <label class="block">
          <span class="text-xs font-bold text-slate-700">Full name *</span>
          <input name="name" required autocomplete="name" class="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm" placeholder="Your name">
        </label>
        <label class="block">
          <span class="text-xs font-bold text-slate-700">Mobile number *</span>
          <input name="phone" required type="tel" inputmode="numeric" autocomplete="tel" maxlength="13" class="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm" placeholder="10-digit mobile">
        </label>
        <label class="block">
          <span class="text-xs font-bold text-slate-700">Applying for *</span>
          <select name="role" class="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 outline-none text-sm bg-white">
            ${JOBS.map(j => `<option${j.title === defaultRole ? ' selected' : ''}>${j.title}</option>`).join('')}
          </select>
        </label>
        <label class="block">
          <span class="text-xs font-bold text-slate-700">Job type</span>
          <select name="jobType" class="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 outline-none text-sm bg-white">
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Any</option>
          </select>
        </label>
        <label class="block">
          <span class="text-xs font-bold text-slate-700">Experience</span>
          <select name="experience" class="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 outline-none text-sm bg-white">
            <option>Fresher</option>
            <option>Less than 1 year</option>
            <option>1-3 years</option>
            <option>3+ years</option>
          </select>
        </label>
        <label class="block">
          <span class="text-xs font-bold text-slate-700">Your area in Lucknow</span>
          <input name="area" class="mt-1 w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm" placeholder="e.g. Gomti Nagar, Aliganj">
        </label>
        <p id="career-apply-error" class="sm:col-span-2 hidden text-sm font-semibold text-rose-600"></p>
        <button type="submit" class="sm:col-span-2 flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition">
          <i class="fa-brands fa-whatsapp text-xl"></i> Send application on WhatsApp
        </button>
      </form>
    </section>

    <script>
      (function () {
        var form = document.getElementById('career-apply-form');
        var error = document.getElementById('career-apply-error');
        var hiringWhatsapp = ${JSON.stringify(PRIMARY_HIRING.whatsapp)};

        document.querySelectorAll('.apply-role-link').forEach(function (link) {
          link.addEventListener('click', function () {
            form.elements.role.value = link.getAttribute('data-role');
          });
        });

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var f = form.elements;
          var name = f.name.value.trim();
          var phone = f.phone.value.replace(/\\D/g, '').slice(-10);
          if (!name || phone.length !== 10) {
            error.textContent = 'Please enter your name and a valid 10-digit mobile number.';
            error.classList.remove('hidden');
            return;
          }
          error.classList.add('hidden');
          var lines = [
            'Job Application - Srinika Medisurge',
            'Name: ' + name,
            'Mobile: ' + phone,
            'Applying for: ' + f.role.value,
            'Job type: ' + f.jobType.value,
            'Experience: ' + f.experience.value
          ];
          if (f.area.value.trim()) lines.push('Area: ' + f.area.value.trim());
          if (typeof gtag === 'function') gtag('event', 'career_apply', { role: f.role.value });
          window.open('https://wa.me/' + hiringWhatsapp + '?text=' + encodeURIComponent(lines.join('\\n')), '_blank', 'noopener');
        });
      })();
    </script>
  `;
}

const PERKS = [
  { icon: "fa-location-dot", title: "Work near your home", text: "Duties across all of Lucknow, so we try to match you with patients close to where you live." },
  { icon: "fa-clock", title: "Full time or part time", text: "Day, night and 24-hour duties. Choose the shifts that suit you." },
  { icon: "fa-user-doctor", title: "Doctor-led team", text: "Work under Dr. Piyush Saxena's team, with guidance whenever a patient's condition changes." },
  { icon: "fa-briefcase-medical", title: "Steady work", text: "We get regular home-care requests, so good staff get continuous duties." }
];

function renderPoster() {
  return `
    <figure class="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm max-w-md mx-auto">
      <img src="${CAREERS_POSTER.src}" width="${CAREERS_POSTER.width}" height="${CAREERS_POSTER.height}" loading="lazy" decoding="async"
        alt="Srinika Medisurge staff requirement poster: Senior GDA Staff and Normal GDA jobs, full time and part time, all over Lucknow. Call or WhatsApp ${CONFIG.hiringPhones.map(p => p.display).join(' / ')}"
        class="w-full h-auto rounded-2xl">
      <figcaption class="text-xs text-slate-500 text-center mt-3">Share this poster with anyone looking for a GDA job in Lucknow.</figcaption>
    </figure>
  `;
}

function renderCareersOverview() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
          <i class="fa-solid fa-bullhorn mr-1"></i> We're Hiring in Lucknow
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          GDA Staff Jobs at Srinika Medisurge
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Be a part of our mission to provide quality healthcare at home. We are hiring <strong>Senior GDA Staff</strong> and <strong>GDA attendants</strong> for full-time and part-time home duties across Lucknow.
        </p>
        <p lang="hi" class="text-sm text-slate-500 mt-2">घर पर मरीज़ों की देखभाल के लिए जीडीए स्टाफ की आवश्यकता — पूरे लखनऊ में।</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <a href="#apply" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition">
            <i class="fa-brands fa-whatsapp mr-1"></i> Apply on WhatsApp
          </a>
          <a href="tel:${PRIMARY_HIRING.tel}" class="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm rounded-xl transition">
            <i class="fa-solid fa-phone mr-1 text-sky-600"></i> Call ${PRIMARY_HIRING.display}
          </a>
        </div>
      </div>
    </div>

    <div class="py-12 sm:py-16 bg-slate-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          ${JOBS.map(job => renderJobCard(job, { showDetailsLink: true })).join('')}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${PERKS.map(p => `
            <div class="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
              <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><i class="fa-solid ${p.icon}"></i></div>
              <h3 class="font-bold text-slate-900 text-sm">${p.title}</h3>
              <p class="text-xs text-slate-600 leading-relaxed">${p.text}</p>
            </div>
          `).join('')}
        </div>

        ${renderApplyForm(JOBS[0].title)}

        ${renderContactStrip(null)}

        ${renderPoster()}

        <p class="text-xs text-slate-500 text-center">
          Srinika Medisurge never charges candidates any fee for a job or joining. Please report anyone asking for money in our name.
        </p>
      </div>
    </div>
  `;
}

function renderJobDetailPage(job) {
  const others = JOBS.filter(j => j.slug !== job.slug);
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-10 sm:py-14 border-b border-slate-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Job Opening · Lucknow
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-3">
          ${job.h1}
        </h1>
        <p class="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">${job.summary}</p>
      </div>
    </div>

    <div class="py-12 sm:py-16 bg-slate-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        ${renderJobCard(job, { showDetailsLink: false })}
        ${renderApplyForm(job.title)}
        ${renderContactStrip(job.title)}
        ${renderPoster()}
        <div class="text-center text-sm text-slate-600">
          Also hiring:
          ${others.map(o => `<a href="/careers/${o.slug}/" class="font-bold text-sky-700 hover:underline">${o.title}</a>`).join(', ')}
          · <a href="/careers/" class="font-bold text-sky-700 hover:underline">All openings</a>
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  renderCareersOverview,
  renderJobDetailPage,
  buildJobPostingSchema,
  CAREERS_POSTER
};
