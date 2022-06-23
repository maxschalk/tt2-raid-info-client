<script lang="ts">
	import type { EnhancedTitan } from 'src/types';

	export let titanInfo: EnhancedTitan;
</script>

<p><b>{titanInfo.enemy_name}</b></p>
<p>
	<b>Target HP:</b>
	{titanInfo.total_hp_formatted}
</p>
<p>
	Body HP:
	{titanInfo.total_body_hp_formatted}
</p>
<p>
	Armor HP:
	{titanInfo.total_armor_hp_formatted}
</p>
