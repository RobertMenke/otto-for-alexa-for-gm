"use strict";
const AlexaResponse = require("./AlexaResponse");
const AlexaIntent   = require("./AlexaIntent");
const http          = require("http");
const req           = require("request");
const querystring   = require("querystring");


/**
 * Deals with input that alexa receives from a user
 */
class AlexaRequest {

    /**
     *
     * @returns {string}
     */
    static get GM_HOST() {
        return "http://forte9293.ngrok.io";
    }

    /**
     *
     * @returns {string}
     */
    static get GM_PORT() {
        return "4200";
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
     * Static method to handle most of the request logic.
     *
     * @param event
     * @param callback
     */
    static makeRequest(event, callback){
        //This should contain data on the request
        const request = new AlexaRequest(event);
        // this.emit(":tell", "PERFORM_ACTION was called");
        request.post('/otto-request', response => {
            let gm_response = '';
            response.on('data', (chunk) => gm_response += chunk);
            response.on('end', () => {
                const alexa_response = new AlexaResponse(request, gm_response);
                callback(alexa_response.getResponse());
            });

        });
    }

    /**
     * Creates a to GM using the data gathered from alexa.
     *
     * @param path
     * @param callback
     */
    post(path, callback) {
        const string = this._getPostData();
        const url    = `${AlexaRequest.GM_HOST}`;
        // const url = "https://google.com";
        req.get(`${url}${path}?${string}`)
           .on('response', callback);

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
            host   : AlexaRequest.GM_HOST,
            port   : AlexaRequest.GM_PORT,
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
        return querystring.encode({
            "intent_name"   : this.intent ? this.intent.name : "",
            "slots"         : this.intent ? this.intent.serializeSlots() : []
        });
    }

}

module.exports = AlexaRequest;