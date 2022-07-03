<script lang="ts">
    import type { NumberInputChangeEvent } from '../../types';

    export let elementName: string;
    export let min: number;
    export let max: number;
    export let value: number;
    export let onChange: (value: number) => void;
    export let preventDefault = false;

    export let classes: string[] = [];

    function handleOnChange(event: NumberInputChangeEvent) {
        if (preventDefault) {
            event.preventDefault();
        }

        let val = parseInt(event.currentTarget.value, 10);

        if (isNaN(val)) {
            event.currentTarget.value = value.toString();
            return;
        }

        if (val === value) {
            return;
        }

        if (val < min) {
            event.currentTarget.value = min.toString();
            val = min;
        } else if (val > max) {
            event.currentTarget.value = max.toString();
            val = max;
        }

        onChange(val);
    }

    function changeValueBy(x: number) {
        value += x;

        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }
        onChange(value);
    }
</script>

<div class="relative">
    <input
        type="number"
        name={elementName}
        {min}
        {max}
        {value}
        on:change={handleOnChange}
        class={classes.join(' ')}
    />
    <div class="absolute right-2 top-0 flex">
        <button
            on:click={() => changeValueBy(1)}
            class="btn h-min p-0 m-0 outline-none border-none bg-opacity-0 hover:bg-opacity-0"
        >
            <svg
                class="fill-base-content hover:fill-accent h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M7.41 16 12 11.41 16.59 16 18 14.58 12 8.58 6 14.58 7.41 16Z" />
            </svg>
        </button>
        <button
            on:click={() => changeValueBy(-1)}
            class="btn h-min p-0 m-0 outline-none border-none bg-opacity-0 hover:bg-opacity-0"
        >
            <svg
                class="fill-base-content hover:fill-accent h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M7.41 8.58 12 13.17 16.59 8.58 18 10 12 16 6 10 7.41 8.58Z" />
            </svg>
        </button>
    </div>
</div>

<style>
    input[type='number'] {
        appearance: textfield;
        -moz-appearance: textfield;
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
</style>
