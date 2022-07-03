<script lang="ts">
  import { page } from '$app/stores';

  import type { RaidSeedDataPrepared } from '../../types';
  import NumberInput from './NumberInput.svelte';
  import RaidInfoDisplay from './RaidInfoDisplay/RaidInfoDisplay.svelte';

  import CloudDownloadOutline from 'svelte-material-icons/CloudDownloadOutline.svelte';
  import CloudDownload from 'svelte-material-icons/CloudDownload.svelte';

  export let seedIdentifier: string;
  export let seed: RaidSeedDataPrepared;
  export let canDownloadRaw = true;
  export let canDownloadEnhanced = true;

  let tier = 1;
  let level = 1;

  $: raidInfo = seed.data_by_tier_level[tier][level];

  const inputOptionsTierLevel: { [key: string]: { min: number; max: number } } = {};

  Object.keys(seed.data_by_tier_level).forEach((tr) => {
    inputOptionsTierLevel[tr] = {
      min: Math.min(...Object.keys(seed.data_by_tier_level[tr]).map((val) => parseInt(val, 10))),
      max: Math.max(...Object.keys(seed.data_by_tier_level[tr]).map((val) => parseInt(val, 10))),
    };
  });

  const minTier = Math.min(...Object.keys(seed.data_by_tier_level).map((val) => parseInt(val, 10)));
  const maxTier = Math.max(...Object.keys(seed.data_by_tier_level).map((val) => parseInt(val, 10)));

  let minLevel = inputOptionsTierLevel[tier].min;

  let maxLevel = inputOptionsTierLevel[tier].max;

  function onTierChange(value: number) {
    tier = value;

    minLevel = inputOptionsTierLevel[tier].min;
    maxLevel = inputOptionsTierLevel[tier].max;

    onLevelChange(level);
  }

  function onLevelChange(value: number) {
    level = value;

    if (value < minLevel) {
      level = minLevel;
    } else if (value > maxLevel) {
      level = maxLevel;
    }

    raidInfo = seed.data_by_tier_level[tier][level];
  }
</script>

<div class="w-full flex flex-col items-center">
  <div class="grid grid-cols-2 gap-3 items-center justify-items-center">
    <p class="font-bold">Seed {seedIdentifier}</p>

    <p class="font-bold">
      {#if new Date(seed.raid_info_valid_from) > new Date()}
        <span class="text-warning">Not yet active</span>
      {:else if new Date(seed.raid_info_expire_at) < new Date()}
        <span class="text-error">Not active anymore</span>
      {:else}
        <span class="text-success">Currently active</span>
      {/if}
    </p>

    <b>Valid from:</b>
    <p>
      {seed.raid_info_valid_from.split('T').join(' ')}
      (
      <a href="https://time.is/GMT+2" target="_blank" class="link"> GMT+2 </a>
      )
    </p>
    <b>Expires at:</b>
    <p>
      {seed.raid_info_expire_at.split('T').join(' ')}
      (
      <a href="https://time.is/GMT+2" target="_blank" class="link"> GMT+2 </a>
      )
    </p>

    <div class="btn-group col-span-2 grid grid-cols-2 grid-gap-4">
      <a
        href={`${$page.url.href}/download/raw`}
        class="btn btn-ghost font-bold shadow gap-2"
        class:btn-disabled={!canDownloadRaw}
      >
        <CloudDownloadOutline width="20" height="20" />
        Download Raw Seed
      </a>

      <a
        href={`${$page.url.href}/download/enhanced`}
        class="btn btn-neutral font-bold shadow gap-2"
        class:btn-disabled={!canDownloadEnhanced}
      >
        Download Enhanced Seed
        <CloudDownload width="20" height="20" />
      </a>
    </div>
  </div>

  <div class="divider" />

  <div class="grid grid-cols-2 gap-3 items-center justify-items-center">
    <div class="col-span-2 input-group grid grid-cols-2">
      <NumberInput
        elementName="tier"
        min={minTier}
        max={maxTier}
        value={tier}
        onChange={onTierChange}
        classes={['input', 'input-bordered', 'text-xl', 'w-full']}
      />
      <span class="font-bold">Tier [{minTier} - {maxTier}]</span>
    </div>

    <div class="col-span-2 input-group grid grid-cols-2">
      <NumberInput
        elementName="level"
        min={minLevel}
        max={maxLevel}
        value={level}
        onChange={onLevelChange}
        classes={['input', 'input-bordered', 'text-xl', 'w-full']}
      />
      <span class="font-bold">Level [{minLevel} - {maxLevel}]</span>
    </div>
  </div>

  <div class="divider" />

  {#if raidInfo}
    <RaidInfoDisplay {raidInfo} />
  {/if}
</div>
