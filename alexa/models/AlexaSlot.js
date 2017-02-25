
class AlexaSlot {

    constructor(type, object){

        /**
         * @type {String}
         */
        this.type   = type;

        /**
         * @type {String}
         */
        this.name   = object['name'];

        /**
         * @type {*}
         */
        this.value  = object['value']
    }
}

module.exports = AlexaSlot;