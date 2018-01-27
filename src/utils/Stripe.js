"use strict";
import axios from 'axios';
import Exception from './Exception';

var stripe_url = 'https://api.stripe.com/v1/'
var secret_key = 'pk_test_kRdhewWm4SMvCShqeBBkfSG7'

export default class Stripe {
    
    static async createToken (cardNumber, expMonth, expYear, cvc) {
        var cardDetails = {
            "card[number]": cardNumber,
            "card[exp_month]": expMonth,
            "card[exp_year]": expYear,
            "card[cvc]": cvc
        };
        // console.log("DETAILS " + JSON.stringify(cardDetails));

        var formBody = [];
        for (var property in cardDetails) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(cardDetails[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        try {
            var res = await axios.post(stripe_url + 'tokens', formBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + secret_key
                },    
            });
            return Promise.resolve(res.data);
        } catch(err) {
            console.log(err.response);
            throw new Exception("stripe_error", err.response);
        }
    };
}
