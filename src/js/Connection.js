import io from "socket.io-client";
import SignalQuery from "./SignalQuery";

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
            SignalQuery.getSignals([
                'tire_left_front_pressure',
                'tire_left_rear_pressure',
                'engine_oil_pressure',
                'tire_right_front_pressure',
                'tire_right_rear_pressure'
            ], data => {
                this._emit(JSON.stringify(data));
            })
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
        this.socket.emit("otto", message);

        return this;
    }
}