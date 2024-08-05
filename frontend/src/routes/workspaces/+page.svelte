<script>
	import Button from '@/lib/components/ui/button/button.svelte';
	import { ArrowRightIcon, PlusCircleIcon } from 'lucide-svelte';

	const { data } = $props();
</script>

<main class="px-8 w-full max-w-7xl flex flex-col items-center">
	<h2 class="text-4xl w-max my-12">Workspaces</h2>
	{#await data.workspaces}
		Loading Workspaces
	{:then workspaces}
		{#if workspaces.length === 0}
			<div class="text-center mt-12">
				<svg
					class="mx-auto h-12 w-12 text-muted-foreground"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						vector-effect="non-scaling-stroke"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					/>
				</svg>
				<h3 class="mt-2 text-sm font-semibold">No Workspaces</h3>
				<p class="mt-1 text-sm text-secondary-foreground">
					Get started by creating a new workspace.
				</p>
				<div class="mt-6">
					<Button href="workspaces/create">
						<svg
							class="-ml-0.5 mr-1.5 h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>
						New Workspace
					</Button>
				</div>
			</div>
		{:else}
			<ul class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
				{#each workspaces as workspace}
					<a href="/workspaces/{workspace.workspaceId}" class="px-4 py-2 group bg-card hover:bg-accent text-card-foreground rounded-lg relative">
						<ArrowRightIcon class="absolute top-2 right-2 group-hover:text-accent-foreground"/>
						<h2 class="text-xl sm:text-2xl">{workspace.workspace.name}</h2>
						<p class="text-sm sm:text-lg">{workspace.workspace.description}</p>
					</a>
				{/each}
			</ul>
			<Button href="workspaces/create" variant="secondary" class="mt-4 bg-opacity-80"><PlusCircleIcon class="mr-2" />Create More Workspaces</Button>
		{/if}
		{:catch error}
		<p>error loading comments: {error.message}</p>
	{/await}
</main>
