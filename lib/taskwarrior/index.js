"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const {
  spawn
} = require('child-process-promise');

class Task {
  constructor(data, tw) {
    this.data = data;
    this.tw = tw;
  }

}

class Taskwarrior {
  constructor() {
    const Queue = require('promise-queue');

    this.run_queue = new Queue(1, 100);
  }

  async export(args) {
    let j = await this.run('export', args);
    return JSON.parse(j).map(task => new Task(task, this));
  }

  async run(command, args = [], mods = [], options = {}) {
    return this.run_queue.add(async () => {
      return await spawn('task', [...mods, command, ...args], {
        capture: ['stdout', 'stderr']
      });
    }).then(result => {
      //console.log( result.stderr );
      return result.stdout;
    }).catch(error => console.error(error));
  }

}

exports.default = Taskwarrior;