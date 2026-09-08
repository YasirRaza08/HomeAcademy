// Automated test suite for Home Academy Contextual Image Service
import assert from 'assert';
import { imageService, EDUCATIONAL_IMAGE_CATALOG } from './js/services/imageService.js';

console.log('--- STARTING CONTEXTUAL IMAGE SERVICE VERIFICATION ---');

// 1. Verify Catalog Completeness
assert(EDUCATIONAL_IMAGE_CATALOG.length >= 15, 'Image catalog must have rich educational photos');
const rpCovers = EDUCATIONAL_IMAGE_CATALOG.filter(item => item.roleplayId);
assert.strictEqual(rpCovers.length, 5, 'Must have dedicated cover photos for all 5 roleplays');
console.log('✓ Test 1: Image catalog contains verified educational Unsplash photos.');

// 2. Test Direct Roleplay Image Resolution
const rp1Img = imageService.getImageForContext({ roleplayId: 'rp_01' });
assert(rp1Img.url.includes('unsplash.com'), 'Roleplay 1 image must be from Unsplash');
assert(rp1Img.alt.toLowerCase().includes('living room') || rp1Img.alt.toLowerCase().includes('conversation'), 'Roleplay 1 alt must describe the scenario');
assert(rp1Img.photographer && rp1Img.photographer.length > 0, 'Must include photographer attribution');
console.log('✓ Test 2: Direct roleplay cover resolution verified.');

// 3. Test Concept-Based Search Matching
// Search: "clean big living room"
const search1 = imageService.getImageForContext({
  topic: 'Adjectives',
  context: "A friend visits another friend's house",
  concept: 'clean big living room'
});
assert(search1.url.includes('unsplash.com'), 'Found image from Unsplash');
assert(search1.alt.toLowerCase().includes('living room') || search1.alt.toLowerCase().includes('clean'), 'Found clean living room image');

// Search: "red car"
const search2 = imageService.getImageForContext({
  topic: 'What Color',
  concept: 'red car'
});
assert(search2.alt.toLowerCase().includes('red') && search2.alt.toLowerCase().includes('car'), 'Found red car image for What Color');

// Search: "elephant"
const search3 = imageService.getImageForContext({
  topic: 'Adjectives',
  concept: 'big elephant'
});
assert(search3.alt.toLowerCase().includes('elephant'), 'Found elephant photo for size adjectives');

// Search: "whose bag"
const search4 = imageService.getImageForContext({
  topic: 'Whose',
  context: 'asking about possessions',
  concept: 'person asking about a bag'
});
assert(search4.alt.toLowerCase().includes('backpack') || search4.alt.toLowerCase().includes('bag'), 'Found bag image for whose');

// Search: "there is library"
const search5 = imageService.getImageForContext({
  topic: 'There is There are',
  concept: 'modern library in school'
});
assert(search5.alt.toLowerCase().includes('library'), 'Found library photo for there is');
console.log('✓ Test 3: Intelligent concept-based contextual search verified across all grammar domains.');

// 4. Test HTML Figure Rendering & Accessibility Alt Text
const figureHtml = imageService.renderEducationalImage(search2, { aspectRatio: '16 / 9' });
assert(figureHtml.includes('<figure class="ha-educational-image'), 'Must render figure tag');
assert(figureHtml.includes('loading="lazy"'), 'Must support lazy loading');
assert(figureHtml.includes('alt="'), 'Must include descriptive alt text');
assert(figureHtml.includes('Unsplash'), 'Must include official Unsplash attribution');
console.log('✓ Test 4: HTML rendering with lazy loading, accessibility alt text, and attribution verified.');

console.log('\n======================================================');
console.log('🎉 ALL CONTEXTUAL IMAGE SERVICE TESTS PASSED!');
console.log('======================================================');
