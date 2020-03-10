import * as Auth from "./modules/auth/auth.mjs";
import * as Alarm from "./modules/alarm/alarm.mjs";

("use strict");

// Data object
//let defaultDuration = 15;
const timerData = {
  timer: 1500,
  running: false,
  paused: false,
  pompoms: 0,
};
const storageID = "tasks";
let countDown;
const timeout =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? 5
    : 1000;

/**
 * Template for the Timer
 *
 * Creates the html output for the timer using the state timerData
 */
const templateTimer = () => {
  // extract the minutes from the timer, convert to string and pad with zero's
  const minutes = parseInt(timerData.timer / 60, 10)
    .toString()
    .padStart(2, "0");
  // extract the seconds from the timer, convert to string and pad with zero's
  const seconds = parseInt(timerData.timer % 60, 10)
    .toString()
    .padStart(2, "0");
  // console.log(`${minutes}:${seconds}`);
  return `${minutes}:${seconds}`;
};

/**
 * Template for Pompoms
 *
 * Creates a ordered list of the tasks stored in local storage
 */
const templatePompoms = () => {
  // check if time is up and return message
  if (timerData.pompoms === 0) {
    return "";
  }

  let pompoms = "";
  for (let index = 0; index < timerData.pompoms; index++) {
    if (index % 2 === 0) pompoms += "🍅";
  }

  return `${pompoms}`;
};

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
      return `<li class="list-inside list-disc">
                <span data-item="${task}" id="task-item-${id}">${task}</span>
                <i data-item-edit="${id}" class="material-icons text-sm border-2 rounded-full p-1" title="Edit">edit</i>
                <i data-item-save="${id}" class="material-icons text-sm border-2 rounded-full p-1 hidden" title="Save">save</i>
              </li>`;
    })
    .join("");

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
    .join("");

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

  // retrieve the output for the current state of timer
  const output = template();

  // check for changes, if there are none no reason to update the document
  if (app.innerHTML === output) return;

  // update changes to the document
  app.innerHTML = output;
};

/**
 * Render the timer
 */
const renderTimer = () => {
  render("#timer", templateTimer);
  render(".pompoms", templatePompoms);

  // Set time in title
  document.title = "Pompom " + templateTimer();
};

/**
 * Render the task list
 */
const renderTasks = () => {
  render("[data-task-list]", templateTodoTasks);
  render("[data-complete-tasks]", templateCompleteTasks);
};

const clearInterval = () => {
  // Set paused and running to false
  timerData.paused = false;
  timerData.running = false;

  // Clear the window interval for the timer
  window.clearInterval(countDown);
};

// Start Timer
const startTimer = () => {
  timerData.running = true;
  countDown = window.setInterval(() => {
    if (!timerData.paused) {
      if (timerData.timer === 0) {
        clearInterval();
        Alarm.playSound();
        timerData.pompoms++;
        // Check the pompoms to determine next time
        if (timerData.pompoms === 7) {
          timerData.timer = 750;
          timerData.pompoms = 0;
        } else if (timerData.pompoms % 2 === 1) {
          // Short Break
          timerData.timer = 300;
        } else {
          // Pomodoro period
          timerData.timer = 1500;
        }
      } else {
        timerData.timer--;
      }
    }
    renderTimer();
  }, timeout);
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
const setTodoTasks = newTask => {
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
  const newTask = document.querySelector("#newTask");

  // Save the task
  setTodoTasks(newTask);

  // Render the list
  renderTasks();

  // Clear the input text
  newTask.value = null;
};

const editTask = id => {
  const task = document.querySelector(`#task-item-${id}`);
  console.log(task);
  if (task) {
    // Enable editing of the task text
    task.contentEditable = "true";
    // Hide the edit icon
    const editIcon = document.querySelector(`[data-item-edit="${id}"]`);
    console.log(editIcon);
    editIcon.classList.add("hidden");
    // Show the save icon
    const saveIcon = document.querySelector(`[data-item-save="${id}"]`);
    console.log(saveIcon);
    saveIcon.classList.remove("hidden");
  }
};

const saveTask = id => {
  let tasks = getTasks();
  const task = document.querySelector(`#task-item-${id}`);
  if (task) {
    // Save the task to the array for todo tasks
    console.log(tasks.todo[id], task.innerText);
    tasks.todo[id] = task.innerText;
    // Save the object back to localStorage
    localStorage.setItem(storageID, JSON.stringify(tasks));
    // Disable editing
    task.contentEditable = "false";

    // Show the edit icon
    const editIcon = document.querySelector(`[data-item-edit="${id}"]`);
    console.log(editIcon);
    editIcon.classList.remove("hidden");
    // Hide the save icon
    const saveIcon = document.querySelector(`[data-item-save="${id}"]`);
    console.log(saveIcon);
    saveIcon.classList.add("hidden");

    // Render the list
    renderTasks();
  }
};

/**
 * Set the current task from the todo list
 *
 * @param {String} currentTask Task string value to set as current task
 */
const setCurrentTask = currentTask => {
  const currentTaskElement = document.querySelector("#current-task");
  currentTaskElement.innerHTML = currentTask;
  currentTaskElement.setAttribute("data-current-task", "");
};

/**
 *
 * @param {String} task
 */
const markTaskComplete = currentTask => {
  // Get the current task list
  let tasks = getTasks();
  let todoTasks = tasks.todo;
  let completeTasks = tasks.complete;

  //Remove task from todo
  todoTasks = todoTasks.filter(task => {
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
const clickDelegator = event => {
  if (event.target.hasAttribute("data-reset")) {
    clearInterval();
    timerData.timer = 1500;
    timerData.pompoms = 0;
    startTimer();
  }

  if (event.target.hasAttribute("data-start")) {
    timerData.paused = false;
    if (!timerData.running) {
      startTimer();
    }
  }

  if (event.target.hasAttribute("data-pause")) {
    timerData.paused = true;
  }

  if (event.target.hasAttribute("data-task")) {
    addTask();
  }

  if (event.target.hasAttribute("data-item")) {
    console.log(`data-item ${event.target.getAttribute("data-item")}`);
    setCurrentTask(event.target.getAttribute("data-item"));
  }

  if (event.target.hasAttribute("data-item-edit")) {
    console.log(
      `data-item-edit ${event.target.getAttribute("data-item-edit")}`,
    );
    editTask(event.target.getAttribute("data-item-edit"));
  }

  if (event.target.hasAttribute("data-item-save")) {
    console.log(
      `data-item-edit ${event.target.getAttribute("data-item-save")}`,
    );
    saveTask(event.target.getAttribute("data-item-save"));
  }

  if (event.target.hasAttribute("data-current-task")) {
    if (markTaskComplete(event.target.innerText)) {
      event.target.innerText = "";
    }
  }
};

// When the restart button is clicked, restart the timer
document.addEventListener("click", clickDelegator, false);

const buttonHandler = e => {
  if (e.target.id === "btn-login") {
    Auth.login();
  }

  if (e.target.id === "btn-logout") {
    Auth.logout();
  }
};

document.addEventListener("click", buttonHandler), false;
renderTimer();
renderTasks();
Alarm.loadAlarm();
