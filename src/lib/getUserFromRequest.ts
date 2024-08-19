import { NextRequest } from 'next/server';
import { decrypt } from './jwt';

export function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get('Authorization')?.value || '';
  return decrypt(token);
}
