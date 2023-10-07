'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Link href={href} className={pathname === href ? 'active' : undefined}>
      {children}
    </Link>
  );
}
