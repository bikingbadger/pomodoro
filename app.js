('use strict');
import * as Auth from './modules/auth/auth.mjs';
import PubSub from './modules/pubSub/pubSub.mjs';
import Timer from './modules/timer/timer.mjs';
import * as Todo from './modules/todo/todo.mjs';

const taskAddForm = document.querySelector('#task-add-form');

/**
 * Event delegator for click events
 * @param {Event} event
 */
const clickDelegator = (event) => {
  
  /**
   * Add New Task from form
   */
  if (event.target.hasAttribute('data-add-task')) {
    taskAddForm.classList.add('invisible');
    Todo.addTask();
  }

  /**
   * Set the current task
   */
  if (event.target.hasAttribute('data-item')) {
    console.log(event.target);
    Todo.setCurrentTask(event.target);
  }

  /**
   * Edit a task in the list
   */
  if (event.target.hasAttribute('data-item-edit')) {
    Todo.editTask(event.target.getAttribute('data-item-edit'));
  }

  /**
   * Save edits of the task
   */
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
Todo.load();
Timer.load(PubSub);
