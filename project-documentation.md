# Project Structure Documentation

## Application Overview
A Next.js application that appears to be a restaurant recommendation system called "DishDetective" that provides AI-powered dish recommendations based on user reviews.

## Folder Structure

### `/app` Directory
The main application directory using Next.js 13+ App Router.


#### Key Features of `recommendations/[id]/page.tsx`:
- Dynamic routing using `[id]` parameter
- Restaurant details display with image hero section
- Price range and rating information
- Tag system for restaurant categories
- Top dishes recommendations with images and reviews
- Responsive layout using grid system
- Share functionality
- Google Maps integration

### `/components` Directory
Custom UI components (based on imports)
/components
└── ui
├── button.tsx # Custom button component
├── card.tsx # Card container component
└── badge.tsx # Badge component for tags/labels


### `/lib` Directory
Utility functions and data handling

/lib
└── data.ts # Contains getRestaurantById function

## Data Structure

### Restaurant Object Schema
typescript
interface Restaurant {
id: string
name: string
image: string
priceRange: string
rating: number
reviewCount: number
address: string
tags: string[]
positiveReviews: number
analyzedReviews: number
googleMapsUrl: string
topDishes: Dish[]


### Dish Object Schema
typescript
interface Dish {
name: string
image: string
rating: number
mentionCount: number
description: string
reviewQuote: string
price: string
}


## UI Components Used

### Layout Components
- Responsive grid system
- Header with navigation
- Main content area
- Footer with branding

### Interactive Elements
- Back to home button
- Share button
- Google Maps link
- Restaurant tags
- Dish cards

### Visual Elements
- Image components with overlay effects
- Rating displays
- Badge components
- Icons from Lucide React library

## Styling
- Uses Tailwind CSS for styling
- Responsive design with mobile-first approach
- Custom color scheme using zinc and amber colors
- Shadow utilities for depth
- Flexible grid layouts

## Features
1. **Restaurant Information Display**
   - Hero image with overlay
   - Rating and price range
   - Location information
   - Tag system

2. **Analysis Features**
   - 30-day review analysis
   - Positive mention percentage
   - Review count tracking
   - AI-powered dish recommendations

3. **Dish Recommendations**
   - Popular dish highlighting
   - Dish ratings and mention counts
   - Price information
   - User review quotes

4. **Navigation**
   - Back to home functionality
   - Share capability
   - Google Maps integration

## Dependencies
- Next.js
- Lucide React (for icons)
- Next/Image (for image optimization)
- Custom UI components
- Tailwind CSS

---

*Note: This documentation is based on the visible code from the recommendations page. Additional features and components may exist in the actual project structure.*