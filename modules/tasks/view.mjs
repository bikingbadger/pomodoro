'use strict';

const currentTask = document.querySelector('#tasks-current');
const todoList = document.querySelector('#tasks-todo');
const completedList = document.querySelector('#tasks-complete');

const TasksView = {
  load: function () {
    //Check that an element has been added for current task
    if (!currentTask) {
      throw Error('Current task element Missing');
    }
    //Check that an element has been added for todo list
    if (!todoList) {
      throw Error('Todo list element missing');
    }
    //Check that an element has been added for completed list
    if (!completedList) {
      throw Error('Completed list element is missing');
    }
  },
  render: function (tasks) {
     
    // Map each task to a list item
    let taskList = tasks.taskList.complete
      .map((task, index) => {
        return `<li data-item id="task-item-${index}" class="list-inside list-disc">${task}</li>`;
      })
      .join('');

    // Update if there were any changes
    if (completedList.innerHTML !== taskList) {
      completedList.innerHTML = `<ul>${taskList}</ul>`;
    }

    // Map each task to a list item
    taskList = tasks.taskList.todo
      .map((task, id) => {
        // https://google.github.io/material-design-icons/
        return `<li class="list-inside list-disc py-1">
                    <span data-item="${task}" id="task-item-${id}">${task}</span>
                    <i data-item-edit="${id}" class="material-icons text-sm border-2 rounded-full p-1" title="Edit">edit</i>
                    <i data-item-save="${id}" class="material-icons text-sm border-2 rounded-full p-1 hidden" title="Save">save</i>
                  </li>`;
      })
      .join('');
    // Update if there were any changes
    if (todoList.innerHTML !== taskList) {
      todoList.innerHTML = `<ul>${taskList}</ul>`;
    }
  },
  notify: function (model) {
    this.render(model);
  },
};

export default TasksView;
