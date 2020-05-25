('use strict');
import TimerView from './view.mjs';
import TimerModel from './model.mjs';

const Timer = {
  load: function (PubSub) {
    /**
     * Add the timer view to the subscription of the pubSub
     * This will then receive the publications of the model each time a change is made
     */
    TimerView.load();
    PubSub.subscribe(TimerView);

    /**
     * Setup the model to use the PubSub for publishing all changes
     * That way any subscribers will get the updates and make changes to the view
     */
    TimerModel.load(PubSub);
  },
};

export default Timer;
