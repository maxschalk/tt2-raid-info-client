<script lang="ts">
  import { tick } from 'svelte';

  import type { EnhancedTitan } from '../../../../types';
  import { formatBuff, formatPartID, scrollIntoView } from '../../../../utils';
  import TitanDisplayTable from './TitanDisplayTable.svelte';
  import TitanDisplayImage from './TitanDisplayImage.svelte';

  export let titanInfo: EnhancedTitan;
  export let count: number;

  $: cursedDebuffs = titanInfo.cursed_debuffs ?? [];

  let tableDataIsAggregated = true;

  async function toggleSetTableDataAggregated(newValue: boolean | undefined = undefined) {
    if (newValue === undefined) {
      tableDataIsAggregated = !tableDataIsAggregated;
    } else {
      tableDataIsAggregated = newValue;
    }

    await tick();

    scrollIntoView('#titan-data-end');
  }
</script>

<div class="w-full space-y-4">
  <div class="w-full space-y-2">
    <h2 class="text-2xl font-bold">{titanInfo.enemy_name} (x{count})</h2>
    {#if titanInfo.area_debuffs?.length}
      <p>
        <b>Area Debuff:</b>
        {titanInfo.area_debuffs.map((b) => formatBuff(b)).join(' | ')}
      </p>
    {/if}
    {#if cursedDebuffs.length}
      <p>
        <b class="text-error">Curse Debuff:</b>
        {cursedDebuffs.map((b) => formatBuff(b, titanInfo.cursed_parts.length)).join(' | ')}
      </p>
    {/if}
    {#if titanInfo.cursed_parts.length > 0}
      <p class="link link-hover" on:click={() => toggleSetTableDataAggregated(false)}>
        <b class="text-error">{titanInfo.cursed_parts.length} cursed parts:</b>
        {titanInfo.cursed_parts.map((p) => formatPartID(p.part_id)).join(' | ')}
      </p>
    {/if}
  </div>

  <div class="divider" />

  <div class="w-full space-y-2">
    <p class="font-bold">
      <b>Target HP:</b>
      {titanInfo.total_hp_formatted}
    </p>

    {#if titanInfo.total_armor_hp > 0}
      <p class="text-info">
        <b>Armor HP:</b>
        {titanInfo.total_armor_hp_formatted}
      </p>
    {/if}

    <p class="text-success">
      <b>Body HP:</b>
      {titanInfo.total_body_hp_formatted}
    </p>

    <p class="text-warning">
      <b>Skippable HP:</b>
      {titanInfo.skippable_hp_formatted}
    </p>
  </div>

  <div class="divider" />

  <TitanDisplayImage {titanInfo} />

  <div class="divider" />

  <TitanDisplayTable {titanInfo} {tableDataIsAggregated} {toggleSetTableDataAggregated} />
</div>
