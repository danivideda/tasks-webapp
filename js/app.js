// UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add Task Event
  form.addEventListener('submit', addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask);
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Task Event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LocalStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Change cursor to pointer
    link.style.cursor = 'pointer';
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
  
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task!');
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Change cursor to pointer
    link.style.cursor = 'pointer';
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
  
    // Append li to ul
    taskList.appendChild(li);

    // Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value); 
  
    // Clear taskInput
    taskInput.value = '';
  }


  e.preventDefault();
}

// Store Task in LocalStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  // if (e.target === document.querySelector('i.fa.fa-remove')) {
  //   console.log('Clicked the X')
  // }

  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Nigga u sure?')) {
      if (confirm('Like for real?')) {
        alert('Aight then..');
        e.target.parentElement.parentElement.remove();

        // Remove from LocalStorage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
  }
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
  // First method
  // taskList.innerHTML = '';

  // Second method
  if (taskList.contains(document.querySelector('li'))) {
    if (confirm('Nigga u sure you wanna clear all of \'em?')) {
      if (confirm('Like nigga, you will lose all your tasks. You sure?')) {
        alert('Aight then, have it your way.')
        while (taskList.firstChild) {
          // taskList.firstChild.remove();
          taskList.removeChild(taskList.firstChild);
        }

        clearTasksFromLocalStorage();
      }
    }
  } else {
    alert('There aren\'t any task in the list!');
  }

  e.preventDefault();
}

// Clear Tasks from LocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}