import _ from 'lodash';

let extract_uuids, Task;

const init = _.once( () => {
    Task = require( './taskwarrior/task' ).default;
    extract_uuids = require( './utils' ).extract_uuids;
});

export default async function taskDelete(args,[start,end]) {
    init();

    let buffer = await this.nvim.buffer;
    let lines  = await buffer.getLines({ start: start - 1, end }); 

    buffer.remove( start - 1, end ); 

    let tasks = extract_uuids(lines).map( uuid => this.tw.task({ uuid }) );

    tasks.forEach( t => t.delete() );
}
