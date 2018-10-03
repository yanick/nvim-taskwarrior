"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _fp = require("lodash/fp");

var _fp2 = _interopRequireDefault(_fp);

var _utils = require("./utils");

var _TaskCommand = require("./TaskCommand");

var _TaskCommand2 = _interopRequireDefault(_TaskCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = class TaskShow extends _TaskCommand2.default {
  async taskShow(filter = []) {
    var _ref, _ref2, _ref3;

    if (filter.length === 0) {
      filter = (await this.nvim.eval('input( "filter: ", "+READY" )')).split(' ');
    }

    let tasks = (_ref = (_ref2 = (_ref3 = await this.tw.export(filter), _fp2.default.sortBy('data.urgency')(_ref3)), _fp2.default.reverse(_ref2)), _fp2.default.map(_utils.taskLine)(_ref));
    await _utils.replaceCurrentBuffer.call(this, tasks);
    await Promise.all([this.nvim.input('1G'), this.nvim.command(':TableModeRealign')]);
  }

};