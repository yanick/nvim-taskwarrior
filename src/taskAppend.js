export default plugin => async ( to_append, [ start, end ] ) ) => {

    if( !to_append ) {
        to_append = await plugin.nvim.eval( 'input( "append: " )' );
    }

    const Task = require( './taskwarrior/task' ).default;

    let buffer = await plugin.nvim.buffer;
    let lines  = await buffer.getLines({ start: start - 1, end }); 

    let tasks = extract_uuids(lines).map( uuid => plugin.tw().task({ uuid }) );

    tasks.forEach( t => {
        t.append(to_append);
        t.update();
        update_in_vim(t);
    });
};

function taskLine( {data} ) {
    const _ = require('lodash');

    data.urgency = parseInt(data.urgency);

    if( data.tags ) data.tags = data.tags.join(' ');

    if ( data.project && data.project.length > 15 ) {
        data.project = _.truncate( data.project, 15 );
    }

    const moment = require('moment');

    [ 'due', 'modified' ].filter( f => data[f] ).forEach( f => {
        data[f] = moment(data[f]).fromNow();
    });

    return '|' + [
        'urgency', 'priority', 'due', 'description', 'project',
        'tags', 'modified', 'uuid'
    ].map( k => data[k] || ' ' ).join( '|' ).replace( /\n/g, ' ' );

}
