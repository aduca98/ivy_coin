import axios from 'axios';
import Storage from './Storage';
import Exception from '../utils/Exception';

export default class PaymentService {
    static async fetchCreditCards() {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        try {
            var res = await axios.get("/api/payment/cards", {
                headers: {
                    "Authorization": "bearer: " + jwt
                }
            });
            return Promise.resolve(res.data);
        } catch(err) {
            var data = err.response.data;
            var status = err.response.status;
            throw new Exception(data.type, data.message);
        }
    }
    static async purchaseCrypto(crypto, amount, stripeToken) {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        try {
            var res = await axios.post("/api/transactions/purchase", {
                crypto,
                stripeToken,
                amount
            }, {
                headers: {
                    "Authorization": "bearer: " + jwt
                }
            });
            return Promise.resolve(res.data);
        } catch(err) {
            var data = err.response.data;
            var status = err.response.status;
            throw new Exception(data.type, data.message);
        }
    }
    static async updateDefault(card_id) {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        try {
            var res = await axios.put("/api/payment/default", {
                card_id,
            }, {
                headers: {
                    "Authorization": "bearer: " + jwt
                }
            });
            return Promise.resolve(res.data);
        } catch(err) {
            var data = err.response.data;
            var status = err.response.status;
            throw new Exception(data.type, data.message);
        }
    }
    static async addCard(stripeToken) {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        try {
            var res = await axios.put("/api/payment/add-card", {
                stripeToken,
            }, {
                headers: {
                    "Authorization": "bearer: " + jwt
                }
            });
            return Promise.resolve(res.data);
        } catch(err) {
            var data = err.response.data;
            var status = err.response.status;
            throw new Exception(data.type, data.message);
        }
    }
}