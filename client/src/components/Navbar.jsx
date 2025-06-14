import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/landing-page')
  }

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold text-indigo-700 tracking-wide"
        >
          <Link to="/">Donezo</Link>
        </motion.div>

        {/* Auth Buttons */}
        {token && user ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-indigo-600 font-semibold uppercase tracking-wide">
              {user}
            </span>
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <Link to="/login">Login</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              <Link to="/register">Sign Up</Link>
            </motion.button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
