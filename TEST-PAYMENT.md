# Srinika Medisurge — Payment Gateway Architecture & Live Testing Guide

## 1. Live Site Payment Architecture Audit
An inspection of the original live site (`https://srinikamedisurge.in/`) and codebase reveals the exact payment flow:
- **Client-Side Razorpay Standard Checkout**: The site uses the official Razorpay Checkout library (`https://checkout.razorpay.com/v1/checkout.js`) with the public Live Key ID (`rzp_live_Tn6PZUwraJ9021`).
- **No Backend Order Creation API**: The live architecture does not have a backend server or serverless `/api/create-order` endpoint. Instead, Razorpay Standard creates the transaction client-side upon patient modal trigger.
- **Webhook & Data Capture**: Upon successful transaction completion (`handler(response)` callback), the client sends the complete transaction and patient details to the Google Apps Script Webhook (`https://script.google.com/macros/s/AKfycbwIKwcF-eVAOvOgM3dS6B6KfpqHmezv8p4vBPINIVPtywSnEAJQhtA1c9wKNk2-nGw/exec`).
- **Confirmation & Alert**: The client immediately generates a confirmed digital invoice on screen with a unique reference number (`SRN-2610-XXXX`), and formats an instant WhatsApp message to Dr. Piyush Saxena containing the patient name, contact, service, amount, and Razorpay Payment ID.

---

## 2. API Key & Security Verification
- **Public Live Key ID**: `rzp_live_Tn6PZUwraJ9021` (Configured in `assets/js/main.js`).
- **Secret Keys**: **ZERO secret keys** exist in the repository. A repository-wide security scan confirms no Razorpay Key Secret (`rzp_live_secret_...` or similar) is present in any client code or config.

---

## 3. How the Owner Can Safely Test a ₹1 Live Transaction

Follow these steps to safely run a live ₹1 test payment without disrupting patient pricing:

1. **Temporary Test Amount**:
   - In `assets/js/main.js`, locate `amount: 50000` (which is ₹500 in paise).
   - Change it temporarily to:
     ```javascript
     amount: 100, // 100 paise = ₹1.00
     ```
2. **Execute Test Booking**:
   - Open `/book/` in your browser.
   - Select **Online Doctor Consultation**.
   - Fill in test patient information (e.g., Name: `Test Patient`, Mobile: your number).
   - Click **Proceed to Pay Online**.
   - In the payment modal, click **Pay via Razorpay Secure**.
   - Razorpay will open showing **₹1.00**.
   - Pay using your preferred UPI app (Google Pay, PhonePe, Paytm) or card.
3. **Verify All 3 Post-Payment Events**:
   - [x] **Event A (Digital Invoice)**: The screen immediately switches to the confirmed invoice modal displaying `#SRN-2610-XXXX`, your name, phone, doctor, timestamp, and the exact Razorpay `pay_...` ID.
   - [x] **Event B (Partner app sync)**: Open the Srinika Partner app as owner. A new visit appears instantly with the patient details, service, and the Razorpay payment ID marked "Paid online - verify".
   - [x] **Event C (WhatsApp Alert)**: Click the **Notify Doctor** button. It will open WhatsApp with a prefilled message addressed to the clinic containing the booking ID and verified payment ID.
4. **Instant Refund**:
   - Log into your [Razorpay Dashboard](https://dashboard.razorpay.com/).
   - Navigate to **Transactions > Payments**.
   - Locate the ₹1 payment, click **Refund**, and select **Instant Refund** to return the ₹1 to your account.
5. **Revert Test Amount**:
   - Change `amount: 100` back to `amount: 50000` in `assets/js/main.js`.

---

## 4. Modal Cancellation & Graceful Recovery
- If the patient opens the Razorpay modal and clicks the close (x) button without completing payment, Razorpay's `modal.ondismiss` handler fires.
- The modal closes smoothly, no error occurs, and the patient remains safely on the details/booking screen where they can retry or edit their details.
