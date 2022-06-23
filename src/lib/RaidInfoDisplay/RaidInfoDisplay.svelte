<script lang="ts">
	import type { EnhancedTitan, RaidInfoDataEnhanced, Titan } from 'src/types';
	import TitanDisplay from './TitanDisplay.svelte';
	import TitanSelectionButton from './TitanSelectionButton.svelte';

	type NameToTitanMap = { [key: string]: EnhancedTitan };

	export let raidInfo: RaidInfoDataEnhanced;

	let spawnSequence: string[];
	$: spawnSequence = raidInfo.spawn_sequence;

	let selectedTitan: string;
	$: selectedTitan = spawnSequence[0];

	let enemyInfoByTitan: { [key: string]: EnhancedTitan };
	$: enemyInfoByTitan = raidInfo.titans.reduce((acc, next) => {
		acc[next.enemy_name] = next;
		return acc;
	}, <NameToTitanMap>{});
</script>

<p><b>Raid Info {`${raidInfo.tier}-${raidInfo.level}`}</b></p>
<div>
	<b>Spawn Sequence:</b>

	{#each spawnSequence as titan, index}
		<TitanSelectionButton
			active={titan === selectedTitan}
			titan={`${index + 1}. ${titan}`}
			onClick={() => (selectedTitan = titan)}
		/>
	{/each}

	<TitanDisplay titanInfo={enemyInfoByTitan[selectedTitan]} />
</div>
