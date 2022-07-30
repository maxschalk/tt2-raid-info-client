<script lang="ts" context="module">
    import type { ExternalFetch } from '@sveltejs/kit';
    import { SortOrder } from '../types';

    import { listSeedIdentifiers } from '../apiInterface';
    import { seedIdentifiers, type NavbarLink } from '../stores';

    export async function load({ fetch }: { fetch: ExternalFetch }) {
        try {
            const data = await listSeedIdentifiers(SortOrder.DESCENDING, fetch);
            seedIdentifiers.set(<string[]>data);
        } catch (e) {
            seedIdentifiers.set([]);
        }

        return {};
    }
</script>

<script lang="ts">
    import '../app.css';
    import '../global.css';

    import { onMount } from 'svelte';
    import { themeChange } from 'theme-change';

    import Nav from '$lib/components/Nav.svelte';

    import { navbar, type NavbarProps } from '../stores';
    import { ISODateStringFromSeedIdentifier } from '../utils';

    onMount(() => {
        themeChange(false);
    });

    navbar.update((old: NavbarProps) => {
        return {
            ...old,
            links: {
                ...old.links,
                raidInfo: {
                    ...old.links.raidInfo,
                    children: [
                        ...(<NavbarLink[]>(
                            $seedIdentifiers
                                .map(ISODateStringFromSeedIdentifier)
                                .map((isoDateString) => ({
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
