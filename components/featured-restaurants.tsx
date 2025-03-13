import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "@/components/icons/arrow-right"

// This would normally come from a database
const featuredRestaurants = [
  {
    id: "1",
    name: "Pasta Palace",
    location: "New York, NY",
    image: "/placeholder.svg?height=200&width=400",
    topDish: "Truffle Carbonara",
    url: "https://maps.app.goo.gl/J1wfED1sCmHH7fni8",
    tags: ["Italian", "Pasta", "Wine"],
  },
  {
    id: "2",
    name: "Sushi Supreme",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=200&width=400",
    topDish: "Omakase Set",
    url: "https://maps.app.goo.gl/example2",
    tags: ["Japanese", "Sushi", "Seafood"],
  },
  {
    id: "3",
    name: "Taco Temple",
    location: "Austin, TX",
    image: "/placeholder.svg?height=200&width=400",
    topDish: "Birria Tacos",
    url: "https://maps.app.goo.gl/example3",
    tags: ["Mexican", "Tacos", "Cocktails"],
  },
]

export default function FeaturedRestaurants() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredRestaurants.map((restaurant) => (
        <Card key={restaurant.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          </div>
          <CardContent className="p-5">
            <h3 className="text-xl font-semibold mb-1">{restaurant.name}</h3>
            <p className="text-zinc-500 text-sm mb-3">{restaurant.location}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {restaurant.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm mb-4">
              <span className="font-medium">Top dish:</span> {restaurant.topDish}
            </p>
            <Link
              href={`/recommendations/${restaurant.id}`}
              className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
            >
              See recommendations
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

