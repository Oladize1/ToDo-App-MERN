import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { IoFilterSharp } from 'react-icons/io5';
import { BsCheck2Circle } from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

const BASEURL = 'http://localhost:8080';

const LeftSide = ({ filter, setfilter, tasks, getTasks }) => {
  const [loading, setLoading] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskToBeEdited, setTaskToBeEdited] = useState({ task: '', dueDate: '' });
  const [sortOption, setSortOption] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  const filteredSearch = tasks.filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const handletoggleComplete = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`${BASEURL}/api/tasks/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = async (e, task) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${BASEURL}/api/tasks/${selectedTaskId}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      document.getElementById('edit_modal').close();
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.delete(`${BASEURL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      document.getElementById('delete_modal').close();
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const sortByAll = () => {
    setSortOption('all');
    setfilter({ all: true, completed: false, unCompleted: false, sortByDate: false });
  };
  const sortByCompleted = () => {
    setSortOption('completed');
    setfilter({ completed: true, all: false, unCompleted: false, sortByDate: false });
  };
  const sortByUnCompleted = () => {
    setSortOption('uncompleted');
    setfilter({ all: false, completed: false, unCompleted: true, sortByDate: false });
  };
  const sortByDate = () => {
    setSortOption('date');
    setfilter({ all: false, completed: false, unCompleted: false, sortByDate: true });
  };

  const getSortedTasks = () => {
    let sorted = [...filteredSearch];
    if (sortOption === 'completed') sorted = sorted.filter(task => task.completed);
    else if (sortOption === 'uncompleted') sorted = sorted.filter(task => !task.completed);
    else if (sortOption === 'date') {
      sorted.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
    }
    return sorted;
  };

  return (
    <div className='w-full md:w-3/4 px-4 py-6 space-y-6'>
      {loading && <Spinner />}
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
      <div className='flex gap-2 items-center'>
        <label className='input input-bordered flex items-center gap-2 rounded-full w-full'>
          <svg className='h-5 w-5 opacity-50' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-4.35-4.35M17 17A7.5 7.5 0 1012 19.5a7.5 7.5 0 005-2.5z' />
          </svg>
          <input
            type='search'
            className='grow outline-none'
            placeholder='Search tasks...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <div className='dropdown dropdown-start'>
          <button className='btn btn-sm rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-2'>
            <IoFilterSharp className='text-lg' /> Filter
          </button>
          <ul className='dropdown-content menu bg-white text-black rounded-box shadow-md w-56 p-2 space-y-1 z-10'>
            <li><button onClick={sortByAll}>All</button></li>
            <li><button onClick={sortByCompleted}>Completed</button></li>
            <li><button onClick={sortByUnCompleted}>Uncompleted</button></li>
            <li><button onClick={sortByDate}>Due Date</button></li>
          </ul>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-lg p-4'>
        <h2 className='text-2xl font-bold flex items-center gap-2 mb-4'>
          <BsCheck2Circle className='text-green-500' /> Task List
        </h2>

        <ul className='space-y-4'>
          {getSortedTasks().map(task => (
            <li
              key={task._id}
              className={`p-4 rounded-2xl shadow-sm border-l-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                task.completed ? 'bg-green-50 border-green-400' : 'bg-white border-gray-300'
              }`}
            >
              <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1'>
                <p
                  className={`font-medium cursor-pointer ${
                    task.completed ? 'line-through text-green-700' : 'text-gray-800'
                  }`}
                  onClick={(e) => handletoggleComplete(e, task._id)}
                >
                  {task.text}
                </p>
                {task.dueDate && (
                  <span className='text-sm text-gray-500'>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>

              <div className='flex gap-4 text-xl text-gray-500'>
                <FaPencilAlt
                  title='Edit'
                  className='hover:text-purple-600 cursor-pointer'
                  onClick={() => {
                    setSelectedTaskId(task._id);
                    setTaskToBeEdited({
                      task: task.text,
                      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
                    });
                    document.getElementById('edit_modal').showModal();
                  }}
                />
                <AiFillDelete
                  title='Delete'
                  className='hover:text-red-600 cursor-pointer'
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
  );
};

export default LeftSide;
