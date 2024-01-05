
let tasks = [];

// Function to add a new task
function addTask(taskText, dueDate) {
  const newTask = {
    id: generateUniqueId(),
    text: taskText,
    status: "not finished",
    dueDate: dueDate,
  };

  tasks.push(newTask);
  updateUI();
  saveToLocalStorage();
}

// Function to toggle task status
function toggleTaskStatus(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  tasks[taskIndex].status = tasks[taskIndex].status === "not finished" ? "done" : "not finished";

  updateUI();
  saveToLocalStorage();
}

// Function to filter and display tasks based on "Not finished only" checkbox
function filterAndDisplayTasks() {
  const showNotFinishedOnly = document.getElementById("notFinishedCheckbox").checked;
  const filteredTasks = showNotFinishedOnly ? tasks.filter(task => task.status === "not finished") : tasks;

  updateUI(filteredTasks);
}

// Function to save tasks to LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from LocalStorage
function loadFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = storedTasks;
  updateUI();
}

// Function to generate a unique ID for tasks
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Event listener for form submission
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = document.getElementById("taskText").value;
  const dueDate = document.getElementById("dueDate").value;
  addTask(taskText, dueDate);
  document.getElementById("taskText").value = "";
  document.getElementById("dueDate").value = "";
});

// Event listener for "Not finished only" checkbox
document.getElementById("notFinishedCheckbox").addEventListener("change", filterAndDisplayTasks);

// Load tasks from LocalStorage when the page is loaded
window.addEventListener("load", loadFromLocalStorage);

//Function to update the UI
function updateUI(tasksToShow = tasks) {
  const taskListContainer = document.getElementById("taskList");
  taskListContainer.innerHTML = "";

  tasksToShow.forEach(task => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        ${task.text}-Due Date: ${task.dueDate || "Not set"}
        <input type = "checkbox"${task.status === "done" ? "checked" : ""} onchange="toggleTaskStatus('${task.id}')">
        `;
    taskListContainer.appendChild(listItem);
  })
  //Display the total number of undone tasks
  const totalUndoneTasks = tasks.filter(task => task.status === "not finished").length;
  document.title = `Task Manager(${totalUndoneTasks}task undone)`;
}
