import TaskInput from "./components/TaskInput"
import LeftSide from "./components/LeftSide"
import RightSide from "./components/RightSide"
function App() {


  return (
    <>
      <header className="text-center mt-7">
        <p className="text-4xl font-bold">Donezo</p>
        <p className="text-sm">Stay Organized and productive</p>
      </header>
      <main className="m-10">
          <TaskInput/>
          <section className="flex gap-4 flex-wrap md:flex-nowrap mt-7 items-center">
            <LeftSide />
            <RightSide />
          </section>
      </main>
    </>
  )
}

export default App
