import _ from 'lodash';

let extract_uuids, Task, taskLine;

const init = _.once( () => {
    Task = require( './taskwarrior/task' ).default;
    extract_uuids = require( './utils' ).extract_uuids;
    taskLine = require( './utils' ).taskLine;
});

export default async function ( to_append, [ start, end ] ) {
    init();

    console.log( to_append, start, end );

    if( to_append.length === 0 ) {
        to_append = ( await this.nvim.eval( 'input( "append: " )' ) ).split(' ');
    }

    let buffer = await this.nvim.buffer;
    let lines  = await buffer.getLines({ start: start - 1, end }); 

    let tasks = extract_uuids(lines).map( uuid => this.tw.task({ uuid }) );

    tasks.forEach( t => {
        t.append(to_append);
        //update_in_vim(t);
    });
};

