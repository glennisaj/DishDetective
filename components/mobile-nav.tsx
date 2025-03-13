"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
              <span>DishDetective</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-4 mt-8">
            <Link
              href="/about"
              className="px-2 py-1 text-lg text-zinc-600 hover:text-zinc-900 transition-colors"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
          </nav>
          <div className="mt-auto pt-8 border-t border-zinc-200">
            <p className="text-sm text-zinc-500">AI-powered dish recommendations</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

