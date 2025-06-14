import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const LandingPage = () => {
  const authorized = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const floatVariants = {
    float: {
      y: [-8, 8, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-purple-100 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col items-center justify-center text-center py-20 px-6 z-10 relative"
      >
        <motion.div variants={floatVariants} animate="float" className="mb-2">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-extrabold text-indigo-700 tracking-tight"
          >
            Donezo
          </motion.h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-gray-600 max-w-xl mt-4"
        >
          Stay focused, productive, and on track with our seamless task manager — simple, clean, and built for you.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8">
          <Link
            to={authorized && user ? '/' : '/register'}
            className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base font-semibold rounded-lg shadow-lg transition duration-300"
          >
            Get Started - It's Free
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating gradient bubbles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-10 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-2xl -z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 80 }}
        animate={{ opacity: 0.1, scale: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full blur-xl -z-10"
      />
    </div>
  )
}

export default LandingPage
