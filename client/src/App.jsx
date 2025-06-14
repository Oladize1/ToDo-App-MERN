import React, {useEffect} from "react"
import {Routes, Route, useNavigate} from 'react-router-dom'
import Navbar from "./components/Navbar"
import HomePage from "./Pages/HomePage"
import LandingPage from "./Pages/LandingPage"
import RegisterPage from "./Pages/registerPage"
import LoginPage from "./Pages/LoginPage"
import ProtectedRoute from "./components/ProtectedRoute"
import axios from "axios"
// const BASEURL = 'http://localhost:8080/api/auth'
const BASEURL = 'https://todo-app-mern-dzti.onrender.com/api/auth'
function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    verifyUser()
  },[])

  async function verifyUser(){
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    try {
      const res = await axios.get(`${BASEURL}/verify-token`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      if (res.data.status === 200) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
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
