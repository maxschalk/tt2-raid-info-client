import {
    AGGREGATED_TO_BASE_PART_IDS,
    TITAN_PART_REPRS,
    type AccumulatedTitanPart,
    type EnhancedTitan,
} from '../../types';
import { formatHP } from '..';

export function getAccumulatedParts(titanInfo: EnhancedTitan) {
    const parts: AccumulatedTitanPart[] = [];

    for (const [key, partIDs] of Object.entries(AGGREGATED_TO_BASE_PART_IDS)) {
        let armorHP = 0;
        let bodyHP = 0;

        for (const partID of partIDs) {
            const part = titanInfo.consolidated_parts.find((p) => p.part_id === partID);

            armorHP += part?.armor_hp ?? 0;
            bodyHP += part?.body_hp ?? 0;
        }

        parts.push({
            part_id: TITAN_PART_REPRS[key] ?? key,

            armor_hp: armorHP,
            body_hp: bodyHP,

            armor_hp_formatted: formatHP(armorHP),
            body_hp_formatted: formatHP(bodyHP),
        });
    }

    return parts;
}
