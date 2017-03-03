export default class SignalResolver {

    static getSignals(signals, callback){
        gm.info.getVehicleData(callback, signals);
    }

    static get intent_signal_map () {
        return {
            'FUEL_LEVEL' : ['fuel_level', 'alternative_fuel_level']
        }
    }


    constructor(intent) {
        /**
         * @type {String}
         */
        this.intent = intent['intent_name'];

        /**
         * @type {Array|String}
         */
        this.slots  = intent['slots']
    }

    /**
     * Resolve an intent from alexa
     *
     * @param callback
     */
    resolveIntent(callback) {

        const map = SignalResolver.intent_signal_map;

        if(map.hasOwnProperty(this.intent)){
            SignalResolver.getSignals(map[this.intent], callback);
        }
        else{
            callback({
                error : "I haven't been taught to do that yet. I'm just a young app."
            });
        }
    }


    /**
     *
     * @returns {boolean}
     * @private
     */
    _hasSlots() {
        return Array.isArray(this.slots) && this.slots.length > 0;
    }
}


// const vinElem = document.getElementById('vin');
// gm.info.getVehicleConfiguration(function(data) {
//   vinElem.innerHTML = gm.info.getVIN();
// });


//Watches for data sent from another app (I think this is only for apps within GM though?)
// gm.comm.watchForData((sender_id, type, data, length) => {
//
// });

//gm.comm.sendToApp(appID, length, data);