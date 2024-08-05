<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { createWorkspaceSchema, type CreateWorkspaceSchema } from './create-workspace-schema';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Textarea from '@/lib/components/ui/textarea/textarea.svelte';
	import { toast } from 'svelte-sonner';

	const {data}:{
		data:SuperValidated<Infer<CreateWorkspaceSchema>>
	} = $props();
	let toastId = $state<number|string>(0);
	const form = superForm(data, {
		validators: zodClient(createWorkspaceSchema),
		onResult: ()=> {
			toast.dismiss(toastId);
			toast.message("Your workspace is being created");
		},
		onSubmit: () => {
			toastId = toast.loading("Creating Workspace");
		}
	});
	const { form: formData, enhance, delayed } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Create Workspace</Card.Title>
		<Card.Description>Give your workspace a name & description</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input type="text"  {...attrs} bind:value={$formData.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.description} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="w-full mt-2" disabled={$delayed}>Create Workspace</Form.Button>
		</form>
	</Card.Content>
</Card.Root>
