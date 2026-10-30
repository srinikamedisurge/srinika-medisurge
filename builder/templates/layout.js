const CONFIG = require('../../site.config.js');


function renderBreadcrumbSchema(items) {
  if (!items || items.length === 0) return '';
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url ? `${CONFIG.siteUrl}${item.url}` : CONFIG.siteUrl
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  });
}

function renderBreadcrumbsHtml(items) {
  if (!items || items.length === 0) return '';
  return `
    <nav class="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 text-xs text-slate-600" aria-label="Breadcrumb">
      <div class="max-w-7xl mx-auto flex items-center flex-wrap gap-2">
        <a href="/" class="hover:text-sky-600 transition flex items-center gap-1">
          <i class="fa-solid fa-house text-slate-400 text-[10px]"></i>
          <span>Home</span>
        </a>
        ${items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          if (isLast) {
            return `
              <i class="fa-solid fa-chevron-right text-[9px] text-slate-400"></i>
              <span class="text-slate-900 font-semibold truncate max-w-[240px] sm:max-w-none" aria-current="page">${item.name}</span>
            `;
          }
          return `
            <i class="fa-solid fa-chevron-right text-[9px] text-slate-400"></i>
            <a href="${item.url}" class="hover:text-sky-600 transition truncate max-w-[180px] sm:max-w-none">${item.name}</a>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}

function renderMasterLayout({
  title,
  metaDescription,
  canonicalUrl,
  currentPath = '/',
  ogImage = `${CONFIG.siteUrl}/assets/images/logo.png`,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = 'website',
  articleMeta = null,
  schema = null,
  breadcrumbs = null,
  content = '',
  includeRazorpay = false,
  noindex = false
}) {
  const fullCanonical = `${CONFIG.siteUrl}${canonicalUrl}`;
  const relativeRoot = currentPath.split('/').filter(Boolean).length === 0 ? '.' : currentPath.split('/').filter(Boolean).map(() => '..').join('/');

  // Primary sitewide LocalBusiness / MedicalBusiness Schema
  const validSameAs = [
    CONFIG.socialLinks.facebook,
    CONFIG.socialLinks.instagram,
    CONFIG.socialLinks.googleMaps
  ].filter(url => url && typeof url === 'string' && !url.includes('[') && !url.includes('?cid=srinika-medisurge-lucknow') && url.startsWith('http'));

  const sitewideSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "EmergencyService", "LocalBusiness"],
    "@id": `${CONFIG.siteUrl}/#organization`,
    "name": CONFIG.brandName,
    "alternateName": "Srinika Doorstep Healthcare Lucknow",
    "url": CONFIG.siteUrl,
    "logo": `${CONFIG.siteUrl}/assets/images/logo.png`,
    "image": `${CONFIG.siteUrl}/assets/images/logo.png`,
    "hasMap": CONFIG.socialLinks.googleMaps,
    "telephone": CONFIG.phoneTel,
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Online Transfer, Razorpay",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONFIG.address.street,
      "addressLocality": CONFIG.address.city,
      "addressRegion": CONFIG.address.state,
      "postalCode": CONFIG.address.postalCode,
      "addressCountry": CONFIG.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": CONFIG.geo.latitude,
      "longitude": CONFIG.geo.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": CONFIG.hours.schemaDays,
        "opens": CONFIG.hours.opens,
        "closes": CONFIG.hours.closes
      }
    ],
    "medicalSpecialty": [
      "Nursing",
      "Emergency",
      "Physiotherapy",
      "HomeHealthcare"
    ]
  };

  if (validSameAs.length > 0) {
    sitewideSchema.sameAs = validSameAs;
  }

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services/" },
    { name: "Doctors", url: "/doctors/" },
    { name: "Equipment", url: "/equipment/" },
    { name: "Areas", url: "/areas/" },
    { name: "Pricing", url: "/pricing/" },
    { name: "Reviews", url: "/reviews/" },
    { name: "Blog", url: "/blog/" },
    { name: "Contact", url: "/contact/" }
  ];

  return `<!DOCTYPE html>
<html lang="en-IN" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${currentPath === '/' ? `
  <!-- URL Fragment / Old Hash Redirect Handler -->
  <script>
    (function() {
      try {
        var h = window.location.hash;
        if (!h) return;
        var map = {
          '#services': '/services/',
          '#doctors': '/doctors/',
          '#pricing': '/pricing/',
          '#estimator': '/pricing/',
          '#contact': '/contact/',
          '#reviews': '/reviews/',
          '#about': '/about/',
          '#coverage': '/areas/',
          '#equipment': '/equipment/'
        };
        var target = map[h.toLowerCase()];
        if (target) {
          window.location.replace(target);
        }
      } catch (e) {}
    })();
  </script>
  ` : ''}
  <title>${title}</title>
  <meta name="description" content="${metaDescription}">
  <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
  <link rel="canonical" href="${fullCanonical}">

  ${CONFIG.existingGscTag && !CONFIG.existingGscTag.includes('[') ? `
  <!-- Google Search Console Verification -->
  <meta name="google-site-verification" content="${CONFIG.existingGscTag}" />
  ` : ''}

  <!-- Geo Local SEO Meta Tags (Lucknow, Uttar Pradesh) -->
  <meta name="geo.region" content="IN-UP">
  <meta name="geo.placename" content="${CONFIG.address.full}">
  <meta name="geo.position" content="${CONFIG.geo.latitude};${CONFIG.geo.longitude}">
  <meta name="ICBM" content="${CONFIG.geo.latitude}, ${CONFIG.geo.longitude}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${ogType}">${articleMeta ? `
  <meta property="article:published_time" content="${articleMeta.published}">
  <meta property="article:modified_time" content="${articleMeta.modified}">
  <meta property="article:section" content="${articleMeta.section}">` : ''}
  <meta property="og:site_name" content="${CONFIG.brandName}">
  <meta property="og:locale" content="en_IN">
  <meta property="og:url" content="${fullCanonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="${ogImageWidth}">
  <meta property="og:image:height" content="${ogImageHeight}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${metaDescription}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Official Brand Favicons -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="192x192" href="/assets/images/logo-192.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#0e7490">

  <!-- Google Fonts Preconnect & Display Swap -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f0f9ff',
              100: '#e0f2fe',
              200: '#bae6fd',
              500: '#0ea5e9',
              600: '#0284c7',
              700: '#0369a1',
              800: '#075985',
              900: '#0c4a6e',
            },
            medical: {
              teal: '#0d9488',
              emerald: '#059669',
              mint: '#10b981',
              lightGreen: '#ecfdf5',
              navy: '#0f172a'
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            heading: ['"Outfit"', 'sans-serif']
          }
        }
      }
    }
  </script>

  <!-- Font Awesome 6 Icons (Deferred / Non-blocking) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></noscript>

  <!-- Custom Stylesheet (Local Root Relative) -->
  <link rel="stylesheet" href="/assets/css/custom.css">

  <!-- Schema: Sitewide MedicalBusiness / LocalBusiness -->
  <script type="application/ld+json">
  ${JSON.stringify(sitewideSchema, null, 2)}
  </script>

  ${breadcrumbs && breadcrumbs.length > 0 ? `
  <!-- Schema: BreadcrumbList -->
  <script type="application/ld+json">
  ${renderBreadcrumbSchema(breadcrumbs)}
  </script>
  ` : ''}

  ${schema ? `
  <!-- Schema: Page Specific -->
  <script type="application/ld+json">
  ${typeof schema === 'string' ? schema : JSON.stringify(schema, null, 2)}
  </script>
  ` : ''}

  ${CONFIG.ga4Id && !CONFIG.ga4Id.includes('[') ? `
  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${CONFIG.ga4Id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${CONFIG.ga4Id}');
  </script>
  ` : ''}

  ${CONFIG.metaPixelId && !CONFIG.metaPixelId.includes('[') ? `
  <!-- Meta Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${CONFIG.metaPixelId}');
    fbq('track', 'PageView');
  </script>
  ` : ''}

  ${includeRazorpay ? `
  <!-- Razorpay Checkout Gateway SDK (Only loaded on payment & booking pages) -->
  <script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>
  ` : ''}
</head>
<body class="bg-slate-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white flex flex-col min-h-screen">

  <!-- ================= TOP EMERGENCY & ANNOUNCEMENT BAR ================= -->
  <div class="bg-gradient-to-r from-medical-navy via-brand-900 to-medical-teal text-white text-xs py-2 px-4 shadow-sm border-b border-sky-900/50">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
      <div class="flex items-center gap-2 font-medium shrink-0">
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white animate-pulse">
          <i class="fa-solid fa-circle-check mr-1 text-[8px]"></i> 24/7 ACTIVE
        </span>
        <span class="text-slate-200 text-xs hidden md:inline">Doorstep Medical & Nursing Care in Gomti Nagar & Lucknow</span>
        <a href="${CONFIG.socialLinks.googleMaps}" target="_blank" rel="noopener noreferrer" class="hidden xl:inline-flex items-center text-slate-300 hover:text-white transition ml-2" title="View on Google Maps">
          <i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i> Kaushal Puri Rd, Khargapur, Gomti Nagar
        </a>
      </div>

      <div class="flex items-center gap-3 sm:gap-4 text-xs font-semibold shrink-0 ml-auto">
        ${CONFIG.socialLinks.facebook && !CONFIG.socialLinks.facebook.includes('[') ? `
        <a href="${CONFIG.socialLinks.facebook}" target="_blank" rel="noopener noreferrer" class="hidden lg:inline-flex items-center text-slate-300 hover:text-white transition" aria-label="Visit Srinika Medisurge on Facebook">
          <i class="fa-brands fa-facebook-f mr-1"></i> Facebook
        </a>` : ''}
        ${CONFIG.socialLinks.instagram && !CONFIG.socialLinks.instagram.includes('[') ? `
        <a href="${CONFIG.socialLinks.instagram}" target="_blank" rel="noopener noreferrer" class="hidden lg:inline-flex items-center text-slate-300 hover:text-white transition" aria-label="Visit Srinika Medisurge on Instagram">
          <i class="fa-brands fa-instagram mr-1"></i> Instagram
        </a>` : ''}
        <a href="/careers/" class="hidden md:inline-flex items-center text-sky-300 hover:text-white transition whitespace-nowrap">
          <i class="fa-solid fa-user-nurse mr-1"></i> We're Hiring
        </a>
        <a href="tel:${CONFIG.phone}" class="inline-flex items-center text-amber-300 hover:text-amber-200 transition font-bold whitespace-nowrap">
          <i class="fa-solid fa-phone-volume mr-1.5"></i> ${CONFIG.phoneFormatted}
        </a>
        <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I need home medical care in Lucknow')}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-emerald-300 hover:text-emerald-200 transition whitespace-nowrap">
          <i class="fa-brands fa-whatsapp text-sm mr-1"></i> Quick WhatsApp
        </a>
      </div>
    </div>
  </div>

  <!-- ================= STICKY NAVBAR ================= -->
  <header class="sticky top-0 z-50 glass-nav transition-all duration-300 h-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex items-center justify-between h-full gap-2 sm:gap-4">
        
        <!-- Brand Logo & Name Single Row -->
        <a href="/" class="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1 shrink-0">
          <img src="${CONFIG.siteUrl}/assets/images/logo.png" alt="Srinika Medisurge Logo" width="52" height="52" class="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105">
          <div class="leading-tight">
            <span class="text-lg sm:text-xl xl:text-2xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap block font-heading group-hover:text-brand-600 transition">
              Srinika <span class="text-gradient">Medisurge</span>
            </span>
            <span class="text-[10px] font-semibold text-slate-500 tracking-wider uppercase whitespace-nowrap hidden sm:block">
              Doorstep Healthcare • Lucknow
            </span>
          </div>
        </a>

        <!-- Desktop Navigation: 8 Items + Equipment dropdown under Services -->
        <nav class="hidden min-[1100px]:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700" aria-label="Main Navigation">
          <a href="/" class="px-2.5 py-1.5 rounded-lg transition ${currentPath === '/' ? 'text-sky-600 font-bold bg-sky-50' : 'hover:text-sky-600 hover:bg-slate-50'}">
            Home
          </a>

          <!-- Services with Equipment Submenu -->
          <div class="relative group">
            <a href="/services/" class="px-2.5 py-1.5 rounded-lg transition inline-flex items-center gap-1 ${currentPath.startsWith('/services') ? 'text-sky-600 font-bold bg-sky-50' : 'hover:text-sky-600 hover:bg-slate-50'}">
              <span>Services</span>
              <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:text-sky-600 transition"></i>
            </a>
            <div class="absolute left-0 top-full pt-1.5 hidden group-hover:block z-50">
              <div class="w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2">
                <a href="/services/" class="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600">
                  <i class="fa-solid fa-list-ul mr-2 text-sky-500"></i> All Doorstep Services
                </a>
                <a href="/services/online-doctor-consultation/" class="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600">
                  <i class="fa-solid fa-video mr-2 text-sky-500"></i> Online Consultation
                </a>
                <a href="/equipment/" class="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 border-t border-slate-100">
                  <i class="fa-solid fa-lungs mr-2 text-rose-500"></i> Medical Equipment (BiPAP)
                </a>
              </div>
            </div>
          </div>

          <a href="/doctors/" class="px-2.5 py-1.5 rounded-lg transition ${currentPath === '/doctors/' ? 'text-sky-600 font-bold bg-sky-50' : 'hover:text-sky-600 hover:bg-slate-50'}">
            Doctors
          </a>
          <a href="/areas/" class="px-2.5 py-1.5 rounded-lg transition ${currentPath.startsWith('/areas') ? 'text-sky-600 font-bold bg-sky-50' : 'hover:text-sky-600 hover:bg-slate-50'}">
            Areas
          </a>
          <a href="/pricing/" class="px-2.5 py-1.5 rounded-lg transition ${currentPath === '/pricing/' ? 'text-sky-600 font-bold bg-sky-50' : 'hover:text-sky-600 hover:bg-slate-50'}">
            Pricing
          </a>
          <a href="/reviews/" class="px-2.5 py-1.5 rounded-lg transition ${currentPath === '/reviews/' ? 'text-sky-600 font-bold bg-sky-50' : 'hover:text-sky-600 hover:bg-slate-50'}">
            Reviews
          </a>
          <a href="/blog/" class="px-2.5 py-1.5 rounded-lg transition ${currentPath.startsWith('/blog') ? 'text-sky-600 font-bold bg-sky-50' : 'hover:text-sky-600 hover:bg-slate-50'}">
            Blog
          </a>
          <a href="/contact/" class="px-2.5 py-1.5 rounded-lg transition ${currentPath === '/contact/' ? 'text-sky-600 font-bold bg-sky-50' : 'hover:text-sky-600 hover:bg-slate-50'}">
            Contact
          </a>
        </nav>

        <!-- Right Side Desktop CTAs: Guaranteed Non-Wrapping -->
        <div class="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0 whitespace-nowrap">
          <a href="tel:${CONFIG.phone}" class="hidden xl:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-sky-600 px-3 py-2 border border-slate-200 rounded-xl hover:border-sky-300 transition shrink-0 whitespace-nowrap">
            <i class="fa-solid fa-phone text-sky-600"></i>
            <span>${CONFIG.phoneFormatted}</span>
          </a>

          <a href="/book/" class="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-medical-teal hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition transform active:scale-95 shrink-0 whitespace-nowrap">
            <i class="fa-solid fa-calendar-check text-xs"></i>
            <span>Book Visit</span>
          </a>
        </div>

        <!-- Mobile Hamburger Button (< 1100px) -->
        <div class="flex items-center min-[1100px]:hidden shrink-0">
          <a href="/book/" class="mr-2 hidden sm:inline-flex items-center bg-sky-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap">
            Book
          </a>
          <button id="mobile-menu-btn" type="button" class="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500" aria-label="Toggle mobile menu" aria-expanded="false">
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div id="mobile-menu" class="hidden min-[1100px]:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl transition-all">
      <nav class="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
        ${navLinks.map(link => {
          const isActive = currentPath === link.url;
          return `
            <a href="${link.url}" class="px-3 py-2 rounded-lg text-base font-semibold ${isActive ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-sky-600'}">
              ${link.name}
            </a>
          `;
        }).join('')}
      </nav>

      <div class="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
        <a href="/book/" class="w-full py-3 bg-gradient-to-r from-brand-600 to-medical-teal text-white font-bold text-center rounded-xl shadow-sm flex items-center justify-center gap-2">
          <i class="fa-regular fa-calendar-check"></i>
          <span>Book Doorstep Visit / Consultation</span>
        </a>
        <div class="grid grid-cols-2 gap-2">
          <a href="tel:${CONFIG.phone}" class="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5" aria-label="Call clinic">
            <i class="fa-solid fa-phone text-sky-600"></i>
            <span>Call Doctor</span>
          </a>
          <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I need home medical care in Lucknow')}" target="_blank" rel="noopener noreferrer" class="py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5" aria-label="Chat on WhatsApp">
            <i class="fa-brands fa-whatsapp text-emerald-600"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </header>

  ${breadcrumbs ? renderBreadcrumbsHtml(breadcrumbs) : ''}

  <!-- Main Page Content -->
  <main class="flex-grow">
    ${content}
  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="bg-slate-900 text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
        
        <!-- Column 1: Brand & NAP -->
        <div class="lg:col-span-2 space-y-4">
          <a href="/" class="inline-flex items-center gap-3">
            <img src="${CONFIG.siteUrl}/assets/images/logo.png" alt="Srinika Medisurge Logo" width="48" height="48" class="h-12 w-auto object-contain bg-white rounded-xl p-1">
            <span class="text-2xl font-extrabold text-white tracking-tight font-heading">
              Srinika <span class="text-sky-400">Medisurge</span>
            </span>
          </a>
          <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
            Professional doorstep healthcare and home nursing in Lucknow under the direct clinical guidance of <strong>${CONFIG.founderName}</strong>. 
            "All types of care, every step we share • Strong Bonds. Lifelong Care."
          </p>
          <div class="space-y-2 text-xs text-slate-400 pt-1">
            <div class="flex items-start gap-2.5">
              <i class="fa-solid fa-location-dot text-emerald-400 mt-1 shrink-0"></i>
              <span>${CONFIG.address.full}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-phone text-sky-400 shrink-0"></i>
              <a href="tel:${CONFIG.phone}" class="hover:text-white transition font-semibold text-slate-200">${CONFIG.phoneFormatted} (24/7 Helpline)</a>
            </div>
            <div class="flex items-center gap-2.5">
              <i class="fa-brands fa-whatsapp text-emerald-400 shrink-0"></i>
              <a href="${CONFIG.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">${CONFIG.whatsappDisplay} (Direct WhatsApp)</a>
            </div>
            ${CONFIG.email && !CONFIG.email.includes('[') ? `
            <div class="flex items-center gap-2.5">
              <i class="fa-regular fa-envelope text-amber-400 shrink-0"></i>
              <a href="mailto:${CONFIG.email}" class="hover:text-white transition">${CONFIG.email}</a>
            </div>` : ''}
          </div>

          <!-- Social Links with proper aria-labels and security attributes -->
          <div class="flex items-center gap-3 pt-3">
            ${CONFIG.socialLinks.facebook && !CONFIG.socialLinks.facebook.includes('[') ? `
            <a href="${CONFIG.socialLinks.facebook}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-sky-600 text-white flex items-center justify-center transition" aria-label="Visit Srinika Medisurge on Facebook">
              <i class="fa-brands fa-facebook-f text-sm"></i>
            </a>` : ''}
            ${CONFIG.socialLinks.instagram && !CONFIG.socialLinks.instagram.includes('[') ? `
            <a href="${CONFIG.socialLinks.instagram}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 text-white flex items-center justify-center transition" aria-label="Visit Srinika Medisurge on Instagram">
              <i class="fa-brands fa-instagram text-sm"></i>
            </a>` : ''}
            <a href="${CONFIG.socialLinks.googleMaps}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition" aria-label="View Srinika Medisurge on Google Maps">
              <i class="fa-solid fa-map-location-dot text-sm"></i>
            </a>
            <a href="${(CONFIG.googleReviewLink && CONFIG.googleReviewLink.startsWith('http') && !CONFIG.googleReviewLink.includes('[')) ? CONFIG.googleReviewLink : CONFIG.socialLinks.googleMaps}" target="_blank" rel="noopener noreferrer" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition">
              <i class="fa-solid fa-star text-amber-400 text-xs"></i>
              <span>Review on Google</span>
            </a>
          </div>
        </div>

        <!-- Column 2: Core Services -->
        <div>
          <p class="text-white font-bold text-sm tracking-wider uppercase mb-4 font-heading">
            Doorstep Services
          </p>
          <ul class="space-y-2 text-xs">
            <li><a href="/services/doctor-home-visit-lucknow/" class="hover:text-sky-400 transition">Doctor Home Visit</a></li>
            <li><a href="/services/online-doctor-consultation/" class="hover:text-sky-400 transition">Online Doctor Consultation</a></li>
            <li><a href="/services/home-nursing-lucknow/" class="hover:text-sky-400 transition">Home Nursing Procedures</a></li>
            <li><a href="/services/patient-attendant-lucknow/" class="hover:text-sky-400 transition">12-Hr / 24-Hr Patient Attendant</a></li>
            <li><a href="/services/wound-dressing-at-home-lucknow/" class="hover:text-sky-400 transition">Surgical Wound Dressing</a></li>
            <li><a href="/services/urinary-catheterization-at-home-lucknow/" class="hover:text-sky-400 transition">Urinary Catheterization</a></li>
            <li><a href="/services/ng-tube-insertion-at-home-lucknow/" class="hover:text-sky-400 transition">Ryle's / NG Tube Insertion</a></li>
            <li><a href="/services/iv-drip-injection-at-home-lucknow/" class="hover:text-sky-400 transition">IV Drips & Injections</a></li>
            <li><a href="/services/physiotherapy-at-home-lucknow/" class="hover:text-sky-400 transition">Physiotherapy at Home</a></li>
            <li><a href="/services/bipap-oxygen-support-at-home-lucknow/" class="hover:text-sky-400 transition">BiPAP & Oxygen Support</a></li>
            <li><a href="/services/nebulization-vitals-ecg-at-home/" class="hover:text-sky-400 transition">Nebulization Therapy</a></li>
            <li><a href="/services/" class="text-sky-400 font-bold hover:underline pt-1 inline-block">View All Services →</a></li>
          </ul>
        </div>

        <!-- Column 3: Lucknow Areas (Area names only for consistency) -->
        <div>
          <p class="text-white font-bold text-sm tracking-wider uppercase mb-4 font-heading">
            Lucknow Coverage
          </p>
          <ul class="space-y-2 text-xs">
            <li><a href="/areas/home-nursing-gomti-nagar/" class="hover:text-sky-400 transition">Gomti Nagar</a></li>
            <li><a href="/areas/home-nursing-gomti-nagar-extension/" class="hover:text-sky-400 transition">Gomti Nagar Extension</a></li>
            <li><a href="/areas/home-nursing-vibhuti-khand/" class="hover:text-sky-400 transition">Vibhuti Khand</a></li>
            <li><a href="/areas/home-nursing-indira-nagar/" class="hover:text-sky-400 transition">Indira Nagar</a></li>
            <li><a href="/areas/home-nursing-hazratganj/" class="hover:text-sky-400 transition">Hazratganj</a></li>
            <li><a href="/areas/home-nursing-mahanagar/" class="hover:text-sky-400 transition">Mahanagar</a></li>
            <li><a href="/areas/home-nursing-aliganj-jankipuram/" class="hover:text-sky-400 transition">Aliganj & Jankipuram</a></li>
            <li><a href="/areas/home-nursing-shaheed-path-sushant-golf-city/" class="hover:text-sky-400 transition">Sushant Golf City</a></li>
            <li><a href="/areas/home-nursing-alambagh-ashiyana/" class="hover:text-sky-400 transition">Alambagh & Ashiyana</a></li>
            <li><a href="/areas/home-nursing-chinhat-kamta/" class="hover:text-sky-400 transition">Chinhat & Kamta</a></li>
            <li><a href="/areas/" class="text-sky-400 font-bold hover:underline pt-1 inline-block">View All Areas →</a></li>
          </ul>
        </div>

        <!-- Column 4: Quick Links & Legal -->
        <div>
          <p class="text-white font-bold text-sm tracking-wider uppercase mb-4 font-heading">
            Company & Trust
          </p>
          <ul class="space-y-2 text-xs">
            <li><a href="/about/" class="hover:text-sky-400 transition">About Dr. Piyush Saxena</a></li>
            <li><a href="/doctors/" class="hover:text-sky-400 transition">Our Specialist Doctors</a></li>
            <li><a href="/equipment/" class="hover:text-sky-400 transition">Medical Equipment Rental</a></li>
            <li><a href="/pricing/" class="hover:text-sky-400 transition">Charges & Quotes</a></li>
            <li><a href="/reviews/" class="hover:text-sky-400 transition">Patient Reviews & Stories</a></li>
            <li><a href="/blog/" class="hover:text-sky-400 transition">Healthcare Blog & Guides</a></li>
            <li><a href="/book/" class="hover:text-sky-400 transition">Book Doorstep Visit</a></li>
            <li><a href="/contact/" class="hover:text-sky-400 transition">Contact & Map Directions</a></li>
            <li><a href="/careers/" class="hover:text-sky-400 transition">Careers – We're Hiring GDA Staff</a></li>
            <li class="pt-2 border-t border-slate-800"><a href="/privacy-policy/" class="hover:text-slate-400 transition">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions/" class="hover:text-slate-400 transition">Terms & Conditions</a></li>
            <li><a href="/refund-and-cancellation-policy/" class="hover:text-slate-400 transition">Refund & Cancellation</a></li>
            <li><a href="/medical-disclaimer/" class="hover:text-slate-400 transition">Medical Disclaimer</a></li>
            <li><a href="/sitemap/" class="hover:text-sky-400 transition font-semibold">HTML Sitemap</a></li>
          </ul>
        </div>

      </div>

      <!-- Bottom Disclaimer & Copyright (Original Live Wording) -->
      <div class="pt-8 text-xs text-slate-400 space-y-3">
        <p class="leading-relaxed">
          <strong class="text-slate-300">Medical Disclaimer:</strong> For life-threatening trauma requiring immediate surgical operation or ICU ventilation, please call national emergency <strong>108</strong> or visit nearest tertiary hospital.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <p class="text-slate-400">© 2026 Srinika Medisurge. All rights reserved. Guided by Dr. Piyush Saxena, Kaushal Puri Rd, Khargapur, Gomti Nagar, Lucknow, UP 226010.</p>
          <div class="flex items-center gap-4 text-xs font-medium">
            <a href="/privacy-policy/" class="text-slate-300 hover:text-white transition">Privacy</a>
            <a href="/terms-and-conditions/" class="text-slate-300 hover:text-white transition">Terms</a>
            <a href="/refund-and-cancellation-policy/" class="text-slate-300 hover:text-white transition">Refunds</a>
            <a href="/medical-disclaimer/" class="text-slate-300 hover:text-white transition">Disclaimer</a>
            <a href="/sitemap/" class="text-slate-300 hover:text-white transition">Sitemap</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- ================= FLOATING ACTION BUTTONS (DESKTOP ONLY) ================= -->
  <div class="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-none">
    
    <!-- Floating WhatsApp -->
    <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I need home medical care in Lucknow')}" target="_blank" rel="noopener noreferrer" 
       class="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:scale-110 active:scale-95 group relative pulse-glow"
       aria-label="Direct WhatsApp Chat with Srinika Medisurge">
      <i class="fa-brands fa-whatsapp text-2xl sm:text-3xl"></i>
      <span class="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
        Quick WhatsApp
      </span>
    </a>

    <!-- Floating Call Doctor -->
    <a href="tel:${CONFIG.businessPhoneTel}" 
       class="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 bg-sky-600 hover:bg-sky-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-sky-600/30 transition-all transform hover:scale-110 active:scale-95 group relative"
       aria-label="Direct Phone Call to Srinika Medisurge">
      <i class="fa-solid fa-phone text-lg sm:text-xl"></i>
      <span class="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
        Call ${CONFIG.businessPhoneFormatted}
      </span>
    </a>

  </div>

  <!-- ================= STICKY MOBILE BOTTOM BAR ================= -->
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-between sm:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
    <a href="tel:${CONFIG.phone}" class="flex-1 flex flex-col items-center justify-center text-slate-700 hover:text-sky-600 py-1">
      <i class="fa-solid fa-phone text-sky-600 text-base mb-0.5"></i>
      <span class="text-[11px] font-bold">Call Now</span>
    </a>
    
    <a href="${CONFIG.whatsappUrl}?text=${encodeURIComponent('Namaste Dr. Piyush, I need home medical care in Lucknow')}" target="_blank" rel="noopener noreferrer" class="flex-1 flex flex-col items-center justify-center text-slate-700 hover:text-emerald-600 py-1">
      <i class="fa-brands fa-whatsapp text-emerald-600 text-lg mb-0.5"></i>
      <span class="text-[11px] font-bold">WhatsApp</span>
    </a>

    <a href="/book/" class="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-brand-600 to-medical-teal text-white py-1.5 px-2 rounded-xl text-center shadow-sm">
      <i class="fa-solid fa-calendar-check text-xs mb-0.5"></i>
      <span class="text-[11px] font-extrabold uppercase">Book Visit</span>
    </a>
  </div>

  <!-- Core JavaScript -->
  <script src="/assets/js/site-prices.js" defer></script>
  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

module.exports = {
  renderMasterLayout
};
