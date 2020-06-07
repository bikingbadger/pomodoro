('use strict');
import 'regenerator-runtime/runtime'
import AuthView  from './modules/auth/view.js';
import PubSub from './modules/pubSub/pubSub.mjs';
import TimerView from './modules/timer/view.mjs';
import TimerModel from './modules/timer/model.mjs';
import TasksView from './modules/tasks/view.mjs';
import TasksModel from './modules/tasks/model.mjs';
import AlarmView from './modules/alarm/view.mjs';
import ProfileModel from './modules/profile/model.mjs';

/**
 * Add authorization
 */
AuthView.load();

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
PubSub.subscribe(TimerModel.subject, TasksView);
/**
 * Setup the model to use the PubSub for publishing all changes
 * That way any subscribers will get the updates and make changes to the view
 */
TimerModel.load(PubSub);

/**
 * Add alarm view
 */
AlarmView.load();
PubSub.subscribe(TimerModel.subject, AlarmView);