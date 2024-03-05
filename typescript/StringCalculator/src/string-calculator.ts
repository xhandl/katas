export function add(numbers: string): number {
    let sum = 0;

    // Return 0 for empty string
    if (!numbers?.trim()?.length) {
        return sum;
    }

    let elements: string[] = [];

    if (numbers.startsWith('//')) {
        const nlIndex = numbers.indexOf('\n');
        const delimiter = numbers.substring(2, nlIndex);

        numbers = numbers.slice(nlIndex + 1);
        const delimiters = delimiter.match(/[^\[\]]+/g) ?? [];

        const regexStr = delimiters.map(x => escapeRegExp(x))?.join('|');

        const regex = RegExp(regexStr);
        elements = numbers.split(regex);
    } else {
        elements = numbers.split(/[,\n]/);
    }

    const numbersArray = elements
        .map(x => Number(x))
        .filter(x => !isNaN(x) && x <= 1000);

    const negatives = numbersArray.filter(x => x < 0);
    if (negatives.length) {
        throw new Error(`negatives not allowed: ${negatives.join((','))}`);
    }

    sum = numbersArray.reduce((sum, current) => sum + current, 0);

    return sum;
}

function escapeRegExp(text: string) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
