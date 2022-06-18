<script lang="ts" context="module">
	import type { ExternalFetch } from '@sveltejs/kit';

	import { BASE_URLS } from '../../../constants';
	import { filenameFromISODateString, getStageFromEnv, prepareRaidSeed } from '../../../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS[STAGE];

	export async function load({
		fetch,
		params,
		url
	}: {
		fetch: ExternalFetch;
		params: { seedISODate: string };
		url: URL;
	}) {
		const currentPath = url.href;

		const { seedISODate } = params;

		const { filename } = filenameFromISODateString(seedISODate);

		const reqUrl = new URL(`${BASE_URL}/admin/seed_file/raw/${filename}`);

		const req = new Request(reqUrl);

		const res = await fetch(req);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not fetch seed from ${reqUrl}`)
			};
		}

		const seed_raw: RaidSeedData = await res.json();

		const seed_prepared: RaidSeedDataPrepared = prepareRaidSeed(seed_raw);

		return {
			props: {
				currentPath,
				seedISODate,
				// filename,
				// seed_raw,
				seed_prepared
			}
		};
	}
</script>

<script lang="ts">
	import type { RaidSeedData, RaidSeedDataPrepared } from 'src/types';

	import RaidSeedDisplay from '$lib/RaidSeedDisplay.svelte';

	export let currentPath: string;

	export let seedISODate = '';
	// export let filename = '';
	// export let seed_raw: RaidSeedData = [];
	export let seed_prepared: RaidSeedDataPrepared;

	const url_download_raw = ``;
</script>

{#if seed_prepared}
	<RaidSeedDisplay seed={seed_prepared} />
{:else}
	LOADING
{/if}

{#if seedISODate}
	<a href={`${currentPath}/download/raw`}>Download Raw Seed Data</a>
	<a href={`${currentPath}/download/enhanced`}>Download Enhanced Seed Data</a>
{/if}
