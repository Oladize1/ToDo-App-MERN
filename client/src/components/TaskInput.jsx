import React from 'react'

const TaskInput = () => {
  const handleCreateTask = () => {

  }
  return (
    <div className='mt-10 rounded-4xl shadow-xl p-10 bg-white'>
      <form onSubmit={handleCreateTask} className='flex flex-col items-center gap-3.5 sm:flex-row'>
      <input type="text" placeholder="Add a new task..." className='input rounded-full w-full p-4 outline-2 outline-gray-200 '/>
      <input type="date" className="input outline-2 outline-gray-200" />
      <button className="btn bg-violet-800 outline-0 text-white rounded-full py-6">+ Add Task</button>
      </form>
      <div className="flex gap-0.5 mt-2 text-sm cursor-pointer md:gap-4">
        <p className='bg-gray-200 p-2 rounded-lg '>All</p>
        <p className='bg-gray-200 p-2 rounded-lg'>Completed</p>
        <p className='bg-gray-200 p-2 rounded-lg'>unCompleted</p>
        <p className='bg-gray-200 p-2 rounded-lg'>sort by due date</p>
      </div>
    </div>
  )
}

export default TaskInput