// components/maps-api-test.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Restaurant } from '@/types/restaurant';

export default function MapsApiTest() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  const handleTest = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Test the new API endpoint
      const response = await fetch(`/api/restaurants?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      setRestaurant(data);
      
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Test Restaurant API</h2>
        <p className="text-sm text-zinc-500">
          Enter a Google Maps URL to test the restaurant API
        </p>
      </div>
      
      <div className="flex gap-3">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://maps.app.goo.gl/..."
          className="flex-1"
        />
        <Button onClick={handleTest} disabled={isLoading}>
          {isLoading ? 'Testing...' : 'Test API'}
        </Button>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}
      
      {restaurant && (
        <Card className="p-4 space-y-4">
          <h3 className="font-medium">Restaurant Details</h3>
          <div className="space-y-2">
            <img 
              src={restaurant.image} 
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h4 className="font-bold text-xl">{restaurant.name}</h4>
            <p className="text-zinc-600">{restaurant.address}</p>
            <div className="flex gap-2 text-sm">
              <span>⭐️ {restaurant.rating}</span>
              <span>•</span>
              <span>{restaurant.reviewCount} reviews</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-zinc-100 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {restaurant.topDishes.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Top Dishes</h4>
              <div className="grid gap-4 grid-cols-2">
                {restaurant.topDishes.map((dish) => (
                  <div key={dish.name} className="space-y-1">
                    <div className="font-medium">{dish.name}</div>
                    <div className="text-sm text-zinc-600">
                      Mentioned {dish.mentionCount} times
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <pre className="bg-zinc-50 p-3 rounded text-xs overflow-auto">
            {JSON.stringify(restaurant, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}