import { db } from '$lib/server/db';
import { checkWatched, getDetails, getRecommendations, getTrailer } from '$lib/server/movies';
import type { Actions } from './$types';
import * as table from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const id = parseInt(event.params.id);

	if (id) {
		const result = await getDetails(id);

		if (!result || result.success === false) {
			return error(404, 'Not found');
		}

		const trailer = await getTrailer(id);

		const recommendations = await getRecommendations(id);

		let watched = false;

		if (event.locals.user?.username) {
			watched = (await checkWatched(id, event.locals.user?.username)) as boolean;
		}

		return { result, watched, trailer, recommendations };
	}

	// not found
	return error(404, 'Not found');
}

export const actions: Actions = {
	mark: async (event) => {
		const username = event.locals.user?.username as string;
		const movieId = parseInt((await event.request.formData()).get('id') as string);

		const result = await getDetails(movieId);

		// check if user has watched this movie
		const movie = await db
			.select()
			.from(table.movies)
			.where(and(eq(table.movies.movieId, movieId), eq(table.movies.username, username)));
		const watched = await checkWatched(movieId, username);

		if (watched !== false) {
			await db
				.update(table.movies)
				.set({ watched: movie[0].watched !== 0 ? 0 : 1 })
				.where(eq(table.movies.movieId, movieId));
		} else {
			await db.insert(table.movies).values({
				username,
				id: crypto.randomUUID(),
				movieId: movieId,
				watched: 1,
				originalTitle: result.original_title,
				posterPath: result.poster_path,
				timestamp: new Date()
			});
		}
	}
};
