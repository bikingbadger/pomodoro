('use strict');
import TasksView from './view.mjs';
import TasksModel from './model.mjs';

const Tasks = {
  load: function (PubSub) {
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
  },
};

export default Tasks;
