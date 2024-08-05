<script lang="ts">
	import { page } from '$app/stores';
	import Button from '@/lib/components/ui/button/button.svelte';
	import * as Card from '@/lib/components/ui/card';
	import { PlusIcon } from 'lucide-svelte';

	const { data } = $props();
</script>

<Card.Root>
	<Card.Header>
		<div class="flex w-full justify-between items-center">
			<Card.Title>Members</Card.Title>
			<Button class="" href="/workspaces/{$page.params.id}/members/invite" size="sm">
				<PlusIcon class="mr-2" /> Invite Member</Button
			>
		</div>
	</Card.Header>
	<Card.Content>
		<div>
			{#await data.invitedWorkspaceUsers}
				<p>Loading... invitedMembers</p>
			{:then invitedMembers}
				<ul>
					{#each invitedMembers as member}
						<li>{member.email} Invited</li>
					{/each}
				</ul>
			{:catch error}
				<p>{error.message}</p>
			{/await}
			{#await data.workspaceMembers}
				<p>Loading Workspace Members...</p>
			{:then workspaceMembers}
				<ul>
					{#each workspaceMembers as member}
						<li>{member.user.email} {member.role}</li>
					{/each}
				</ul>
			{:catch error}
				<p>{error.message}</p>
			{/await}
		</div>
	</Card.Content>
</Card.Root>
