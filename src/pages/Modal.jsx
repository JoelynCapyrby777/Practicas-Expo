import { useState, useEffect } from "react"
import ReactDOM from "react-dom"

function Modal({ setShowModal, addTask, updateTask, task, setCurrentTask }) {
  const [localTask, setLocalTask] = useState(task || { title: "", description: "", status: "pending" })

  useEffect(() => {
    if (task) {
      setLocalTask(task)
    } else {
      setLocalTask({ title: "", description: "", status: "pending" })
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task) {
      updateTask(localTask)
    } else {
      addTask(localTask)
    }
    setShowModal(false)
    setCurrentTask(null)
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4">{task ? "Actualizar Tarea" : "Agregar Tarea"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Título"
              value={localTask.title}
              onChange={(e) => setLocalTask({ ...localTask, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Descripción"
              value={localTask.description}
              onChange={(e) => setLocalTask({ ...localTask, description: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={localTask.status}
              onChange={(e) => setLocalTask({ ...localTask, status: e.target.value })}
            >
              <option value="pending">Pendiente</option>
              <option value="completed">Completada</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded" type="submit">
              {task ? "Actualizar" : "Agregar"}
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              type="button"
              onClick={() => {
                setShowModal(false)
                setCurrentTask(null)
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}

export default Modal

