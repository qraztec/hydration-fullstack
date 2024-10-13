// /pages/api/post.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db'; // Import the centralized DB connection
import { handlePost } from '../../controllers/commands'; // Import the handler

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await handlePost(req, res, db); // Call the handler
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
