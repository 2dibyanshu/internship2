<script lang="ts">
	import { page } from '$app/stores';
	import * as Table from '$lib/components/ui/table';
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '@/lib/components/ui/button/button.svelte';
	import * as Card from '@/lib/components/ui/card';
	import { UploadCloudIcon } from 'lucide-svelte';
	import { csv2json, json2csv } from 'json-2-csv';

	let { data } = $props();
	let selectedCSV = $state<{
		name: string;
		size: string;
		data: Array<Object>;
	}>({
		name: '',
		size: '',
		data: []
	});

	let dialogOpen = $state<boolean>(false);
</script>

<Card.Root>
	<Card.Header>
		<div class="flex w-full justify-between items-center">
			<Card.Title>Uploaded CSV Files</Card.Title>
			<Button class="" href="/workspaces/{$page.params.id}/csv/import" size="sm">
				<UploadCloudIcon class="mr-2" /> Import CSV File
			</Button>
		</div>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Caption>A list of all the uploaded csv files.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Index</Table.Head>
					<Table.Head>File Name</Table.Head>
					<Table.Head>File Size</Table.Head>
					<Table.Head class="text-right">Created At</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#await data.csvfiles}
					<Table.Row>
						<Table.Cell class="font-medium">Loading</Table.Cell>
						<Table.Cell>Loading</Table.Cell>
						<Table.Cell>Loading</Table.Cell>
						<Table.Cell class="text-right">Loading</Table.Cell>
					</Table.Row>
				{:then csvfiles}
					{#each csvfiles as csv, i (i)}
						<Table.Row
							onclick={() => {
								selectedCSV = {
									name: csv.name,
									size: csv.size,
									data: csv2json(csv.file)
								};
								dialogOpen = true;
							}}
						>
							<Table.Cell class="font-medium">{i + 1}</Table.Cell>
							<Table.Cell>{csv.name}</Table.Cell>
							<Table.Cell>{csv.size}</Table.Cell>
							<Table.Cell class="text-right">{csv.createdAt}</Table.Cell>
						</Table.Row>
					{/each}
				{:catch}
					<p>Error</p>
				{/await}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>

<Dialog.Root
	bind:open={dialogOpen}
	onOutsideClick={() => {
		dialogOpen = false;
		selectedCSV = {
			name: '',
			size: '',
			data: []
		};
	}}
>
	<Dialog.Trigger />
	<Dialog.Content class="sm:max-w-7xl">
		<Dialog.Header>
			<Dialog.Title>Table Name: {selectedCSV.name}</Dialog.Title>
			<Dialog.Description>
				Size:{selectedCSV.size}
			</Dialog.Description>
		</Dialog.Header>
		<div>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						{#each Object.keys(selectedCSV.data[0]) as key}
							<Table.Head>{key}</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each selectedCSV.data as row}
						<Table.Row>
							{#each Object.keys(selectedCSV.data[0]) as key}
								<Table.Cell>{row[key]}</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</Dialog.Content>
</Dialog.Root>
