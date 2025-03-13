"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getRestaurantRecommendations } from "@/lib/actions"

export default function RecommendationForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!url) {
      setError("Please enter a Google Maps URL")
      return
    }

    if (!url.includes("maps.app.goo.gl") && !url.includes("google.com/maps")) {
      setError("Please enter a valid Google Maps URL")
      return
    }

    try {
      setIsLoading(true)
      const restaurantId = await getRestaurantRecommendations(url)
      router.push(`/recommendations/${restaurantId}`)
    } catch (err) {
      setError("Failed to analyze restaurant. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Paste Google Maps link (e.g., https://maps.app.goo.gl/...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-10 h-12 border-zinc-300 focus:border-primary focus:ring-primary"
            disabled={isLoading}
          />
          {url && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              onClick={() => setUrl("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear input</span>
            </button>
          )}
        </div>
        <Button type="submit" disabled={isLoading} className="h-12 px-6 transition-all" size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Recommend dishes
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {error && <div className="absolute -bottom-6 left-0 text-red-500 text-sm mt-1 animate-fade-in">{error}</div>}

      <div className="mt-4 text-xs text-zinc-500 text-center">
        Try it with{" "}
        <button
          type="button"
          className="text-primary underline hover:text-primary/80 focus:outline-none"
          onClick={() => setUrl("https://maps.app.goo.gl/J1wfED1sCmHH7fni8")}
        >
          this example restaurant
        </button>
      </div>
    </form>
  )
}

