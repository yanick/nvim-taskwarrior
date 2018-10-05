function extract_uuids(lines) {
    return lines.map( l => l.match( /[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}/g ) ).filter( x => x ).map( x => x[0] );
}

const taskDelete = plugin => async(args,[start,end]) => {
    const Task = require( './taskwarrior/task' ).default;

    let buffer = await plugin.nvim.buffer;
    let lines  = await buffer.getLines({ start: start - 1, end }); 

    let tasks = extract_uuids(lines).map( uuid => plugin.tw().task({ uuid }) );

    tasks.forEach( t => t.delete() );
};

const taskDone = plugin => async(args,[start,end]) => {
    const Task = require( './taskwarrior/task' ).default;

    let buffer = await plugin.nvim.buffer;
    let lines  = await buffer.getLines({ start: start - 1, end }); 

    buffer.remove( start - 1, end ); 

    let tasks = extract_uuids(lines).map( uuid => plugin.tw().task({ uuid }) );

    tasks.forEach( t => t.done() );
};

const taskShow = require('./taskShow');

module.exports = plugin => {
    plugin.setOptions({ dev: true, });

    const _ = require('lodash');

    plugin.tw = _.once( () => { 
        const Taskwarrior = require( './taskwarrior').default;
        return new Taskwarrior();
    });

    plugin.registerFunction( 'TaskShow', taskShow(plugin) );

    plugin.registerFunction( 'TaskAppend', 
        require('./taskAppend').default(plugin) 
    );

    plugin.registerFunction( 'TaskDelete', taskDelete(plugin), {
        range: ''
    });

    plugin.registerFunction( 'TaskDone', taskDone(plugin), {
        range: ''
    });
};
