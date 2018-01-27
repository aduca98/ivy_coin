import Expo, {Contacts} from 'expo';
import axios from 'axios';
import Storage from './Storage';
import Exception from '../utils/Exception';
const phoneFormatter = require('phone-formatter');
const ellipsis = require('text-ellipsis');

var colors = [
    "#FBBA41",
    "#FB6041",
    "#7CCB59",
    "#1D9AE1",
    "#B22BF1",
    "#FB5757"
]
export default class ContactService {

    static async askForPermission() {
        const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
        if (permission.status !== 'granted') {
            // Permission was denied...
            return;
        }
    }
    static async getContacts(amount = 10) {
        // Ask for permission to query contacts.
        const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
        if (permission.status !== 'granted') {
            // Permission was denied...
            return;
        }
        const contacts = await Expo.Contacts.getContactsAsync({
            fields: [
                Expo.Contacts.PHONE_NUMBERS,
                Expo.Contacts.EMAILS,
            ],
            pageSize: amount,
            pageOffset: 0,
        });
        return contacts.data;
    }

    static async fetchContactsWithAccounts(contacts) {
        var jwt = await Storage.getJwt();
        console.log('jwt token ' + jwt);
        if(!jwt) {
            throw new Exception("no_jwt", "No authorization jwt.");
        }

        var emails = [];
        var phones = [];
        var formattedContacts = [];

        // console.log(contacts);

        contacts.map((c, index) => {
            // Add all emails to array
            if(!c) return;

            var color = colors[(index % 5)];
            var email;
            // Add to emails
            if(c.emails && c.emails.length > 0) {
                // console.log(c.emails);
                email = c.emails[0].email;
                c.emails.map(e => {
                    emails.push(e.email);
                });
            }

            var phone;
            // Add to phone numbers
            if(c.phoneNumbers && c.phoneNumbers.length > 0) {
                phone = phoneFormatter.normalize(c.phoneNumbers[0].digits);
                c.phoneNumbers.map(p => {
                    if(p.digits) {
                        phones.push(phoneFormatter.normalize(p.digits));
                    }
                });
            }
            var obj = {};
            obj.color = color;
            if(c.name) obj["name"] = ellipsis(c.name, 20);
            if(email) obj["email"] = email;
            if(phone) obj["phone"] = phone;
            formattedContacts.push(obj);
        });

        try {
            var res = await axios.post("/api/user/contacts", {
                device: "ios",
                emails: emails,
                phones: phones
            }, {
                headers: {
                    "Authorization": "bearer: " + jwt
                }
            });
            return Promise.resolve({matches: res.data.matches, realContacts: formattedContacts});
        } catch(err) {
            var data = err.response.data;
            var status = err.response.status;
            throw new Exception(data.type, data.message);
        }
    }
}
