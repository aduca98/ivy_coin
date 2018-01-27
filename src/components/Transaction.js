// @flow
import moment from "moment";
import PropTypes from 'prop-types';
import * as React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {H3} from "native-base";
import Avatar from "./Avatar";
import Styles from "./Styles";
import Circle from "./Circle";
import variables from "../assets/native-base-theme/variables/commonColor";
const ellipsis = require('text-ellipsis');

export default class Transaction extends React.Component {

    render() {

        const {
            currency, 
            title, 
            completed, 
            timeline,
            id,
            amount,
            to,
            toName,
            from,
            fromName,
            type,
            isWithdrawal,
        } = this.props;
        
        const date = moment(this.props.date);
        const height = 100;
        // console.log(this.props);

        var img;
        switch(currency) {
            case "BTC":
                img = <Image style={{width: 50, height: 50}} source={require("../assets/crypto/btc.png")}/>
                break;
            case "ETH":
                img = <Image style={{width: 50, height: 50}} source={require("../assets/crypto/eth.png")}/>
                break;
            case "LTC":
                img = <Image style={{width: 50, height: 50}} source={require("../assets/crypto/ltc.png")}/>
                break;
        }

        // to={t.to || null}
        // toName={t.toName || null}
        // from={t.from}
        // fromName={t.fromName}

        return <View style={[Styles.listItem, { height }]}>
            {
                timeline && <TransactionStatus {...{ timeline, completed, height }} />
            }
            <View style={style.time}>
                {img}
            </View>
            <View style={[style.title, {
                flexDirection: 'row'
            }]}>
                <View style={{
                    flex:1,
                    paddingTop: 15
                }}>
                    {type=="purchase" && <Text style={{
                        fontSize: 17
                    }}>Purchased.</Text>}
                    {type!="purchase" && !isWithdrawal && fromName && <Text>{fromName} paid you </Text>}
                    {(title!="") && <Text>{ellipsis(title, 30)}</Text>}
                    <Text style={style.gray}>{date.format("MMM DD, h:mm A")}</Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <H3 style={{
                        color: isWithdrawal ? 'red' : '#0ADA06',
                        fontWeight: 'bold',
                        fontSize: 15
                    }}>{isWithdrawal ? "-" : "+"}{amount.toFixed(6)} {currency}</H3>
                </View>
            </View>
            {
                !timeline && <TransactionStatus {...{ completed, height }} />
            }
        </View>;
    }
}

class TransactionStatus extends React.Component {
    render() {
        const {timeline, completed, height} = this.props;
        return <View style={[style.doublePadding, Styles.center]}>
            {
                timeline && <View style={[{ height }, style.verticalLine]}></View>
            }
            <Circle size={10} color={completed ? variables.brandInfo : variables.brandSecondary}/>
        </View>;
    }
}

const style = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    doublePadding: {
        padding: variables.contentPadding * 2
    },
    gray: {
        color: variables.gray
    },
    avatar: {
        marginTop: variables.contentPadding,
        marginRight: variables.contentPadding
    },
    verticalLine: {
        borderLeftWidth: variables.borderWidth,
        borderColor: variables.listBorderColor,
        position: "absolute"
    },
    time: {
        alignItems: "center",
        flexDirection: "row",
        padding: variables.contentPadding
    },
    title: {
        justifyContent: "center",
        flex: 1,
        padding: variables.contentPadding
    }
});

Transaction.propTypes = {
    currency: PropTypes.string,
    date: PropTypes.date,
    title: PropTypes.name,
}