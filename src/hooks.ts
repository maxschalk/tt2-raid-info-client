import Blob from 'cross-blob';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.method !== 'OPTIONS') {
		return await resolve(event);
	}

	return new Response(new Blob(), { status: 200 });
};
