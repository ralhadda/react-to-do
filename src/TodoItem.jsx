import { PropsContext } from "./App";
import { useContext } from "react";

export function TodoItem({ id, name, completed }) {
  const value = useContext(PropsContext);
  return (
    <li className='list-item'>
      <label className='list-item-label'>
        <input
          checked={completed}
          type='checkbox'
          data-list-item-checkbox
          onChange={e => value.toggleTodo(id, e.target.checked)}
        />
        <span data-list-item-text>{name}</span>
      </label>
      <button onClick={() => value.deleteTodo(id)} data-button-delete>
        Delete
      </button>
    </li>
  );
}
