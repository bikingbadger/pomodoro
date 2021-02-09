export default {
  addTasks(state, tasks) {
    tasks.forEach((task) => {
      console.log(task.content);
      const taskInList = state.tasks.find(
        (element) => parseInt(element.sourceId, 10) === parseInt(task.id, 10),
      );

      if (taskInList === undefined) {
        state.tasks.push({
          id: state.tasks.length,
          description: task.content,
          priority: task.priority,
          time: 0,
          isCurrent: false,
          completed: false,
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
  },
};
