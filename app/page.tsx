import Link from "next/link"
import { Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import RecommendationForm from "@/components/recommendation-form"
import MobileNav from "@/components/mobile-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Utensils className="h-5 w-5" />
            <span className="text-lg">DishDetective</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              About
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 to-zinc-50 -z-10"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-5 -z-10"></div>

          <div className="container flex flex-col items-center text-center">
            <div className="inline-block animate-fade-in-up">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6 inline-block">
                AI-Powered Recommendations
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in-up animation-delay-100">
              Discover the{" "}
              <span className="text-primary relative inline-block">
                best dishes
                <span className="absolute bottom-2 left-0 w-full h-2 bg-primary/20 -z-10 rounded"></span>
              </span>{" "}
              at any restaurant
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-zinc-600 animate-fade-in-up animation-delay-200">
              Stop guessing what to order. Our AI analyzes recent reviews to recommend the most loved dishes at any
              restaurant.
            </p>

            <div className="mt-10 w-full max-w-md animate-fade-in-up animation-delay-300">
              <RecommendationForm />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4 text-center">How it works</h2>
            <p className="text-zinc-600 text-center max-w-2xl mx-auto mb-12">
              Three simple steps to discover the best dishes at any restaurant
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-24 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-zinc-200 -z-10"></div>

              <Card className="p-8 border border-zinc-200 hover:border-zinc-300 transition-all hover:shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 ring-4 ring-white">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Paste a link</h3>
                  <p className="text-zinc-600">
                    Enter any Google Maps restaurant link to get started with your culinary exploration
                  </p>
                </div>
              </Card>

              <Card className="p-8 border border-zinc-200 hover:border-zinc-300 transition-all hover:shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 ring-4 ring-white">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI analysis</h3>
                  <p className="text-zinc-600">
                    Our AI scans recent reviews to find the most mentioned and highly rated dishes
                  </p>
                </div>
              </Card>

              <Card className="p-8 border border-zinc-200 hover:border-zinc-300 transition-all hover:shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 ring-4 ring-white">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Get recommendations</h3>
                  <p className="text-zinc-600">
                    See the top dishes with context about why they're loved by other diners
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-zinc-900 text-white">
          <div className="container text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6">Ready to discover amazing dishes?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-zinc-300">
              Join thousands of food enthusiasts who use DishDetective to find the best menu items at any restaurant.
            </p>
            <Button size="lg" className="animate-pulse-subtle">
              Try it now
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="container py-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 font-semibold">
              <Utensils className="h-5 w-5" />
              <span>DishDetective</span>
            </div>
            <p className="text-sm text-zinc-500 mt-2">AI-powered dish recommendations based on real reviews.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

