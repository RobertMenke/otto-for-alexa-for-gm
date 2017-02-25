/**
 * This file include a list of handlers for requests.
 *
 *
 * @type {{LaunchRequest: module.exports.LaunchRequest, Unhandled: module.exports.Unhandled, HelloWorldIntent: module.exports.HelloWorldIntent, [AMAZON.HelpIntent]: module.exports.AMAZON.HelpIntent, [AMAZON.CancelIntent]: module.exports.AMAZON.CancelIntent, [AMAZON.StopIntent]: module.exports.AMAZON.StopIntent}}
 */
module.exports = {
    'LaunchRequest' : function(){
        this.emit(":tell", this.t("HELP_MESSAGE"));
    },
    'Unhandled' : function() {
        this.emit(':ask', 'Hmm, I\'m good, but not that good.');
    },
    'HelloWorldIntent': function () {
        this.emit(':tell', 'Hello World!');
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