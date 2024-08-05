<script lang="ts">
	import { ArrowLeftCircleIcon } from "lucide-svelte";
	import CreateWorkspaceForm from "./create-workspace-form.svelte";
	import Button from "@/lib/components/ui/button/button.svelte";
	const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
<Button variant="link" href="/workspaces">
	<ArrowLeftCircleIcon class="mr-2" />
	Go Back
</Button>

<CreateWorkspaceForm data={data.form} />
</main>