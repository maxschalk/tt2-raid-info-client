import { writable } from 'svelte/store';

export interface NavbarProps {
	titleMain: string;
	linksMain: NavbarLink[];
	titleSub: string;
	linksSub: NavbarLink[];
}

export interface NavbarLink {
	href: string;
	displayText: string;
	prefetch?: boolean;
}

export function getDefaultNavbarProps() {
	return {
		titleMain: 'Tap Titans 2 Raid Info',
		linksMain: [
			{
				href: '/',
				displayText: 'Home'
			},
			{
				href: '/raid_info',
				displayText: 'Raid Seed Info',
				prefetch: true
			}
		],
		titleSub: '',
		linksSub: []
	};
}

export const navbar = writable<NavbarProps>(getDefaultNavbarProps());
