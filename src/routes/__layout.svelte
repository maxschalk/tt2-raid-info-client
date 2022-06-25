<script lang="ts">
	import '../app.css';
	import '../global.css';

	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<nav />

<main>
	<div class="main-app">
		<slot />
	</div>
</main>

<footer />

<style>
	.main-app {
		margin: 2% 0;

		padding: 1%;

		background-color: lightcyan;
	}
</style>
