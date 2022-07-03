<script lang="ts">
  import lemmy from '$lib/assets/lemmy/lemmy.png';
  import type { EnhancedTitan } from '../../../../types';

  export let titanInfo: EnhancedTitan;
</script>

{#if titanInfo}
	<span></span>
{/if}

<div class="w-full flex justify-center">
  <img src={lemmy} alt="Dummy Titan Visualization" class="h-80"/>
</div>
