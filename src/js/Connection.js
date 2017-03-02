import io from "socket.io-client";
import SignalResolver from "./SignalResolver";

export default class Connection {

    constructor() {

        /**
         *
         * @type {string}
         */
        this.host = "http://forte9293.ngrok.io";

        /**
         *
         * @type {Socket}
         */
        this.socket = this._connect();
    }

    init() {
        this._onRequest();
    }

    /**
     *
     * @returns {Socket}
     * @private
     */
    _connect() {
        return io.connect(this.host);
    }

    _onRequest() {
        this.socket.on('request', data => {

            const resolver = new SignalResolver(data);
            resolver.resolveIntent(json => {

                if(!json.hasOwnProperty('error')){
                    json = {
                        success : json
                    };
                }
                console.log("has response", json, this instanceof Connection);
                this._emit(JSON.stringify(json));
            });
        });

        return this;
    }

    /**
     *
     *
     * @param {String} message
     * @returns {Connection}
     * @private
     */
    _emit(message) {
        console.log("emitting data", message, typeof this.socket.emit, this.socket);
        this.socket.emit("otto", message);

        return this;
    }
}