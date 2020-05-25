'use strict';

/**
 * Get the tasks stored in local storage
 */
const getTasks = () => {
  // Get existing data from localStorage
  let tasks = localStorage.getItem(storageID);
  tasks = tasks ? JSON.parse(tasks) : { todo: [], complete: [] };

  return tasks;
};

/**
 * Save another value to the todo list in local storage
 * @param {String} newTask Task to save to todo list
 */
const setTodoTasks = (newTask) => {
  // Get the current task list
  tasks = getTasks();
  const todoTasks = tasks.todo;

  // Push the new task onto array
  todoTasks.push(newTask.value);
  tasks.todo = todoTasks;

  // Save the object back to localStorage
  localStorage.setItem(storageID, JSON.stringify(tasks));
};

/**
 * Add a task to from the input
 */
const addTask = () => {
  const newTask = document.querySelector('#newTask');

  // Save the task
  setTodoTasks(newTask);

  // Render the list
  renderTasks();

  // Clear the input text
  newTask.value = null;
};

const editTask = (id) => {
  const task = document.querySelector(`#task-item-${id}`);
  console.log(task);
  if (task) {
    // Enable editing of the task text
    task.contentEditable = 'true';
    // Hide the edit icon
    const editIcon = document.querySelector(`[data-item-edit="${id}"]`);
    console.log(editIcon);
    editIcon.classList.add('hidden');
    // Show the save icon
    const saveIcon = document.querySelector(`[data-item-save="${id}"]`);
    console.log(saveIcon);
    saveIcon.classList.remove('hidden');
  }
};

const saveTask = (id) => {
  tasks = getTasks();
  const task = document.querySelector(`#task-item-${id}`);
  if (task) {
    // Save the task to the array for todo tasks
    console.log(tasks.todo[id], task.innerText);
    tasks.todo[id] = task.innerText;
    // Save the object back to localStorage
    localStorage.setItem(storageID, JSON.stringify(tasks));
    // Disable editing
    task.contentEditable = 'false';

    // Show the edit icon
    const editIcon = document.querySelector(`[data-item-edit="${id}"]`);
    console.log(editIcon);
    editIcon.classList.remove('hidden');
    // Hide the save icon
    const saveIcon = document.querySelector(`[data-item-save="${id}"]`);
    console.log(saveIcon);
    saveIcon.classList.add('hidden');

    // Render the list
    renderTasks();
  }
};

/**
 * Get the current task
 * 
 * @return {Task} currentTask 
 */
const getCurrentTask =()=> {
  return currentTaskElement;
}

/**
 * Set the current task from the todo list
 *
 * @param {String} currentTask Task string value to set as current task
 */
const setCurrentTask = (currentTask) => {
  console.log('Current Task',currentTask.getAttribute('data-item'));  
  currentTaskElement.innerHTML = currentTask.getAttribute('data-item');
  currentTaskElement.setAttribute('data-current-task', currentTask.id);
};

/**
 *
 * @param {String} task
 */
const markTaskComplete = (currentTask) => {
  // Get the current task list
  tasks = getTasks();
  let todoTasks = tasks.todo;
  let completeTasks = tasks.complete;

  //Remove task from todo
  todoTasks = todoTasks.filter((task) => {
    return task !== currentTask;
  });

  // Push the complete task onto array
  completeTasks.push(currentTask);

  // Set the values of each array in object
  tasks.todo = todoTasks;
  tasks.complete = completeTasks;

  // Save the object back to localStorage
  localStorage.setItem(storageID, JSON.stringify(tasks));

  // Render the dom
  renderTasks();

  return true;
};

/**
 * Load and render tasks
 */
const load = () =>{
  tasks = getTasks();
  renderTasks();
}

export {
  load,
  getCurrentTask,
  setCurrentTask,
  editTask,
  saveTask,
  markTaskComplete,
  addTask,
};
