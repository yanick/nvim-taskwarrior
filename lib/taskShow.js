"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fp;
let replaceCurrentBuffer;
let taskLine;

const init = _lodash2.default.once(() => {
  const utils = require("./utils");

  replaceCurrentBuffer = utils.replaceCurrentBuffer;
  taskLine = utils.taskLine;
  fp = require('lodash/fp');
});

module.exports = async function taskShow(filter = []) {
  var _ref, _ref2, _ref3;

  init();

  if (filter.length === 0) {
    filter = (await this.nvim.eval('input( "filter: ", "+READY" )')).split(' ');
  }

  let tasks = (_ref = (_ref2 = (_ref3 = await this.tw.export(filter), fp.sortBy('data.urgency')(_ref3)), fp.reverse(_ref2)), fp.map(taskLine)(_ref));
  await replaceCurrentBuffer.call(this, tasks);
  await Promise.all([this.nvim.input('1G'), this.nvim.command(':TableModeRealign')]);
};