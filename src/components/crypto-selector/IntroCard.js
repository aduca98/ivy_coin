// @flow
import * as React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {Icon, Card} from "native-base";

import {Styles} from "../../components";

import variables from "../../assets/native-base-theme/variables/commonColor";
import CryptoPrice from '../../api/CryptoPrice';
import autobind from 'autobind-decorator';

export default class IntroCard extends React.Component {

    state = {
        price: 0,
        loading: true
    }

    @autobind
    async componentWillMount() {
        var {balance} = this.props;
        const price = await CryptoPrice.getPrice(balance.currency.toUpperCase());
        const usd = parseFloat(price.price_usd).toFixed(2);
        console.log(usd);
        this.setState({
            price: usd
        })
    }
    
    @autobind
    render() {
        const {balance, color} = this.props;
        var img;
        // console.log(balance);
        switch(balance.currency) {
            case "BTC":
                img = <Image style={{flex: .6, height: 120, width: 120}}
                             source={require("../../assets/crypto/btc.png")} />
                break;
            case "ETH":
                img = <Image style={{flex: .6, height: 120, width: 120}}
                             source={require("../../assets/crypto/eth.png")} />
                break; 
            case "LTC":
                img = <Image style={{flex: .6, height: 120, width: 120}}
                             source={require("../../assets/crypto/ltc.png")} />
                break;
            default:
                img = <Image style={{flex: .6, height: 100, width: 100}}
                             source={require("../../assets/crypto/btc.png")} />
                break;
        }
        return  <View 
                    style={{ 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: 220, 
                        backgroundColor: color,
                        borderWidth: 0.5,
                        marginTop: 20,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        shadowOffset: {
                            width: 5,
                            height: 5
                        },
                        shadowColor: "#e6ebf1",
                        shadowRadius: 5,
                        shadowOpacity: 1,
                    
                     }}> 
                    
                    {img}
                    
                    <View style={[{ flex: 0.25, marginTop: 20 }, Styles.center]}>
                        <Text style={[Styles.textCentered, styles.text]}>
                            {parseFloat(balance.amount).toFixed(4)} {balance.currency}
                        </Text>
                        <Text style={[Styles.textCentered, styles.text]}>
                            $ {(parseFloat(balance.amount).toFixed(4) * this.state.price).toFixed(2)}
                        </Text>
                            
                    </View>
                </View>;
    }
}

const styles = StyleSheet.create(
    {
        row: {
            flexDirection: "row",
            marginBottom: variables.contentPadding
        },
        rowContainer: {
            marginLeft: variables.contentPadding
        },
        rowTopLine: {
            borderTopWidth: 1,
            borderColor: "white",
            marginBottom: 10,
            marginTop: 10,
            width: 150
        },
        rowBottomLine: {
            borderTopWidth: 1,
            borderColor: "white",
            width: 100
        },
        text: {
            fontSize: 20,
            fontFamily: "Avenir-Book"
        }
    }
);
