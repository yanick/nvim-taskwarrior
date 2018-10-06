"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = taskDelete;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let extract_uuids, Task;

const init = _lodash2.default.once(() => {
  Task = require("./taskwarrior/task").default;
  extract_uuids = require("./utils").extract_uuids;
});

async function taskDelete(args, [start, end]) {
  init();
  let buffer = await this.nvim.buffer;
  let lines = await buffer.getLines({
    start: start - 1,
    end
  });
  buffer.remove(start - 1, end);
  let tasks = extract_uuids(lines).map(uuid => this.tw.task({
    uuid
  }));
  tasks.forEach(t => t.delete());
}