<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { inviteMemberSchema, roles, type InviteMemberSchema } from './invite-member'
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as Select from '@/lib/components/ui/select';
	import { SendIcon } from 'lucide-svelte';

	const {data}:{
		data:SuperValidated<Infer<InviteMemberSchema>>
	} = $props();
	let toastId = $state<number|string>(0);
	const form = superForm(data, {
		validators: zodClient(inviteMemberSchema),
		onResult: (event)=> {
			if(event.result.type === 'success') {
				toast.dismiss(toastId);
				toast.message("Invitation is sent");
			} else {
				toast.dismiss(toastId);
			}
		},
		onSubmit: () => {
			toastId = toast.loading("Sending Invitation");
		}
	});
	const { form: formData, enhance, delayed } = form;

	let selectedRole = $derived({
		label: roles[$formData.role],
		value: $formData.role,
	});
	
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Invite Member</Card.Title>
		<Card.Description> once the member accept the invitation, he can view your workspace </Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input type="email"  {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="role">
				<Form.Control let:attrs>
					<Form.Label>Role</Form.Label>
					<Select.Root
						selected={selectedRole}
						onSelectedChange={(s) => {
							s && ($formData.role = s.value);
						}}
					>
						<Select.Input name={attrs.name} />
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select a language" />
						</Select.Trigger>
						<Select.Content>
							{#each Object.entries(roles) as [value, label]}
								<Select.Item {value} {label} />
							{/each}
						</Select.Content>
					</Select.Root>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="w-full mt-2" disabled={$delayed}> <SendIcon class="mr-2"/> Invite Member</Form.Button>
		</form>
	</Card.Content>
</Card.Root>
