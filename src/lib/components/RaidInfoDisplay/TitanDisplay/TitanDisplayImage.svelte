<script lang="ts">
  import { tick } from 'svelte';
  import lemmy from '$lib/assets/lemmy/lemmy.png';
  import { getCurseImages, getHighlightSkippableImages, scrollIntoView } from '../../../../utils';

  import type { EnhancedTitan } from '../../../../types';

  export let titanInfo: EnhancedTitan;

  let show = false;
  let showHighlightSkippable = false;
  let showCurses = true;

  $: curseImages = getCurseImages(titanInfo.consolidated_parts);
  $: highlightSkippableImages = getHighlightSkippableImages(titanInfo);

  async function toggleShow() {
    show = !show;

    // if (show) {
    //   await tick();
    //   scrollIntoView('#titan-visual-end');
    // }
  }
</script>

<div class="w-full flex flex-col justify-center">
  <label class="swap btn">
    <input type="checkbox" checked={show} on:click={toggleShow} />
    <div class="swap-off">Show titan visualization</div>
    <div class="swap-on">Hide titan visualization</div>
  </label>

  {#if show}
    <div class="w-full flex justify-center relative m-8">
      <img src={lemmy} alt="Dummy Titan Visualization" class="h-80" />

      {#if showHighlightSkippable}
        {#each highlightSkippableImages as image, index}
          <img src={image} alt="" class="h-80 absolute" />
        {/each}
      {/if}

      {#if showCurses}
        {#each curseImages as image, index}
          <img src={image} alt="" class="h-80 absolute" />
        {/each}
      {/if}
    </div>

    <div
      class="menu menu-horizontal rounded-box bg-base-200 w-full flex justify-evenly items-center"
    >
      <div class="form-control">
        <label class="label cursor-pointer space-x-2">
          <input type="checkbox" bind:checked={showCurses} class="checkbox" />
          <span class="label-text text-lg">Show curses</span>
        </label>
      </div>

      <div class="divider divider-horizontal" />

      <div class="flex justify-evenly space-x-4 px-3 py-1 0">
        <div class="form-control">
          <label class="label cursor-pointer space-x-2">
            <input type="checkbox" bind:checked={showHighlightSkippable} class="checkbox" />
            <span class="label-text text-lg">Highlight skippable parts</span>
          </label>
        </div>
      </div>
    </div>
  {/if}

  <span id="titan-visual-end" />
</div>
