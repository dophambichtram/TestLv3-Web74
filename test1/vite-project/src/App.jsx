import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [incompleteTaskCount, setIncompleteTaskCount] = useState(0);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const incompleteTaskCount = tasks.filter((task) => !task.completed);
    setIncompleteTaskCount(incompleteTaskCount.length);
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    setTasks([...tasks, { text: newTask, completed: false, dueDate }]);
    setNewTask("");
    setDueDate("");
  };

  const markAsCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const sortByDueDate = () => {
    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
    setTasks(sortedTasks);
  };

  return (
    <div className="app-container">
      <h1>TASK LIST</h1>
      <div className="task-ipnut-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          Add Task
        </button>
        <button onClick={sortByDueDate} className="add-button">
          Sort by Due Date
        </button>
        <button onClick={toggleShowCompleted} className="add-button">
          {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
        </button>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              {!task.completed && (
                <>
                  {task.text} ({task.dueDate})
                  <button
                    onClick={() => markAsCompleted(index)}
                    className="input-complete"
                  >
                    Completed
                  </button>
                </>
              )}
              {showCompleted && task.completed && <s>{task.text}</s>}
            </li>
          ))}
        </ul>
        <p>{incompleteTaskCount} Nhiệm vụ chưa hoàn thành </p>
      </div>
    </div>
  );
};

export default App;
