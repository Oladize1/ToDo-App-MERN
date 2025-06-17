import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Spinner from '../components/Spinner';

const LoginPage = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)

const navigate = useNavigate()

const BASEURL = 'https://todo-app-mern-dzti.onrender.com/api/auth'
// const BASEURL = 'http://localhost:8080/api/auth'
const handleLogin = async(e) =>{
  e.preventDefault()
  setLoading(true)
  try {
    if (email.trim() === '' || password === '') {
      alert('invalid credentials')
      return
    }
    const res = await axios.post(`${BASEURL}/login`, {email, password})
    console.log(res);
    
    setLoading(false)
    if (res.status === 200) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', res.data.username)
    }
    setEmail('')
    setPassword('')
    navigate('/landing-page')
  } catch (error) {
    console.log(error);
    alert(error?.response.data.message)
    setLoading(false)
  }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {loading && <Spinner/>}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Log in to your account
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              placeholder="mail@site.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
