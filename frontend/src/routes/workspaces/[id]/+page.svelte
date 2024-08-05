<script lang="ts">
	import * as Card from '@/lib/components/ui/card';
	import Radar from '@/routes/radar.svelte';

	const { data } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Workspace: {data.workspace?.name}</Card.Title>
	</Card.Header>
	<Card.Content>
		<Radar data={{
			messi: {
				pace: 0.85,
				shooting: 0.92,
				passing: 0.91,
				dribbling: 0.95,
				physical: 0.65
			},
			cristiano: {
				pace: 0.89,
				shooting: 0.93,
				passing: 0.81,
				dribbling: 0.89,
				physical: 0.77
			}
		}}/>
	</Card.Content>
</Card.Root>