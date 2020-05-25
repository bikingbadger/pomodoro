'use strict';
import PompomModel from './model.mjs';

const PompomController = {
  model: PompomModel,
  addPompom: function () {
    this.model.increment();
  },
  resetPompoms: function () {
    this.model.reset();
  },
};

export default PompomController;
