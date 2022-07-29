import { filenameFromISODateString } from '../utils';
import { SortOrder } from '../types';
import { BASE_URL_API } from './URLS';
import type { ExternalFetch } from '@sveltejs/kit';

export function getSeedFilenames(
    sortOrder: SortOrder = SortOrder.DESCENDING,
    externalFetch: ExternalFetch | undefined = undefined
): Promise<unknown> {
    const url = new URL(`${BASE_URL_API}/admin/seed_identifiers/raw?sort_order=${sortOrder}`);

    const req = new Request(url);

    return makeAPIRequest(req, externalFetch);
}

export function getSeedByFilename(
    seedISODate: string,
    externalFetch: ExternalFetch | undefined = undefined
): Promise<unknown> {
    const { filename } = filenameFromISODateString(seedISODate);

    const url = new URL(`${BASE_URL_API}/admin/seed/enhanced/${filename}`);

    const req = new Request(url);

    return makeAPIRequest(req, externalFetch);
}

export function postEnhanceSeedData(
    seedData: string,
    externalFetch: ExternalFetch | undefined = undefined
): Promise<unknown> {
    const url = new URL(`${BASE_URL_API}/admin/enhance`);

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

    const res = await fetchFunc(req);

    if (!res.ok) {
        throw new Error(`${res.status}: Fetching from ${req.url}\n${await res.text()}`);
    }

    const headerContentType = res.headers.get('content-type');

    if (headerContentType === null) {
        throw new Error(`Response from ${req.url} did not specify content-type`);
    }

    if (!headerContentType.includes('application/json')) {
        throw new Error(
            `Response from ${req.url} returned Content-Type ${headerContentType}, not application/json`
        );
    }

    return res.json();
}
