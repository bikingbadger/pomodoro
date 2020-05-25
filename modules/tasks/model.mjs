'use strict';

const TasksModel = {
  taskList: {},
  currentTask: null,
  storageID: 'tasks',
  pubSub: null,
  subject: 'tasks',
  /**
   * Initialize the tasks and setup pubsub
   * 
   * @param PubSub PubSub for publishing and subscribing to changes
   */
  load: function (PubSub) {
    this.taskList = localStorage.getItem(this.storageID);
    this.taskList = this.taskList
      ? JSON.parse(this.taskList)
      : { todo: [], complete: [] };

    this.pubSub = PubSub;
    this.publish();
  },
  publish: function () {
    this.pubSub.publish(this);
  },
};

export default TasksModel;
