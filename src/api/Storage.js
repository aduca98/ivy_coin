// Handles local storage for important 
// things like jwt tokens
import { SecureStore } from 'expo';

export default class Storage {
    static async getPassword() {
        await SecureStore.getItemAsync("password")
    }
    static async getUsername() {
        await SecureStore.getItemAsync("username")
    }
    static async setPassword(password) {
        await SecureStore.setItemAsync("password", password);
    }
    static async setUsername(username) {
        await SecureStore.setItemAsync("username", JSON.stringify(username));
    }
    static async setJwt(jwt) {
        await SecureStore.setItemAsync("jwt", jwt)
    }
    static async removeJwt() {
        await SecureStore.deleteItemAsync("jwt");
    }
    static async getJwt() {
        return await SecureStore.getItemAsync("jwt");
    }
}