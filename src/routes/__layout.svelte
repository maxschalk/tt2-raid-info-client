<script lang="ts" context="module">
	import type { ExternalFetch } from '@sveltejs/kit';
	import { SortOrder } from '../types';

	import { getSeedFilenames } from '../apiInterface';
	import { seedFilenames, type NavbarLink } from '../stores';

	export async function load({ fetch }: { fetch: ExternalFetch }) {
		try {
			const data = await getSeedFilenames(SortOrder.DESCENDING, fetch);
			seedFilenames.set(<string[]>data);
		} catch (e) {
			seedFilenames.set([]);
		}

		return {};
	}
</script>

<script lang="ts">
	import '../app.css';
	import '../global.css';

	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	import Nav from '$lib/Nav.svelte';

	import { navbar, type NavbarProps } from '../stores';
	import { ISODateStringFromFilename } from '../utils';

	onMount(() => {
		themeChange(false);
	});

	navbar.update((old: NavbarProps) => {
		return {
			...old,
			links: {
				...old.links,
				raidInfo: {
					...old.links.raidInfo,
					children: [
						...(<NavbarLink[]>(
							$seedFilenames.map(ISODateStringFromFilename).map((isoDateString) => ({
								href: `/raid_info/${isoDateString}`,
								displayText: isoDateString,
								prefetch: true,
							}))
						)),
						{
							href: '/raid_info/custom',
							displayText: 'Upload own',
							prefetch: true,
						},
					],
				},
			},
		};
	});
</script>

<Nav />

<main class="pt-20">
	<slot />
</main>
