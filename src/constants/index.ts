import type { Stage } from '../types';

export const BASE_URLS: { [K in Stage]: string } = {
	dev: 'http://http://riskypengu.in',
	prod: 'https://tt2-data.herokuapp.com',
};

export const BASE_URLS_API: { [K in Stage]: string } = {
	dev: `${BASE_URLS.dev}/api/v0`,
	prod: `${BASE_URLS.prod}/api/v0`,
};
