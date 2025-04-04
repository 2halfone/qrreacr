import { google } from 'googleapis';

// Define the expected structure for function parameters
type SheetParams = {
  name: string;
  surname: string;
  status: string;
};

export async function writeToSheets({ name, surname, status }: SheetParams) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const now = new Date().toLocaleString('it-IT', {
      timeZone: 'Europe/Rome',
    });

    const row = [now, name, surname, status];

    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'RawData!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return { success: true, message: 'Row added successfully' };
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    return { success: false, message: 'Failed to add row' };
  }
}