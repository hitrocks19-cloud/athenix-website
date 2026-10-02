# Setup guide: Google Sheets + Cashfree payments

The website code is finished. This guide covers the parts only you can do, because they need your Google and Cashfree accounts. Do **Part 1** first (sheets), then **Part 2** (payments). Part 1 works on its own, even before Cashfree approves you.

## How it works

| Visitor does | What happens |
|---|---|
| Clicks **Explore Program** on a course, or **Book a Webinar** | The sign-up form opens. Data Analytics, SQL and Data Science preselect **Mastery in Excel + AI (₹199)**. AI Mentorship preselects **Mastery in Claude (₹499)**. |
| Presses **Pay ₹199 & Register** | Their details are saved to the **Training sheet** as **Payment pending**, then the Cashfree payment pop-up opens. |
| Pays successfully | The row changes to **Paid**, with the Cashfree payment ID and the amount. |
| Closes the pop-up without paying | The row stays **Payment pending**. This is a warm lead you can follow up. |
| Fills the Corporate Training form | A row in the Training sheet, tab **Corporate Training Leads**. |
| Fills the Consultancy form | A row in the **Consultancy sheet**. |

Until Cashfree is connected, webinar sign-ups are still saved, with status **Registered (payment not collected)**.

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

## Part 2: Cashfree

1. Log in at <https://merchant.cashfree.com>. You can do everything below in **Test (Sandbox) mode** before your account is fully approved.
2. Go to **Developers → API Keys** (Payment Gateway) and generate the **Test** keys: an **App ID** and a **Secret Key**. Save the secret somewhere safe.
3. Nothing else to set up in Cashfree. **No webhook is needed in the dashboard**: the website tells Cashfree where to send confirmations by itself.
4. When approved for real payments, generate the **live** keys in Live (Production) mode and use them with `CASHFREE_ENV=production`.

> Check with Cashfree: (1) the website address you registered is the one the site really uses; (2) if the dashboard asks you to **whitelist IP addresses** for the API keys, tell me or ask Cashfree support, because Vercel has no single fixed IP and a restriction would block payments.
>
> If Cashfree gives you only a **payment link or page** instead of an App ID and Secret Key, tell me before continuing. That works differently.

---

## Part 3: Put the values into Vercel

In Vercel: **Settings → Environment Variables** (Production, and Preview if you want to test there):

| Name | Value |
|---|---|
| `GOOGLE_SHEETS_TRAINING_WEBHOOK_URL` | Web app URL of the **Training** sheet |
| `GOOGLE_SHEETS_CONSULTANCY_WEBHOOK_URL` | Web app URL of the **Consultancy** sheet |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | The `WEBHOOK_SECRET` from Part 1 (skip if you skipped it) |
| `CASHFREE_APP_ID` | Cashfree **App ID** |
| `CASHFREE_SECRET_KEY` | Cashfree **Secret Key** (never share it or put it in chat) |
| `CASHFREE_ENV` | `sandbox` with test keys, `production` with live keys |

Then **Deployments → latest → ⋯ → Redeploy**. Changes only take effect after a redeploy.

---

## Part 4: Test it before announcing (Test mode)

1. On the live site click **Book a Webinar**, fill it with your own details, press **Pay ₹199 & Register**.
2. Use Cashfree's test card / UPI details: <https://www.cashfree.com/docs/payments/online/resources/sandbox-environment>
3. Check the **Training sheet**, tab **Webinar Registrations**: your row should say **Paid** with a payment ID that matches Cashfree → Transactions.
4. Try again but **close the pop-up**: a row should appear as **Payment pending**.
5. Submit the Consultancy and Corporate Training forms and check they land in the right sheets.
6. Switch to live keys (`CASHFREE_ENV=production`) only when all of this works.

## If something looks wrong

- **Visitor sees "We couldn't save your details just now":** the sheet could not be reached. Check the URL, the secret, and that the script is deployed as **Anyone**. The site shows this instead of pretending it worked, so no lead is silently lost.
- **Sheet is empty but the site says success:** the Vercel values were probably not set or the site was not redeployed. Webinar sign-ups made before payments are connected still show in the sheet as "Registered (payment not collected)".
- **Someone paid but the row says Payment pending:** check the Cashfree dashboard (Transactions). The website also confirms payments by itself when the person returns to the site, so this is rare. You can mark the row Paid and paste the payment ID by hand.
- **Refunds:** done from the Cashfree dashboard. Remember to change the status in the sheet by hand; the site does not track refunds.
