const { spawn } = require('child_process');

class Task {
    constructor( data, tw ) {
        this.data = data;
        this.tw = tw;
    }
}

export default class Taskwarrior {

    async export( args ) {
        return JSON.parse(
            await this.run( 'export', args )
        ).map( task => new Task(task, this) );
    }

    run( command, args = [], mods = [], options = {} ) {
        return new Promise( ( resolve, reject ) => {
            const task = spawn('task', [ ...mods, command, ...args ]);

            let output = '';

            task.stdout.on('data', data => output += data.toString() );

            task.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            task.on('close', code => {
                if( code ) { reject( code ); }
                else { resolve( output ) }
            });
        });
    }


}
