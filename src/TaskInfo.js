import _ from 'lodash';

import TaskCommand from './TaskCommand';
import { extract_uuids, replaceCurrentBuffer } from './utils';

module.exports = class TaskInfo extends TaskCommand {

    async taskInfo(args,[start,end]) {

        let [ task ] = await this.rangeTasks(start-1,end); 
        let info = (await task.info()).split("\n");

        await this.nvim.command('new');

        await ( await this.nvim.buffer ).append(info);
    }
}


