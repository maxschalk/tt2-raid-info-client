<script lang="ts" context="module">
	import type { ExternalFetch } from '@sveltejs/kit';

	import { BASE_URLS } from '../../constants';
	import { getStageFromEnv } from '../../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS[STAGE];

	export async function load({
		fetch,
		params
	}: {
		fetch: ExternalFetch;
		params: { seedName: string };
	}) {
		const { seedName } = params;

		const filename = `raid_seed_${seedName.replaceAll('-', '')}.json`;

		const reqUrl = new URL(`${BASE_URL}/admin/seed_file/raw/${filename}`);

		const req = new Request(reqUrl);

		const res = await fetch(req);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Could not fetch seed from ${reqUrl}`)
			};
		}

		const seed: RaidSeedData = await res.json();

		return {
			props: {
				seedName,
				filename,
				seed
			}
		};
	}
</script>

<script lang="ts">
	import type { RaidSeedData } from 'src/types';

	export let seedName = '';
	export let filename = '';
	export let seed: RaidSeedData = [];
</script>

{#if seed}
	<div class="container">
		<h3>
			{seedName} | {filename}
		</h3>
		<p>{seed[0].raid_info_valid_from}</p>
	</div>
{/if}
