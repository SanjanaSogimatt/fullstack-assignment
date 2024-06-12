import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = 'jwt_secret';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!secret) {
    res.status(500).json({ message: 'JWT secret not configured' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default handler;
