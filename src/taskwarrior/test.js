import Taskwarrior from './index';

let tw = new Taskwarrior();

tw.export( [ '+READY project:galuga' ] ).then(
    tasks => tasks.map( t => console.log(t.data) )
);
