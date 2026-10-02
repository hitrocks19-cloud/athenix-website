/**
 * Athenix lead intake for Google Sheets.
 *
 * HOW TO USE (details in SETUP-SHEETS-AND-PAYMENTS.md):
 *   1. Open the Google Sheet  ->  Extensions  ->  Apps Script.
 *   2. Delete any code there, paste this whole file, click Save.
 *   3. Deploy  ->  New deployment  ->  Web app
 *        Execute as: Me      Who has access: Anyone
 *   4. Copy the Web app URL into the website's environment variables.
 *
 * Use this SAME file in both sheets (Training and Consultancy). It creates
 * the tabs and header rows itself, so you start with completely empty sheets.
 *
 *   Training sheet     ->  tabs "Webinar Registrations" + "Corporate Training Leads"
 *   Consultancy sheet  ->  tab  "Consultancy Leads"
 */

var TZ = "Asia/Kolkata";

var SHEETS = {
  "webinar": {
    name: "Webinar Registrations",
    headers: [
      "Submitted At", "Status", "Full Name", "Email", "WhatsApp", "Date of Birth", "Occupation",
      "Course Interest", "Webinar", "Amount (INR)", "Order ID", "Payment ID", "Paid At", "Consent"
    ],
    row: function (p, d) {
      return [
        fmt(p.submittedAt), p.status || "", d.fullName, d.email, d.whatsapp, d.dob, d.occupation,
        d.courseInterest, d.webinarTitle || d.webinar, p.amount, p.orderId, p.paymentId, fmt(p.paidAt),
        d.consent === true ? "Yes" : d.consent === false ? "No" : ""
      ];
    }
  },
  "corporate-training": {
    name: "Corporate Training Leads",
    headers: [
      "Submitted At", "Name", "Work Email", "Phone / WhatsApp", "Company", "Designation",
      "Team Size", "Training Requirement", "Preferred Format", "Message"
    ],
    row: function (p, d) {
      return [
        fmt(p.submittedAt), d.fullName, d.workEmail, d.phone, d.company, d.designation,
        d.teamSize, d.trainingRequirement, d.preferredFormat, d.message
      ];
    }
  },
  "consultancy": {
    name: "Consultancy Leads",
    headers: [
      "Submitted At", "Name", "Business Email", "Phone / WhatsApp", "Company", "Industry",
      "Business Size", "What they want to improve", "Current challenges", "Preferred contact"
    ],
    row: function (p, d) {
      return [
        fmt(p.submittedAt), d.fullName, d.businessEmail, d.phone, d.company, d.industry,
        d.businessSize, d.improvementGoal, d.currentChallenges, d.preferredContact
      ];
    }
  }
};

// Column positions (1-based) in "Webinar Registrations", used to update a row after payment.
var COL = { status: 2, amount: 10, orderId: 11, paymentId: 12, paidAt: 13 };

function doGet() {
  return json({ ok: true, message: "Athenix lead intake is running." });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var p = JSON.parse(e.postData.contents);

    // Optional shared secret: set a Script Property named WEBHOOK_SECRET (see the guide).
    var secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (secret && p.secret !== secret) return json({ ok: false, error: "unauthorized" });

    var def = SHEETS[p.formType];
    if (!def) return json({ ok: false, error: "unknown formType: " + p.formType });

    var sheet = getOrCreateSheet(def);
    var d = p.data || {};

    // After a successful payment: update the existing "Payment pending" row for this order.
    if (p.formType === "webinar" && p.action === "update" && p.orderId) {
      var row = findRow(sheet, COL.orderId, p.orderId);
      if (row) {
        var current = String(sheet.getRange(row, COL.status).getValue()).trim();
        if (current === "Paid") return json({ ok: true, result: "unchanged", alreadyPaid: true });
        sheet.getRange(row, COL.status).setValue(p.status || "Paid");
        sheet.getRange(row, COL.amount).setValue(p.amount || "");
        sheet.getRange(row, COL.paymentId).setValue(p.paymentId || "");
        sheet.getRange(row, COL.paidAt).setValue(fmt(p.paidAt));
        return json({ ok: true, result: "updated" });
      }
      // No pending row found (for example the first write failed): add a complete row instead.
    }

    appendRow(sheet, def.row(p, d));
    return json({ ok: true, result: "appended" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function getOrCreateSheet(def) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(def.name);
  if (!sheet) {
    sheet = ss.insertSheet(def.name);
    sheet.getRange(1, 1, 1, def.headers.length).setValues([def.headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function findRow(sheet, col, value) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var values = sheet.getRange(2, col, last - 1, 1).getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    if (String(values[i][0]).trim() === String(value).trim()) return i + 2;
  }
  return 0;
}

function appendRow(sheet, values) {
  var r = sheet.getLastRow() + 1;
  var cells = values.map(function (v) { return v === undefined || v === null ? "" : String(v); });
  var range = sheet.getRange(r, 1, 1, cells.length);
  range.setNumberFormat("@"); // keep phone numbers like +91... as plain text
  range.setValues([cells]);
}

function fmt(iso) {
  if (!iso) return "";
  try { return Utilities.formatDate(new Date(iso), TZ, "dd MMM yyyy, hh:mm a"); } catch (e) { return String(iso); }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
