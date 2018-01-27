import axios from 'axios';
import Storage from './Storage';
import Exception from '../utils/Exception';

export default class NotificationService {
    
    static async sendPushNotification() {
       
        const jwt = await Storage.getJwt();
        if(!jwt) {
            throw new Exception("no_jwt", "No verification token");
        }
        try {
            var res = await axios.post("/api/notifications/test-push", {}, {
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