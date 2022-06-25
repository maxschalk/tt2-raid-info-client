<script lang="ts">
	import { BASE_URLS } from '../../constants';
	import { getStageFromEnv } from '../../utils';

	const STAGE = getStageFromEnv();

	const BASE_URL = BASE_URLS[STAGE];
</script>

<h2>About</h2>

<div>
	<p>
		This project uses the TT2 Raid Info API | <a href={BASE_URL} target="_blank">Documentation</a>
		| <a href="https://github.com/riskypenguin/tt2-raid-info-api">GitHub</a>.
	</p>

	<p>This project or its creators has no affiliation with GameHive.</p>
</div>
