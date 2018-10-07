
//import taskShow from './TaskShow';
import taskDone from './taskDone';
import taskDelete from './taskDelete';
import taskAppend from './taskAppend';
import taskUpdate from './taskUpdate';

module.exports = class Task {

    constructor ( plugin ) {
        plugin.setOptions({ dev: true, });
        this.plugin = plugin;

 //       plugin.registerFunction( 'TaskShow', [ this, taskShow ] );

        plugin.registerFunction( 'TaskAppend', [ this, taskAppend ], { range: '' } );
        plugin.registerFunction( 'TaskUpdate', [ this, taskUpdate ], { range: '' } );

        plugin.registerFunction( 'TaskDelete', [ this, taskDelete ], { range: '' });
        plugin.registerFunction( 'TaskDone', [ this, taskDone ], { range: '' });

        plugin.registerCommand( 'TaskFoo', async () => {
            let b = plugin.nvim.buffer;
            b.replace( [ 'a','b','c' ], 3 );
        });
    }

    get nvim() { return this.plugin.nvim }

    get tw() {
        if( !this._tw ) {
            const Taskwarrior = require( './taskwarrior').default;
            this._tw = new Taskwarrior();
        }

        return this._tw;
    }

};
