import { NextRequest } from 'next/server';
import { decrypt } from './jwt';
import User from '@/types/User';

export function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get('Authorization')?.value || '';
  return decrypt(token) as User;
}
