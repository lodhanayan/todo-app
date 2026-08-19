import { useState, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'todocicdapp-todos'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleAdd = (e) => {
    e.preventDefault()
    const title = inputValue.trim()
    if (!title) return
    setTodos([...todos, { id: generateId(), title, completed: false }])
    setInputValue('')
  }

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>ToDo App</h1>
      </header>
      <main className="app-main">
        <form className="todo-form" onSubmit={handleAdd}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Title"
            className="todo-input"
          />
          <button type="submit" className="todo-add-btn" disabled={!inputValue.trim()}>
            ADD TASK
          </button>
        </form>
        <h2 className="todo-list-header">Existing Tasks</h2>
        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="todo-empty">No todos yet. Add one above!</li>
          ) : (
            todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed-item' : ''}`}>
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className={todo.completed ? 'todo-title completed' : 'todo-title'}>
                    {todo.title}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                  className="todo-delete-btn"
                  aria-label="Delete todo"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  )
}

export default App
