import React  from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link, Navigate } from 'react-router-dom';

const LandingPage = () => {
  const authorized = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };

  const floatVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar/>
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col justify-center items-center p-8 text-center min-h-[70vh]"
      >
        <motion.div variants={floatVariants} animate="float">
          <motion.p 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-indigo-700 mb-2"
          >
            Donezo
          </motion.p>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-lg text-gray-600 max-w-md mb-8"
        >
          Stay organized and productive with our simple task management solution
        </motion.p>
        
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg"
        >
          {authorized && user ? <Link to={'/'}> Get Started - It's Free</Link> : <Link to={'/register'}>
          Get Started - It's Free
          </Link>}
          
        </motion.button>

        {/* Animated background elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 w-64 h-64 bg-indigo-200 rounded-full absolute -z-10"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 0.1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-32 w-32 h-32 bg-indigo-300 rounded-full absolute -z-10"
        />
      </motion.div>
    </div>
  );
};

export default LandingPage;