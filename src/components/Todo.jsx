import React, { useState } from "react";
import "./todo.css";
const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const addTodo = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (input !== "") {
      setTodo((prev) => [...prev, { text: input, checked: false }]);
      setInput(""); // Clear the input after adding the todo
    }
  };
  const handClear = () => {
    setTodo([]);
  };
  const deleteTodo = (index) => {
    const newTodoList = todo.filter((_, i) => i !== index);
    setTodo(newTodoList);
  };

  const handleChecked = (index) => {
    setTodo((prev) => {
      return prev.map((todoItem, i) => {
        if (i === index) {
          return { ...todoItem, checked: !todoItem.checked };
        }
        return todoItem;
      });
    });
  };
  let total = 0;
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].checked === true) {
      total += 1;
    }
  }

  return (
    <div className="container">
      <div className="todo">
        <h3>Todo List App</h3>
        <div className="todo-app">
          <h5>What's the plan for today?</h5>
          <div className="input">
            <input
              type="text"
              value={input}
              placeholder="Enter a new task."
              onChange={handleInput}
            />
            <span onClick={addTodo}>
              <i className="fa-solid fa-plus"></i>
            </span>
          </div>
          {todo.map((item, index) => {
            return (
              <div key={index} className="item">
                <p className={item.checked ? "checked" : ""}>{item.text}</p>
                <div className="actions">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleChecked(index)}
                  />
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteTodo(index)}
                  ></i>
                </div>
              </div>
            );
          })}
          {todo.length !== 0 ? (
            <div className="bottom">
              <button className="btn" onClick={handClear}>
                Clear All
              </button>

              <p>{`${total} completed out of ${todo.length} tasks`}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
