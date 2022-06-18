<script lang="ts">
	import type { RaidSeedDataPrepared } from 'src/types';

	export let seed: RaidSeedDataPrepared;
</script>

<div class="container">
	<p>
		<b>Valid from:</b>
		{seed.raid_info_valid_from} (<a href="https://time.is/GMT+2" target="_blank">GMT+2</a>)
	</p>
	<p>
		<b>Expires at:</b>
		{seed.raid_info_expire_at} (<a href="https://time.is/GMT+2" target="_blank">GMT+2</a>)
	</p>
	<p>
		{#if new Date(seed.raid_info_valid_from) > new Date()}
			<b style="color: red">Not yet active</b>
		{:else if new Date(seed.raid_info_expire_at) < new Date()}
			<b style="color: red">Not active anymore</b>
		{:else}
			<b style="color: green">Currently active</b>
		{/if}
	</p>
</div>
