<script lang="ts">
	import type { RaidInfoDataEnhanced, RaidSeedDataPrepared } from '../types';
	import NumberInput from './NumberInput.svelte';
	import RaidInfoDisplay from './RaidInfoDisplay/RaidInfoDisplay.svelte';

	export let seedISODate: string;
	export let seed: RaidSeedDataPrepared;

	let tier = 1;
	let level = 1;

	let raidInfo: RaidInfoDataEnhanced = seed.data_by_tier_level[tier][level];

	const inputOptionsTierLevel: { [key: string]: { min: number; max: number } } = {};

	Object.keys(seed.data_by_tier_level).forEach((tr) => {
		inputOptionsTierLevel[tr] = {
			min: Math.min(...Object.keys(seed.data_by_tier_level[tr]).map((val) => parseInt(val, 10))),
			max: Math.max(...Object.keys(seed.data_by_tier_level[tr]).map((val) => parseInt(val, 10)))
		};
	});

	const minTier = Math.min(...Object.keys(seed.data_by_tier_level).map((val) => parseInt(val, 10)));
	const maxTier = Math.max(...Object.keys(seed.data_by_tier_level).map((val) => parseInt(val, 10)));

	function onTierChange(value: number) {
		tier = value;

		onLevelChange(1);
	}

	function onLevelChange(value: number) {
		level = value;

		raidInfo = seed.data_by_tier_level[tier][level];
	}
</script>

<div class="container">
	<p>
		<b>Seed {seedISODate} | </b>
		{#if new Date(seed.raid_info_valid_from) > new Date()}
			<b style="color: orange">Not yet active</b>
		{:else if new Date(seed.raid_info_expire_at) < new Date()}
			<b style="color: red">Not active anymore</b>
		{:else}
			<b style="color: green">Currently active</b>
		{/if}
	</p>
	<p>
		<b>Valid from:</b>
		{seed.raid_info_valid_from.split('T').join(' ')}
		(<a href="https://time.is/GMT+2" target="_blank">GMT+2</a>)
	</p>
	<p>
		<b>Expires at:</b>
		{seed.raid_info_expire_at.split('T').join(' ')}
		(<a href="https://time.is/GMT+2" target="_blank">GMT+2</a>)
	</p>

	<div class="input-group">
		<div class="input-container">
			<label for="tier">Enter tier ({minTier} - {maxTier})</label>
			<NumberInput
				elementName="tier"
				min={minTier}
				max={maxTier}
				value={tier}
				onChange={onTierChange}
			/>
		</div>

		<div class="input-container">
			<label for="level"
				>Enter level ({inputOptionsTierLevel[tier].min} - {inputOptionsTierLevel[tier].max})</label
			>

			<NumberInput
				elementName="level"
				min={inputOptionsTierLevel[tier].min}
				max={inputOptionsTierLevel[tier].max}
				value={level}
				onChange={onLevelChange}
			/>
		</div>
	</div>

	<hr />

	{#if raidInfo}
		<RaidInfoDisplay {raidInfo} />
	{/if}
</div>

<style>
	.input-group {
		display: flex;
		justify-content: space-evenly;

		width: 50%;

		padding: 0 25%;
	}

	.input-container {
		display: flex;
		flex-direction: column;

		text-align: center;
	}
</style>
