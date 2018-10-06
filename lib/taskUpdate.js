"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = taskUpdate;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let extract_uuids, Task, taskLine;

const init = _lodash2.default.once(() => {
  Task = require("./taskwarrior/task").default;
  extract_uuids = require("./utils").extract_uuids;
  taskLine = require("./utils").taskLine;
});

async function taskUpdate(to_append, [start, end]) {
  init();
  console.log(to_append, start, end);
  let buffer = await this.nvim.buffer;
  let lines = await buffer.getLines({
    start: start - 1,
    end
  });
  let tasks = await this.tw.export(extract_uuids(lines));
  await buffer.replace(tasks.map(taskLine), start - 1);
}

;