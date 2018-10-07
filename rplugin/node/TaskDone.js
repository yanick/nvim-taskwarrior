"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _task = require("./taskwarrior/task");

var _task2 = _interopRequireDefault(_task);

var _utils = require("./utils");

var _TaskCommand = require("./TaskCommand");

var _TaskCommand2 = _interopRequireDefault(_TaskCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = class TaskDone extends _TaskCommand2.default {
  constructor(plugin) {
    super(plugin);
    plugin.registerFunction('TaskDone', [this, this.taskDone], { range: true });
  }

  async taskDone(args, [start, end]) {
    let buffer = await this.nvim.buffer;
    let lines = await buffer.getLines({
      start: start - 1,
      end
    });
    buffer.remove(start - 1, end);
    let tasks = (0, _utils.extract_uuids)(lines).map(uuid => this.tw.task({
      uuid
    }));
    tasks.forEach(t => t.done());
  }

};
