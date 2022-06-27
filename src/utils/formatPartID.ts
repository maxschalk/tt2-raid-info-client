import { BASE_TITAN_PART_IDS, TITAN_PART_REPRS } from '../types';
import { getEnumKeyByEnumValue } from './getEnumKeyByEnumValue';

export function formatPartID(partID: string) {
	const words = partID.match(/[A-Z][a-z]+/g);

	if (words === null) {
		return '';
	}

	const prefix = words.shift();

	const rawPartID = words.join('');

	const partIDRepr = TITAN_PART_REPRS[getEnumKeyByEnumValue(BASE_TITAN_PART_IDS, rawPartID)];

	return `${partIDRepr} ${prefix}`;
}
