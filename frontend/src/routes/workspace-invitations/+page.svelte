<script lang="ts">
	import InvitationForm from "./invitation-form.svelte";
    const { data } = $props();
</script>

<h2 class="text-2xl my-6">Pending Invitations</h2>

<ul class="flex flex-col items-center gap-y-3">
    {#await data.invitations}
        Loading Invitations
    {:then invitations} 
        {#each invitations as invitation}
            <li>
                {invitation.invitedBy.email} invited you to join {invitation.workspace.name} as {invitation.role}
                <div class="flex gap-x-2">
                    <InvitationForm data={data.form} workspace_id={invitation.workspaceId} />
                </div>
            </li>
        {/each}
    {/await}
</ul>