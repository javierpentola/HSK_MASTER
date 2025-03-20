"use client"

import { motion } from "@/lib/motion-wrapper"
import { Button } from "@/components/ui/button"
import { Heart, Coffee, Twitter, Facebook, Share2, Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

export function SupportContent() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const text = "I'm learning Chinese with HSK Master! An amazing app for mastering HSK vocabulary."
    const url = window.location.href
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }

  const shareOnFacebook = () => {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mb-12 text-center"
        >
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-black rounded-sm opacity-10"></div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-red-500 rounded-full opacity-10"></div>
          <h1 className="text-5xl font-bold mb-4 text-black dark:text-white">Support the Project</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            HSK Master is an independent project created with passion to help Mandarin Chinese students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white relative"
          >
            <div
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: BAUHAUS_COLORS.red }}
            >
              <Heart className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 uppercase">Share</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Share HSK Master with other Chinese students. Your recommendation is the best support.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                onClick={shareOnTwitter}
                className="rounded-none flex items-center justify-center gap-2 border-2 border-black dark:border-white bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </Button>

              <Button
                onClick={shareOnFacebook}
                className="rounded-none flex items-center justify-center gap-2"
                style={{ backgroundColor: BAUHAUS_COLORS.blue, color: BAUHAUS_COLORS.white }}
              >
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </Button>

              <Button
                onClick={handleCopyLink}
                className={cn(
                  "rounded-none flex items-center justify-center gap-2 transition-colors col-span-2",
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy URL</span>
                  </>
                )}
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center">
                <Share2 className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Sharing helps more people discover HSK Master
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white relative"
          >
            <div
              className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center"
              style={{ backgroundColor: BAUHAUS_COLORS.blue }}
            >
              <Coffee className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 uppercase">Buy me a coffee</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If HSK Master has been useful to you, consider supporting development with a small donation.
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <Button
                className="rounded-none"
                style={{ backgroundColor: BAUHAUS_COLORS.blue, color: BAUHAUS_COLORS.white }}
                onClick={() => window.open("https://buymeacoffee.com/jgracia", "_blank", "noopener,noreferrer")}
              >
                Donate
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 p-6 border-l-4 bg-gray-50 dark:bg-gray-800"
          style={{ borderColor: BAUHAUS_COLORS.black }}
        >
          <h3 className="text-lg font-bold mb-2 uppercase">Acknowledgements</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Special thanks to everyone who has contributed their time, knowledge, and resources to make HSK Master
            possible.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

