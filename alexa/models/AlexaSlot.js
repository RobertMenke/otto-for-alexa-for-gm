"use strict";

class AlexaSlot {

    constructor(type, object){

        /**
         * @type {String}
         */
        this.type   = type;

        /**
         * @type {String}
         */
        this.name   = object ? object[type]['name'] : "";

        /**
         * @type {*}
         */
        this.value  = object ? object[type]['value'] : "";
    }
}

module.exports = AlexaSlot;