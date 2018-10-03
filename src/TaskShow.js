import _ from 'lodash';
import fp from 'lodash/fp';
import { replaceCurrentBuffer, taskLine } from './utils';
import TaskCommand from './TaskCommand';

module.exports = class TaskShow extends TaskCommand {

    async taskShow( filter = [] ) {

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
    }
}

