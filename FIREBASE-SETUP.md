# Srinika - Firebase setup (free Spark plan, no paid services)

One backend for everything: **Firestore** project `srinika-medisurge`.

```
Website /book/ ─┐                                   ┌─► Partner app (owner: all visits,
Patient app    ─┼─► Firestore `tasks` (pending) ────┤    staff: only their assigned visits)
Feedback form  ─┘        ▲                          └─► Rx archived in `prescriptions`
Patient Rx photo ───► `rxUploads` ───► owner sees it in the Partner app (Profile tab)
                         └── patient app shows live status of its own booking
WhatsApp message to +91 96530 01359 is still sent as an instant alert (backup channel).
```

Google Sheet is no longer used. Bookings the network could not deliver wait in the
app/browser outbox and are retried automatically (up to 7 days).

## Roles

* **Owner = `srinika.medisurge@gmail.com`** (admin + doctor). Signs in with Google. Sees every
  visit (pending / assigned / who completed it), every prescription, patient photos and
  feedback. Adds/edits/disables/deletes staff in the **Staff** tab.
* **Staff (doctor / nurse / physio / attendant)** can sign in only if the owner saved their
  **Google email** in their Staff card. Staff see only the visits assigned to them.
* Nobody uses passwords. Google verifies the email; the security rules also require the
  email to be verified.
* **A visit marked Done is frozen for the doctor** (no edits to the visit or its payment).
  Prescriptions are write-once: the owner always sees exactly what the doctor gave the patient
  (Profile tab → "Prescriptions Issued", or "View Rx" on the completed visit).

## Admin panel (web) - https://srinikamedisurge.in/admin/

Owner-only (Google sign-in with srinika.medisurge@gmail.com; any other account is refused).

* **Overview** - collected today / this month, new & unassigned visits, online payments to verify.
* **Payments** - filter by period / status / mode / staff, totals by mode, CSV export. Online
  payments (Razorpay / UPI) arrive as "Online - to verify": check the payment id in Razorpay,
  then tap **Mark received**.
* **Prices** - every service, procedure and equipment-rental price. Press **Save prices**; the
  website pages, booking form, estimator, the Razorpay consultation amount and the patient app
  pick it up within ~2 minutes. "Back" arrow = return to the built-in price.
* **Staff** - add, edit, **deactivate / activate**, delete. The Partner app can only add and edit
  staff (no delete, no deactivate). A deactivated doctor is signed out of the app immediately.

How prices work: `builder/data/price_lines.js` is the one list of price lines (built-in defaults).
Owner overrides live in Firestore `config/prices`. Page text that is only in meta tags /
JSON-LD (Google snippets) stays at the built-in price until the site is rebuilt
(`node builder/gen-price-lines.js && node builder/build.js`, then deploy).

## One-time console steps (cannot be done from code)

1. **Firestore Database → Rules** → paste `firestore.rules` → **Publish** (re-publish after every update of that file).
   **Authentication → Settings → Authorized domains** → add `srinikamedisurge.in` and `www.srinikamedisurge.in` (needed for Google sign-in on /admin/).
   Until this is published the website/apps cannot save bookings.
2. **Authentication → Sign-in method → Google → Enable.**
3. **Partner app (Android) needs native Google sign-in** (Google blocks sign-in inside
   embedded web views):
   * Project settings → *Your apps* → **Add app → Android**, package
     `in.srinikamedisurge.partner`.
   * Add the **SHA-1** of the keystore that signs the APK
     (Debug build: `96:A5:BA:A9:B3:FD:0F:B6:09:F4:8B:A9:27:E7:32:16:05:83:CE:DA`;
     release build: run `keytool -list -v -keystore android-release/srinika-release-key.keystore`).
     If the app is distributed through Google Play app signing, also add the Play signing SHA-1.
   * Download the new `google-services.json` and replace
     `android-partner/android/app/google-services.json` (a stand-in file is there so the app
     starts; Google login will say "not configured" until this is done).
   * In `android-partner/android/app/src/main/res/values/strings.xml` set
     `default_web_client_id` to the **Web client ID** (Authentication → Google → Web SDK
     configuration), or rely on the one inside `google-services.json`.
   * Rebuild: `cd android-partner && npx cap sync android` then build the APK.
4. In the Partner app sign in as the owner once, open **Staff**, tap **Edit** on each doctor
   and add their Google email. The app starts with the team names but **no emails**.

## Prescription PDF → WhatsApp (Partner app)

A small native plugin (`WhatsAppSharePlugin.java`) attaches the PDF to a WhatsApp share intent
aimed at the patient's number (WhatsApp ignores attachments sent via `wa.me` links). If
WhatsApp is not installed, the normal Android share sheet opens. Verified on an Android
emulator up to the share sheet; the final hand-off to WhatsApp needs a real phone.

## Patient app prescription photo

Camera and gallery use the native Capacitor Camera plugin (the old `<input capture>` could not
open the camera inside the app). The photo is compressed (~300 KB) and saved to Firestore, so
the doctor sees it in the Partner app even if the patient never opens WhatsApp. (Cloud Storage
is not used because it is no longer free.)

## Data model (`tasks`)

`patientName, phone, address, serviceName, fee, status (pending → in_progress → completed),
paymentStatus (unpaid | claimed | paid), paymentRef, assignedTo, assignedToName,
completedBy, completedByName, source (website | patient-app | partner-app), createdAtMs`

* `claimed` = patient says they paid online (Razorpay id stored). There is no backend to
  verify it, so the Partner app shows **"Paid online - verify pay_xxx"**; confirm in the Razorpay
  dashboard, then complete the visit.
* Public (not signed-in) users can only **create** a pending booking and **read one booking
  by its random 20-char id**. They cannot list, edit or delete anything.

## Testing rules locally

Rules were verified with the Firestore emulator (53 cases: public limits, owner, doctor-scoped
reads, completed-visit lock, write-once prescriptions, patient photos, unverified emails,
outsiders). Re-run after any rules change.
