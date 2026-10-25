/**
 * Srinika Medisurge - Central Site Configuration
 * All pages, scripts, schemas, and metadata read from this central configuration.
 */

const SITE_CONFIG = {
  // Brand & Business Details
  brandName: "Srinika Medisurge",
  legalEntityName: "Srinika Medisurge Doorstep Healthcare Services",
  taglines: [
    "All types of care, every step we share",
    "Strong Bonds. Lifelong Care."
  ],
  siteUrl: "https://srinikamedisurge.in",
  
  // Leadership & Team
  founderName: "Dr. Piyush Saxena",
  founderRole: "Founder",
  
  // MAIN Business Numbers (NAP Consistency)
  businessPhone: "9653001359",
  businessPhoneFormatted: "+91 96530 01359",
  businessPhoneTel: "+919653001359",
  phone: "9653001359",
  phoneFormatted: "+91 96530 01359",
  phoneTel: "+919653001359",
  whatsappNumber: "919653001359",
  whatsappDisplay: "+91 96530 01359",
  whatsappUrl: "https://wa.me/919653001359",

  // Dr. Piyush Saxena's Personal Number (ONLY for Dr. Piyush's doctor card, FAQ 4 direct call, and about founder section)
  drPiyushPhone: "8931985484",
  drPiyushPhoneFormatted: "+91 89319 85484",
  drPiyushPhoneTel: "+918931985484",
  drPiyushWhatsappUrl: "https://wa.me/918931985484",

  // Staff hiring numbers (ONLY for the /careers/ pages, as printed on the staff-requirement poster)
  hiringPhones: [
    { display: "+91 89319 85484", tel: "+918931985484", whatsapp: "918931985484" },
    { display: "+91 84218 28920", tel: "+918421828920", whatsapp: "918421828920" }
  ],

  address: {
    street: "Kaushal Puri Rd, Khargapur, Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    postalCode: "226010",
    country: "IN",
    full: "Kaushal Puri Rd, Khargapur, Gomti Nagar, Lucknow, UP 226010"
  },
  geo: {
    latitude: 26.8467,
    longitude: 80.9462
  },
  hours: {
    display: "24/7 Doorstep Service (All 7 Days)",
    schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59"
  },

  // Placeholders for external credentials & integrations (to be filled manually by owner)
  email: "[BUSINESS_EMAIL]", // Placeholder: e.g. contact@srinikamedisurge.in
  googleReviewLink: "[GOOGLE_REVIEW_LINK]", // Placeholder: e.g. https://g.page/r/.../review
  googleSearchConsoleTag: "[GSC_VERIFICATION_TAG]",
  existingGscTag: "ONoqlJnFJdarJCMS-sXYtBwhWBmaCaDP1jOxYsOmnVs",
  ga4Id: "[GA4_ID]", // Placeholder: e.g. G-XXXXXXXXXX
  metaPixelId: "[META_PIXEL_ID]", // Placeholder: e.g. XXXXXXXXXXXXXXX

  // Social Links
  socialLinks: {
    facebook: "https://www.facebook.com/share/1BajYwmrsG/",
    instagram: "https://www.instagram.com/srinika_medisurge/",
    googleMaps: "https://share.google/xOFCwF7mYkANqIxis"
  },

  // Payment Configuration (Razorpay Only)
  razorpay: {
    keyId: "rzp_live_Tn6PZUwraJ9021" // Public Live Key ID
  },

  // Google Sheets Webhook for Bookings and Feedback
  googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycbwIKwcF-eVAOvOgM3dS6B6KfpqHmezv8p4vBPINIVPtywSnEAJQhtA1c9wKNk2-nGw/exec",

  // Hard Stats (UNTOUCHED & PRESERVED)
  stats: {
    doorstepResponse: "30-45 min",
    doorstepResponsePrimary: "15-25 min (Gomti Nagar)",
    sterileKits: "100% Sterile Kits",
    homeVisits: "2,500+ Home Visits Done",
    rating: "4.9 ★",
    fraudClaim: "Zero Fraud"
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}
