"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { AboutProject } from "@/components/about-project"
import { NewsContent } from "@/components/news-content"
import { SupportContent } from "@/components/support-content"
import { GameContainer } from "@/components/game-container"

// Bauhaus color palette
export const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>("home")

  return (
    <>
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main
        className="min-h-screen pt-20"
        style={{
          backgroundColor: "#F5F5F0", // Light cream background for light mode
        }}
      >
        {activeSection === "home" && (
          <>
            {/* Diagonal decorative element */}
            <div
              className="absolute top-0 right-0 w-1/3 h-screen opacity-5 transform -skew-x-12 z-0"
              style={{ backgroundColor: BAUHAUS_COLORS.blue }}
            ></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
              <header className="mb-16 pt-8">
                <div className="relative mb-6">
                  <div
                    className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-10"
                    style={{ backgroundColor: BAUHAUS_COLORS.red }}
                  ></div>
                  <div
                    className="absolute top-0 right-0 w-16 h-16 transform rotate-45 opacity-10"
                    style={{ backgroundColor: BAUHAUS_COLORS.yellow }}
                  ></div>

                  <h1
                    className="text-6xl font-bold mb-2 relative z-10 uppercase tracking-tight"
                    style={{ color: BAUHAUS_COLORS.black }}
                  >
                    HSK <span style={{ color: BAUHAUS_COLORS.red }}>Master</span>
                  </h1>

                  <div className="w-20 h-1 mb-4" style={{ backgroundColor: BAUHAUS_COLORS.black }}></div>

                  <h2 className="text-xl text-gray-700 max-w-lg">
                    Learn HSK vocabulary effectively with a modern and structured approach
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white p-6 border-l-4" style={{ borderColor: BAUHAUS_COLORS.red }}>
                    <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Vocabulary</h3>
                    <p className="text-sm text-gray-600">Over 5000 words organized by HSK levels</p>
                  </div>

                  <div className="bg-white p-6 border-l-4" style={{ borderColor: BAUHAUS_COLORS.blue }}>
                    <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Practice</h3>
                    <p className="text-sm text-gray-600">5 game modes to reinforce your learning</p>
                  </div>

                  <div className="bg-white p-6 border-l-4" style={{ borderColor: BAUHAUS_COLORS.yellow }}>
                    <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Progress</h3>
                    <p className="text-sm text-gray-600">Detailed tracking of your advancement at each level</p>
                  </div>
                </div>
              </header>

              <GameContainer />

              <section className="mb-16 pt-8 border-t-2" style={{ borderColor: BAUHAUS_COLORS.black }}>
                <div>
                  <h3
                    className="text-2xl font-bold mb-4 uppercase tracking-wide"
                    style={{ color: BAUHAUS_COLORS.black }}
                  >
                    About HSK
                  </h3>
                  <p className="text-gray-700 mb-4">
                    HSK (Hanyu Shuiping Kaoshi) is the official proficiency test for Mandarin Chinese for non-native
                    speakers.
                  </p>
                  <p className="text-gray-700">
                    It is divided into 6 levels, from HSK 1 (beginner) to HSK 6 (advanced), with specific vocabulary for
                    each level.
                  </p>
                </div>
              </section>
            </div>
          </>
        )}

        {activeSection === "about" && <AboutProject />}
        {activeSection === "news" && <NewsContent />}
        {activeSection === "support" && <SupportContent />}
      </main>
    </>
  )
}

