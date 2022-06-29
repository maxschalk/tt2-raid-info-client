<script lang="ts">
	export let active = false;

	export let displayText = '';

	export let onClick: VoidFunction;

	export let classes: string[] = [];

	const activeClasses = 'active cursor-default btn-accent hover:bg-accent';
	const inactiveClasses = 'btn-ghost bg-base-300';
</script>

<button
	on:click={onClick}
	class={`btn px-4 ${active ? activeClasses : inactiveClasses}  ${classes.join(' ')}`}
>
	{displayText}
</button>
