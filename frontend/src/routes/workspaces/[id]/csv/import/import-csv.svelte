<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { importCSVSchema, type ImportCSVSchema } from './import-csv';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { UploadCloudIcon } from 'lucide-svelte';
	import Label from '@/lib/components/ui/label/label.svelte';
	import Button from '@/lib/components/ui/button/button.svelte';

	const {data}:{
		data:SuperValidated<Infer<ImportCSVSchema>>
	} = $props();

	let toastId = $state<number|string>(0);

	const form = superForm(data, {
		validators: zodClient(importCSVSchema),
		onResult: (event)=> {
			if(event.result.type === 'success') {
				toast.dismiss(toastId);
				toast.message("CSV FIle is Uploaded");
			} else {
				toast.dismiss(toastId);
			}
		},
		onSubmit: () => {
			toastId = toast.loading("Uploading CSV");
		}
	});

	const { form: formData, enhance, delayed, errors } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Upload CSV File</Card.Title>
	</Card.Header>
	<Card.Content >
		<form class="flex flex-col gap-y-3" method="POST" enctype="multipart/form-data" use:enhance>
			<div>
				<Label>File Name</Label>
				<Input
			  		type="text"
					required
			  		name="name"
			  		on:input={(e) => ($formData.name = e.currentTarget.value as string)}
				/>
			</div>
			<div>
				<Label>CSV File</Label>
				<Input
					type="file"
					name="file"
					on:input={(e) => ($formData.file = e.currentTarget.files?.item(0) as File)}
				/>
			</div>
			
			{#if $errors.file}<span>{$errors.file}</span>{/if}
			<Button class="w-full mt-2" type="submit" disabled={$delayed}> <UploadCloudIcon class="mr-2"/> Upload CSV</Button>
		  </form>
	</Card.Content>
</Card.Root>
