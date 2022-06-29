import { filenameFromISODateString } from '../utils';
import { SortOrder } from '../types';
import { BASE_URL_API } from './URLS';
import type { ExternalFetch } from '@sveltejs/kit';

export interface SuccesfulApiResponse {
	ok: true;
	status: number;
	data: unknown;
}

export interface FailedApiResponse {
	ok: false;
	status?: number;
	error: Error;
}

export type ApiResponse = SuccesfulApiResponse | FailedApiResponse;

export function getSeedFilenames(
	sortOrder: SortOrder = SortOrder.DESCENDING,
	externalFetch: ExternalFetch | undefined = undefined
): Promise<unknown> {
	const url = new URL(`${BASE_URL_API}/admin/all_seed_filenames/raw?sort_order=${sortOrder}`);

	const req = new Request(url);

	return makeAPIRequest(req, externalFetch);
}

export function getSeedByFilename(
	seedISODate: string,
	externalFetch: ExternalFetch | undefined = undefined
): Promise<unknown> {
	const { filename } = filenameFromISODateString(seedISODate);

	const url = new URL(`${BASE_URL_API}/admin/seed_file/enhanced/${filename}`);

	const req = new Request(url);

	return makeAPIRequest(req, externalFetch);
}

export function postEnhanceSeedData(
	seedData: string,
	externalFetch: ExternalFetch | undefined = undefined
): Promise<unknown> {
	const url = new URL(`${BASE_URL_API}/admin/enhance_seed`);

	const req = new Request(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: seedData,
	});

	return makeAPIRequest(req, externalFetch);
}

async function makeAPIRequest(
	req: Request,
	externalFetch: ExternalFetch | undefined = undefined
): Promise<unknown> {
	const fetchFunc = externalFetch ?? fetch;

	return fetchFunc(req).then((res) => {
		console.log('before all checks', res.ok);

		if (!res.ok) {
			return res.text().then((data) => {
				throw new Error(`${res.status}: Fetching from ${req.url}\n${data}`);
			});
		}

		console.log('after ok check', res.headers.get('content-type'));

		if (res.headers.get('content-type') === null) {
			throw new Error(`Response from ${req.url} did not specify content-type`);
		}

		console.log('after content-type exists check', res.headers.get('content-type'));

		if (!res.headers.get('content-type')?.includes('application/json')) {
			throw new Error(`
			Response from ${req.url} returned Content-Type ${res.headers.get(
				'content-type'
			)}, not application/json`);
		}

		console.log('after all checks');

		return res.json();
	});
}
