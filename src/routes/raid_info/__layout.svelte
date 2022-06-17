<script lang="ts" context="module">
	import type { ExternalFetch } from '@sveltejs/kit';

	import { BASE_URLS } from '../../constants';
	import { getStageFromEnv } from '../../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS[STAGE];

	export async function load({ fetch }: { fetch: ExternalFetch }) {
		const reqUrl = new URL(`${BASE_URL}/seeds/raw/all?sort_order=asc`);
		const req = new Request(reqUrl);

		const res = await fetch(req);

		const seeds: RaidSeedData[] = await res.json();

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not fetch seeds from ${reqUrl}`)
			};
		}

		const seeds_by_date: { [key: string]: RaidSeedData } = {};

		seeds.forEach(
			(seed) =>
				(seeds_by_date[new Date(seed[0].raid_info_valid_from).toISOString().substring(0, 10)] =
					seed)
		);

		return {
			props: {
				seeds
			}
		};
	}
</script>

<script lang="ts">
	import { navbar, type NavbarProps } from '../../stores';

	import type { RaidSeedData } from '../../types';

	export let seeds: RaidSeedData[] = [];

	navbar.update((old: NavbarProps) => ({
		...old,
		titleSub: 'Raid Seed Info',
		linksSub: seeds.map((seed) => ({
			href: `/raid_info/${seed[0].raid_info_valid_from.substring(0, 10)}`,
			displayText: seed[0].raid_info_valid_from.substring(0, 10),
			prefetch: true
		}))
	}));
</script>

<slot />
