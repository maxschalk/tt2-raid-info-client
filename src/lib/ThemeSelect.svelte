<script lang="ts">
	import { capitalize } from '../utils';

	interface Theme {
		name: string;
		mode: string;
		enabled: boolean;
	}

	const themes: Theme[] = [
		{ name: 'dark', mode: 'dark', enabled: true },
		{ name: 'night', mode: 'dark', enabled: true },
		{ name: 'dracula', mode: 'dark', enabled: true },
		{ name: 'business', mode: 'dark', enabled: true },
		{ name: 'forest', mode: 'dark', enabled: true },
		{ name: 'halloween', mode: 'dark', enabled: true },

		{ name: 'light', mode: 'light', enabled: true },
		{ name: 'cupcake', mode: 'light', enabled: true },
		{ name: 'bumblebee', mode: 'light', enabled: true },
		{ name: 'emerald', mode: 'light', enabled: true },
		{ name: 'corporate', mode: 'light', enabled: true },
		{ name: 'lofi', mode: 'light', enabled: true },
		{ name: 'pastel', mode: 'light', enabled: true },
		{ name: 'fantasy', mode: 'light', enabled: true },
		{ name: 'wireframe', mode: 'light', enabled: true },
		{ name: 'winter', mode: 'light', enabled: true },
		{ name: 'garden', mode: 'light', enabled: true },
		{ name: 'autumn', mode: 'light', enabled: true },

		{ name: 'luxury', mode: 'dark', enabled: true },
		{ name: 'black', mode: 'dark', enabled: true },
		{ name: 'coffee', mode: 'dark', enabled: true },
		{ name: 'synthwave', mode: 'light', enabled: true },
		{ name: 'retro', mode: 'light', enabled: true },
		{ name: 'cyberpunk', mode: 'light', enabled: true },
		{ name: 'valentine', mode: 'light', enabled: true },

		{ name: 'aqua', mode: 'light', enabled: false },
		{ name: 'cmyk', mode: 'light', enabled: false },
		{ name: 'acid', mode: 'light', enabled: false },
		{ name: 'lemonade', mode: 'light', enabled: false },
	];
</script>

<div class="">
	<select data-choose-theme class="select select-bordered select-sm text-lg">
		<option selected disabled>Theme</option>

		{#each themes.filter((t) => t.enabled) as theme}
			<option value={theme.name} data-set-theme={theme.name} data-theme={theme.name}>
				<b>{capitalize(theme.name)}</b>
			</option>
		{/each}
	</select>
</div>
