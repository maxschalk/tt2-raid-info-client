import type { Buff } from '../../types';

export function formatBuff(buff: Buff, numCursedParts = 0) {
    const buffName = formatBuffName(buff.bonus_type);

    const isPercentage = buff.bonus_amount < 1;

    if (isPercentage) {
        const amountPercent = buff.bonus_amount * 100;

        const totalCurseCalc =
            numCursedParts > 0
                ? ` (Total: ${amountPercent * numCursedParts}%, ${numCursedParts} parts)`
                : '';

        return `${amountPercent}% ${buffName} ${totalCurseCalc}`;
    }

    const totalCurseCalc =
        numCursedParts > 0
            ? ` (Total: ${buff.bonus_amount * numCursedParts}, ${numCursedParts} parts)`
            : '';

    return `${buff.bonus_amount} ${buffName} ${totalCurseCalc}`;
}

export function formatBuffName(buff: string) {
    return removeCurseSuffix(buff)
        .match(/[A-Z][a-z]+/g)
        ?.join(' ');
}

function removeCurseSuffix(buff: string) {
    const curseSuffix = 'PerCurse';

    const curseSuffixIndex = buff.indexOf(curseSuffix);

    if (curseSuffixIndex === -1) {
        return buff;
    }

    return buff.substring(0, curseSuffixIndex);
}
