<script lang="ts">
	import { page } from '$app/stores';
    import { DatabaseIcon, FilesIcon, GroupIcon, Settings2Icon } from 'lucide-svelte';
	const navItems = [
		{
			label: 'Data Sheet',
			icon: DatabaseIcon,
			href: `/workspaces/${$page.params.id}`
		},
		{
			label: 'CSV Files',
			icon: FilesIcon,
			href: `/workspaces/${$page.params.id}/csv`
		},
		{
			label: 'Members',
			icon: GroupIcon,
			href: `/workspaces/${$page.params.id}/members`
		},
		{
			label: 'Settings',
			icon: Settings2Icon,
			href: `/workspaces/${$page.params.id}/settings`
		}
	];
	const { children } = $props();
</script>

<div class="w-full max-w-7xl flex mt-3 px-8">
	<aside class="flex flex-col py-3 shrink-0 gap-y-3">
		{#each navItems as navItem}
			{@const Icon = navItem.icon}
			<a
				class="flex gap-x-2 rounded-md pl-2 pr-4 bg-zinc-950/20 hover:bg-zinc-950/50 h-8 items-center w-full"
				href={navItem.href}
			>
				<Icon class="mr-2" size="16" />
				<span class="text-sm">{navItem.label}</span>
			</a>
		{/each}
	</aside>
    <main class="w-full pt-2.5 pl-8">
        {@render children()}
    </main>	
</div>
