'use strict';
import ProfileController from './controller.mjs';

const saveButton = document.querySelector('#settings-save');
const todoistInput = document.querySelector('#settings-todoist-token');
const pomodoroTimeInput = document.querySelector('#settings-pomodoro-time');
const pomodoroRestInput = document.querySelector('#settings-pomodoro-rest');
const pomodoroLongInput = document.querySelector('#settings-pomodoro-long');

const ProfileView = {
  load: function () {
    // Check that the todoist input exists
    if (!todoistInput) {
      throw Error('Todoist input is missing');
    }
    // Check that the todoist input exists
    if (!pomodoroTimeInput) {
      throw Error('Pomodoro Time input is missing');
    }
    // Check that the todoist input exists
    if (!pomodoroRestInput) {
      throw Error('Pomodoro Rest input is missing');
    }
    // Check that the todoist input exists
    if (!pomodoroLongInput) {
      throw Error('Pomodoro Long Rest input is missing');
    }
    //Check that button for saving exists
    if (!saveButton) {
      throw Error('Save button is missing');
    }

    saveButton.addEventListener(
      'click',
      function () {
        const profile = {
          todoistKey: todoistInput.value,
          pomodoroTime: parseInt(pomodoroTimeInput.value),
          pomodoroRest: parseInt(pomodoroRestInput.value),
          pomodoroLong: parseInt(pomodoroLongInput.value),
        };
        console.log('Saving', profile);

        ProfileController.saveProfileSettings(profile);
      },
      false,
    );
  },
  render: function (profile) {
    console.log('profile', profile.settings);
    todoistInput.value = profile.settings.todoistKey;
    pomodoroTimeInput.value = profile.settings.pomodoroTime;
    pomodoroRestInput.value = profile.settings.pomodoroRest;
    pomodoroLongInput.value = profile.settings.pomodoroLong;
  },
  notify: function (model) {
    this.render(model);
  },
};

export default ProfileView;
