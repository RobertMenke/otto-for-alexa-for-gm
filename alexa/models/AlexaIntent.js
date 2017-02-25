const AlexaSlot = require("./AlexaSlot");


class AlexaIntent {

    constructor(intent){

        /**
         * {Object}
         */
        this.intent = intent;

        /**
         * @type {String}
         */
        this.name   = intent['name'];

        /**
         *
         * @type {*}
         */
        this.slots  = this._getSlots();
    }

    /**
     *
     * @returns {*|{}|Array}
     */
    serializeSlots() {
        return this.slots.map(/**AlexaSlot*/slot => ({
            type : slot.type,
            name : slot.name,
            value: slot.value
        }));
    }

    /**
     * Determine if the intent has slots
     *
     * @returns {boolean}
     * @private
     */
    _hasSlots(){
        return this.intent.hasOwnProperty('slots');
    }


    /**
     * Gets an array of slots from the intent
     *
     * @returns {AlexaSlot[]|[]}
     * @private
     */
    _getSlots() {
        if(this._hasSlots()){
            const slots = Object.keys(this.intent['slots']);
            return slots.map(slot => new AlexaSlot(slot, this.intent['slot']));
        }

        return [];
    }
}

module.exports = AlexaIntent;