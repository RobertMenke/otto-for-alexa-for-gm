const AlexaIntent = require("./AlexaIntent");
const http        = require("http");
const querystring = require("querystring");


/**
 * Deals with input that alexa receives from a user
 */
class AlexaInput {

    /**
     *
     * @returns {string}
     */
    static get GM_HOST() {
        return "192.168.0.2";
    }

    /**
     *
     * @returns {string}
     */
    static get GM_PORT() {
        return "3000";
    }

    constructor(request) {

        this.request = request;

        /**
         *
         * @type {AlexaIntent|undefined}
         */
        this.intent  = this._getIntent();
    }


    /**
     * Creates a to GM using the data gathered from alexa.
     *
     * @param path
     * @param callback
     */
    post(path, callback) {
        const request = this._createRequest(path, callback);
        request.write(this._getPostData());
        request.end();
    }

    /**
     * Determine if the request has an intent
     * @returns {boolean}
     * @private
     */
    _hasIntent() {
        return this.request.hasOwnProperty('intent');
    }

    /**
     *
     * @returns {AlexaIntent|undefined}
     * @private
     */
    _getIntent() {
        if (this._hasIntent()) {
            return new AlexaIntent(this.request['intent']);
        }

        return undefined;
    }

    /**
     * Creates a ClientRequest object
     *
     *
     * @param path
     * @param callback
     * @return {ClientRequest}
     * @private
     */
    _createRequest(path, callback){
        // Set up the request
        return http.request(this._getPostParams(path), res => {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                if(typeof callback === "function"){
                    callback(chunk);
                }
            });
        });
    }

    /**
     * Get the parameters (meta-data) that we need for the request
     *
     * @param path
     * @returns {{host: string, port: string, path: *, method: string, headers: {Content-Type: string, Content-Length: Number}}}
     * @private
     */
    _getPostParams(path) {

        const data = this._getPostData();
        return {
            host   : AlexaInput.GM_HOST,
            port   : AlexaInput.GM_PORT,
            path   : path,
            method : 'POST',
            headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        }
    }

    /**
     * Gathers info that we'll send to the car
     *
     * @private
     */
    _getPostData() {
        return querystring.stringify({
            "intent_name"   : this.intent ? this.intent.name : "",
            "slots"         : this.intent ? this.intent.serializeSlots() : []
        });
    }

}

module.exports = AlexaInput;