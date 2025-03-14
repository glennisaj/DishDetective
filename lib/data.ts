const restaurants = [
  {
    id: "1",
    name: "Pasta Palace",
    address: "123 Main St, New York, NY 10001",
    rating: 4.7,
    reviewCount: 342,
    priceRange: "$$$",
    tags: ["Italian", "Pasta", "Wine"],
    positiveReviews: 92,
    analyzedReviews: 78,
    googleMapsUrl: "https://maps.app.goo.gl/J1wfED1sCmHH7fni8",
    image: "/placeholder.svg?height=400&width=800",
    topDishes: [
      {
        name: "Truffle Carbonara",
        description: "Handmade spaghetti with pancetta, egg yolk, pecorino cheese, and fresh black truffle",
        rating: 4.9,
        mentionCount: 42,
        price: "$24",
        reviewQuote: "The truffle carbonara is life-changing! Perfect balance of creamy and savory.",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        name: "Lobster Ravioli",
        description: "House-made ravioli filled with Maine lobster in a saffron cream sauce",
        rating: 4.8,
        mentionCount: 36,
        price: "$28",
        reviewQuote: "The lobster ravioli is a must-try. The saffron sauce is incredible!",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
        rating: 4.7,
        mentionCount: 29,
        price: "$12",
        reviewQuote: "Best tiramisu in the city, not too sweet and perfectly balanced.",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "2",
    name: "Sushi Supreme",
    address: "456 Ocean Ave, Los Angeles, CA 90001",
    rating: 4.8,
    reviewCount: 512,
    priceRange: "$$$$",
    tags: ["Japanese", "Sushi", "Seafood"],
    positiveReviews: 94,
    analyzedReviews: 103,
    googleMapsUrl: "https://maps.app.goo.gl/example2",
    image: "/placeholder.svg?height=400&width=800",
    topDishes: [
      {
        name: "Omakase Set",
        description: "Chef's selection of premium seasonal sushi and sashimi",
        rating: 4.9,
        mentionCount: 87,
        price: "$150",
        reviewQuote: "The omakase experience is worth every penny. Each piece is a work of art!",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        name: "Toro Hand Roll",
        description: "Fresh fatty tuna belly hand roll with premium rice and wasabi",
        rating: 4.8,
        mentionCount: 64,
        price: "$22",
        reviewQuote: "The toro hand roll melts in your mouth. Absolutely divine!",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        name: "Uni Ikura Don",
        description: "Sea urchin and salmon roe over sushi rice",
        rating: 4.7,
        mentionCount: 52,
        price: "$45",
        reviewQuote: "The uni ikura don is an explosion of ocean flavors. So fresh!",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
  {
    id: "3",
    name: "Taco Temple",
    address: "789 Rio Grande St, Austin, TX 78701",
    rating: 4.6,
    reviewCount: 287,
    priceRange: "$$",
    tags: ["Mexican", "Tacos", "Cocktails"],
    positiveReviews: 89,
    analyzedReviews: 65,
    googleMapsUrl: "https://maps.app.goo.gl/example3",
    image: "/placeholder.svg?height=400&width=800",
    topDishes: [
      {
        name: "Birria Tacos",
        description: "Slow-cooked beef birria tacos with consommé for dipping",
        rating: 4.9,
        mentionCount: 48,
        price: "$14",
        reviewQuote: "These birria tacos are insanely good. The consommé takes it to another level!",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        name: "Al Pastor Quesadilla",
        description: "Marinated pork al pastor with melted Oaxaca cheese in a flour tortilla",
        rating: 4.7,
        mentionCount: 36,
        price: "$12",
        reviewQuote: "The al pastor quesadilla is perfectly charred and so flavorful!",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        name: "Mezcal Margarita",
        description: "Smoky mezcal margarita with fresh lime juice and agave nectar",
        rating: 4.8,
        mentionCount: 42,
        price: "$13",
        reviewQuote: "Their mezcal margarita is the perfect balance of smoky and tangy. Dangerous!",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  },
]

export function getRestaurantById(id: string) {
  return restaurants.find((restaurant) => restaurant.id === id)
}

export function getFeaturedRestaurants() {
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    location: restaurant.address.split(", ").slice(-2).join(", "),
    image: restaurant.image,
    topDish: restaurant.topDishes[0].name,
    url: restaurant.googleMapsUrl,
    tags: restaurant.tags,
  }))
}

