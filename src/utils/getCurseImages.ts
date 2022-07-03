import { BASE_TITAN_PART_IDS, type ConsolidatedTitanPart } from '../types';

import HeadCurse from '$lib/assets/lemmy/HEAD_CURSE.png';
import TorsoCurse from '$lib/assets/lemmy/TORSO_CURSE.png';
import ShoulderRightCurse from '$lib/assets/lemmy/SHOULDER_RIGHT_CURSE.png';
import ShoulderLeftCurse from '$lib/assets/lemmy/SHOULDER_LEFT_CURSE.png';
import HandRightCurse from '$lib/assets/lemmy/HAND_RIGHT_CURSE.png';
import HandLeftCurse from '$lib/assets/lemmy/HAND_LEFT_CURSE.png';
import LegRightCurse from '$lib/assets/lemmy/LEG_RIGHT_CURSE.png';
import LegLeftCurse from '$lib/assets/lemmy/LEG_LEFT_CURSE.png';
import { getEnumKeyByEnumValue } from '.';

const IMAGES_BY_PART_IDS: { [key: string]: string } = {
  HEAD: HeadCurse,
  TORSO: TorsoCurse,
  SHOULDER_RIGHT: ShoulderRightCurse,
  SHOULDER_LEFT: ShoulderLeftCurse,
  HAND_RIGHT: HandRightCurse,
  HAND_LEFT: HandLeftCurse,
  LEG_RIGHT: LegRightCurse,
  LEG_LEFT: LegLeftCurse,
};

export function getCurseImages(parts: ConsolidatedTitanPart[]) {
  const result = [];

  for (const part of parts) {
    if (!part.armor_cursed) {
      continue;
    }

    const id = getEnumKeyByEnumValue(BASE_TITAN_PART_IDS, part.part_id);
    const img = IMAGES_BY_PART_IDS[id];

    if (img !== undefined) {
      result.push(img);
    }
  }

  return result;
}
