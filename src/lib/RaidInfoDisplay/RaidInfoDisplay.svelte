<script lang="ts">
	import type { EnhancedTitan, RaidInfoDataEnhanced } from 'src/types';
	import { formatBuff } from '../../utils';
	import TitanDisplay from './TitanDisplay.svelte';
	import TitanSelectionButton from './TitanSelectionButton.svelte';

	type NameToTitanMap = { [key: string]: EnhancedTitan };

	export let raidInfo: RaidInfoDataEnhanced;

	$: spawnSequence = raidInfo.spawn_sequence;

	$: selectedTitan = spawnSequence[0];

	$: enemyInfoByTitan = raidInfo.titans.reduce((acc, next) => {
		acc[next.enemy_name] = next;
		return acc;
	}, <NameToTitanMap>{});
</script>

<div class="w-full space-y-2">
	<h2 class="text-2xl font-bold">Raid Info {`${raidInfo.tier}-${raidInfo.level}`}</h2>

	{#if raidInfo.area_buffs?.length}
		<p>
			<b>Area buffs:</b>
			{raidInfo.area_buffs.map(formatBuff).join(' | ')}
		</p>
	{/if}

	<p>
		<b>Total Target HP:</b>
		{raidInfo.raid_total_target_hp_formatted}
	</p>
</div>

<div class="divider" />

<div class="w-full space-y-4">
	<h2 class="text-2xl font-bold">Spawn Sequence</h2>

	<div class="w-full flex btn-group">
		{#each spawnSequence as titan, index}
			<TitanSelectionButton
				active={titan === selectedTitan}
				displayText={`${index + 1}. ${titan}`}
				onClick={() => (selectedTitan = titan)}
			/>
		{/each}
	</div>
</div>

<div class="divider" />

<TitanDisplay
	titanInfo={enemyInfoByTitan[selectedTitan]}
	count={spawnSequence.filter((t) => t === selectedTitan).length}
/>
