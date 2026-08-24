import { useRef, useState } from 'react'
import avatar from '../assets/avatar.png'
import ClassCurrentDate from './ClassCurrentDate.jsx'
import StatelessTaskList from './StatelessTaskList.jsx'

const MAX_TASK_LENGTH = 80

const INITIAL_TASKS = [
  { id: 1, title: 'Design review', completed: true },
  { id: 2, title: 'Prepare sprint demo', completed: false },
  { id: 3, title: 'Update project plan', completed: false },
]

function StatefulTaskManager() {
  const taskInputRef = useRef(null)
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [taskTitle, setTaskTitle] = useState('')
  const [showValidationError, setShowValidationError] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const normalizedTaskTitle = taskTitle.trim()
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = totalTasks - completedTasks
  const canAddTask = normalizedTaskTitle.length > 0

  const handleTaskTitleChange = (event) => {
    const nextTitle = event.target.value

    setTaskTitle(nextTitle)

    if (nextTitle.trim()) {
      setShowValidationError(false)
    }
  }

  const handleTaskTitleBlur = () => {
    if (!taskTitle) {
      setShowValidationError(false)
      return
    }

    setShowValidationError(!normalizedTaskTitle)
  }

  const handleTaskTitleKeyDown = (event) => {
    if (event.key === 'Enter' && !canAddTask) {
      event.preventDefault()
      setShowValidationError(true)
    }
  }

  const handleAddTask = (event) => {
    event.preventDefault()

    if (!normalizedTaskTitle) {
      setShowValidationError(true)
      return
    }

    const newTask = {
      id: Date.now(),
      title: normalizedTaskTitle,
      completed: false,
    }

    setTasks((previousTasks) => [...previousTasks, newTask])
    setTaskTitle('')
    setShowValidationError(false)
    taskInputRef.current?.focus()
  }

  const handleStartAddingTask = () => {
    setShowValidationError(false)
    taskInputRef.current?.focus()
  }

  const handleToggleTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    )
  }

  const handleAppKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsProfileOpen(false)
    }
  }

  return (
    <div className="taskflow-page" onKeyDown={handleAppKeyDown}>
      <header className="app-header">
        <p className="app-header__brand">TaskFlow</p>
        <ClassCurrentDate />

        <div className="profile">
          {isProfileOpen && (
            <div
              className="profile__backdrop"
              aria-hidden="true"
              onClick={() => setIsProfileOpen(false)}
            />
          )}

          <button
            className="profile__trigger"
            type="button"
            aria-label={
              isProfileOpen ? 'Close profile preview' : 'Open profile preview'
            }
            aria-controls="profile-popover"
            aria-expanded={isProfileOpen}
            onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
          >
            <img className="profile__avatar" src={avatar} alt="" />
          </button>

          {isProfileOpen && (
            <div
              className="profile__popover"
              id="profile-popover"
              role="dialog"
              aria-label="Profile information"
            >
              <button
                className="profile__close"
                type="button"
                aria-label="Close profile preview"
                onClick={() => setIsProfileOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
              <p>
                Coming Soon <span aria-hidden="true">🙂</span>
              </p>
            </div>
          )}
        </div>
      </header>

      <main className="dashboard">
        <div className="dashboard__summary">
          <section className="stats-card" aria-labelledby="stats-title">
            <h1 className="visually-hidden" id="stats-title">
              TaskFlow task statistics
            </h1>

            <strong className="stats-card__primary-value" aria-live="polite">
              {completedTasks}
            </strong>
            <p className="stats-card__primary-label">Tasks completed</p>

            <dl className="stats-card__metrics">
              <div>
                <dt>Total</dt>
                <dd>{totalTasks}</dd>
              </div>
              <div>
                <dt>Active</dt>
                <dd>{activeTasks}</dd>
              </div>
              <div>
                <dt>Done</dt>
                <dd>{completedTasks}</dd>
              </div>
            </dl>
          </section>

          <form className="task-form" noValidate onSubmit={handleAddTask}>
            <label className="task-form__label" htmlFor="task-title">
              Add a new task
            </label>

            <div className="task-form__controls">
              <input
                ref={taskInputRef}
                className="task-form__input"
                id="task-title"
                name="taskTitle"
                type="text"
                value={taskTitle}
                placeholder="Add a new task"
                maxLength={MAX_TASK_LENGTH}
                aria-invalid={showValidationError}
                aria-describedby="task-title-feedback"
                onBlur={handleTaskTitleBlur}
                onChange={handleTaskTitleChange}
                onKeyDown={handleTaskTitleKeyDown}
              />

              <button
                className="task-form__submit"
                type="submit"
                aria-label="Add task"
                disabled={!canAddTask}
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>

            <div className="task-form__feedback-row">
              <p
                className={`task-form__feedback${
                  showValidationError ? ' task-form__feedback--error' : ''
                }`}
                id="task-title-feedback"
                role={showValidationError ? 'alert' : undefined}
              >
                {showValidationError
                  ? 'Enter a task title.'
                  : 'Press Enter to add the task'}
              </p>
              <span
                className="task-form__counter"
                aria-label={`${taskTitle.length} of ${MAX_TASK_LENGTH} characters used`}
              >
                {taskTitle.length}/{MAX_TASK_LENGTH}
              </span>
            </div>
          </form>
        </div>

        <StatelessTaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onStartAddingTask={handleStartAddingTask}
        />
      </main>

      <footer className="app-footer">
        <p>© Andrii Dolzhenko. All Rights Reserved. 2026.</p>
      </footer>
    </div>
  )
}

export default StatefulTaskManager
