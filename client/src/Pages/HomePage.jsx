import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskInput from '../components/TaskInput'
import LeftSide from '../components/LeftSide'
import RightSide from '../components/RightSide'

// const BASEURL = 'http://localhost:8080'
const BASEURL = 'https://todo-app-mern-dzti.onrender.com'

function HomePage() {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    all: true,
    completed: false,
    unCompleted: false,
    sortByDate: false
  })
  const [tasks, setTasks] = useState([])

  const token = localStorage.getItem('token')

  const getTasks = async () => {
    if (!token) {
      console.error('No token found!')
      return
    }

    setLoading(true)
    try {
      const res = await axios.get(`${BASEURL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(res.data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <main className="min-h-screen px-4 py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <TaskInput getTasks={getTasks} filter={filter} />

        {loading ? (
          <div className="mt-10 text-center text-gray-500">
            <span className="text-lg font-medium animate-pulse">Loading tasks...</span>
          </div>
        ) : (
          <section className="mt-8 flex flex-col md:flex-row gap-6">
            <LeftSide tasks={tasks} getTasks={getTasks} filter={filter} setfilter={setFilter} />
            <RightSide tasks={tasks} />
          </section>
        )}
      </div>
    </main>
  )
}

export default HomePage
