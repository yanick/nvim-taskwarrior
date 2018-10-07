"use strict";

const taskShow = require("./taskShow");

const Taskwarrior = require("./taskwarrior").default;

let plugin = {
  tw: () => new Taskwarrior()
};
taskShow(plugin)('+READY');