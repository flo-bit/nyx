import { getWatchedMoviesIds, getWatchedShowsIds } from '$lib/server/movies';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (event.locals.user) {
		const watchedMovies = await getWatchedMoviesIds(event.locals.user.username);
		const watchedShows = await getWatchedShowsIds(event.locals.user.username);

		return { user: event.locals.user, watchedMovies, watchedShows };
	}

	return {};
};
