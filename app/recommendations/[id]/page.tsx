import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, ThumbsUp, Award, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRestaurantById } from "@/lib/data"

export default function RecommendationsPage({ params }: { params: { id: string } }) {
  // This would normally fetch from a database
  const restaurant = getRestaurantById(params.id)

  if (!restaurant) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
        <p className="mb-8">We couldn't find recommendations for this restaurant.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="container py-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-64 md:h-80">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm font-normal">
                      {restaurant.priceRange}
                    </Badge>
                    <div className="flex items-center text-amber-400">
                      <Star className="fill-amber-400 h-4 w-4" />
                      <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                    </div>
                    <span className="text-sm text-zinc-200">({restaurant.reviewCount} reviews)</span>
                  </div>
                  <h1 className="text-3xl font-bold mb-2 drop-shadow-sm">{restaurant.name}</h1>
                  <p className="text-zinc-200 mb-4 max-w-2xl">{restaurant.address}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {restaurant.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-zinc-600 border-t border-zinc-100 pt-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-zinc-400" />
                    <span>Analysis from the last 30 days</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2 text-zinc-400" />
                    <span>{restaurant.positiveReviews}% positive mentions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden border-none shadow-sm">
              <CardContent className="p-0">
                <div className="bg-primary/5 p-4 border-b border-zinc-200">
                  <h2 className="text-lg font-semibold">About this analysis</h2>
                </div>
                <div className="p-6">
                  <p className="text-zinc-600 text-sm">
                    Our AI analyzed {restaurant.analyzedReviews} recent reviews to identify the most mentioned and
                    highly rated dishes at {restaurant.name}.
                  </p>
                  <div className="mt-4 pt-4 border-t border-dashed border-zinc-200">
                    <div className="text-xs text-zinc-500">Last updated: {new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" asChild>
              <Link href={restaurant.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                View on Google Maps
              </Link>
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-16 mb-8">Top recommended dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.topDishes.map((dish, index) => (
            <Card
              key={dish.name}
              className="overflow-hidden h-full border-none shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                {index === 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-500 hover:bg-amber-600 font-normal">
                      <Award className="h-3 w-3 mr-1" /> Most Popular
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-amber-500">
                    <Star className="fill-amber-500 h-4 w-4" />
                    <span className="ml-1 text-sm font-medium">{dish.rating}</span>
                  </div>
                  <span className="text-sm text-zinc-500">({dish.mentionCount} mentions)</span>
                </div>
                <p className="text-zinc-600 text-sm mb-4">{dish.description}</p>
                <div className="text-sm text-zinc-500 border-t border-zinc-100 pt-4 mt-auto">
                  <p className="mb-2">
                    <span className="font-medium text-zinc-700">What people say:</span>
                    <span className="italic block mt-1">"{dish.reviewQuote}"</span>
                  </p>
                  <p>
                    <span className="font-medium text-zinc-700">Price:</span> {dish.price}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-zinc-200 mt-16">
        <div className="container py-8">
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span>DishDetective</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2">AI-powered dish recommendations based on real reviews.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

