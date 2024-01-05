document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskNameInput = document.getElementById('taskName');
    const dueDateInput = document.getElementById('dueDate');

    const taskName = taskNameInput.value;
    const dueDate = dueDateInput.value;

    // Validate and add the task to the list
    if (taskName.trim() !== '' && dueDate.trim() !== '') {
      addTask(taskName, dueDate);
      taskForm.reset();
    }
  });

  function addTask(taskName, dueDate) {
    const li = document.createElement('li');
    li.innerHTML = `
           <input type="checkbox">
           <span>${taskName}</span>
           <span>${dueDate}</span>
           <button onclick="removeTask(this)">Remove</button>
       `;

    taskList.appendChild(li);
  }

  function removeTask(button) {
    const li = button.closest('li');
    li.remove();
  }
});

//2. **Lọc Tasks:**

function filterTasks() {
  const notFinishedOnlyCheckbox = document.getElementById('notFinishedOnly');
  const taskList = document.getElementById('taskList');
  const tasks = taskList.getElementsByTagName('li');

  for (const task of tasks) {
    const checkbox = task.querySelector('input[type="checkbox"]');
    const isFinished = checkbox.checked;

    if (notFinishedOnlyCheckbox.checked && isFinished) {
      task.style.display = 'none';
    } else {
      task.style.display = 'flex';
    }
  }
}

//3. **Đổi Ngôn Ngữ:**

function changeLanguage() {
  const languageSelect = document.getElementById('language');
  const selectedLanguage = languageSelect.value;

  // Thực hiện logic để đổi ngôn ngữ dựa trên selectedLanguage
  // Có thể liên quan đến việc cập nhật các phần tử UI với văn bản đã được dịch
  console.log(`Ngôn ngữ đã chuyển sang: ${selectedLanguage} `);
}



//4. ** Đếm Số Task Chưa Hoàn Thành:**

document.addEventListener('DOMContentLoaded', function () {
  const taskList = document.getElementById('taskList');
  const undoneTasksCountParagraph = document.getElementById('undoneTasksCount');
  const sortButton = document.getElementById('sortButton');

  taskList.addEventListener('change', updateUndoneTasksCount);
  sortButton.addEventListener('click', sortTasks);

  function updateUndoneTasksCount() {
    const tasks = taskList.querySelectorAll('input[type="checkbox"]');
    let undoneTasksCount = 0;

    tasks.forEach(task => {
      if (!task.checked) {
        undoneTasksCount++;
      }
    });

    undoneTasksCountParagraph.textContent = `Số task chưa hoàn thành ${undoneTasksCount}`;
  }

  function sortTasks() {
    const tasks = Array.from(taskList.querySelectorAll('li'));
    const sortedTasks = tasks.sort(compareTasks);

    taskList.innerHTML = '';
    sortedTasks.forEach(task => {
      taskList.appendChild(task);
    });
  }

  function compareTasks(a, b) {
    const taskA = a.querySelector('label').innerText.toLowerCase();
    const taskB = b.querySelector('label').innerText.toLowerCase();

    if (taskA < taskB) {
      return -1;
    }
    if (taskA > taskB) {
      return 1;
    }
    return 0;
  }
  document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const undoneTasksCountParagraph = document.getElementById('undoneTasksCount');
    const sortButton = document.getElementById('sortButton');

    taskList.addEventListener('change', updateUndoneTasksCount);
    sortButton.addEventListener('click', sortTasks);
  });
})