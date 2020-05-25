'use strict';

import TasksController from './controller.mjs';

const currentTaskElement = document.querySelector('#tasks-current');
const todoList = document.querySelector('#tasks-todo');
const completedList = document.querySelector('#tasks-complete');
const newTask = document.querySelector('#task-new');
const buttonAdd = document.querySelector('#task-add');

const TasksView = {
  load: function () {
    //Check that an element has been added for current task
    if (!currentTaskElement) {
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
    //Check that an input has been added for new task
    if (!newTask) {
      throw Error('New Task input is missing');
    }
    // Check that the add button exists
    if (!buttonAdd) {
      throw Error('Add task button is missing');
    }

    /**
     * Add event listener for click to add a new task
     */
    buttonAdd.addEventListener(
      'click',
      function () {
        TasksController.addTask(newTask.value);
        newTask.value = null;
      },
      false,
    );

    /**
     * Add event listener for click on the todo list to make current task
     */
    todoList.addEventListener(
      'click',
      function (event) {
        console.log(event.target.dataset);
        // Check if there is an task ID as this indicates you have clicked on the
        // text of the task and want to add it to current task
        if (event.target.dataset.taskId) {
          // Check that the content is not being edited
          console.log(event.target.contentEditable);
          if (event.target.contentEditable === 'true') return;

          // Get the task id and set it as current
          const taskId = event.target.dataset.taskId;
          TasksController.setCurrentTask(taskId);
        }
        // If the edit icon is pressed make the text editable and show the save button
        if (event.target.dataset.taskEdit) {
          const id = event.target.dataset.taskEdit;
          const task = document.querySelector(`#task-${id}`);
          console.log(task);
          if (task) {
            // Enable editing of the task text
            task.contentEditable = 'true';
            // Hide the edit icon
            const editIcon = document.querySelector(`[data-task-edit="${id}"]`);
            editIcon.classList.add('hidden');
            // Show the save icon
            const saveIcon = document.querySelector(`[data-task-save="${id}"]`);
            saveIcon.classList.remove('hidden');
          }
        }
        // If the save icon is pressed save the task
        if (event.target.dataset.taskSave) {
          const id = event.target.dataset.taskSave;
          const task = document.querySelector(`#task-${id}`);
          if (task) {
            console.log(task.dataset.taskDescription);
            TasksController.updateTask({
              id: task.dataset.taskId,
              description: task.innerText,
            });

            // Disable editing
            task.contentEditable = 'false';

            // Show the edit icon
            const editIcon = document.querySelector(`[data-task-edit="${id}"]`);
            editIcon.classList.remove('hidden');
            // Hide the save icon
            const saveIcon = document.querySelector(`[data-task-save="${id}"]`);
            saveIcon.classList.add('hidden');
          }
        }
      },
      false,
    );

    currentTaskElement.addEventListener(
      'click',
      function (event) {
        console.log(event.target);
      },
      false,
    );
  },
  render: function (tasks) {
    // Map each task to a list task
    let taskList = tasks.taskList
      // only show completed tasks
      .filter((task) => {
        return task.complete === true;
      })
      // add them to the completed list
      .map((task) => {
        return `<li id="task-${task.id}" 
        data-task-id="${task.id}" 
        data-task-description="${task.description}"
        data-task-priority="${task.priority}"
        data-task-time="${task.time}">${task.description}</li>`;
      })
      .join('');

    // Update if there were any changes
    if (completedList.innerHTML !== `<ul>${taskList}</ul>`) {
      completedList.innerHTML = `<ul>${taskList}</ul>`;
    }

    // Map each task to a list task
    taskList = tasks.taskList
      .filter((task) => {
        return task.complete === false;
      })
      .map((task) => {
        console.log(task);
        // https://google.github.io/material-design-icons/
        return `<li class="list-inside list-disc py-1">
                    <span id="task-${task.id}" 
                    data-task-id="${task.id}" 
                    data-task-description="${task.description}"
                    data-task-priority="${task.priority}"
                    data-task-time="${task.time}">${task.description}</span>
                    <i data-task-edit="${task.id}" class="material-icons text-sm border-2 rounded-full p-1" title="Edit">edit</i>
                    <i data-task-save="${task.id}" class="material-icons text-sm border-2 rounded-full p-1 hidden" title="Save">save</i> 
                  </li>`;
      })
      .join('');

    // Update if there were any changes
    if (todoList.innerHTML !== `<ul>${taskList}</ul>`) {
      todoList.innerHTML = `<ul>${taskList}</ul>`;
    }

    // Check if current task is set. If it is then update the current task
    const task = tasks.taskList.find((task) => {
      return task.isCurrent === true;
    });
    if (task) {
      // console.log('Current Task',currentTask.getAttribute('data-task'));
      currentTaskElement.innerHTML = `${task.description} (${task.time})`;
      currentTaskElement.setAttribute('data-task-id', task.id);
    } else {
        currentTaskElement.innerHTML = 'Select item from todo list'
    }
  },
  notify: function (model) {
    this.render(model);
  },
};

export default TasksView;
