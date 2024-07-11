import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo, editTodo } from "../utils/todoSlice"; // Make sure editTodo is included in your slice
import "./styles.css";

const Todo = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleAddTodo = () => {
    if (text.trim()) { // Ensure non-empty text
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditId(id);
      setEditText(todo.text);
    }
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, text: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <div className="input_holder">
        <input type="text" value={text} onChange={handleInputChange} placeholder="Enter a todo" />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="toDo">
            {editId === todo.id ? (
              <div>
                <input type="text" value={editText} onChange={handleEditInputChange} />
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{todo.text}</strong>
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.completed ? "Completed" : "Incomplete"}
                </span>
                <div className="icons">
                  <button className="icon" onClick={() => handleToggleComplete(todo.id)}>
                    {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button className="icon" onClick={() => handleEditTodo(todo.id)}>Edit</button>
                  <button className="icon" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
