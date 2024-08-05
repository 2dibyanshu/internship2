<script lang="ts">
    const { children } = $props();
</script>

<main class="px-6 lg:px-8 py-6 sm:py-8 lg:pb-40 flex flex-col justify-center items-center w-[90vw]">
    {@render children()}
</main>