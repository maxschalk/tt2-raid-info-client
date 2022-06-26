<script lang="ts">
	import { BASE_URLS } from '../../constants';
	import { getStageFromEnv } from '../../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS[STAGE];
</script>

<div class="text-center">
	<p>This website was built to give players easy access to up-to-date Tap Titans 2 raid data.</p>
	<p>
		All the data comes from GameHives
		<a href="https://discord.gg/gamehive" target="_blank" class="link link-hover link-accent">
			Discord Server
		</a>
		, is posted to a server by a
		<a
			href="https://github.com/riskypenguin/tt2-raid-info-discord-bot"
			target="_blank"
			class="link link-hover link-accent"
		>
			Discord bot
		</a>
		and finally served to this website through a RestAPI.
	</p>
	<p>
		If you need programmatic access to the raid data, take a look at the
		<a href={BASE_URL} target="_blank" class="link link-hover link-accent">API</a>.
	</p>
</div>

<div class="divider" />

<!-- TODO Refactor into card component -->
<div class="grid grid-cols-2 gap-8">
	<div class="card lg:card-side bg-base-200 shadow-lg">
		<div class="card-body space-y-4">
			<h2 class="card-title">Powered by SvelteKit</h2>
			<p>
				Svelte is 2022's
				<a
					href="https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks"
					target="_blank"
					class="link link-accent link-hover"
				>
					most loved web framework
				</a>
			</p>
			<div class="card-actions justify-start">
				<a href="https://svelte.dev/" target="_blank" class="btn btn-primary"> Svelte </a>
				<a href="https://kit.svelte.dev/" target="_blank" class="btn btn-secondary"> SvelteKit </a>
			</div>
		</div>

		<figure class="bg-base-300 p-4">
			<img src="svelte-logo.png" alt="Svelte Logo" class="w-20" />
		</figure>
	</div>

	<div class="card lg:card-side bg-base-200 shadow-lg">
		<div class="card-body space-y-4">
			<h2 class="card-title">Designed with TailwindCSS & DaisyUI</h2>
			<p>DaisyUI is a free and open-source TailwindCSS component library</p>
			<div class="card-actions justify-start">
				<a href="https://daisyui.com/" target="_blank" class="btn btn-primary"> DaisyUI </a>
				<a href="https://tailwindcss.com/" target="_blank" class="btn btn-secondary">
					TailwindCSS
				</a>
			</div>
		</div>
		<figure class="bg-base-300 p-4">
			<img src="tailwindcss-mark.svg" alt="TailwindCSS Logo" class="w-20" />
		</figure>
	</div>

	<div class="card lg:card-side bg-base-200 shadow-lg">
		<div class="card-body space-y-4">
			<h2 class="card-title">Open Source</h2>
			<p>Feel free to take a stroll around the code or contribute by submitting a Pull Request</p>
			<div class="card-actions justify-start">
				<a
					href="https://github.com/riskypenguin/tt2-raid-info-client"
					target="_blank"
					class="btn btn-primary"
				>
					Check it out on GitHub
				</a>
			</div>
		</div>

		<figure class="bg-base-300 p-4">
			<img src="Octocat.png" alt="GitHub Mark" class="w-20" />
		</figure>
	</div>

	<div class="card lg:card-side bg-base-200 shadow-lg">
		<div class="card-body space-y-4">
			<h2 class="card-title">Custom backend</h2>
			<p>All raid data is served by the TT2 Raid Info API</p>
			<div class="card-actions justify-start">
				<a href={BASE_URL} target="_blank" class="btn btn-primary"> Documentation </a>

				<a
					href="https://github.com/riskypenguin/tt2-raid-info-api"
					target="_blank"
					class="btn btn-secondary"
				>
					GitHub
				</a>
			</div>
		</div>
	</div>
</div>

<div class="divider" />

<p class="text-center text-accent">
	This project or I are not in any way affiliated with GameHive.
</p>

<div class="divider" />
