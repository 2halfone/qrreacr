// /pages/api/submitPresence.ts e /pages/api/submitAbsence.ts condividono questa logica base

import { google } from 'googleapis';

export async function writeToSheets({ name, surname, status }) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const date = new Date().toISOString().split('T')[0];
    const row = [date, name, surname, status];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'RawData!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    const userSheetName = `${name} ${surname}`;
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${userSheetName}!A:D`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return { success: true, message: `${status} registered for ${name} ${surname}` };
  } catch (error) {
    console.error('Error writing to Sheets:', error);
    return { success: false, message: 'Error registering attendance.' };
  }
}
