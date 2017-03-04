"use strict";

const AlexaRequest  = require("./models/AlexaRequest");

/**
 * This file include a list of handlers for requests.
 *
 *
 * @type {{LaunchRequest: module.exports.LaunchRequest, Unhandled: module.exports.Unhandled, HelloWorldIntent: module.exports.HelloWorldIntent, [AMAZON.HelpIntent]: module.exports.AMAZON.HelpIntent, [AMAZON.CancelIntent]: module.exports.AMAZON.CancelIntent, [AMAZON.StopIntent]: module.exports.AMAZON.StopIntent}}
 */
module.exports = {
    'FUEL_LEVEL' : function() {
        AlexaRequest.makeRequest(this.event.request, text_response => {
            this.emit(":tell", text_response);
        });
    },
    'ENGINE_OIL' : function() {
        AlexaRequest.makeRequest(this.event.request, text_response => {
            this.emit(":tell", text_response);
        });
    },
    'NAV' : function(){
        AlexaRequest.makeRequest(this.event.request, text_response => {
            this.emit(":tell", text_response);
        });
    },
    'PARKING' : function() {
        this.emit(":tell", "You’re parked on the northeast corner of 38th and Market");
    },
    'LaunchRequest' : function(){
        this.emit("Unhandled");
    },
    'Unhandled' : function() {
        this.emit(':ask', 'Hmm, I\'m good, but not that good.');
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