import _ from 'lodash';

import TaskCommand from './TaskCommand';
import TaskUpdate  from './TaskUpdate';

let extract_uuids, Task, taskLine;


const init = _.once( () => {
    Task = require( './taskwarrior/task' ).default;
    extract_uuids = require( './utils' ).extract_uuids;
    taskLine = require( './utils' ).taskLine;
});

module.exports = class TaskAppend extends TaskCommand {

    async taskAppend(to_append=[],[start,end]) {
        init();

        if( to_append.length === 0 ) {
            to_append = ( await this.nvim.eval( 'input( "append: " )' ) ).split(' ');
        }

        let buffer = await this.nvim.buffer;
        let lines  = await buffer.getLines({ start: start - 1, end }); 

        await this.tw.run( 'append', [ to_append ], extract_uuids(lines) );

        await( ( new TaskUpdate(this.plugin) ).taskUpdate([],[start,end]) );
    }
}


