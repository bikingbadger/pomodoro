'use strict';

const PompomModel = {
  pompoms: 0,
  pubSub: null,
  load: function (PubSub) {
    this.pubSub = PubSub;
    this.pubSub.publish(this);
  },
  increment: function () {
    this.pompoms++;
    this.pubSub.publish(this);
  },
  reset: function () {
    this.pompoms = 0;
    this.pubSub.publish(this);
  },
};

export default PompomModel;
