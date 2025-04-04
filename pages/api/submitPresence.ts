import type { NextApiRequest, NextApiResponse } from 'next';
import { writeToSheets } from './submit-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, surname } = req.body;
  if (!name || !surname) {
    return res.status(400).json({ message: 'Missing name or surname' });
  }

  const result = await writeToSheets({ name, surname, status: 'Present' });
  return res.status(result.success ? 200 : 500).json({ message: result.message });
}
