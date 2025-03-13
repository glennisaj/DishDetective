// hooks/use-restaurant-query.ts
"use client";

import { useState, useEffect } from 'react';
import { type Restaurant } from '@/types/restaurant';

interface UseRestaurantQueryProps {
  googleMapsUrl?: string;
  restaurantId?: string;
}

interface UseRestaurantQueryResult {
  restaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
}

export function useRestaurantQuery({ googleMapsUrl, restaurantId }: UseRestaurantQueryProps): UseRestaurantQueryResult {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!googleMapsUrl && !restaurantId) {
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      
      try {
        const queryParam = googleMapsUrl 
          ? `url=${encodeURIComponent(googleMapsUrl)}`
          : `id=${encodeURIComponent(restaurantId as string)}`;
        
        const response = await fetch(`/api/restaurants?${queryParam}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        console.error("Failed to fetch restaurant data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setRestaurant(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [googleMapsUrl, restaurantId]);

  return { restaurant, isLoading, error };
}