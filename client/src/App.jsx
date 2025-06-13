import React from "react"
import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import HomePage from "./Pages/HomePage"
import LandingPage from "./Pages/LandingPage"
import RegisterPage from "./Pages/registerPage"
import LoginPage from "./Pages/LoginPage"
import ProtectedRoute from "./components/ProtectedRoute"
function App() {
  return (
    <>
    <Routes>
      <Route path='/landing-page' element={<LandingPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
            <Navbar/>
            <HomePage/>
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  )
}

export default App
