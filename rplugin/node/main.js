"use strict";

var _taskDone = require("./taskDone");

var _taskDone2 = _interopRequireDefault(_taskDone);

var _taskDelete = require("./taskDelete");

var _taskDelete2 = _interopRequireDefault(_taskDelete);

var _taskAppend = require("./taskAppend");

var _taskAppend2 = _interopRequireDefault(_taskAppend);

var _taskUpdate = require("./taskUpdate");

var _taskUpdate2 = _interopRequireDefault(_taskUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import taskShow from './TaskShow';
module.exports = class Task {
  constructor(plugin) {
    plugin.setOptions({
      dev: true
    });
    this.plugin = plugin; //       plugin.registerFunction( 'TaskShow', [ this, taskShow ] );

    plugin.registerFunction('TaskAppend', [this, _taskAppend2.default], {
      range: ''
    });
    plugin.registerFunction('TaskUpdate', [this, _taskUpdate2.default], {
      range: ''
    });
    plugin.registerFunction('TaskDelete', [this, _taskDelete2.default], {
      range: ''
    });
    plugin.registerFunction('TaskDone', [this, _taskDone2.default], {
      range: ''
    });
    plugin.registerCommand('TaskFoo', async () => {
      let b = plugin.nvim.buffer;
      b.replace(['a', 'b', 'c'], 3);
    });
  }

  get nvim() {
    return this.plugin.nvim;
  }

  get tw() {
    if (!this._tw) {
      const Taskwarrior = require("./taskwarrior").default;

      this._tw = new Taskwarrior();
    }

    return this._tw;
  }

};