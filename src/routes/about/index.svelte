<script lang="ts">
	import AboutCard from '$lib/AboutCard.svelte';
	import { BASE_URLS } from '../../constants';
	import { getStageFromEnv } from '../../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS[STAGE];
</script>

<div class="container  max-w-4xl">
	<div class="text-center">
		<p>
			This website was built to give players easy access to up-to-date Tap Titans 2 raid data.
		</p>
		<p>
			All the data comes from GameHives
			<a href="https://discord.gg/gamehive" target="_blank" class="link"> Discord Server </a>
			, is posted to a server by a
			<a
				href="https://github.com/riskypenguin/tt2-raid-info-discord-bot"
				target="_blank"
				class="link"
			>
				Discord bot
			</a>
			and finally served to this website through a RestAPI.
		</p>
		<p>
			If you need programmatic access to the raid data, take a look at the
			<a href={BASE_URL} target="_blank" class="link">API</a>.
		</p>
	</div>

	<div class="divider" />

	<!-- TODO Refactor into card component -->
	<div class="grid grid-cols-2 gap-8">
		<AboutCard
			imgSrc="svelte-logo.png"
			imgAlt="Svelte Logo"
			links={[
				{ text: 'Svelte', href: 'https://svelte.dev/' },
				{ text: 'SvelteKit', href: 'https://kit.svelte.dev/' },
			]}
			classes={['col-span-2']}
		>
			<svelte:fragment slot="title">Powered by SvelteKit</svelte:fragment>
			<p slot="body">
				SvelteKit is a framework for building high-performance web apps using Svelte,
				<a
					href="https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks"
					target="_blank"
					class="link "
				>
					2022s most loved web framework
				</a>
			</p>
		</AboutCard>

		<AboutCard
			imgSrc="tailwindcss-mark.svg"
			imgAlt="TailwindCSS Logo"
			links={[
				{ text: 'DaisyUI', href: 'https://daisyui.com/' },
				{ text: 'TailwindCSS', href: 'https://tailwindcss.com/' },
			]}
			classes={['col-span-2']}
		>
			<svelte:fragment slot="title">Designed with TailwindCSS & DaisyUI</svelte:fragment>

			<p slot="body">DaisyUI is a free and open-source TailwindCSS component library</p>
		</AboutCard>

		<AboutCard
			imgSrc="Octocat.png"
			imgAlt="GitHub Octocat"
			links={[
				{
					text: 'Check it out on GitHub',
					href: 'https://github.com/riskypenguin/tt2-raid-info-client',
				},
			]}
		>
			<svelte:fragment slot="title">Open Source</svelte:fragment>

			<p slot="body">
				Take a stroll around the code or contribute by submitting a Pull Request
			</p>
		</AboutCard>

		<AboutCard
			imgSrc="fastapi.svg"
			imgAlt="FastAPI Logo"
			links={[
				{ text: 'Documentation', href: BASE_URL },
				{ text: 'GitHub', href: 'https://github.com/riskypenguin/tt2-raid-info-api' },
			]}
		>
			<svelte:fragment slot="title">Custom backend</svelte:fragment>

			<p slot="body" class="whitespace-pre-line">
				All raid data is served by the TT2 Raid Info API {'\n'} Built with Python & FastAPI
			</p>
		</AboutCard>
	</div>

	<div class="divider" />

	<p class="text-center text-accent">
		This project or I are not in any way affiliated with GameHive.
	</p>

	<div class="divider" />
</div>
