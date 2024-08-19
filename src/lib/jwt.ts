import jwt from 'jsonwebtoken';

export function encrypt(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET_KEY);
}

export function decrypt(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}
