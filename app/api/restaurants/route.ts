import { NextResponse } from 'next/server';
import { extractPlaceDetails, fetchPlaceReviews, formatPlaceData } from '@/lib/maps';
import { analyzeReviews } from '@/lib/ai';
import { env } from '@/env.mjs';
import { isValidGoogleMapsUrl } from '@/lib/validation';
import { RateLimiter } from '@/app/utils/rateLimiting';

// Create a rate limiter instance
const rateLimiter = new RateLimiter(60); // 60 requests per minute

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const id = searchParams.get("id");

  console.log("Processing request for:", { url, id });

  try {
    // First, verify API keys are loaded
    if (!env.GOOGLE_MAPS_API_KEY || !env.OPENAI_API_KEY) {
      console.error('Missing required API keys');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Rate limit the request and store the result
    const result = await rateLimiter.add(async () => {
      console.log("Fetching place details...");
      let placeDetails;

      if (url) {
        // Validate URL format
        if (!isValidGoogleMapsUrl(url)) {
          throw new Error("Invalid Google Maps URL");
        }
        placeDetails = await extractPlaceDetails(url);
      } else if (id) {
        // Pass the ID directly instead of constructing a URL
        placeDetails = await extractPlaceDetails(id, true);  // Add a flag to indicate this is an ID
      } else {
        throw new Error("Either url or id parameter is required");
      }

      console.log('Place details received:', {
        id: placeDetails.id,
        name: placeDetails.name,
      });

      // Fetch reviews
      console.log('Fetching reviews...');
      const reviews = await fetchPlaceReviews(placeDetails.id);
      console.log(`Received ${reviews.length} reviews`);

      // Only proceed with AI analysis if we have reviews
      if (reviews.length === 0) {
        return formatPlaceData(placeDetails, {
          topDishes: [],
          analyzedReviewCount: 0
        });
      }

      // Analyze reviews with AI
      console.log('Starting AI analysis...');
      const analysis = await analyzeReviews(reviews);
      console.log('AI analysis complete:', analysis);

      // Format and return the data
      return formatPlaceData(placeDetails, analysis);
    });

    // Return the final response
    return NextResponse.json(result);

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process restaurant data' },
      { status: 500 }
    );
  }
}
