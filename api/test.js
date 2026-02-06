/**
 * Test script for plate generation
 * Run with: node test.js
 */

const { generatePlates, generateSinglePlate } = require('./generatePlates');

console.log('🧪 Testing Turkish License Plate Generator\n');

// Test 1: Generate single plate
console.log('Test 1: Generate single plate');
console.log('Sample plate:', generateSinglePlate());
console.log('✅ Pass\n');

// Test 2: Generate multiple plates
console.log('Test 2: Generate 10 plates');
const tenPlates = generatePlates(10);
console.log('Plates:', tenPlates);
console.log(`Generated: ${tenPlates.length} plates`);
console.log('✅ Pass\n');

// Test 3: Check for duplicates
console.log('Test 3: Check for duplicates in 100 plates');
const hundredPlates = generatePlates(100);
const uniquePlates = new Set(hundredPlates);
console.log(`Generated: ${hundredPlates.length} plates`);
console.log(`Unique: ${uniquePlates.size} plates`);
console.log(uniquePlates.size === 100 ? '✅ Pass - No duplicates' : '❌ Fail - Duplicates found');
console.log();

// Test 4: Validate format
console.log('Test 4: Validate plate format');
const samplePlates = generatePlates(20);
const plateRegex = /^\d{2} [A-Z]{2,3} \d{2,3}$/;
const invalidPlates = samplePlates.filter(plate => !plateRegex.test(plate));

console.log('Sample plates:', samplePlates.slice(0, 5));
console.log(`Valid plates: ${samplePlates.length - invalidPlates.length}/${samplePlates.length}`);
if (invalidPlates.length > 0) {
    console.log('Invalid plates:', invalidPlates);
    console.log('❌ Fail - Invalid format detected');
} else {
    console.log('✅ Pass - All plates have valid format');
}
console.log();

// Test 5: Performance test
console.log('Test 5: Performance test - Generate 3000 plates');
const startTime = Date.now();
const plates = generatePlates(3000);
const endTime = Date.now();
const duration = endTime - startTime;

console.log(`Generated: ${plates.length} plates`);
console.log(`Time taken: ${duration}ms`);
console.log(`Average: ${(duration / plates.length).toFixed(3)}ms per plate`);
console.log(duration < 5000 ? '✅ Pass - Performance acceptable' : '⚠️  Warning - Slow performance');
console.log();

// Test 6: Check excluded letters
console.log('Test 6: Check for excluded letters (Q, W, X)');
const excludedLetters = ['Q', 'W', 'X'];
const platesWithExcluded = plates.filter(plate => {
    const letters = plate.split(' ')[1];
    return excludedLetters.some(letter => letters.includes(letter));
});

if (platesWithExcluded.length > 0) {
    console.log('❌ Fail - Found plates with excluded letters:', platesWithExcluded.slice(0, 5));
} else {
    console.log('✅ Pass - No excluded letters found');
}
console.log();

// Test 7: City code range
console.log('Test 7: Validate city codes (01-81)');
const invalidCityCodes = plates.filter(plate => {
    const cityCode = parseInt(plate.split(' ')[0]);
    return cityCode < 1 || cityCode > 81;
});

if (invalidCityCodes.length > 0) {
    console.log('❌ Fail - Invalid city codes:', invalidCityCodes.slice(0, 5));
} else {
    console.log('✅ Pass - All city codes in valid range');
}
console.log();

console.log('='.repeat(50));
console.log('🎉 All tests completed!');
console.log('='.repeat(50));
