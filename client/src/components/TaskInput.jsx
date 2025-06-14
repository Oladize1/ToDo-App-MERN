import React, {useState} from 'react'
import axios from 'axios'
import Spinner from './Spinner'

const BASEURL = "https://todo-app-mern-dzti.onrender.com/api/tasks"
// const BASEURL = 'http://localhost:8080/api/tasks'
const TaskInput = ({filter, getTasks}) => {
  const [task, setTask] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found!');
    return;
  }
  
  const handleCreateTask = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!task) {
        alert('task field cannot be empty')
        setLoading(false)
        return
      }
      await axios.post(`${BASEURL}/create`, {task, dueDate:date}, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      setTask('')
      setDate('')
      getTasks()
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  
  return (
    <div className='mt-10 rounded-4xl shadow-xl p-10 bg-white'>
      {loading && <Spinner/>}
      <form onSubmit={handleCreateTask} className='flex flex-col items-center gap-3.5 sm:flex-row'>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task..." className='input rounded-full w-full p-4 outline-2 outline-gray-200 '/>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input outline-2 w-full outline-gray-200 rounded-full" />
      <button className="btn bg-violet-800 outline-0 text-white rounded-full py-6">+ Add Task</button>
      </form>
      <div className="flex flex-wrap gap-2 mt-2 text-sm cursor-pointer justify-start">
        <p className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter.all ? 'bg-purple-700 text-white' : 'bg-gray-200'}`}>
    All
        </p>
        <p className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter.completed ? 'bg-purple-700 text-white' : 'bg-gray-200'}`}   >
         Completed
        </p>
        <p className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter.unCompleted ? 'bg-purple-700 text-white' : 'bg-gray-200'}   `}>
        Uncompleted
        </p>
        <p className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter.sortByDate ? 'bg-purple-700 text-white' : 'bg-gray-200'}  `}>
        Sort by due date
        </p>
      </div>

    </div>
  )
}

export default TaskInput