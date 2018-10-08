import Taskwarrior from '../taskwarrior';
import Task from '../taskwarrior/task';
import { extract_uuids } from '../utils';

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

    async rangeTasks(start,end,buffer) {
        if(!buffer) buffer = await this.nvim.buffer;
        let lines  = await buffer.getLines({ start, end }); 
        return extract_uuids(lines).map( uuid => this.tw.task({uuid}) );
    }

};
