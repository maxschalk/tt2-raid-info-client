<script lang="ts">
	import '../global.css';

	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<Nav />

<main>
	<div class="main-app">
		<slot />
	</div>
</main>

<Footer />

<style>
	.main-app {
		margin: 2% 0;

		padding: 1%;

		background-color: lightcyan;
	}
</style>
