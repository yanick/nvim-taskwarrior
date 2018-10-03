"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taskwarrior = require("../taskwarrior");

var _taskwarrior2 = _interopRequireDefault(_taskwarrior);

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

}

exports.default = TaskCommand;
;