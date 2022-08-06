<script lang="ts">
    import { getContext } from 'svelte';

    import type { RaidSeedDataPrepared } from 'src/types';

    import RaidSeedDisplay from '$lib/components/RaidSeedDisplay.svelte';

    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

    const loading = <SvelteStore<boolean>>getContext('loading');
    const seedData = <SvelteStore<RaidSeedDataPrepared | Record<string, never>>>(
        getContext('seedData')
    );
    const error = <SvelteStore<string>>getContext('error');

    function seedDataExists(
        sd: RaidSeedDataPrepared | Record<string, never>
    ): sd is RaidSeedDataPrepared {
        if (Object.keys(sd).length <= 0) {
            return false;
        }

        return true;
    }
</script>

{#if $error}
    <h2 class="text-xl text-error whitespace-pre-line">{$error}</h2>
{:else if seedDataExists($seedData)}
    <RaidSeedDisplay
        seed={$seedData}
        seedIdentifier="Custom"
        canDownloadRaw={false}
        canDownloadEnhanced={false}
    />
{:else if $loading}
    <div class="max-w-xs flex-col items-center mt-8">
        <LoadingSpinner size={20} />
    </div>
{/if}
