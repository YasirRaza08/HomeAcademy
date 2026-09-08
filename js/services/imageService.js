// Home Academy — Contextual Image System & Service
// Provides real, high-resolution royalty-friendly educational imagery from Unsplash
// Complies with official attribution rules, includes descriptive alt text, responsive sizing, and zero-layout-shift fallbacks

// Curated Educational Visuals Catalog (Unsplash Royalty-Free)
const EDUCATIONAL_IMAGE_CATALOG = [
  // ==================== ROLEPLAY PRESENTATIONS ====================
  {
    id: 'rp_01_cover',
    roleplayId: 'rp_01',
    topic: 'Adjectives',
    context: "A Friend Visits Another Friend's House",
    concept: 'clean big living room conversation with friends',
    keywords: ['friend', 'visit', 'house', 'living room', 'clean', 'big', 'comfortable', 'welcome', 'conversation'],
    unsplashId: '1543269865-cbf427effbad',
    url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad',
    alt: 'Friends having a polite and comfortable conversation inside a clean, modern, spacious living room',
    photographer: 'Priscilla Du Preez',
    photographerUrl: 'https://unsplash.com/@priscilladupreez'
  },
  {
    id: 'rp_02_cover',
    roleplayId: 'rp_02',
    topic: 'Question Words',
    context: 'A Police Officer Asks Questions About People, Things and Possessions',
    concept: 'police officer asking questions interview room',
    keywords: ['police', 'officer', 'interview', 'question', 'jacket', 'bag', 'possession', 'desk', 'investigation'],
    unsplashId: '1455390582262-044cdead277a',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
    alt: 'Professional police consultation desk with documentation, notebook, and personal belongings being identified',
    photographer: 'King\'s Church International',
    photographerUrl: 'https://unsplash.com/@kingschurchinternational'
  },
  {
    id: 'rp_03_cover',
    roleplayId: 'rp_03',
    topic: 'Possessive Adjectives',
    context: 'A Person Visits His Friend\'s House and Asks About Family Members and Their Jobs',
    concept: 'friends talking about family members and occupations in living room',
    keywords: ['family', 'friend', 'house', 'jobs', 'occupation', 'brother', 'father', 'visit', 'living room'],
    unsplashId: '1517457373958-b7bdd4587205',
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205',
    alt: 'Friendly gathering in a warm home discussing family members, career paths, and occupations',
    photographer: 'Tyler Nix',
    photographerUrl: 'https://unsplash.com/@jtylernix'
  },
  {
    id: 'rp_04_cover',
    roleplayId: 'rp_04',
    topic: 'What Color',
    context: 'A Person Reports His Lost Children at the Police Station',
    concept: 'police station information desk parent describing clothes and details respectfully',
    keywords: ['police', 'station', 'desk', 'assistance', 'report', 'clothes', 'jacket', 'children', 'parent'],
    unsplashId: '1584467735815-f778f274e296',
    url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296',
    alt: 'Supportive official assistance and information desk at a public service station for reporting details',
    photographer: 'CDC',
    photographerUrl: 'https://unsplash.com/@cdc'
  },
  {
    id: 'rp_05_cover',
    roleplayId: 'rp_05',
    topic: 'There is There are',
    context: 'Two Friends Talk About Their New School, College or Workplace',
    concept: 'two friends discussing classrooms and modern campus library facilities',
    keywords: ['school', 'college', 'campus', 'workplace', 'friends', 'library', 'classrooms', 'facilities', 'there is', 'there are'],
    unsplashId: '1523240795612-9a054b0db644',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
    alt: 'Two university students walking through a bright modern educational campus discussing classrooms and library facilities',
    photographer: 'MD Duran',
    photographerUrl: 'https://unsplash.com/@mdduran'
  },

  // ==================== GRAMMAR & VOCABULARY CONCEPTS ====================
  // 1. Adjectives
  {
    id: 'img_adj_elephant_big',
    topic: 'Adjectives',
    concept: 'big elephant',
    keywords: ['elephant', 'big', 'huge', 'large', 'animal'],
    url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
    alt: 'A majestic large elephant standing in natural terrain illustrating the adjective big',
    photographer: 'AJ Robbie',
    photographerUrl: 'https://unsplash.com/@ajrobbie'
  },
  {
    id: 'img_adj_mouse_small',
    topic: 'Adjectives',
    concept: 'small mouse',
    keywords: ['mouse', 'small', 'tiny', 'little'],
    url: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca',
    alt: 'A tiny field mouse on grass illustrating the adjective small',
    photographer: 'Ricky Kharawala',
    photographerUrl: 'https://unsplash.com/@ricky_kharawala'
  },
  {
    id: 'img_adj_giraffe_tall',
    topic: 'Adjectives',
    concept: 'tall giraffe',
    keywords: ['giraffe', 'tall', 'height', 'neck'],
    url: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50',
    alt: 'A tall giraffe standing tall against green acacia trees illustrating the adjective tall',
    photographer: 'Vincent van Zalinge',
    photographerUrl: 'https://unsplash.com/@vincentvanzalinge'
  },
  {
    id: 'img_adj_car_fast',
    topic: 'Adjectives',
    concept: 'fast red car',
    keywords: ['car', 'fast', 'red', 'speed', 'sports'],
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    alt: 'A sleek red sports car parked on an open road illustrating the adjectives fast and red',
    photographer: 'Campbell',
    photographerUrl: 'https://unsplash.com/@campbell'
  },
  {
    id: 'img_adj_turtle_slow',
    topic: 'Adjectives',
    concept: 'slow turtle',
    keywords: ['turtle', 'tortoise', 'slow', 'speed'],
    url: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f',
    alt: 'A sea turtle swimming gently in clear blue water illustrating the adjective slow',
    photographer: 'Wexor Tmg',
    photographerUrl: 'https://unsplash.com/@wexor'
  },
  {
    id: 'img_adj_tea_hot',
    topic: 'Adjectives',
    concept: 'hot tea coffee cup',
    keywords: ['tea', 'coffee', 'hot', 'cup', 'steam', 'warm'],
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574',
    alt: 'A steaming cup of hot black tea on a wooden saucer illustrating the adjective hot',
    photographer: 'Oriol Portell',
    photographerUrl: 'https://unsplash.com/@oriolportell'
  },
  {
    id: 'img_adj_winter_cold',
    topic: 'Adjectives',
    concept: 'cold winter snow',
    keywords: ['winter', 'cold', 'snow', 'ice', 'mountain'],
    url: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22',
    alt: 'A snow-covered forest during winter illustrating the adjective cold',
    photographer: 'Galen Crout',
    photographerUrl: 'https://unsplash.com/@galencrout'
  },
  {
    id: 'img_adj_room_clean',
    topic: 'Adjectives',
    concept: 'clean tidy modern living room',
    keywords: ['living room', 'clean', 'tidy', 'spacious', 'modern', 'house'],
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    alt: 'A bright, clean, and organized living room with a comfortable sofa illustrating the adjectives clean and tidy',
    photographer: 'Kam Idris',
    photographerUrl: 'https://unsplash.com/@k_amidris'
  },

  // 2. What Color
  {
    id: 'img_col_red_car',
    topic: 'What Color',
    concept: 'red car',
    keywords: ['red', 'car', 'vehicle', 'automobile'],
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
    alt: 'A vibrant red modern car parked outdoors illustrating the color red',
    photographer: 'Martin Katler',
    photographerUrl: 'https://unsplash.com/@mkatler'
  },
  {
    id: 'img_col_blue_bicycle',
    topic: 'What Color',
    concept: 'blue bicycle',
    keywords: ['blue', 'bicycle', 'bike', 'cycle'],
    url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
    alt: 'A classic blue bicycle parked next to a wall illustrating the color blue',
    photographer: 'Katarzyna Grabowska',
    photographerUrl: 'https://unsplash.com/@kgrabowska'
  },
  {
    id: 'img_col_green_apple',
    topic: 'What Color',
    concept: 'green apple',
    keywords: ['green', 'apple', 'fruit'],
    url: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2',
    alt: 'Fresh green apples resting on a neutral table illustrating the color green',
    photographer: 'Matheus Cenali',
    photographerUrl: 'https://unsplash.com/@cenalimatheus'
  },
  {
    id: 'img_col_yellow_bus',
    topic: 'What Color',
    concept: 'yellow school bus',
    keywords: ['yellow', 'bus', 'school bus'],
    url: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6',
    alt: 'A bright yellow school bus on the road illustrating the color yellow',
    photographer: 'Mick Haupt',
    photographerUrl: 'https://unsplash.com/@mickc_h'
  },

  // 3. Whose & Possessions
  {
    id: 'img_whose_bag',
    topic: 'Whose',
    concept: 'backpack school bag possession',
    keywords: ['bag', 'backpack', 'whose', 'school bag', 'possession'],
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    alt: 'A stylish leather backpack resting on a wooden chair used for whose bag questions',
    photographer: 'Santhosh Kumar',
    photographerUrl: 'https://unsplash.com/@santhosh_kumar'
  },
  {
    id: 'img_whose_watch',
    topic: 'Whose',
    concept: 'wrist watch on table',
    keywords: ['watch', 'wristwatch', 'whose', 'accessory'],
    url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
    alt: 'An elegant wristwatch resting on a desk illustrating questions about whose watch it is',
    photographer: 'John Torcasio',
    photographerUrl: 'https://unsplash.com/@johntorcasio'
  },
  {
    id: 'img_whose_umbrella',
    topic: 'Whose',
    concept: 'black umbrella in hallway',
    keywords: ['umbrella', 'whose', 'hallway', 'rain'],
    url: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db',
    alt: 'An umbrella standing by an entryway for asking whose umbrella is this',
    photographer: 'Craig Sybert',
    photographerUrl: 'https://unsplash.com/@craig_sybert'
  },

  // 4. Possessive Adjectives
  {
    id: 'img_pos_boy_book',
    topic: 'Possessive Adjectives',
    concept: 'boy reading his book',
    keywords: ['boy', 'his', 'book', 'reading', 'student'],
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    alt: 'A young boy happily focused on his open book illustrating the possessive adjective his',
    photographer: 'Element5 Digital',
    photographerUrl: 'https://unsplash.com/@element5digital'
  },
  {
    id: 'img_pos_girl_cat',
    topic: 'Possessive Adjectives',
    concept: 'girl holding her cat pet',
    keywords: ['girl', 'her', 'cat', 'pet'],
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    alt: 'A girl holding her friendly pet cat illustrating the possessive adjective her',
    photographer: 'Jari Hytönen',
    photographerUrl: 'https://unsplash.com/@jarihytonen'
  },

  // 5. There is / There are
  {
    id: 'img_there_library',
    topic: 'There is There are',
    concept: 'modern school library there is a library',
    keywords: ['library', 'books', 'shelves', 'there is', 'school', 'study'],
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da',
    alt: 'A peaceful and spacious modern educational library with book aisles illustrating There is a library',
    photographer: 'Susan Q Yin',
    photographerUrl: 'https://unsplash.com/@susan_yin'
  },
  {
    id: 'img_there_classroom_chairs',
    topic: 'There is There are',
    concept: 'classroom desks and chairs there are three chairs',
    keywords: ['classroom', 'chairs', 'desks', 'there are', 'students', 'school'],
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b',
    alt: 'A well-arranged school classroom with rows of wooden desks and chairs illustrating There are chairs',
    photographer: 'National Cancer Institute',
    photographerUrl: 'https://unsplash.com/@nci'
  }
];

class ImageService {
  constructor() {
    this.catalog = EDUCATIONAL_IMAGE_CATALOG;
    this.cache = new Map();
  }

  /**
   * Search for a relevant educational image based on context, topic, and concept.
   * @param {Object} queryObj - { topic, context, concept, roleplayId, keywords, width }
   * @returns {Object} Image metadata object with url, alt, photographer, and attribution
   */
  getImageForContext({ topic = '', context = '', concept = '', roleplayId = '', keywords = [], width = 800 } = {}) {
    const cacheKey = `${roleplayId}_${topic}_${concept}_${width}`.toLowerCase();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // 1. Direct roleplay cover match
    if (roleplayId) {
      const rpMatch = this.catalog.find(item => item.roleplayId === roleplayId);
      if (rpMatch) {
        const result = this._formatResult(rpMatch, width);
        this.cache.set(cacheKey, result);
        return result;
      }
    }

    // 2. Tokenize search inputs
    const conceptTokens = concept.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    const contextTokens = context.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    const extraTokens = (Array.isArray(keywords) ? keywords.map(k => k.toLowerCase()) : []).filter(t => t.length > 2);

    let bestItem = null;
    let highestScore = 0;

    for (const item of this.catalog) {
      let score = 0;

      // When roleplayId is not requested, prefer dedicated concept images over general roleplay cover art
      if (!roleplayId && item.id && item.id.startsWith('img_')) {
        score += 4;
      }

      // Strong topic match
      if (topic && item.topic) {
        if (item.topic.toLowerCase() === topic.toLowerCase()) {
          score += 10;
        } else if (item.topic.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(item.topic.toLowerCase())) {
          score += 5;
        }
      }

      // Concept keywords (highest weight)
      const itemConcept = (item.concept || '').toLowerCase();
      const itemKeywords = (item.keywords || []).map(k => k.toLowerCase());

      conceptTokens.forEach(token => {
        if (itemConcept.includes(token)) score += 8;
        if (itemKeywords.some(k => k === token || k.includes(token) || token.includes(k))) score += 7;
      });

      // Context keywords
      const itemContext = (item.context || '').toLowerCase();
      contextTokens.forEach(token => {
        if (itemContext.includes(token)) score += 3;
        if (itemKeywords.some(k => k === token || k.includes(token) || token.includes(k))) score += 2;
      });

      extraTokens.forEach(token => {
        if (itemKeywords.includes(token)) score += 2;
      });

      if (score > highestScore) {
        highestScore = score;
        bestItem = item;
      }
    }

    // Default to best match or fallback catalog entry
    const chosenItem = (highestScore > 0 && bestItem) ? bestItem : this.catalog[0];
    const result = this._formatResult(chosenItem, width);
    this.cache.set(cacheKey, result);
    return result;
  }

  _formatResult(item, width) {
    const baseUrl = item.url;
    // Unsplash parameters: auto-format, crop, requested width, web quality
    const sizedUrl = baseUrl.includes('unsplash.com')
      ? `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`
      : baseUrl;

    return {
      id: item.id,
      url: sizedUrl,
      rawUrl: baseUrl,
      alt: item.alt || 'Educational contextual photo for English learning practice',
      photographer: item.photographer || 'Unsplash Contributor',
      photographerUrl: item.photographerUrl || 'https://unsplash.com',
      source: 'Unsplash',
      fallbackSvg: this.getFallbackIllustration(item.topic || 'General', item.concept || 'English Learning')
    };
  }

  /**
   * Generates a clean, accessible HTML figure with responsive aspect-ratio, lazy loading, and Unsplash attribution
   */
  renderEducationalImage(imageInfo, { aspectRatio = '16 / 9', maxHeight = '320px', className = '', showAttribution = true } = {}) {
    if (!imageInfo) return '';

    const { url, alt, photographer, photographerUrl, fallbackSvg } = imageInfo;

    return `
      <figure class="ha-educational-image ${className}" style="margin: 0 0 16px 0; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--ha-border); background: #F8FAFC;">
        <div style="position: relative; width: 100%; aspect-ratio: ${aspectRatio}; max-height: ${maxHeight}; overflow: hidden; background: #EDF2F7;">
          <img 
            src="${url}" 
            alt="${alt}" 
            loading="lazy" 
            decoding="async"
            style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s ease;"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="image-fallback-container" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: #F1F5F9; color: var(--ha-navy); padding: 20px;">
            ${fallbackSvg}
          </div>
        </div>
        ${showAttribution ? `
          <figcaption style="font-size: 0.72rem; color: var(--ha-text-muted); padding: 6px 10px; background: #FFFFFF; border-top: 1px solid var(--ha-border); display: flex; justify-content: space-between; align-items: center;">
            <span>📸 <strong>Educational Context:</strong> ${alt.length > 55 ? alt.substring(0, 52) + '...' : alt}</span>
            <span>
              Photo by <a href="${photographerUrl}?utm_source=home_academy&utm_medium=referral" target="_blank" rel="noopener noreferrer" style="color: var(--ha-navy); font-weight: 700; text-decoration: underline;">${photographer}</a> on <a href="https://unsplash.com?utm_source=home_academy&utm_medium=referral" target="_blank" rel="noopener noreferrer" style="color: var(--ha-navy); font-weight: 700;">Unsplash</a>
            </span>
          </figcaption>
        ` : ''}
      </figure>
    `;
  }

  /**
   * Generates a modern geometric SVG educational illustration fallback when offline
   */
  getFallbackIllustration(category = 'General', label = 'English Learning') {
    return `
      <svg viewBox="0 0 400 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="max-height: 180px;">
        <defs>
          <linearGradient id="haGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0A2558" />
            <stop offset="100%" stop-color="#163B7C" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#haGrad)" rx="12"/>
        <circle cx="200" cy="80" r="42" fill="rgba(255, 255, 255, 0.15)"/>
        <path d="M185 85 L200 65 L215 85 Z" fill="#F5A623"/>
        <rect x="190" y="85" width="20" height="15" fill="#FFFFFF" rx="2"/>
        <text x="200" y="145" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="700">${category}</text>
        <text x="200" y="165" text-anchor="middle" fill="#CBD5E1" font-family="system-ui, sans-serif" font-size="12">${label}</text>
      </svg>
    `;
  }
}

export const imageService = new ImageService();
export { EDUCATIONAL_IMAGE_CATALOG };
