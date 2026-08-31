/**
 * Athenix lead webhook — paste this into a Google Sheet's Apps Script
 * editor (Extensions > Apps Script), then deploy as a Web App.
 * See athenix-website/README.md "Google Sheets configuration" for the
 * full deployment steps.
 *
 * Matches the payload shape sent by src/lib/leadDelivery.ts:
 *   { formType: "webinar" | "corporate-training" | "consultancy",
 *     submittedAt: string,
 *     data: { ...form fields... } }
 *
 * Writes each lead type to its own tab, creating the tab and its header
 * row automatically the first time that formType is received.
 */

const SHEET_CONFIG = {
  "webinar": {
    tabName: "Webinar Leads",
    headers: [
      "Timestamp",
      "Full Name",
      "Email",
      "WhatsApp",
      "Date of Birth",
      "Occupation",
      "Course Interest",
      "Webinar",
      "Consent",
    ],
    fields: ["fullName", "email", "whatsapp", "dob", "occupation", "courseInterest", "webinar", "consent"],
  },
  "corporate-training": {
    tabName: "Corporate Training Leads",
    headers: [
      "Timestamp",
      "Full Name",
      "Work Email",
      "Phone",
      "Company",
      "Designation",
      "Team Size",
      "Training Requirement",
      "Preferred Format",
      "Message",
    ],
    fields: [
      "fullName",
      "workEmail",
      "phone",
      "company",
      "designation",
      "teamSize",
      "trainingRequirement",
      "preferredFormat",
      "message",
    ],
  },
  "consultancy": {
    tabName: "Consultancy Leads",
    headers: [
      "Timestamp",
      "Full Name",
      "Business Email",
      "Phone",
      "Company",
      "Industry",
      "Business Size",
      "Improvement Goal",
      "Current Challenges",
      "Preferred Contact",
    ],
    fields: [
      "fullName",
      "businessEmail",
      "phone",
      "company",
      "industry",
      "businessSize",
      "improvementGoal",
      "currentChallenges",
      "preferredContact",
    ],
  },
};

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const config = SHEET_CONFIG[payload.formType];
    if (!config) {
      return jsonResponse({ ok: false, error: "Unknown formType" });
    }

    const sheet = getOrCreateSheet(config.tabName, config.headers);
    const row = [payload.submittedAt].concat(
      config.fields.map((field) => (payload.data && payload.data[field] != null ? payload.data[field] : ""))
    );
    sheet.appendRow(row);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getOrCreateSheet(tabName, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
