('use strict');
import TasksView from './view.mjs';
import TasksModel from './model.mjs';

const Tasks = {
  load: function (PubSub) {
    TasksView.load();
    PubSub.subscribe(TasksModel.subject, TasksView);

    TasksModel.load(PubSub);
  },
};

export default Tasks;
