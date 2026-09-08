// Automated test suite for Home Academy Creative Visuals & Scenario Graphics System
import assert from 'assert';
import { renderRoleplayCreativeBanner, renderConceptVisual } from './js/components/creativeVisuals.js';

console.log('--- STARTING CREATIVE VISUALS & VECTOR GRAPHICS VERIFICATION ---');

// Test 1: Verify all 5 official presentations generate unique SVG vector banners without any external images
const mockRoleplays = [
  { number: '01', title: "A Friend Visits Another Friend's House", scenario: "Complimenting a home and hospitality." },
  { number: '02', title: "A Police Officer Asks Questions", scenario: "Inquiries about people and possessions." },
  { number: '03', title: "A Person Visits Friend's House and Asks About Family", scenario: "Discussing family members and careers." },
  { number: '04', title: "A Person Reports Lost Children at Police Station", scenario: "Describing clothing colors and possessions." },
  { number: '05', title: "Two Friends Talk About New School / College", scenario: "Comparing campus facilities with There is and There are." }
];

mockRoleplays.forEach(rp => {
  const cardBanner = renderRoleplayCreativeBanner(rp, false);
  const heroBanner = renderRoleplayCreativeBanner(rp, true);

  assert(cardBanner.includes('creative-scenario-banner'), `Roleplay ${rp.number} card must have creative banner container`);
  assert(cardBanner.includes('<svg'), `Roleplay ${rp.number} card must render bespoke vector SVG artwork`);
  assert(!cardBanner.includes('<img'), `Roleplay ${rp.number} card must NOT contain any <img> tags`);
  assert(!cardBanner.includes('unsplash.com'), `Roleplay ${rp.number} card must NOT reference external unsplash URLs`);

  assert(heroBanner.includes('creative-scenario-banner'), `Roleplay ${rp.number} hero must have creative banner container`);
  assert(heroBanner.includes('<svg'), `Roleplay ${rp.number} hero must render vector SVG artwork`);
  assert(!heroBanner.includes('<img'), `Roleplay ${rp.number} hero must NOT contain any <img> tags`);
});
console.log('✓ Test 1: All 5 official presentations render bespoke vector banners with zero external images.');

// Test 2: Verify specific thematic scenario elements per roleplay
const rp1Banner = renderRoleplayCreativeBanner(mockRoleplays[0], true);
assert(rp1Banner.includes('spacious room') && rp1Banner.includes('comfortable sofa'), 'RP 1 includes descriptive adjective badges');

const rp2Banner = renderRoleplayCreativeBanner(mockRoleplays[1], true);
assert(rp2Banner.includes('Who is this?') && rp2Banner.includes('Whose bag?'), 'RP 2 includes question word badges');

const rp3Banner = renderRoleplayCreativeBanner(mockRoleplays[2], true);
assert(rp3Banner.includes("father's job") && rp3Banner.includes('her sister'), 'RP 3 includes family possessive badges');

const rp4Banner = renderRoleplayCreativeBanner(mockRoleplays[3], true);
assert(rp4Banner.includes('red jacket') && rp4Banner.includes('blue backpack'), 'RP 4 includes color & descriptive badges');

const rp5Banner = renderRoleplayCreativeBanner(mockRoleplays[4], true);
assert(rp5Banner.includes('There is a library') && rp5Banner.includes('There are 40 rooms'), 'RP 5 includes singular/plural badges');
console.log('✓ Test 2: Thematic scenario badges and pedagogical vector elements confirmed for each presentation.');

// Test 3: Verify Grammar Concept Visualizer across topics
const topicsToTest = ['adjectives', 'genitive_s', 'whose', 'possessive_adj', 'what_color'];
topicsToTest.forEach(topicId => {
  const visual = renderConceptVisual(topicId, { question: 'Sample question text' });
  assert(visual.includes('creative-concept-card'), `Topic ${topicId} must render creative concept card`);
  assert(!visual.includes('<img'), `Topic ${topicId} visual must NOT contain <img> tags`);
  assert(!visual.includes('unsplash.com'), `Topic ${topicId} visual must NOT contain unsplash URLs`);
});
console.log('✓ Test 3: Grammar Concept Visualizer renders clean syntax cards with 0 image dependencies.');

console.log('\n================================================================');
console.log('🎉 ALL CREATIVE VISUAL & VECTOR GRAPHICS TESTS PASSED FLAWLESSLY!');
console.log('================================================================\n');
