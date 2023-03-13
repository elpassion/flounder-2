import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavigationItem } from '@flounder/ui';

export function NavigationLink(props: { children: ReactNode; href: string; icon: JSX.Element }) {
  const router = useRouter();
  const isCurrent = router.pathname === props.href;

  return (
    <Link href={props.href}>
      <NavigationItem isActive={isCurrent} icon={props.icon}>
        {props.children}
      </NavigationItem>
    </Link>
  );
}
