import type { Stage } from '../types';

export const BASE_URLS: { [K in Stage]: string } = {
	dev: 'http://localhost:5000',
	prod: 'http://riskypengu.in',
};

export const BASE_URLS_API: { [K in Stage]: string } = {
	dev: `${BASE_URLS.dev}/api/v0`,
	prod: `${BASE_URLS.prod}/api/v0`,
};
