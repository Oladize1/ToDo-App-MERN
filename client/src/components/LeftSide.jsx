import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from './Spinner';

import { IoFilterSharp } from "react-icons/io5";
import { BsCheck2Circle } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

// const BASEURL = 'https://todo-app-mern-dzti.onrender.com'
const BASEURL = 'http://localhost:8080'
const LeftSide = ({filter,setfilter, tasks, getTasks}) => {
const [loading, setLoading] = useState(false)
const [selectedTaskId, setSelectedTaskId] = useState(null)
const [taskToBeEdited, setTaskToBeEdited] = useState({
  task: '',
  dueDate: ''
})
const [sortOption, setSortOption] = useState('all')
const [searchTerm, setSearchTerm] = useState('')

const filteredSearch = tasks.filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()))

const token = localStorage.getItem('token')

if (!token) {
  console.error('No token found!');
  return;
}

  
  const handletoggleComplete = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.patch(`${BASEURL}/api/tasks/${id}/complete`, {} ,{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      setLoading(false)
      getTasks()
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const handleEditTask = async(e, task) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.put(`${BASEURL}/api/tasks/${selectedTaskId}`, task, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      setLoading(false)
      document.getElementById('edit_modal').close();
      getTasks()
    } catch (error) {
      console.log(error)
    }  
  }
  const handleDeleteTask = async (e, id) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.delete(`${BASEURL}/api/tasks/${id}`, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      setLoading(false)
      document.getElementById('delete_modal').close();
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  //sorting functionality
  function sortByAll() {
    setSortOption('all')
    setfilter({
      all: true,
      completed: false,
      unCompleted: false,
      sortByDate: false
    })

  }
  
  function sortByCompleted() {
    setSortOption('completed')
    setfilter({
      completed: true,
      all: false,
      unCompleted: false,
      sortByDate: false
    })
    
    
  }
   function sortByUnCompleted() {
    setSortOption('uncompleted')
    setfilter({
      all: false,
      completed: false,
      unCompleted: true,
      sortByDate: false
    })
   }

   function sortByDate() {
   setSortOption('date')
   setfilter({
      all: false,
      completed: false,
      unCompleted: false,
      sortByDate: true
   })
   }

   const getSortedTasks = () => {
    let sorted = [...filteredSearch];
    if (sortOption === 'completed') {
      sorted = sorted.filter(task => task.completed);
    } else if (sortOption === 'uncompleted') {
      sorted = sorted.filter(task => task.completed !== true);
    } else if (sortOption === 'date') {
      sorted = sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }
    return sorted;
  };
  
  
  return (
    <div className='flex flex-col gap-2 w-full md:w-3/4 '>
      {loading && <Spinner/>}
      <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box bg-white text-black rounded-2xl">
    <h3 className="font-bold text-lg">Delete Task</h3>
    <p className="py-4">Are you sure you want to delete the task with ID: {selectedTaskId}?</p>

    <div className="modal-action">
      {/* Cancel Button - outside form to prevent submission */}
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById('delete_modal').close()}
      >
        ✕
      </button>

      {/* Delete Form */}
      <form
        method="dialog"
        onSubmit={(e) => handleDeleteTask(e, selectedTaskId)}
        className="w-full flex justify-end"
      >
        <button
          type="submit"
          className="btn bg-red-600 text-white rounded-full p-6 px-10"
        >
          Delete Task
        </button>
      </form>
    </div>
  </div>
      </dialog>
        <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white text-black rounded-2xl">
    <h3 className="font-bold text-lg">Edit Task</h3>
    <div className="modal-action">
      <form method="dialog" className='w-full' onSubmit={(e) => handleEditTask(e, taskToBeEdited)}>
        <input type="text" value={taskToBeEdited.task} onChange={(e) => setTaskToBeEdited(prev => ({
          ...prev,
          task: e.target.value
        }))} className='input' placeholder='Enter a task..' />
      <input type="date" value={taskToBeEdited.dueDate} onChange={(e) =>setTaskToBeEdited(prev => ({
        ...prev,
        dueDate: e.target.value
      }))} className="input my-10" />
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <button className="btn bg-purple-700 text-white rounded-full p-6 px-10">Edit Task</button>
      </form>
    </div>
          </div>
        </dialog>
        <div className="rounded-full flex gap-1 p-4 shadow-md bg-white">
        <label className="input utline-2 outline-gray-200 w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
                </svg>
            <input type="search" required placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='outline-2 outline-gray-200' />
        </label>
        <div className="dropdown dropdown-start">
          <button 
    tabIndex={0} 
    role="button" 
    className="btn m-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium flex items-center gap-2"
  >
    <IoFilterSharp className="text-lg" /> Filter
          </button>
          <ul 
            tabIndex={0} 
            className="dropdown-content menu bg-white text-black rounded-box shadow-md w-56 p-2 space-y-1 z-10"
           >
              <li>
                <button onClick={() => sortByAll()}>All</button>
              </li>
              <li>
                <button onClick={() => sortByCompleted()}>Completed</button>
              </li>
              <li>
                <button onClick={() => sortByUnCompleted()}>Uncompleted</button>
              </li>
              <li>
                <button onClick={() => sortByDate()}>Sort by Due Date</button>
              </li>
          </ul>
        </div>

        </div>
        <div className="rounded-xl p-1 bg-white shadow-xl">
            <h2 className='flex gap-2 items-center font-bold text-2xl'><BsCheck2Circle className='text-green-400'/> Tasks</h2>
            <div className="mt-4">
            <ul className="space-y-4">
  {getSortedTasks().map((task) => (
    <li
      key={task._id}
      className="bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200"
    >
      {/* Task Content */}
      <div 
        className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1 cursor-pointer"
      >
        <p
         className={`text-base ${task.completed ? 'text-green-600 line-through' : 'text-gray-800'}`}
         onClick={(e) => handletoggleComplete(e, task._id)}
          >
          {task.text}
        </p>
        {task.dueDate && (
          <span className="text-sm font-medium text-gray-500 mt-1 sm:mt-0">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-5 text-xl text-gray-600">
        <FaPencilAlt
          className="hover:text-purple-700 transition cursor-pointer"
          onClick={() => {
            setSelectedTaskId(task._id);
            setTaskToBeEdited({
              task: task.text,
              dueDate: task.dueDate
                ? new Date(task.dueDate).toISOString().split('T')[0]
                : '',
            });
            document.getElementById('edit_modal').showModal();
          }}
        />
        <AiFillDelete
          className="hover:text-red-600 transition cursor-pointer"
          onClick={() => {
            setSelectedTaskId(task._id);
            document.getElementById('delete_modal').showModal();
          }}
        />
      </div>
    </li>
  ))}
</ul>

            </div>
        </div>
    </div>
  )
}

export default LeftSide