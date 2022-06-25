<script lang="ts">
	import type { Buff, EnhancedTitan } from 'src/types';
	import { formatBuff } from '../../utils';

	export let titanInfo: EnhancedTitan;
	export let count: number;

	let cursedDebuffs: Buff[];
	$: cursedDebuffs = titanInfo.cursed_debuffs ?? [];
</script>

<p><b>{titanInfo.enemy_name}</b> (x{count})</p>

{#if titanInfo.area_debuffs?.length}
	<p>
		<b>Area Debuff:</b>
		{titanInfo.area_debuffs.map((b) => formatBuff(b, titanInfo.area_debuffs?.length)).join(' | ')}
	</p>
{/if}

{#if cursedDebuffs.length}
	<p>
		<b class="cursed">Curse Debuff:</b>
		{cursedDebuffs.map((b) => formatBuff(b, titanInfo.cursed_parts.length)).join(' | ')}
	</p>
{/if}

<p>
	<b>Target HP:</b>
	{titanInfo.total_hp_formatted}
</p>

<!-- {#if titanInfo.total_armor_hp > 0}
	<p>
		Armor HP:
		{titanInfo.total_armor_hp_formatted}
	</p>
{/if}

<p>
	Body HP:
	{titanInfo.total_body_hp_formatted}
</p> -->

<p>
	Skippable HP:
	{titanInfo.skippable_hp_formatted}
</p>

<table
	style={`--num-columns: ${
		4 - +(titanInfo.total_armor_hp === 0) - +(titanInfo.number_of_cursed_parts === 0)
	};`}
>
	<thead>
		<tr>
			<th>Part</th>

			{#if titanInfo.total_armor_hp > 0}
				<th>Armor HP</th>
			{/if}

			<th>Body HP</th>

			{#if titanInfo.number_of_cursed_parts > 0}
				<th>Cursed Armor</th>
			{/if}
		</tr>
	</thead>

	<tbody>
		{#each titanInfo.consolidated_parts as part}
			<tr>
				<td>{part.part_id}</td>

				{#if titanInfo.total_armor_hp > 0}
					<td>{part.armor_hp_formatted}</td>
				{/if}

				<td>{part.body_hp_formatted}</td>

				{#if titanInfo.number_of_cursed_parts > 0}
					<td class="cursed">{part.armor_cursed ? 'cursed' : ''}</td>
				{/if}
			</tr>
		{/each}
	</tbody>

	<tfoot>
		<tr>
			<td>Sum</td>

			{#if titanInfo.total_armor_hp > 0}
				<td>{titanInfo.total_armor_hp_formatted}</td>
			{/if}

			<td>{titanInfo.total_body_hp_formatted}</td>

			{#if titanInfo.number_of_cursed_parts > 0}
				<td />
			{/if}
		</tr>
	</tfoot>
</table>
