"use strict";

class AlexaResponse {

    constructor(alexa_request, gm_response) {

        /**
         * @type {AlexaRequest}
         */
        this.request = alexa_request;

        try {
            this.response = JSON.parse(gm_response);
        }
        catch (err) {

            this.response = gm_response;
        }
    }

    /**
     *
     * @returns {String}
     */
    getResponse(){
        switch(this.request.intent.name){
            case "FUEL_LEVEL" :
                return this.getFuelLevel();
            case "ENGINE_OIL":
                return this.getOilStatus();
            case "NAV":
                return this.getLocationResponse();
            default:
                return this.getDefaultResponse();
        }
    }

    /**
     *
     * @returns {String}
     */
    getFuelLevel() {
        if(typeof this.response === "object"){
            const level     = this.response.fuel_level;
            const alt_level = this.response.alternative_fuel_level;
            if(level > 75){
                return "Your gas tank is almost full. You're good to go!"
            }
            else if(level > 50){
                return "You have over half a tank left.";
            }
            else if (level > 25){
                return "You're getting low, you have just over a quarter tank of gas left";
            }
            else if(level > 0){
                return "Looks like it. Your low fuel light will come on soon";
            }
            else {
                return `Looks like it. Your low fuel light is on and your alternative fuel level is at ${alt_level}%`;
            }
        }

        return "Looks like it. Your low fuel light will come on soon";
    }

    getOilStatus() {
        if(typeof this.response === "object"){
            const level = this.response['engine_oil_life'];
            if(level > 50){
                return "Wow. That's quite a drive, but your engine oil looks just fine!"
            }
            else {
                return "Wow. That’s quite a drive. I suggest getting an oil change.";
            }
        }


    }

    /**
     *
     * @returns {string}
     */
    getLocationResponse() {
        const person  = this.request.getSlotValue();
        const pronoun = person === "Nicky" ? "her" : "him";
        return `I've located ${person} and set your route guidance to ${pronoun}. Drive safely.`;
    }

    /**
     *
     * @returns {string}
     */
    getDefaultResponse() {
        return "I'm at a loss for words.";
    }

}

module.exports = AlexaResponse;