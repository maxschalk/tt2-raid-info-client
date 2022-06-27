<script lang="ts">
	import { tick } from 'svelte';

	import type { Buff, EnhancedTitan } from 'src/types';
	import { formatBuff, formatPartID, scrollIntoView } from '../../utils';
	import TitanHPTableAggregated from './TitanHPTableAggregated.svelte';
	import TitanHpTableDetailed from './TitanHPTableDetailed.svelte';

	export let titanInfo: EnhancedTitan;
	export let count: number;

	let cursedDebuffs: Buff[];
	$: cursedDebuffs = titanInfo.cursed_debuffs ?? [];

	let tableDataIsAggregated = true;
	let tableViewIsSpaced = true;
	let tableViewHasColors = true;
	let tableViewHighlightSkippable = false;

	async function toggleSetTableDataAggregated(newValue: boolean | undefined = undefined) {
		if (newValue === undefined) {
			tableDataIsAggregated = !tableDataIsAggregated;
		} else {
			tableDataIsAggregated = newValue;
		}

		await tick();

		scrollIntoView('#titan-data');
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

	<div class="flex justify-between items-center w-full ">
		<label class="swap btn">
			<input
				type="checkbox"
				checked={tableDataIsAggregated}
				on:click={() => toggleSetTableDataAggregated()}
			/>
			<div class="swap-off">Show aggregated parts</div>
			<div class="swap-on">Show detailed parts</div>
		</label>
	</div>

	<div class="flex justify-between space-x-2 px-3 py-1 0">
		<div class="form-control">
			<label class="label cursor-pointer space-x-2">
				<input type="checkbox" bind:checked={tableViewIsSpaced} class="checkbox" />
				<span class="label-text text-lg">Space out columns</span>
			</label>
		</div>
		<div class="divider divider-horizontal" />

		<div class="form-control">
			<label class="label cursor-pointer space-x-2">
				<input type="checkbox" bind:checked={tableViewHasColors} class="checkbox" />
				<span class="label-text text-lg">Table colors</span>
			</label>
		</div>

		<div class="divider divider-horizontal" />

		<div class="flex justify-evenly space-x-4 px-3 py-1 0">
			<div class="form-control">
				<label class="label cursor-pointer space-x-2">
					<input type="checkbox" bind:checked={tableViewHighlightSkippable} class="checkbox" />
					<span class="label-text text-lg">Highlight skippable parts</span>
				</label>
			</div>
		</div>
	</div>

	<div id="titan-data">
		<svelte:component
			this={tableDataIsAggregated ? TitanHPTableAggregated : TitanHpTableDetailed}
			{titanInfo}
			{tableViewIsSpaced}
			{tableViewHasColors}
			{tableViewHighlightSkippable}
		/>
	</div>
</div>
