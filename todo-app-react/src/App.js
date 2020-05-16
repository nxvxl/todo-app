import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [counter, setCounter] = useState(0);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  /** Load data from localstorage if exists */
  useEffect(() => {
    const localTodos = localStorage.getItem('todos')
    if (localTodos) {
      setTodos([...JSON.parse(localTodos)])
    };
  }, [])


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function increase() {
    setCounter(counter + 1);
  }

  function decrease() {
    setCounter(counter - 1);
  }

  function changeTodo(e) {
    setNewTodo(e.target.value)
  }

  function addTodo(e){
    e.preventDefault();

    if (!newTodo) return;

    setTodos([
      ...todos,
      newTodo
    ]);
    setNewTodo('')
  }

  function deleteTodo(i) {
    setTodos([
      ...todos.filter((v, index) => index !== i)
    ])
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Todo App</h1>
        <form onSubmit={addTodo} className="form-control">
          <input onChange={changeTodo} value={newTodo}/>
          <button type="submit">+</button>
        </form>
        <div className="counter">
          <button onClick={decrease}>-</button>
          <p>{counter}</p>
          <button onClick={increase}>+</button>
        </div>
        <div className="todos">
          <ul>
            {todos.map((todo, index) =>
              <span key={index} className="todo-item">
                <li>{todo}</li>
                <button onClick={() => deleteTodo(index)}>x</button>
              </span>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
