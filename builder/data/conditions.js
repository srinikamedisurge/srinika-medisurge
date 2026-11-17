// Condition-based landing pages (/conditions/<slug>/).
// People search by the patient's problem ("stroke patient care at home"), not by the service name.
// Each page maps the condition to the services we really deliver. No prices here: the site shows
// "Price on WhatsApp / Call" everywhere, so these pages do the same.
//
// services:  slugs from data/services.js (shown as linked cards)
// guides:    slugs from data/blog.js (shown as related reading)
// redFlags:  signs that mean "go to hospital / call 108", never "wait for a home visit"

const CONDITIONS = [
  {
    slug: "stroke-paralysis-patient-care-at-home-lucknow",
    name: "Stroke / Paralysis",
    shortTitle: "Stroke & Paralysis Care",
    icon: "fa-brain",
    title: "Stroke & Paralysis Patient Care at Home in Lucknow",
    metaTitle: "Stroke & Paralysis Patient Care at Home in Lucknow | Srinika Medisurge",
    metaDescription: "Home care for stroke and paralysis patients in Lucknow: trained attendants, physiotherapy, catheter, NG tube and bedsore care, with doctor guidance. Call +91 96530 01359.",
    intro: "After a stroke, the hospital stay is often only the first part of recovery. Weakness on one side, difficulty swallowing, loss of bladder control and long hours in bed mean the family needs trained help at home for weeks or months. Srinika Medisurge sends nurses, attendants and physiotherapists to the patient's bed in Lucknow, so the care continues without repeated hospital trips.",
    needs: [
      "Help with turning, sitting up, bathing, toileting and feeding every day",
      "Regular physiotherapy to prevent stiff joints and to rebuild movement",
      "Feeding through a Ryle's (NG) tube when swallowing is unsafe",
      "Urinary catheter care when the patient cannot control the bladder",
      "Pressure-sore (bedsore) prevention for a patient who cannot change position alone",
      "Monitoring of BP, sugar and oxygen level, and taking medicines on time"
    ],
    services: [
      "patient-attendant-lucknow",
      "physiotherapy-at-home-lucknow",
      "ng-tube-insertion-at-home-lucknow",
      "urinary-catheterization-at-home-lucknow",
      "home-nursing-lucknow",
      "doctor-home-visit-lucknow"
    ],
    plan: [
      { title: "Doctor assessment", desc: "The doctor reviews the discharge summary, medicines and what the patient can and cannot do, then advises the type of care needed." },
      { title: "Right staff for the shift", desc: "A trained attendant or nurse for 12-hour or 24-hour care, based on how much help the patient needs." },
      { title: "Physiotherapy routine", desc: "A physiotherapist starts gentle movement and positioning, and teaches the family exercises to continue between visits." },
      { title: "Regular review", desc: "Vitals are recorded, the plan is adjusted as the patient improves, and the family can call the doctor with questions." }
    ],
    redFlags: [
      "Sudden new weakness, facial droop, slurred speech or confusion (a second stroke can happen)",
      "Severe headache, repeated vomiting or a seizure",
      "Breathlessness, choking while eating, or fever with cough (possible chest infection)",
      "Chest pain, fainting or very high or very low blood pressure"
    ],
    faqs: [
      {
        q: "Can a stroke patient be cared for fully at home in Lucknow?",
        a: "Many patients are managed well at home once they are medically stable and the hospital has discharged them. They need trained help with daily activities, physiotherapy and regular monitoring. Any sudden worsening should go to a hospital emergency without delay."
      },
      {
        q: "Do you provide physiotherapy at home for paralysis?",
        a: "Yes. Our physiotherapist visits the home, works on movement, strength and positioning, and teaches the family safe exercises. The number of sessions depends on the patient's condition."
      },
      {
        q: "Can you manage a Ryle's tube or urinary catheter for a stroke patient?",
        a: "Yes. Our nurses insert and change Ryle's (NG) tubes and urinary catheters in sterile conditions, and train the family on daily care and feeding."
      },
      {
        q: "Do you offer day and night attendants?",
        a: "Yes. We provide 12-hour day, 12-hour night and 24-hour patient attendants across Lucknow. Message us and we will share the rate for your case."
      }
    ],
    guides: ["stroke-patient-care-at-home-first-weeks", "home-physiotherapy-stroke-surgery-recovery", "bedsore-prevention-bedridden-patient-home"]
  },
  {
    slug: "post-surgery-care-at-home-lucknow",
    name: "After Surgery / Hospital Discharge",
    shortTitle: "Post-Surgery Care",
    icon: "fa-hospital-user",
    title: "Post-Surgery & Hospital Discharge Care at Home in Lucknow",
    metaTitle: "Post-Surgery Care at Home in Lucknow | Dressing, Injections, Nursing",
    metaDescription: "Home nursing after surgery or hospital discharge in Lucknow: sterile wound dressing, injections, IV drips, physiotherapy and doctor review at your doorstep. Call +91 96530 01359.",
    intro: "Going home after an operation or a long hospital stay is a relief, and also the point where families feel most unsure. Dressings need changing, injections and medicines must be given on time, and the patient is weak. Srinika Medisurge nurses take care of this at home in Lucknow, so a stable patient does not have to return to the OPD for every dressing or injection.",
    needs: [
      "Sterile dressing of the surgical wound, and checks for redness, swelling or discharge",
      "Injections and IV medicines exactly as prescribed",
      "Stitch or drain care when the surgeon has advised it",
      "Help with getting up, walking and personal hygiene while the patient is weak",
      "Physiotherapy after orthopaedic or abdominal surgery",
      "Following the discharge instructions: medicines, diet, follow-up dates"
    ],
    services: [
      "wound-dressing-at-home-lucknow",
      "iv-drip-injection-at-home-lucknow",
      "home-nursing-lucknow",
      "physiotherapy-at-home-lucknow",
      "patient-attendant-lucknow",
      "doctor-home-visit-lucknow"
    ],
    plan: [
      { title: "Share the discharge papers", desc: "Send the discharge summary and prescription on WhatsApp so the team knows the surgery, medicines and dressing instructions before arriving." },
      { title: "First visit", desc: "The nurse checks vitals and the wound, and carries sealed sterile kits for the dressing." },
      { title: "Scheduled visits", desc: "Dressings, injections or drips are done on the days the surgeon advised, with notes on how the wound is healing." },
      { title: "Escalate early", desc: "If anything looks wrong, the nurse informs the doctor and the family so the patient can be sent back to the surgeon quickly." }
    ],
    redFlags: [
      "Fever, or a wound that is red, hot, swollen, bleeding or leaking pus",
      "Severe or worsening pain, or a swollen, tender calf",
      "Breathlessness, chest pain or fainting",
      "Repeated vomiting, a swollen belly, or no urine for many hours"
    ],
    faqs: [
      {
        q: "Can a nurse do my surgical dressing at home in Lucknow?",
        a: "Yes, when your surgeon has cleared the wound for home dressing. Our nurses use sealed sterile kits and follow the surgeon's instructions. If the wound looks infected, we advise you to return to your surgeon."
      },
      {
        q: "How soon after discharge can you start?",
        a: "Usually the same day. In central areas like Gomti Nagar a nurse can reach in about 15 to 25 minutes, and other areas typically take 30 to 45 minutes."
      },
      {
        q: "Do I need to arrange medicines and supplies?",
        a: "Prescribed medicines should be available at home or arranged beforehand. Our team carries sterile consumables such as gloves, gauze, antiseptic and syringes."
      },
      {
        q: "Can the doctor review the patient at home?",
        a: "Yes. A doctor can visit the home for a check-up, or you can take an online consultation if a visit is not needed."
      }
    ],
    guides: ["hospital-discharge-home-care-checklist", "post-surgery-wound-dressing-at-home", "diabetic-foot-wound-care-at-home"]
  },
  {
    slug: "bedridden-patient-care-at-home-lucknow",
    name: "Bedridden Patient",
    shortTitle: "Bedridden Patient Care",
    icon: "fa-bed-pulse",
    title: "Bedridden Patient Care at Home in Lucknow",
    metaTitle: "Bedridden Patient Care at Home in Lucknow | Attendant, Nurse, Bedsore Care",
    metaDescription: "Trained attendants and nurses for bedridden patients in Lucknow: bedsore prevention, catheter and tube care, hygiene, feeding and monitoring. 12h and 24h shifts. Call +91 96530 01359.",
    intro: "Caring for a bedridden family member is physically and emotionally exhausting, and mistakes in turning, hygiene or feeding can cause bedsores and infections. Srinika Medisurge provides trained attendants and nurses in Lucknow who handle the daily routine safely, with a doctor to guide the plan and a nurse for the clinical tasks.",
    needs: [
      "Turning and repositioning every two hours to prevent pressure sores",
      "Bed bath, oral care, diaper and toilet care with dignity",
      "Feeding by mouth or by NG tube, and keeping the patient hydrated",
      "Urinary catheter care and avoiding infection",
      "Dressing of bedsores or other wounds",
      "Oxygen or BiPAP support at home when the doctor advises it"
    ],
    services: [
      "patient-attendant-lucknow",
      "home-nursing-lucknow",
      "wound-dressing-at-home-lucknow",
      "urinary-catheterization-at-home-lucknow",
      "ng-tube-insertion-at-home-lucknow",
      "bipap-oxygen-support-at-home-lucknow"
    ],
    plan: [
      { title: "Understand the patient", desc: "We ask about the diagnosis, mobility, feeding method, tubes and medicines, then suggest the right type of staff." },
      { title: "Choose the shift", desc: "12-hour day, 12-hour night or 24-hour cover. Night shifts are common for patients who need turning and monitoring through the night." },
      { title: "Daily routine", desc: "Turning schedule, hygiene, feeding and medicines are followed in a fixed routine the family can see and check." },
      { title: "Clinical support when needed", desc: "A nurse or doctor visits for dressings, catheter or tube changes, injections and review." }
    ],
    redFlags: [
      "Fever, cough with breathlessness, or a sudden drop in alertness",
      "A pressure sore that is deepening, foul smelling or has spreading redness",
      "Blood in urine, no urine output, or a blocked catheter with pain",
      "Choking or vomiting with feeding, or signs of dehydration"
    ],
    faqs: [
      {
        q: "What is the difference between an attendant and a nurse?",
        a: "An attendant handles daily care such as turning, hygiene, feeding and mobility support. A nurse performs clinical tasks like injections, IV drips, catheter and tube care and wound dressing. Many bedridden patients need an attendant daily and a nurse for specific tasks."
      },
      {
        q: "How do you prevent bedsores?",
        a: "By regular repositioning, keeping the skin clean and dry, using suitable pressure-relieving cushions or mattresses and good nutrition. Early sores are dressed by a nurse. Our guide on bedsore prevention explains the steps in detail."
      },
      {
        q: "Can you provide a 24-hour attendant?",
        a: "Yes. We provide 12-hour and 24-hour attendants across Lucknow. Message us with the patient's condition and location and we will share the rate and the earliest start time."
      },
      {
        q: "Can the patient be shifted to oxygen or BiPAP support at home?",
        a: "Yes, when the doctor advises it. We provide oxygen concentrators and BiPAP machines with a trained person to set them up and explain their use."
      }
    ],
    guides: ["bedsore-prevention-bedridden-patient-home", "ryles-tube-ng-feeding-at-home-safe-steps", "urinary-catheter-care-at-home-dos-donts"]
  },
  {
    slug: "elderly-care-at-home-lucknow",
    name: "Elderly Care",
    shortTitle: "Elderly Care at Home",
    icon: "fa-person-cane",
    title: "Elderly Care at Home in Lucknow: Doctor Visits, Nursing & Attendants",
    metaTitle: "Elderly Care at Home in Lucknow | Doctor Visit, Nurse & Attendant",
    metaDescription: "Home care for senior citizens in Lucknow: doctor visits at home, nurse for BP, sugar, injections and IV drips, and trained attendants for daily help. Call +91 96530 01359.",
    intro: "For many elderly people, going to a hospital OPD means traffic, queues and a tiring day. Srinika Medisurge brings the doctor, nurse and attendant to the home in Lucknow, so regular check-ups, injections and daily help happen in familiar surroundings, with the family close by.",
    needs: [
      "Regular check-up of blood pressure, sugar, pulse and oxygen level",
      "Doctor visit at home for follow-up, prescriptions and medicine review",
      "Injections, IV fluids and nebulization given by a nurse when prescribed",
      "A companion or attendant for walking, bathing, meals and medicine reminders",
      "Physiotherapy for weakness, joint stiffness or after a fall",
      "A reliable contact for the family when they live in another city"
    ],
    services: [
      "doctor-home-visit-lucknow",
      "online-doctor-consultation",
      "home-nursing-lucknow",
      "patient-attendant-lucknow",
      "physiotherapy-at-home-lucknow",
      "nebulization-vitals-ecg-at-home"
    ],
    plan: [
      { title: "Initial home visit", desc: "The doctor sees the patient, reviews all medicines and decides which regular checks are needed." },
      { title: "Regular nursing", desc: "A nurse visits for vitals, injections or drips on the schedule the doctor sets." },
      { title: "Daily support", desc: "An attendant helps with meals, medicines, mobility and hygiene for a few hours or the full day." },
      { title: "Family updates", desc: "Children living elsewhere can call or message for updates on how the patient is doing." }
    ],
    redFlags: [
      "Chest pain, breathlessness, sudden weakness on one side, or confusion",
      "A fall with severe pain, swelling or inability to move a limb",
      "Very high or very low blood pressure, or blood sugar with drowsiness",
      "Fever with cough, or not eating or drinking for a day"
    ],
    faqs: [
      {
        q: "Can a doctor visit an elderly patient at home in Lucknow?",
        a: "Yes. Our doctor home visit service covers examination, prescription and follow-up at the patient's doorstep. Message us to confirm the slot and the rate."
      },
      {
        q: "Is a hospital OPD visit still needed?",
        a: "Sometimes. Investigations, specialist procedures and emergencies need a hospital. For regular follow-up, injections, dressings and monitoring, home care avoids many trips."
      },
      {
        q: "Can you arrange a companion for an elderly parent living alone?",
        a: "Yes. Trained attendants can stay for 12 or 24 hours to help with meals, medicines and daily activities. We recommend sharing the patient's health condition so we send the right person."
      },
      {
        q: "Do you cover my area?",
        a: "We serve most localities across Lucknow, with the fastest response in Gomti Nagar, Gomti Nagar Extension and Vibhuti Khand. See the areas section for your locality."
      }
    ],
    guides: ["winter-care-elderly-lucknow-cold-chest-infection", "doorstep-doctor-visit-vs-hospital-opd-elderly", "how-to-choose-home-nurse-attendant-lucknow"]
  },
  {
    slug: "dementia-alzheimers-care-at-home-lucknow",
    name: "Dementia / Alzheimer's",
    shortTitle: "Dementia Care at Home",
    icon: "fa-head-side-virus",
    title: "Dementia & Alzheimer's Patient Care at Home in Lucknow",
    metaTitle: "Dementia & Alzheimer's Care at Home in Lucknow | Trained Attendants",
    metaDescription: "Trained, patient attendants for dementia and Alzheimer's care at home in Lucknow: daily routine, medicines, safety, hygiene and family support. 12h and 24h shifts. Call +91 96530 01359.",
    intro: "Dementia changes how a person remembers, speaks and behaves, and families often struggle to keep the patient safe and calm through the day and night. Srinika Medisurge provides patient, trained attendants in Lucknow who follow a steady routine, supervise medicines and keep the patient safe, while the family keeps its own rest and work.",
    needs: [
      "Someone present at all times, as wandering or falls are common risks",
      "A steady daily routine for meals, bathing, medicines and sleep",
      "Help with hygiene, toileting and dressing, handled patiently and with dignity",
      "Medicine supervision so doses are not missed or repeated",
      "Calm handling of confusion, agitation and night-time restlessness",
      "Treating other conditions at the same time, such as BP, diabetes or infections"
    ],
    services: [
      "patient-attendant-lucknow",
      "home-nursing-lucknow",
      "doctor-home-visit-lucknow",
      "physiotherapy-at-home-lucknow"
    ],
    plan: [
      { title: "Tell us about the person", desc: "Share the diagnosis, daily habits, triggers for agitation and what keeps the patient comfortable. A good match depends on this." },
      { title: "Consistent attendant", desc: "We try to keep the same attendant so the patient becomes familiar with them, which helps reduce anxiety." },
      { title: "Routine and safety", desc: "Fixed timings, a safe room, supervised medicines and attention to fall and wandering risk." },
      { title: "Doctor review", desc: "The treating neurologist or physician continues to guide medicines. Our doctor can visit for general health problems." }
    ],
    redFlags: [
      "Sudden worsening of confusion or drowsiness over hours or days (it can be an infection or other illness)",
      "A fall with injury, a fever, or refusing food and water",
      "Severe agitation, hallucinations or violence that cannot be calmed",
      "Any new weakness on one side or trouble speaking"
    ],
    faqs: [
      {
        q: "Do you treat dementia or Alzheimer's disease?",
        a: "No. Dementia is managed by a neurologist or physician, and we do not claim to treat it. We provide trained attendants and nursing for daily care, safety, medicine supervision and treatment of other medical problems alongside."
      },
      {
        q: "Can a dementia patient be left alone with an attendant at night?",
        a: "Our 12-hour night and 24-hour attendants stay with the patient through the night. The family should still be reachable by phone, and we recommend informing us of any night-time wandering or agitation."
      },
      {
        q: "Will the same attendant come every day?",
        a: "We try to keep one attendant for a patient with dementia, because familiar faces help. If a replacement is needed, we inform you and brief them on the patient's routine."
      },
      {
        q: "Can the attendant give medicines?",
        a: "Attendants remind and supervise medicines the doctor has prescribed. Injections and IV medicines are given by a nurse."
      }
    ],
    guides: ["how-to-choose-home-nurse-attendant-lucknow", "gda-vs-nurse-vs-attendant-home-care"]
  },
  {
    slug: "cancer-palliative-care-at-home-lucknow",
    name: "Cancer / Palliative Care",
    shortTitle: "Cancer & Palliative Care",
    icon: "fa-hand-holding-heart",
    title: "Cancer Patient & Palliative Care at Home in Lucknow",
    metaTitle: "Cancer & Palliative Care at Home in Lucknow | Nursing & Attendant",
    metaDescription: "Home nursing and attendant support for cancer and palliative care patients in Lucknow: injections, IV fluids, dressings, tube and catheter care, and doctor visits. Call +91 96530 01359.",
    intro: "A patient with advanced illness is usually most comfortable at home, among family, but home care becomes heavy when injections, dressings, tubes and round-the-clock help are needed. Srinika Medisurge supports families in Lucknow with nurses and attendants who carry out the care the treating oncologist and doctor have advised, gently and on time.",
    needs: [
      "Injections and IV fluids as prescribed by the treating doctor",
      "Dressing of wounds, ports or pressure sores in sterile conditions",
      "Feeding tube and urinary catheter care when needed",
      "Help with hygiene, turning, feeding and comfort through the day and night",
      "Oxygen support at home when breathing is difficult",
      "A doctor to call for questions between hospital visits"
    ],
    services: [
      "home-nursing-lucknow",
      "patient-attendant-lucknow",
      "iv-drip-injection-at-home-lucknow",
      "wound-dressing-at-home-lucknow",
      "ng-tube-insertion-at-home-lucknow",
      "bipap-oxygen-support-at-home-lucknow"
    ],
    plan: [
      { title: "Follow the treating team", desc: "We work from the oncologist's and hospital's instructions and never change cancer treatment. Please share the latest reports and prescription." },
      { title: "Plan comfort care", desc: "Nursing visits and attendant shifts are set up around the patient's needs, with timing for injections, dressings and rest." },
      { title: "Care for the family too", desc: "Attendants take on the heavy daily tasks so family members can rest and spend time with the patient." },
      { title: "Know when to go to hospital", desc: "If symptoms change, the nurse informs the doctor and family quickly so the patient reaches the treating hospital in time." }
    ],
    redFlags: [
      "Fever during or soon after chemotherapy (needs urgent hospital assessment)",
      "Uncontrolled bleeding, severe pain or sudden breathlessness",
      "Repeated vomiting, unable to drink, or signs of dehydration",
      "Sudden confusion, seizure, or a drop in alertness"
    ],
    faqs: [
      {
        q: "Do you provide chemotherapy or pain management at home?",
        a: "No. Chemotherapy and cancer treatment decisions stay with the oncologist and hospital. We provide nursing care such as injections and IV fluids as prescribed, wound and tube care, and attendant support for daily needs."
      },
      {
        q: "Can the patient get oxygen support at home?",
        a: "Yes. When a doctor advises it, we provide an oxygen concentrator or BiPAP at home with a trained person to set it up and explain it to the family."
      },
      {
        q: "Is round-the-clock care available?",
        a: "Yes. We provide 12-hour and 24-hour nurses and attendants in Lucknow. Message us with the patient's condition and we will share the options and rate."
      },
      {
        q: "Can the family reach a doctor if the patient's condition changes?",
        a: "Yes. You can call our helpline, and our doctor can advise or visit. In an emergency, please call 108 or go to the nearest hospital."
      }
    ],
    guides: ["when-is-bipap-oxygen-support-needed-at-home", "gda-vs-nurse-vs-attendant-home-care", "bedsore-prevention-bedridden-patient-home"]
  }
];

module.exports = CONDITIONS;
