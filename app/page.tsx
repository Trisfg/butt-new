"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const { toast } = useToast()
  const [contractAddress] = useState("Soon!")

  // Generate an array of 40 items for the background tiles
  const backgroundTiles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    // Every 5th tile is a GIF
    isGif: i % 5 === 0,
    // Each tile gets a unique image number
    imageNumber: i + 1,
  }))

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard",
        duration: 2000,
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
        duration: 2000,
      })
    }
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      {/* Background Mosaic Grid with proper aspect ratio cells */}
      <div className="absolute inset-0 grid grid-cols-2 gap-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8">
        {backgroundTiles.map((tile) => (
          <div key={tile.id} className="relative aspect-square w-full overflow-hidden">
            {tile.isGif ? (
              <img
                src={`/images/${tile.imageNumber}.gif`}
                alt={`GIF tile ${tile.imageNumber}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={`/images/${tile.imageNumber}.jpg`}
                alt={`Image tile ${tile.imageNumber}`}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="z-10 flex w-full max-w-md flex-col items-center justify-center space-y-6 px-4 text-center">
          <h1 className="text-6xl font-extrabold tracking-tighter md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-b from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              $BUTT
            </span>
          </h1>

          <p className="text-lg text-gray-200 md:text-xl">
            A timeless form of media, more than just a picture but less than a video
          </p>

          <div className="flex w-full items-center space-x-2">
            <Input value={contractAddress} readOnly className="bg-gray-800/50 border-gray-700 text-gray-200" />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="icon"
              className="border-gray-700 bg-gray-800/50 hover:bg-gray-700"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy contract address</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
