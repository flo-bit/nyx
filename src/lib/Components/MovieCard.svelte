<script lang="ts">
	import { enhance } from '$app/forms';
	import { cn } from '$lib/utils';
	const {
		movie,
		showMark,
		watchedMovies
	}: {
		movie: { poster_path: string; original_title: string; id: number; watched?: boolean };
		showMark?: boolean;
		watchedMovies?: Set<number>;
	} = $props();
</script>

<div class="group relative">
	<div
		class="pointer-events-none relative z-20 aspect-[2/3] h-auto min-h-44 sm:min-h-64 w-full overflow-hidden rounded-md border border-base-800 bg-base-900/50 transition-opacity duration-75 group-hover:opacity-75"
	>
		{#if movie.poster_path}
			<img
				src="https://image.tmdb.org/t/p/w500{movie.poster_path}"
				alt="movie poster for {movie.original_title}"
				class="size-full object-cover object-center lg:size-full"
			/>
		{/if}

		{#if showMark}
			<form method="post" action="?/mark" use:enhance>
				<input type="hidden" name="id" value={movie.id} />

				<button
					class={cn(
						'pointer-events-auto absolute bottom-2 right-2 z-20 sm:hidden rounded-full border border-base-50/20 bg-black/30 p-2 text-base-50 backdrop-blur-sm group-hover:block',
						watchedMovies?.has(movie.id)
							? 'sm:block border-green-500/20 bg-green-900/60 text-green-500'
							: ''
					)}
					onclick={() => {
						watchedMovies?.add(movie.id);
					}}
				>
					<span class="sr-only">mark as watched</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="size-5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
					</svg>
				</button>
			</form>
		{/if}
	</div>
	<div class="mt-2 flex justify-between">
		<h3 class="sm:text-md text-sm font-medium text-base-50">
			<a href="/movie/{movie.id}">
				<span aria-hidden="true" class="absolute inset-0"></span>
				<div class="line-clamp-2 max-w-full">
					{movie.original_title}
				</div>
			</a>
		</h3>
	</div>
</div>
