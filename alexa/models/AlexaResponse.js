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
            case "LOCK_UNLOCK":
                return this.getLockedStatus();
            case "LOCATION":
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
                return "Looks like it. Your fuel light will come on soon";
            }
            else {
                return `Looks like it. Your fuel light is on and your alternative fuel level is at ${alt_level}%`;
            }
        }
        //We didn't get the correct data from gm
        else {
            return "Looks like it. Your fuel light will come on soon";
        }
    }

    getLockedStatus() {
        return "Your car is locked. Sleep well.";
    }

    /**
     *
     * @returns {string}
     */
    getLocationResponse() {
        return "Bla, bla location";
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