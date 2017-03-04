export default class SignalResolver {

    static getSignals(signals, callback){
        gm.info.getVehicleData(callback, signals);
    }

    static get intent_signal_map () {
        return {
            'FUEL_LEVEL' : ['fuel_level', 'alternative_fuel_level'],
            'ENGINE_OIL' : ['engine_oil_life', 'engine_oil_ind', 'engine_oil_pressure', 'engine_oil_temp']
        }
    }


    constructor(intent) {

        this.raw = intent;
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
        console.log("this", this);
        if(map.hasOwnProperty(this.intent)){
            SignalResolver.getSignals(map[this.intent], callback);
        }
        else if(this.intent === "NAV"){
            if(this.raw.hasOwnProperty('address')){
                console.log("setting app address", this.raw['address']);
                this.setNav(this.raw['address'], callback);
            }
            else {
                this.setNav('400 Renaissance Center Drive, Detroit, Michigan 48243', callback);
            }

        }
        else{
            callback({
                error : "I haven't been taught to do that yet. I'm just a young app."
            });
        }
    }

    setNav(address, callback) {
        gm.nav.setDestination(success, failure, {
            address : address
        }, true);

        function success() {
            callback({
                success : "success"
            });
        }

        function failure() {
            callback({
                "failure" : "failure"
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