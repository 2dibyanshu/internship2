<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import Button from "@/lib/components/ui/button/button.svelte";

    const { data } = $props()
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Workspace Settings</Card.Title>
		<Card.Description>
			Workspace details are used to help you identify and manage your workspace.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col gap-y-6">
			<div class="flex flex-col gap-3">
				<Label for="name">Name</Label>
				<Input
					id="name"
					type="text"
					class="w-full"
					value={data.workspace?.name}
				/>
			</div>
			<div class="flex flex-col gap-3">
				<Label for="description">Description</Label>
				<Textarea
					id="description"
					value={data.workspace?.description}
					class="min-h-32"
				/>
			</div>
		</div>
	</Card.Content>
    <Card.Footer>
        <Button>Save</Button>
    </Card.Footer>
</Card.Root>
