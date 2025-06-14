function TaskItem({ task, toggleStatus, deleteTask, setCurrentTask, setShowModal }) {
  return (
    <div className="bg-white p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="flex space-x-2">
        <button
          className={`px-2 py-1 rounded ${task.status === "pending" ? "bg-yellow-400" : "bg-green-400"}`}
          onClick={() => toggleStatus(task)}
        >
          {task.status === "pending" ? "Pendiente" : "Completada"}
        </button>
        <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => deleteTask(task)}>
          Eliminar
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={() => {
            setCurrentTask(task)
            setShowModal(true)
          }}
        >
          Editar
        </button>
      </div>
    </div>
  )
}

export default TaskItem

