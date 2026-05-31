# Contact Form → Google Sheets Setup

One-time setup. Takes about 5 minutes.

## Steps

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
   Name it: `Joe Yniguez — Leads`

2. Click **Extensions → Apps Script**.

3. Delete any existing code in the editor. Paste the entire contents of `Code.gs`.

4. Click **Save** (floppy disk icon).

5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**

6. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/XXXX.../exec`

7. Open `index.html` and replace this line:
   ```js
   const APPS_SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
   ```
   with:
   ```js
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```

8. Commit and push — the form is live.

## What happens when someone submits

- A new row is added to the Google Sheet instantly
- Columns: Timestamp, First Name, Last Name, Email, Phone, Interested In, Message
- Optional: add a Google Sheets notification (Tools → Notification rules → "Any changes") to get an email alert for each new lead
