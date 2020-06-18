'use strict';

const ProfileModel = {
  settings: {},
  storageID: 'settings',
  pubSub: null,
  subject: 'profile',
  load: function (PubSub) {
    this.settings = localStorage.getItem(this.storageID);
    // console.log(this.settings);
    this.settings = this.settings
      ? JSON.parse(this.settings)
      : { todoistKey: '' };

    // Add PubSub reference
    this.pubSub = PubSub;
    this.publish();
  },
  saveSetting: function (setting) {
    // console.log(setting);
    localStorage.setItem(this.storageID, JSON.stringify(setting));
  },
  publish: function () {
    this.pubSub.publish(this);
    // Save the object back to localStorage
    localStorage.setItem(this.storageID, JSON.stringify(this.settings));
  },
};

export default ProfileModel;
