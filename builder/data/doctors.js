const DOCTORS = [
  {
    id: "dr-piyush-saxena",
    name: "Dr. Piyush Saxena",
    role: "Founder",
    specialty: "General & Surgical Care Lead",
    degrees: "Founder · Srinika Medisurge",
    experience: "Founder of Srinika Medisurge",
    image: "assets/images/dr-piyush-saxena.jpg",
    bio: "Founder of Srinika Medisurge, dedicated to hospital-grade home care, minor surgical procedures, IV therapy, and critical vital monitoring. Dr. Piyush Saxena established Srinika Medisurge to ensure no patient in Lucknow has to endure excruciating hospital queues for essential clinical procedures like catheter changes, injections, IV drips, and surgical dressing.",
    badges: ["Founder & Lead", "Critical & Surgical Care", "On-Call Active"],
    pricing: "Doorstep & Online Consultation",
    schemaSpecialty: "Emergency Medicine, General Practice",
    actions: {
      call: true,
      whatsapp: true,
      onlineConsult: true,
      doorstepVisit: true
    }
  },
  {
    id: "dr-harshit-nigam",
    name: "Dr. Harshit Nigam",
    role: "Senior Medical Officer | General Practitioner",
    specialty: "Internal Medicine & General Practice",
    degrees: "MBBS, MD (Medicine)",
    regNumber: null,
    experience: [
      "Ex Regency Hospital, Kanpur and Lucknow",
      "Ex Ursula Horsemen Hospital, Kanpur",
      "Ex Family Hospital, Kanpur",
      "Ex Health City Vistaar Hospital, Lucknow"
    ],
    experienceText: "Ex Regency Hospital • Ex Ursula Horsemen Hospital • Ex Family Hospital • Ex Health City Vistaar Hospital",
    image: "assets/images/dr-harshit-nigam.jpg",
    bio: "8+ years of clinical experience with expertise in diagnosis, patient care, treatment planning, and medical consultation.",
    badges: ["MBBS, MD (Medicine)", "Senior Medical Officer", "General Practitioner"],
    pricing: "Online & Doorstep Consultation",
    schemaSpecialty: "General Practice, Internal Medicine",
    actions: {
      call: true,
      whatsapp: true,
      onlineConsult: true,
      doorstepVisit: true
    }
  },
  {
    id: "dr-desh-deepak-singh",
    name: "Dr. Desh Deepak Singh (P.T.)",
    role: "Senior Consultant Physiotherapist",
    specialty: "Neurological & Orthopedic Rehabilitation",
    degrees: "B.P.T., M.P.T. (NEURO)",
    experience: "Specialized in Neuro Rehab & Post-Surgical Recovery",
    image: "assets/images/dr-desh-deepak-singh.jpg",
    bio: "Specialized in neurological rehabilitation, post-stroke recovery, paralysis mobilization, orthopedic joint recovery, and home physiotherapy sessions. Helps elderly and post-op patients regain independent mobility in their own home.",
    badges: ["Neuro Specialist", "B.P.T., M.P.T. (NEURO)", "Mobility Care"],
    pricing: "Physiotherapy at Doorstep",
    schemaSpecialty: "Physiotherapy, Neurological Rehabilitation",
    actions: {
      call: true,
      whatsapp: true,
      doorstepVisit: true
    }
  },
  {
    id: "dr-akash-shrivastav",
    name: "Dr. Akash Shrivastav",
    role: "Emergency & General Physician",
    specialty: "Emergency Triage & Acute Care",
    degrees: "M.B.B.S. • UP Medical Council Registered",
    experience: "Ex-Emergency Dept, Max Hospital Lucknow • Ex-Medical Oncology, Apollomedics Hospital",
    image: "assets/images/dr-akash.jpg",
    bio: "Specialized in emergency triage, trauma management, LP puncture, catheterization, IV drips, acute febrile illnesses, and home clinical visits across Lucknow.",
    badges: ["M.B.B.S. • UP Medical Council Reg.", "Emergency & ICU", "Ex-Max Hospital"],
    pricing: "Online & Doorstep Consultation",
    schemaSpecialty: "Emergency Medicine, General Physician",
    actions: {
      call: true,
      whatsapp: true,
      onlineConsult: true,
      doorstepVisit: true
    }
  },
  {
    id: "dr-reshmi-r",
    name: "Dr. Reshmi R",
    role: "Physician & Women's Health Clinician",
    specialty: "Women's Wellness & Surgical Recovery",
    degrees: "M.B.B.S. • UP Medical Council Registered",
    experience: "Ex-Gynae Oncology, Kalyan Singh Cancer Inst. • Ex-G.I. Surgery, Medanta Hospital Lucknow • Ex-CTVS Dept, Max Hospital Lucknow",
    image: "assets/images/dr-reshmi-r.jpg",
    bio: "Clinical expertise in women's wellness, surgical wound recovery, diagnostic analysis, vital stabilization, and compassionate doorstep and online consultations.",
    badges: ["M.B.B.S. • UP Medical Council Reg.", "Women's Health", "Ex-Medanta & Ex-Max"],
    pricing: "Online Consultation • Doorstep Care",
    schemaSpecialty: "Obstetrics and Gynecology, General Medicine",
    actions: {
      call: true,
      whatsapp: true,
      onlineConsult: true
    }
  },
  {
    id: "certified-nursing-officers",
    name: "Certified Clinical Nursing Officers",
    role: "GNM / B.Sc Certified Nursing Staff",
    specialty: "Aseptic Procedures & Elderly Attendant Care",
    degrees: "GNM / B.Sc Nursing Certified",
    experience: "Clinical hospital experience with intensive training in sterile home procedures",
    image: "assets/images/logo-white-bg.png",
    bio: "100% certified clinical nurses (GNM/B.Sc Nursing) trained in hospital hygiene, gentle catheterization, IV cannulation, surgical wound dressing, and continuous vital monitoring under the supervision of Dr. Piyush Saxena.",
    badges: ["100% Certified Nurses", "Sterile Disposables", "Direct Doctor Oversight"],
    pricing: "Nursing Procedures • Shifts",
    schemaSpecialty: "Nursing, Critical Care Nursing",
    actions: {
      call: true,
      whatsapp: true,
      doorstepVisit: true
    }
  }
];

module.exports = DOCTORS;
