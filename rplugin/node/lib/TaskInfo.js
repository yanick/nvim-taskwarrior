"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _TaskCommand = require("./TaskCommand");

var _TaskCommand2 = _interopRequireDefault(_TaskCommand);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = class TaskInfo extends _TaskCommand2.default {
  async taskInfo(args, [start, end]) {
    let [task] = await this.rangeTasks(start - 1, end);
    let info = (await task.info()).split("\n");
    await this.nvim.command('new');
    await (await this.nvim.buffer).append(info);
  }

};