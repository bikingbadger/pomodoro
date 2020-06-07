('use strict');

import PubSub from './modules/pubSub/pubSub.mjs';
import ProfileView from './modules/profile/view.mjs';
import ProfileModel from './modules/profile/model.mjs';

/**
 * Add the profile settings view to the subscription of the pubSub
 * This will then receive the publications of the model each time a change is made
 */
ProfileView.load();
PubSub.subscribe(ProfileModel.subject, ProfileView);
/**
 * Setup the model to use the PubSub for publishing all changes
 * That way any subscribers will get the updates and make changes to the view
 */
ProfileModel.load(PubSub);
