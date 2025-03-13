// lib/maps.ts
import { env } from '@/env.mjs';
import { rateLimit } from '@/lib/rate-limit';

const DAILY_LIMIT = 1000; // Adjust based on your API quota

/**
 * Main function to extract restaurant details from a Google Maps URL
 */
export async function extractPlaceDetails(url: string) {
  try {
    console.log('Starting place details extraction for URL:', url);
    
    const placeId = await extractPlaceIdFromUrl(url);
    console.log('Extracted place ID:', placeId);
    
    if (!placeId) {
      throw new Error('Could not extract place ID from URL');
    }

    // Fetch place details directly
    const fields = [
      'id',
      'displayName',
      'rating',
      'formattedAddress',
      'photos',
      'priceLevel',
      'types',
      'googleMapsUri',
      'userRatingCount',
      'reviews'
    ].join(',');
    
    const apiUrl = `https://places.googleapis.com/v1/places/${placeId}`;
    console.log('Requesting from Places API URL:', apiUrl);
    
    const response = await fetch(apiUrl, { 
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': env.GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': fields
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Places API Error:', errorText);
      throw new Error(`Failed to fetch place details: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Raw place details:', data);
    
    // Return the formatted data
    return {
      id: placeId,  // Use the placeId we extracted
      name: data.displayName?.text,
      formatted_address: data.formattedAddress,
      rating: data.rating,
      user_ratings_total: data.userRatingCount,
      price_level: data.priceLevel,
      photos: data.photos?.map((photo: any) => ({
        name: photo.name
      })) || [],
      types: data.types || [],
      url: data.googleMapsUri,
      reviews: data.reviews?.map((review: any) => ({
        author_name: review.authorAttribution?.displayName || 'Anonymous',
        rating: review.rating,
        text: review.text?.text || '',
        time: review.publishTime,
        relative_time_description: review.relativePublishTimeDescription
      })) || []
    };
  } catch (error) {
    console.error('Error in extractPlaceDetails:', error);
    throw error;
  }
}

/**
 * Extract Place ID from various Google Maps URL formats
 */
export async function extractPlaceIdFromUrl(url: string): Promise<string | null> {
  try {
    console.log('Processing URL:', url);
    
    // First, get the CID from any URL format
    let cid: string | null = null;
    
    if (url.includes('maps.app.goo.gl')) {
      console.log('Resolving shortened URL...');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
        },
        redirect: 'follow'
      });
      url = response.url; // Use the expanded URL
      console.log('Resolved to:', url);
    }
    
    // Extract CID from the URL
    const cidMatch = url.match(/0x[a-fA-F0-9]+:0x[a-fA-F0-9]+/);
    if (cidMatch) {
      cid = cidMatch[0];
      console.log('Found CID:', cid);
    }
    
    // If we found a CID, convert it to a place_id
    if (cid) {
      // Use the Places API Find Place endpoint to get the place_id
      const searchUrl = `https://places.googleapis.com/v1/places:searchText`;
      const response = await fetch(searchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': env.GOOGLE_MAPS_API_KEY,
          'X-Goog-FieldMask': 'places.id'
        },
        body: JSON.stringify({
          textQuery: url // Send the full URL as the search query
        })
      });
      
      if (!response.ok) {
        console.error('Error converting CID to place_id:', await response.text());
        throw new Error('Failed to convert CID to place_id');
      }
      
      const data = await response.json();
      console.log('Search response:', data);
      
      if (data.places?.[0]?.id) {
        console.log('Found place_id:', data.places[0].id);
        return data.places[0].id;
      }
    }
    
    // If no CID found or conversion failed, try to get place_id directly
    const urlObj = new URL(url);
    const placeId = urlObj.searchParams.get('place_id');
    if (placeId) {
      console.log('Found place_id in URL:', placeId);
      return placeId;
    }
    
    console.log('No valid place identifier found in URL');
    return null;
  } catch (error) {
    console.error('Error in extractPlaceIdFromUrl:', error);
    throw error;
  }
}

/**
 * Fetch reviews using Places API (New)
 */
export async function fetchPlaceReviews(placeId: string) {
  if (!placeId) {
    console.error('No place ID provided to fetchPlaceReviews');
    return [];
  }

  try {
    await rateLimit('places-api');
    
    const fields = [
      'reviews.authorAttribution.displayName',
      'reviews.rating',
      'reviews.text',
      'reviews.publishTime',
      'reviews.relativePublishTimeDescription'
    ].join(',');
    
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    console.log('Fetching reviews from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': env.GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': fields
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Reviews API Error:', errorText);
      return []; // Return empty array instead of throwing
    }
    
    const data = await response.json();
    console.log('Raw reviews response:', data);
    
    if (!data.reviews) {
      console.log('No reviews found in response');
      return [];
    }
    
    const reviews = data.reviews.map((review: any) => ({
      author_name: review.authorAttribution?.displayName || 'Anonymous',
      rating: review.rating,
      text: review.text?.text || '',
      time: review.publishTime,
      relative_time_description: review.relativePublishTimeDescription
    }));
    
    console.log(`Transformed ${reviews.length} reviews`);
    return reviews;
  } catch (error) {
    console.error('Error fetching place reviews:', error);
    return []; // Return empty array on error
  }
}

/**
 * Get photo URL from photo reference (New Places API format)
 */
export function getPhotoUrl(photoName: string, maxWidth = 800) {
  return `https://places.googleapis.com/v1/${photoName}/media?key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&maxWidthPx=${maxWidth}`;
}

/**
 * Convert price level number to $ symbols
 */
export function getPriceRangeSymbol(priceLevel: number): string {
  if (!priceLevel && priceLevel !== 0) return 'Price not available';
  return Array(priceLevel + 1).join('$');
}

/**
 * Filter reviews by date (last X days)
 */
export function filterRecentReviews(reviews: any[], days: number) {
  const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;
  return reviews.filter(review => review.time * 1000 > cutoffTime);
}

/**
 * Format place data into a structure suitable for your application
 */
export function formatPlaceData(placeDetails: any, reviewAnalysis: any) {
  return {
    id: placeDetails.id,
    name: placeDetails.name,
    image: placeDetails.photos?.[0]?.name 
      ? getPhotoUrl(placeDetails.photos[0].name) 
      : '/placeholder-restaurant.jpg',
    priceRange: getPriceRangeSymbol(placeDetails.price_level),
    rating: placeDetails.rating,
    reviewCount: placeDetails.user_ratings_total,
    address: placeDetails.formatted_address,
    tags: placeDetails.types
      ?.filter((type: string) => !type.includes('establishment') && !type.includes('point_of_interest'))
      .map((type: string) => type.replace(/_/g, ' ')) ?? [],
    googleMapsUrl: placeDetails.url,
    topDishes: reviewAnalysis.topDishes,
    analyzedReviews: reviewAnalysis.analyzedReviewCount,
    positiveReviews: reviewAnalysis.topDishes.reduce(
      (count: number, dish: any) => count + (dish.sentiment > 0 ? 1 : 0), 
      0
    )
  };
}

export async function fetchPlaceDetailsById(placeId: string) {
  await rateLimit('places-api');
  
  // Similar to your existing fetchPlaceDetails function
  const fields = [/* your fields */];
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${env.GOOGLE_MAPS_API_KEY}`;
  
  // ... rest of the implementation
}

// Verify your API key is being loaded correctly
console.log('API Key length:', env.GOOGLE_MAPS_API_KEY.length);
// Don't log the actual key, just its length for security