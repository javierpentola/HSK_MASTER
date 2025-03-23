"use client"

import { motion } from "@/lib/motion-wrapper"

// Bauhaus color palette
const BAUHAUS_COLORS = {
  black: "#000000",
  red: "#be1e2d",
  yellow: "#ffde17",
  white: "#ffffff",
  blue: "#21409a",
}

export function NewsContent() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative mb-12 text-center"
        >
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-500 rounded-sm opacity-20 transform rotate-45"></div>
          <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-500 rounded-full opacity-20"></div>
          <h1 className="text-6xl font-bold text-center relative z-10 text-black dark:text-white uppercase tracking-wide">
            Project News
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Updates and development roadmap for Chinese Master
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white relative mb-10"
        >
          <div className="absolute -top-4 -left-4 w-8 h-8" style={{ backgroundColor: BAUHAUS_COLORS.red }}></div>
          <div
            className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full"
            style={{ backgroundColor: BAUHAUS_COLORS.blue }}
          ></div>

          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide relative inline-block">
            Current Version: Beta
            <div
              className="absolute bottom-0 left-0 h-3 w-full"
              style={{ backgroundColor: BAUHAUS_COLORS.yellow, zIndex: -1 }}
            ></div>
          </h2>

          <p className="text-lg mb-6">
            Welcome to the beta version of Chinese Master! This application is currently in its early stages of
            development, offering basic functionality to help you learn Chinese vocabulary through various interactive
            game modes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="border-l-4 p-4" style={{ borderColor: BAUHAUS_COLORS.blue }}>
              <h3 className="text-xl font-bold mb-3 uppercase">What's Available Now</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-4 h-4 mt-1 mr-2" style={{ backgroundColor: BAUHAUS_COLORS.yellow }}></div>
                  <span>Flashcards, Quiz, Matching, and Writing game modes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 mt-1 mr-2" style={{ backgroundColor: BAUHAUS_COLORS.yellow }}></div>
                  <span>Complete HSK vocabulary sets for levels 1-4</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 mt-1 mr-2" style={{ backgroundColor: BAUHAUS_COLORS.yellow }}></div>
                  <span>Bauhaus-inspired design for an engaging learning experience</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 p-4" style={{ borderColor: BAUHAUS_COLORS.red }}>
              <h3 className="text-xl font-bold mb-3 uppercase">Coming Soon</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div
                    className="w-4 h-4 mt-1 mr-2 rounded-full"
                    style={{ backgroundColor: BAUHAUS_COLORS.blue }}
                  ></div>
                  <span>User accounts and progress tracking</span>
                </li>
                <li className="flex items-start">
                  <div
                    className="w-4 h-4 mt-1 mr-2 rounded-full"
                    style={{ backgroundColor: BAUHAUS_COLORS.blue }}
                  ></div>
                  <span>Spaced repetition system for optimized learning</span>
                </li>
                <li className="flex items-start">
                  <div
                    className="w-4 h-4 mt-1 mr-2 rounded-full"
                    style={{ backgroundColor: BAUHAUS_COLORS.blue }}
                  ></div>
                  <span>Complete HSK vocabulary for levels 5-6</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white relative mb-10"
        >
          <div
            className="absolute -top-4 -right-4 w-8 h-8 transform rotate-45"
            style={{ backgroundColor: BAUHAUS_COLORS.yellow }}
          ></div>

          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide">Backend Development</h2>

          <p className="text-lg mb-4">
            We're currently working on developing a robust backend system that will enable:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <div
                className="w-6 h-6 mt-1 mr-3 flex items-center justify-center font-bold"
                style={{ backgroundColor: BAUHAUS_COLORS.black, color: BAUHAUS_COLORS.white }}
              >
                1
              </div>
              <div>
                <span className="font-bold">User Accounts:</span> Create your personal profile to track progress across
                devices
              </div>
            </li>
            <li className="flex items-start">
              <div
                className="w-6 h-6 mt-1 mr-3 flex items-center justify-center font-bold"
                style={{ backgroundColor: BAUHAUS_COLORS.black, color: BAUHAUS_COLORS.white }}
              >
                2
              </div>
              <div>
                <span className="font-bold">Spaced Repetition:</span> A scientifically-proven system that schedules
                reviews at optimal intervals to maximize long-term retention
              </div>
            </li>
            <li className="flex items-start">
              <div
                className="w-6 h-6 mt-1 mr-3 flex items-center justify-center font-bold"
                style={{ backgroundColor: BAUHAUS_COLORS.black, color: BAUHAUS_COLORS.white }}
              >
                3
              </div>
              <div>
                <span className="font-bold">Progress Analytics:</span> Detailed insights into your learning journey with
                personalized recommendations
              </div>
            </li>
          </ul>

          <p className="text-lg mb-4">
            We ask for your patience as we develop these features. Our goal is to create a comprehensive learning tool
            that truly helps you master Chinese vocabulary efficiently.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 border-2 border-black dark:border-white relative"
        >
          <div className="absolute -bottom-4 -left-4 w-8 h-8" style={{ backgroundColor: BAUHAUS_COLORS.blue }}></div>

          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide">Get Involved</h2>

          <p className="text-lg mb-6">
            Chinese Master is an open project, and we welcome contributions from the community! Whether you're a
            developer, designer, Chinese language teacher, or enthusiastic learner, your help would be greatly
            appreciated.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 border-t-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-2">Developers</h3>
              <p className="text-sm">Help us build the backend system or improve the frontend experience</p>
            </div>
            <div className="p-4 border-t-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-2">Language Experts</h3>
              <p className="text-sm">Contribute to vocabulary accuracy and example sentences</p>
            </div>
            <div className="p-4 border-t-2 border-black dark:border-white">
              <h3 className="text-lg font-bold mb-2">Testers</h3>
              <p className="text-sm">Provide feedback on usability and report bugs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

