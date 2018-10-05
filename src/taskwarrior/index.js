const { spawn } = require('child-process-promise');

const Task = require('./task').default;

export default class Taskwarrior {

    constructor() {
        const Queue = require('promise-queue');
        this.run_queue = new Queue(1,100);
    }

    task(data) {
        return new Task(data,this);
    }

    async export( args ) {
        let j = await this.run( 'export', args );
        return JSON.parse(j).map( task => new Task(task, this) );
    }

    async run( command, args = [], mods = [], options = {} ) {
        return this.run_queue.add(
            async() => {
                let line = [ 'task', ...mods, command, ...args ];
                return await spawn('task', [ ...mods, command, ...args ],
                    { capture: [ 'stdout', 'stderr' ] });
            }
        ).then( result => {
            //console.log( result.stderr );
            return result.stdout ;
        })
        .catch( error => console.error(error) );
    }


}
