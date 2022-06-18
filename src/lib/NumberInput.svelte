<script lang="ts">
	import type { NumberInputChangeEvent } from 'src/types';

	export let elementName: string;
	export let min: number;
	export let max: number;
	export let value: number;
	export let onChange: (value: number, event?: NumberInputChangeEvent) => void;
	export let preventDefault: boolean = false;

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

		if (val < min || event.currentTarget.value === '') {
			event.currentTarget.value = min.toString();
			val = min;
		}

		if (val > max) {
			event.currentTarget.value = max.toString();
			val = max;
		}

		onChange(val, event);
	}
</script>

<input type="number" name={elementName} {min} {max} {value} on:change={handleOnChange} />
