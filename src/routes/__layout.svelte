<script lang="ts" context="module">
	import type { ExternalFetch } from '@sveltejs/kit';

	import { BASE_URLS_API } from '../constants';
	import { getStageFromEnv, ISODateStringFromFilename } from '../utils';

	import { seedFilenames, type NavbarLink } from '../stores';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS_API[STAGE];

	export async function load({ fetch }: { fetch: ExternalFetch }) {
		const reqUrl = new URL(`${BASE_URL}/admin/all_seed_filenames/raw?sort_order=desc`);
		const req = new Request(reqUrl);

		let res;
		try {
			res = await fetch(req);
		} catch (e) {
			return {
				error: new Error(`Something went wrong getting data from ${reqUrl}:\n${e}`),
			};
		}

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not fetch seeds from ${reqUrl}:\n${res}`),
			};
		}

		if (
			res.headers.get('content-type') !== null &&
			res.headers.get('content-type')?.includes('text/html')
		) {
			seedFilenames.set([]);

			return {
				error: new Error(`Request at ${reqUrl} returned HTML:\n${await res.text()}`),
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

	export let error: Error;
	export let errorHTML: string;

	import Nav from '$lib/Nav.svelte';

	import { navbar, type NavbarProps } from '../stores';

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
