// Filename: Utility.js
const numberWords = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'half': 0.5,
    'third': 1 / 3,
    'quarter': 0.25,
    'fifth': 0.2,
    'sixth': 1 / 6,
    'eighth': 0.125,
    'tenth': 0.1
};

function parseSpokenNumbers(speechText) {
    const words = speechText.split(' ');
    let currentNumber;

    for (let word of words) {
        if (numberWords[word] !== undefined) {
            currentNumber = numberWords[word];
            // Handle cases like "two thirds"
            if (words.includes('half', 'third', 'quarter', 'fifth', 'sixth', 'eighth', 'tenth')) {
                if (currentNumber > 1) { // Numeric numerator
                    currentNumber *= numberWords[words[words.indexOf(word) + 1]];
                }
            }
            break; // Found the number, can exit loop
        }
    }

    return currentNumber || null; // Return null if no number found
}

export { parseSpokenNumbers };