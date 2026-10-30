const CONFIG = require('../../site.config.js');
const BLOG_POSTS = require('../data/blog.js');
const SERVICES = require('../data/services.js');
const { askPriceText, askPriceLink, askPriceBox } = require('./ask_price.js');

// Newest first, so fresh articles get the most prominent links.
const POSTS_BY_DATE = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

// Up to `limit` other posts, same category first, then newest.
function relatedPosts(post, limit = 3) {
  const others = POSTS_BY_DATE.filter(p => p.slug !== post.slug);
  const sameCategory = others.filter(p => p.category === post.category);
  const rest = others.filter(p => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

function renderBlogOverview() {
  return `
    <div class="bg-gradient-to-b from-brand-50 to-white py-12 sm:py-16 border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
          Medical Guides & Health Tips
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-4 mb-4">
          Doorstep Healthcare & Nursing Blog
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Expert healthcare advice, clinical recovery guides, and patient care insights written by the Srinika Medisurge medical team under Dr. Piyush Saxena.
        </p>
      </div>
    </div>

    <div class="py-12 sm:py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${POSTS_BY_DATE.map(post => `
            <article class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span class="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 font-bold border border-sky-100">
                    ${post.category}
                  </span>
                  <span><i class="fa-regular fa-clock mr-1"></i>${post.readTime}</span>
                </div>

                <h2 class="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition font-heading mb-3">
                  <a href="/blog/${post.slug}/" class="hover:underline">${post.title}</a>
                </h2>

                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  ${post.excerpt}
                </p>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="text-slate-500 font-medium">${post.date}</span>
                <a href="/blog/${post.slug}/" class="font-bold text-sky-600 group-hover:text-sky-800 inline-flex items-center gap-1">
                  <span>Read Article</span>
                  <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function relatedServicesOf(post) {
  return (post.relatedServices || [])
    .map(slug => SERVICES.find(s => s.slug === slug))
    .filter(Boolean);
}

function renderBlogPost(post) {
  return `
    <article class="py-12 sm:py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Post Header -->
        <header class="mb-10 text-center sm:text-left space-y-4">
          <div class="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
              ${post.category}
            </span>
            <span class="text-xs text-slate-500">
              <i class="fa-regular fa-calendar mr-1"></i> <time datetime="${post.date}">${post.date}</time>
            </span>
            ${post.dateModified && post.dateModified !== post.date ? `
              <span class="text-xs text-slate-500">
                &bull; Updated <time datetime="${post.dateModified}">${post.dateModified}</time>
              </span>
            ` : ''}
            <span class="text-xs text-slate-500">
              &bull; <i class="fa-regular fa-clock mr-1"></i> ${post.readTime}
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            ${post.title}
          </h1>

          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              SM
            </div>
            <div class="text-xs text-left">
              <span class="text-slate-400 block uppercase font-bold text-[10px]">Author</span>
              <strong class="text-slate-900 text-sm block">${post.author}</strong>
              <span class="text-slate-500">Srinika Medisurge Doorstep Healthcare, Gomti Nagar, Lucknow</span>
              <span class="text-emerald-700 font-semibold block mt-1">
                <i class="fa-solid fa-user-doctor mr-1"></i> Medically reviewed by <a href="/doctors/" class="underline hover:text-emerald-900">Dr. Piyush Saxena</a>
              </span>
            </div>
          </div>
        </header>

        <!-- Article Content -->
        <div class="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 border-b border-slate-200 pb-12">
          ${post.contentHtml}
        </div>

        <!-- FAQs Section for Blog Post -->
        ${post.faqs && post.faqs.length > 0 ? `
          <div class="py-10 border-b border-slate-200 space-y-6">
            <h3 class="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <i class="fa-solid fa-circle-question text-sky-600"></i>
              <span>Frequently Asked Questions</span>
            </h3>
            <div class="space-y-4">
              ${post.faqs.map(faq => `
                <div class="faq-item bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden">
                  <button onclick="toggleFaq(this)" type="button" class="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm focus:outline-none">
                    <span>${faq.q}</span>
                    <i class="fa-solid fa-chevron-down faq-icon text-slate-400 text-xs shrink-0 transition-transform"></i>
                  </button>
                  <div class="faq-content px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    ${faq.a}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Related Services -->
        ${relatedServicesOf(post).length > 0 ? `
          <div class="py-10 border-b border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 font-heading mb-4">Related Doorstep Services in Lucknow</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              ${relatedServicesOf(post).map(s => `
                <a href="/services/${s.slug}/" class="p-4 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition block group">
                  <span class="text-sm font-bold text-slate-900 group-hover:text-sky-600 block mb-1">${s.shortTitle}</span>
                  ${askPriceText("text-[11px] text-slate-500")}
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Related Articles -->
        <div class="py-10 border-b border-slate-200">
          <h3 class="text-xl font-bold text-slate-900 font-heading mb-4">More Home Care Guides</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${relatedPosts(post).map(p => `
              <a href="/blog/${p.slug}/" class="p-4 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition block group">
                <span class="text-[10px] font-bold text-sky-700 uppercase block mb-1">${p.category}</span>
                <span class="text-sm font-bold text-slate-900 group-hover:text-sky-600 block">${p.title}</span>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Post Footer CTA -->
        <div class="mt-10 p-8 bg-gradient-to-r from-medical-navy via-brand-900 to-medical-teal text-white rounded-3xl text-center space-y-4">
          <h3 class="text-2xl font-extrabold font-heading">
            Need Expert Healthcare at Home in Lucknow?
          </h3>
          <p class="text-slate-200 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Our qualified nursing team and doctors reach your residence within 30-45 minutes. Gentle care, 100% sterile consumables, and zero travel stress.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="/book/" class="px-6 py-3 bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition shadow">
              Book Doorstep Visit
            </a>
            <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I read your article on ' + post.shortTitle + ' and need guidance.')}" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow flex items-center gap-2">
              <i class="fa-brands fa-whatsapp"></i>
              <span>WhatsApp Doctor</span>
            </a>
            <a href="tel:${CONFIG.phone}" class="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 transition">
              Call ${CONFIG.phoneFormatted}
            </a>
          </div>
        </div>

      </div>
    </article>
  `;
}

module.exports = {
  POSTS_BY_DATE,
  relatedPosts,
  renderBlogOverview,
  renderBlogPost
};
