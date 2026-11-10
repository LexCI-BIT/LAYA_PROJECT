/**
 * Laya Space Design: saves enquiries from the website's forms into this Google Sheet.
 *
 * This file is not part of the website build. It runs inside Google, attached to the leads Sheet:
 * open the Sheet → Extensions → Apps Script, paste this file, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). The website sends each enquiry to that Web app URL,
 * which is set in src/utils/submitLead.js.
 *
 * After editing this script, use Deploy → Manage deployments → Edit → Version: New version,
 * so the website's URL keeps working.
 */

const SHEET_NAME = "Leads";

const HEADERS = [
  "Date",
  "Form",
  "Name",
  "Phone",
  "Email",
  "City",
  "Requirement",
  "Details",
  "Page",
];

// Longest value kept for each field; anything longer is cut
const MAX_LENGTH = {
  form: 60,
  name: 60,
  phone: 20,
  email: 100,
  city: 50,
  requirement: 60,
  details: 1000,
  page: 300,
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // The hidden "website" field is only ever filled in by spam bots: accept quietly, save nothing
    if (data.website) return reply({ ok: true });

    const lead = {};
    Object.keys(MAX_LENGTH).forEach((key) => {
      lead[key] = clean(data[key], MAX_LENGTH[key]);
    });
    if (!lead.name || !lead.phone)
      return reply({ ok: false, error: "missing-fields" });

    // Stops two enquiries arriving at the same moment from overwriting each other
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet().appendRow([
        new Date(),
        asText(lead.form),
        asText(lead.name),
        "'" + lead.phone, // keep phone numbers as text, so +91 and leading zeros stay
        asText(lead.email),
        asText(lead.city),
        asText(lead.requirement),
        asText(lead.details),
        asText(lead.page),
      ]);
    } finally {
      lock.releaseLock();
    }

    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: "server-error" });
  }
}

// Opening the Web app URL in a browser shows this, which confirms the deployment works
function doGet() {
  return ContentService.createTextOutput(
    "Laya Space Design leads endpoint is running.",
  );
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean(value, max) {
  return String(value == null ? "" : value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

// Text starting with = + - @ would be run as a spreadsheet formula, so store it as plain text
function asText(text) {
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(result) {
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
