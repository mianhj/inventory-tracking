import jwt from 'jsonwebtoken';

export function encrypt(data: any) {
  return jwt.sign(data, process.env.JWT_SECRET_KEY);
}

export function decrypt<T>(token: string): T {
  return jwt.verify(token, process.env.JWT_SECRET_KEY) as T;
}
