"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const {
  spawn
} = require('child-process-promise');

const Task = require("./task").default;

async function spawn_task(args) {
  return spawn('task', args, {
    capture: ['stdout', 'stderr']
  });
}

;

class Taskwarrior {
  constructor() {
    const Queue = require('promise-queue');

    this.run_queue = new Queue(1, 100);
  }

  task(data) {
    return new Task(data, this);
  }

  async export(args) {
    let j = await this.run('export', args);
    return JSON.parse(j).map(task => new Task(task, this));
  }

  async run(command, args = [], mods = [], options = {}) {
    if (!options.hasOwnProperty('bulk')) {
      options.bulk = 100;
    }

    let task_args = ['rc.confirmation:off', 'rc.bulk:' + options.bulk, ...mods, command, ...args];
    let result = await this.run_queue.add(() => spawn_task(task_args));
    return result.stdout;
  }

}

exports.default = Taskwarrior;