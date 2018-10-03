function extract_uuids(lines) {
    return lines.map( l => l.match( /[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}/g ) ).filter( x => x );
}

const taskDelete = plugin => async(args,[start,end]) => {
    let buffer = await plugin.nvim.buffer;
    let lines  = await buffer.getLines({ start, end }); 

    let uuids = extract_uuids(lines);

    console.log(uuids);
};

const taskShow = require('./taskShow');

module.exports = plugin => {
//    plugin.setOptions({ dev: true, });

    const _ = require('lodash');

    plugin.tw = _.once( () => { 
        const Taskwarrior = require( './taskwarrior').default;
        return new Taskwarrior();
    });

    plugin.registerFunction( 'TaskShow', taskShow(plugin) );

    plugin.registerFunction( 'TaskDelete', taskDelete(plugin), {
        range: ''
    });
};
