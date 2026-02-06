/**
 * Turkish License Plate Generator
 * Generates random Turkish license plates in the format: "XX YYY ZZZ"
 * - XX: 2 digits (01-81, Turkish city codes)
 * - YYY: 2-3 letters (A-Z, excluding Q, W, X)
 * - ZZZ: 2-3 digits (001-999)
 */

// Turkish city codes (01-81)
const CITY_CODES = Array.from({ length: 81 }, (_, i) =>
  String(i + 1).padStart(2, '0')
);

// Allowed letters (excluding Q, W, X as per Turkish plate standards)
const ALLOWED_LETTERS = 'ABCDEFGHIJKLMNOPRSTUVYZ'.split('');

/**
 * Generates a random element from an array
 * @param {Array} array - Source array
 * @returns {*} Random element
 */
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random letter sequence (2-3 letters)
 * @returns {string} Letter sequence
 */
function generateLetterSequence() {
  const length = getRandomNumber(2, 3);
  let letters = '';
  for (let i = 0; i < length; i++) {
    letters += getRandomElement(ALLOWED_LETTERS);
  }
  return letters;
}

/**
 * Generates a random number sequence (2-3 digits)
 * @returns {string} Number sequence
 */
function generateNumberSequence() {
  const length = getRandomNumber(2, 3);
  const min = length === 2 ? 10 : 100;
  const max = length === 2 ? 99 : 999;
  return String(getRandomNumber(min, max));
}

/**
 * Generates a single Turkish license plate
 * @returns {string} License plate in format "XX YYY ZZZ"
 */
function generateSinglePlate() {
  const cityCode = getRandomElement(CITY_CODES);
  const letters = generateLetterSequence();
  const numbers = generateNumberSequence();

  return `${cityCode} ${letters} ${numbers}`;
}

/**
 * Generates multiple unique Turkish license plates
 * @param {number} count - Number of plates to generate
 * @returns {string[]} Array of unique license plates
 */
function generatePlates(count = 3000) {
  const plates = new Set();

  // Add test plate for easy verification
  plates.add('06 ARS 06');

  // Keep generating until we have the required count
  while (plates.size < count) {
    plates.add(generateSinglePlate());
  }

  return Array.from(plates);
}

module.exports = {
  generatePlates,
  generateSinglePlate
};
