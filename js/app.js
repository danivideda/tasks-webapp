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
  // Add Task Event
  form.addEventListener('submit', addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask);
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Task Event
  filter.addEventListener('keyup', filterTasks);
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
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
  
    // Append li to ui
    taskList.appendChild(li);
  
    // Clear taskInput
    taskInput.value = '';
  }


  e.preventDefault();
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
      }
    }
  }
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
      }
    }
  } else {
    alert('There aren\'t any task in the list!');
  }

  e.preventDefault();
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