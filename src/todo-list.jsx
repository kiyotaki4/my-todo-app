import React, { useState, useEffect } from "react";

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
      return [];
    }
  });

  // Загружаем таски из localStorage
  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(savedTasks);
    } catch (error) {
      console.error("Ошибка загрузки из localStorage:", error);
    }
  }, []);

  // Сохраняем таски в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const inputLogic = (event) => {
    setInputValue(event.target.value);
  };

  const addBtn = () => {
    if (inputValue.trim() === "") {
      alert("You must write something!");
      return;
    }
    setTasks([...tasks, { text: inputValue.trim(), completed: false }]);
    setInputValue("");
  };

  const removeElement = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleCompleted = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          To-Do List <img src="/images/icon.png" alt="icon" />
        </h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="Add your task"
            value={inputValue}
            onChange={inputLogic}
          />
          <button onClick={addBtn}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              onClick={() => toggleCompleted(index)}
              className={task.completed ? "checked" : ""}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeElement(index);
                }}
                style={{ marginLeft: "10px", cursor: "pointer", color: "red" }}
              >
                ❌
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
