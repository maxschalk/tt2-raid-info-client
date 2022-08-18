import { Stage } from '../types';

export const STAGE = getFromEnv('VITE_STAGE') || Stage.PRODUCTION;
export const API_STAGE = getFromEnv('VITE_API_STAGE') || Stage.PRODUCTION;

function getFromEnv(key: string): Stage {
    let stage = import.meta.env[key];

    if (stage === undefined || !Object.values(Stage).includes(stage)) {
        stage = Stage.PRODUCTION;
    }

    return stage;
}
