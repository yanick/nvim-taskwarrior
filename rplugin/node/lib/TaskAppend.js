"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _TaskCommand = require("./TaskCommand");

var _TaskCommand2 = _interopRequireDefault(_TaskCommand);

var _TaskUpdate = require("./TaskUpdate");

var _TaskUpdate2 = _interopRequireDefault(_TaskUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let extract_uuids, Task, taskLine;

const init = _lodash2.default.once(() => {
  Task = require("./taskwarrior/task").default;
  extract_uuids = require("./utils").extract_uuids;
  taskLine = require("./utils").taskLine;
});

module.exports = class TaskAppend extends _TaskCommand2.default {
  async taskAppend(to_append = [], [start, end]) {
    init();

    if (to_append.length === 0) {
      to_append = (await this.nvim.eval('input( "append: " )')).split(' ');
    }

    let buffer = await this.nvim.buffer;
    let lines = await buffer.getLines({
      start: start - 1,
      end
    });
    await this.tw.run('append', [to_append], extract_uuids(lines));
    await new _TaskUpdate2.default(this.plugin).taskUpdate([], [start, end]);
  }

};