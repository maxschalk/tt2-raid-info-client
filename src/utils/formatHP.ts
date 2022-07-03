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

/*
def format_hp(hp: int | float):
    thousands_units = ["K", "M", "B", "T", "Q"]
    unit = ""

    hp = int(hp)

    while hp >= 1000 and len(thousands_units):
        hp = int(((hp / 1000) * 100)) / 100

        unit = thousands_units.pop(0)

    return f"{hp:.2f}{unit}"

*/
