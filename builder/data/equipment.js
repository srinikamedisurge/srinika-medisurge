const EQUIPMENT = [
  {
    id: "bipap-machine",
    title: "BiPAP Machine Support",
    category: "Non-Invasive Ventilation",
    icon: "fa-lungs",
    iconColor: "text-rose-600 bg-rose-50",
    badge: "ICU Respiratory Support",
    description: "Advanced dual-pressure ventilatory support for respiratory distress, COPD exacerbations, and severe sleep apnea with professional mask calibration.",
    specs: [
      "IPAP / EPAP pressure titration by clinical team",
      "Full face / nasal mask sizing included",
      "Humidifier chamber maintenance to prevent dryness",
      "Continuous SpO2 and airway monitoring"
    ],
    pricing: "₹750 / Day + Conveyance fees (Pick & Drop)",
    dailyRate: "₹750 / Day",
    monthlyRate: "₹18,000 / Month",
    rates: {
      daily: "₹750 / Day",
      weekly: "₹4,500 / 7 Days",
      monthly: "₹18,000 / Month"
    },
    dispatchTime: "Under 60 mins in Lucknow"
  },
  {
    id: "oxygen-concentrator",
    title: "Oxygen Concentrator (5 Litre)",
    category: "Continuous Flow Support",
    icon: "fa-wind",
    iconColor: "text-sky-600 bg-sky-50",
    badge: "Medical-Grade 93% ± 3%",
    description: "Continuous medical-grade 5L oxygen concentrators providing uninterrupted oxygen therapy at home with high purity output (93% ± 3%).",
    specs: [
      "5 Litre high flow medical grade model",
      "Nasal cannula & bubble humidifier included",
      "Zero cylinder refill dependency – continuous power run",
      "Immediate home delivery across Lucknow"
    ],
    pricing: "₹500 / Day + Conveyance fees (Pick & Drop)",
    dailyRate: "₹500 / Day",
    monthlyRate: "₹12,000 / Month",
    rates: {
      daily: "₹500 / Day",
      weekly: "₹3,000 / 7 Days",
      monthly: "₹12,000 / Month"
    },
    dispatchTime: "Immediate delivery in Lucknow"
  },
  {
    id: "oxygen-cylinder",
    title: "B-Type Medical Oxygen Cylinder",
    category: "Emergency High Pressure Support",
    icon: "fa-flask-round-potion",
    iconColor: "text-emerald-600 bg-emerald-50",
    badge: "Emergency Backup",
    description: "Portable B-Type medical oxygen cylinders with double-gauge regulators, flow meters, and sterile humidifiers for emergency and backup care.",
    specs: [
      "B-Type portable cylinder with safety key",
      "Click-style precision flow regulator attached",
      "Rapid refill & home replacement in Lucknow",
      "Tested for leak-proof safety"
    ],
    pricing: "₹2,000 / Month + Conveyance fees (Pick & Drop)",
    dailyRate: "₹150 / Day",
    monthlyRate: "₹2,000 / Month",
    rates: {
      daily: "₹150 / Day",
      weekly: "₹800 / 7 Days",
      monthly: "₹2,000 / Month"
    },
    dispatchTime: "Under 30-45 mins delivery"
  },
  {
    id: "multipara-monitor",
    title: "Vital Monitor (Multi-Para Bedside Monitor)",
    category: "ICU Vital Signs Tracking",
    icon: "fa-heart-pulse",
    iconColor: "text-purple-600 bg-purple-50",
    badge: "Real-time Bedside Display",
    description: "Hospital-grade multi-para patient monitor displaying real-time ECG leads, Pulse Rate, NIBP (Blood Pressure), SpO2 Oxygen, and Body Temperature.",
    specs: [
      "Continuous bedside cardiac waveform & arrhythmia alert",
      "Digital automated BP cuff & Pulse Oximeter probe",
      "Temperature sensor & high/low audio alarms",
      "Monitored and demonstrated by clinical team"
    ],
    pricing: "₹300 / Day + Conveyance fees (Pick & Drop)",
    dailyRate: "₹300 / Day",
    monthlyRate: "₹7,500 / Month",
    rates: {
      daily: "₹300 / Day",
      weekly: "₹1,800 / 7 Days",
      monthly: "₹7,500 / Month"
    },
    dispatchTime: "Available 24x7 in Lucknow"
  },
  {
    id: "suction-machine",
    title: "Medical Suction Machine",
    category: "Airway Clearance & ICU Support",
    icon: "fa-pump-medical",
    iconColor: "text-blue-600 bg-blue-50",
    badge: "Airway Clearance",
    description: "Heavy-duty electric suction machine for gentle, effective clearance of phlegm, mucus, and secretions in tracheostomy, stroke, and bedridden patients.",
    specs: [
      "High negative pressure vacuum pump",
      "Sterile suction catheters & collection canister",
      "Overflow protection valve to prevent motor damage",
      "Silent operation suitable for bedroom recovery"
    ],
    pricing: "₹150 / Day + Conveyance fees (Pick & Drop)",
    dailyRate: "₹150 / Day",
    monthlyRate: "₹3,500 / Month",
    rates: {
      daily: "₹150 / Day",
      weekly: "₹900 / 7 Days",
      monthly: "₹3,500 / Month"
    },
    dispatchTime: "Rapid dispatch across Lucknow"
  },
  {
    id: "patient-bed",
    title: "Hospital Patient Bed (Manual / Semi-Fowler)",
    category: "Bedridden & Post-Op Comfort",
    icon: "fa-bed-pulse",
    iconColor: "text-teal-600 bg-teal-50",
    badge: "Backrest & Elevation Support",
    description: "Hospital-grade adjustable patient bed with backrest elevation, side safety railings, and IV pole attachment for post-surgical and paralyzed patients.",
    specs: [
      "Smooth manual crank mechanism for backrest elevation",
      "Collapsible aluminum side safety railings",
      "Heavy-duty locking caster wheels for mobility",
      "Waterproof hospital mattress included"
    ],
    pricing: "₹200 / Day + Conveyance fees (Pick & Drop)",
    dailyRate: "₹200 / Day",
    monthlyRate: "₹5,000 / Month",
    rates: {
      daily: "₹200 / Day",
      weekly: "₹1,200 / 7 Days",
      monthly: "₹5,000 / Month"
    },
    dispatchTime: "Same-day doorstep assembly in Lucknow"
  },
  {
    id: "infusion-pump",
    title: "Infusion Pump / Syringe Pump",
    category: "Precision Drug Administration",
    icon: "fa-syringe",
    iconColor: "text-cyan-600 bg-cyan-50",
    badge: "Micro-Dose Precision",
    description: "Micro-controlled volumetric infusion and syringe pumps for accurate, micro-dosed IV medications, inotropes, chemo supportive fluids, and electrolytes.",
    specs: [
      "Precise flow-rate titration (ml/hr) with digital display",
      "Occlusion & air-in-line safety alarms",
      "Monitored by certified GNM/B.Sc nursing staff",
      "Internal battery backup for power failure safety"
    ],
    pricing: "₹300 / Day + Conveyance fees (Pick & Drop)",
    dailyRate: "₹300 / Day",
    monthlyRate: "₹7,500 / Month",
    rates: {
      daily: "₹300 / Day",
      weekly: "₹1,800 / 7 Days",
      monthly: "₹7,500 / Month"
    },
    dispatchTime: "Rapid dispatch across Lucknow"
  },
  {
    id: "ventilator-machine",
    title: "ICU Ventilator Machine (Invasive / Transport)",
    category: "Life-Support Critical Care",
    icon: "fa-mask-ventilator",
    iconColor: "text-red-600 bg-red-50",
    badge: "Advanced ICU Life Support",
    description: "Hospital-grade mechanical ventilator supporting invasive & non-invasive modes (CPAP, SIMV, Bi-Level) with continuous clinical paramedical oversight.",
    specs: [
      "Comprehensive volume & pressure controlled modes",
      "Real-time airway waveform display & vital alarms",
      "Oxygen blenders & emergency internal battery backup",
      "Installed and monitored under direct physician oversight"
    ],
    pricing: "₹3,000 / Day + Conveyance fees (Pick & Drop)",
    dailyRate: "₹3,000 / Day",
    monthlyRate: "₹75,000 / Month",
    rates: {
      daily: "₹3,000 / Day",
      weekly: "₹18,000 / 7 Days",
      monthly: "₹75,000 / Month"
    },
    dispatchTime: "Immediate ICU emergency dispatch in Lucknow"
  }
];

module.exports = EQUIPMENT;
