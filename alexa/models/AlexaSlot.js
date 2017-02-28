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
        this.name   = object ? object['name'] : "";

        /**
         * @type {*}
         */
        this.value  = object ? object['value'] : "";
    }
}

module.exports = AlexaSlot;