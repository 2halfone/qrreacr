import type { NextApiRequest, NextApiResponse } from 'next';
import { writeToSheets } from './submit-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, surname, reason } = req.body;
  if (!name || !surname || !reason) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const result = await writeToSheets({ name, surname, status: reason });
  return res.status(result.success ? 200 : 500).json({ message: result.message });
}