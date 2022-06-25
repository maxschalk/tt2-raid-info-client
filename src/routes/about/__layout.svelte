<script lang="ts">
	import { getDefaultNavbarProps, navbar, type NavbarProps } from '../../stores';

	navbar.set(getDefaultNavbarProps());

	// navbar.update((old: NavbarProps) => ({
	// 	...old,
	// 	titleSub: '',
	// 	linksSub: [
	// 		{
	// 			href: `/about/project`,
	// 			displayText: 'Project'
	// 			// prefetch: true
	// 		}
	// 	]
	// }));
</script>

<slot />
