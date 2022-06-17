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
		background-color: yellow;

		margin: 2% 0;

		padding: 1%;
	}
</style>
