<script lang="ts" context="module">
	import type { ExternalFetch } from '@sveltejs/kit';

	import { BASE_URLS } from '../constants';
	import { getStageFromEnv, ISODateStringFromFilename } from '../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS[STAGE];

	export async function load({ fetch }: { fetch: ExternalFetch }) {
		const reqUrl = new URL(`${BASE_URL}/admin/all_seed_filenames/raw`);
		const req = new Request(reqUrl);

		const res = await fetch(req);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not fetch seeds from ${reqUrl}`)
			};
		}

		const seedFilenames: string[] = await res.json();

		return {
			props: {
				seedFilenames
			}
		};
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

	export let seedFilenames: string[] = [];

	navbar.update((old: NavbarProps) => {
		return {
			...old,
			links: {
				...old.links,
				raidInfo: {
					...old.links.raidInfo,
					children: seedFilenames.map(ISODateStringFromFilename).map((isoDateString) => ({
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
	<div class="main-app">
		<slot />
	</div>
</main>
