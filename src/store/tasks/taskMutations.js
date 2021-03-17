export default {
  addTasks(state, todoistTasks) {
    // Add any new tasks to list from Todoist
    // and also remove any completed tasks that we updated
    // in the Todoist app
    todoistTasks.forEach((task) => {
      console.log(state);
      const taskInList = state.tasks
        ? state.tasks.find((element) => parseInt(element.sourceId, 10) === parseInt(task.id, 10))
        : undefined;

      if (!taskInList) {
        console.log(task);
        state.tasks.push({
          id: state.tasks.length,
          description: task.content,
          order: state.tasks.length,
          priority: task.priority,
          time: 0,
          isCurrent: false,
          completed: state.completed,
          source: 'Todoist',
          sourceId: task.id,
          scheduled: false,
          currentTime: task.currentTime ? task.currentTime : 0,
        });
      } else if (task.completed !== taskInList.completed) {
        taskInList.completed = task.completed;
        taskInList.scheduled = false;
      }
    });

    // Remove any Todoist tasks from the store that we completed in the store
    // but not synchronized
    state.tasks.forEach((task, index) => {
      const taskInList = todoistTasks.find(
        (element) => parseInt(element.id, 10) === parseInt(task.sourceId, 10),
      );

      if (!taskInList) {
        console.log(index, task, taskInList);
        // Need to find the current index as deleting in a loop will change the
        // index of the array as each one is deleted.
        const currentTaskIndex = state.tasks.findIndex((element) => element.id === task.id);
        console.log('Remove', currentTaskIndex, state.tasks[currentTaskIndex]);
        state.tasks.splice(currentTaskIndex, 1);
      }
    });
  },
  completeTask(state, taskToRemove) {
    // console.log(state.tasks, taskToRemove);
    const taskId = state.tasks.findIndex((task) => task.id === taskToRemove.id);
    state.tasks.splice(taskId, 1);
  },
  organiseTaskList(state, taskList) {
    console.log(taskList);
    state.tasks = [...taskList];
  },
};
