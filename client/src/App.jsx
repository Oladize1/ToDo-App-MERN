import { useState, useEffect } from "react"
import axios from "axios"
import TaskInput from "./components/TaskInput"
import LeftSide from "./components/LeftSide"
import RightSide from "./components/RightSide"
function App() {
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({
      all: true,
      completed: false,
      unCompleted: false,
      sortByDate: false
  })
  const [tasks, setTasks] = useState([])

  async function getTasks() {
    setLoading(true)
    try {
      const getAllTask = await axios.get('http://localhost:8080/api/tasks')
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
      <header className="text-center mt-7">
        <p className="text-4xl font-bold">Donezo</p>
        <p className="text-sm">Stay Organized and productive</p>
      </header>
      <main className="m-10">
          <TaskInput getTasks={getTasks} filter={filter}/>
          <section className="flex gap-4 w-full flex-wrap mt-7 md:flex-nowrap">
            <LeftSide tasks={tasks} getTasks={getTasks} filter={filter} setfilter={setFilter} />
            <RightSide tasks={tasks}/>
          </section>
      </main>
    </>
  )
}

export default App
