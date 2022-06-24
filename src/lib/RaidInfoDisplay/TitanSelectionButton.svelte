<script lang="ts">
	export let active = false;

	export let titan = '';

	export let onClick = () => {};

	export let classes: string[] = [];
</script>

<button
	disabled={active}
	class={`${classes.join(' ')} ${active ? 'active' : ''}`}
	on:click={onClick}
>
	{titan}
</button>

<style>
	button {
		padding: 4px 12px;
		margin: 0 4px;

		cursor: pointer;
	}

	.active {
		text-decoration: underline;

		cursor: default;
	}
</style>
