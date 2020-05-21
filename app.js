import * as Auth from './modules/auth/auth.mjs';
import * as Timer from './modules/timer/timer.mjs';
import * as Todo from './modules/todo/todo.mjs';

('use strict');

const taskAddForm = document.querySelector('#task-add-form');

/**
 * Event delegator for click events
 * @param {Event} event
 */
const clickDelegator = (event) => {
  if (event.target.hasAttribute('data-reset')) {
    // Reset timer
    Timer.reset();
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
  }

  if (event.target.hasAttribute('data-add-task')) {
    taskAddForm.classList.add('invisible');
    Todo.addTask();
  }

  if (event.target.hasAttribute('data-item')) {
    Todo.setCurrentTask(event.target.getAttribute('data-item'));
  }

  if (event.target.hasAttribute('data-item-edit')) {
    Todo.editTask(event.target.getAttribute('data-item-edit'));
  }

  if (event.target.hasAttribute('data-item-save')) {
    Todo.saveTask(event.target.getAttribute('data-item-save'));
  }

  if (event.target.hasAttribute('data-current-task')) {
    if (Todo.markTaskComplete(event.target.innerText)) {
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
Todo.renderTasks();
Timer.load();
