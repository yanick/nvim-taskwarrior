import _ from 'lodash';

let fp;
let replaceCurrentBuffer;
let taskLine;

const init = _.once( () => {
    const utils = require('./utils');
    replaceCurrentBuffer = utils.replaceCurrentBuffer;
    taskLine = utils.taskLine;
    fp = require('lodash/fp');
});

module.exports = async function taskShow( filter = [] ) {
    init();

    if( filter.length === 0 ) {
        filter = ( await this.nvim.eval( 'input( "filter: ", "+READY" )' ) ).split( ' ' );
    }

    let tasks = (
        await this.tw.export( filter )
    ) |> fp.sortBy( 'data.urgency' )
      |> fp.reverse 
      |> fp.map( taskLine );

   await this::replaceCurrentBuffer(tasks);

    await Promise.all([
        this.nvim.input('1G'),
        this.nvim.command(':TableModeRealign'),
    ]);
};

