// Home Academy Cryptographic Hashing Utilities (SHA-256 with Salt)
// Ensures student passwords are never stored in plaintext

export function generateSalt(length = 16) {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback salt generation
  let salt = '';
  const chars = 'abcdef0123456789';
  for (let i = 0; i < length * 2; i++) {
    salt += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return salt;
}

export async function hashPassword(password, salt) {
  const salted = `${salt}:${password}`;
  const enc = new TextEncoder();
  const data = enc.encode(salted);

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Fallback simple hash for environments without crypto.subtle
  let hash = 0;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'ha_fallback_' + Math.abs(hash).toString(16);
}

export async function verifyPassword(inputPassword, storedHash, salt) {
  if (!inputPassword || !storedHash || !salt) return false;
  const inputHash = await hashPassword(inputPassword, salt);
  return inputHash === storedHash;
}
