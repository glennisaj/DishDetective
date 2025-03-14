import { isValidGoogleMapsUrl } from '@/lib/validation';

describe('URL Validation', () => {
  test('should accept valid Google Maps URLs', () => {
    const validUrls = [
      'https://www.google.com/maps/place/Restaurant+Name',
      'https://goo.gl/maps/abc123',
      'https://maps.app.goo.gl/abc123',
    ];

    validUrls.forEach(url => {
      expect(isValidGoogleMapsUrl(url)).toBe(true);
    });
  });

  test('should reject invalid URLs', () => {
    const invalidUrls = [
      'https://example.com',
      'not-a-url',
      'https://maps.google.com', // No place specified
      '',
      null,
      undefined,
    ];

    invalidUrls.forEach(url => {
      // @ts-ignore for null/undefined test cases
      expect(isValidGoogleMapsUrl(url)).toBe(false);
    });
  });
});