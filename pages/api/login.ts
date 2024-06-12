import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = 'jwt_secret';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  // Dummy user data 
  const user = { id: 1, username: 'test', password: '123' };
  if (!secret) {
    res.status(500).json({ message: 'JWT secret not configured' });
    return;
  }

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user.id, username: user.username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export default handler;
