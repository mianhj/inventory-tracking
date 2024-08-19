import { HTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/jwt';
import { Button } from '../ui/button';

import User from '@/types/User';
import UserMenu from './components/UserMenu';

export type NavbarProps = HTMLAttributes<HTMLElement>;

function Navbar({ className, ...props }: NavbarProps) {
  const token = cookies().get('Authorization')?.value;

  let user: User | null = null;
  if (token) {
    user = decrypt(token);
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="relative z-20 flex items-center text-lg font-medium  mr-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Inventory
        </div>
        <nav
          className={cn('flex items-center space-x-4 lg:space-x-6', className)}
          {...props}
        >
          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-primary p-1 px-4 rounded-full"
          >
            Products
          </Link>
          {token && user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors p-1 px-4 hover:text-primary"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
