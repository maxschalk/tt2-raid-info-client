<script lang="ts">
	import { getDefaultNavbarProps, navbar, type NavbarProps } from '../stores';
	import { onDestroy } from 'svelte';

	let props: NavbarProps = getDefaultNavbarProps();

	const unsubscribe = navbar.subscribe((value) => (props = value));

	onDestroy(unsubscribe);
</script>

<div class="container">
	<div class="hero">
		<img src="/tt2-hero.png" alt="TT2 Hero" />

		{#if props.titleMain}
			<h1>{props.titleMain}</h1>
		{/if}

		<!-- TODO Move into conditional div, with one continuous bgc -->

		{#if props.linksMain.length}
			<nav class="navbar-main">
				{#each props.linksMain as link}
					<a href={link.href} sveltekit:prefetch={link.prefetch ? true : null}>
						{link.displayText}
					</a>
				{/each}
			</nav>
		{/if}
	</div>

	{#if props.titleSub}
		<h2>{props.titleSub}</h2>
	{/if}

	{#if props.linksMain.length}
		<nav class="navbar-sub">
			{#each props.linksSub as link}
				<a href={link.href} sveltekit:prefetch={link.prefetch ? true : null}>
					{link.displayText}
				</a>
			{/each}
		</nav>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: center;

		width: 100%;
	}

	.hero {
		display: flex;
		flex-direction: column;

		align-items: center;
		justify-content: center;

		width: 100%;

		padding-top: 8px;

		background: linear-gradient(
			0deg,
			rgba(0, 148, 163, 0) 0%,
			rgba(0, 148, 163, 0.1) 30%,
			rgba(0, 148, 163, 0.7) 100%
		);
	}

	h1 {
		margin: 0;
		margin-top: -20px;

		width: 100%;

		font-size: 3rem;

		text-align: center;

		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.9) 30%,
			rgba(255, 255, 255, 1) 100%
		);
	}

	nav {
		display: flex;
		justify-content: center;

		width: 100%;

		padding: 12px;

		font-size: 1.2rem;

		a {
			margin: 0 8px;
		}
	}

	.navbar-main {
		background-color: rgba(255, 255, 255, 1);
	}

	h2 {
		width: 100%;

		margin: 0;
		margin-top: 8px;

		font-size: 2rem;

		text-align: center;
	}
</style>
