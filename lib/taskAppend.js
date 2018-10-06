"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (to_append, [start, end]) {
  init();
  console.log(to_append, start, end);

  if (to_append.length === 0) {
    to_append = (await this.nvim.eval('input( "append: " )')).split(' ');
  }

  let buffer = await this.nvim.buffer;
  let lines = await buffer.getLines({
    start: start - 1,
    end
  });
  await this.tw.run('append', [to_append], extract_uuids(lines));
  await taskUpdate.call(this, [], [start, end]);
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let extract_uuids, Task, taskLine, taskUpdate;

const init = _lodash2.default.once(() => {
  Task = require("./taskwarrior/task").default;
  extract_uuids = require("./utils").extract_uuids;
  taskLine = require("./utils").taskLine;
  taskUpdate = require("./taskUpdate").default;
});

;