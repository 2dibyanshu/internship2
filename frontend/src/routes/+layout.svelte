<script lang="ts">
	import '@/app.css';
	import { Toaster } from '$lib/components/ui/sonner'
	import { ArrowRightCircleIcon } from 'lucide-svelte'
	import Button from '@/lib/components/ui/button/button.svelte'
	import Logout from './(auth)/logout/Logout.svelte'
	const { children, data } = $props();
</script>

<svelte:head>
	<title> Education Sheet | A Data Visualization Platform for Academic </title>
	<meta name="description" content="A Data Visualization Platform for Academic." />
</svelte:head>

<Toaster />
<header class="w-full max-w-7xl z-10">
	<nav class="flex items-center justify-between py-6 px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Your Company</span>
				{#if data.user}
					{data.user.first_name + ' ' + data.user.last_name}
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-8"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
						/>
					</svg>
				{/if}
			</a>
		</div>
		<div class="gap-x-4 mr-6 hidden md:flex">
			<Button size="sm" href="/workspaces" variant="link">Workspaces</Button>
			<Button size="sm" href="/workspace-invitations" variant="link">Invitations</Button>
		</div>
		<div class="flex gap-x-4 justify-end">
			{#if data.user}
				<Logout />
			{:else}
				<Button
					href="/login"
					size="sm"
					class="rounded-full gap-x-2 pr-2 h-8"
					variant="default"
				>
					Login <ArrowRightCircleIcon size="16" />
				</Button>
				<Button
					href="/signup"
					size="sm"
					class="rounded-full gap-x-2 pr-2 h-8"
					variant="secondary"
				>
					Signup <ArrowRightCircleIcon size="16" />
				</Button>
			{/if}
		</div>
	</nav>
</header>

<div
	class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
	aria-hidden="true"
>
	<div
		class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
		style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
	></div>
</div>
{@render children()}
<div
	class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
	aria-hidden="true"
>
	<div
		class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
		style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
	></div>
</div>
