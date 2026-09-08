// Home Academy - Creative Visual & Scenario Graphics System
// Replaces external stock images with bespoke, modern vector graphics,
// architectural scenario blueprints, and interactive grammatical syntax visualizers.

import {
  homeIcon,
  bookIcon,
  roleplayIcon,
  pencilIcon,
  checkCircleIcon,
  sparkIcon,
  usersIcon,
  schoolIcon,
  speakerIcon
} from './icons.js';

/**
 * Generates an ultra-modern creative vector banner for each of the 5 official class presentations
 * @param {Object} roleplay - Roleplay presentation data
 * @param {boolean} isLarge - Whether this is the top runner hero banner (true) or card thumbnail (false)
 * @returns {string} HTML string
 */
export function renderRoleplayCreativeBanner(roleplay, isLarge = false) {
  const num = String(roleplay.number || '01');
  const height = isLarge ? '210px' : '150px';

  switch (num) {
    case '01':
      return renderHouseVisitVisual(roleplay, isLarge, height);
    case '02':
      return renderPoliceInquiryVisual(roleplay, isLarge, height);
    case '03':
      return renderFamilyCareersVisual(roleplay, isLarge, height);
    case '04':
      return renderLostChildrenVisual(roleplay, isLarge, height);
    case '05':
      return renderCampusWorkplaceVisual(roleplay, isLarge, height);
    default:
      return renderGenericScenarioVisual(roleplay, isLarge, height);
  }
}

// --------------------------------------------------------------------------
// Presentation 01: A Friend Visits Another Friend's House (Adjectives)
// --------------------------------------------------------------------------
function renderHouseVisitVisual(rp, isLarge, height) {
  return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #0A2558 0%, #1E3A8A 50%, #312E81 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <!-- Subtle Architectural Blueprint Grid Overlay -->
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#FFFFFF 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>
      
      <!-- Left Content & Grammatical Highlights -->
      <div style="position: relative; z-index: 2; max-width: ${isLarge ? '560px' : '70%'};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(245, 166, 35, 0.22); border: 1px solid #F5A623; color: #F5A623; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            PHYSICAL CLASS PRESENTATION
          </span>
          <span style="color: #94A3B8; font-size: 0.75rem; font-weight: 600;">Adjectives in Daily Life</span>
        </div>

        <div style="font-size: ${isLarge ? '1.35rem' : '1.1rem'}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          Warm Hospitality & Home Description
        </div>

        <!-- Descriptive Contrast Badges -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #E2E8F0; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2);">
            ✨ spacious room
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #E2E8F0; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2);">
            🛋️ comfortable sofa
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #E2E8F0; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.2);">
            🧼 clean & tidy
          </span>
        </div>
      </div>

      <!-- Right Graphic: Architectural Modern Villa Vector Silhouette -->
      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? '130' : '90'}" height="${isLarge ? '130' : '90'}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#1E3A8A" fill-opacity="0.4" stroke="#F5A623" stroke-width="1.5" stroke-dasharray="3 3"/>
          <path d="M25 78L60 45L95 78V95H25V78Z" fill="#0A2558" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M60 30L15 70L22 76L60 42L98 76L105 70L60 30Z" fill="#F5A623"/>
          <rect x="52" y="68" width="16" height="27" rx="2" fill="#F5A623" stroke="#FFFFFF" stroke-width="1.5"/>
          <circle cx="63" cy="82" r="1.5" fill="#0A2558"/>
          <rect x="33" y="62" width="14" height="14" rx="2" fill="#FEF08A" stroke="#FFFFFF" stroke-width="1.5"/>
          <rect x="73" y="62" width="14" height="14" rx="2" fill="#FEF08A" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M40 70H44L46 76H38L40 70Z" fill="#CA8A04"/>
        </svg>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Presentation 02: Police Officer Inquiries (What, Who, Whose, Genitive 's)
// --------------------------------------------------------------------------
function renderPoliceInquiryVisual(rp, isLarge, height) {
  return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #1D4ED8 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#60A5FA 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; max-width: ${isLarge ? '560px' : '70%'};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(59, 130, 246, 0.25); border: 1px solid #60A5FA; color: #93C5FD; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            INVESTIGATION DESK
          </span>
          <span style="color: #94A3B8; font-size: 0.75rem; font-weight: 600;">Question Words & Genitive 's</span>
        </div>

        <div style="font-size: ${isLarge ? '1.35rem' : '1.1rem'}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          Police Questions & Possession
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #93C5FD; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(147,197,253,0.3);">
            🔍 Who is this?
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FCD34D; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(252,211,77,0.3);">
            ❓ Whose bag?
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #86EFAC; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(134,239,172,0.3);">
            🏷️ Ali's passport
          </span>
        </div>
      </div>

      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? '130' : '90'}" height="${isLarge ? '130' : '90'}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#1E293B" fill-opacity="0.5" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="4 4"/>
          <path d="M60 26L85 36V62C85 80 60 94 60 94C60 94 35 80 35 62V36L60 26Z" fill="#1E40AF" stroke="#60A5FA" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M60 33L80 41V60C80 74 60 86 60 86C60 86 40 74 40 60V41L60 33Z" fill="#0F172A"/>
          <polygon points="60,44 63,53 72,53 65,58 68,67 60,62 52,67 55,58 48,53 57,53" fill="#F5A623"/>
          <circle cx="60" cy="57" r="3" fill="#FFFFFF"/>
        </svg>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Presentation 03: Family Members & Careers (Possessives & Adjectives)
// --------------------------------------------------------------------------
function renderFamilyCareersVisual(rp, isLarge, height) {
  return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #064E3B 0%, #065F46 50%, #0F766E 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#34D399 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; max-width: ${isLarge ? '560px' : '70%'};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(52, 211, 153, 0.22); border: 1px solid #34D399; color: #6EE7B7; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            FAMILY & PROFESSIONS
          </span>
          <span style="color: #A7F3D0; font-size: 0.75rem; font-weight: 600;">Possessive Adjectives & Jobs</span>
        </div>

        <div style="font-size: ${isLarge ? '1.35rem' : '1.1rem'}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          Family Members & Their Careers
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #A7F3D0; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(167,243,208,0.3);">
            👨‍⚕️ my father's job
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FDE047; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(253,224,71,0.3);">
            👩‍🏫 her sister
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #BAE6FD; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(186,230,253,0.3);">
            👔 his career
          </span>
        </div>
      </div>

      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? '130' : '90'}" height="${isLarge ? '130' : '90'}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#047857" fill-opacity="0.3" stroke="#34D399" stroke-width="1.5" stroke-dasharray="3 3"/>
          <circle cx="60" cy="38" r="14" fill="#064E3B" stroke="#34D399" stroke-width="2"/>
          <path d="M55 35C55 32.2 57.2 30 60 30C62.8 30 65 32.2 65 35C65 37.8 62.8 40 60 40C57.2 40 55 37.8 55 35Z" fill="#FCD34D"/>
          <line x1="60" y1="52" x2="60" y2="65" stroke="#34D399" stroke-width="2"/>
          <line x1="38" y1="65" x2="82" y2="65" stroke="#34D399" stroke-width="2"/>
          <line x1="38" y1="65" x2="38" y2="74" stroke="#34D399" stroke-width="2"/>
          <line x1="82" y1="65" x2="82" y2="74" stroke="#34D399" stroke-width="2"/>
          <circle cx="38" cy="85" r="12" fill="#064E3B" stroke="#FDE047" stroke-width="2"/>
          <circle cx="82" cy="85" r="12" fill="#064E3B" stroke="#60A5FA" stroke-width="2"/>
        </svg>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Presentation 04: Reporting Lost Children (What Color, Possessives, Whose)
// --------------------------------------------------------------------------
function renderLostChildrenVisual(rp, isLarge, height) {
  return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #881337 0%, #9F1239 50%, #BE123C 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#FDA4AF 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; max-width: ${isLarge ? '560px' : '70%'};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(253, 164, 175, 0.22); border: 1px solid #FDA4AF; color: #FECDD3; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            OFFICIAL REPORT
          </span>
          <span style="color: #FFE4E6; font-size: 0.75rem; font-weight: 600;">Colors, Possessives & Identifiers</span>
        </div>

        <div style="font-size: ${isLarge ? '1.35rem' : '1.1rem'}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          Lost Children Identification
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FECDD3; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(254,205,211,0.3);">
            🔴 red jacket
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #93C5FD; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(147,197,253,0.3);">
            🎒 blue backpack
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FDE047; font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(253,224,71,0.3);">
            👧 their clothes
          </span>
        </div>
      </div>

      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? '130' : '90'}" height="${isLarge ? '130' : '90'}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#9F1239" fill-opacity="0.4" stroke="#FECDD3" stroke-width="1.5" stroke-dasharray="4 4"/>
          <rect x="35" y="30" width="50" height="66" rx="4" fill="#FFFFFF" stroke="#BE123C" stroke-width="2"/>
          <line x1="45" y1="44" x2="75" y2="44" stroke="#BE123C" stroke-width="3" stroke-linecap="round"/>
          <line x1="45" y1="54" x2="65" y2="54" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <line x1="45" y1="62" x2="72" y2="62" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <line x1="45" y1="70" x2="60" y2="70" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
          <circle cx="60" cy="84" r="5" fill="#BE123C"/>
        </svg>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Presentation 05: School, College or Workplace (There is vs There are)
// --------------------------------------------------------------------------
function renderCampusWorkplaceVisual(rp, isLarge, height) {
  return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #0284C7 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: absolute; inset: 0; opacity: 0.12; background-image: radial-gradient(#BAE6FD 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; max-width: ${isLarge ? '560px' : '70%'};">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: rgba(186, 230, 253, 0.22); border: 1px solid #BAE6FD; color: #E0F2FE; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
            CAMPUS & WORKPLACE
          </span>
          <span style="color: #BAE6FD; font-size: 0.75rem; font-weight: 600;">Singular vs Plural Existence</span>
        </div>

        <div style="font-size: ${isLarge ? '1.35rem' : '1.1rem'}; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 8px;">
          There is (1) vs There are (2+)
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #BAE6FD; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(186,230,253,0.3);">
            🏛️ There is a library
          </span>
          <span class="creative-badge" style="background: rgba(255,255,255,0.12); color: #FDE047; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 999px; border: 1px solid rgba(253,224,71,0.3);">
            🏢 There are 40 rooms
          </span>
        </div>
      </div>

      <div style="position: relative; z-index: 1; flex-shrink: 0; opacity: 0.92;">
        <svg width="${isLarge ? '130' : '90'}" height="${isLarge ? '130' : '90'}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="54" fill="#1D4ED8" fill-opacity="0.3" stroke="#93C5FD" stroke-width="1.5" stroke-dasharray="3 3"/>
          <polygon points="60,30 25,48 95,48" fill="#F5A623" stroke="#FFFFFF" stroke-width="1.5"/>
          <rect x="28" y="48" width="64" height="6" fill="#0A2558"/>
          <rect x="34" y="54" width="8" height="34" fill="#FFFFFF" rx="1"/>
          <rect x="50" y="54" width="8" height="34" fill="#FFFFFF" rx="1"/>
          <rect x="64" y="54" width="8" height="34" fill="#FFFFFF" rx="1"/>
          <rect x="80" y="54" width="8" height="34" fill="#FFFFFF" rx="1"/>
          <rect x="22" y="88" width="76" height="6" fill="#0A2558"/>
        </svg>
      </div>
    </div>
  `;
}

function renderGenericScenarioVisual(rp, isLarge, height) {
  return `
    <div class="creative-scenario-banner" style="height: ${height}; background: linear-gradient(135deg, #0A2558 0%, #1E3A8A 100%); position: relative; overflow: hidden; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between;">
      <div style="position: relative; z-index: 2;">
        <div style="font-size: 1.15rem; font-weight: 800; color: #FFFFFF; line-height: 1.3;">
          ${rp.title}
        </div>
        <p style="font-size: 0.85rem; color: #CBD5E1; margin: 4px 0 0;">
          ${rp.scenario || 'Official Physical Class Roleplay'}
        </p>
      </div>
      <div style="font-size: 2.2rem; color: #F5A623; opacity: 0.85;">
        ${roleplayIcon(36)}
      </div>
    </div>
  `;
}

/**
 * Creative Grammar Concept Visualizer for Lesson, Practice, Quiz, and Activity questions
 * Renders an educational syntax formula / rule card rather than an external stock photograph.
 * @param {string} topicId
 * @param {Object} questionObj
 * @returns {string} HTML string
 */
export function renderConceptVisual(topicId, questionObj = {}) {
  const qText = (questionObj.question || '').toLowerCase();
  
  // Topic 1: Adjectives
  if (topicId === 'adjectives' || topicId === 'topic_01') {
    let focus = 'Descriptive Adjective';
    let example = '[Subject] + is/are + [ADJECTIVE]';
    if (qText.includes('elephant') || qText.includes('size') || qText.includes('big') || qText.includes('tall')) {
      focus = 'Size & Dimension';
      example = 'Big ↔ Small • Tall ↔ Short';
    } else if (qText.includes('fast') || qText.includes('cheetah') || qText.includes('slow')) {
      focus = 'Speed & Motion';
      example = 'Fast ↔ Slow • Quick ↔ Heavy';
    } else if (qText.includes('clean') || qText.includes('room') || qText.includes('sofa') || qText.includes('house')) {
      focus = 'Room Quality';
      example = 'Spacious • Clean • Comfortable';
    }

    return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #2563EB; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #EFF6FF; color: #2563EB; font-weight: 800;">
            ${bookIcon(18)}
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.04em;">
              GRAMMAR CONCEPT: ${focus}
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              ${example}
            </div>
          </div>
        </div>
        <span class="badge" style="background: #EFF6FF; color: #2563EB; font-weight: 700; font-size: 0.75rem;">
          Adjective Rule
        </span>
      </div>
    `;
  }

  // Topic 2: Genitive 's
  if (topicId === 'genitive_s' || topicId === 'topic_02') {
    return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #D97706; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #FEF3C7; color: #D97706; font-weight: 800;">
            ’s
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #D97706; text-transform: uppercase; letter-spacing: 0.04em;">
              POSSESSION RULE: GENITIVE ’S
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              [Owner] + ’s + [Possession] (e.g. <em>Ali’s car</em>)
            </div>
          </div>
        </div>
        <span class="badge" style="background: #FEF3C7; color: #B45309; font-weight: 700; font-size: 0.75rem;">
          Ownership
        </span>
      </div>
    `;
  }

  // Topic 4: Whose
  if (topicId === 'whose' || topicId === 'topic_04') {
    return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #7C3AED; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #EDE9FE; color: #7C3AED; font-weight: 800;">
            ?
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.04em;">
              INQUIRY RULE: WHOSE (Malik Kaun Hai?)
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              Whose + [Item] + is this? → It is [Owner]’s.
            </div>
          </div>
        </div>
        <span class="badge" style="background: #EDE9FE; color: #6D28D9; font-weight: 700; font-size: 0.75rem;">
          Asking Owner
        </span>
      </div>
    `;
  }

  // Topic 5: Possessive Adjectives
  if (topicId === 'possessive_adj' || topicId === 'topic_05') {
    return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #059669; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #D1FAE5; color: #059669; font-weight: 800;">
            ${usersIcon(18)}
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.04em;">
              POSSESSIVE ADJECTIVES MATRIX
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              I → My • He → His • She → Her • They → Their
            </div>
          </div>
        </div>
        <span class="badge" style="background: #D1FAE5; color: #065F46; font-weight: 700; font-size: 0.75rem;">
          Grammar Blueprint
        </span>
      </div>
    `;
  }

  // Topic 6: What Color + Genitive
  if (topicId === 'what_color' || topicId === 'topic_06') {
    return `
      <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid #DC2626; border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: #FEE2E2; color: #DC2626; font-weight: 800;">
            🎨
          </span>
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #DC2626; text-transform: uppercase; letter-spacing: 0.04em;">
              COLOR INQUIRY & GENITIVE ’S
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
              What color is + [Owner]’s + [Noun]? → It is [Color].
            </div>
          </div>
        </div>
        <span class="badge" style="background: #FEE2E2; color: #991B1B; font-weight: 700; font-size: 0.75rem;">
          Compound Structure
        </span>
      </div>
    `;
  }

  // Generic fallback
  return `
    <div class="creative-concept-card" style="margin-bottom: 20px; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-left: 5px solid var(--ha-navy); border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 8px; background: var(--ha-navy-subtle); color: var(--ha-navy); font-weight: 800;">
          ${sparkIcon(18)}
        </span>
        <div>
          <div style="font-size: 0.72rem; font-weight: 800; color: var(--ha-navy); text-transform: uppercase; letter-spacing: 0.04em;">
            GRAMMAR EXERCISE BLUEPRINT
          </div>
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--ha-navy);">
            Analyze sentence structure & select the accurate grammatical token.
          </div>
        </div>
      </div>
      <span class="badge badge-navy" style="font-weight: 700; font-size: 0.75rem;">
        Active Drill
      </span>
    </div>
  `;
}
