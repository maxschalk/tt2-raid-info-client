<script lang="ts">
    import type { EnhancedTitan } from '../../../../types';
    import TitanHPTableAggregated from './TitanHPTableAggregated.svelte';
    import TitanHpTableDetailed from './TitanHPTableDetailed.svelte';

    export let tableDataIsAggregated = true;

    export let toggleSetTableDataAggregated: (newValue?: boolean) => void = () => undefined;

    export let titanInfo: EnhancedTitan;

    let tableViewIsSpaced = true;
    let tableViewHasColors = true;
    let tableViewHighlightSkippable = false;
</script>

<div>
    <svelte:component
        this={tableDataIsAggregated ? TitanHPTableAggregated : TitanHpTableDetailed}
        {titanInfo}
        {tableViewIsSpaced}
        {tableViewHasColors}
        {tableViewHighlightSkippable}
    />
</div>

<div class="menu menu-horizontal rounded-box bg-base-200 w-full flex justify-evenly items-center">
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
                <input
                    type="checkbox"
                    bind:checked={tableViewHighlightSkippable}
                    class="checkbox"
                />
                <span class="label-text text-lg">Highlight skippable parts</span>
            </label>
        </div>
    </div>
</div>

<div class="flex justify-between items-center w-full">
    <label class="swap btn w-full">
        <input
            type="checkbox"
            checked={tableDataIsAggregated}
            on:click={() => toggleSetTableDataAggregated()}
        />
        <div class="swap-off">Show aggregated parts</div>
        <div class="swap-on">Show detailed parts</div>
    </label>
</div>

<span id="titan-data-end" />
