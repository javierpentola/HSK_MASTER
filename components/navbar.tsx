"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

interface NavbarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const navItemRefs = useRef<Array<HTMLDivElement | null>>([])

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "News", id: "news" },
    { name: "Support", id: "support" },
  ]

  // Update indicator when active section changes or page loads
  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.id === activeSection)
    if (activeIndex !== -1) {
      const activeElement = navItemRefs.current[activeIndex]
      if (activeElement) {
        updateIndicator(activeIndex)
      }
    }
  }, [activeSection, navItemRefs.current])

  // Update indicator on hover
  useEffect(() => {
    if (hoveredIndex !== null) {
      updateIndicator(hoveredIndex)
    } else {
      const activeIndex = navItems.findIndex((item) => item.id === activeSection)
      if (activeIndex !== -1) {
        updateIndicator(activeIndex)
      }
    }
  }, [hoveredIndex, activeSection])

  const updateIndicator = (index: number) => {
    const element = navItemRefs.current[index]
    if (element) {
      const { offsetLeft, offsetWidth } = element

      // Get color based on index
      let indicatorColor
      switch (index) {
        case 0:
          indicatorColor = BAUHAUS_COLORS.red
          break
        case 1:
          indicatorColor = BAUHAUS_COLORS.blue
          break
        case 2:
          indicatorColor = BAUHAUS_COLORS.yellow
          break
        case 3:
          // Color for the fourth element
          indicatorColor = BAUHAUS_COLORS.black
          break
        default:
          indicatorColor = BAUHAUS_COLORS.black
      }

      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
        backgroundColor: indicatorColor,
      })
    }
  }

  return (
    <nav
      className={cn("fixed top-0 left-0 right-0 z-50 border-b-2", "transition-colors duration-300")}
      style={{
        borderColor: BAUHAUS_COLORS.black,
        backgroundColor: BAUHAUS_COLORS.white,
      }}
    >
      {/* Decorative top stripe */}
      <div className="flex h-1.5">
        <div className="w-1/4" style={{ backgroundColor: BAUHAUS_COLORS.red }}></div>
        <div className="w-1/4" style={{ backgroundColor: BAUHAUS_COLORS.blue }}></div>
        <div className="w-1/4" style={{ backgroundColor: BAUHAUS_COLORS.yellow }}></div>
        <div className="w-1/4" style={{ backgroundColor: BAUHAUS_COLORS.black }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Bauhaus decorative elements */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 rounded-full hidden lg:block"
          style={{ backgroundColor: BAUHAUS_COLORS.red }}
        ></div>
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-4 transform rotate-45 hidden lg:block"
          style={{ backgroundColor: BAUHAUS_COLORS.blue }}
        ></div>

        <div className="flex justify-center h-16 items-center">
          {/* Logo and name */}
          <div className="flex items-center absolute left-8">
            <div className="flex items-center group cursor-pointer" onClick={() => onSectionChange("home")}>
              <div className="flex items-center">
                <div className="relative w-10 h-10 mr-3 transform transition-transform group-hover:rotate-45">
                  <div className="absolute inset-0" style={{ backgroundColor: BAUHAUS_COLORS.black }}></div>
                  <div className="absolute inset-[3px]" style={{ backgroundColor: BAUHAUS_COLORS.white }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-6 h-6 flex items-center justify-center"
                      style={{ backgroundColor: BAUHAUS_COLORS.red }}
                    >
                      <span className="text-lg font-bold" style={{ color: BAUHAUS_COLORS.white }}>
                        中
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight uppercase" style={{ color: BAUHAUS_COLORS.black }}>
                    Chinese Master
                  </span>
                  <span className="text-xs tracking-widest uppercase" style={{ color: "#666666" }}>
                    汉语水平考试
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation links - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8 relative mx-auto">
            {/* Active indicator with animation */}
            <div className="absolute bottom-3 h-0.5 transition-all duration-300 ease-out" style={indicatorStyle}></div>

            {navItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (navItemRefs.current[index] = el)}
                className="group relative py-6 cursor-pointer"
                onClick={() => onSectionChange(item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col items-center">
                  {/* Geometric indicator */}
                  <div
                    className={cn(
                      "h-1.5 w-1.5 mb-1 transition-all duration-300",
                      activeSection === item.id ? "" : "bg-transparent",
                      index === 0
                        ? "rounded-full"
                        : index === 1
                          ? ""
                          : index === 2
                            ? "transform rotate-45"
                            : "rounded-sm",
                    )}
                    style={{
                      backgroundColor:
                        activeSection === item.id
                          ? index === 0
                            ? BAUHAUS_COLORS.red
                            : index === 1
                              ? BAUHAUS_COLORS.blue
                              : index === 2
                                ? BAUHAUS_COLORS.yellow
                                : BAUHAUS_COLORS.black
                          : "transparent",
                    }}
                  ></div>

                  {/* Link text */}
                  <span
                    className="text-sm font-medium uppercase tracking-wider transition-colors duration-300"
                    style={{
                      color: activeSection === item.id ? BAUHAUS_COLORS.black : "#666666",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons - Desktop */}

          {/* Menu button - Mobile */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-none border"
              style={{
                borderColor: BAUHAUS_COLORS.black,
              }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" style={{ color: BAUHAUS_COLORS.red }} />
              ) : (
                <Menu className="h-6 w-6" style={{ color: BAUHAUS_COLORS.black }} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t-2"
          style={{
            backgroundColor: BAUHAUS_COLORS.white,
            borderColor: BAUHAUS_COLORS.black,
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "block py-3 text-base font-medium uppercase tracking-wider relative pl-10 cursor-pointer",
                )}
                style={{
                  color: activeSection === item.id ? BAUHAUS_COLORS.black : "#666666",
                }}
                onClick={() => {
                  onSectionChange(item.id)
                  setIsMenuOpen(false)
                }}
              >
                <div
                  className={cn(
                    "absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4",
                    index === 0
                      ? "rounded-full"
                      : index === 1
                        ? ""
                        : index === 2
                          ? "transform rotate-45"
                          : "rounded-sm",
                  )}
                  style={{
                    backgroundColor:
                      index === 0
                        ? BAUHAUS_COLORS.red
                        : index === 1
                          ? BAUHAUS_COLORS.blue
                          : index === 2
                            ? BAUHAUS_COLORS.yellow
                            : BAUHAUS_COLORS.black,
                  }}
                ></div>
                {item.name}
                {activeSection === item.id && (
                  <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-0.5"
                    style={{ backgroundColor: BAUHAUS_COLORS.black }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decorative bottom stripe */}
      <div className="flex h-1.5">
        <div className="w-1/4" style={{ backgroundColor: BAUHAUS_COLORS.yellow }}></div>
        <div className="w-1/4" style={{ backgroundColor: BAUHAUS_COLORS.red }}></div>
        <div className="w-1/4" style={{ backgroundColor: BAUHAUS_COLORS.blue }}></div>
        <div className="w-1/4" style={{ backgroundColor: BAUHAUS_COLORS.black }}></div>
      </div>
    </nav>
  )
}

