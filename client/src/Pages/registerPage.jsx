import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

import Spinner from '../components/Spinner';

// const BASEURL = 'http://localhost:8080/api/auth/'
const BASEURL = 'https://todo-app-mern-dzti.onrender.com/api/auth'
const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async(e) => {
    setLoading(true)
    e.preventDefault()
    try {
      if (username.trim() === '' || email.trim() === '' || password === '') {
        alert('invalid field')
        setLoading(false)
        return
      }
      const res = await axios.post(`${BASEURL}/register`, {email, username, password})
      setLoading(false)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.username)
      }
      setUsername('')
      setEmail('')
      setPassword('')
      navigate('/landing-page')
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      setLoading(false)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {loading && <Spinner/>}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            Stay Organized and Productive
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. johndoe"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500">
              3–30 characters, letters/numbers/dashes only
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500">We'll never share your email.</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain 8+ characters including number, lowercase, and uppercase"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be 8+ characters with number, lowercase, and uppercase.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
