<script lang="ts">
	export let active = false;

	export let titan = '';

	export let onClick = () => {};

	export let classes: string[] = [];
</script>

<button on:click={onClick} class={`${classes.join(' ')} ${active ? 'active' : ''}`}>
	{titan}
</button>

<style>
	button {
		padding: 4px 12px;
		margin: 0 4px;
	}

	.active {
		text-decoration: underline;
	}
</style>
