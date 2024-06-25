export function calculateMean(values: number[]): number {
    if (values.length === 0) return 0;

    const s = values.reduce((acc, val) => acc + val, 0);
    return s / values.length;
}

export function calculateDeviation(values: number[], mean: number): number {
    if (values.length === 0) return 0;
    // const m = calculateMean(values);
    const s = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return s / values.length;
}

export function calculateStandardDeviation(values: number[]): number {
    if (values.length === 0) return 0;

    const m = calculateMean(values);
    const s = values.reduce((acc, val) => acc + Math.pow(val - m, 2), 0);
    return Math.sqrt(s / values.length);
}

export function calculateMod(values: number[]): number {
    const countMap = new Map<number, number>();

    values.forEach(val => {
        const count = countMap.get(val) || 0;
        countMap.set(val, count + 1);
    });

    let mod = -1;
    let maxCount = -1;

    countMap.forEach((count, val) => {
        if (count > maxCount) {
            maxCount = count;
            mod = val;
        }
    });

    return mod;
}