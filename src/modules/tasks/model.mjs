'use strict';

// Use todoist API to fetch the current tasks,
// those marked with today
const importTodoistTasks = async (todoistKey) => {
  const allTaskURL = 'https://api.todoist.com/rest/v1/tasks?filter=today';
  // console.log(todoistKey);
  const response = await fetch(allTaskURL, {
    headers: { Authorization: `Bearer ${todoistKey}` },
  });
  // console.log(response);
  return await response.json();
};

const completeTask = async (todoistKey, taskId) => {
  const completeTaskURL = `https://api.todoist.com/rest/v1/tasks/${taskId}/close`;

  const response = await fetch(completeTaskURL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${todoistKey}` },
  });

  console.log(response);
};

const getTask = async (todoistKey, taskId) => {
  const getTaskURL = `https://api.todoist.com/rest/v1/tasks/${taskId}`;
  const response = await fetch(getTaskURL, {
    headers: { Authorization: `Bearer ${todoistKey}` },
  });
  if (await response.ok) {
    return response.json();
  } else {
    return { id: -1, description: 'Not found' };
  }
};

const TasksModel = {
  taskList: {},
  storageID: 'tasks',
  pubSub: null,
  subject: 'tasks',
  todoistKey: '',
  todoistTasks: [],
  /**
   * Initialize the tasks and setup pubsub
   *
   * @param PubSub PubSub for publishing and subscribing to changes
   */
  load: async function (PubSub) {
    //Get the tasks stored in local storage
    this.taskList = localStorage.getItem(this.storageID);
    this.taskList = this.taskList ? JSON.parse(this.taskList) : [];

    // Add scheduled for older records from v1 for backwards compatibility
    this.taskList.forEach((task) => {
      if (typeof task.scheduled === 'undefined') {
        this.taskList[task.id].scheduled = false;
      }
    });

    // Check for todoist tasks
    if (this.todoistKey) {
      this.todoistTasks = await importTodoistTasks(this.todoistKey);
      this.todoistTasks.forEach((todoistTask) => {
        const taskInList = this.taskList.find(
          (element) => parseInt(element.sourceId) === parseInt(todoistTask.id),
        );

        if (taskInList === undefined) {
          this.taskList.push({
            id: this.taskList.length,
            description: todoistTask.content,
            priority: todoistTask.priority,
            time: 0,
            isCurrent: false,
            completed: false,
            source: 'Todoist',
            sourceId: todoistTask.id,
            scheduled: false,
          });
        } else {
          // console.log(taskInList);
          // console.log(todoistTask);
          if (todoistTask.completed !== taskInList.completed) {
            // console.log(`Task is either recurring or moved to incomplete`);
            taskInList.completed = todoistTask.completed;
            taskInList.scheduled = false;
          }
          // console.log(`Task already on list: ${taskInList.description}`);
        }
      });

      await this.checkCompleted();
    }
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
    // console.log(`Adding ${taskDescription}`);
    // Push the new task onto array
    this.taskList.push({
      id: this.taskList.length,
      description: taskDescription,
      priority: 2,
      time: 0,
      isCurrent: false,
      completed: false,
      source: 'Local',
      sourceId: this.taskList.length,
      scheduled: true,
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

    // Mark task as complete
    if (task) {
      task.completed = true;
    }

    // Complete Todoist Task
    if (task.source === 'Todoist') {
      console.log(task.sourceId);
      completeTask(this.todoistKey, task.sourceId);
    }

    // Publish change
    this.publish();
  },
  /**
   * Check whether the task has been completed in the source
   */
  checkCompleted: async function () {
    // Make sure that current tasks from todoist are in array
    // if not them remove them for now
    await this.taskList.forEach(async (task) => {
      // console.log('======================================================');
      if (!task.completed && task.source === 'Todoist') {
        // console.log(task);
        // console.log(task.sourceId);
        const todoistTask = this.todoistTasks.find((element) => {
          // console.log(element);
          return parseInt(element.id) === parseInt(task.sourceId);
        });

        // If the task was not found on the today list then it's probably completed in Todoist or
        // the task has been scheduled for a later date in Todoist
        if (!todoistTask) {
          const isActive = await getTask(this.todoistKey, task.sourceId);
          // console.log(`Active: ${isActive.id}`);
          // If there is no id the task has been completed as you can only
          // get active tasks through the API, so set the task as complete
          if (parseInt(isActive.id) === -1) {
            task.completed = true;
          }
          // The task exists in Todist but has been scheduled for a later date
          // so it should be set to scheduled
          else {
            console.log(`Task is scheduled: ${task.description}`);
            task.scheduled = true;
            this.publish();
          }
        } else {
          console.log(`Task still current: ${todoistTask.content}`);
          task.scheduled = false;
        }
      }
      // else {
      //   console.log(`Task complete or not Todoist task: ${task.description}`);
      // }
      // console.log('======================================================');
    });
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
    this.todoistKey = profile.todoistKey;
  },
};

export default TasksModel;
