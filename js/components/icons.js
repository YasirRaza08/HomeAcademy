// Home Academy - Professional SVG Icon Library
// Clean, modern, accessible vector icons replacing decorative emojis across the platform

export function createSvgIcon(svgContent, size = 20, className = '', viewBox = '0 0 24 24') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ha-icon ${className}" aria-hidden="true">${svgContent}</svg>`;
}

// Navigation & Section Icons
export function homeIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>', size, className);
}

export function dashboardIcon(size = 20, className = '') {
  return createSvgIcon('<rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect>', size, className);
}

export function bookIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>', size, className);
}

export function roleplayIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h.01"></path><path d="M12 9h.01"></path><path d="M16 9h.01"></path>', size, className);
}

export function puzzleIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M19.439 7.85c0-1.57.802-2.54 2.14-2.54V4.19c-.836 0-1.612-.224-2.268-.61-.714-.42-1.222-1.07-1.442-1.84A2.99 2.99 0 0 0 14.97 0h-1.12c0 1.338-.97 2.14-2.54 2.14-1.57 0-2.54-.802-2.54-2.14H7.65c-.004.992-.358 1.93-1.002 2.62-.68.73-1.61 1.15-2.618 1.19v1.12c1.338 0 2.14.97 2.14 2.54 0 1.57-.802 2.54-2.14 2.54v1.12c1.008.04 1.938.46 2.618 1.19.644.69.998 1.628 1.002 2.62h1.12c0-1.338.97-2.14 2.54-2.14 1.57 0 2.54.802 2.54 2.14h1.12a2.99 2.99 0 0 0 2.899-1.74c.22-.77.728-1.42 1.442-1.84.656-.386 1.432-.61 2.268-.61v-1.12c-1.338 0-2.14-.97-2.14-2.54z"></path>', size, className, '0 0 24 24');
}

export function graduationCapIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>', size, className);
}

export function trophyIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>', size, className);
}

// Media & Audio Icons
export function speakerIcon(size = 20, className = '') {
  return createSvgIcon('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>', size, className);
}

export function speakerMuteIcon(size = 20, className = '') {
  return createSvgIcon('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>', size, className);
}

export function micIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', size, className);
}

export function gamepadIcon(size = 20, className = '') {
  return createSvgIcon('<line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="6"></rect>', size, className);
}

// User & Auth Icons
export function userIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', size, className);
}

export function usersIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', size, className);
}

export function keyIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5L11 9l-1.5-1.5L8 9l-1.5-1.5L2 12l5 5 1.5-1.5L10 17l1.5-1.5L13 17l1.5-1.5L16 17l5.5-5.5a4.5 4.5 0 0 0-6.36-6.36z"></path>', size, className);
}

export function schoolIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M18 2h-3a5 5 0 0 0-5 5v14h10V4a2 2 0 0 0-2-2z"></path><path d="M10 10H6a2 2 0 0 0-2 2v9h6"></path><circle cx="14" cy="7" r="1"></circle>', size, className);
}

export function lockIcon(size = 20, className = '') {
  return createSvgIcon('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>', size, className);
}

// Action & Interface Icons
export function pencilIcon(size = 18, className = '') {
  return createSvgIcon('<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>', size, className);
}

export function trashIcon(size = 18, className = '') {
  return createSvgIcon('<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>', size, className);
}

export function refreshIcon(size = 18, className = '') {
  return createSvgIcon('<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>', size, className);
}

export function plusIcon(size = 18, className = '') {
  return createSvgIcon('<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>', size, className);
}

export function checkIcon(size = 18, className = '') {
  return createSvgIcon('<polyline points="20 6 9 17 4 12"></polyline>', size, className);
}

export function checkCircleIcon(size = 20, className = '') {
  return createSvgIcon('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>', size, className);
}

export function infoIcon(size = 18, className = '') {
  return createSvgIcon('<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>', size, className);
}

export function alertCircleIcon(size = 18, className = '') {
  return createSvgIcon('<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>', size, className);
}

export function arrowLeftIcon(size = 18, className = '') {
  return createSvgIcon('<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>', size, className);
}

export function arrowRightIcon(size = 18, className = '') {
  return createSvgIcon('<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>', size, className);
}

export function sparkIcon(size = 18, className = '') {
  return createSvgIcon('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>', size, className);
}

export function searchIcon(size = 18, className = '') {
  return createSvgIcon('<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>', size, className);
}

export function imageIcon(size = 20, className = '') {
  return createSvgIcon('<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>', size, className);
}
