import _ from 'lodash';

let extract_uuids, Task, taskLine;

const init = _.once( () => {
    Task = require( './taskwarrior/task' ).default;
    extract_uuids = require( './utils' ).extract_uuids;
    taskLine = require( './utils' ).taskLine;
});

module.exports = class TaskUpdate extends TaskCommand {

    constructor(plugin) {
        super(plugin);

        plugin.registerFunction( 'TaskUpdate', [ this, this.taskUpdate ], { range: true } );
    }

    async taskUpdate( args, [ start, end ] ) {
        init();

        let buffer = await this.nvim.buffer;
        let lines  = await buffer.getLines({ start: start - 1, end }); 

        let tasks = await this.tw.export( extract_uuids(lines) );

        await buffer.replace( tasks.map( taskLine ), start-1 );
    };

}
