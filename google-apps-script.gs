/**
 * Google Apps Script for saving Early Access signups to a Google Sheet.
 *
 * Setup:
 * - Create a Google Sheet.
 * - In the Sheet: Extensions → Apps Script
 * - Paste this code, then Deploy → New deployment → Web app
 * - Execute as: Me
 * - Who has access: Anyone
 * - Copy the Web app URL and set it as GOOGLE_APPS_SCRIPT_URL in `.env.local`
 */

function ensureHeader_(sheet) {
  var firstRow = sheet.getRange(1, 1, 1, 4).getValues()[0];
  var isEmpty = firstRow.join("").trim() === "";
  if (isEmpty) {
    sheet.getRange(1, 1, 1, 4).setValues([["Timestamp", "Name", "Email", "Source"]]);
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeader_(sheet);

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var ts = data.timestamp || new Date().toISOString();
    var name = data.name || "";
    var email = data.email || "";
    var source = data.source || "";

    sheet.appendRow([ts, name, email, source]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

