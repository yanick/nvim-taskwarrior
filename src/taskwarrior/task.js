export default class Task {
    constructor( data, tw ) {
        this.data = data;
        this.tw = tw;
    }

    get uuid () { return this.data.uuid }

    async done() {
        return this.tw.run( 'done', [], [ this.uuid ] );
    }

    async delete() {
        return this.tw.run( 'delete', [], [ this.uuid ] );
    }
}
