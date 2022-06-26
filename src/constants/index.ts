import type { Stage } from '../types';

export const BASE_URLS: { [K in Stage]: string } = {
	dev: 'http://localhost:5000/',
	prod: 'https://tt2-data.herokuapp.com/'
};

export const BASE_URLS_API: { [K in Stage]: string } = {
	dev: 'http://localhost:5000/api/v0',
	prod: 'https://tt2-data.herokuapp.com/api/v0'
};
