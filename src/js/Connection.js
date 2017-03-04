import io from "socket.io-client";
import SignalResolver from "./SignalResolver";

export default class Connection {

    constructor() {

        /**
         *
         * @type {string}
         */
        this.host = "https://forte9293.ngrok.io";

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
        return io.connect(this.host, {query : `vehicle=gm&vin=${this.getVin()}`});
    }

    _onRequest() {
        this.socket.on('request', data => {

            const resolver = new SignalResolver(data);
            resolver.resolveIntent(json => {
                this._emit(JSON.stringify(json));
            });
        });

        return this;
    }

    /**
     * Get the VIN number for the vehicle
     *
     *
     * @returns {String}
     */
    getVin() {
        return gm.info.getVIN();
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