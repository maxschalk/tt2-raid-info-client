import { Stage } from '../types';

export const STAGE = getStageFromEnv();

function getStageFromEnv(): Stage {
  let stage = import.meta.env.VITE_STAGE;

  if (!Object.values(Stage).includes(stage)) {
    stage = Stage.PRODUCTION;
  }

  return stage;
}
