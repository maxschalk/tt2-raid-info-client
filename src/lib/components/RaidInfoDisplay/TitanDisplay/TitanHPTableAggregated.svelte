<script lang="ts">
    import { getAccumulatedParts } from '../../../../utils';

    import type { EnhancedTitan } from '../../../../types';

    export let titanInfo: EnhancedTitan;

    export let tableViewIsSpaced = true;
    export let tableViewHasColors = true;
    export let tableViewHighlightSkippable = false;

    $: accumulatedParts = getAccumulatedParts(titanInfo);

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
