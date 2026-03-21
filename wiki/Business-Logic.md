# 💼 Business Logic & Operations

This document covers the core operational flows of Master Calisthenics India, including membership cycles, scheduled batch timings, and automated communication.

## 📅 Batch Timings

We offer specialized batches to cater to various demographic needs:
- **General Batches (Morning & Evening)**
  - Morning: 6:00 AM – 11:00 AM
  - Evening: 7:00 PM – 10:00 PM
- **Women’s Special Batch**
  - Days: Monday, Wednesday, Friday
  - Timing: Evening at 6:15 PM & 7:30 PM
  - Focus: Safe & comfortable environment, fat loss & toning.
- **Kids Fitness (Ages 6 - 14)**
  - Focus: Bodyweight strength, animal flow, and sports conditioning.
- **Group Batch & Personal Training**
  - "Train Together. Grow Stronger." with our standard group model or get personalized 1-on-1 coaching for rapid results.

## 🔄 Membership Lifecycle
1. **Trial Booking**: Users book a trial via the website. Data is pushed to Supabase (`trial_bookings` table).
2. **Onboarding**: Once a trial converts, the member is manually logged into our secure Google Sheets database.
3. **Database Sync**: The `apps-script-sync.js` script adds a custom menu (`MCI Admin -> Sync Members to Website`) in Google Sheets. It pulls all membership data (joining date, maturity date) and pushes an upsert/sync payload directly to the Supabase database.
4. **Renewal**: The expiry date tracked within Supabase informs coaches when a membership approaches renewal.

## 📱 Automated WhatsApp Reminder Logic
Our booking flow ensures friction-free communication using WhatsApp:
1. **Form Submission**: When a prospect submits the form on `book-trial.html` (Name, WhatsApp Number, Trial Date, Session Time, Offer Preference), the client intercepts the submit event.
2. **Database Logging**: The data is independently sent to Supabase in the background to ensure no lead is lost.
3. **WhatsApp Redirection**: The script dynamically constructs a pre-filled WhatsApp message. Examples:
   > *"Hey Team MCI, I would like to book a free trial session... Name: XYZ, Date: YYYY-MM-DD..."*
4. **Offer Appended**: If the user checked the "₹499 One Week Training" offer, it appends that preference to the WhatsApp context automatically.
5. **Execution**: Using `window.location.href = "https://wa.me/918433599778?text=..."`, the prospect is seamlessly dropped into our official WhatsApp chat to finalize scheduling.
