import { useState, useEffect } from "react"
import Modal from "./Modal"
import TaskItem from "./TaskItem"

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)

  useEffect(() => {
    // Synchronize tasks with Local Storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
    setTasks(storedTasks)
  }, [])

  useEffect(() => {
    // Save tasks to Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((t) => (t === currentTask ? updatedTask : t))
    setTasks(updatedTasks)
    setShowModal(false)
    setCurrentTask(null)
  }

  const toggleStatus = (task) => {
    const updatedTask = { ...task, status: task.status === "pending" ? "completed" : "pending" }
    updateTask(updatedTask)
  }

  const deleteTask = (task) => {
    setTasks(tasks.filter((t) => t !== task))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    return task.status === filter
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-center mb-4">Administrador de Tareas</h1>

      {/* Filter */}
      <div className="flex justify-center mb-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todas las tareas</option>
          <option value="pending">Tareas Pendientes</option>
          <option value="completed">Tareas Finalizadas</option>
        </select>
      </div>

      {/* Task list */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            toggleStatus={toggleStatus}
            deleteTask={deleteTask}
            setCurrentTask={setCurrentTask}
            setShowModal={setShowModal}
          />
        ))}
      </div>

      {/* Button to add task */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            setCurrentTask(null)
            setShowModal(true)
          }}
        >
          Agregar tarea
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          task={currentTask}
          setShowModal={setShowModal}
          addTask={addTask}
          updateTask={updateTask}
          setCurrentTask={setCurrentTask}
        />
      )}
    </div>
  )
}

export default TaskManager

