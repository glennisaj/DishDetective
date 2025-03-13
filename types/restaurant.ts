// types/restaurant.ts

export interface Restaurant {
    id: string;
    name: string;
    image: string;
    priceRange: string;
    rating: number;
    reviewCount: number;
    address: string;
    tags: string[];
    positiveReviews: number;
    analyzedReviews: number;
    googleMapsUrl: string;
    topDishes: {
      name: string;
      description: string;
      sentiment: number;
      price?: string;
      mentionCount: number;
      highlights: string[];
    }[];
  }
  
  export interface Dish {
    name: string;
    image: string;
    rating: number;
    mentionCount: number;
    description: string;
    reviewQuote: string;
    price: string;
  }
  
  export interface Review {
    author_name: string;
    rating: number;
    text: string;
    time: string;
    relative_time_description: string;
  }
  
  export interface PlaceDetails {
    id: string;
    name: string;
    address: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    photoReference?: string;
    types: string[];
    googleMapsUrl: string;
  }
  
  export interface ReviewAnalysis {
    topDishes: Dish[];
    analyzedReviews: number;
    positiveReviews: number;
  }