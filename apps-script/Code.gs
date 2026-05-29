// Joe Yniguez — Contact Form → Google Sheets
// Standalone script: creates the spreadsheet on first run, reuses it after.

const SPREADSHEET_NAME = 'Joe Yniguez — Contact Leads';
const SHEET_NAME = 'Leads';

function getOrCreateSheet() {
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  let ss;
  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
  } else {
    ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  }
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Interested In', 'Message']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#1B3A2D').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.firstName  || '',
      data.lastName   || '',
      data.email      || '',
      data.phone      || '',
      data.interest   || '',
      data.message    || '',
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
