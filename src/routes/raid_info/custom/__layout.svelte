<script lang="ts">
	import { BASE_URLS_API } from '../../../constants';
	import { getStageFromEnv, prepareRaidSeed } from '../../../utils';

	import { page } from '$app/stores';
	import { navbar, type NavbarLink, fileUploadContent } from '../../../stores';

	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	import Slot from './index.svelte';

	import type { RaidSeedDataEnhanced, RaidSeedDataPrepared } from 'src/types';

	import ArrowLeftBoldCircle from 'svelte-material-icons/ArrowLeftBoldCircle.svelte';
	import ArrowRightBoldCircle from 'svelte-material-icons/ArrowRightBoldCircle.svelte';
	import { onDestroy } from 'svelte';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS_API[STAGE];

	let raidSeedLinks: NavbarLink[];
	const unsubscribe = navbar.subscribe(
		(nb) => (raidSeedLinks = nb.links.raidInfo?.children ?? [])
	);

	let prevLink: NavbarLink | undefined;
	$: prevLink =
		raidSeedLinks[raidSeedLinks.findIndex((lnk) => $page.url.href.endsWith(lnk.href)) + 1];

	let nextLink: NavbarLink | undefined;
	$: nextLink =
		raidSeedLinks[raidSeedLinks.findIndex((lnk) => $page.url.href.endsWith(lnk.href)) - 1];

	onDestroy(unsubscribe);

	let fileUploadElement: HTMLInputElement;

	let seedData: Writable<RaidSeedDataPrepared | {}> = writable({});
	let error: Writable<string> = writable('');

	setContext('seedData', seedData);
	setContext('error', error);

	let getPreparedSeed: () => any;
	$: getPreparedSeed = async () => {
		$seedData = {};
		$error = '';

		if (fileUploadElement === undefined) {
			$error = 'Something went wrong';

			return;
		}

		const file = fileUploadElement.files?.[0];

		if (file === null || file === undefined) {
			$error = 'No file selected';

			return;
		}

		if (file.type !== 'application/json') {
			const filenameParts = file.name.split('.');
			const suffix = filenameParts[filenameParts.length - 1];
			$error = `${file.type || suffix} files are not supported, please upload a JSON-file`;

			return;
		}

		const data = await file.text();

		try {
			JSON.parse(data);
		} catch (e) {
			$error = `Something went wrong when parsing your file:\n${e}`;
			return;
		}

		fileUploadContent.set(data);

		const res = await fetch(`${BASE_URL}/admin/enhance_seed`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: data,
		});

		if (!res.ok) {
			$error = `${res.status}: ${await res.text()}`;
			return;
		}

		const enhancedSeedData = await res.json();

		$seedData = prepareRaidSeed(enhancedSeedData);
	};
</script>

<div class="container max-w-4xl flex flex-col items-center space-y-4">
	<div class="btn-group max-w-2xl grid grid-cols-3">
		<a
			class="btn btn-secondary font-bold shadow gap-2"
			href={prevLink?.href}
			class:btn-disabled={prevLink === undefined}
		>
			<ArrowLeftBoldCircle width="30" height="30" />
			{prevLink?.displayText ?? ''}
		</a>

		<button href={$page.url.href} class="btn btn-disabled bg-transparent text-base-content">
			Custom
		</button>

		<a
			class="btn btn-primary font-bold shadow gap-2"
			href={nextLink?.href}
			class:btn-disabled={nextLink === undefined}
		>
			{nextLink?.displayText ?? ''}
			<ArrowRightBoldCircle width="30" height="30" />
		</a>
	</div>

	<div class="divider" />

	<div class="w-full flex flex-col items-center space-y-2">
		<label class="block text-md text-base-content" for="raid_seed">
			Upload raw raid seed
		</label>

		<input
			class="block pr-4 cursor-pointer bg-transparent text-base-content border border-base-content text-sm rounded-box"
			aria-describedby="raid_seed"
			type="file"
			bind:this={fileUploadElement}
		/>
	</div>

	<button class="btn btn-primary" on:click={getPreparedSeed}> Analyse and display seed </button>

	<div class="divider" />

	<slot />
</div>

<style lang="postcss">
	input[type='file']::-webkit-file-upload-button,
	input[type='file']::file-selector-button {
		@apply bg-base-300 text-base-content text-sm cursor-pointer border-0 border-r border-base-content py-3 px-8;
		margin-inline-start: -1rem;
		margin-inline-end: 1rem;
	}
</style>
