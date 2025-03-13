import { NextResponse } from 'next/server';
import { extractPlaceDetails, fetchPlaceReviews, formatPlaceData } from '@/lib/maps';
import { analyzeReviews } from '@/lib/ai';
import { env } from '@/env.mjs';

export async function GET(request: Request) {
  try {
    // First, verify API keys are loaded
    if (!env.GOOGLE_MAPS_API_KEY || !env.OPENAI_API_KEY) {
      console.error('Missing required API keys');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const id = searchParams.get('id');

    console.log('Processing request for:', { url, id });

    if (!url && !id) {
      return NextResponse.json(
        { error: 'URL or ID parameter is required' },
        { status: 400 }
      );
    }

    // Get place details
    console.log('Fetching place details...');
    const placeDetails = url 
      ? await extractPlaceDetails(url)
      : await fetchPlaceDetailsById(id!);
    
    console.log('Place details received:', {
      id: placeDetails.id,
      name: placeDetails.name,
    });

    // Fetch reviews
    console.log('Fetching reviews...');
    const reviews = await fetchPlaceReviews(placeDetails.id);
    console.log(`Received ${reviews.length} reviews:`, {
      firstReview: reviews[0],
      lastReview: reviews[reviews.length - 1]
    });

    // Only proceed with AI analysis if we have reviews
    if (reviews.length === 0) {
      console.log('No reviews available for analysis');
      return NextResponse.json(formatPlaceData(placeDetails, {
        topDishes: [],
        analyzedReviewCount: 0
      }));
    }

    // Analyze reviews with AI
    console.log('Starting AI analysis...');
    const reviewAnalysis = await analyzeReviews(reviews);
    console.log('AI analysis complete:', reviewAnalysis);

    // Format the data
    const formattedData = formatPlaceData(placeDetails, reviewAnalysis);
    console.log('Final formatted data:', formattedData);

    return NextResponse.json(formattedData);
    
  } catch (error) {
    console.error('API Route Error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch restaurant data',
        details: process.env.NODE_ENV === 'development' ? {
          message: error instanceof Error ? error.message : 'Unknown error',
          type: error instanceof Error ? error.name : 'Unknown'
        } : undefined
      },
      { status: 500 }
    );
  }
}
