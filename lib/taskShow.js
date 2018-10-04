"use strict";

const replaceCurrentBuffer = plugin => async lines => {
  const buffer = await plugin.nvim.buffer;
  await buffer.setLines(lines, {
    start: 0,
    end: -1,
    strictIndexing: true
  });
};

module.exports = plugin => async (filter = []) => {
  var _ref, _ref2, _tasks;

  console.log("filter the duck?: ", filter);

  const fp = require('lodash/fp');

  console.log("filterx: ", filter);
  let tasks = await plugin.tw().export(filter);
  console.log(tasks);
  tasks = (_ref = (_ref2 = (_tasks = tasks, fp.sortBy('data.urgency')(_tasks)), fp.reverse(_ref2)), fp.map(taskLine)(_ref));
  await replaceCurrentBuffer(plugin)(tasks);
  await Promise.all([plugin.nvim.input('1G'), plugin.nvim.command(':TableModeRealign')]);
};

function taskLine({
  data
}) {
  const _ = require('lodash');

  data.urgency = parseInt(data.urgency);
  if (data.tags) data.tags = data.tags.join(' ');

  if (data.project && data.project.length > 15) {
    data.project = _.truncate(data.project, 15);
  }

  const moment = require('moment');

  ['due', 'modified'].filter(f => data[f]).forEach(f => {
    data[f] = moment(data[f]).fromNow();
  });
  return '|' + ['urgency', 'priority', 'due', 'description', 'project', 'tags', 'modified', 'uuid'].map(k => data[k] || ' ').join('|').replace(/\n/g, ' ');
}