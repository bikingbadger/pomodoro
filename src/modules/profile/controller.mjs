'use strict';

import ProfileModel from './model.mjs';

const ProfileController = {
  model: ProfileModel,
  /** Save settings */
  saveProfileSettings: function (setting) {
    this.model.saveSetting(setting);
  },
};

export default ProfileController;
