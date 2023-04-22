import "./styles.css";
import { TodoItem } from "./TodoItem";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, useState, useEffect, useRef } from "react";

export const PropsContext = createContext();

function App() {
  const [newTodoName, setNewTodoName] = useLocalStorage("newTodoName", "");
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filterTodos, setFilterTodos] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const refValue = useRef(null);

  useEffect(() => {
    if (filterTodos === "") {
      setFilteredTodos([]);
      return;
    }

    setFilteredTodos(todos.filter(todo => todo.name.includes(filterTodos)));
  }, [todos, filterTodos]);

  function filterChecked() {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.completed === false);
    });
  }

  function addNewTodo() {
    if (newTodoName === "") return;

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { name: newTodoName, completed: false, id: crypto.randomUUID() }
      ];
    });
    setNewTodoName("");
  }

  function toggleTodo(todoId, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === todoId) return { ...todo, completed };

        return todo;
      });
    });
  }

  function deleteTodo(todoId) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== todoId);
    });
  }

  return (
    <>
      <div className='filter-form'>
        <div className='filter-form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            value={filterTodos}
            onChange={e => setFilterTodos(e.target.value)}
          />
        </div>
        <label>
          <input
            type='checkbox'
            ref={refValue}
            onChange={e => filterChecked()}
          />
          Hide Completed
        </label>
      </div>
      <ul id='list'>
        {(filterTodos === "" ? todos : filteredTodos).map(todo => {
          return (
            <PropsContext.Provider
              value={{ toggleTodo, deleteTodo }}
              key={todo.id}
            >
              <TodoItem {...todo} />
            </PropsContext.Provider>
          );
        })}
      </ul>

      <div id='new-todo-form'>
        <label htmlFor='todo-input'>New Todo</label>
        <input
          type='text'
          id='todo-input'
          value={newTodoName}
          onChange={e => setNewTodoName(e.target.value)}
        />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
