import React, {useState} from 'react'
import axios from 'axios'
import Spinner from './Spinner'

const TaskInput = ({filter}) => {
  const [task, setTask] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  
  console.log('filter in task input', filter);
  
  const handleCreateTask = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!task) {
        alert('task field cannot be empty')
        setLoading(false)
        return
      }
      await axios.post('http://localhost:8080/api/tasks/create', {task, dueDate:date})
      setTask('')
      setDate('')
      setLoading(false)
    } catch (error) {
      console.log(error);
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
      <div className="flex gap-0.5 mt-2 text-sm cursor-pointer md:gap-4">
        <p className={ filter.all ? 'bg-purple-700 text-white p-2 rounded-lg' : 'bg-gray-200 rounded-lg p-2'}>All</p>
        <p className ={ filter.completed ? 'bg-purple-700 text-white rounded-lg p-2' : 'bg-gray-200 rounded-lg p-2'}>Completed</p>
        <p className={ filter.unCompleted ? 'bg-purple-700 text-white rounded-lg p-2' : 'bg-gray-200 rounded-lg p-2'}>unCompleted</p>
        <p className={ filter.sortByDate ? 'bg-purple-700 text-white rounded-lg p-2' : 'bg-gray-200 rounded-lg p-2'}>sort by due date</p>
      </div>
    </div>
  )
}

export default TaskInput