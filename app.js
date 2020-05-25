('use strict');
import * as Auth from './modules/auth/auth.mjs';
import PubSub from './modules/pubSub/pubSub.mjs';
// import Timer from './modules/timer/timer.mjs';
import TimerView from './modules/timer/view.mjs';
import TimerModel from './modules/timer/model.mjs';
// import Tasks from './modules/tasks/tasks.mjs';
import TasksView from './modules/timer/view.mjs';
import TasksModel from './modules/timer/model.mjs';

const taskAddForm = document.querySelector('#task-add-form');

/**
 * Event delegator for click events
 * @param {Event} event
 */
const clickDelegator = (event) => {
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
/**
 * Add the tasks view to the subscription of the pubSub
 * This will then receive the publications of the model each time a change is made
 */
TasksView.load();
PubSub.subscribe(TasksModel.subject, TasksView);
/**
 * Setup the model to use the PubSub for publishing all changes
 * That way any subscribers will get the updates and make changes to the view
 */

TasksModel.load(PubSub);
/**
 * Add the timer view to the subscription of the pubSub
 * This will then receive the publications of the model each time a change is made
 */
TimerView.load();
PubSub.subscribe(TimerModel.subject, TimerView);
/**
 * Setup the model to use the PubSub for publishing all changes
 * That way any subscribers will get the updates and make changes to the view
 */
TimerModel.load(PubSub);
