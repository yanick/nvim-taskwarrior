function onDemand(plugin) {
    return pluginClass => (...args) => {
        let MyClass = require( './'+pluginClass);
        let f = pluginClass.replace(/./, x => x.toLowerCase() );
        let self = new MyClass(plugin);
        self[f](...args);
    };
}

module.exports = plugin => {

    let pluginFunc = onDemand(plugin);

    [
        [ 'TaskShow', {} ],
        [ 'TaskAppend', { range: true } ],
        [ 'TaskDelete', { range: true } ],
        [ 'TaskDone', { range: true } ],
        [ 'TaskUpdate', { range: true } ],
    ].forEach( ([ name, options ]) => {
        plugin.registerFunction( name, pluginFunc(name), options );
    });

};
