"use strict";

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let tw = new _index2.default();
tw.export(['+READY project:galuga']).then(tasks => tasks.map(t => console.log(t.data)));