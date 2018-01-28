import {SecureStore} from 'expo';

var StellarSdk = require('stellar-sdk');
var request = require('request');
var crypto = require('crypto');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

export default class StellarController {

    static async makeAccount() {
        var {s, p} = StellarController.createUserKeys();
        await StellarController.storeUserKeys(s, p);
        var body = await StellarController.makeTestAccount(p);
        return { publicKey: p }; // Return user's public key...
    }
    static createUserKeys() {
        var pair = StellarSdk.Keypair.random();
        var secretKey = pair.secret();
        var publicKey = pair.publicKey();
        return { secretKey, publicKey }
    }
    static async getUserKeys() {
        return {
            secretKey: await SecureStore.getItemAsync("secret"),
            publicKey: await SecureStore.getItemAsync("public")
        }
    }
    static async storeUserKeys(secretKey, publicKey) {
        await SecureStore.setItemAsync("secret", secretKey);
        await SecureStore.setItemAsync("public", publicKey);
    }
    static async makeTestAccount(publicKey) {
        request.get({
            url: 'https://horizon-testnet.stellar.org/friendbot',
            qs: { addr: publicKey },
            json: true
        }, function(error, response, body) {
            if (error || response.statusCode !== 200) {
                throw new Error("Failed to make account")
            }
            else {
                return Promise.resolve(body);
            }
        });

    }
    static async getBalances() {
        var {secretKey, publicKey} = await StellarController.getUserKeys();

        server.loadAccount(publicKey).then(function(account) {
            return account.balances;
        });
    }
    static async sendMoney() {
        var {secretKey, publicKey} = await StellarController.getUserKeys();
        var sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
        
        // Where you want to send the money...
        var destinationId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';
        
        // Transaction will hold a built transaction we can resubmit if the result is unknown.
        var transaction;

        server.loadAccount(destinationId)
        // If the account is not found, surface a nicer error message for logging.
        .catch(StellarSdk.NotFoundError, function (error) {
            throw new Error('The destination account does not exist!');
        })
        // If there was no error, load up-to-date information on your account.
        .then(function() {
            return server.loadAccount(sourceKeys.publicKey());
        })
        .then(function(sourceAccount) {
            // Start building the transaction.
            transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.payment({
                destination: destinationId,
                asset: StellarSdk.Asset.native(),
                amount: "10"
            }))
            // A memo allows you to add your own metadata to a transaction. It's
            // optional and does not affect how Stellar treats the transaction.
            .addMemo(StellarSdk.Memo.text('Test Transaction'))
            .build();
            // Sign the transaction to prove you are actually the person sending it.
            transaction.sign(sourceKeys);
            // And finally, send it off to Stellar!
            return server.submitTransaction(transaction);
        })
        .then(function(result) {
            console.log('Success! Results:', result);
            return Promise.resolve(result);
        })
        .catch(function(error) {
            console.error('Something went wrong!', error);
            throw new Error(JSON.stringify(error));
        });
    }
}