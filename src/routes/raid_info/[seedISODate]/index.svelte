<script lang="ts" context="module">
    import type { ExternalFetch } from '@sveltejs/kit';
    import type { RaidSeedDataEnhanced, RaidSeedDataPrepared } from '../../../types';

    import { getSeedByIdentifier } from '../../../apiInterface';
    import { prepareRaidSeed } from '../../../utils';

    export async function load({
        fetch,
        params,
    }: {
        fetch: ExternalFetch;
        params: { seedISODate: string };
    }) {
        const { seedISODate } = params;

        const fetchSeedPrepared = (async () => {
            const seedEnhanced = <RaidSeedDataEnhanced>(
                await getSeedByIdentifier(seedISODate, fetch)
            );
            return prepareRaidSeed(seedEnhanced);
        })();

        return {
            props: {
                seedISODate,
                fetchSeedPrepared,
            },
        };
    }
</script>

<script lang="ts">
    import { page } from '$app/stores';
    import { navbar, type NavbarLink } from '../../../stores';

    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import RaidSeedDisplay from '$lib/components/RaidSeedDisplay.svelte';

    import ArrowLeft from 'svelte-material-icons/ArrowLeftBoldCircleOutline.svelte';
    import ArrowRight from 'svelte-material-icons/ArrowRightBoldCircleOutline.svelte';

    export let seedISODate: string;
    export let fetchSeedPrepared: Promise<RaidSeedDataPrepared>;

    let raidSeedLinks: NavbarLink[] = $navbar.links.raidInfo?.children ?? [];

    $: prevLink =
        raidSeedLinks[raidSeedLinks.findIndex((lnk) => $page.url.href.endsWith(lnk.href)) + 1];

    $: nextLink =
        raidSeedLinks[raidSeedLinks.findIndex((lnk) => $page.url.href.endsWith(lnk.href)) - 1];
</script>

<div class="container max-w-4xl flex flex-col items-center">
    <div class="btn-group max-w-2xl grid grid-cols-3">
        <a
            class="btn btn-secondary font-bold shadow gap-2"
            href={prevLink?.href}
            class:btn-disabled={prevLink === undefined}
        >
            <ArrowLeft width="28" height="28" />
            {prevLink?.displayText ?? ''}
        </a>

        <button
            href={$page.url.href}
            class="btn btn-disabled bg-transparent text-base-content font-bold"
        >
            {seedISODate}
        </button>

        <a
            class="btn btn-primary font-bold shadow gap-2"
            href={nextLink?.href}
            class:btn-disabled={nextLink === undefined}
        >
            {nextLink?.displayText ?? ''}
            <ArrowRight width="28" height="28" />
        </a>
    </div>

    <div class="divider" />

    {#await fetchSeedPrepared}
        <div class="max-w-xs flex-col items-center mt-8">
            <LoadingSpinner />
        </div>
    {:then data}
        <RaidSeedDisplay seed={data} seedIdentifier={seedISODate ?? 'error'} />
    {:catch error}
        <p>Something went wrong when getting seed data</p>
    {/await}
</div>
