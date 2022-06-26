<script lang="ts">
	export let active = false;

	export let displayText = '';

	export let onClick = () => {};

	export let classes: string[] = [];

	const activeClasses = 'active cursor-default btn-accent hover:bg-accent';
</script>

<button on:click={onClick} class={`btn px-4 ${active && activeClasses} ${classes.join(' ')}`}>
	{displayText}
</button>
