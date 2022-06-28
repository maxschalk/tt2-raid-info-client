<script lang="ts">
	import { navbar } from '../../stores';
</script>

<div class="flex flex-col items-center max-w-xl text-center space-y-6">
	<p>Choose one of the seeds to view or download the available data</p>

	<ul class="menu menu-accent bg-base-200 w-full rounded-box">
		{#if $navbar.links.raidInfo.children !== undefined}
			{#each $navbar.links.raidInfo.children as raidInfoLink}
				<li class="hover:text-accent">
					<a href={raidInfoLink.href} sveltekit:prefetch={raidInfoLink.prefetch}>
						{raidInfoLink.displayText}
					</a>
				</li>
			{/each}
		{/if}
	</ul>
</div>
