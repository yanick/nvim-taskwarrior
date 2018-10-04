function extract_uuids(lines) {
    return lines.map( l => l.match( /[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}/g ) ).filter( x => x ).map( x => x[0] );
}

const taskDelete = plugin => async(args,[start,end]) => {
    let buffer = await plugin.nvim.buffer;
    let lines  = await buffer.getLines({ start: start - 1, end }); 

    let uuids = extract_uuids(lines);

    uuids.forEach( uuid => plugin.tw().run( 'delete', [], [ uuid ] ) );
};

const taskDone = plugin => async(args,[start,end]) => {
    let buffer = await plugin.nvim.buffer;
    let lines  = await buffer.getLines({ start: start - 1, end }); 

    buffer.remove( start - 1, end ); 

    let uuids = extract_uuids(lines);

    uuids.forEach( uuid => plugin.tw().run( 'done', [], [ uuid ] ) );
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

    plugin.registerFunction( 'TaskDelete', taskDelete(plugin), {
        range: ''
    });

    plugin.registerFunction( 'TaskDone', taskDone(plugin), {
        range: ''
    });
};
