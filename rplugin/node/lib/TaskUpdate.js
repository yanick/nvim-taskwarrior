"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _TaskCommand = require("./TaskCommand");

var _TaskCommand2 = _interopRequireDefault(_TaskCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let extract_uuids, Task, taskLine;

const init = _lodash2.default.once(() => {
  Task = require("./taskwarrior/task").default;
  extract_uuids = require("./utils").extract_uuids;
  taskLine = require("./utils").taskLine;
});

module.exports = class TaskUpdate extends _TaskCommand2.default {
  async taskUpdate(args, [start, end]) {
    init();
    let buffer = await this.nvim.buffer;
    let lines = await buffer.getLines({
      start: start - 1,
      end
    });
    let tasks = await this.tw.export(extract_uuids(lines));
    await buffer.replace(tasks.map(taskLine), start - 1);
    await this.nvim.command('TableMoreRealign');
  }

};