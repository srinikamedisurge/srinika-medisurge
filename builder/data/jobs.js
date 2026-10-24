// Open staff positions shown on /careers/ and each /careers/<slug>/ page.
// title/titleHi match the hiring poster; seoTitle, h1, metaDescription and schemaTitle are the
// search-facing wording. salary is optional ({ min, max } in INR per month) and, when set,
// becomes baseSalary in the JobPosting schema, which Google Jobs ranks higher.
// validThrough drives the JobPosting schema: Google drops expired postings, so push the date
// forward (or remove the job) whenever hiring status changes.
module.exports = [
  {
    slug: "senior-gda-staff",
    title: "Senior GDA Staff",
    titleHi: "सीनियर जीडीए स्टाफ",
    seoTitle: "Senior GDA Staff Job in Lucknow | Srinika Medisurge",
    h1: "Senior GDA Staff Job in Lucknow",
    schemaTitle: "Senior GDA Staff",
    metaDescription: "Senior GDA staff job in Lucknow: home patient care, medicines as prescribed, vitals monitoring. Full or part time duties. Apply on WhatsApp in 1 minute.",
    salary: null,
    freshersWelcome: false,
    tagline: "All types of patient care and medication administration",
    icon: "fa-user-nurse",
    accent: "sky",
    datePosted: "2026-10-25",
    validThrough: "2027-01-25",
    employmentType: ["FULL_TIME", "PART_TIME"],
    summary: "Experienced home-care staff for Lucknow families who need full patient care at home, including medicines as prescribed by the treating doctor and basic vital-sign monitoring.",
    responsibilities: [
      { en: "All types of patient care (oral, bed-ridden, elderly, post-surgical, critical care etc.)", hi: "हर तरह की मरीज़ देखभाल — बेड-रिडन, बुज़ुर्ग, ऑपरेशन के बाद, क्रिटिकल केयर" },
      { en: "Medication administration as prescribed", hi: "डॉक्टर के पर्चे के अनुसार दवाइयाँ देना" },
      { en: "Basic patient monitoring (vital signs, temperature, oxygen etc.)", hi: "बीपी, टेम्परेचर, ऑक्सीजन जैसे वाइटल्स की जाँच" },
      { en: "Assistance with daily activities and personal care", hi: "रोज़मर्रा के कामों और पर्सनल केयर में मदद" },
      { en: "Knowledge of infection control and patient safety", hi: "इन्फेक्शन कंट्रोल और मरीज़ की सुरक्षा की जानकारी" }
    ],
    requirements: [
      "Prior experience in hospital, nursing home or home-care patient care",
      "Comfortable giving oral medicines and reading a prescription schedule",
      "Can check BP, temperature, pulse and SpO2 and report changes to the family and our team",
      "GDA / ANM / nursing-assistant training preferred, not mandatory for strong experience"
    ]
  },
  {
    slug: "gda-staff",
    title: "Normal GDA",
    titleHi: "जीडीए (जनरल ड्यूटी असिस्टेंट)",
    seoTitle: "GDA / Patient Attendant Job in Lucknow | Srinika Medisurge",
    h1: "GDA / Patient Attendant Job in Lucknow",
    schemaTitle: "GDA (General Duty Assistant)",
    metaDescription: "GDA / patient attendant job in Lucknow, freshers welcome. Help patients at home with hygiene, feeding and mobility. Full or part time. Apply on WhatsApp.",
    salary: null,
    freshersWelcome: true,
    tagline: "Basic patient care, hygiene and daily support",
    icon: "fa-hand-holding-heart",
    accent: "emerald",
    datePosted: "2026-10-25",
    validThrough: "2027-01-25",
    employmentType: ["FULL_TIME", "PART_TIME"],
    summary: "Caring attendants for elderly and recovering patients at home in Lucknow, helping with hygiene, feeding, mobility and keeping the patient safe and comfortable.",
    responsibilities: [
      { en: "Basic patient care and personal hygiene", hi: "मरीज़ की बेसिक देखभाल और साफ़-सफ़ाई" },
      { en: "Assistance with bathing, feeding and mobility", hi: "नहलाने, खाना खिलाने और चलने-फिरने में मदद" },
      { en: "Support in daily patient activities", hi: "मरीज़ की रोज़ की गतिविधियों में सहयोग" },
      { en: "Maintain cleanliness, comfort and patient safety", hi: "सफ़ाई, आराम और मरीज़ की सुरक्षा का ध्यान" }
    ],
    requirements: [
      "Freshers with a caring nature are welcome; we guide you on the job",
      "Patient, polite and respectful with elderly patients and their families",
      "Punctual and reliable for day, night or 24-hour shifts",
      "Prior attendant or caretaker experience is a plus"
    ]
  }
];
