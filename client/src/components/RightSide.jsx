import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { MdInsertChartOutlined } from "react-icons/md";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BASEURL = "https://todo-app-mern-dzti.onrender.com"

const RightSide = ({tasks}) => {
  const [quotes, setQuotes] = useState(null)
  useEffect(() => {
    getQuote()
  },[])
  
  async function getQuote() {
    try {
      const fetchQuote = await axios.get(`${BASEURL}/api/quote`)
      setQuotes(fetchQuote.data)
    } catch (error) {
      console.log(error);
    }
  }
 
  console.log(tasks);
  const done =  tasks.filter(task => task.completed === true)
  
  
  
  const progress = Math.round((done.length/tasks.length) * 100)
  console.log(progress);
  
  return (
    <div className=' w-full md:w-1/4 '>
        <div className="p-5 rounded-2xl bg-white shadow-xl mb-4 flex flex-col justify-center items-center">
          <p className='font-bold text-left flex-start flex gap-1 items-center justify-center text-xl'><MdInsertChartOutlined /> Progress Overview</p>
          <div className='my-4' style={{ width: 150, height: 150 }}>
              <CircularProgressbar
                value={progress || 0}
                text={`${progress || 0}%`}
                styles={{
                  path: {
                    stroke: '#6d28d9', // progress path color (green)
                  },
                  trail: {
                    stroke: 'lightgray', // background path color
                  },
                  text: {
                    fill: '#6d28d9', // percentage text color
                    fontSize: '18px', // adjust size of percentage text
                    fontWeight: 'bold',
                  },
                }}
              />
          </div>
          <p className='text-center'>Tasks Completed</p>
          <div className="flex gap-2 w-full my-2">
            <div className='text-center bg-green-200 rounded-2xl w-1/2 text-blue-500 p-3'>
                <p className='text-xl font-bold'>{tasks.length}</p>
                <p>Active</p>
            </div>
            <div className='text-center bg-green-200 rounded-2xl w-1/2 text-green-500 p-3'>
                <p className='text-xl font-bold'>{done.length}</p>
                <p>Done</p>
            </div>
          </div>
        </div>
          {quotes ? quotes.map(quote => (
              <div key={quote.a} className="rounded-2xl bg-gradient-to-r from-[#6d28d9] to-[#6366f1] text-white p-5">
                    <h2 className='font-bold w-full'>Daily Motivation</h2>
                    <p>{quote.q}</p>
                    <small>{quote.a}</small>
                  </div>
          )) : (
            <div className="rounded-2xl p-5 bg-purple-600">
              <div className="skeleton h-6 w-1/3 mb-2 rounded"></div>
              <div className="skeleton h-4 w-full mb-1 rounded"></div>
              <div className="skeleton h-4 w-3/4 rounded"></div>
            </div>
          )}
    </div>
  )
}

export default RightSide