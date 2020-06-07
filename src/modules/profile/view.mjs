'use strict';
import ProfileController from './controller.mjs';

const saveButton = document.querySelector('#settings-save');
const todoistInput = document.querySelector('#settings-todoist-token');

const ProfileView = {
  load: function () {
    // Check that the todoist input exists
    if (!todoistInput) {
      throw Error('Todoist input is missing');
    }
    //Check that button for saving exists
    if (!saveButton) {
      throw Error('Save button is missing');
    }

    saveButton.addEventListener(
      'click',
      function () {
        ProfileController.saveProfileSettings({todoistKey: todoistInput.value});
      },
      false,
    );
  },
  render: function (profile) {
      console.log(profile);
    todoistInput.value = profile.settings.todoistKey;
  },
  notify: function (model) {
    this.render(model);
  },
};

export default ProfileView;
