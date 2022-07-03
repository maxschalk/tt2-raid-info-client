function numberStringMinMax(arr: string[], func: (...arr: number[]) => number): string {
    return func(...arr.map((val) => parseInt(val, 10))).toString();
}

export function numberStringMin(arr: string[]): string {
    return numberStringMinMax(arr, Math.min);
}

export function numberStringMax(arr: string[]): string {
    return numberStringMinMax(arr, Math.max);
}
