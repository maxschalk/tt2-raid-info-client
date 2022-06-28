<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import { get } from 'svelte/store';
	import { BASE_URLS_API } from '../../../../constants';
	import { filenameFromISODateString, getStageFromEnv } from '../../../../utils';
	import { fileUploadContent } from '../../../../stores';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS_API[STAGE];

	// export async function load() {
	// 	const res = await fetch(`${BASE_URL}/admin/enhance_seed?download=true`, {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: get(fileUploadContent),
	// 	});

	// 	if (!res.ok) {
	// 		return { error: `${res.status}: ${await res.text()}` };
	// 	}

	// 	const enhancedSeedData = await res.json();

	// 	console.log(enhancedSeedData);

	// 	return enhancedSeedData;
	// }

	// export async function load() {
	// 	return {
	// 		status: 302,
	// 		redirect: `${BASE_URL}/admin/enhance_seed?download=true`,
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: get(fileUploadContent),
	// 	};
	// }
</script>
