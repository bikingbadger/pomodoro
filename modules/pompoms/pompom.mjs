'use strict';
import PompomView from './view.mjs';
import PompomModel from './model.mjs';

const Pompom = {
  /**
   * Load function for initializing pompom's
   */
  load: function (PubSub) {
    /**
     * Add the pompom view to the subscription of the pubSub
     * This will then receive the publications of the model each time a change is made
     */
    PompomView.load();
    PubSub.subscribe(PompomView);
    /**
     * Setup the model to use the PubSub for publishing all changes
     * That way any subscribers will get the updates and make changes to the view
     */
    PompomModel.load(PubSub);
  },
};

export default Pompom;
