import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-indigo-700"
        >
          Donezo
        </motion.div>
        
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-indigo-700 hover:text-indigo-900 transition-colors duration-300"
          >
            <Link to={'/login'}>
                Login
            </Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
          >
            <Link to={'/register'}>
                Sign Up
            </Link>
          </motion.button>
        </div>
      </nav>
  )
}

export default Navbar