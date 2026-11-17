// Blog posts added 17 Nov 2026. Concatenated onto the main list by data/blog.js.
// Written for families searching in Lucknow. General education only: every post ends with the
// emergency note and avoids dose numbers, prices and promises of outcome.
const H2 = 'class="text-2xl font-bold text-slate-900 mt-8 mb-4"';
const H3 = 'class="text-xl font-bold text-slate-800 mt-6 mb-3"';
const PARA = 'class="text-slate-600 leading-relaxed mb-4"';
const UL = 'class="list-disc pl-6 space-y-2 text-slate-600 mb-6"';
const LINK = 'class="text-sky-600 font-semibold hover:underline"';
const LEAD = 'class="lead text-lg text-slate-700 leading-relaxed font-medium mb-6"';

const EMERGENCY_NOTE = `
      <div class="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl my-8">
        <h4 class="text-lg font-bold text-amber-900 mb-2"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Important Medical Disclaimer</h4>
        <p class="text-sm text-amber-800 leading-relaxed">
          This guide is for general education and does not replace a doctor's examination. If the patient has severe breathlessness, chest pain, heavy bleeding, fainting, confusion or a seizure, call the national emergency number 108 or go to the nearest hospital straight away.
        </p>
      </div>`;

const AUTHOR = "Srinika Medisurge Medical Team (Guided by Dr. Piyush Saxena)";

const NEW_POSTS = [
  {
    slug: "how-to-choose-home-nurse-attendant-lucknow",
    title: "How to Choose a Home Nurse or Patient Attendant in Lucknow: An 8-Point Checklist",
    shortTitle: "Choosing a Home Nurse in Lucknow",
    date: "2026-11-17",
    author: AUTHOR,
    metaTitle: "How to Choose a Home Nurse or Attendant in Lucknow | 8-Point Checklist",
    metaDescription: "Hiring a home nurse or patient attendant in Lucknow? Check qualification, ID, experience, doctor oversight, shifts and backup before you decide. Call +91 96530 01359.",
    readTime: "6 min read",
    category: "Home Nursing",
    excerpt: "A home nurse will be inside your house and close to your family member for days or weeks. Use this checklist to compare agencies and individuals before you hire.",
    contentHtml: `
      <p ${LEAD}>
        Hiring someone to care for a parent or a recovering patient is a decision about trust. In Lucknow you can find nurses and attendants through hospitals, agencies, neighbours and phone numbers pasted on walls, and the quality varies a lot. These eight checks help you separate reliable help from risky shortcuts.
      </p>

      <h2 ${H2}>1. Know whether you need a nurse or an attendant</h2>
      <p ${PARA}>
        A <strong>nurse</strong> performs clinical tasks: injections, IV drips, wound dressing, catheter and feeding-tube care, and monitoring vital signs. An <strong>attendant</strong> (often called a GDA, general duty assistant) helps with turning, bathing, feeding, toileting and mobility. Many patients need an attendant every day and a nurse only for specific tasks. Our guide on <a href="/blog/gda-vs-nurse-vs-attendant-home-care/" ${LINK}>GDA vs nurse vs attendant</a> explains the difference in detail. Hiring the wrong type wastes money or leaves clinical tasks in untrained hands.
      </p>

      <h2 ${H2}>2. Ask about training and qualification</h2>
      <p ${PARA}>
        For nursing tasks ask for the qualification (for example GNM or B.Sc Nursing) and ask to see the certificate. For attendants ask about their training and how many bedridden or post-operative patients they have looked after. A confident answer with specific examples is a good sign. Vague replies are not.
      </p>

      <h2 ${H2}>3. Verify identity before they enter the house</h2>
      <p ${PARA}>
        You are letting a stranger into your home. Ask for a government photo ID, note the name and phone number, and share it with another family member. A reputable provider gives you this without hesitation, and the staff member should carry an ID card on every visit.
      </p>

      <h2 ${H2}>4. Check that a doctor oversees the care</h2>
      <p ${PARA}>
        A nurse working alone, with no doctor to call, is a risk if the patient suddenly changes. Ask who the supervising doctor is, whether you can speak to them and what happens if the patient worsens at night. Srinika Medisurge staff work under the guidance of <a href="/about/" ${LINK}>Dr. Piyush Saxena</a>, and a <a href="/services/doctor-home-visit-lucknow/" ${LINK}>doctor home visit</a> can be arranged when needed.
      </p>

      <h2 ${H2}>5. Be clear about shifts and what is included</h2>
      <p ${PARA}>
        Confirm in writing or on WhatsApp whether the shift is 12 hours or 24 hours, the start and end time, whether meals and rest breaks are expected, and which tasks the person will and will not do. Misunderstandings about duties are the most common reason for disputes.
      </p>

      <h2 ${H2}>6. Ask what happens if the staff member is absent</h2>
      <p ${PARA}>
        Care for a bedridden patient cannot have gaps. Ask whether a replacement is arranged if the nurse or attendant falls sick or leaves, and how quickly. Individuals found through friends often cannot offer this, while an organised service usually can.
      </p>

      <h2 ${H2}>7. Check hygiene and supplies</h2>
      <p ${PARA}>
        For dressings, catheters and injections, ask whether sealed, sterile consumables are carried or whether you must buy them. Look for clean hand-washing, fresh gloves and disposal of used items in a bag. Good hygiene protects the patient from infection.
      </p>

      <h2 ${H2}>8. Get the price clearly before the first visit</h2>
      <p ${PARA}>
        Ask for the rate per shift or per visit, and what extra charges, if any, apply for distance, night work or special procedures. At Srinika Medisurge, charges depend on the patient's condition, care hours and location, so we share the exact rate on WhatsApp or call before the visit begins.
      </p>

      <h2 ${H2}>Red flags to walk away from</h2>
      <ul ${UL}>
        <li>No ID, no phone number or a reluctance to share details</li>
        <li>Offers to give injections or IV fluids without a doctor's prescription</li>
        <li>Claims of curing a condition or promises of guaranteed recovery</li>
        <li>Asks for large advance payment in cash with no receipt</li>
        <li>No named doctor and no plan for emergencies</li>
      </ul>

      <h2 ${H2}>Start with a short trial</h2>
      <p ${PARA}>
        If you are unsure, begin with a few days and watch how the person works with the patient. Check that medicines are given on time, the skin is kept clean and dry, and the family is kept informed. You can read more about our staff on the <a href="/services/patient-attendant-lucknow/" ${LINK}>patient attendant</a> and <a href="/services/home-nursing-lucknow/" ${LINK}>home nursing</a> pages.
      </p>
      ${EMERGENCY_NOTE}
    `,
    faqs: [
      {
        q: "How do I know a home nurse in Lucknow is qualified?",
        a: "Ask for the qualification certificate (such as GNM or B.Sc Nursing) and a government photo ID, and confirm the nurse works under a named doctor. A reputable provider will share these details without hesitation."
      },
      {
        q: "Should I hire an individual or an organised home-care service?",
        a: "An organised service usually offers verified staff, a doctor for guidance and a replacement if the staff member is absent. Individuals can be good, but you carry the checking and the backup yourself."
      },
      {
        q: "Can a patient attendant give injections?",
        a: "No. Injections, IV drips and similar clinical tasks should be done by a trained nurse on a doctor's prescription. Attendants help with daily care such as turning, hygiene, feeding and mobility."
      },
      {
        q: "What should I send the provider before the first visit?",
        a: "Share the diagnosis, discharge summary and prescription, your address and the tasks you need, ideally on WhatsApp. This lets the team send the right person with the right supplies."
      }
    ],
    relatedServices: ["home-nursing-lucknow", "patient-attendant-lucknow", "gda-service-lucknow"]
  },
  {
    slug: "winter-care-elderly-lucknow-cold-chest-infection",
    title: "Winter Care for Elderly Parents in Lucknow: Cold, Chest Infection and Breathing Problems",
    shortTitle: "Winter Care for the Elderly",
    date: "2026-11-17",
    author: AUTHOR,
    metaTitle: "Winter Care for Elderly in Lucknow | Cold, Chest Infection & Breathing",
    metaDescription: "Protect elderly parents in Lucknow this winter: warning signs of chest infection, safe room heating, fluids, medicines, and when to call a doctor at home. Call +91 96530 01359.",
    readTime: "7 min read",
    category: "Elderly Care",
    excerpt: "Cold weather and fog make coughs, breathlessness and heart problems worse for senior citizens. Know the simple precautions and the signs that need a doctor the same day.",
    contentHtml: `
      <p ${LEAD}>
        From late November to February, Lucknow's cold mornings, fog and falling air quality are hard on older people. A simple cold can turn into bronchitis or pneumonia, and people with asthma, COPD, heart disease or diabetes are especially at risk. A few habits at home make a real difference.
      </p>

      <h2 ${H2}>Why winter is harder for the elderly</h2>
      <ul ${UL}>
        <li>Older people feel less cold and may not dress warmly enough</li>
        <li>Cold air narrows airways and can worsen asthma and COPD</li>
        <li>Cold can raise blood pressure and strain the heart</li>
        <li>Immunity is lower, so infections spread and settle in the chest more easily</li>
        <li>Joint pain and stiffness increase, so people move less and stay in bed longer</li>
      </ul>

      <h2 ${H2}>Everyday precautions</h2>
      <h3 ${H3}>Keep warm, safely</h3>
      <p ${PARA}>
        Use layers, a cap, socks and a muffler, especially at night and early morning. If you use a room heater, keep it away from bedding and curtains. <strong>Never burn coal or wood in a closed room</strong>, because carbon monoxide can build up silently and is dangerous.
      </p>
      <h3 ${H3}>Fluids and food</h3>
      <p ${PARA}>
        Older people drink less in winter because they feel less thirsty. Offer warm water, soups, dal, khichdi and tea at regular times. Good protein and fruit help the body fight infection.
      </p>
      <h3 ${H3}>Take medicines as prescribed</h3>
      <p ${PARA}>
        Continue regular medicines for BP, sugar, heart and breathing. Asthma and COPD patients should keep inhalers handy. Do not stop or change doses without asking the doctor.
      </p>
      <h3 ${H3}>Ask your doctor about vaccines</h3>
      <p ${PARA}>
        Influenza and pneumococcal vaccines are often advised for older adults and for people with chronic illness. Ask your doctor whether they are right for your parent.
      </p>
      <h3 ${H3}>Limit time outdoors in fog and smog</h3>
      <p ${PARA}>
        On days of heavy fog or poor air quality, keep morning walks indoors or wait until the sun is up and the air is clearer.
      </p>

      <h2 ${H2}>Warning signs of a chest infection</h2>
      <p ${PARA}>Do not wait if you notice any of the following:</p>
      <ul ${UL}>
        <li>Fever, chills or a cough that is getting worse or producing coloured sputum</li>
        <li>Fast or difficult breathing, or the person cannot finish a sentence</li>
        <li>Bluish lips, unusual drowsiness or confusion</li>
        <li>Oxygen saturation (SpO2) below the level your doctor has advised, usually around 94% or lower in a person who is normally above it</li>
        <li>Chest pain, or refusing to eat or drink</li>
      </ul>
      <p ${PARA}>
        A <a href="/services/doctor-home-visit-lucknow/" ${LINK}>doctor home visit</a> is useful for an elderly person who has a new cough, fever or weakness and who finds travel difficult. If breathing is difficult, chest pain is present or the oxygen level is low, go to a hospital emergency without delay.
      </p>

      <h2 ${H2}>Care at home during a mild chest infection</h2>
      <ul ${UL}>
        <li>Rest, warm fluids and a clean, ventilated room</li>
        <li>Medicines and nebulization only as prescribed. Our <a href="/services/nebulization-vitals-ecg-at-home/" ${LINK}>nebulization and vitals service</a> can do this at home</li>
        <li>Check temperature, pulse and SpO2 a few times a day and write them down for the doctor</li>
        <li>Prop the patient up with pillows, which makes breathing easier than lying flat</li>
        <li>Keep a family member nearby, especially at night</li>
      </ul>

      <h2 ${H2}>When breathing support is needed</h2>
      <p ${PARA}>
        Some patients with COPD or lung disease need oxygen or BiPAP support at home when advised by their doctor. Read <a href="/blog/when-is-bipap-oxygen-support-needed-at-home/" ${LINK}>when BiPAP or oxygen support is needed</a> and see our <a href="/services/bipap-oxygen-support-at-home-lucknow/" ${LINK}>BiPAP and oxygen at home</a> service.
      </p>
      ${EMERGENCY_NOTE}
    `,
    faqs: [
      {
        q: "Why do chest infections increase in elderly people in winter?",
        a: "Cold air irritates the airways, immunity is lower in older age and infections spread more easily indoors. People with asthma, COPD, diabetes or heart disease are at higher risk."
      },
      {
        q: "Is it safe to use a coal or wood heater at night?",
        a: "No. Burning coal or wood in a closed room can produce carbon monoxide, which is dangerous and can be fatal. Use a safe electric heater, keep it away from bedding and keep the room ventilated."
      },
      {
        q: "What oxygen level is a concern?",
        a: "Your doctor will tell you the safe level for your parent. In general, a reading that drops below about 94%, or falls well below the person's usual level, or comes with breathlessness, needs a doctor's attention the same day."
      },
      {
        q: "Can a doctor visit an elderly patient at home for a cough or fever in Lucknow?",
        a: "Yes. Srinika Medisurge offers doctor home visits and nurse visits for vitals, injections and nebulization as prescribed. Message or call us to confirm a slot."
      }
    ],
    relatedServices: ["doctor-home-visit-lucknow", "nebulization-vitals-ecg-at-home", "bipap-oxygen-support-at-home-lucknow"]
  },
  {
    slug: "ryles-tube-ng-feeding-at-home-safe-steps",
    title: "Ryle's Tube (NG Tube) Feeding at Home: Safe Steps and Common Mistakes",
    shortTitle: "Ryle's Tube Feeding at Home",
    date: "2026-11-17",
    author: AUTHOR,
    metaTitle: "Ryle's Tube (NG Tube) Feeding at Home | Safe Steps & Mistakes to Avoid",
    metaDescription: "How to feed a patient through a Ryle's (NG) tube at home: positioning, flushing, food consistency, hygiene and warning signs. Nurse support in Lucknow, call +91 96530 01359.",
    readTime: "7 min read",
    category: "Procedures",
    excerpt: "A feeding tube lets a patient who cannot swallow safely receive food and medicines. Done wrongly, it can cause choking or chest infection, so these basics matter.",
    contentHtml: `
      <p ${LEAD}>
        A Ryle's tube, also called a nasogastric (NG) tube, is a thin tube passed through the nose into the stomach. After a stroke, a serious illness or surgery, a patient may be unable to swallow safely, and the tube provides nutrition, fluids and medicines. Families often learn the routine in the hospital in a hurry. This guide repeats the safe basics, but always follow the instructions of the doctor or nurse who knows your patient.
      </p>

      <h2 ${H2}>Before every feed</h2>
      <ul ${UL}>
        <li><strong>Wash your hands</strong> with soap and water, and keep all equipment clean.</li>
        <li><strong>Sit the patient upright</strong>, ideally at about 45 degrees or more, and keep them that way during the feed and for about 30 to 60 minutes after. Lying flat raises the risk of food coming back up and entering the lungs.</li>
        <li><strong>Check the tube.</strong> Look at the mark or tape at the nostril. If the tube looks longer or shorter than before, or the patient is coughing or struggling, <strong>do not feed</strong> and call the nurse or doctor.</li>
        <li><strong>Prepare the feed</strong> as advised, at room or body temperature, never hot.</li>
      </ul>

      <h2 ${H2}>During the feed</h2>
      <ul ${UL}>
        <li>Give the feed <strong>slowly</strong>, in small amounts, as instructed. Pushing fast can cause vomiting, cramps and choking.</li>
        <li>Stop and call for help if the patient coughs, chokes, turns blue, vomits or seems uncomfortable.</li>
        <li>Use the syringe or feeding set as shown. Do not force the feed if there is resistance.</li>
      </ul>

      <h2 ${H2}>After the feed</h2>
      <ul ${UL}>
        <li>Flush the tube with the amount of clean, boiled and cooled water your doctor or nurse has advised, to prevent blocking.</li>
        <li>Close or clamp the tube properly and keep it secure.</li>
        <li>Keep the patient upright for the advised time. Clean the mouth and teeth, because oral hygiene lowers the risk of chest infection.</li>
        <li>Wash and dry the syringe and feeding set, and store them clean.</li>
      </ul>

      <h2 ${H2}>What to feed</h2>
      <p ${PARA}>
        The dietitian or doctor will tell you the type and amount. Home-prepared feeds are usually smooth, well-strained liquids such as thin dal water, soup, strained khichdi or porridge, milk-based preparations and juices. They must pass through the tube without lumps. Ready-made tube-feed formulas are another option. Do not add new foods or supplements without asking.
      </p>

      <h2 ${H2}>Giving medicines through the tube</h2>
      <p ${PARA}>
        Not all tablets can be crushed or mixed, and some should not be given together. Ask the doctor or pharmacist how each medicine should be given, and flush with a little water between medicines.
      </p>

      <h2 ${H2}>Common mistakes</h2>
      <ul ${UL}>
        <li>Feeding while the patient is lying flat</li>
        <li>Giving the feed too fast or in too large a volume</li>
        <li>Giving thick or lumpy food that blocks the tube</li>
        <li>Not flushing, or flushing with unclean water</li>
        <li>Continuing to feed after the tube has moved or come out</li>
        <li>Pulling the tube out and trying to reinsert it at home without training</li>
      </ul>

      <h2 ${H2}>Call the nurse or doctor if</h2>
      <ul ${UL}>
        <li>The tube comes out, moves, or the mark has changed</li>
        <li>The tube is blocked and does not clear with the advised flush</li>
        <li>The patient has repeated vomiting, a swollen belly, diarrhoea, or fever and cough</li>
        <li>The skin of the nose is red or sore</li>
      </ul>
      <p ${PARA}>
        Our nurses can insert and change tubes in sterile conditions and teach the family safe feeding. See <a href="/services/ng-tube-insertion-at-home-lucknow/" ${LINK}>Ryle's tube insertion at home in Lucknow</a> and our <a href="/services/patient-attendant-lucknow/" ${LINK}>patient attendant</a> service for daily help. If the patient needs tube feeding for a long time, ask the doctor whether another route is better.
      </p>
      ${EMERGENCY_NOTE}
    `,
    faqs: [
      {
        q: "How long should a patient sit upright after tube feeding?",
        a: "Usually for about 30 to 60 minutes after the feed, but follow the instructions of your doctor or nurse. Keeping the head and chest raised reduces the risk of food entering the lungs."
      },
      {
        q: "What should I do if the Ryle's tube comes out?",
        a: "Do not try to push it back in yourself. Stop feeding and call the nurse or doctor. A trained nurse can re-insert it safely, and a doctor will tell you if hospital care is needed."
      },
      {
        q: "Can I give crushed tablets through the tube?",
        a: "Only if the doctor or pharmacist says that medicine can be crushed. Some tablets must not be crushed, and some should not be mixed with others. Always ask first."
      },
      {
        q: "Can Srinika Medisurge insert a Ryle's tube at home in Lucknow?",
        a: "Yes. Our nurses insert and change Ryle's (NG) tubes at the patient's home in sterile conditions and train the family on feeding. Message or call us for the rate and the earliest visit."
      }
    ],
    relatedServices: ["ng-tube-insertion-at-home-lucknow", "patient-attendant-lucknow", "home-nursing-lucknow"]
  },
  {
    slug: "stroke-patient-care-at-home-first-weeks",
    title: "Caring for a Stroke Patient at Home: The First Weeks After Hospital Discharge",
    shortTitle: "Stroke Patient Care at Home",
    date: "2026-11-17",
    author: AUTHOR,
    metaTitle: "Stroke Patient Care at Home After Discharge | First Weeks Guide, Lucknow",
    metaDescription: "A practical guide for families caring for a stroke patient at home: positioning, feeding, bladder care, physiotherapy, medicines and warning signs. Support in Lucknow, call +91 96530 01359.",
    readTime: "8 min read",
    category: "Recovery",
    excerpt: "The first weeks at home after a stroke set the pace of recovery. Learn how to position, feed and exercise the patient safely, and which signs mean a second stroke.",
    contentHtml: `
      <p ${LEAD}>
        When a stroke patient comes home from the hospital, families are relieved and also anxious. The patient may have weakness or paralysis on one side, trouble speaking or swallowing, and may need help with every daily task. Recovery depends on the brain's ability to adapt, and the first weeks and months are the most important. A calm, steady routine at home helps.
      </p>

      <h2 ${H2}>1. Understand the discharge plan</h2>
      <p ${PARA}>
        Before leaving the hospital, make sure you have the discharge summary, the list of medicines with timings, the date of the follow-up visit and any diet or activity limits. Clot-preventing and BP medicines are often central to preventing a second stroke, so they must never be missed or stopped without the doctor's advice.
      </p>

      <h2 ${H2}>2. Position and move the patient safely</h2>
      <ul ${UL}>
        <li>Change position at least every two hours in bed to prevent pressure sores. See our guide on <a href="/blog/bedsore-prevention-bedridden-patient-home/" ${LINK}>bedsore prevention</a>.</li>
        <li>Never pull the weak arm. Support the shoulder and the whole arm when moving the patient, because a limp shoulder is easily injured.</li>
        <li>Use pillows to support the weak limbs in a comfortable position.</li>
        <li>Take help when lifting. A trained attendant knows safe techniques that protect both patient and family.</li>
      </ul>

      <h2 ${H2}>3. Swallowing and feeding</h2>
      <p ${PARA}>
        Many stroke patients cannot swallow safely at first. Coughing during meals, a wet or gurgling voice, or repeated chest infections are warning signs. The doctor may advise a modified diet or a feeding tube. Read our guide on <a href="/blog/ryles-tube-ng-feeding-at-home-safe-steps/" ${LINK}>Ryle's tube feeding at home</a>. Always sit the patient fully upright for meals and stay with them.
      </p>

      <h2 ${H2}>4. Bladder and bowel care</h2>
      <p ${PARA}>
        Loss of control is common early on. Some patients need a urinary catheter for a time. Learn the <a href="/blog/urinary-catheter-care-at-home-dos-donts/" ${LINK}>do's and don'ts of catheter care</a> to prevent infection. Regular toilet timing, plenty of fluids and fibre help bowel movements.
      </p>

      <h2 ${H2}>5. Start physiotherapy early</h2>
      <p ${PARA}>
        Gentle movement, positioning and exercises begin soon after the patient is stable, as advised by the treating team. A physiotherapist teaches you which exercises are safe, and your help between sessions makes a difference. Read about <a href="/blog/home-physiotherapy-stroke-surgery-recovery/" ${LINK}>home physiotherapy after stroke</a> or book <a href="/services/physiotherapy-at-home-lucknow/" ${LINK}>physiotherapy at home</a>.
      </p>

      <h2 ${H2}>6. Watch BP, sugar and the mood</h2>
      <p ${PARA}>
        Check blood pressure and blood sugar regularly and note them. Low mood, anxiety and frustration are very common after a stroke, and they are not a sign of weakness. Patience, short and clear sentences, and involving the patient in decisions help. Tell the doctor if sadness or poor sleep continues.
      </p>

      <h2 ${H2}>7. Know when to call for emergency help</h2>
      <p ${PARA}>Call 108 or go to the nearest hospital at once if you see:</p>
      <ul ${UL}>
        <li>New or worse weakness, a drooping face, slurred speech or confusion</li>
        <li>A sudden severe headache, repeated vomiting or a seizure</li>
        <li>Trouble breathing, chest pain or fainting</li>
        <li>Choking that does not settle</li>
      </ul>
      <p ${PARA}>
        Time matters in a stroke. Do not wait for a home visit or try home remedies.
      </p>

      <h2 ${H2}>8. Look after the caregiver too</h2>
      <p ${PARA}>
        Caring for a stroke patient is physically and emotionally tiring. Share the work, rest, and consider a trained attendant for day or night shifts. Our page on <a href="/conditions/stroke-paralysis-patient-care-at-home-lucknow/" ${LINK}>stroke and paralysis care at home in Lucknow</a> shows how nurses, attendants and physiotherapists can help.
      </p>
      ${EMERGENCY_NOTE}
    `,
    faqs: [
      {
        q: "How long does recovery after a stroke take?",
        a: "It varies widely. Most recovery happens in the first months, but improvement can continue for much longer with regular therapy. Your doctor and physiotherapist can give a realistic picture for your patient."
      },
      {
        q: "Can a stroke patient be cared for at home?",
        a: "Often yes, once the patient is medically stable and the hospital has discharged them. They need help with daily tasks, therapy, medicines and monitoring, and any sudden worsening needs hospital care."
      },
      {
        q: "Why is a drooping shoulder dangerous?",
        a: "The muscles that hold the shoulder joint are weak, so pulling the arm can injure or dislocate the joint and cause pain that slows recovery. Always support the whole arm when moving the patient."
      },
      {
        q: "Can you provide a nurse, attendant and physiotherapist for a stroke patient in Lucknow?",
        a: "Yes. Srinika Medisurge provides 12-hour and 24-hour attendants, nursing visits and home physiotherapy across Lucknow. Message or call us and we will share the options and the rate."
      }
    ],
    relatedServices: ["patient-attendant-lucknow", "physiotherapy-at-home-lucknow", "ng-tube-insertion-at-home-lucknow"]
  },
  {
    slug: "diabetic-foot-wound-care-at-home",
    title: "Diabetic Foot Wound Care at Home: Daily Checks, Dressing and Danger Signs",
    shortTitle: "Diabetic Foot & Wound Care",
    date: "2026-11-17",
    author: AUTHOR,
    metaTitle: "Diabetic Foot Wound Care at Home | Daily Checks & Dressing, Lucknow",
    metaDescription: "How to care for a diabetic foot wound at home: daily foot checks, safe cleaning, footwear, sugar control and the danger signs that need a doctor the same day. Call +91 96530 01359.",
    readTime: "7 min read",
    category: "Wound Care",
    excerpt: "In people with diabetes, a small foot injury can turn serious because of poor sensation and slow healing. Daily checks and early, proper dressing prevent most complications.",
    contentHtml: `
      <p ${LEAD}>
        High blood sugar over a long time can damage nerves and blood vessels in the feet. A person may not feel a stone in the shoe, a blister or a cut, and a small wound heals slowly and can become infected. Many serious foot problems begin as something minor that was not noticed. Daily care and early treatment matter far more than any ointment.
      </p>

      <h2 ${H2}>Check both feet every day</h2>
      <ul ${UL}>
        <li>Look at the tops, soles, heels and between the toes, using a mirror or the help of a family member if bending is hard.</li>
        <li>Look for cuts, blisters, cracks, corns, swelling, redness, a change in colour or a nail growing into the skin.</li>
        <li>Feel for warmth, or areas that feel hard or numb.</li>
        <li>Report any new wound, even a small one, to your doctor early.</li>
      </ul>

      <h2 ${H2}>Everyday foot care</h2>
      <ul ${UL}>
        <li>Wash the feet daily with lukewarm water and mild soap, and <strong>dry well between the toes</strong>.</li>
        <li>Test water temperature with your elbow or ask someone else, because numb feet can get burned without the person noticing.</li>
        <li>Moisturise the skin of the feet, but not between the toes.</li>
        <li>Wear clean cotton socks and well-fitting shoes or soft chappals. <strong>Never walk barefoot</strong>, even indoors.</li>
        <li>Shake out and check shoes before wearing them.</li>
        <li>Do not cut corns or calluses yourself, do not use blades, and do not apply strong chemicals. Trim nails straight across, or ask a professional.</li>
        <li>Do not use hot water bottles or heaters on the feet.</li>
      </ul>

      <h2 ${H2}>If a wound appears</h2>
      <p ${PARA}>
        See a doctor soon, because a diabetic wound should be assessed rather than treated by guesswork. In general, a wound is gently cleaned and covered with a sterile dressing that the doctor has advised. Do not use turmeric, powders, home pastes or old creams on an open wound, and do not soak the foot unless the doctor says so. The patient should avoid putting weight on the wound as far as possible.
      </p>
      <p ${PARA}>
        Our nurses perform <a href="/services/wound-dressing-at-home-lucknow/" ${LINK}>sterile wound dressing at home</a> using sealed kits, and they note how the wound is healing at each visit so the doctor can adjust the treatment. Our guide to <a href="/blog/post-surgery-wound-dressing-at-home/" ${LINK}>wound dressing at home</a> explains the process.
      </p>

      <h2 ${H2}>Keep blood sugar under control</h2>
      <p ${PARA}>
        Wounds heal poorly when sugar stays high. Take diabetes medicines and insulin as prescribed, follow the diet plan, and check sugar at the times your doctor suggests. If the wound is not improving despite good dressing, tell the doctor, because the medicines or the circulation in the foot may need review.
      </p>

      <h2 ${H2}>Danger signs: see a doctor the same day</h2>
      <ul ${UL}>
        <li>Spreading redness, warmth or swelling of the foot or leg</li>
        <li>Pus, a bad smell or a wound that is getting deeper or larger</li>
        <li>Black, grey or very pale skin around a wound</li>
        <li>Fever, chills, or feeling suddenly very unwell</li>
        <li>New severe pain, or a foot that has turned cold or blue</li>
      </ul>
      <p ${PARA}>
        These can mean a serious infection or poor blood supply and often need urgent treatment. If the patient is old or bedridden, a <a href="/services/doctor-home-visit-lucknow/" ${LINK}>doctor home visit</a> can assess the wound, but severe signs should go to a hospital without delay.
      </p>
      ${EMERGENCY_NOTE}
    `,
    faqs: [
      {
        q: "Why do diabetic foot wounds heal slowly?",
        a: "High sugar damages blood vessels and nerves, so less blood reaches the foot and the person may not feel an injury. Infection is also more likely. Good sugar control, daily checks and proper dressing help healing."
      },
      {
        q: "Can I treat a diabetic foot wound with home remedies?",
        a: "It is not safe. Turmeric, powders, pastes and old creams can introduce infection. A doctor should assess the wound, and it should be cleaned and dressed as advised."
      },
      {
        q: "How often should a diabetic wound be dressed?",
        a: "It depends on the wound. Some need daily dressing and others less often, and the doctor will advise the interval. A nurse can keep the schedule and report changes to the doctor."
      },
      {
        q: "Can a nurse dress a diabetic wound at home in Lucknow?",
        a: "Yes. Srinika Medisurge nurses perform sterile wound dressing at home with sealed kits, and they advise you to see a doctor if the wound looks infected or is not improving."
      }
    ],
    relatedServices: ["wound-dressing-at-home-lucknow", "doctor-home-visit-lucknow", "home-nursing-lucknow"]
  }
];

module.exports = NEW_POSTS;
