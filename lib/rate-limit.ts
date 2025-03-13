// Simple in-memory rate limiting (for development/testing only)
const rateLimits: Record<string, number> = {};

export async function rateLimit(key: string, limit = 1000) {
  console.log(`Rate limit check for ${key}`);
  const today = new Date().toISOString().split('T')[0];
  const countKey = `${key}:${today}`;
  
  // Initialize or increment the counter
  rateLimits[countKey] = (rateLimits[countKey] || 0) + 1;
  
  // Check if limit is exceeded
  if (rateLimits[countKey] > limit) {
    throw new Error('Daily API limit exceeded');
  }
  
  return true;
}

// Note: This is a basic implementation for testing.
// For production, you should use Redis or a similar solution
// to handle rate limiting across multiple server instances.
