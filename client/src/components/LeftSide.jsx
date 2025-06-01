import React from 'react'
import { IoFilterSharp } from "react-icons/io5";
import { BsCheck2Circle } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const LeftSide = () => {
  return (
    <div className='flex flex-col gap-2 w-3/4'>
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
            <input type="search" required placeholder="Search" className='outline-2 outline-gray-200' />
        </label>
        <div className="dropdown dropdown-start">
            <div tabIndex={0} role="button" className="btn m-1 rounded-full outline-0 bg-gray-200"><IoFilterSharp/> Filter</div>
            <ul tabIndex={0} className="dropdown-content menu bg-gray-200  rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </div>
        </div>
        <div className="rounded-xl p-4 bg-white shadow-xl">
            <h2 className='flex gap-2 items-center font-bold text-2xl'><BsCheck2Circle className='text-green-400'/> Tasks</h2>
            <div className="mt-4">
                <ul className='flex flex-col gap-4'>
                    <li className="rounded-full p-4 flex justify-between items-center bg-gray-300 cursor-pointer">
                        hello world
                        <div className='flex gap-4 items-center'>
                            <FaPencilAlt/>
                            <AiFillDelete/>
                        </div>
                    </li>
                    <li className="rounded-full p-4 flex justify-between items-center bg-gray-300 cursor-pointer">
                        hello world
                        <div className='flex gap-4 items-center'>
                            <FaPencilAlt/>
                            <AiFillDelete/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default LeftSide