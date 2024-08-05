<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import {
		workspaceInvitationSchema,
		type WorkspaceInvitationSchema
	} from './invitation-form-schema';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	const {
		data,
        workspace_id,
	}: {
		data: SuperValidated<Infer<WorkspaceInvitationSchema>>;
        workspace_id: string;
	} = $props();
	let toastId = $state<number | string>(0);
	const form = superForm(data, {
		validators: zodClient(workspaceInvitationSchema),
		onResult: (event) => {
			toast.dismiss(toastId);
		},
		onSubmit: (event) => {
			event.formData.get('status') === 'accept'
				? toastId = toast.loading('Accepting invitation')
				: toastId = toast.loading('Rejecting invitation');
		}
	});

	const { enhance, delayed } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="status">
		<Form.Control let:attrs>
			<Input type="hidden" {...attrs} value="accept" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="workspace_id">
		<Form.Control let:attrs>
			<Input type="hidden" {...attrs} value={workspace_id} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" disabled={$delayed}>Accept</Form.Button>
</form>
<form method="POST" use:enhance>
	<Form.Field {form} name="status">
		<Form.Control let:attrs>
			<Input type="hidden" {...attrs} value="reject" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="workspace_id">
		<Form.Control let:attrs>
			<Input type="hidden" {...attrs} value={workspace_id} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="w-full mt-2" variant="destructive" disabled={$delayed}>Reject</Form.Button>
</form>
