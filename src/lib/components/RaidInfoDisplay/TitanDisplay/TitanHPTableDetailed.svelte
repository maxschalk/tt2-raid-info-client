<script lang="ts">
	import { TITAN_PART_REPRS, BASE_TITAN_PART_IDS, type EnhancedTitan } from '../../../../types';
	import { getEnumKeyByEnumValue } from '../../../../utils';

	export let titanInfo: EnhancedTitan;

	export let tableViewIsSpaced = true;
	export let tableViewHasColors = true;
	export let tableViewHighlightSkippable = false;

	$: colorPartSkippable = (hp: number) => {
		return tableViewHighlightSkippable && tableViewHasColors && hp <= titanInfo.skippable_hp;
	};
</script>

<table class="table table-compact text-right" class:w-full={tableViewIsSpaced}>
	<thead>
		<tr>
			<th class="text-lg text-left">Part</th>

			{#if titanInfo.total_armor_hp > 0}
				<th class="text-lg" class:text-info={tableViewHasColors}>Armor HP</th>
			{/if}

			<th class="text-lg" class:text-success={tableViewHasColors}>Body HP</th>

			{#if titanInfo.number_of_cursed_parts > 0}
				<th class="text-lg text-center" class:text-error={tableViewHasColors}>
					Cursed Armor
				</th>
			{/if}
		</tr>
	</thead>

	<tbody>
		{#each titanInfo.consolidated_parts as part}
			<tr>
				<td
					class="text-left"
					class:bg-warning={colorPartSkippable(part.body_hp)}
					class:text-warning-content={colorPartSkippable(part.body_hp)}
				>
					{TITAN_PART_REPRS[getEnumKeyByEnumValue(BASE_TITAN_PART_IDS, part.part_id)]}
				</td>

				{#if titanInfo.total_armor_hp > 0}
					<td class:text-info={tableViewHasColors}>{part.armor_hp_formatted}</td>
				{/if}

				<td class:text-success={tableViewHasColors}>{part.body_hp_formatted}</td>

				{#if titanInfo.number_of_cursed_parts > 0}
					<td class="cursed text-center" class:text-error={tableViewHasColors}>
						{part.armor_cursed ? 'cursed' : ''}
					</td>
				{/if}
			</tr>
		{/each}
	</tbody>

	<tfoot>
		<tr>
			<td class="text-lg text-left">Sum</td>

			{#if titanInfo.total_armor_hp > 0}
				<td class="text-lg" class:text-info={tableViewHasColors}>
					{titanInfo.total_armor_hp_formatted}
				</td>
			{/if}

			<td class="text-lg" class:text-success={tableViewHasColors}>
				{titanInfo.total_body_hp_formatted}
			</td>

			{#if titanInfo.number_of_cursed_parts > 0}
				<td class="text-lg text-center" class:text-error={tableViewHasColors}>
					{titanInfo.number_of_cursed_parts}
				</td>
			{/if}
		</tr>
	</tfoot>
</table>
