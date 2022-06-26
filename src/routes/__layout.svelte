<script lang="ts" context="module">
	import type { ExternalFetch } from '@sveltejs/kit';

	import { BASE_URLS_API } from '../constants';
	import { getStageFromEnv, ISODateStringFromFilename } from '../utils';

	import { seedFilenames } from '../stores';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS_API[STAGE];

	export async function load({ fetch }: { fetch: ExternalFetch }) {
		const reqUrl = new URL(`${BASE_URL}/admin/all_seed_filenames/raw?sort_order=desc`);
		const req = new Request(reqUrl);

		const res = await fetch(req);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not fetch seeds from ${reqUrl}`)
			};
		}

		const data: string[] = await res.json();

		seedFilenames.set(data);

		return {};
	}
</script>

<script lang="ts">
	import '../app.css';
	import '../global.css';

	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	onMount(() => {
		themeChange(false);
	});

	import Nav from '$lib/Nav.svelte';

	import { navbar, type NavbarProps } from '../stores';

	navbar.update((old: NavbarProps) => {
		return {
			...old,
			links: {
				...old.links,
				raidInfo: {
					...old.links.raidInfo,
					children: $seedFilenames.map(ISODateStringFromFilename).map((isoDateString) => ({
						href: `/raid_info/${isoDateString}`,
						displayText: isoDateString,
						prefetch: true
					}))
				}
			}
		};
	});
</script>

<Nav />

<main>
	<slot />
</main>
