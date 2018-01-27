import axios from 'axios';
import Storage from './Storage';
import Exception from '../utils/Exception';
import Expo from 'expo';

export async function login(email, password) {
    try {
        var res = await axios.post("/api/auth/login", {
            email,
            password
        })
        return Promise.resolve(res.data);
    } catch(err) {
        var data = err.response.data;
        var status = err.response.status;
        throw new Exception(data.type, data.message);
    }
}
export async function twoFactorLogin(email, password, token) {
    try {
        var res = await axios.post("/api/auth/login-two-factor", {
            email,
            password,
            token
        })
        return Promise.resolve(res);
    } catch(err) {
        var data = err.response.data;
        var status = err.response.status;
        throw new Exception(data.type, data.message);
    }
}

export async function signup(user, token) {
    var expoUrl = Expo.Constants.linkingUri;
    var data = {
        ...user,
        token,
        expoUrl
    }
    console.log('user ' + data);
    try {
        var res = await axios.post("/api/auth/signup", data);
        return Promise.resolve(res.data);
    } catch(err) {
        console.log(err.response);
        var data = err.response.data;
        var status = err.response.status;
        throw new Exception(data.type, data.message);
    }
}

export async function checkIfVerified(email) {
    var email = email.toLowerCase();
    try {
        var res = await axios.get(`/api/auth/email-is-verified/${email}`);
        return Promise.resolve(res.data);
    } catch(err) {
        console.log(err.response);
        var data = err.response.data;
        var status = err.response.status;
        throw new Exception(data.type, data.message);
    }
}

export async function checkIfUnique(email) {
    var email = email.toLowerCase();
    try {
        var res = await axios.get(`/api/auth/email-is-unique/${email}`);
        return Promise.resolve(res.data);
    } catch(err) {
        console.log(err.response);
        var data = err.response.data;
        var status = err.response.status;
        throw new Exception(data.type, data.message);
    }
}

export async function createAuthyToken(email, phone) {
    var email = email.toLowerCase();
    try {
        var res = await axios.post(`/api/auth/make-authy`, {
            email: email,
            phone
        });
        return Promise.resolve(res.data);
    } catch(err) {
        console.log(err.response);
        var data = err.response.data;
        var status = err.response.status;
        throw new Exception(data.type, data.message);
    }
}