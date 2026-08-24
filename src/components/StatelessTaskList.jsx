function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />
    </svg>
  )
}

function StatelessTaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onStartAddingTask,
}) {
  return (
    <section className="task-list-panel" aria-labelledby="task-list-title">
      <h2 className="task-list-panel__title" id="task-list-title">
        Today&apos;s tasks
      </h2>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              className={`task-item${
                task.completed ? ' task-item--completed' : ''
              }`}
              key={task.id}
            >
              <button
                className="task-item__toggle"
                type="button"
                aria-label={`${task.completed ? 'Mark as active' : 'Mark as done'}: ${task.title}`}
                aria-pressed={task.completed}
                onClick={() => onToggleTask(task.id)}
              >
                {task.completed && <CheckIcon />}
              </button>

              <span className="task-item__title" title={task.title}>
                {task.title}
              </span>

              {task.completed && (
                <span className="task-item__status">Completed</span>
              )}

              <button
                className="task-item__delete"
                type="button"
                aria-label={`Delete task: ${task.title}`}
                onClick={() => onDeleteTask(task.id)}
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <button
            className="empty-state__action"
            type="button"
            aria-label="Add first task"
            onClick={onStartAddingTask}
          >
            <span aria-hidden="true">+</span>
          </button>
          <h3>No tasks yet</h3>
          <p>Add your first task to get started.</p>
        </div>
      )}
    </section>
  )
}

export default StatelessTaskList
