import * as Auth from './modules/auth/auth.mjs';
import * as Alarm from './modules/alarm/alarm.mjs';
import * as Timer from './modules/timer/timer.mjs';

('use strict');

// Data object
//let defaultDuration = 15;

const storageID = 'tasks';

const taskAddForm = document.querySelector('#task-add-form');

/**
 * Template for Tasks
 *
 * Creates a ordered list of the tasks stored in local storage
 */
const templateTodoTasks = () => {
  // Get the current task list
  const tasks = getTasks();
  const todoTasks = tasks.todo;

  // Map each task to a list item
  const taskList = todoTasks
    .map((task, id) => {
      // https://google.github.io/material-design-icons/
      return `<li class="list-inside list-disc py-1">
                <span data-item="${task}" id="task-item-${id}">${task}</span>
                <i data-item-edit="${id}" class="material-icons text-sm border-2 rounded-full p-1" title="Edit">edit</i>
                <i data-item-save="${id}" class="material-icons text-sm border-2 rounded-full p-1 hidden" title="Save">save</i>
              </li>`;
    })
    .join('');

  // Return an ordered list with all the tasks
  return taskList;
};

/**
 * Template for Tasks
 *
 * Creates a ordered list of the tasks stored in local storage
 */
const templateCompleteTasks = () => {
  // Get the current task list
  const tasks = getTasks();
  const completeTasks = tasks.complete;

  // Map each task to a list item
  const taskList = completeTasks
    .map((task, index) => {
      return `<li data-item id="task-item-${index}" class="list-inside list-disc">${task}</li>`;
    })
    .join('');

  // Return an ordered list with all the tasks
  return `<ul>${taskList}</ul>`;
};

/**
 * Render the template for the given selector
 * @param {String} selector The selector for the element on the page to render
 * @param {Function} template Callback function to create the layout
 */
const render = (selector, template) => {
  const app = document.querySelector(selector);
  if (!app) return;

  // Retrieve the output from the template
  const output = template();

  // check for changes, if there are none no reason to update the document
  if (app.innerHTML === output) return;

  // update changes to the document
  app.innerHTML = output;
};



/**
 * Render the task list
 */
const renderTasks = () => {
  render('[data-task-list]', templateTodoTasks);
  render('[data-complete-tasks]', templateCompleteTasks);
};

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
  let tasks = getTasks();
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
  let tasks = getTasks();
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
 * Set the current task from the todo list
 *
 * @param {String} currentTask Task string value to set as current task
 */
const setCurrentTask = (currentTask) => {
  const currentTaskElement = document.querySelector('#current-task');
  currentTaskElement.innerHTML = currentTask;
  currentTaskElement.setAttribute('data-current-task', '');
};

/**
 *
 * @param {String} task
 */
const markTaskComplete = (currentTask) => {
  // Get the current task list
  let tasks = getTasks();
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
 * Event delegator for click events
 * @param {Event} event
 */
const clickDelegator = (event) => {
  if (event.target.hasAttribute('data-reset')) {
    // Reset timer
    Timer.reset();

    // Kill the alarm if the button is pressed
    Alarm.kill();
  }

  if (event.target.hasAttribute('data-action')) {
    console.log(event.target.innerText);
    const action = event.target.innerText;
    // Start timer
    if (action === 'START') {
      Timer.start();
    }

    // Pause timer
    if (action === 'PAUSE') {
      Timer.pause();
    }

    // Kill the alarm if the button is pressed
    Alarm.kill();
  }

  if (event.target.hasAttribute('data-add-task')) {
    taskAddForm.classList.add('invisible');
    addTask();
  }

  if (event.target.hasAttribute('data-item')) {
    setCurrentTask(event.target.getAttribute('data-item'));
  }

  if (event.target.hasAttribute('data-item-edit')) {
    editTask(event.target.getAttribute('data-item-edit'));
  }

  if (event.target.hasAttribute('data-item-save')) {
    saveTask(event.target.getAttribute('data-item-save'));
  }

  if (event.target.hasAttribute('data-current-task')) {
    if (markTaskComplete(event.target.innerText)) {
      event.target.innerText = '';
    }
  }

  if (event.target === taskAddForm) {
    console.log(event.target);
    taskAddForm.classList.add('invisible');
  }

  // Add task button should show modal for adding task
  if (event.target.id === 'task-add-button') {
    console.log(`Show modal ${event.target}`);
    taskAddForm.classList.remove('invisible');
  }
};

// Click delegator
document.addEventListener('click', clickDelegator, false);

const buttonHandler = (e) => {
  if (e.target.id === 'btn-login') {
    Auth.login();
  }

  if (e.target.id === 'btn-logout') {
    Auth.logout();
  }
};

document.addEventListener('click', buttonHandler), false;
renderTasks();
Alarm.load();
Timer.load(Alarm);
