<script>
	import { capitalize } from '../utils';

	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	];
</script>

<div class="">
	<select data-choose-theme class="select select-bordered select-sm text-lg">
		<option disabled selected>Theme</option>

		{#each themes as theme}
			<option value={theme}>{capitalize(theme)}</option>
		{/each}
	</select>
</div>
