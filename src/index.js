function taskLine( {data} ) {
    const _ = require('lodash');

    data.urgency = parseInt(data.urgency);

    if( data.tags ) data.tags = data.tags.join(' ');

    if ( data.project && data.project.length > 15 ) {
        data.project = _.truncate( data.project, 15 );
    }

    const moment = require('moment');

    [ 'due', 'modified' ].filter( f => data[f] ).forEach( f => {
        console.log(data[f]);
        console.log(moment(data[f]).toNow());
        data[f] = moment(data[f]).toNow();
    });

    return '|' + [
        'urgency', 'priority', 'due', 'description', 'project',
        'tags', 'modified', 'uuid'
    ].map( k => data[k] || ' ' ).join( '|' ).replace( /\n/g, ' ' );

}


async function taskShow ( filter = [] ) {

    console.log( "filter: ", filter );

    let tasks = await this.tw().export( filter );

    const _ = require('lodash');

    tasks = _.sortBy( tasks, 'data.urgency' )
    tasks.reverse();

    tasks = tasks.map( taskLine );

    // replace the lines of the current buffer with them
    const buffer = await this.nvim.buffer;

    await buffer.setLines(tasks, {
          start: 0,
          end: -1,
          strictIndexing: true,
    });

    await Promise.all([
        this.nvim.input('1G'),
        this.nvim.command(':TableModeRealign'),
    ]);
};


module.exports = plugin => {
    plugin.setOptions({ dev: true, });

    const _ = require('lodash');

    plugin.tw = _.once( () => { 
        const Taskwarrior = require( './taskwarrior').default;
        return new Taskwarrior();
    });

    plugin.registerFunction( 'TaskShow', [ plugin, taskShow ] );
};
