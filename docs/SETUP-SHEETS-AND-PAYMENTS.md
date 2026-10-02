# Setup guide: Google Sheets + Razorpay payments

The website code is finished. This guide covers the parts only you can do, because they need your Google and Razorpay accounts. Do **Part 1** first (sheets), then **Part 2** (payments). Part 1 works on its own, even before you have Razorpay.

## How it works

| Visitor does | What happens |
|---|---|
| Clicks **Explore Program** on a course, or **Book a Webinar** | The sign-up form opens. Data Analytics, SQL and Data Science preselect **Mastery in Excel + AI (₹199)**. AI Mentorship preselects **Mastery in Claude (₹499)**. |
| Presses **Pay ₹199 & Register** | Their details are saved to the **Training sheet** as **Payment pending**, then the Razorpay pop-up opens. |
| Pays successfully | The row changes to **Paid**, with the Razorpay payment ID and the amount. |
| Closes the pop-up without paying | The row stays **Payment pending**. This is a warm lead you can follow up. |
| Fills the Corporate Training form | A row in the Training sheet, tab **Corporate Training Leads**. |
| Fills the Consultancy form | A row in the **Consultancy sheet**. |

Until Razorpay is connected, webinar sign-ups are still saved, with status **Registered (payment not collected)**.

---

## Part 1: Google Sheets (about 10 minutes, once for each sheet)

Do these steps twice: once for a sheet called **Athenix Training**, once for **Athenix Consultancy**.

1. Go to <https://sheets.google.com> and create a new blank spreadsheet. Name it (Training or Consultancy). Leave it empty; the script makes the tabs and headings itself.
2. In the sheet, click **Extensions → Apps Script**.
3. Delete everything in the editor, then paste the full contents of `docs/google-apps-script.gs` from this project. Click the **Save** icon.
4. (Recommended) Add a password so nobody else can post to your sheet:
   - In Apps Script, click the **gear icon (Project Settings)** on the left.
   - Under **Script Properties**, click **Add script property**.
   - Property: `WEBHOOK_SECRET`. Value: any long random text (for example 30 random letters and digits). Save.
   - Use the **same value for both sheets**. You will paste it into the website settings in Part 3.
5. Click **Deploy → New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**. Google will ask you to **Authorize access**: choose your account, then **Advanced → Go to (project) → Allow**. This is normal for your own script.
6. Copy the **Web app URL** (it ends in `/exec`).
7. Open that URL in a browser tab. You should see: `{"ok":true,"message":"Athenix lead intake is running."}`.

You now have two URLs: one from the Training sheet, one from the Consultancy sheet.

> If you ever change the script code, use **Deploy → Manage deployments → pencil icon → Version: New version → Deploy**. The URL stays the same.

---

## Part 2: Razorpay

1. Sign up at <https://razorpay.com> and complete the business details and KYC. You can do everything below in **Test Mode** before KYC is approved.
2. In the dashboard, switch on **Test Mode** (toggle at the top).
3. Go to **Account & Settings → API Keys → Generate Test Key**. You get a **Key Id** (starts `rzp_test_`) and a **Key Secret**. Save the secret somewhere safe; it is shown only once.
4. Go to **Account & Settings → Webhooks → Add New Webhook**:
   - Webhook URL: `https://www.athenixlearning.com/api/payments/webhook`
   - Secret: make up a long random text (not the same as the other secrets). Keep it.
   - Active events: tick **payment.captured** and **order.paid**.
   - Save.

   The webhook is a safety net: if someone pays and closes the browser before the page confirms, Razorpay still tells your website, and the sheet still says **Paid**.
5. In **Account & Settings → Payments** (or Checkout settings), leave **Auto-capture** on, so successful payments are captured automatically.

When you are ready to take real money, repeat steps 2 to 4 in **Live Mode** (after KYC approval) with the **live** keys and a live webhook, then update the Vercel values in Part 3.

---

## Part 3: Put the values into Vercel

In Vercel open your project, then **Settings → Environment Variables**, and add the following for **Production** (and Preview if you want to test there):

| Name | Value |
|---|---|
| `GOOGLE_SHEETS_TRAINING_WEBHOOK_URL` | Web app URL of the **Training** sheet |
| `GOOGLE_SHEETS_CONSULTANCY_WEBHOOK_URL` | Web app URL of the **Consultancy** sheet |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | The `WEBHOOK_SECRET` you chose in Part 1 (skip if you skipped it) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay **Key Id** (`rzp_test_...` first, `rzp_live_...` later) |
| `RAZORPAY_KEY_SECRET` | Razorpay **Key Secret**. Never share this, and never put it in the website code or in chat. |
| `RAZORPAY_WEBHOOK_SECRET` | The webhook secret from Part 2, step 4 |

Then **Deployments → latest → ⋯ → Redeploy**. Changes to these values only take effect after a redeploy.

The same names are listed in `.env.example`. To test on your own computer, copy them into `.env.local`.

---

## Part 4: Test it before announcing (Test Mode)

1. Open the live site, click **Book a Webinar**, fill the form with your own details, and press **Pay ₹199 & Register**.
2. Razorpay Test Mode shows a test checkout. Use Razorpay's test card or test UPI details from their docs (<https://razorpay.com/docs/payments/payments/test-card-details/>).
3. After paying, check the **Training sheet**, tab **Webinar Registrations**: your row should say **Paid** with a payment ID that also appears in Razorpay → Transactions.
4. Try again but **close the pop-up**. A second row should appear as **Payment pending**.
5. Submit the **Consultancy** form and the **Corporate Training** form; check they land in the right sheets.
6. Switch to Live keys only when all of this works.

## If something looks wrong

- **Visitor sees "We couldn't save your details just now":** the sheet could not be reached. Check the URL, the secret, and that the script is deployed as **Anyone**. The site shows this instead of pretending it worked, so no lead is silently lost.
- **Sheet is empty but the site says success:** the Vercel values were probably not set or the site was not redeployed. Webinar sign-ups made before payments are connected still show in the sheet as "Registered (payment not collected)".
- **Someone paid but the row says Payment pending:** check Razorpay → Transactions for the payment, and check the webhook shows "delivered" under Webhooks → your webhook → Logs. The payment ID can be pasted into the sheet by hand.
- **Refunds:** done from the Razorpay dashboard. Remember to change the status in the sheet by hand; the site does not track refunds.
