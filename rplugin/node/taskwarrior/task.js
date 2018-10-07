"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

class Task {
  constructor(data, tw) {
    this.data = data;
    this.tw = tw;
  }

  get uuid() {
    return this.data.uuid;
  }

  async update() {
    return (await this.tw.export([this.uuid]))[0];
  }

  async append(to_append) {
    return this.tw.run('append', [to_append], [this.uuid]);
  }

  async done() {
    return this.tw.run('done', [], [this.uuid]);
  }

  async delete() {
    return this.tw.run('delete', [], [this.uuid]);
  }

}

exports.default = Task;