"use strict";

const AlexaInput = require("./models/AlexaInput");

/**
 * This file include a list of handlers for requests.
 *
 *
 * @type {{LaunchRequest: module.exports.LaunchRequest, Unhandled: module.exports.Unhandled, HelloWorldIntent: module.exports.HelloWorldIntent, [AMAZON.HelpIntent]: module.exports.AMAZON.HelpIntent, [AMAZON.CancelIntent]: module.exports.AMAZON.CancelIntent, [AMAZON.StopIntent]: module.exports.AMAZON.StopIntent}}
 */
module.exports = {
    'LaunchRequest' : function(){
        this.emit("PERFORM_ACTION");
    },
    'Unhandled' : function() {
        this.emit(':ask', 'Hmm, I\'m good, but not that good.');
    },
    'PERFORM_ACTION' : function(){


    },
    'FUEL_LEVEL' : function() {
        //This should contain data on the request
        const input = new AlexaInput(this.event.request);
        // this.emit(":tell", "PERFORM_ACTION was called");
        input.post('/otto-request', response => {
            let raw_data = '';
            response.on('data', (chunk) => raw_data += chunk);
            response.on('end', () => {
                try {
                    let parsedData = JSON.parse(raw_data);
                    this.emit(":tell", JSON.stringify(parsedData));

                } catch (e) {

                }
            });

        });
    },
    'LOCATE' : function(){
        //This should contain data on the request
        const input = new AlexaInput(this.event.request);
        this.emit(":tell", `${AlexaInput.GM_HOST}:${AlexaInput.GM_PORT}/test`);
        input.post('/test', response => {
            this.emit(":tell", "PERFORM_ACTION was called");
        });
    },
    'MAINTENANCE' : function(type){
        //This should contain data on the request
        const input = new AlexaInput(this.event.request);
        input.post('/test', response => {
            this.emit(":tell", "PERFORM_ACTION was called");
        });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t("HELP_MESSAGE");
        const reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};