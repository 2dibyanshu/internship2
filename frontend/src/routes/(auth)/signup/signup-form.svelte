<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { signupSchema, type SignupSchema } from './signup-schema';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SignupSchema>>;

	const form = superForm(data, {
		validators: zodClient(signupSchema)
	});
	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid grid-cols-2 gap-4">
				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Form.Label>First name</Form.Label>
						<Input placeholder="Max" {...attrs} bind:value={$formData.firstName} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lastName">
					<Form.Control let:attrs>
						<Form.Label>Last name</Form.Label>
						<Input placeholder="Robinson" {...attrs} bind:value={$formData.lastName} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input placeholder="m@example.com" {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} type="password" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="w-full mt-2">Create An Account</Form.Button>
		</form>
	</Card.Content>
	<Card.Footer>
		<div class="w-full text-center text-sm">
			Already have an account?
			<Button href="/login" variant="link" class="p-0 underline">Login</Button>
		</div>
	</Card.Footer>
</Card.Root>
