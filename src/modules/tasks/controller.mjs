'use strict';

import TasksModel from './model.mjs';

const TasksController = {
  model: TasksModel,
  /**
   * Add new task
   */
  addTask: function (taskDescription) {
    this.model.add(taskDescription);
  },
  /**
   * Set task as current when clicking on todo list
   */
  setCurrentTask: function (taskId) {
    this.model.setCurrent(taskId);
  },
  updateTask: function (task) {
    this.model.update(task);
  },
  addSecond: function (currentSecond) {
    this.model.addSecond(currentSecond);
  },
  completeTask: function (taskId) {
    this.model.complete(taskId);
  },
};

export default TasksController;
