export function formatHP(hp: number) {
    const thousandsUnits = ['K', 'M', 'B', 'T', 'Q'];

    let unit = '';

    let tmpHP = hp;

    while (tmpHP >= 1000 && thousandsUnits.length > 0) {
        tmpHP = Math.ceil((tmpHP / 1000) * 100) / 100;

        unit = thousandsUnits.shift() || '';
    }

    return `${tmpHP.toFixed(2)}${unit}`;
}
