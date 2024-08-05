<script lang="ts">
	import { ArrowLeftCircleIcon } from "lucide-svelte";
	import ImportData from "./import-csv.svelte";
	import Button from "@/lib/components/ui/button/button.svelte";
	import { page } from "$app/stores";
	const { data } = $props();
</script>

<main class="w-full max-w-7xl px-8 flex flex-col gap-12">
<Button variant="link" href="/workspaces/{$page.params.id}/csv">
	<ArrowLeftCircleIcon class="mr-2" />
	Go Back
</Button>

<ImportData data={data.form} />
</main>