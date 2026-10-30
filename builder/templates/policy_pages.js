const CONFIG = require('../../site.config.js');

function renderPrivacyPolicy() {
  return `
    <div class="py-12 sm:py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mb-3">
          Privacy Policy
        </h1>
        <p class="text-xs text-slate-500 mb-8">Last Updated: October 2026 • Srinika Medisurge</p>

        <div class="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
          <p>
            At <strong>${CONFIG.brandName}</strong> ("we", "our", or "us"), guided by ${CONFIG.founderName}, we are deeply committed to safeguarding the privacy and confidentiality of our patients and visitors. This Privacy Policy outlines our practices regarding the collection, storage, use, and protection of personal and medical information collected via our website (<strong>${CONFIG.siteUrl}</strong>) and during home visits or online consultations.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">1. Information We Collect</h2>
          <p>When you book a doorstep visit or online consultation, we may collect:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Personal Contact Information:</strong> Patient name, contact phone number, email address, and home residence address in Lucknow.</li>
            <li><strong>Clinical & Medical Data:</strong> Medical prescriptions, clinical history, current symptoms, attending physician notes, and photographs of wounds or diagnostic reports shared for clinical assessment.</li>
            <li><strong>Payment Information:</strong> Transaction reference IDs, UPI payment timestamps, and Razorpay confirmation tokens. <em>We do not store credit/debit card numbers or banking passwords on our servers.</em></li>
          </ul>

          <h2 class="text-lg font-bold text-slate-900 mt-6">2. How We Use Your Information</h2>
          <ul class="list-disc pl-5 space-y-1">
            <li>To dispatch qualified clinical nursing officers and doctors to your exact home location in Lucknow.</li>
            <li>To provide personalized telemedicine consultations and issue valid digital prescriptions.</li>
            <li>To communicate appointment confirmations, vital updates, and follow-up guidance via WhatsApp and telephone.</li>
            <li>To comply with regulatory healthcare guidelines under applicable Indian laws and the Telemedicine Practice Guidelines.</li>
          </ul>

          <h2 class="text-lg font-bold text-slate-900 mt-6">3. Patient Confidentiality & Data Security</h2>
          <p>
            Your clinical information is strictly restricted to attending medical personnel (Dr. Piyush Saxena and assigned certified nurses). We do not sell, rent, or trade patient health records to third-party commercial marketing agencies.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">4. Contact Information</h2>
          <p>
            If you have questions about your personal data or wish to request data updates, please contact us at:<br>
            <strong>${CONFIG.brandName}</strong><br>
            Address: ${CONFIG.address.full}<br>
            Phone: ${CONFIG.phoneFormatted} | WhatsApp: ${CONFIG.whatsappDisplay}<br>
            ${CONFIG.email && !CONFIG.email.includes('[') ? `Email: ${CONFIG.email}<br>` : ''}
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderTermsAndConditions() {
  return `
    <div class="py-12 sm:py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mb-3">
          Terms & Conditions
        </h1>
        <p class="text-xs text-slate-500 mb-8">Last Updated: October 2026 • Srinika Medisurge</p>

        <div class="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
          <p>
            Welcome to <strong>${CONFIG.brandName}</strong>. By accessing our website (<strong>${CONFIG.siteUrl}</strong>) or booking our doorstep healthcare, nursing, or online consultation services in Lucknow, you agree to comply with and be bound by the following Terms & Conditions.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">1. Scope of Services</h2>
          <p>
            ${CONFIG.brandName} provides non-emergency home medical consultations, certified nursing procedures (including urinary catheterization, surgical wound dressings, IV infusions, injections, and enteral feeding tube insertions), physiotherapy, and respiratory technology support across Lucknow under the clinical guidance of Dr. Piyush Saxena.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">2. Medical Emergencies Disclaimer</h2>
          <p class="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-900">
            <strong>CRITICAL:</strong> Our services are not an alternative to hospital tertiary emergency intensive care units. In the event of acute life-threatening emergencies (such as myocardial infarction, severe stroke within the acute thrombolysis window, heavy uncontrolled arterial hemorrhage, or respiratory arrest), you must immediately call the national emergency service <strong>108</strong> or transfer the patient to the nearest hospital emergency room.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">3. Prescription Requirements</h2>
          <p>
            All prescription medication administrations (including intravenous antibiotics, saline infusions, and controlled injectables) require a valid medical prescription from a registered medical practitioner (RMP). Our visiting staff reserves the right to withhold administration if a legitimate prescription is unavailable or expired.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">4. Pricing & Payment Terms</h2>
          <p>
            All fees are quoted in Indian Rupees (INR) and confirmed with you on WhatsApp or call before the service. Payment for doorstep visits is due upon completion of the clinical procedure via Cash or UPI. Online doctor consultations require upfront payment of the consultation fee via Razorpay secure checkout (UPI, cards, netbanking) prior to appointment connection.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">5. Jurisdictional Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in Lucknow, Uttar Pradesh.
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderRefundPolicy() {
  return `
    <div class="py-12 sm:py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mb-3">
          Refund & Cancellation Policy
        </h1>
        <p class="text-xs text-slate-500 mb-8">Last Updated: October 2026 • Srinika Medisurge</p>

        <div class="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
          <p>
            At <strong>${CONFIG.brandName}</strong>, we strive to deliver compassionate, prompt, and reliable medical care. We understand that medical schedules and patient conditions can change rapidly. Our refund and cancellation policy is outlined below.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">1. Online Doctor Video Consultation</h2>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Cancellation by Patient:</strong> If you cancel your online consultation at least 30 minutes before the scheduled time slot, a 100% full refund will be processed to your original payment method.</li>
            <li><strong>Doctor Unavailability:</strong> If our doctor is unable to connect due to an unforeseen emergency, you may choose to reschedule or receive an immediate 100% refund.</li>
            <li><strong>Post-Consultation:</strong> Once an online consultation has taken place and a digital prescription has been issued, the consultation fee is non-refundable.</li>
          </ul>

          <h2 class="text-lg font-bold text-slate-900 mt-6">2. Doorstep Medical & Nursing Visits</h2>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Cancellation Prior to Dispatch:</strong> If a scheduled home visit is cancelled before our medical staff departs the dispatch hub, no cancellation fee applies.</li>
            <li><strong>Cancellation After Staff Arrival:</strong> If staff arrives at your residence and the procedure is declined or cancelled, a nominal conveyance assessment fee (communicated at the time of booking) applies to cover travel expenses.</li>
            <li><strong>Completed Clinical Procedures:</strong> Fees for completed clinical procedures and opened single-use sterile consumable packs are non-refundable.</li>
          </ul>

          <h2 class="text-lg font-bold text-slate-900 mt-6">3. Refund Processing Timeline</h2>
          <p>
            Approved refunds via Razorpay are typically credited to the patient's original bank account or card within 3 to 5 business days, in accordance with standard Indian banking settlement cycles.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">4. Assistance & Queries</h2>
          <p>
            For refund queries, please call our 24/7 helpline directly at <strong>${CONFIG.businessPhoneFormatted}</strong> or Dr. Piyush Saxena at <strong>${CONFIG.drPiyushPhoneFormatted}</strong> or send a message on WhatsApp at <strong>${CONFIG.whatsappDisplay}</strong>.
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderMedicalDisclaimer() {
  return `
    <div class="py-12 sm:py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mb-3">
          Medical Disclaimer
        </h1>
        <p class="text-xs text-slate-500 mb-8">Official Clinical Notice • Srinika Medisurge Lucknow</p>

        <div class="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-5">
          <div class="p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-amber-950 font-medium">
            <strong>Emergency Clinical Notice:</strong> For acute, life-threatening medical trauma requiring immediate surgical operation, intensive coronary care, or ICU mechanical ventilation, please immediately call national emergency <strong>108</strong> or transfer the patient to the nearest tertiary hospital emergency department.
          </div>

          <h2 class="text-lg font-bold text-slate-900 mt-6">1. General Informational Purpose</h2>
          <p>
            All health-related information, articles, blogs, FAQs, and guides published on <strong>${CONFIG.siteUrl}</strong> are provided for general educational purposes only. They do not constitute formal medical diagnosis, prognosis, or therapeutic prescription. Always seek the advice of your treating physician or specialist doctor regarding any medical condition.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">2. Telemedicine Scope & Limitations</h2>
          <p>
            Online doctor tele-consultations conducted by Dr. Piyush Saxena or associated physicians are performed in accordance with the Telemedicine Practice Guidelines issued by the Ministry of Health and Family Welfare, Government of India. Patients acknowledge that physical examination modalities (such as palpation, auscultation, and direct percussion) are limited during virtual calls, and an in-person physical visit may be advised if clinically necessary.
          </p>

          <h2 class="text-lg font-bold text-slate-900 mt-6">3. Clinical Responsibility & Home Care Standard</h2>
          <p>
            All home nursing procedures performed by Srinika Medisurge utilize 100% sterile, single-use consumable instruments and strict aseptic protocols. However, the long-term clinical outcome of any medical condition depends on patient biological factors, underlying comorbidities, surgical healing capacity, and adherence to prescribed medications.
          </p>
        </div>
      </div>
    </div>
  `;
}

function render404Page() {
  return `
    <div class="py-20 sm:py-32 bg-slate-50 text-center">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">
        <span class="text-6xl sm:text-8xl font-black text-sky-600 block font-heading mb-2">404</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-3">
          Page Not Found / पृष्ठ नहीं मिला
        </h1>
        <p class="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
          The page you are looking for may have been moved or updated during our website upgrade. All our doorstep services, doctors, and pricing remain available.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <a href="/" class="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition">
            Go to Homepage
          </a>
          <a href="/services/" class="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-sm transition">
            Browse Services
          </a>
          <a href="tel:${CONFIG.businessPhoneTel}" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition">
            Call ${CONFIG.businessPhoneFormatted}
          </a>
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  renderPrivacyPolicy,
  renderTermsAndConditions,
  renderRefundPolicy,
  renderMedicalDisclaimer,
  render404Page
};
