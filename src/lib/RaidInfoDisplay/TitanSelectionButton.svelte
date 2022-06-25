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
