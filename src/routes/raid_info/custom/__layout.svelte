<script lang="ts">
	import { postEnhanceSeedData } from '../../../apiInterface';
	import { prepareRaidSeed } from '../../../utils';

	import { page } from '$app/stores';
	import { navbar, type NavbarLink } from '../../../stores';

	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	import type { RaidSeedDataEnhanced, RaidSeedDataPrepared } from 'src/types';

	import ArrowLeft from 'svelte-material-icons/ArrowLeftBoldCircleOutline.svelte';
	import ArrowRight from 'svelte-material-icons/ArrowRightBoldCircleOutline.svelte';
	import Upload from 'svelte-material-icons/FileUploadOutline.svelte';

	let raidSeedLinks: NavbarLink[] = $navbar.links.raidInfo?.children ?? [];

	let prevLink: NavbarLink | undefined;
	$: prevLink =
		raidSeedLinks[raidSeedLinks.findIndex((lnk) => $page.url.href.endsWith(lnk.href)) + 1];

	let nextLink: NavbarLink | undefined;
	$: nextLink =
		raidSeedLinks[raidSeedLinks.findIndex((lnk) => $page.url.href.endsWith(lnk.href)) - 1];

	let fileUploadElement: HTMLInputElement;

	let loading: Writable<boolean> = writable(false);
	let seedData: Writable<RaidSeedDataPrepared | Record<string, never>> = writable({});
	let error: Writable<string> = writable('');

	setContext('loading', loading);
	setContext('seedData', seedData);
	setContext('error', error);

	let getPreparedSeed: () => Promise<RaidSeedDataPrepared>;
	$: getPreparedSeed = async () => {
		if (fileUploadElement === undefined) {
			throw new Error('Something went wrong');
		}

		const file = fileUploadElement.files?.[0];

		if (file === null || file === undefined) {
			throw new Error('No file selected');
		}

		if (file.type !== 'application/json') {
			const filenameParts = file.name.split('.');
			const suffix = filenameParts[filenameParts.length - 1];
			throw new Error(
				`${file.type || suffix} files are not supported, please upload a JSON-file`
			);
		}

		const data = await file.text();

		JSON.parse(data); // throws proper error for invalid JSON

		return postEnhanceSeedData(data, fetch).then((data) =>
			prepareRaidSeed(<RaidSeedDataEnhanced>data)
		);
	};

	let trigger: VoidFunction;
	$: trigger = () => {
		$seedData = {};
		$error = '';
		$loading = true;

		getPreparedSeed()
			.then((data) => ($seedData = data))
			.catch((err) => ($error = err))
			.finally(() => ($loading = false));
	};
</script>

<div class="container max-w-4xl flex flex-col items-center space-y-4">
	<div class="btn-group max-w-2xl grid grid-cols-3">
		<a
			class="btn btn-secondary font-bold shadow gap-2"
			href={prevLink?.href}
			class:btn-disabled={prevLink === undefined}
		>
			<ArrowLeft width="28" height="28" />
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
			<ArrowRight width="28" height="28" />
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

	<button class="btn btn-primary gap-2" on:click={trigger} class:btn-disabled={$loading}>
		<Upload width="28" height="28" />
		Submit seed file
	</button>

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
