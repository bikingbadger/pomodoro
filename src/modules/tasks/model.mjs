'use strict';

// Use todoist API to fetch the current tasks,
// those marked with today
const importTodistTasks = async (todistKey) => {
  const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';
  // console.log(todistKey);
  const response = await fetch(allTaskURL, {
    headers: { Authorization: `Bearer ${todistKey}` },
  });
  // console.log(response);
  return await response.json();
};

const TasksModel = {
  taskList: {},
  storageID: 'tasks',
  pubSub: null,
  subject: 'tasks',
  todistKey: '',
  /**
   * Initialize the tasks and setup pubsub
   *
   * @param PubSub PubSub for publishing and subscribing to changes
   */
  load: async function (PubSub) {
    //Get the tasks stored in local storage
    this.taskList = localStorage.getItem(this.storageID);
    this.taskList = this.taskList ? JSON.parse(this.taskList) : [];
    // console.log(this.taskList);
    // Check for todoist tasks
    if (this.todistKey) {
      const todoistTasks = await importTodistTasks(this.todistKey);
      todoistTasks.forEach((task) => {
        // console.log(task);
        this.taskList.push({
          id: this.taskList.length,
          description: task.content,
          priority: task.priority,
          time: 0,
          isCurrent: false,
          complete: false,
          source: 'Todoist',
          sourceId: task.id,
        });
      });
    }
    // console.log(this.taskList);
    // Add PubSub reference
    this.pubSub = PubSub;
    this.publish();
  },
  publish: function () {
    this.pubSub.publish(this);
    // Save the object back to localStorage but filter for local source tasks
    // This prevents the other sources from creating duplicates
    let taskList = this.taskList
      // only show local tasks
      .filter((task) => {
        return task.source === 'Local';
      });
    // console.log(taskList);
    localStorage.setItem(this.storageID, JSON.stringify(taskList));
  },
  /**
   * Add a task to from the input
   */
  add: function (taskDescription) {
    // console.log(`Adding ${taskDescription}`);
    // Push the new task onto array
    this.taskList.push({
      id: this.taskList.length,
      description: taskDescription,
      priority: 2,
      time: 0,
      isCurrent: false,
      complete: false,
      source: 'Local',
      sourceId: this.taskList.length,
    });

    this.publish();
  },
  /**
   * Update a task description
   *
   * @param task The task that you want to update
   */
  update: function (task) {
    // console.log(task);
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
    // console.log(taskId);
    // console.log(this.taskList);
    // Unset all tasks as current
    this.taskList.forEach((task) => {
      task.isCurrent = false;
    });

    // Find the task that you want to complete using the ID
    const task = this.taskList.find((element) => {
      // console.log(parseInt(element.id), parseInt(taskId));
      return parseInt(element.id) === parseInt(taskId);
    });
    if (task) {
      task.complete = true;
    }
    // Publish change
    this.publish();
  },
  /**
   * Set the current task from the todo list
   *
   * @param {String} currentTask Task string value to set as current task
   */
  setCurrent: function (taskId) {
    // Check whether the task is the current task
    const taskIsCurrent = this.taskList[taskId].isCurrent;

    // Set all the task to not current
    this.taskList.forEach((task) => {
      task.isCurrent = false;
    });

    // Check whether task is current, only set if it is not current
    // The above loop with disable all tasks therefore making giving the ability
    // to deselect if you click on the task again.
    if (!taskIsCurrent) {
      // Set the current task to the id given
      this.taskList[taskId].isCurrent = true;
    }
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
  setTodistKey: function (profile) {
    this.todistKey = profile.todoistKey;
  },
};

export default TasksModel;
