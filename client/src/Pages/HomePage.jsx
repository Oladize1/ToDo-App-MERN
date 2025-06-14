import { useState, useEffect } from "react"
import axios from "axios"
import TaskInput from '../components/TaskInput'
import LeftSide from "../components/LeftSide"
import RightSide from "../components/RightSide"
// const BASEURL = 'https://todo-app-mern-dzti.onrender.com'
const BASEURL = 'http://localhost:8080'
function HomePage() {
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({
      all: true,
      completed: false,
      unCompleted: false,
      sortByDate: false
  })
  const [tasks, setTasks] = useState([])

  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found!');
    return;
  }
  
  async function getTasks() {
    setLoading(true)
    try {
      const getAllTask = await axios.get(`${BASEURL}/api/tasks`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      setTasks(getAllTask.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
    useEffect(() => {
      getTasks()    
    },[])

  return (
    <>
      <main className="m-4">
          <TaskInput getTasks={getTasks} filter={filter}/>
          <section className="flex gap-4 w-full flex-wrap mt-7 md:flex-nowrap">
            <LeftSide tasks={tasks} getTasks={getTasks} filter={filter} setfilter={setFilter} />
            <RightSide tasks={tasks}/>
          </section>
      </main>
    </>
  )
}

export default HomePage
