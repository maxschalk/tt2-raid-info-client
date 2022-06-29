<script lang="ts">
	import { navbar } from '../../stores';

	import { isoDateWithinWeek } from '../../utils';
</script>

<div class="flex flex-col items-center max-w-xl text-center space-y-6">
	{#if $navbar.links.raidInfo.children === undefined || $navbar.links.raidInfo.children.length === 0}
		<p class="text-error">Looks like something went wrong getting the seeds from the server</p>
	{:else}
		<p>Choose one of the seeds to view or download the available data</p>

		<ul class="menu menu-accent bg-base-200 w-full rounded-box">
			{#each $navbar.links.raidInfo.children as raidInfoLink}
				<li class="group hover:bg-primary-focus hover:text-primary-content">
					<a href={raidInfoLink.href} sveltekit:prefetch={raidInfoLink.prefetch}>
						{raidInfoLink.displayText}
						{#if isoDateWithinWeek(raidInfoLink.displayText)}
							<span class="font-bold text-success group-hover:text-inherit">
								| active
							</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
