('use strict');
/**
 * PubSub: Publish and Subscribe
 */
const PubSub = {
  subscribers: new Array(),
  /**
   * Publish changes
   *
   * @param model The model where actions will be published
   */
  publish: function (model) {
    console.log(model);
    this.subscribers.forEach((subscriber) => {
      if (model.subject === subscriber.subject) {
        subscriber.view.notify(model);
      }
    });
  },
  /**
   * Subscribe to changes
   * This will add the view to the list of subscribers so that every change will
   * then be published to the subscriber
   *
   * @param view The view to update changes to
   */
  subscribe: function (subject, view) {
    this.subscribers.push({ subject: subject, view: view });
  },
};

export default PubSub;
