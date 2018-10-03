const {spawn} = require('child-process-promise');

class Task {
    constructor( data, tw ) {
        this.data = data;
        this.tw = tw;
    }
}

export default class Taskwarrior {

    constructor() {
        this.run_queue = Promise.resolve();
    }

    async export( args ) {
        console.log("MOTHER");
        let j = await this.run( 'export', args );
        console.log('xxx', j);
        return JSON.parse(j).map( task => new Task(task, this) );
    }

    async run( command, args = [], mods = [], options = {} ) {
        let previous = this.run_queue;

        return this.run_queue = previous.then( () => 
            spawn(
                'task', [ ...mods, command, ...args ],
                { capture: [ 'stdout', 'stderr' ]}
            ) 
        ).then( result => {
            console.log("HEY", result);
            console.log( result.stderr );

            return result.stdout;
        }).catch(
            e => console.error( e.stderr )
        );
    }


}
