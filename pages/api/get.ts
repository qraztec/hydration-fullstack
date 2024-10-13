// /pages/api/get.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Import the centralized DB connection
import { handleGet } from '../../controllers/commands'; // Import the handler

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await handleGet(req, res, db); // Call the handler
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
