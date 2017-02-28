'use strict';

const Alexa    = require('alexa-sdk');
const handlers = require("./handlers");
const config   = require("./config");
const language = require("./language");

exports.handler = function (event, context, callback) {
    const alexa     = Alexa.handler(event, context);
    alexa.appId     = config.APP_ID;
    alexa.resources = language;
    alexa.registerHandlers(handlers);
    alexa.execute();
};