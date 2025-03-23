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

export function AboutProject() {
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
          <div
            className="absolute -top-8 -left-8 w-16 h-16 transform rotate-45 opacity-10"
            style={{ backgroundColor: BAUHAUS_COLORS.blue }}
          ></div>
          <div
            className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full opacity-10"
            style={{ backgroundColor: BAUHAUS_COLORS.red }}
          ></div>
          <h1 className="text-5xl font-bold mb-4 text-black dark:text-white">About the Project</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Chinese Master: a specialized tool for mastering Chinese vocabulary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 border-l-4 relative"
            style={{ borderColor: BAUHAUS_COLORS.red }}
          >
            <h2 className="text-2xl font-bold mb-4 uppercase">Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Chinese Master is designed with a single purpose: to help you effectively memorize the vocabulary required
              for the HSK (Hanyu Shuiping Kaoshi) exams.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Unlike other applications that try to cover all aspects of Chinese learning, we focus exclusively on
              vocabulary, allowing you to optimally prepare for each level of the we focus exclusively on vocabulary,
              allowing you to optimally prepare for each level of the exam.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 border-l-4 relative"
            style={{ borderColor: BAUHAUS_COLORS.blue }}
          >
            <h2 className="text-2xl font-bold mb-4 uppercase">Methodology</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our application uses different interactive game modes to reinforce HSK vocabulary memorization through
              spaced repetition and active practice.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Each game mode is designed to exercise different aspects of learning: visual recognition, meaning
              association, writing, and daily challenges to maintain your motivation.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 border-l-4 mb-12"
          style={{ borderColor: BAUHAUS_COLORS.yellow }}
        >
          <h2 className="text-2xl font-bold mb-4 uppercase">Spaced Repetition</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We will soon implement a spaced repetition system based on the SM-2 algorithm, which optimizes review
            intervals to maximize long-term retention.
          </p>
          <div className="flex items-center mt-2">
            <div
              className="w-3 h-3 rounded-full mr-2 animate-pulse"
              style={{ backgroundColor: BAUHAUS_COLORS.yellow }}
            ></div>
            <p className="text-sm font-medium" style={{ color: BAUHAUS_COLORS.black }}>
              This feature is currently in development
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-4 border-t-2 border-black dark:border-white">
            <h3 className="text-lg font-bold mb-2">6 HSK levels</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Complete vocabulary for all levels of the official exam
            </p>
          </div>
          <div className="p-4 border-t-2 border-black dark:border-white">
            <h3 className="text-lg font-bold mb-2">5 game modes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Different interactive ways to practice and memorize
            </p>
          </div>
          <div className="p-4 border-t-2 border-black dark:border-white">
            <h3 className="text-lg font-bold mb-2">Bauhaus design</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Minimalist interface inspired by Bauhaus principles
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

