// Posts added 23 Nov 2026 to answer queries Search Console showed us ranking for without clicks
// ("physiotherapy at home in lucknow", "physiotherapy lucknow price"). General education only:
// no prices, no promise of outcome. Ends with the emergency note.
const H2 = 'class="text-2xl font-bold text-slate-900 mt-8 mb-4"';
const PARA = 'class="text-slate-600 leading-relaxed mb-4"';
const UL = 'class="list-disc pl-6 space-y-2 text-slate-600 mb-6"';
const LINK = 'class="text-sky-600 font-semibold hover:underline"';
const LEAD = 'class="lead text-lg text-slate-700 leading-relaxed font-medium mb-6"';

const EMERGENCY_NOTE = `
      <div class="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl my-8">
        <h4 class="text-lg font-bold text-amber-900 mb-2"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Important Medical Disclaimer</h4>
        <p class="text-sm text-amber-800 leading-relaxed">
          This guide is for general education and does not replace a doctor's examination. If the patient has severe breathlessness, chest pain, heavy bleeding, fainting, confusion or a seizure, call the national emergency number 108 or go to the nearest hospital emergency department. Do not stop or change medicines without asking your doctor.
        </p>
      </div>`;

const AUTHOR = "Srinika Medisurge Medical Team (Guided by Dr. Piyush Saxena)";

const SEO_POSTS = [
  {
    slug: "physiotherapy-at-home-lucknow-who-needs-it-what-to-expect",
    title: "Physiotherapy at Home in Lucknow: Who Needs It, What a Session Includes and How to Choose",
    shortTitle: "Physiotherapy at Home in Lucknow",
    date: "2026-11-23",
    author: AUTHOR,
    metaTitle: "Physiotherapy at Home in Lucknow: What a Session Includes",
    metaDescription: "Who needs home physiotherapy in Lucknow, what a session includes, how many sessions you may need and how to choose a physiotherapist. Book on +91 96530 01359.",
    readTime: "7 min read",
    category: "Physiotherapy",
    excerpt: "Home physiotherapy helps stroke, surgery and elderly patients who find it hard to travel. See who benefits, what happens in a session and what to ask before you book.",
    contentHtml: `
      <p ${LEAD}>
        For many patients the hardest part of physiotherapy is getting to the clinic. After a stroke, a hip or knee surgery, or a long illness, travelling can be painful, tiring and risky. Physiotherapy at home brings the therapist to the patient, and lets the family learn the exercises in the place where the patient actually lives and moves.
      </p>

      <h2 ${H2}>Who benefits from physiotherapy at home?</h2>
      <ul ${UL}>
        <li><strong>Stroke and paralysis:</strong> to regain movement, balance and walking, and to prevent stiff joints. Starting early under guidance matters.</li>
        <li><strong>After knee, hip or spine surgery:</strong> to restore movement and strength step by step, as the surgeon allows.</li>
        <li><strong>Fractures and orthopaedic injuries:</strong> once the doctor permits movement, to rebuild strength and range.</li>
        <li><strong>Back, neck and joint pain:</strong> posture correction and a safe exercise plan.</li>
        <li><strong>Elderly patients with weakness or fear of falling:</strong> balance training and strength work.</li>
        <li><strong>Bedridden patients:</strong> gentle movements and positioning to prevent stiffness, bedsores and chest congestion.</li>
      </ul>

      <h2 ${H2}>What happens in a home physiotherapy session?</h2>
      <ol class="list-decimal pl-6 space-y-2 text-slate-600 mb-6">
        <li><strong>Assessment:</strong> the physiotherapist asks about the diagnosis, surgery or stroke, reads the reports and checks movement, strength, balance and walking.</li>
        <li><strong>A plan with goals:</strong> for example sitting without support, standing from a chair, or walking to the bathroom, so progress can be seen.</li>
        <li><strong>Treatment:</strong> hands-on techniques and exercises suited to the patient. Intensity is raised slowly.</li>
        <li><strong>Teaching the family:</strong> how to help the patient move safely, how to position the weak side, and which exercises to repeat between visits.</li>
        <li><strong>Review:</strong> the therapist notes progress and adjusts the plan, and tells the doctor if something worries them.</li>
      </ol>
      <p ${PARA}>
        Our home physiotherapy is led by Dr. Desh Deepak Singh (BPT, MPT Neuro), who works with stroke and neurological patients. You can read how the service works on the <a href="/services/physiotherapy-at-home-lucknow/" ${LINK}>physiotherapy at home page</a>.
      </p>

      <h2 ${H2}>How many sessions will be needed?</h2>
      <p ${PARA}>
        There is no single answer. It depends on the condition, how long ago it started, the patient's general health and how well the family continues the exercises between visits. After the first assessment the physiotherapist can tell you how often to visit and how long to continue, and will review this as the patient improves. Be careful with anyone who promises a fixed cure in a fixed number of days.
      </p>

      <h2 ${H2}>What does it cost?</h2>
      <p ${PARA}>
        Charges depend on the number of sessions and the patient's needs, so we share them directly. Message us on WhatsApp or call <strong>+91 96530 01359</strong> with the diagnosis and your area, and we will tell you the charge before booking.
      </p>

      <h2 ${H2}>How to choose a home physiotherapist</h2>
      <ul ${UL}>
        <li>Ask for the qualification (BPT or MPT) and the experience with your patient's condition, such as stroke or joint replacement.</li>
        <li>They should assess before treating, set clear goals and explain the plan to you.</li>
        <li>They should teach the family and give a home exercise plan, not only treat during the visit.</li>
        <li>They should coordinate with the treating doctor, especially after surgery or in heart, lung or diabetic patients.</li>
        <li>They should be honest about expected progress and never promise a guaranteed cure.</li>
      </ul>

      <h2 ${H2}>Stop and call the doctor if</h2>
      <ul ${UL}>
        <li>The patient has chest pain, severe breathlessness, dizziness or fainting during exercise.</li>
        <li>There is sudden new weakness, facial droop or trouble speaking.</li>
        <li>One calf becomes swollen, red or painful.</li>
        <li>Pain suddenly gets much worse or a surgical wound opens or oozes.</li>
      </ul>
      <p ${PARA}>
        For recovery after a stroke or surgery, you may also like our guides on the <a href="/blog/stroke-patient-care-at-home-first-weeks/" ${LINK}>first weeks of stroke care at home</a> and <a href="/blog/home-physiotherapy-stroke-surgery-recovery/" ${LINK}>home physiotherapy after stroke or surgery</a>.
      </p>
      ${EMERGENCY_NOTE}
    `,
    faqs: [
      {
        q: "What does a home physiotherapy session include?",
        a: "An assessment of movement, strength and balance, treatment with hands-on techniques and exercises, teaching the family safe handling and a home exercise plan, and a review of progress at each visit."
      },
      {
        q: "How many physiotherapy sessions will my family member need?",
        a: "It depends on the condition and how the patient responds. The physiotherapist will advise after the first assessment and review the plan as the patient improves."
      },
      {
        q: "What is the charge for physiotherapy at home in Lucknow?",
        a: "Charges depend on the number of sessions and the patient's needs. Message us on WhatsApp or call +91 96530 01359 with the diagnosis and your area, and we will tell you before you book."
      },
      {
        q: "Is physiotherapy at home as effective as at a clinic?",
        a: "For patients who find travel hard, home sessions are often more practical, and the family can practise exercises in the home setting. Some patients may also need clinic equipment later, and the physiotherapist can advise when."
      }
    ],
    relatedServices: ["physiotherapy-at-home-lucknow", "patient-attendant-lucknow", "doctor-home-visit-lucknow"]
  }
];

module.exports = SEO_POSTS;
