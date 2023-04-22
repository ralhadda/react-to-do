import "./styles.css";
import { TodoItem } from "./TodoItem";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, useState, useEffect, useRef } from "react";

export const PropsContext = createContext();

function App() {
  const toDoName = useRef("");
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filterTodos, setFilterTodos] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [checkTodo, setCheckTodo] = useState(false);
  const [checkTodos, setCheckTodos] = useState([]);

  useEffect(() => {
    if (filterTodos === "") {
      setFilteredTodos([]);
      return;
    }

    setFilteredTodos(todos.filter(todo => todo.name.includes(filterTodos)));
  }, [todos, filterTodos]);

  useEffect(() => {
    if (checkTodo === false) {
      setCheckTodos([]);
      return;
    }

    setCheckTodos(todos.filter(todo => todo.completed === false));
  }, [todos, checkTodo]);

  function filterChecked() {
    setCheckTodo(!checkTodo);
  }

  function addNewTodo() {
    const newTodoName = toDoName.current.value.trim();
    if (newTodoName === "") return;

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          name: newTodoName,
          completed: false,
          id: crypto.randomUUID()
        }
      ];
    });

    toDoName.current.value = "";
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
          <input type='checkbox' value={checkTodo} onChange={filterChecked} />
          Hide Completed
        </label>
      </div>
      <ul id='list'>
        {(checkTodo === false && filterTodos === ""
          ? todos
          : checkTodo === false && filterTodos !== ""
          ? filteredTodos
          : checkTodos
        ).map(todo => {
          return (
            <PropsContext.Provider value={{ toggleTodo, deleteTodo, ...todo }}>
              <TodoItem />
            </PropsContext.Provider>
          );
        })}
      </ul>

      <div id='new-todo-form'>
        <label htmlFor='todo-input'>New Todo</label>
        <input type='text' id='todo-input' ref={toDoName} />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
