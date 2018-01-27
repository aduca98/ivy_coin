import axios from 'axios';

export default class CryptoPrice {

    static async getPrice(coin) {
        try {
            var res = await axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10");
            
            var data = res.data;
            for(var i = 0; i < data.length; i++) {
                var c = data[i];
                if(c.symbol && c.symbol === coin) {
                    return c;
                }
            }
        } catch(e) {
            console.log(e);
        }
    }
}