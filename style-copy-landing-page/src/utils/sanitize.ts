// Input sanitization utilities

export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[&]/g, '&amp;') // Escape ampersands
    .replace(/["]/g, '&quot;') // Escape quotes
    .replace(/[']/g, '&#x27;') // Escape apostrophes
    .replace(/[/]/g, '&#x2F;'); // Escape forward slashes
}

export function sanitizeEmail(email: string): string {
  return email
    .trim()
    .toLowerCase()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[&]/g, '&amp;'); // Escape ampersands
}

export function validateAndSanitizeName(name: string): string | null {
  const sanitized = sanitizeString(name);
  
  // Check for valid name patterns
  if (!/^[a-zA-Z\s'-]{2,50}$/.test(sanitized)) {
    return null;
  }
  
  return sanitized;
}

export function validateAndSanitizeEmail(email: string): string | null {
  const sanitized = sanitizeEmail(email);
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    return null;
  }
  
  return sanitized;
}

// XSS prevention
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// CSRF token generation (simple implementation)
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
} 