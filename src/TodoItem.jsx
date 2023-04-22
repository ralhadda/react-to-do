import { PropsContext } from "./App";
import { useContext } from "react";

export function TodoItem() {
  const value = useContext(PropsContext);

  return (
    <li className='list-item'>
      <label className='list-item-label'>
        <input
          checked={value.completed}
          type='checkbox'
          data-list-item-checkbox
          onChange={e => value.toggleTodo(value.id, e.target.checked)}
        />
        <span data-list-item-text>{value.name}</span>
      </label>
      <button onClick={() => value.deleteTodo(value.id)} data-button-delete>
        Delete
      </button>
    </li>
  );
}
