"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taskwarrior = require("../taskwarrior");

var _taskwarrior2 = _interopRequireDefault(_taskwarrior);

var _task = require("../taskwarrior/task");

var _task2 = _interopRequireDefault(_task);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TaskCommand {
  constructor(plugin) {
    this.plugin = plugin;
  }

  get nvim() {
    return this.plugin.nvim;
  }

  get tw() {
    if (!this._tw) {
      this._tw = new _taskwarrior2.default();
    }

    return this._tw;
  }

  async rangeTasks(start, end, buffer) {
    if (!buffer) buffer = await this.nvim.buffer;
    let lines = await buffer.getLines({
      start,
      end
    });
    return (0, _utils.extract_uuids)(lines).map(uuid => this.tw.task({
      uuid
    }));
  }

}

exports.default = TaskCommand;
;