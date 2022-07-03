import { Stage } from '../types';

export const STAGE = getFromEnv('VITE_STAGE');
export const API_STAGE = getFromEnv('VITE_API_STAGE');

console.log(STAGE, API_STAGE);

function getFromEnv(key: string): Stage {
    let stage = import.meta.env[key];

    if (stage === undefined || !Object.values(Stage).includes(stage)) {
        stage = Stage.PRODUCTION;
    }

    return stage;
}
