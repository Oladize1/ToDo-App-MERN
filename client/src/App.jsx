import { useState } from "react"
import TaskInput from "./components/TaskInput"
import LeftSide from "./components/LeftSide"
import RightSide from "./components/RightSide"
function App() {
  const [filter, setFilter] = useState({
      all: true,
      completed: false,
      unCompleted: false,
      sortByDate: false
  })

  return (
    <>
      <header className="text-center mt-7">
        <p className="text-4xl font-bold">Donezo</p>
        <p className="text-sm">Stay Organized and productive</p>
      </header>
      <main className="m-10">
          <TaskInput filter={filter}/>
          <section className="flex gap-4 w-full flex-wrap mt-7 items-center md:flex-nowrap">
            <LeftSide filter={filter} setfilter={setFilter} />
            <RightSide/>
          </section>
      </main>
    </>
  )
}

export default App
