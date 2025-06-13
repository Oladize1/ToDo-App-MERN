import React from 'react';
import { Link } from 'react-router-dom'; // Optional: Only if using React Router

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Log in to your account
        </p>

        <form className="mt-8 space-y-6">
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
