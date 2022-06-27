<script lang="ts">
	import { TITAN_PART_REPRS, BASE_TITAN_PART_IDS, type EnhancedTitan } from '../../types';
	import { getEnumKeyByEnumValue } from '../../utils';

	export let titanInfo: EnhancedTitan;

	export let tableViewIsSpaced = true;
</script>

<table class="table table-compact text-right" class:w-full={tableViewIsSpaced}>
	<thead>
		<tr>
			<th class="text-lg text-left">Part</th>

			{#if titanInfo.total_armor_hp > 0}
				<th class="text-lg text-info">Armor HP</th>
			{/if}

			<th class="text-lg text-success">Body HP</th>

			{#if titanInfo.number_of_cursed_parts > 0}
				<th class="text-lg text-error text-center">Cursed Armor</th>
			{/if}
		</tr>
	</thead>

	<tbody>
		{#each titanInfo.consolidated_parts as part}
			<tr>
				<td class="text-left"
					>{TITAN_PART_REPRS[getEnumKeyByEnumValue(BASE_TITAN_PART_IDS, part.part_id)]}</td
				>

				{#if titanInfo.total_armor_hp > 0}
					<td class="text-info">{part.armor_hp_formatted}</td>
				{/if}

				<td class="text-success">{part.body_hp_formatted}</td>

				{#if titanInfo.number_of_cursed_parts > 0}
					<td class="cursed text-error text-center">{part.armor_cursed ? 'cursed' : ''}</td>
				{/if}
			</tr>
		{/each}
	</tbody>

	<tfoot>
		<tr>
			<td class="text-lg text-left">Sum</td>

			{#if titanInfo.total_armor_hp > 0}
				<td class="text-lg text-info">{titanInfo.total_armor_hp_formatted}</td>
			{/if}

			<td class="text-lg text-success">{titanInfo.total_body_hp_formatted}</td>

			{#if titanInfo.number_of_cursed_parts > 0}
				<td class="text-lg text-error text-center">{titanInfo.number_of_cursed_parts}</td>
			{/if}
		</tr>
	</tfoot>
</table>
