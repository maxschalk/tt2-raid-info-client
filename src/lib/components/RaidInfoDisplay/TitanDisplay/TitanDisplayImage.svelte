<script lang="ts">
    import lemmy from '$lib/assets/lemmy/lemmy.png';
    import { getCurseImages, getHighlightSkippableImages } from '../../../../utils';

    import type { EnhancedTitan } from '../../../../types';

    export let titanInfo: EnhancedTitan;

    let show = false;

    $: parts = titanInfo.consolidated_parts;

    $: curseImages = getCurseImages(parts);
    $: highlightSkippableImages = getHighlightSkippableImages(titanInfo);

    $: skippablePartsCount = parts.filter((p) => p.body_hp <= titanInfo.skippable_hp).length;
</script>

<div class="w-full flex flex-col justify-center">
    <label class="swap btn">
        <input type="checkbox" bind:checked={show} />
        <div class="swap-off">Show titan visualization</div>
        <div class="swap-on">Hide titan visualization</div>
    </label>

    {#if show}
        <div class="w-full grid grid-cols-2 my-8">
            {#if titanInfo.cursed_parts.length > 0}
                <div class="w-full">
                    <h2 class="w-full text-xl mb-8 text-center font-bold text-error">
                        Cursed Parts ({titanInfo.cursed_parts.length})
                    </h2>
                    <div class="w-full flex justify-center relative">
                        <img src={lemmy} alt="Dummy Titan Visualization" class="h-80" />

                        {#each curseImages as image}
                            <img src={image} alt="" class="h-80 absolute" />
                        {/each}
                    </div>
                </div>
            {/if}

            <div class="w-full">
                <h2 class="w-full text-xl mb-8 text-center font-bold text-warning">
                    Skippable Parts ({skippablePartsCount})
                </h2>
                <div class="w-full flex justify-center relative">
                    <img src={lemmy} alt="Dummy Titan Visualization" class="h-80" />

                    {#each highlightSkippableImages as image}
                        <img src={image} alt="" class="h-80 absolute" />
                    {/each}
                </div>
            </div>
        </div>
    {/if}

    <span id="titan-visual-end" />
</div>
