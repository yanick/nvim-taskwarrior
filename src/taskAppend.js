import _ from 'lodash';

let extract_uuids, Task, taskLine, taskUpdate;

const init = _.once( () => {
    Task = require( './taskwarrior/task' ).default;
    extract_uuids = require( './utils' ).extract_uuids;
    taskLine = require( './utils' ).taskLine;
    taskUpdate = require('./taskUpdate').default;
});

export default async function ( to_append, [ start, end ] ) {
    init();

    console.log( to_append, start, end );

    if( to_append.length === 0 ) {
        to_append = ( await this.nvim.eval( 'input( "append: " )' ) ).split(' ');
    }

    let buffer = await this.nvim.buffer;
    let lines  = await buffer.getLines({ start: start - 1, end }); 

    await this.tw.run( 'append', [ to_append ], extract_uuids(lines) );

    await this::taskUpdate([],[start,end]);
};

