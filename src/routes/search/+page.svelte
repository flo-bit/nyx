<script lang="ts">
	import ItemsGrid from '$lib/Components/ItemsGrid.svelte';
	import Container from '$lib/Components/Container.svelte';

	import { type PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>search | skywatched</title>
</svelte:head>

<Container>
	<div class="px-4 py-16">
		<h1 class="pb-8 text-4xl font-bold tracking-tight text-base-50">search for a movie or show</h1>

		<form class="relative mt-6 flex items-center" method="GET">
			<input
				value={data.query}
				type="text"
				name="query"
				id="query"
				class="block w-full rounded-md border-0 bg-white/5 py-1.5 pr-14 text-base-50 shadow-sm ring-1 ring-inset ring-base-300/20 placeholder:text-base-400 focus:ring-2 focus:ring-inset focus:ring-accent-600 sm:text-sm/6"
			/>
			<div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
				<kbd
					class="inline-flex items-center rounded border border-base-200/20 px-1 font-sans text-xs text-base-400"
					>Enter</kbd
				>
			</div>
		</form>

		{#if data.results.length > 0}
			<h2 class="mt-8 text-2xl font-bold tracking-tight text-base-50">results</h2>

			<ItemsGrid items={data.results} showMark={!!data.user} />
		{:else if data.query}
			<p class="text-md mt-8 text-base-50">no results found</p>
		{/if}
	</div>
</Container>
