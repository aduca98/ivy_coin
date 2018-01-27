import axios from 'axios';
import Storage from './Storage';
import Exception from '../utils/Exception';

export default class TransactionService {
    static async fetchUserTransactions() {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        try {
            var res = await axios.get("/api/transactions", {
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
    static async sendMoneyToFriend(selectedCurrency, amount, name, message, to) {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        try {
            console.log(selectedCurrency, amount, name, message, to);

            var type = "internal";
            var toUnvalidated = to;
            // Just doing this so I don't forget to send them with POST
            const message = message;
            const name = name;
            const currency = selectedCurrency;
            const amountCurrency = amount;
            const feePaid = 0; // for now...
        
            var data = {
                type,
                toUnvalidated,
                message,
                name,
                currency,
                amountCurrency,
                feePaid
            }

            console.log(data);

            var res = await axios.post("/api/transactions/internal-transfer", data, {
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