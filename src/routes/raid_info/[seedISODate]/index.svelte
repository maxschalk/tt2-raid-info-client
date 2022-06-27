<script lang="ts" context="module">
	import type { ExternalFetch } from '@sveltejs/kit';
	import type { RaidSeedDataEnhanced, RaidSeedDataPrepared } from 'src/types';

	import { BASE_URLS_API } from '../../../constants';
	import { filenameFromISODateString, getStageFromEnv, prepareRaidSeed } from '../../../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS_API[STAGE];

	export async function load({
		fetch,
		params,
		url,
	}: {
		fetch: ExternalFetch;
		params: { seedISODate: string };
		url: URL;
	}) {
		const { seedISODate } = params;

		const { filename } = filenameFromISODateString(seedISODate);

		const reqUrl = new URL(`${BASE_URL}/admin/seed_file/enhanced/${filename}`);

		const req = new Request(reqUrl);

		const res = await fetch(req);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not fetch seed from ${reqUrl}`),
			};
		}

		const seed_raw: RaidSeedDataEnhanced = await res.json();

		const seed_prepared: RaidSeedDataPrepared = prepareRaidSeed(seed_raw);

		return {
			props: {
				seedISODate,
				seed_prepared,
			},
		};
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { navbar, type NavbarLink } from '../../../stores';

	import RaidSeedDisplay from '$lib/RaidSeedDisplay.svelte';

	import ArrowLeftBoldCircle from 'svelte-material-icons/ArrowLeftBoldCircle.svelte';
	import ArrowRightBoldCircle from 'svelte-material-icons/ArrowRightBoldCircle.svelte';
	import { onDestroy } from 'svelte';

	export let seedISODate: string;
	export let seed_prepared: RaidSeedDataPrepared;

	let raidSeedLinks: NavbarLink[];
	const unsubscribe = navbar.subscribe(
		(nb) => (raidSeedLinks = nb.links.raidInfo?.children ?? [])
	);

	let prevLink: NavbarLink | undefined;
	$: prevLink =
		raidSeedLinks[raidSeedLinks.findIndex((lnk) => lnk.displayText === seedISODate) + 1];

	let nextLink: NavbarLink | undefined;
	$: nextLink =
		raidSeedLinks[raidSeedLinks.findIndex((lnk) => lnk.displayText === seedISODate) - 1];

	onDestroy(unsubscribe);
</script>

<div class="container max-w-4xl flex flex-col items-center">
	<div class="btn-group max-w-2xl grid grid-cols-3">
		<a
			class="btn btn-secondary font-bold shadow gap-2"
			href={prevLink?.href}
			class:btn-disabled={prevLink === undefined}
		>
			<ArrowLeftBoldCircle width="30" height="30" />
			{prevLink?.displayText ?? ''}
		</a>

		<button href={$page.url.href} class="btn btn-disabled bg-transparent text-base-content">
			{seedISODate}
		</button>

		<a
			class="btn btn-primary font-bold shadow gap-2"
			href={nextLink?.href}
			class:btn-disabled={nextLink === undefined}
		>
			{nextLink?.displayText ?? ''}
			<ArrowRightBoldCircle width="30" height="30" />
		</a>
	</div>

	<div class="divider" />

	<RaidSeedDisplay seed={seed_prepared} {seedISODate} />
</div>
