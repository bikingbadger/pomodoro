'use strict';

const TasksModel = {
  taskList: {},
  storageID: 'tasks',
  pubSub: null,
  subject: 'tasks',
  /**
   * Initialize the tasks and setup pubsub
   *
   * @param PubSub PubSub for publishing and subscribing to changes
   */
  load: function (PubSub) {
    //Get the tasks stored in local storage
    this.taskList = localStorage.getItem(this.storageID);
    this.taskList = this.taskList ? JSON.parse(this.taskList) : [];

    // Add PubSub reference
    this.pubSub = PubSub;
    this.publish();
  },
  publish: function () {
    this.pubSub.publish(this);
    // Save the object back to localStorage
    localStorage.setItem(this.storageID, JSON.stringify(this.taskList));
  },
  /**
   * Add a task to from the input
   */
  add: function (taskDescription) {
    console.log(`Adding ${taskDescription}`);
    // Push the new task onto array
    this.taskList.push({
      id: this.taskList.length,
      description: taskDescription,
      priority: 2,
      time: 0,
      isCurrent: false,
      complete: false,
    });

    this.publish();
  },
  /**
   * Update a task description
   *
   * @param task The task that you want to update
   */
  update: function (task) {
    console.log(task);
    if (!task.description) throw Error('Task must have a description');
    // Update the description for given id
    this.taskList[task.id].description = task.description;
    // Publish change
    this.publish();
  },
  /**
   * Complete a task and move to the complete list
   *
   * @param task This is the task you want to mark as complete
   */
  complete: function (taskId) {
    // Unset all tasks as current
    this.taskList.forEach((task) => {
      task.isCurrent = false;
    });

    this.taskList[taskId].complete = true;
    // Publish change
    this.publish();
  },
  /**
   * Set the current task from the todo list
   *
   * @param {String} currentTask Task string value to set as current task
   */
  setCurrent: function (taskId) {
    // Set all the task to not current
    this.taskList.forEach((task) => {
      task.isCurrent = false;
    });

    // Set the current task to the id given
    this.taskList[taskId].isCurrent = true;

    // Publish change
    this.publish();
  },
  addSecond: function () {
    const currentId = this.taskList.find((task) => {
      return task.isCurrent === true;
    });
    // If there is no current task then you can't add time
    if (!currentId) return;
    // console.log(this.taskList[currentId.id]);
    this.taskList[currentId.id].time++;

    // Publish change
    this.publish();
  },
};

export default TasksModel;
