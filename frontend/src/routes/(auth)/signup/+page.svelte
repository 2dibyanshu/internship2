<script lang="ts">
	import LoginForm from "./signup-form.svelte";
	const { data } = $props();
</script>

<LoginForm data={data.form} />