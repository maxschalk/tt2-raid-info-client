import { writable } from 'svelte/store';

export interface NavbarProps {
  titleMain: string;
  start?: NavbarLink;
  links: { [key: string]: NavbarLink };
}

export interface NavbarLink {
  href: string;
  displayText: string;
  prefetch?: true | null;
  children?: Omit<NavbarLink, 'children'>[];
}

export function getDefaultNavbarProps() {
  return {
    titleMain: 'TT2 Raid Info',
    start: {
      href: '/',
      displayText: 'HOME',
    },
    links: {
      raidInfo: {
        href: '/raid_info',
        displayText: 'RAID SEEDS',
      },
      about: {
        href: '/about',
        displayText: 'ABOUT',
        prefetch: true as const,
      },
    },
  };
}

export const navbar = writable<NavbarProps>(getDefaultNavbarProps());
