
import taskShow from './taskShow';
import taskDone from './taskDone';
import taskDelete from './taskDelete';
import taskAppend from './taskAppend';

module.exports = class Task {

    constructor ( plugin ) {
        plugin.setOptions({ dev: true, });
        this.plugin = plugin;

        plugin.registerFunction( 'TaskShow', [ this, taskShow ] );

        plugin.registerFunction( 'TaskAppend', [ this, taskAppend ], { range: '' } );

        plugin.registerFunction( 'TaskDelete', [ this, taskDelete ], { range: '' });
        plugin.registerFunction( 'TaskDone', [ this, taskDone ], { range: '' });
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
