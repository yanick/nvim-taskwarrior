"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceCurrentBuffer = replaceCurrentBuffer;
exports.taskLine = taskLine;
exports.extract_uuids = extract_uuids;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let moment;

const init = _lodash2.default.once(() => {
  moment = require('moment');
});

async function replaceCurrentBuffer(lines) {
  const buffer = await this.nvim.buffer;
  await buffer.setLines(lines, {
    start: 0,
    end: -1,
    strictIndexing: true
  });
}

function taskLine({
  data
}) {
  init();
  data = _lodash2.default.clone(data);
  data.urgency = parseInt(data.urgency);

  if (data.annotations) {
    data.description += ' [N]';
  }

  if (data.tags) {
    data.description = [data.description, ...data.tags.map(t => '+' + t)].join(' ');
  }

  ['due', 'modified'].filter(f => data[f]).forEach(f => {
    data[f] = moment(data[f]).fromNow();
  });

  if (data.project) {
    data.description = [data.project, data.description].join('> ');
  }

  return '|' + ['urgency', 'priority', 'due', 'description', 'modified', 'uuid'].map(k => data[k] || ' ').join('|').replace(/\n/g, ' ');
}

function extract_uuids(lines) {
  return lines.map(l => l.match(/[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}/g)).filter(x => x).map(x => x[0]);
}