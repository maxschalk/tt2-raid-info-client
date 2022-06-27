<script lang="ts">
	import { formatHP } from '../../utils/formatHP';

	import {
		AGGREGATED_TO_BASE_PART_IDS,
		TITAN_PART_REPRS,
		type AccumulatedTitanPart,
		type EnhancedTitan,
	} from '../../types';

	export let titanInfo: EnhancedTitan;

	export let tableViewIsSpaced = true;
	export let tableViewHasColors = true;
	export let tableViewHighlightSkippable = false;

	const accumulatedParts: AccumulatedTitanPart[] = [];

	for (const [key, partIDs] of Object.entries(AGGREGATED_TO_BASE_PART_IDS)) {
		let armorHP = 0;
		let bodyHP = 0;

		for (const partID of partIDs) {
			const part = titanInfo.consolidated_parts.find((p) => p.part_id === partID);

			armorHP += part?.armor_hp ?? 0;
			bodyHP += part?.body_hp ?? 0;
		}

		accumulatedParts.push({
			part_id: TITAN_PART_REPRS[key] ?? key,

			armor_hp: armorHP,
			body_hp: bodyHP,

			armor_hp_formatted: formatHP(armorHP),
			body_hp_formatted: formatHP(bodyHP),
		});
	}

	let colorPartSkippable: (hp: number) => boolean;
	$: colorPartSkippable = (hp) => {
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
		</tr>
	</thead>

	<tbody>
		{#each accumulatedParts as part}
			<tr>
				<td
					class="text-left"
					class:bg-warning={colorPartSkippable(part.body_hp)}
					class:text-warning-content={colorPartSkippable(part.body_hp)}
				>
					{part.part_id}
				</td>

				{#if titanInfo.total_armor_hp > 0}
					<td class="text-right" class:text-info={tableViewHasColors}>
						{part.armor_hp_formatted}
					</td>
				{/if}

				<td class:text-success={tableViewHasColors}>
					{part.body_hp_formatted}
				</td>
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
		</tr>
	</tfoot>
</table>
