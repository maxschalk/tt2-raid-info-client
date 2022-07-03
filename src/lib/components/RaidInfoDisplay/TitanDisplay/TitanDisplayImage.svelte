<script lang="ts">
	import lemmy from '$lib/assets/lemmy/lemmy.png';
	import type { EnhancedTitan } from '../../../../types';

	export let titanInfo: EnhancedTitan;
</script>

<div class="w-full flex justify-center">
	<img src={lemmy} alt="Dummy Titan Visualization" />
	<p>{titanInfo.enemy_name}</p>
</div>
