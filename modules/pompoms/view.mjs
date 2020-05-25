'use strict';
// import PompomController from './controller.mjs';
const pompomElement = document.querySelector('#pompoms');

const PompomView = {
  load: function () {
    if (!pompomElement) throw Error('Pompom element is missing');
  },
  /**
   * Render Pompoms
   * Creates an output of tomatoes for showing progress
   */
  render: function (model) {
    let pompoms = '';
    for (let index = 0; index < model.pompoms; index++) {
      if (index % 2 === 0) pompoms += '🍅';
    }

    // check for changes, if there are changes update the document
    if (pompomElement.innerHTML !== pompoms) {
      pompomElement.innerHTML = pompoms;
    }
  },
  notify: function (model) {
    this.render(model);
  },
};

export default PompomView;
