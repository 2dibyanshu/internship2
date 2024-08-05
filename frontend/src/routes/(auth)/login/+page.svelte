<script lang="ts">
	import LoginForm from "./login-form.svelte";
	const { data } = $props();
</script>

<LoginForm data={data.form} />