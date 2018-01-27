import axios from 'axios';
import Storage from './Storage';
import Exception from '../utils/Exception';

export default class UserService {
    static async profile() {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        try {
            var res = await axios.get("/api/user/profile", {
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
    
    static async balance(currencies = ["BTC", "ETH", "LTC", "USD"]) {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        var query = "?currencies=" + currencies.join();
        try {
            var res = await axios.get("/api/user/balance" + query, {
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

    static async setPush(token) {
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        console.log(jwt);
        try {
            var res = await axios.put("/api/user/push", {
                token: token
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