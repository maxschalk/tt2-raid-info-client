import { Stage } from '../types';
import { API_STAGE } from './STAGE';

const BASE_URLS: { [K in Stage]: string } = {
    dev: 'http://localhost:5000',
    prod: 'https://tt2-raid-info-api.up.railway.app',
};

const BASE_URLS_API: { [K in Stage]: string } = {
    dev: `${BASE_URLS.dev}/api/v0`,
    prod: `${BASE_URLS.prod}/api/v0`,
};

export const BASE_URL = BASE_URLS[API_STAGE] || BASE_URLS[Stage.PRODUCTION];
export const BASE_URL_API = BASE_URLS_API[API_STAGE] || BASE_URLS_API[Stage.PRODUCTION];
