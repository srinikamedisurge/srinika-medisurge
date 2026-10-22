const fs = require('fs');
const path = require('path');

const CONFIG = require('../site.config.js');
const SERVICES = require('./data/services.js');
const DOCTORS = require('./data/doctors.js');
const EQUIPMENT = require('./data/equipment.js');
const TESTIMONIALS = require('./data/testimonials.js');
const AREAS = require('./data/areas.js');
const BLOG_POSTS = require('./data/blog.js');

const { renderMasterLayout } = require('./templates/layout.js');
const { renderHomePage } = require('./templates/homepage.js');
const { renderServicesOverview, renderServiceDetailPage } = require('./templates/services_pages.js');
const { renderDoctorsPage } = require('./templates/doctors_page.js');
const { renderEquipmentPage } = require('./templates/equipment_page.js');
const { renderAreasOverview, renderAreaDetailPage } = require('./templates/areas_pages.js');
const { renderPricingPage } = require('./templates/pricing_page.js');
const { renderReviewsPage } = require('./templates/reviews_page.js');
const { renderBookPage } = require('./templates/book_page.js');
const { renderContactPage } = require('./templates/contact_page.js');
const { renderBlogOverview, renderBlogPost } = require('./templates/blog_pages.js');
const { renderAboutPage } = require('./templates/about_page.js');
const {
  renderPrivacyPolicy,
  renderTermsAndConditions,
  renderRefundPolicy,
  renderMedicalDisclaimer,
  render404Page
} = require('./templates/policy_pages.js');
const { renderSitemapPage } = require('./templates/sitemap_page.js');

// Root output directory
const ROOT_DIR = path.resolve(__dirname, '..');

// Check unresolved placeholders
const unresolvedPlaceholders = [];
if (CONFIG.email && CONFIG.email.includes('[')) unresolvedPlaceholders.push(`email: ${CONFIG.email}`);
if (CONFIG.socialLinks.facebook && CONFIG.socialLinks.facebook.includes('[')) unresolvedPlaceholders.push(`socialLinks.facebook: ${CONFIG.socialLinks.facebook}`);
if (CONFIG.socialLinks.instagram && CONFIG.socialLinks.instagram.includes('[')) unresolvedPlaceholders.push(`socialLinks.instagram: ${CONFIG.socialLinks.instagram}`);
if (CONFIG.ga4Id && CONFIG.ga4Id.includes('[')) unresolvedPlaceholders.push(`ga4Id: ${CONFIG.ga4Id}`);
if (CONFIG.metaPixelId && CONFIG.metaPixelId.includes('[')) unresolvedPlaceholders.push(`metaPixelId: ${CONFIG.metaPixelId}`);
if (CONFIG.googleReviewLink && CONFIG.googleReviewLink.includes('[')) unresolvedPlaceholders.push(`googleReviewLink: ${CONFIG.googleReviewLink}`);

if (unresolvedPlaceholders.length > 0) {
  console.warn('\n⚠️  BUILD WARNING: The following placeholders remain unresolved in site.config.js:');
  unresolvedPlaceholders.forEach(p => console.warn(`   - ${p}`));
  console.warn('   (These placeholders are safely omitted from public HTML and schema.org markup)\n');
}

// Helper to write files with directory creation
function writeHtml(relPath, htmlContent) {
  const fullPath = path.join(ROOT_DIR, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, htmlContent, 'utf-8');
  console.log(`Generated: ${relPath}`);
}

// Generate FAQ Schema
function buildFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
}

// Track all generated URLs for sitemap.xml
const sitemapEntries = [];

// Pages whose content last changed on a known date. Google only trusts lastmod when it
// tracks real changes, so pages keep their own date instead of all moving on every build.
const DEFAULT_LASTMOD = "2026-10-21";
const CONTENT_UPDATED = "2026-10-22"; // related-guide and nearby-area links added

function registerSitemap(url, priority = "0.8", changefreq = "weekly", lastmod = DEFAULT_LASTMOD) {
  sitemapEntries.push({
    url: `${CONFIG.siteUrl}${url}`,
    lastmod,
    priority,
    changefreq
  });
}

console.log("=== STARTING FULL MULTI-PAGE SITE GENERATION ===");

// 1. HOMEPAGE
const homeFaqs = [
  {
    q: "Are the visiting nurses and staff medically certified?",
    a: "Yes, 100%. All nursing attendants and clinical officers at Srinika Medisurge are certified professionals (GNM/B.Sc Nursing) trained in clinical hygiene, sterile catheterization, painless injection administration, and surgical dressing under the direct oversight of Dr. Piyush Saxena."
  },
  {
    q: "How fast can a nurse reach my house in Lucknow?",
    a: "In Gomti Nagar, Gomti Nagar Extension, and Vibhuti Khand, our average arrival time is 15 to 25 minutes. For other areas like Indira Nagar, Hazratganj, and Mahanagar, arrival is typically within 30 to 45 minutes."
  },
  {
    q: "Do you bring the required medicines and equipment?",
    a: "Our team carries complete sterile consumable kits (sterile gloves, Betadine, gauze, surgical tape, syringes, normal saline, catheter packs). Specific prescribed medicines should be available at home or can be arranged upon prior prescription confirmation."
  },
  {
    q: "Is Dr. Piyush Saxena available for telephonic consultation before visits?",
    a: "Yes. You can directly call +91 8931985484 to explain the patient's condition, surgical history, or immediate symptoms. Dr. Piyush Saxena ensures the exact care requirements are clearly understood before dispatching staff."
  },
  {
    q: "Are home medical services available at night or on weekends?",
    a: "Yes, Srinika Medisurge provides 24/7 on-call emergency doorstep coverage across all 7 days of the week, including holidays and night hours."
  }
];

const homeHtml = renderMasterLayout({
  title: "Srinika Medisurge | Doorstep Healthcare & Nursing Lucknow",
  metaDescription: "Doorstep healthcare & home nursing in Gomti Nagar, Lucknow by Dr. Piyush Saxena. Catheterization, IV drips & wound dressing. Call +91 96530 01359.",
  canonicalUrl: "/",
  currentPath: "/",
  schema: buildFaqSchema(homeFaqs),
  content: renderHomePage()
});
writeHtml("index.html", homeHtml);
registerSitemap("/", "1.0", "daily", CONTENT_UPDATED);

// 2. SERVICES OVERVIEW
const servicesOverviewHtml = renderMasterLayout({
  title: "Doorstep Healthcare & Nursing Services in Lucknow | Srinika",
  metaDescription: "Explore all doorstep healthcare & nursing services in Lucknow by Srinika Medisurge: Doctor visits, catheterization, wound dressing, IV drips, BiPAP & elderly care.",
  canonicalUrl: "/services/",
  currentPath: "/services/",
  breadcrumbs: [
    { name: "Services", url: "/services/" }
  ],
  content: renderServicesOverview()
});
writeHtml("services/index.html", servicesOverviewHtml);
registerSitemap("/services/", "0.9", "weekly");

// 3. INDIVIDUAL SERVICE PAGES (11 Pages)
SERVICES.forEach(service => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalProcedure", "Service"],
        "@id": `${CONFIG.siteUrl}/services/${service.slug}/#service`,
        "name": service.title,
        "description": service.summary,
        "provider": {
          "@type": "MedicalBusiness",
          "name": CONFIG.brandName,
          "telephone": CONFIG.phoneTel,
          "url": CONFIG.siteUrl
        },
        "areaServed": {
          "@type": "City",
          "name": "Lucknow"
        },
        "offers": {
          "@type": "Offer",
          "price": service.priceNumber,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      },
      buildFaqSchema(service.faqs)
    ].filter(Boolean)
  };

  const servicePageHtml = renderMasterLayout({
    title: service.metaTitle,
    metaDescription: service.metaDescription,
    canonicalUrl: `/services/${service.slug}/`,
    currentPath: `/services/${service.slug}/`,
    breadcrumbs: [
      { name: "Services", url: "/services/" },
      { name: service.shortTitle, url: `/services/${service.slug}/` }
    ],
    schema: serviceSchema,
    content: renderServiceDetailPage(service)
  });

  writeHtml(`services/${service.slug}/index.html`, servicePageHtml);
  registerSitemap(`/services/${service.slug}/`, "0.9", "weekly", CONTENT_UPDATED);
});

// 4. DOCTORS PAGE
const doctorsSchema = {
  "@context": "https://schema.org",
  "@graph": DOCTORS.map(doc => ({
    "@type": "Physician",
    "name": doc.name,
    "jobTitle": doc.role,
    "medicalSpecialty": doc.schemaSpecialty,
    "description": doc.bio,
    "image": `${CONFIG.siteUrl}/${doc.image}`,
    "telephone": doc.id === "dr-piyush-saxena" ? CONFIG.drPiyushPhoneTel : CONFIG.businessPhoneTel,
    "worksFor": {
      "@type": "MedicalBusiness",
      "name": CONFIG.brandName,
      "telephone": CONFIG.businessPhoneTel
    }
  }))
};

const doctorsHtml = renderMasterLayout({
  title: "Specialist Doctors & Clinicians Lucknow | Dr. Piyush Saxena",
  metaDescription: "Meet our dedicated doctors & clinicians in Lucknow: Dr. Piyush Saxena, Dr. Harshit Nigam (MD), Dr. Desh Deepak Singh (MPT Neuro), Dr. Akash Shrivastav & Dr. Reshmi R. Call +91 96530 01359.",
  canonicalUrl: "/doctors/",
  currentPath: "/doctors/",
  breadcrumbs: [
    { name: "Doctors", url: "/doctors/" }
  ],
  schema: doctorsSchema,
  content: renderDoctorsPage()
});
writeHtml("doctors/index.html", doctorsHtml);
registerSitemap("/doctors/", "0.8", "monthly");

// 5. EQUIPMENT PAGE
const equipmentHtml = renderMasterLayout({
  title: "Medical Equipment Rental & Support at Home Lucknow | BiPAP",
  metaDescription: "Hospital-grade medical equipment for rent & home setup in Lucknow: BiPAP machines, 5L/10L oxygen concentrators, infusion pumps & multi-para monitors. Call +91 96530 01359.",
  canonicalUrl: "/equipment/",
  currentPath: "/equipment/",
  breadcrumbs: [
    { name: "Equipment", url: "/equipment/" }
  ],
  content: renderEquipmentPage()
});
writeHtml("equipment/index.html", equipmentHtml);
registerSitemap("/equipment/", "0.8", "weekly");

// 6. AREAS OVERVIEW
const areasOverviewHtml = renderMasterLayout({
  title: "Areas Served in Lucknow | Home Nursing & Doctor Visits",
  metaDescription: "Doorstep medical & nursing coverage across Lucknow: Gomti Nagar (15-25 min), Extension, Vibhuti Khand, Indira Nagar, Hazratganj, Mahanagar & Aliganj.",
  canonicalUrl: "/areas/",
  currentPath: "/areas/",
  breadcrumbs: [
    { name: "Areas", url: "/areas/" }
  ],
  content: renderAreasOverview()
});
writeHtml("areas/index.html", areasOverviewHtml);
registerSitemap("/areas/", "0.8", "weekly");

// 7. INDIVIDUAL AREA PAGES (10 Pages)
AREAS.forEach(area => {
  const areaSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "name": `${CONFIG.brandName} - ${area.name}`,
        "description": area.intro,
        "telephone": CONFIG.phoneTel,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": CONFIG.address.street,
          "addressLocality": "Lucknow",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "226010",
          "addressCountry": "IN"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": area.name
        }
      },
      buildFaqSchema(area.faqs)
    ].filter(Boolean)
  };

  const areaPageHtml = renderMasterLayout({
    title: area.metaTitle,
    metaDescription: area.metaDescription,
    canonicalUrl: `/areas/${area.slug}/`,
    currentPath: `/areas/${area.slug}/`,
    breadcrumbs: [
      { name: "Areas", url: "/areas/" },
      { name: area.name, url: `/areas/${area.slug}/` }
    ],
    schema: areaSchema,
    content: renderAreaDetailPage(area)
  });

  writeHtml(`areas/${area.slug}/index.html`, areaPageHtml);
  registerSitemap(`/areas/${area.slug}/`, "0.8", "weekly", CONTENT_UPDATED);
});

// 8. PRICING PAGE
const pricingHtml = renderMasterLayout({
  title: "Pricing & Cost Estimator Lucknow | Home Nursing & Doctor Visit",
  metaDescription: "Transparent doorstep healthcare pricing in Lucknow: Doctor visit ₹2000, Online consult ₹500, Physio ₹600, Dressing ₹399, Catheter ₹599. Calculate visit cost.",
  canonicalUrl: "/pricing/",
  currentPath: "/pricing/",
  breadcrumbs: [
    { name: "Pricing", url: "/pricing/" }
  ],
  content: renderPricingPage()
});
writeHtml("pricing/index.html", pricingHtml);
registerSitemap("/pricing/", "0.8", "weekly");

// 9. REVIEWS PAGE
// NOTE: Schema TODO: Do NOT add aggregateRating/Review schema unless a real verifiable Google/Practo review profile source link is plugged in.
const reviewsHtml = renderMasterLayout({
  title: "Patient Reviews & Testimonials Lucknow | Srinika Medisurge",
  metaDescription: "Verified patient reviews and stories for Srinika Medisurge Lucknow. 4.9★ rating by families in Gomti Nagar, Indira Nagar & Vibhuti Khand. Read real experiences.",
  canonicalUrl: "/reviews/",
  currentPath: "/reviews/",
  breadcrumbs: [
    { name: "Reviews", url: "/reviews/" }
  ],
  content: renderReviewsPage()
});
writeHtml("reviews/index.html", reviewsHtml);
registerSitemap("/reviews/", "0.8", "weekly");

// 10. BOOK VISIT / ONLINE CONSULTATION PAGE
const bookHtml = renderMasterLayout({
  title: "Book Doorstep Visit or Online Consultation | Srinika Lucknow",
  metaDescription: "Book doorstep medical care or online doctor consultation in Lucknow. 30-45 min rapid nursing dispatch or ₹500 video consult with Dr. Piyush Saxena.",
  canonicalUrl: "/book/",
  currentPath: "/book/",
  includeRazorpay: false,
  breadcrumbs: [
    { name: "Book Visit", url: "/book/" }
  ],
  content: renderBookPage()
});
writeHtml("book/index.html", bookHtml);
registerSitemap("/book/", "0.9", "weekly");

// 11. CONTACT PAGE
const contactHtml = renderMasterLayout({
  title: "Contact Srinika Medisurge Lucknow | 24/7 Helpline & Map",
  metaDescription: "Contact Srinika Medisurge: Kaushal Puri Rd, Khargapur, Gomti Nagar, Lucknow, UP 226010. Call +91 96530 01359 or WhatsApp for 24/7 doorstep healthcare.",
  canonicalUrl: "/contact/",
  currentPath: "/contact/",
  breadcrumbs: [
    { name: "Contact", url: "/contact/" }
  ],
  content: renderContactPage()
});
writeHtml("contact/index.html", contactHtml);
registerSitemap("/contact/", "0.8", "monthly");

// 12. BLOG OVERVIEW
const blogOverviewHtml = renderMasterLayout({
  title: "Healthcare Blog & Medical Recovery Guides | Srinika Lucknow",
  metaDescription: "Doctor-reviewed home care guides for Lucknow families: dengue care, bedsore prevention, hospital discharge, catheter care, wound dressing, BiPAP & physiotherapy.",
  canonicalUrl: "/blog/",
  currentPath: "/blog/",
  breadcrumbs: [
    { name: "Blog", url: "/blog/" }
  ],
  content: renderBlogOverview()
});
writeHtml("blog/index.html", blogOverviewHtml);
registerSitemap("/blog/", "0.8", "weekly", CONTENT_UPDATED);

// 13. INDIVIDUAL BLOG POSTS
// Every post page gained related-service and related-article links on CONTENT_UPDATED.
function postModified(post) {
  const own = post.dateModified || post.date;
  return own > CONTENT_UPDATED ? own : CONTENT_UPDATED;
}

const reviewer = DOCTORS.find(d => d.id === "dr-piyush-saxena");

BLOG_POSTS.forEach(post => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.metaDescription,
        "image": `${CONFIG.siteUrl}/assets/images/logo.png`,
        "inLanguage": "en-IN",
        "articleSection": post.category,
        "datePublished": post.date,
        "dateModified": post.dateModified || post.date,
        "author": {
          "@type": "Organization",
          "name": post.author,
          "url": CONFIG.siteUrl
        },
        "publisher": {
          "@id": `${CONFIG.siteUrl}/#organization`,
          "@type": "MedicalBusiness",
          "name": CONFIG.brandName,
          "logo": {
            "@type": "ImageObject",
            "url": `${CONFIG.siteUrl}/assets/images/logo.png`
          }
        },
        "mainEntityOfPage": `${CONFIG.siteUrl}/blog/${post.slug}/`
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${CONFIG.siteUrl}/blog/${post.slug}/#webpage`,
        "url": `${CONFIG.siteUrl}/blog/${post.slug}/`,
        "name": post.title,
        "audience": { "@type": "MedicalAudience", "audienceType": "Patient" },
        "lastReviewed": post.dateModified || post.date,
        "reviewedBy": {
          "@type": "Person",
          "name": reviewer.name,
          "jobTitle": reviewer.role,
          "image": `${CONFIG.siteUrl}/${reviewer.image}`,
          "url": `${CONFIG.siteUrl}/doctors/`
        }
      },
      buildFaqSchema(post.faqs)
    ].filter(Boolean)
  };

  const postHtml = renderMasterLayout({
    title: post.metaTitle,
    metaDescription: post.metaDescription,
    canonicalUrl: `/blog/${post.slug}/`,
    currentPath: `/blog/${post.slug}/`,
    breadcrumbs: [
      { name: "Blog", url: "/blog/" },
      { name: post.shortTitle, url: `/blog/${post.slug}/` }
    ],
    schema: blogSchema,
    ogType: "article",
    articleMeta: { published: post.date, modified: post.dateModified || post.date, section: post.category },
    content: renderBlogPost(post)
  });

  writeHtml(`blog/${post.slug}/index.html`, postHtml);
  registerSitemap(`/blog/${post.slug}/`, "0.7", "monthly", postModified(post));
});

// 14. ABOUT PAGE
const aboutHtml = renderMasterLayout({
  title: "About Srinika Medisurge Lucknow | Dr. Piyush Saxena Story",
  metaDescription: "Learn how Dr. Piyush Saxena founded Srinika Medisurge to deliver compassionate, sterile doorstep healthcare in Lucknow without exhausting hospital queues.",
  canonicalUrl: "/about/",
  currentPath: "/about/",
  breadcrumbs: [
    { name: "About Us", url: "/about/" }
  ],
  content: renderAboutPage()
});
writeHtml("about/index.html", aboutHtml);
registerSitemap("/about/", "0.8", "monthly");

// 15. TRUST & LEGAL POLICY PAGES
const privacyHtml = renderMasterLayout({
  title: "Privacy Policy | Srinika Medisurge Lucknow",
  metaDescription: "Privacy Policy for Srinika Medisurge: How we collect, store, and protect patient medical data, prescriptions, and personal contact details in Lucknow.",
  canonicalUrl: "/privacy-policy/",
  currentPath: "/privacy-policy/",
  breadcrumbs: [{ name: "Privacy Policy", url: "/privacy-policy/" }],
  content: renderPrivacyPolicy()
});
writeHtml("privacy-policy/index.html", privacyHtml);
registerSitemap("/privacy-policy/", "0.4", "yearly");

const termsHtml = renderMasterLayout({
  title: "Terms and Conditions | Srinika Medisurge Lucknow",
  metaDescription: "Terms and Conditions governing doorstep clinical healthcare, home nursing, medical equipment rentals, and online teleconsultations in Lucknow.",
  canonicalUrl: "/terms-and-conditions/",
  currentPath: "/terms-and-conditions/",
  breadcrumbs: [{ name: "Terms & Conditions", url: "/terms-and-conditions/" }],
  content: renderTermsAndConditions()
});
writeHtml("terms-and-conditions/index.html", termsHtml);
registerSitemap("/terms-and-conditions/", "0.4", "yearly");

const refundHtml = renderMasterLayout({
  title: "Refund and Cancellation Policy | Srinika Medisurge",
  metaDescription: "Refund and cancellation guidelines for online doctor video consultations (₹500 fee) and doorstep medical nursing visits in Lucknow.",
  canonicalUrl: "/refund-and-cancellation-policy/",
  currentPath: "/refund-and-cancellation-policy/",
  breadcrumbs: [{ name: "Refund Policy", url: "/refund-and-cancellation-policy/" }],
  content: renderRefundPolicy()
});
writeHtml("refund-and-cancellation-policy/index.html", refundHtml);
registerSitemap("/refund-and-cancellation-policy/", "0.4", "yearly");

const disclaimerHtml = renderMasterLayout({
  title: "Medical Disclaimer | Srinika Medisurge Lucknow",
  metaDescription: "Clinical and medical disclaimer for Srinika Medisurge: Important information on emergency 108 protocol, home care limitations, and telemedicine guidelines.",
  canonicalUrl: "/medical-disclaimer/",
  currentPath: "/medical-disclaimer/",
  breadcrumbs: [{ name: "Medical Disclaimer", url: "/medical-disclaimer/" }],
  content: renderMedicalDisclaimer()
});
writeHtml("medical-disclaimer/index.html", disclaimerHtml);
registerSitemap("/medical-disclaimer/", "0.4", "yearly");

// 16. HTML SITEMAP PAGE
const sitemapPageHtml = renderMasterLayout({
  title: "Site Map | Srinika Medisurge",
  metaDescription: "Structured sitemap of all pages, doorstep clinical services, doctor directory, Lucknow area guides, and health blog articles on Srinika Medisurge.",
  canonicalUrl: "/sitemap/",
  currentPath: "/sitemap/",
  breadcrumbs: [{ name: "Sitemap", url: "/sitemap/" }],
  content: renderSitemapPage()
});
writeHtml("sitemap/index.html", sitemapPageHtml);
registerSitemap("/sitemap/", "0.3", "monthly", CONTENT_UPDATED);

// 17. CUSTOM 404 PAGE (with noindex)
const notFoundHtml = renderMasterLayout({
  title: "404 - Page Not Found | Srinika Medisurge Lucknow",
  metaDescription: "The requested page was not found. Browse Srinika Medisurge doorstep healthcare services, doctors, and pricing in Lucknow.",
  canonicalUrl: "/404.html",
  currentPath: "/404.html",
  noindex: true,
  content: render404Page()
});
writeHtml("404.html", notFoundHtml);

// 17. SITEMAP.XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`Generated: sitemap.xml (${sitemapEntries.length} URLs)`);

// 18. ROBOTS.TXT
const robotsTxt = `User-agent: *
Allow: /

# Disallow confirmation / payment thank-you query states and test paths
Disallow: /book/thank-you*
Disallow: /book/confirmation*
Disallow: /admin/
Disallow: /scratch/
Disallow: /builder/

Sitemap: ${CONFIG.siteUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf-8');
console.log("Generated: robots.txt");

// 19. VERCEL.JSON
const vercelConfig = {
  "cleanUrls": true,
  "trailingSlash": true,
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.srinikamedisurge.in"
        }
      ],
      "destination": "https://srinikamedisurge.in/:path*",
      "permanent": true
    }
  ]
};
fs.writeFileSync(path.join(ROOT_DIR, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf-8');
console.log("Updated: vercel.json (with cleanUrls and trailingSlash)");

console.log("=== SITE GENERATION COMPLETED SUCCESSFULLY ===");
