<script>
	import screenshot from './screenshot.png';
	import Button from "@/lib/components/ui/button/button.svelte";
</script>

<div class="mx-auto max-w-7xl px-6 lg:px-8 py-6 sm:py-8 lg:pb-40">
	<div class="mx-auto max-w-2xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-accent-foreground sm:text-6xl">
			IBM Internship Project
		</h1>
	</div>
	<div class="mt-14 flow-root sm:mt-18">
		<div
			class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"
		>
			<img
				src={screenshot}
				alt="Page Screenshot"
				width="1500"
				height="833"
				class="rounded-md shadow-2xl ring-1 ring-gray-900/10"
			/>
		</div>
	</div>
	<div class="mt-16 text-center">
		<h2 class="text-2xl font-bold tracking-tight text-accent-foreground sm:text-3xl">Contributers of this project include:</h2>
		<p class="mt-8">
			Sukhpreet Singh &
			Dibyanshu Mohapatra
		</p>
	</div>
</div>