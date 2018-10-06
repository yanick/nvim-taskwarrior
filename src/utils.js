import _ from 'lodash';

let moment;

const init = _.once( () => {
    moment = require('moment');
});


export async function replaceCurrentBuffer(lines) {
    const buffer = await this.nvim.buffer;

    await buffer.setLines(lines, {
        start: 0, end: -1, strictIndexing: true,
    });
}

export function taskLine( {data} ) {
    init();

    data = _.clone(data);

    data.urgency = parseInt(data.urgency);

    if( data.tags ) {
        data.description = [ data.description, 
        ...(data.tags.map( t => '+' + t )) ].join(' ');
    }

    [ 'due', 'modified' ].filter( f => data[f] ).forEach( f => {
        data[f] = moment(data[f]).fromNow();
    });

    if( data.project ) {
        data.description = [ data.project, data.description ].join( '> ' );
    }

    return '|' + [
        'urgency', 'priority', 'due', 'description',
        'modified', 'uuid'
    ].map( k => data[k] || ' ' ).join( '|' ).replace( /\n/g, ' ' );

}

export function extract_uuids(lines) {
    return lines.map( l => l.match( /[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}/g ) ).filter( x => x ).map( x => x[0] );
}
