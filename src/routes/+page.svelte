<script>
	import { rateMovieModal, showLoginModal } from '$lib/state.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>skywatched</title>
</svelte:head>

<div class="h-screen bg-base-900">
	<div class="relative isolate flex h-screen items-center justify-center overflow-hidden">
		<img src="/movie.webp" alt="" class="absolute inset-0 -z-10 size-full object-cover" />

		<div class="absolute inset-0 -z-10 bg-base-950/70 backdrop-blur-sm"></div>

		<div
			class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			aria-hidden="true"
		>
			<div
				class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent-500 to-accent-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			></div>
		</div>

		<div class="text-center">
			<h1 class="text-balance text-5xl font-semibold tracking-tight text-base-100 sm:text-7xl">
				skywatched
			</h1>
			<p class="text-md mt-8 text-pretty font-medium text-base-300 sm:text-lg">
				review movies and shows with your bluesky account.
			</p>
			{#if !data.user}
				<button
					onclick={() => {
						showLoginModal.toggle();
					}}
					type="button"
					class="mt-8 inline-flex w-fit items-center gap-x-1.5 rounded-md border border-accent-500/30 bg-accent-700/20 px-3 py-2 text-sm font-semibold text-accent-400 shadow-sm transition-all duration-100 hover:bg-accent-700/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
				>
					Sign in with Bluesky
				</button>
			{:else}
				<button
					onclick={() => {
						rateMovieModal.showEmpty();
					}}
					type="button"
					class="mt-8 inline-flex w-fit items-center gap-x-1.5 rounded-md border border-accent-500/30 bg-accent-700/20 px-3 py-2 text-sm font-semibold text-accent-400 shadow-sm transition-all duration-100 hover:bg-accent-700/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
				>
					New review
				</button>
			{/if}
		</div>

		<div
			class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			aria-hidden="true"
		>
			<div
				class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-accent-500 to-accent-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			></div>
		</div>
	</div>
</div>
