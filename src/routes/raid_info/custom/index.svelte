<script lang="ts">
	import type { RaidSeedDataPrepared } from 'src/types';

	import RaidSeedDisplay from '$lib/RaidSeedDisplay.svelte';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const seedData = <SvelteStore<RaidSeedDataPrepared | {}>>getContext('seedData');
	const error = <SvelteStore<string>>getContext('error');

	function seedDataExists(sd: RaidSeedDataPrepared | {}): sd is RaidSeedDataPrepared {
		if (Object.keys(sd).length <= 0) {
			return false;
		}

		return true;
	}
</script>

{#if error}
	<h2 class="text-xl text-error whitespace-pre-line">{$error}</h2>
{/if}

{#if seedDataExists($seedData)}
	<RaidSeedDisplay
		seed={$seedData}
		seedIdentifier="Custom"
		canDownloadRaw={false}
		canDownloadEnhanced={false}
	/>
{/if}
