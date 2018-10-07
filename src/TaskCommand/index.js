import Taskwarrior from '../taskwarrior';

export default class TaskCommand {

    constructor ( plugin ) {
        this.plugin = plugin;
    }

    get nvim() { return this.plugin.nvim }

    get tw() {
        if( !this._tw ) {
            this._tw = new Taskwarrior();
        }

        return this._tw;
    }

};
