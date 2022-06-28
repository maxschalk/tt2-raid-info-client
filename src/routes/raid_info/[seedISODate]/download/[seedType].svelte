<script lang="ts" context="module">
	import { BASE_URLS_API } from '../../../../constants';
	import { filenameFromISODateString, getStageFromEnv } from '../../../../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS_API[STAGE];

	export async function load({ params }: { params: { seedISODate: string; seedType: string } }) {
		let { seedISODate, seedType } = params;

		if (!['raw', 'enhanced'].includes(seedType)) {
			seedType = 'raw';
		}

		const { filename } = filenameFromISODateString(seedISODate);

		const downloadUrl = `${BASE_URL}/admin/seed_file/${seedType}/${filename}?download=false`;

		return {
			status: 302,
			redirect: downloadUrl,
		};
	}
</script>
