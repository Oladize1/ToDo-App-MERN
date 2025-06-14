import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MdInsertChartOutlined } from 'react-icons/md'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const BASEURL = 'http://localhost:8080'

const RightSide = ({ tasks }) => {
  const [quotes, setQuotes] = useState(null)

  useEffect(() => {
    getQuote()
  }, [])

  async function getQuote() {
    try {
      const fetchQuote = await axios.get(`${BASEURL}/api/quote`)
      setQuotes(fetchQuote.data)
    } catch (error) {
      console.log(error)
    }
  }

  const done = tasks.filter((task) => task.completed === true)
  const progress = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0

  return (
    <div className="w-full md:w-1/4 flex flex-col gap-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-purple-700">
          <MdInsertChartOutlined className="text-2xl" /> Progress Overview
        </h2>

        <div className="flex justify-center my-6">
          <div style={{ width: 120, height: 120 }}>
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                pathColor: '#6d28d9',
                trailColor: '#e5e7eb',
                textColor: '#6d28d9',
                textSize: '16px',
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">Tasks Completed</p>

        <div className="mt-4 flex gap-4">
          <div className="flex-1 bg-gray-100 text-center p-3 rounded-xl border border-gray-300">
            <p className="text-xl font-bold text-purple-700">{tasks.length}</p>
            <p className="text-sm text-gray-500">Active</p>
          </div>
          <div className="flex-1 bg-gray-100 text-center p-3 rounded-xl border border-gray-300">
            <p className="text-xl font-bold text-green-600">{done.length}</p>
            <p className="text-sm text-gray-500">Done</p>
          </div>
        </div>
      </div>

      {/* Daily Motivation */}
      {quotes ? (
        quotes.map((quote, i) => (
          <div
            key={i}
            className="rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-500 text-white p-5 shadow-lg"
          >
            <h2 className="font-bold text-lg mb-2">Daily Motivation</h2>
            <p className="italic text-sm leading-relaxed">"{quote.q}"</p>
            <p className="mt-3 text-right text-sm font-semibold">– {quote.a}</p>
          </div>
        ))
      ) : (
        <div className="rounded-2xl p-5 bg-purple-600 animate-pulse shadow-md space-y-3">
          <div className="h-5 bg-purple-400 rounded w-1/3"></div>
          <div className="h-4 bg-purple-300 rounded w-full"></div>
          <div className="h-4 bg-purple-300 rounded w-3/4"></div>
        </div>
      )}
    </div>
  )
}

export default RightSide
